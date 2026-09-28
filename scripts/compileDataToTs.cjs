const fs = require('fs');
const path = require('path');

const publicDataDir = path.join(__dirname, '..', 'public', 'data');
const srcDataDir = path.join(__dirname, '..', 'src', 'data');

console.log('Compiling public JSON datasets into TypeScript module...');

const exams = ['cgl', 'chsl', 'mts', 'gd', 'cpo', 'je', 'stenographer', 'selection-post', 'jht', 'other'];
const examConfigs = {};

exams.forEach(code => {
  const p = path.join(publicDataDir, 'exams', code, 'latest.json');
  examConfigs[code] = JSON.parse(fs.readFileSync(p, 'utf8'));
});

const questions = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'questions', 'questions.json'), 'utf8'));
const pyqs = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'pyqs', 'pyqs.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'posts', 'posts.json'), 'utf8'));
const vacancies = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'vacancies', 'vacancies.json'), 'utf8'));
const cutoffs = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'cutoffs', 'cutoffs.json'), 'utf8'));
const books = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'books', 'books.json'), 'utf8'));
const updates = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'notifications', 'updates.json'), 'utf8'));
const currentAffairs = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'current-affairs', 'current-affairs.json'), 'utf8'));
const formulas = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'formulas', 'formulas.json'), 'utf8'));
const flashcards = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'flashcards', 'flashcards.json'), 'utf8'));
const physical = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'physical', 'physical.json'), 'utf8'));
const typing = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'typing', 'typing.json'), 'utf8'));
const steno = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'steno', 'steno.json'), 'utf8'));
const translation = JSON.parse(fs.readFileSync(path.join(publicDataDir, 'translation', 'translation.json'), 'utf8'));

const tsContent = `// Automatically generated from official SSC Master India JSON datasets
import type { 
  ExamConfig, 
  QuestionItem, 
  PostProfile, 
  VacancyItem, 
  CutoffItem, 
  BookItem, 
  LiveUpdateItem, 
  CurrentAffairItem, 
  FormulaItem, 
  FlashcardItem, 
  PhysicalStandard, 
  TypingExercise, 
  StenoExercise, 
  TranslationExercise,
  ExamId 
} from '../types/index.ts';

export const EXAM_CONFIGS: Record<ExamId, ExamConfig> = ${JSON.stringify(examConfigs, null, 2)} as unknown as Record<ExamId, ExamConfig>;

export const POSTS_DATA: PostProfile[] = ${JSON.stringify(posts, null, 2)} as unknown as PostProfile[];

export const VACANCIES_DATA: VacancyItem[] = ${JSON.stringify(vacancies, null, 2)} as unknown as VacancyItem[];

export const CUTOFFS_DATA: CutoffItem[] = ${JSON.stringify(cutoffs, null, 2)} as unknown as CutoffItem[];

export const BOOKS_DATA: BookItem[] = ${JSON.stringify(books, null, 2)} as unknown as BookItem[];

export const UPDATES_DATA: LiveUpdateItem[] = ${JSON.stringify(updates, null, 2)} as unknown as LiveUpdateItem[];

export const CURRENT_AFFAIRS_DATA: CurrentAffairItem[] = ${JSON.stringify(currentAffairs, null, 2)} as unknown as CurrentAffairItem[];

export const FORMULAS_DATA: FormulaItem[] = ${JSON.stringify(formulas, null, 2)} as unknown as FormulaItem[];

export const FLASHCARDS_DATA: FlashcardItem[] = ${JSON.stringify(flashcards, null, 2)} as unknown as FlashcardItem[];

export const PHYSICAL_STANDARDS_DATA: PhysicalStandard[] = ${JSON.stringify(physical, null, 2)} as unknown as PhysicalStandard[];

export const TYPING_DATA: TypingExercise[] = ${JSON.stringify(typing, null, 2)} as unknown as TypingExercise[];

export const STENO_DATA: StenoExercise[] = ${JSON.stringify(steno, null, 2)} as unknown as StenoExercise[];

export const TRANSLATION_DATA: TranslationExercise[] = ${JSON.stringify(translation, null, 2)} as unknown as TranslationExercise[];

export const ALL_QUESTIONS: QuestionItem[] = ${JSON.stringify(questions, null, 2)} as unknown as QuestionItem[];

export const VERIFIED_PYQS: QuestionItem[] = ${JSON.stringify(pyqs, null, 2)} as unknown as QuestionItem[];
`;

fs.writeFileSync(path.join(srcDataDir, 'initialData.ts'), tsContent);
console.log(`initialData.ts successfully compiled with ${questions.length} questions and all master datasets!`);
