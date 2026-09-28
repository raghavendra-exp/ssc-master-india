const fs = require('fs');
const path = require('path');

const publicDataDir = path.join(__dirname, '..', 'public', 'data');
let hasError = false;

function error(msg) {
  console.error(`❌ ERROR: ${msg}`);
  hasError = true;
}

function success(msg) {
  console.log(`✅ ${msg}`);
}

console.log('--- RUNNING SSC MASTER INDIA DATA VALIDATION ---');

// 1. Check questions.json
const questionsPath = path.join(publicDataDir, 'questions', 'questions.json');
if (!fs.existsSync(questionsPath)) {
  error('questions.json not found!');
} else {
  try {
    const raw = fs.readFileSync(questionsPath, 'utf8');
    const questions = JSON.parse(raw);
    console.log(`Loaded ${questions.length} questions.`);

    if (questions.length < 1000) {
      error(`Question bank must contain at least 1,000 questions! Found: ${questions.length}`);
    } else {
      success(`Question count requirement met: ${questions.length} questions >= 1000.`);
    }

    const seenIds = new Set();
    const validExams = new Set(['cgl', 'chsl', 'mts', 'gd', 'cpo', 'je', 'stenographer', 'selection-post', 'jht', 'other', 'all']);
    const validSourceTypes = new Set(['verified-pyq', 'original', 'pyq-style']);

    let verifiedPyqCount = 0;

    questions.forEach((q, idx) => {
      // ID check
      if (!q.id) error(`Question at index ${idx} is missing id!`);
      if (seenIds.has(q.id)) error(`Duplicate question ID found: ${q.id}`);
      seenIds.add(q.id);

      // Exam check
      if (!validExams.has(q.exam)) error(`Question ${q.id} has invalid exam: "${q.exam}"`);

      // Bilingual question check
      if (!q.question || !q.question.en || !q.question.hi) {
        error(`Question ${q.id} is missing bilingual question text!`);
      }

      // Options check
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        error(`Question ${q.id} must have exactly 4 options!`);
      } else {
        q.options.forEach((opt, optIdx) => {
          if (!opt.en || !opt.hi) error(`Question ${q.id} option ${optIdx} missing bilingual text!`);
        });
      }

      // Answer range check
      if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
        error(`Question ${q.id} has invalid answer index: ${q.answer}`);
      }

      // Explanation check
      if (!q.explanation || !q.explanation.en || !q.explanation.hi) {
        error(`Question ${q.id} missing bilingual explanation!`);
      }

      // Source type & source check
      if (!validSourceTypes.has(q.sourceType)) {
        error(`Question ${q.id} has invalid sourceType: "${q.sourceType}"`);
      }
      if (!q.source) {
        error(`Question ${q.id} is missing source attribution!`);
      }

      if (q.sourceType === 'verified-pyq') {
        verifiedPyqCount++;
      }
    });

    success(`Validated all ${questions.length} questions successfully!`);
    success(`Verified PYQs in bank: ${verifiedPyqCount}.`);
  } catch (e) {
    error(`Failed to parse questions.json: ${e.message}`);
  }
}

// 2. Check Exams
const exams = ['cgl', 'chsl', 'mts', 'gd', 'cpo', 'je', 'stenographer', 'selection-post', 'jht', 'other'];
exams.forEach(examCode => {
  const p = path.join(publicDataDir, 'exams', examCode, 'latest.json');
  if (!fs.existsSync(p)) {
    error(`Missing latest.json for exam: ${examCode}`);
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (!data.examId || !data.stages || data.stages.length === 0) {
        error(`Exam ${examCode} latest.json has incomplete structure!`);
      }
    } catch (e) {
      error(`Error reading exam ${examCode}: ${e.message}`);
    }
  }
});
success(`All 10 exam latest configurations verified.`);

// 3. Check Posts, Vacancies, Books, Cutoffs, Updates
const checkList = [
  { file: 'posts/posts.json', name: 'Posts' },
  { file: 'vacancies/vacancies.json', name: 'Vacancies' },
  { file: 'cutoffs/cutoffs.json', name: 'Historical Cutoffs' },
  { file: 'books/books.json', name: 'Book Library' },
  { file: 'notifications/updates.json', name: 'Live Updates' },
  { file: 'current-affairs/current-affairs.json', name: 'Current Affairs' },
  { file: 'formulas/formulas.json', name: 'Formula Book' },
  { file: 'flashcards/flashcards.json', name: 'Flashcards' },
  { file: 'physical/physical.json', name: 'Physical Standards' }
];

checkList.forEach(item => {
  const fullPath = path.join(publicDataDir, item.file);
  if (!fs.existsSync(fullPath)) {
    error(`Missing data file: ${item.file}`);
  } else {
    try {
      const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (!Array.isArray(parsed) || parsed.length === 0) {
        error(`Data file ${item.file} is empty or not an array!`);
      } else {
        success(`Validated ${item.name} (${parsed.length} items).`);
      }
    } catch (e) {
      error(`Error in ${item.file}: ${e.message}`);
    }
  }
});

console.log('------------------------------------------------');
if (hasError) {
  console.error('❌ Data validation FAILED with errors.');
  process.exit(1);
} else {
  console.log('✅ ALL DATA VALIDATION CHECKS PASSED PERFECTLY!');
  process.exit(0);
}
