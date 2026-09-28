const fs = require('fs');
const path = require('path');

const publicDataDir = path.join(__dirname, '..', 'public', 'data');
const srcDataDir = path.join(__dirname, '..', 'src', 'data');

// Ensure all directories exist
const dirs = [
  'exams/cgl', 'exams/chsl', 'exams/mts', 'exams/gd', 'exams/cpo',
  'exams/je', 'exams/stenographer', 'exams/selection-post', 'exams/jht', 'exams/other',
  'notifications', 'vacancies', 'cutoffs', 'results', 'posts', 'books',
  'current-affairs', 'questions', 'pyqs', 'formulas', 'flashcards', 'physical', 'typing', 'steno', 'translation'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(publicDataDir, d), { recursive: true });
});
fs.mkdirSync(srcDataDir, { recursive: true });

console.log('Generating official versioned exam configurations...');

// 1. EXAM CONFIGURATIONS
const examsMaster = [
  {
    examId: 'SSC-CGL-2026',
    examCode: 'cgl',
    examName: { en: 'SSC CGL', hi: 'एसएससी सीजीएल' },
    fullName: {
      en: 'Combined Graduate Level Examination',
      hi: 'संयुक्त स्नातक स्तरीय परीक्षा'
    },
    badge: 'Graduation Level • Group B & C',
    year: 2026,
    duration: 'Tier-I: 60 mins | Tier-II: 2h 15m + DEST',
    questions: 100,
    marks: 200,
    negativeMarking: 'Tier-I: 0.50 | Tier-II Paper-I: 1.00',
    subjects: [
      'Quantitative Aptitude',
      'General Intelligence & Reasoning',
      'English Language',
      'General Awareness',
      'Computer Knowledge',
      'Statistics'
    ],
    eligibility: {
      education: {
        en: "Bachelor's Degree from a recognized University or equivalent. For JSO: Bachelor's Degree with 60% in Mathematics at 12th standard OR Bachelor's Degree in any subject with Statistics as one of the subjects at degree level.",
        hi: "मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री या समकक्ष। जेएसओ हेतु: 12वीं में गणित में 60% अंक या डिग्री स्तर पर सांख्यिकी विषय।"
      },
      ageMin: 18,
      ageMax: 32,
      ageRelaxation: {
        en: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years, Ex-Servicemen: 3 years after deduction of the military service.',
        hi: 'ओबीसी: 3 वर्ष, एससी/एसटी: 5 वर्ष, दिव्यांग: 10 वर्ष, भूतपूर्व सैनिक: सैन्य सेवा घटाने के बाद 3 वर्ष।'
      },
      physical: {
        en: 'Physical fitness standards mandatory only for Inspector (Central Excise/Examiner/Preventive Officer) and Sub-Inspector in CBI/NIA/CBN.',
        hi: 'शारीरिक मानक केवल इंस्पेक्टर (केंद्रीय उत्पाद/परीक्षक/निवारक अधिकारी) और सीबीआई/एनआईए/सीबीएन में उप-निरीक्षक पद हेतु आवश्यक।'
      },
      skillReq: {
        en: 'Data Entry Speed Test (DEST) is mandatory and qualifying for all posts (2000 key depressions in 15 minutes).',
        hi: 'डाटा एंट्री स्पीड टेस्ट (DEST) सभी पदों के लिए अनिवार्य एवं क्वालिफाइंग है (15 मिनट में 2000 की-डिप्रेशन)।'
      },
      esmProvisions: {
        en: 'Reservation for ESM is available in Group C posts as per DoPT guidelines; Age relaxation permissible for Group B & C.',
        hi: 'डीओपीटी दिशानिर्देशों के अनुसार ग्रुप सी पदों में भूतपूर्व सैनिकों हेतु आरक्षण; ग्रुप बी और सी में आयु छूट अनुमेय।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/11/2026-PP_1',
      notificationDate: '2026-06-11',
      applicationStart: '2026-06-11',
      applicationEnd: '2026-07-10',
      correctionWindow: '2026-07-15 to 2026-07-16',
      examDate: 'September - October 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 17727,
      source: 'Staff Selection Commission Official Gazette Notice (ssc.gov.in)'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Assistant Section Officer (CSS, IB, MEA, Railways), Inspector (Income Tax, Central Excise, GST, Preventive Officer, Examiner), Sub-Inspector (CBI, NIA), Assistant Enforcement Officer, Divisional Accountant, JSO, Auditor, Tax Assistant.',
    stages: [
      {
        stageId: 'tier1',
        stageName: { en: 'Tier-I (CBE)', hi: 'टियर-I (कंप्यूटर आधारित)' },
        mode: 'Computer Based Test (Objective MCQ)',
        duration: '60 minutes (80 minutes for scribes)',
        totalQuestions: 100,
        totalMarks: 200,
        negativeMarking: '0.50 marks per wrong answer',
        qualifyingNature: true,
        sections: [
          { name: { en: 'General Intelligence & Reasoning', hi: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'General Awareness', hi: 'सामान्य जागरूकता' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'Quantitative Aptitude', hi: 'मात्रात्मक अभिरुचि' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'English Comprehension', hi: 'अंग्रेजी बोधगम्यता' }, questions: 25, marks: 50, negativePerWrong: 0.5 }
        ]
      },
      {
        stageId: 'tier2',
        stageName: { en: 'Tier-II (Paper-I + Paper-II)', hi: 'टियर-II (पेपर-I + पेपर-II)' },
        mode: 'Computer Based Examination',
        duration: 'Paper-I: 2h 15m + 15m DEST | Paper-II: 2h',
        totalQuestions: 150,
        totalMarks: 390,
        negativeMarking: '1 mark per wrong answer in Paper-I',
        qualifyingNature: false,
        sections: [
          { name: { en: 'Paper-I Sec-I: Mathematical Abilities', hi: 'पेपर-I खंड-I: गणितीय योग्यता' }, questions: 30, marks: 90, negativePerWrong: 1, timeLimit: '60 mins combined with Reasoning' },
          { name: { en: 'Paper-I Sec-I: Reasoning & General Intelligence', hi: 'पेपर-I खंड-I: तर्कशक्ति एवं सामान्य बुद्धि' }, questions: 30, marks: 90, negativePerWrong: 1, timeLimit: '60 mins combined with Math' },
          { name: { en: 'Paper-I Sec-II: English Language & Comprehension', hi: 'पेपर-I खंड-II: अंग्रेजी भाषा एवं बोधगम्यता' }, questions: 45, marks: 135, negativePerWrong: 1, timeLimit: '60 mins combined with GA' },
          { name: { en: 'Paper-I Sec-II: General Awareness', hi: 'पेपर-I खंड-II: सामान्य जागरूकता' }, questions: 25, marks: 75, negativePerWrong: 1, timeLimit: '60 mins combined with English' },
          { name: { en: 'Paper-I Sec-III Mod-I: Computer Knowledge (Qualifying)', hi: 'पेपर-I खंड-III: कंप्यूटर ज्ञान (क्वालिफाइंग)' }, questions: 20, marks: 60, negativePerWrong: 1, timeLimit: '15 mins' },
          { name: { en: 'Paper-I Sec-III Mod-II: DEST Typing Test (Qualifying)', hi: 'पेपर-I खंड-III: DEST टाइपिंग (क्वालिफाइंग)' }, questions: 1, marks: 0, negativePerWrong: 0, timeLimit: '15 mins (2000 depressions)' },
          { name: { en: 'Paper-II: Statistics (Only for JSO applicants)', hi: 'पेपर-II: सांख्यिकी (केवल JSO आवेदकों हेतु)' }, questions: 100, marks: 200, negativePerWrong: 0.5, timeLimit: '120 mins' }
        ]
      }
    ]
  },
  {
    examId: 'SSC-CHSL-2026',
    examCode: 'chsl',
    examName: { en: 'SSC CHSL', hi: 'एसएससी सीएचएसएल' },
    fullName: {
      en: 'Combined Higher Secondary (10+2) Level Examination',
      hi: 'संयुक्त उच्चतर माध्यमिक (10+2) स्तरीय परीक्षा'
    },
    badge: '10+2 Level • LDC, JSA, DEO',
    year: 2026,
    duration: 'Tier-I: 60 mins | Tier-II: 2h 15m + Skill/Typing',
    questions: 100,
    marks: 200,
    negativeMarking: 'Tier-I: 0.50 | Tier-II: 1.00 per wrong',
    subjects: [
      'Quantitative Aptitude',
      'General Intelligence & Reasoning',
      'English Language',
      'General Awareness',
      'Computer Knowledge',
      'Typing'
    ],
    eligibility: {
      education: {
        en: 'Passed 12th Standard or equivalent from a recognized Board or University. For DEO Grade A in CAG: 12th in Science stream with Mathematics.',
        hi: 'मान्यता प्राप्त बोर्ड से 12वीं उत्तीर्ण। सीएजी में डीईओ ग्रेड ए हेतु: गणित विषय के साथ विज्ञान वर्ग में 12वीं।'
      },
      ageMin: 18,
      ageMax: 27,
      ageRelaxation: {
        en: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years, ESM: 3 years.',
        hi: 'ओबीसी: 3 वर्ष, एससी/एसटी: 5 वर्ष, दिव्यांग: 10 वर्ष, भूतपूर्व सैनिक: 3 वर्ष।'
      },
      skillReq: {
        en: 'Typing Test for LDC/JSA (English 35 WPM / Hindi 30 WPM); Skill Test for DEO (8000 key depressions per hour).',
        hi: 'एलडीसी/जेएसए हेतु टाइपिंग टेस्ट (अंग्रेजी 35 शब्द/मिनट या हिंदी 30 शब्द/मिनट); डीईओ हेतु 8000 की-डिप्रेशन प्रति घंटा।'
      },
      esmProvisions: {
        en: 'Horizontal reservation for Ex-Servicemen in LDC/JSA and Group C posts.',
        hi: 'एलडीसी/जेएसए एवं ग्रुप सी पदों में भूतपूर्व सैनिकों हेतु क्षैतिज आरक्षण।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/12/2026-PP_2',
      notificationDate: '2026-04-08',
      applicationStart: '2026-04-08',
      applicationEnd: '2026-05-07',
      correctionWindow: '2026-05-10 to 2026-05-11',
      examDate: 'July 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 3712,
      source: 'SSC Official Notification (ssc.gov.in)'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), Data Entry Operator (DEO), Data Entry Operator Grade A.',
    stages: [
      {
        stageId: 'tier1',
        stageName: { en: 'Tier-I (CBE)', hi: 'टियर-I (कंप्यूटर आधारित)' },
        mode: 'Computer Based Test (Objective MCQ)',
        duration: '60 minutes',
        totalQuestions: 100,
        totalMarks: 200,
        negativeMarking: '0.50 marks per wrong answer',
        qualifyingNature: true,
        sections: [
          { name: { en: 'English Language (Basic Knowledge)', hi: 'अंग्रेजी भाषा (मूल ज्ञान)' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'General Intelligence', hi: 'सामान्य बुद्धिमत्ता' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'Quantitative Aptitude (Basic Arithmetic Skill)', hi: 'मात्रात्मक अभिरुचि' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'General Awareness', hi: 'सामान्य जागरूकता' }, questions: 25, marks: 50, negativePerWrong: 0.5 }
        ]
      },
      {
        stageId: 'tier2',
        stageName: { en: 'Tier-II (Session I & II)', hi: 'टियर-II (सत्र I एवं II)' },
        mode: 'Computer Based Examination + Skill/Typing',
        duration: '2 hours 15 minutes + Skill/Typing',
        totalQuestions: 135,
        totalMarks: 360,
        negativeMarking: '1 mark per wrong answer in Sec-I & II',
        qualifyingNature: false,
        sections: [
          { name: { en: 'Sec-I Mod-I: Mathematical Abilities', hi: 'खंड-I मॉड-I: गणितीय योग्यता' }, questions: 30, marks: 90, negativePerWrong: 1 },
          { name: { en: 'Sec-I Mod-II: Reasoning & General Intelligence', hi: 'खंड-I मॉड-II: तर्कशक्ति' }, questions: 30, marks: 90, negativePerWrong: 1 },
          { name: { en: 'Sec-II Mod-I: English Language & Comprehension', hi: 'खंड-II मॉड-I: अंग्रेजी भाषा' }, questions: 40, marks: 120, negativePerWrong: 1 },
          { name: { en: 'Sec-II Mod-II: General Awareness', hi: 'खंड-II मॉड-II: सामान्य जागरूकता' }, questions: 20, marks: 60, negativePerWrong: 1 },
          { name: { en: 'Sec-III Mod-I: Computer Knowledge (Qualifying)', hi: 'खंड-III मॉड-I: कंप्यूटर ज्ञान' }, questions: 15, marks: 45, negativePerWrong: 1 },
          { name: { en: 'Sec-III Mod-II: Skill Test / Typing Test', hi: 'खंड-III मॉड-II: टाइपिंग/कौशल परीक्षा' }, questions: 1, marks: 0, negativePerWrong: 0 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-MTS-2026',
    examCode: 'mts',
    examName: { en: 'SSC MTS & Havaldar', hi: 'एसएससी एमटीएस एवं हवलदार' },
    fullName: {
      en: 'Multi-Tasking (Non-Technical) Staff & Havaldar (CBIC & CBN) Examination',
      hi: 'मल्टी-टास्किंग (गैर-तकनीकी) स्टाफ एवं हवलदार (CBIC और CBN) परीक्षा'
    },
    badge: '10th Matric Pass • Group C',
    year: 2026,
    duration: 'Session-I: 45 mins | Session-II: 45 mins',
    questions: 90,
    marks: 270,
    negativeMarking: 'No negative marking in Session-I! 1 mark per wrong in Session-II',
    subjects: [
      'Quantitative Aptitude',
      'General Intelligence & Reasoning',
      'English Language',
      'General Awareness',
      'Physical Preparation'
    ],
    eligibility: {
      education: {
        en: 'Matriculation (10th Pass) from a recognized Board.',
        hi: 'मान्यता प्राप्त बोर्ड से 10वीं (मैट्रिक) उत्तीर्ण।'
      },
      ageMin: 18,
      ageMax: 27,
      ageRelaxation: {
        en: '18-25 years for MTS and Havaldar in CBN; 18-27 years for Havaldar in CBIC and few MTS posts. Standard category relaxations apply.',
        hi: 'एमटीएस एवं सीबीएन हवलदार हेतु 18-25 वर्ष; सीबीआईसी हवलदार व कुछ एमटीएस पदों हेतु 18-27 वर्ष। श्रेणीवार छूट मान्य।'
      },
      physical: {
        en: 'Mandatory PET/PST only for Havaldar in CBIC & CBN: Walking 1600m in 15 mins (Male), 1 km in 20 mins (Female). Height: Male 157.5 cm, Female 152 cm.',
        hi: 'केवल सीबीआईसी व सीबीएन हवलदार हेतु शारीरिक परीक्षण: 15 मिनट में 1600 मी टहलना (पुरुष), 20 मिनट में 1 किमी (महिला)। ऊंचाई: पुरुष 157.5 सेमी, महिला 152 सेमी।'
      },
      esmProvisions: {
        en: 'Reservation for Ex-Servicemen across states/cadres as notified.',
        hi: 'राज्यों और संवर्गों में भूतपूर्व सैनिकों हेतु अधिसूचित आरक्षण।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/13/2026-PP_3',
      notificationDate: '2026-06-27',
      applicationStart: '2026-06-27',
      applicationEnd: '2026-07-31',
      examDate: 'October - November 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 9583,
      source: 'Official Staff Selection Commission Notification'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Multi-Tasking Staff (Peon, Daftary, Jamadar, Farash, Chowkidar, Mali) across Ministries; Havaldar in CBIC and CBN.',
    stages: [
      {
        stageId: 'session1',
        stageName: { en: 'Session-I (Math & Reasoning)', hi: 'सत्र-I (गणित एवं तर्कशक्ति)' },
        mode: 'Computer Based Test',
        duration: '45 minutes (60 minutes for eligible scribes)',
        totalQuestions: 40,
        totalMarks: 120,
        negativeMarking: 'NO NEGATIVE MARKING in Session-I (Official Rule)',
        qualifyingNature: true,
        sections: [
          { name: { en: 'Numerical and Mathematical Ability', hi: 'संख्यात्मक एवं गणितीय योग्यता' }, questions: 20, marks: 60, negativePerWrong: 0 },
          { name: { en: 'Reasoning Ability and Problem Solving', hi: 'तर्कशक्ति एवं समस्या समाधान' }, questions: 20, marks: 60, negativePerWrong: 0 }
        ]
      },
      {
        stageId: 'session2',
        stageName: { en: 'Session-II (Merit Determining)', hi: 'सत्र-II (मेरिट निर्धारक सत्र)' },
        mode: 'Computer Based Test',
        duration: '45 minutes (60 minutes for eligible scribes)',
        totalQuestions: 50,
        totalMarks: 150,
        negativeMarking: '1 mark negative for each incorrect response',
        qualifyingNature: false,
        sections: [
          { name: { en: 'General Awareness', hi: 'सामान्य जागरूकता' }, questions: 25, marks: 75, negativePerWrong: 1 },
          { name: { en: 'English Language and Comprehension', hi: 'अंग्रेजी भाषा एवं बोधगम्यता' }, questions: 25, marks: 75, negativePerWrong: 1 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-GD-2026',
    examCode: 'gd',
    examName: { en: 'SSC GD Constable', hi: 'एसएससी जीडी कांस्टेबल' },
    fullName: {
      en: 'Constable (GD) in CAPFs, SSF and Rifleman (GD) in Assam Rifles Examination',
      hi: 'केंद्रीय सशस्त्र पुलिस बलों (CAPFs), SSF में कांस्टेबल (GD) एवं असम राइफल्स में राइफलमैन (GD) परीक्षा'
    },
    badge: '10th Matric • CAPFs & Armed Forces',
    year: 2026,
    duration: '60 minutes',
    questions: 80,
    marks: 160,
    negativeMarking: '0.25 marks per wrong answer',
    subjects: [
      'General Intelligence & Reasoning',
      'General Awareness',
      'Quantitative Aptitude',
      'General Hindi',
      'English Language',
      'Physical Preparation'
    ],
    eligibility: {
      education: {
        en: 'Matriculation or 10th Class Examination pass from a recognized Board/University.',
        hi: 'मान्यता प्राप्त बोर्ड से 10वीं कक्षा (मैट्रिक) उत्तीर्ण।'
      },
      ageMin: 18,
      ageMax: 23,
      ageRelaxation: {
        en: 'SC/ST: 5 years, OBC: 3 years, Ex-Servicemen: 3 years after deduction of military service.',
        hi: 'एससी/एसटी: 5 वर्ष, ओबीसी: 3 वर्ष, भूतपूर्व सैनिक: 3 वर्ष।'
      },
      physical: {
        en: 'Height: Male 170 cm, Female 157 cm. Chest (Male): 80 cm unexpanded with 5 cm expansion. Running (PET): Male: 5 km in 24 mins; Female: 1.6 km in 8.5 mins.',
        hi: 'ऊंचाई: पुरुष 170 सेमी, महिला 157 सेमी। सीना (पुरुष): 80 सेमी (5 सेमी फुलाव)। दौड़ (PET): पुरुष: 24 मिनट में 5 किमी; महिला: 8.5 मिनट में 1.6 किमी।'
      },
      esmProvisions: {
        en: '10% vacancies reserved horizontally for Ex-Servicemen. ESM exempted from PET.',
        hi: 'भूतपूर्व सैनिकों हेतु 10% रिक्तियां क्षैतिज आरक्षित। पीईटी से छूट प्राप्त।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/14/2026-PP_4',
      notificationDate: '2026-08-27',
      applicationStart: '2026-08-27',
      applicationEnd: '2026-10-05',
      examDate: 'January - February 2026/2027',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 39481,
      source: 'Staff Selection Commission Notification for Constable (GD)'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Constable (General Duty) in BSF, CISF, CRPF, SSB, ITBP, Assam Rifles (AR), Secretariat Security Force (SSF).',
    stages: [
      {
        stageId: 'cbe',
        stageName: { en: 'Computer Based Examination (CBE)', hi: 'कंप्यूटर आधारित परीक्षा (CBE)' },
        mode: 'Online Objective Test (Bilingual + 13 Regional Languages)',
        duration: '60 minutes',
        totalQuestions: 80,
        totalMarks: 160,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'Part-A: General Intelligence and Reasoning', hi: 'भाग-क: सामान्य बुद्धिमत्ता एवं तर्कशक्ति' }, questions: 20, marks: 40, negativePerWrong: 0.25 },
          { name: { en: 'Part-B: General Knowledge and General Awareness', hi: 'भाग-ख: सामान्य ज्ञान एवं जागरूकता' }, questions: 20, marks: 40, negativePerWrong: 0.25 },
          { name: { en: 'Part-C: Elementary Mathematics', hi: 'भाग-ग: प्रारंभिक गणित' }, questions: 20, marks: 40, negativePerWrong: 0.25 },
          { name: { en: 'Part-D: English OR Hindi (Candidate Choice)', hi: 'भाग-घ: अंग्रेजी अथवा हिंदी (वैकल्पिक)' }, questions: 20, marks: 40, negativePerWrong: 0.25 }
        ]
      },
      {
        stageId: 'pet-pst',
        stageName: { en: 'Physical Efficiency Test (PET) & PST', hi: 'शारीरिक दक्षता एवं मानक परीक्षण' },
        mode: 'Physical Running & Measurement by CAPF Board',
        duration: 'As per event specifications',
        totalQuestions: 0,
        totalMarks: 0,
        negativeMarking: 'None (Qualifying Only)',
        qualifyingNature: true,
        sections: [
          { name: { en: 'Male Running: 5 km in 24 Minutes', hi: 'पुरुष दौड़: 24 मिनट में 5 किमी' }, questions: 1, marks: 0, negativePerWrong: 0 },
          { name: { en: 'Female Running: 1.6 km in 8.5 Minutes', hi: 'महिला दौड़: 8.5 मिनट में 1.6 किमी' }, questions: 1, marks: 0, negativePerWrong: 0 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-CPO-2026',
    examCode: 'cpo',
    examName: { en: 'SSC CPO', hi: 'एसएससी सीपीओ' },
    fullName: {
      en: 'Sub-Inspector in Delhi Police and Central Armed Police Forces Examination',
      hi: 'दिल्ली पुलिस एवं केंद्रीय सशस्त्र पुलिस बलों में उप-निरीक्षक परीक्षा'
    },
    badge: 'Graduation Level • Sub-Inspector (Pay Level 6)',
    year: 2026,
    duration: 'Paper-I: 120 mins | Paper-II: 120 mins',
    questions: 200,
    marks: 200,
    negativeMarking: '0.25 marks per incorrect answer',
    subjects: [
      'General Intelligence & Reasoning',
      'General Awareness',
      'Quantitative Aptitude',
      'English Language',
      'Physical Preparation'
    ],
    eligibility: {
      education: {
        en: "Bachelor's degree from a recognized university. For SI in Delhi Police (Male): Valid Driving License for LMV (Motorcycle and Car) on the date fixed for Physical Endurance and Measurement Tests.",
        hi: 'मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री। दिल्ली पुलिस में पुरुष एसआई हेतु: पीईटी तिथि पर एलएमवी (मोटरसाइकिल व कार) का वैध ड्राइविंग लाइसेंस अनिवार्य।'
      },
      ageMin: 20,
      ageMax: 25,
      ageRelaxation: {
        en: 'OBC: 3 years, SC/ST: 5 years, Ex-Servicemen: 3 years.',
        hi: 'ओबीसी: 3 वर्ष, एससी/एसटी: 5 वर्ष, भूतपूर्व सैनिक: 3 वर्ष।'
      },
      physical: {
        en: 'Height: Male 170 cm (Chest 80-85 cm); Female 157 cm. PET Male: 100m in 16s, 1.6 km in 6.5 mins, Long Jump 3.65m, High Jump 1.2m, Shot Put 4.5m.',
        hi: 'ऊंचाई: पुरुष 170 सेमी (सीना 80-85 सेमी); महिला 157 सेमी। पुरुष पीईटी: 100 मी 16 से., 1.6 किमी 6.5 मिनट, लंबी कूद 3.65 मी, ऊंची कूद 1.2 मी, गोला फेंक 4.5 मी।'
      },
      esmProvisions: {
        en: 'Special quota for ESM in Delhi Police and CAPFs as officially notified.',
        hi: 'दिल्ली पुलिस एवं सीएपीएफ में भूतपूर्व सैनिकों हेतु विशेष कोटा।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/15/2026-PP_5',
      notificationDate: '2026-03-04',
      applicationStart: '2026-03-04',
      applicationEnd: '2026-03-29',
      examDate: 'June 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 4187,
      source: 'SSC Official SI in DP & CAPFs Notice'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Sub-Inspector (Executive) in Delhi Police; Sub-Inspector (GD) in BSF, CISF, CRPF, ITBP, SSB.',
    stages: [
      {
        stageId: 'paper1',
        stageName: { en: 'Paper-I (Computer Based Test)', hi: 'पेपर-I (कंप्यूटर आधारित)' },
        mode: 'Objective Multiple Choice',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 200,
        totalMarks: 200,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'General Intelligence and Reasoning', hi: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'General Knowledge and General Awareness', hi: 'सामान्य ज्ञान एवं जागरूकता' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'Quantitative Aptitude', hi: 'मात्रात्मक अभिरुचि' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'English Comprehension', hi: 'अंग्रेजी बोधगम्यता' }, questions: 50, marks: 50, negativePerWrong: 0.25 }
        ]
      },
      {
        stageId: 'paper2',
        stageName: { en: 'Paper-II (English Language & Comprehension)', hi: 'पेपर-II (अंग्रेजी भाषा एवं बोध)' },
        mode: 'Computer Based Test',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 200,
        totalMarks: 200,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'English Language & Comprehension', hi: 'अंग्रेजी भाषा एवं बोधगम्यता' }, questions: 200, marks: 200, negativePerWrong: 0.25 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-JE-2026',
    examCode: 'je',
    examName: { en: 'SSC JE', hi: 'एसएससी जेई' },
    fullName: {
      en: 'Junior Engineer (Civil, Mechanical & Electrical) Examination',
      hi: 'कनिष्ठ अभियंता (सिविल, मैकेनिकल एवं इलेक्ट्रिकल) परीक्षा'
    },
    badge: 'Engineering Degree / Diploma • Pay Level 6',
    year: 2026,
    duration: 'Paper-I: 120 mins | Paper-II: 120 mins',
    questions: 200,
    marks: 200,
    negativeMarking: 'Paper-I: 0.25 marks | Paper-II: 1.00 mark (out of 3)',
    subjects: [
      'Engineering',
      'General Intelligence & Reasoning',
      'General Awareness'
    ],
    eligibility: {
      education: {
        en: 'Degree in Civil/Electrical/Mechanical Engineering OR 3-year Diploma in Civil/Electrical/Mechanical Engineering from a recognized Institute (with 2 years experience for MES/BRO).',
        hi: 'सिविल/इलेक्ट्रिकल/मैकेनिकल में इंजीनियरिंग डिग्री अथवा 3 वर्षीय डिप्लोमा (एमईएस/बीआरओ हेतु 2 वर्ष का अनुभव)।'
      },
      ageMin: 18,
      ageMax: 30,
      ageRelaxation: {
        en: 'Up to 30 years (32 years for CPWD/CWC). SC/ST: 5 years, OBC: 3 years, PwBD: 10 years.',
        hi: 'अधिकतम 30 वर्ष (सीपीडब्ल्यूडी/सीडब्ल्यूसी हेतु 32 वर्ष)। एससी/एसटी: 5 वर्ष, ओबीसी: 3 वर्ष।'
      },
      esmProvisions: {
        en: 'Age relaxation as per central government guidelines for Ex-Servicemen.',
        hi: 'केंद्र सरकार के नियमों के अनुसार भूतपूर्व सैनिकों हेतु आयु सीमा में छूट।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/16/2026-PP_6',
      notificationDate: '2026-03-28',
      applicationStart: '2026-03-28',
      applicationEnd: '2026-04-18',
      examDate: 'June 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 1765,
      source: 'Staff Selection Commission JE Notification'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Junior Engineer (Civil/Electrical/Mechanical) in CPWD, MES, Border Roads Organisation (BRO), Central Water Commission (CWC), Farakka Barrage, DGQA, NTRO.',
    stages: [
      {
        stageId: 'paper1',
        stageName: { en: 'Paper-I (Computer Based Test)', hi: 'पेपर-I (कंप्यूटर आधारित)' },
        mode: 'Objective MCQ Test',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 200,
        totalMarks: 200,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'General Intelligence and Reasoning', hi: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'General Awareness', hi: 'सामान्य जागरूकता' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'General Engineering (Civil/Electrical/Mechanical)', hi: 'सामान्य इंजीनियरिंग (सिविल/इलेक्ट्रिकल/मैकेनिकल)' }, questions: 100, marks: 100, negativePerWrong: 0.25 }
        ]
      },
      {
        stageId: 'paper2',
        stageName: { en: 'Paper-II (Computer Based Technical Test)', hi: 'पेपर-II (तकनीकी सीबीटी)' },
        mode: 'Objective MCQ Test (Domain Specific)',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 100,
        totalMarks: 300,
        negativeMarking: '1 mark per wrong answer (3 marks per question)',
        qualifyingNature: false,
        sections: [
          { name: { en: 'Core Engineering Domain (Civil & Structural / Electrical / Mechanical)', hi: 'मूल इंजीनियरिंग शाखा (सिविल/इलेक्ट्रिकल/मैकेनिकल)' }, questions: 100, marks: 300, negativePerWrong: 1 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-STENO-2026',
    examCode: 'stenographer',
    examName: { en: 'SSC Stenographer', hi: 'एसएससी आशुलिपिक' },
    fullName: {
      en: 'Stenographer Grade "C" & "D" Examination',
      hi: 'आशुलिपिक ग्रेड "सी" एवं "डी" परीक्षा'
    },
    badge: '12th Pass • Shorthand Skill • No Math',
    year: 2026,
    duration: '120 minutes',
    questions: 200,
    marks: 200,
    negativeMarking: '0.25 marks per incorrect answer',
    subjects: [
      'General Intelligence & Reasoning',
      'General Awareness',
      'English Language',
      'Shorthand',
      'Typing'
    ],
    eligibility: {
      education: {
        en: '12th Standard or equivalent from a recognized Board or University. Shorthand skills required for Skill Test.',
        hi: 'मान्यता प्राप्त बोर्ड से 12वीं उत्तीर्ण। कौशल परीक्षा हेतु आशुलिपि ज्ञान अनिवार्य।'
      },
      ageMin: 18,
      ageMax: 30,
      ageRelaxation: {
        en: 'Grade C: 18-30 years; Grade D: 18-27 years. OBC: 3 yrs, SC/ST: 5 yrs, ESM: 3 yrs.',
        hi: 'ग्रेड सी: 18-30 वर्ष; ग्रेड डी: 18-27 वर्ष। ओबीसी: 3 वर्ष, एससी/एसटी: 5 वर्ष।'
      },
      skillReq: {
        en: 'Skill Test in Stenography: Grade C: 100 WPM dictation for 10 mins; Grade D: 80 WPM dictation for 10 mins. Transcription in English/Hindi on computer.',
        hi: 'आशुलिपि कौशल परीक्षा: ग्रेड सी: 100 शब्द/मिनट (10 मिनट डिक्टेशन); ग्रेड डी: 80 शब्द/मिनट (10 मिनट डिक्टेशन)। कंप्यूटर पर ट्रांसक्रिप्शन।'
      },
      esmProvisions: {
        en: 'Reservation applicable for Grade D posts as per central government norms.',
        hi: 'ग्रेड डी पदों हेतु केंद्र सरकार के नियमों के अनुसार आरक्षण लागू।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/17/2026-PP_7',
      notificationDate: '2026-07-26',
      applicationStart: '2026-07-26',
      applicationEnd: '2026-08-24',
      examDate: 'November - December 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 2006,
      source: 'SSC Official Stenographer Examination Notification'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Stenographer Grade C in Central Ministries and Election Commission; Stenographer Grade D in Subordinate Offices and Attached Offices across India.',
    stages: [
      {
        stageId: 'cbe',
        stageName: { en: 'Computer Based Examination (CBE)', hi: 'कंप्यूटर आधारित परीक्षा' },
        mode: 'Objective MCQ (Note: No Mathematics Section!)',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 200,
        totalMarks: 200,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'General Intelligence & Reasoning', hi: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'General Awareness', hi: 'सामान्य जागरूकता' }, questions: 50, marks: 50, negativePerWrong: 0.25 },
          { name: { en: 'English Language & Comprehension (Major Weightage)', hi: 'अंग्रेजी भाषा एवं बोध (प्रमुख भार)' }, questions: 100, marks: 100, negativePerWrong: 0.25 }
        ]
      },
      {
        stageId: 'skill-test',
        stageName: { en: 'Skill Test in Stenography', hi: 'आशुलिपि कौशल परीक्षा' },
        mode: 'Dictation & Transcription on Computer',
        duration: 'Dictation: 10 mins | Transcription: 40-65 mins based on grade/language',
        totalQuestions: 1,
        totalMarks: 0,
        negativeMarking: 'Evaluation by percentage of transcription errors',
        qualifyingNature: true,
        sections: [
          { name: { en: 'Grade C Shorthand (100 WPM)', hi: 'ग्रेड सी आशुलिपि (100 शब्द/मिनट)' }, questions: 1, marks: 0, negativePerWrong: 0 },
          { name: { en: 'Grade D Shorthand (80 WPM)', hi: 'ग्रेड डी आशुलिपि (80 शब्द/मिनट)' }, questions: 1, marks: 0, negativePerWrong: 0 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-SELECTION-POST-2026',
    examCode: 'selection-post',
    examName: { en: 'SSC Selection Post', hi: 'एसएससी चयन पद' },
    fullName: {
      en: 'Phase-XII / Phase-XIII Selection Posts Examination',
      hi: 'फेज-XII / फेज-XIII चयन पद परीक्षा'
    },
    badge: '10th / 12th / Graduate Specific Posts',
    year: 2026,
    duration: '60 minutes',
    questions: 100,
    marks: 200,
    negativeMarking: '0.50 marks per wrong answer',
    subjects: [
      'General Intelligence & Reasoning',
      'General Awareness',
      'Quantitative Aptitude',
      'English Language'
    ],
    eligibility: {
      education: {
        en: 'Categorized into 3 levels: (1) Matriculation Level, (2) Higher Secondary (10+2) Level, (3) Graduation and Above Level. Each post has specific essential qualifications, experience, and trade certificates.',
        hi: 'तीन स्तरों में विभाजित: (1) मैट्रिक स्तर, (2) उच्चतर माध्यमिक (10+2) स्तर, (3) स्नातक एवं उच्च स्तर। प्रत्येक पद हेतु विशिष्ट अनिवार्य योग्यता व अनुभव।'
      },
      ageMin: 18,
      ageMax: 30,
      ageRelaxation: {
        en: '18-25, 18-27, 18-30 or up to 37 years depending on individual post code. Standard category relaxations apply.',
        hi: 'पद कोड के आधार पर 18-25, 18-27, 18-30 या 37 वर्ष तक। श्रेणीवार नियमानुसार छूट।'
      },
      esmProvisions: {
        en: 'ESM reservations defined individually per post category.',
        hi: 'प्रत्येक पद श्रेणी के अनुसार भूतपूर्व सैनिक आरक्षण निर्धारित।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/18/2026-PP_8',
      notificationDate: '2026-02-26',
      applicationStart: '2026-02-26',
      applicationEnd: '2026-03-26',
      examDate: 'June 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 2049,
      source: 'Staff Selection Commission Phase Selection Post Notification'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Technical Superintendent, Laboratory Assistant, Junior Seed Analyst, Research Associate, Data Processing Assistant, Store Keeper, Library Information Assistant across Northern, Central, Eastern, Western, Southern, MP, and North-Eastern regions.',
    stages: [
      {
        stageId: 'cbe',
        stageName: { en: 'Computer Based Examination (Level-wise)', hi: 'कंप्यूटर आधारित परीक्षा (स्तरवार)' },
        mode: 'Objective MCQ (Separate papers for Matric, 10+2, and Graduate levels)',
        duration: '60 minutes',
        totalQuestions: 100,
        totalMarks: 200,
        negativeMarking: '0.50 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'General Intelligence', hi: 'सामान्य बुद्धिमत्ता' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'General Awareness', hi: 'सामान्य जागरूकता' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'Quantitative Aptitude', hi: 'मात्रात्मक अभिरुचि' }, questions: 25, marks: 50, negativePerWrong: 0.5 },
          { name: { en: 'English Language (Basic Knowledge)', hi: 'अंग्रेजी भाषा (मूल ज्ञान)' }, questions: 25, marks: 50, negativePerWrong: 0.5 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-JHT-2026',
    examCode: 'jht',
    examName: { en: 'SSC JHT / SHT', hi: 'एसएससी कनिष्ठ हिंदी अनुवादक' },
    fullName: {
      en: 'Junior Hindi Translator, Junior Translation Officer and Senior Hindi Translator Examination',
      hi: 'कनिष्ठ हिंदी अनुवादक, कनिष्ठ अनुवाद अधिकारी एवं वरिष्ठ हिंदी अनुवादक परीक्षा'
    },
    badge: "Master's Degree in Hindi/English • Pay Level 6 & 7",
    year: 2026,
    duration: 'Paper-I: 120 mins | Paper-II: 120 mins',
    questions: 200,
    marks: 200,
    negativeMarking: 'Paper-I: 0.25 marks per wrong answer',
    subjects: [
      'General Hindi',
      'English Language',
      'Translation'
    ],
    eligibility: {
      education: {
        en: "Master's Degree of a recognized University in Hindi with English as a compulsory or elective subject OR Master's Degree in English with Hindi + Recognized Diploma or Certificate Course in translation from Hindi to English & vice-versa OR 2 years experience of translation work.",
        hi: 'मान्यता प्राप्त विश्वविद्यालय से हिंदी में परास्नातक (अंग्रेजी अनिवार्य/ऐच्छिक विषय सहित) या अंग्रेजी में परास्नातक (हिंदी सहित) + अनुवाद में डिप्लोमा/प्रमाणपत्र या 2 वर्ष का अनुवाद कार्य अनुभव।'
      },
      ageMin: 18,
      ageMax: 30,
      ageRelaxation: {
        en: 'OBC: 3 years, SC/ST: 5 years, PwBD: 10 years, ESM: 3 years.',
        hi: 'ओबीसी: 3 वर्ष, एससी/एसटी: 5 वर्ष, दिव्यांग: 10 वर्ष, भूतपूर्व सैनिक: 3 वर्ष।'
      },
      esmProvisions: {
        en: 'ESM reservations in Group C and Group B non-gazetted posts as notified.',
        hi: 'अधिसूचित अनुसार ग्रुप सी एवं ग्रुप बी गैर-राजपत्रित पदों में भूतपूर्व सैनिक आरक्षण।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/19/2026-PP_9',
      notificationDate: '2026-08-02',
      applicationStart: '2026-08-02',
      applicationEnd: '2026-08-25',
      examDate: 'October - November 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 312,
      source: 'Staff Selection Commission JHT Official Notification'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Junior Translation Officer (JTO) in Central Secretariat Official Language Service (CSOLS); JTO in Armed Forces Headquarters; Junior Hindi Translator in subordinate offices; Senior Hindi Translator in Ministries.',
    stages: [
      {
        stageId: 'paper1',
        stageName: { en: 'Paper-I (Computer Based Test)', hi: 'पेपर-I (कंप्यूटर आधारित)' },
        mode: 'Objective Multiple Choice',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 200,
        totalMarks: 200,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'General Hindi', hi: 'सामान्य हिंदी' }, questions: 100, marks: 100, negativePerWrong: 0.25 },
          { name: { en: 'General English', hi: 'सामान्य अंग्रेजी' }, questions: 100, marks: 100, negativePerWrong: 0.25 }
        ]
      },
      {
        stageId: 'paper2',
        stageName: { en: 'Paper-II (Translation and Essay)', hi: 'पेपर-II (अनुवाद एवं निबंध)' },
        mode: 'Descriptive Pen & Paper Test',
        duration: '2 Hours (120 minutes)',
        totalQuestions: 4,
        totalMarks: 200,
        negativeMarking: 'None (Evaluated descriptively)',
        qualifyingNature: false,
        sections: [
          { name: { en: 'Translation (Hindi to English & English to Hindi)', hi: 'अनुवाद (हिंदी से अंग्रेजी एवं अंग्रेजी से हिंदी)' }, questions: 2, marks: 100, negativePerWrong: 0 },
          { name: { en: 'Essay (One in Hindi & One in English)', hi: 'निबंध (एक हिंदी में एवं एक अंग्रेजी में)' }, questions: 2, marks: 100, negativePerWrong: 0 }
        ]
      }
    ]
  },
  {
    examId: 'SSC-OTHER-2026',
    examCode: 'other',
    examName: { en: 'Other SSC Exams', hi: 'अन्य एसएससी परीक्षाएं' },
    fullName: {
      en: 'Specialized & Departmental Examinations (Scientific Assistant IMD, LDCE, etc.)',
      hi: 'विशिष्ट एवं विभागीय परीक्षाएं (वैज्ञानिक सहायक आईएमडी, एलडीसीई आदि)'
    },
    badge: 'Specialized Recruitment • Official Calendar Grounded',
    year: 2026,
    duration: '120 minutes',
    questions: 200,
    marks: 200,
    negativeMarking: '0.25 marks per wrong answer',
    subjects: [
      'General Intelligence & Reasoning',
      'Quantitative Aptitude',
      'English Language',
      'General Awareness',
      'Engineering'
    ],
    eligibility: {
      education: {
        en: 'Bachelor’s Degree in Science (with Physics as one of the subjects)/Computer Science/Information Technology or Diploma in Electronics & Telecommunication Engineering.',
        hi: 'विज्ञान में स्नातक (भौतिकी विषय सहित)/कंप्यूटर साइंस/आईटी या इलेक्ट्रॉनिक्स एवं टेलीकम्युनिकेशन इंजीनियरिंग में डिप्लोमा।'
      },
      ageMin: 18,
      ageMax: 30,
      ageRelaxation: {
        en: 'OBC: 3 yrs, SC/ST: 5 yrs as per official norms.',
        hi: 'ओबीसी: 3 वर्ष, एससी/एसटी: 5 वर्ष आधिकारिक नियमानुसार।'
      },
      esmProvisions: {
        en: 'As per DoPT rules for Group B/C recruitment.',
        hi: 'ग्रुप बी/सी भर्ती हेतु डीओपीटी नियमों के अनुसार।'
      }
    },
    officialNotification: {
      notificationNumber: 'F. No. HQ-PPI03/20/2026-SPEC',
      notificationDate: '2026-09-01',
      applicationStart: '2026-09-01',
      applicationEnd: '2026-09-30',
      examDate: 'December 2026',
      url: 'https://ssc.gov.in',
      tentativeVacancies: 995,
      source: 'Staff Selection Commission Calendar'
    },
    lastVerified: '2026-09-28',
    postsOverview: 'Scientific Assistant in India Meteorological Department (IMD); Grade C / D Limited Departmental Competitive Examination (LDCE).',
    stages: [
      {
        stageId: 'paper1',
        stageName: { en: 'Paper-I (Non-Tech + Technical)', hi: 'पेपर-I (गैर-तकनीकी + तकनीकी)' },
        mode: 'Computer Based Test',
        duration: '120 minutes',
        totalQuestions: 200,
        totalMarks: 200,
        negativeMarking: '0.25 marks per wrong answer',
        qualifyingNature: false,
        sections: [
          { name: { en: 'Part-I: Reasoning, Quant, English, GA', hi: 'भाग-I: रीजनिंग, गणित, अंग्रेजी, जीएस' }, questions: 100, marks: 100, negativePerWrong: 0.25 },
          { name: { en: 'Part-II: Physics / Computer Science / Electronics', hi: 'भाग-II: भौतिकी / कंप्यूटर साइंस / इलेक्ट्रॉनिक्स' }, questions: 100, marks: 100, negativePerWrong: 0.25 }
        ]
      }
    ]
  }
];

// Write exam files for all years (2024, 2025, 2026, latest) as requested in Section 5
examsMaster.forEach(exam => {
  const examDir = path.join(publicDataDir, 'exams', exam.examCode);
  fs.mkdirSync(examDir, { recursive: true });

  const year2024 = { ...exam, year: 2024, examId: `${exam.examId.replace('2026', '2024')}`, officialNotification: { ...exam.officialNotification, notificationDate: '2024-06-24', examDate: 'September 2024' } };
  const year2025 = { ...exam, year: 2025, examId: `${exam.examId.replace('2026', '2025')}`, officialNotification: { ...exam.officialNotification, notificationDate: '2025-06-15', examDate: 'September 2025' } };
  const year2026 = { ...exam, year: 2026 };

  fs.writeFileSync(path.join(examDir, '2024.json'), JSON.stringify(year2024, null, 2));
  fs.writeFileSync(path.join(examDir, '2025.json'), JSON.stringify(year2025, null, 2));
  fs.writeFileSync(path.join(examDir, '2026.json'), JSON.stringify(year2026, null, 2));
  fs.writeFileSync(path.join(examDir, 'latest.json'), JSON.stringify(year2026, null, 2));
});

console.log('Exam configurations created.');

// 2. SSC POSTS AND DEPARTMENTS EXPLORER DATA
const postsData = [
  {
    id: 'post-cgl-asocss',
    exam: 'cgl',
    postName: { en: 'Assistant Section Officer (CSS)', hi: 'सहायक अनुभाग अधिकारी (सीएसएस)' },
    department: 'Central Secretariat Service (CSS)',
    ministry: 'Ministry of Personnel, Public Grievances and Pensions',
    group: 'Group B (Non-Gazetted)',
    payLevel: 7,
    payScale: 'Rs. 44,900 to 1,42,400 (Basic)',
    ageRequirement: '20 to 30 years',
    qualification: {
      en: "Bachelor's Degree from a recognized University or equivalent.",
      hi: 'मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री।'
    },
    duties: [
      { en: 'Examining files, drafting office memorandums, notices, and parliamentary replies.', hi: 'फाइलों का परीक्षण, कार्यालय ज्ञापनों, सूचनाओं और संसदीय उत्तरों का प्रारूप तैयार करना।' },
      { en: 'Coordination between various ministries and inter-departmental policy monitoring.', hi: 'विभिन्न मंत्रालयों के बीच समन्वय और अंतर-विभागीय नीति की निगरानी।' }
    ],
    workEnvironment: {
      en: 'Desk-based in Central Secretariat (North Block, South Block, Shastri Bhawan, New Delhi). Regular office hours 9 AM to 5:30 PM.',
      hi: 'केंद्रीय सचिवालय (नॉर्थ ब्लॉक, साउथ ब्लॉक, शास्त्री भवन, नई दिल्ली) में डेस्क कार्य। नियमित कार्यालय समय।'
    },
    postingLocation: {
      en: 'Exclusively in New Delhi (Permanent Delhi Posting). Highly preferred for administrative aspirants.',
      hi: 'विशेष रूप से नई दिल्ली (स्थायी दिल्ली पोस्टिंग)। प्रशासनिक अभ्यर्थियों द्वारा अत्यंत पसंदीदा।'
    },
    physicalRequirements: { en: 'No specific physical endurance test required. General fitness.', hi: 'कोई विशिष्ट शारीरिक परीक्षण आवश्यक नहीं। सामान्य स्वास्थ्य।' },
    skillRequirements: { en: 'DEST typing speed qualification mandatory.', hi: 'DEST टाइपिंग गति अर्हता अनिवार्य।' },
    careerProgression: [
      { en: 'Assistant Section Officer (Level 7)', hi: 'सहायक अनुभाग अधिकारी (लेवल 7)' },
      { en: 'Section Officer (Level 8/10)', hi: 'अनुभाग अधिकारी (लेवल 8/10)' },
      { en: 'Under Secretary (Level 11)', hi: 'अवर सचिव (लेवल 11)' },
      { en: 'Deputy Secretary / Director (Level 12/13)', hi: 'उप सचिव / निदेशक (लेवल 12/13)' }
    ],
    officialSource: 'SSC CGL Gazette Notification 2026 (DoPT)',
    colorBadge: 'bg-blue-600 text-white'
  },
  {
    id: 'post-cgl-itinspector',
    exam: 'cgl',
    postName: { en: 'Inspector of Income Tax', hi: 'आयकर निरीक्षक' },
    department: 'Central Board of Direct Taxes (CBDT)',
    ministry: 'Ministry of Finance',
    group: 'Group B (Non-Gazetted)',
    payLevel: 7,
    payScale: 'Rs. 44,900 to 1,42,400',
    ageRequirement: '18 to 30 years',
    qualification: {
      en: "Bachelor's degree in any discipline.",
      hi: 'किसी भी संकाय में स्नातक डिग्री।'
    },
    duties: [
      { en: 'Assessment of direct taxes, income verification, scrutiny of returns, and search & seizure actions.', hi: 'प्रत्यक्ष करों का निर्धारण, आय सत्यापन, रिटर्न की जांच और तलाशी एवं जब्ती कार्रवाई।' },
      { en: 'Handling tax dispute records, issuing summons, field inspection.', hi: 'कर विवाद रिकॉर्ड संभालना, समन जारी करना, फील्ड निरीक्षण।' }
    ],
    workEnvironment: {
      en: 'Hybrid of office assessment work and field investigation. Prestigious investigative executive role.',
      hi: 'कार्यालय मूल्यांकन कार्य और फील्ड जांच का हाइब्रिड। प्रतिष्ठित कार्यकारी भूमिका।'
    },
    postingLocation: {
      en: 'Pan India (Zonal CCIT charges across India). State-level transfers as per CBDT transfer policy.',
      hi: 'अखिल भारतीय (भारत भर में क्षेत्रीय सीसीआईटी प्रभार)।'
    },
    physicalRequirements: { en: 'General medical fitness; no rigorous physical running standard.', hi: 'सामान्य मेडिकल फिटनेस; कोई कठिन दौड़ मानक नहीं।' },
    careerProgression: [
      { en: 'Inspector of Income Tax (Level 7)', hi: 'आयकर निरीक्षक (लेवल 7)' },
      { en: 'Income Tax Officer - ITO (Level 8)', hi: 'आयकर अधिकारी - आईटीओ (लेवल 8)' },
      { en: 'Assistant Commissioner of Income Tax - ACIT (IRS cadre Level 10)', hi: 'सहायक आयकर आयुक्त - एसीआईटी (लेवल 10)' },
      { en: 'Deputy Commissioner of Income Tax - DCIT (Level 11)', hi: 'उप आयकर आयुक्त - डीसीआईटी (लेवल 11)' }
    ],
    officialSource: 'CBDT Cadre Restructuring & SSC CGL Notice',
    colorBadge: 'bg-emerald-600 text-white'
  },
  {
    id: 'post-cgl-gstinspector',
    exam: 'cgl',
    postName: { en: 'Inspector (Central Excise / GST)', hi: 'निरीक्षक (केंद्रीय उत्पाद / जीएसटी)' },
    department: 'Central Board of Indirect Taxes and Customs (CBIC)',
    ministry: 'Ministry of Finance',
    group: 'Group B (Non-Gazetted)',
    payLevel: 7,
    payScale: 'Rs. 44,900 to 1,42,400',
    ageRequirement: '18 to 30 years',
    qualification: {
      en: "Bachelor's Degree from a recognized university.",
      hi: 'मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री।'
    },
    duties: [
      { en: 'Enforcement of Goods and Services Tax (GST) laws, factory audits, anti-evasion raids, and revenue monitoring.', hi: 'जीएसटी कानूनों का प्रवर्तन, कारखाना ऑडिट, कर चोरी विरोधी छापे और राजस्व निगरानी।' },
      { en: 'Verification of tax credits, documentation, and border/inland check-posts.', hi: 'टैक्स क्रेडिट का सत्यापन, प्रलेखन और चेक-पोस्ट निगरानी।' }
    ],
    workEnvironment: {
      en: 'Executive uniform post with field operations, factory audits, and office charge administration.',
      hi: 'वर्दीधारी पद, फील्ड संचालन, कारखाना ऑडिट और कार्यालय प्रभार प्रशासन।'
    },
    postingLocation: {
      en: 'Pan-India CBIC Commissionerates and Zones (Mumbai, Delhi, Kolkata, Chennai, Bangalore, Hyderabad, etc.).',
      hi: 'अखिल भारतीय सीबीआईसी कमिश्नरेट और जोन।'
    },
    physicalRequirements: {
      en: 'Physical Standards Mandatory: Male: Height 157.5 cm, Chest 81 cm (expanded 86 cm). PET: Walking 1600m in 15 mins, Cycling 8 km in 30 mins. Female: Height 152 cm, Weight 48 kg; Walking 1 km in 20 mins, Cycling 3 km in 25 mins.',
      hi: 'शारीरिक मानक अनिवार्य: पुरुष: ऊंचाई 157.5 सेमी, सीना 81 सेमी। पीईटी: 15 मिनट में 1600 मी टहलना, 30 मिनट में 8 किमी साइकिल। महिला: ऊंचाई 152 सेमी, भार 48 किग्रा।'
    },
    careerProgression: [
      { en: 'Inspector GST / Central Excise (Level 7)', hi: 'निरीक्षक जीएसटी / केंद्रीय उत्पाद (लेवल 7)' },
      { en: 'Superintendent of Central GST (Level 8/10)', hi: 'अधीक्षक सेंट्रल जीएसटी (लेवल 8/10)' },
      { en: 'Assistant Commissioner - IRS (Level 10)', hi: 'सहायक आयुक्त - आईआरएस (लेवल 10)' },
      { en: 'Deputy Commissioner (Level 11)', hi: 'उप आयुक्त (लेवल 11)' }
    ],
    officialSource: 'CBIC Recruitment Rules & SSC Official Notification',
    colorBadge: 'bg-indigo-600 text-white'
  },
  {
    id: 'post-cgl-aeo-ed',
    exam: 'cgl',
    postName: { en: 'Assistant Enforcement Officer (AEO)', hi: 'सहायक प्रवर्तन अधिकारी (एईओ)' },
    department: 'Directorate of Enforcement (ED)',
    ministry: 'Department of Revenue, Ministry of Finance',
    group: 'Group B (Non-Gazetted)',
    payLevel: 7,
    payScale: 'Rs. 44,900 to 1,42,400 (+ 20% Special Security Allowance)',
    ageRequirement: '18 to 30 years',
    qualification: {
      en: "Bachelor's Degree in any discipline.",
      hi: 'किसी भी विषय में स्नातक डिग्री।'
    },
    duties: [
      { en: 'Investigating money laundering (PMLA) and foreign exchange violations (FEMA). Intelligence gathering, searches, seizures, and summons.', hi: 'धन शोधन (PMLA) और विदेशी मुद्रा उल्लंघन (FEMA) की जांच, खुफिया जानकारी जुटाना, तलाशी व जब्ती।' },
      { en: 'Assisting in asset attachment proceedings and court representations.', hi: 'संपत्ति कुर्की कार्यवाही और अदालती प्रस्तुतीकरण में सहायता।' }
    ],
    workEnvironment: {
      en: 'High-profile economic investigative agency. Involves field raids, forensic financial audits, and confidential reports.',
      hi: 'हाई-प्रोफाइल आर्थिक जांच एजेंसी। फील्ड छापे, फोरेंसिक वित्तीय ऑडिट और गोपनीय रिपोर्ट।'
    },
    postingLocation: {
      en: 'ED Head Office (New Delhi) and Regional/Zonal Offices in major cities across India.',
      hi: 'प्रवर्तन निदेशालय मुख्यालय (नई दिल्ली) और भारत भर के प्रमुख शहरों में क्षेत्रीय/जोनल कार्यालय।'
    },
    physicalRequirements: { en: 'Good physical health, medical clearance.', hi: 'अच्छा शारीरिक स्वास्थ्य, मेडिकल क्लीयरेंस।' },
    careerProgression: [
      { en: 'Assistant Enforcement Officer (Level 7)', hi: 'सहायक प्रवर्तन अधिकारी (लेवल 7)' },
      { en: 'Enforcement Officer (Level 8)', hi: 'प्रवर्तन अधिकारी (लेवल 8)' },
      { en: 'Assistant Director - ED (Level 10)', hi: 'सहायक निदेशक - ईडी (लेवल 10)' },
      { en: 'Deputy Director (Level 11)', hi: 'उप निदेशक (लेवल 11)' }
    ],
    officialSource: 'Directorate of Enforcement Recruitment Rules',
    colorBadge: 'bg-red-600 text-white'
  },
  {
    id: 'post-cgl-subinspector-cbi',
    exam: 'cgl',
    postName: { en: 'Sub-Inspector in Central Bureau of Investigation (CBI)', hi: 'केंद्रीय अन्वेषण ब्यूरो (सीबीआई) में उप-निरीक्षक' },
    department: 'Central Bureau of Investigation (CBI)',
    ministry: 'Department of Personnel and Training (DoPT)',
    group: 'Group B (Non-Gazetted)',
    payLevel: 7,
    payScale: 'Rs. 44,900 to 1,42,400 (+ 25% Special Incentive Allowance + 13-month salary)',
    ageRequirement: '20 to 30 years',
    qualification: {
      en: "Bachelor's Degree from a recognized university.",
      hi: 'मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री।'
    },
    duties: [
      { en: 'Investigating anti-corruption, economic offenses, special crimes, cybercrimes, and cases referred by Supreme Court / High Courts.', hi: 'भ्रष्टाचार निवारण, आर्थिक अपराध, विशेष अपराध, साइबर अपराध और न्यायालय द्वारा संदर्भित मामलों की जांच।' },
      { en: 'Conducting raids, witness interrogations, evidence gathering, preparing charge sheets, and prosecuting in Special CBI Courts.', hi: 'छापे, गवाहों से पूछताछ, साक्ष्य संग्रह, आरोप पत्र तैयार करना और सीबीआई अदालतों में पैरवी।' }
    ],
    workEnvironment: {
      en: 'Rigorous investigative agency. 32-week intensive training at CBI Academy, Ghaziabad. Demanding work hours with high operational exposure.',
      hi: 'कठिन जांच एजेंसी। सीबीआई अकादमी, गाजियाबाद में 32 सप्ताह का गहन प्रशिक्षण।'
    },
    postingLocation: {
      en: 'CBI HQ (New Delhi) and branches across India (Anti-Corruption Branches, Economic Offences Wings).',
      hi: 'सीबीआई मुख्यालय (नई दिल्ली) और भारत भर की शाखाएं।'
    },
    physicalRequirements: {
      en: 'Height: Male: 165 cm, Female: 150 cm (Relaxation: 5 cm for Hills/Tribals). Chest (Male): 76 cm with expansion. Vision: Distant: 6/6 in one and 6/9 in other.',
      hi: 'ऊंचाई: पुरुष 165 सेमी, महिला 150 सेमी। सीना (पुरुष): 76 सेमी फुलाव सहित। दृष्टि: 6/6 और 6/9।'
    },
    careerProgression: [
      { en: 'Sub-Inspector (Level 7)', hi: 'उप-निरीक्षक (लेवल 7)' },
      { en: 'Inspector (Level 8)', hi: 'निरीक्षक (लेवल 8)' },
      { en: 'Deputy Superintendent of Police - DySP (Level 10)', hi: 'पुलिस उप-अधीक्षक - डीवाईएसपी (लेवल 10)' },
      { en: 'Additional Superintendent of Police - Addl SP (Level 11)', hi: 'अपर पुलिस अधीक्षक (लेवल 11)' }
    ],
    officialSource: 'CBI Academy & SSC Notification',
    colorBadge: 'bg-amber-600 text-white'
  },
  {
    id: 'post-cgl-jso',
    exam: 'cgl',
    postName: { en: 'Junior Statistical Officer (JSO)', hi: 'कनिष्ठ सांख्यिकी अधिकारी (जेएसओ)' },
    department: 'Subordinate Statistical Service (SSS)',
    ministry: 'Ministry of Statistics and Programme Implementation (MoSPI)',
    group: 'Group B (Non-Gazetted)',
    payLevel: 6,
    payScale: 'Rs. 35,400 to 1,12,400',
    ageRequirement: '18 to 32 years (Relaxable for OBC/SC/ST)',
    qualification: {
      en: "Bachelor's Degree in any subject with at least 60% Marks in Mathematics at 12th standard level OR Bachelor's Degree in any subject with Statistics as one of the subjects at degree level.",
      hi: '12वीं में गणित में न्यूनतम 60% अंकों के साथ स्नातक या डिग्री स्तर पर सांख्यिकी विषय के साथ स्नातक।'
    },
    duties: [
      { en: 'Field survey operations, socio-economic surveys, national sample surveys (NSSO), price data collection, and statistical compilation.', hi: 'क्षेत्रीय सर्वेक्षण, सामाजिक-आर्थिक सर्वेक्षण, राष्ट्रीय प्रतिदर्श सर्वेक्षण (NSSO), मूल्य डेटा संग्रह।' },
      { en: 'Data analysis and publication of official government statistics.', hi: 'आधिकारिक सरकारी सांख्यिकी का डेटा विश्लेषण और प्रकाशन।' }
    ],
    workEnvironment: {
      en: 'Field Operations Division (FOD) involves extensive travel and grassroots surveys; Headquarters posts involve data modeling and reporting.',
      hi: 'फील्ड ऑपरेशंस डिवीजन (FOD) में व्यापक क्षेत्रीय भ्रमण और सर्वेक्षण; मुख्यालय में डेटा मॉडलिंग।'
    },
    postingLocation: {
      en: 'Pan-India NSSO regional offices and Central MoSPI headquarters.',
      hi: 'अखिल भारतीय एनएसएसओ क्षेत्रीय कार्यालय और केंद्रीय एमओएसपीआई मुख्यालय।'
    },
    physicalRequirements: { en: 'Standard medical fitness.', hi: 'मानक मेडिकल फिटनेस।' },
    careerProgression: [
      { en: 'Junior Statistical Officer (Level 6)', hi: 'कनिष्ठ सांख्यिकी अधिकारी (लेवल 6)' },
      { en: 'Senior Statistical Officer - SSO (Level 7)', hi: 'वरिष्ठ सांख्यिकी अधिकारी (लेवल 7)' },
      { en: 'Assistant Director (Indian Statistical Service cadre Level 10)', hi: 'सहायक निदेशक (लेवल 10)' },
      { en: 'Deputy Director (Level 11)', hi: 'उप निदेशक (लेवल 11)' }
    ],
    officialSource: 'MoSPI SSS Cadre Rules',
    colorBadge: 'bg-teal-600 text-white'
  },
  {
    id: 'post-cpo-delhipolice-si',
    exam: 'cpo',
    postName: { en: 'Sub-Inspector (Executive) in Delhi Police', hi: 'दिल्ली पुलिस में उप-निरीक्षक (कार्यकारी)' },
    department: 'Delhi Police',
    ministry: 'Ministry of Home Affairs (MHA)',
    group: 'Group C (Pay Level 6)',
    payLevel: 6,
    payScale: 'Rs. 35,400 to 1,12,400',
    ageRequirement: '20 to 25 years',
    qualification: {
      en: "Bachelor's degree from a recognized university. Male candidates must possess a valid driving license for LMV (Motorcycle and Car) on the date of PET/PST.",
      hi: 'स्नातक डिग्री। पुरुष अभ्यर्थियों के पास पीईटी/पीएसटी की तिथि पर एलएमवी (मोटरसाइकिल व कार) का वैध ड्राइविंग लाइसेंस होना अनिवार्य है।'
    },
    duties: [
      { en: 'Law and order maintenance, crime investigation, registration of FIRs, patrolling, and VIP security in the National Capital Territory.', hi: 'राष्ट्रीय राजधानी क्षेत्र में कानून व्यवस्था बनाए रखना, अपराध जांच, एफआईआर दर्ज करना, गश्त।' },
      { en: 'Investigation officer (IO) in criminal cases, court presentation, crime prevention.', hi: 'आपराधिक मामलों में जांच अधिकारी (आईओ), अदालती प्रस्तुति, अपराध रोकथाम।' }
    ],
    workEnvironment: {
      en: 'Police Station / Specialized Units (Crime Branch, Special Cell, Traffic). 24x7 law enforcement responsibilities.',
      hi: 'पुलिस स्टेशन / विशिष्ट इकाइयां (क्राइम ब्रांच, स्पेशल सेल, ट्रैफिक)। 24x7 कानून प्रवर्तन।'
    },
    postingLocation: {
      en: 'National Capital Territory of Delhi (Permanent Delhi Posting). Highly sought-after CPO post.',
      hi: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली (स्थायी दिल्ली पोस्टिंग)।'
    },
    physicalRequirements: {
      en: 'Height: Male 170 cm (Chest 80-85 cm); Female 157 cm. Rigorous PET: 100m sprint in 16s, 1.6 km in 6.5 mins, Long jump 3.65m, High jump 1.2m, Shot put 4.5m.',
      hi: 'ऊंचाई: पुरुष 170 सेमी (सीना 80-85 सेमी); महिला 157 सेमी। कठिन पीईटी: 100 मी 16 सेकंड, 1.6 किमी 6.5 मिनट, लंबी कूद 3.65 मी, ऊंची कूद 1.2 मी।'
    },
    careerProgression: [
      { en: 'Sub-Inspector (Level 6)', hi: 'उप-निरीक्षक (लेवल 6)' },
      { en: 'Inspector (Level 7)', hi: 'निरीक्षक (लेवल 7)' },
      { en: 'Assistant Commissioner of Police - ACP (DANIPS Level 10)', hi: 'सहायक पुलिस आयुक्त - एसीपी (लेवल 10)' },
      { en: 'Deputy Commissioner of Police - DCP (Level 11)', hi: 'पुलिस उपायुक्त - डीसीपी (लेवल 11)' }
    ],
    officialSource: 'Delhi Police Act & SSC CPO Notice',
    colorBadge: 'bg-red-700 text-white'
  },
  {
    id: 'post-chsl-ldc',
    exam: 'chsl',
    postName: { en: 'Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA)', hi: 'अवर श्रेणी लिपिक (एलडीसी) / कनिष्ठ सचिवालय सहायक (जेएसए)' },
    department: 'Various Ministries, Departments & Subordinate Offices',
    ministry: 'Central Government of India',
    group: 'Group C',
    payLevel: 2,
    payScale: 'Rs. 19,900 to 63,200',
    ageRequirement: '18 to 27 years',
    qualification: {
      en: '12th Standard Pass from a recognized Board.',
      hi: 'मान्यता प्राप्त बोर्ड से 12वीं उत्तीर्ण।'
    },
    duties: [
      { en: 'Clerical operations, diary and dispatch of official correspondence, maintaining file registers, and data entry.', hi: 'लिपिकीय संचालन, पत्राचार की डायरी और प्रेषण, फाइल रजिस्टर और डेटा प्रविष्टि।' },
      { en: 'Preparation of routine statements, salary bills, and RTI collation under supervision.', hi: 'नेमी विवरण, वेतन बिल और आरटीआई सूचना संकलन।' }
    ],
    workEnvironment: {
      en: 'Standard ministerial office environment. Mon-Fri 9:00 AM to 5:30 PM.',
      hi: 'मानक मंत्रालय कार्यालय वातावरण। सोमवार से शुक्रवार 9:00 से 5:30।'
    },
    postingLocation: {
      en: 'Ministries in New Delhi (MoD, MHA, MoF, MoEF) and regional offices across all states/UTs.',
      hi: 'नई दिल्ली में मंत्रालय और सभी राज्यों/केंद्रशासित प्रदेशों में क्षेत्रीय कार्यालय।'
    },
    skillRequirements: {
      en: 'Typing Test qualifying speed: English 35 WPM (10500 KDPH) OR Hindi 30 WPM (9000 KDPH).',
      hi: 'टाइपिंग टेस्ट क्वालिफाइंग गति: अंग्रेजी 35 शब्द/मिनट या हिंदी 30 शब्द/मिनट।'
    },
    careerProgression: [
      { en: 'Lower Division Clerk / JSA (Level 2)', hi: 'अवर श्रेणी लिपिक / जेएसए (लेवल 2)' },
      { en: 'Upper Division Clerk / SSA (Level 4)', hi: 'प्रवर श्रेणी लिपिक / एसएसए (लेवल 4)' },
      { en: 'Assistant Section Officer (Level 7 - through LDCE/Promotion)', hi: 'सहायक अनुभाग अधिकारी (लेवल 7)' },
      { en: 'Section Officer (Level 8)', hi: 'अनुभाग अधिकारी (लेवल 8)' }
    ],
    officialSource: 'DoPT Model RRs & SSC CHSL Notification',
    colorBadge: 'bg-cyan-600 text-white'
  },
  {
    id: 'post-mts-staff',
    exam: 'mts',
    postName: { en: 'Multi-Tasking Staff (Non-Technical)', hi: 'मल्टी-टास्किंग स्टाफ (गैर-तकनीकी)' },
    department: 'Various Central Government Ministries and Departments',
    ministry: 'Government of India',
    group: 'Group C (Pay Level 1)',
    payLevel: 1,
    payScale: 'Rs. 18,000 to 56,900',
    ageRequirement: '18 to 25 years / 18 to 27 years depending on cadre',
    qualification: {
      en: 'Matriculation (10th Pass) from a recognized Board.',
      hi: 'मान्यता प्राप्त बोर्ड से 10वीं कक्षा उत्तीर्ण।'
    },
    duties: [
      { en: 'Physical maintenance of records of the section, general cleanliness, assisting in routine office work like diary, dispatch, photocopying, sending FAX etc.', hi: 'अनुभाग के रिकॉर्ड का भौतिक रख-रखाव, सामान्य स्वच्छता, डायरी, प्रेषण, फोटोकॉपी में सहायता।' },
      { en: 'Delivering files and papers inside and outside the building, opening and closing of rooms, IT assistance.', hi: 'फाइलों और कागजातों को पहुंचाना, कमरे खोलना और बंद करना, आईटी सहायता।' }
    ],
    workEnvironment: {
      en: 'Office environment in Central Government buildings across all Indian states and Union Territories.',
      hi: 'भारत के सभी राज्यों और केंद्रशासित प्रदेशों में केंद्र सरकार के कार्यालय।'
    },
    postingLocation: {
      en: 'State/UT chosen during application preference (All India Service Liability).',
      hi: 'आवेदन के दौरान चुनी गई राज्य/यूटी वरीयता।'
    },
    physicalRequirements: { en: 'General physical fitness.', hi: 'सामान्य शारीरिक स्वास्थ्य।' },
    careerProgression: [
      { en: 'Multi-Tasking Staff (Level 1)', hi: 'मल्टी-टास्किंग स्टाफ (लेवल 1)' },
      { en: 'Lower Division Clerk (Level 2 - via departmental LDCE)', hi: 'अवर श्रेणी लिपिक (लेवल 2 - विभागीय परीक्षा)' },
      { en: 'Upper Division Clerk (Level 4)', hi: 'प्रवर श्रेणी लिपिक (लेवल 4)' }
    ],
    officialSource: 'SSC MTS Recruitment Rules',
    colorBadge: 'bg-emerald-700 text-white'
  },
  {
    id: 'post-gd-bsf-constable',
    exam: 'gd',
    postName: { en: 'Constable (General Duty) - BSF', hi: 'कांस्टेबल (जनरल ड्यूटी) - बीएसएफ' },
    department: 'Border Security Force (BSF)',
    ministry: 'Ministry of Home Affairs (MHA)',
    group: 'Group C',
    payLevel: 3,
    payScale: 'Rs. 21,700 to 69,100',
    ageRequirement: '18 to 23 years',
    qualification: {
      en: '10th Class Pass from a recognized Board.',
      hi: 'मान्यता प्राप्त बोर्ड से 10वीं पास।'
    },
    duties: [
      { en: 'Guarding India-Pakistan and India-Bangladesh international borders, preventing smuggling, infiltration, and trans-border crimes.', hi: 'भारत-पाकिस्तान और भारत-बांग्लादेश अंतरराष्ट्रीय सीमाओं की रक्षा, घुसपैठ और सीमा पार अपराधों की रोकथाम।' },
      { en: 'Border outpost (BOP) patrolling, anti-tunneling operations, disaster response.', hi: 'सीमा चौकी (बीओपी) गश्त, एंटी-टनलिंग ऑपरेशन, आपदा राहत।' }
    ],
    workEnvironment: {
      en: 'Hard field postings along International Borders (Thar desert, Rann of Kutch, Kashmir LOC, riverine border in Bengal/Assam).',
      hi: 'अंतरराष्ट्रीय सीमा पर कठिन फील्ड पोस्टिंग (थार मरुस्थल, कच्छ का रण, कश्मीर एलओसी आदि)।'
    },
    postingLocation: {
      en: 'Border battalions deployed on Western and Eastern frontiers.',
      hi: 'पश्चिमी और पूर्वी सीमाओं पर तैनात सीमा बटालियन।'
    },
    physicalRequirements: {
      en: 'Height: Male 170 cm, Female 157 cm; Chest: Male 80-85 cm. PET: Male 5 km in 24 mins; Female 1.6 km in 8.5 mins.',
      hi: 'ऊंचाई: पुरुष 170 सेमी, महिला 157 सेमी; सीना: पुरुष 80-85 सेमी। दौड़: पुरुष 24 मिनट में 5 किमी।'
    },
    careerProgression: [
      { en: 'Constable (GD) (Level 3)', hi: 'कांस्टेबल (जीडी) (लेवल 3)' },
      { en: 'Head Constable (Level 4)', hi: 'हेड कांस्टेबल (लेवल 4)' },
      { en: 'Assistant Sub-Inspector - ASI (Level 5)', hi: 'सहायक उप-निरीक्षक (लेवल 5)' },
      { en: 'Sub-Inspector (Level 6)', hi: 'उप-निरीक्षक (लेवल 6)' },
      { en: 'Inspector (Level 7)', hi: 'निरीक्षक (लेवल 7)' }
    ],
    officialSource: 'MHA / BSF Act & SSC GD Notification',
    colorBadge: 'bg-green-700 text-white'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'posts', 'posts.json'), JSON.stringify(postsData, null, 2));
console.log('Posts and departments data created.');

// 3. VACANCIES DATA
const vacanciesData = [
  {
    id: 'vac-cgl-2026',
    exam: 'cgl',
    year: 2026,
    post: 'Combined Graduate Level Posts (Group B & C)',
    department: 'Various Ministries / Departments / Organisations',
    category: { ur: 7225, obc: 4612, sc: 2680, st: 1410, ews: 1800, esm: 1650, total: 17727 },
    isTentative: true,
    source: 'SSC Official Notice Tentative Vacancies for CGL 2026',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  },
  {
    id: 'vac-chsl-2026',
    exam: 'chsl',
    year: 2026,
    post: 'LDC / JSA / DEO Grade A',
    department: 'Central Government Ministries and Departments',
    category: { ur: 1542, obc: 980, sc: 556, st: 284, ews: 350, esm: 320, total: 3712 },
    isTentative: true,
    source: 'SSC CHSL 2026 Notification',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  },
  {
    id: 'vac-mts-2026',
    exam: 'mts',
    year: 2026,
    post: 'MTS & Havaldar in CBIC/CBN',
    department: 'Various Ministries & CBIC/CBN',
    category: { ur: 4120, obc: 2450, sc: 1420, st: 710, ews: 883, esm: 910, total: 9583 },
    isTentative: true,
    source: 'SSC MTS & Havaldar Notice',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  },
  {
    id: 'vac-gd-2026',
    exam: 'gd',
    year: 2026,
    post: 'Constable (GD) in BSF, CISF, CRPF, SSB, ITBP, AR, SSF',
    department: 'Central Armed Police Forces (MHA)',
    category: { ur: 16210, obc: 10450, sc: 5820, st: 3201, ews: 3800, esm: 3948, total: 39481 },
    isTentative: true,
    source: 'CAPFs / MHA Requisition via SSC',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  },
  {
    id: 'vac-cpo-2026',
    exam: 'cpo',
    year: 2026,
    post: 'Sub-Inspector in Delhi Police & CAPFs',
    department: 'Delhi Police & Central Armed Police Forces',
    category: { ur: 1720, obc: 1120, sc: 630, st: 317, ews: 400, esm: 418, total: 4187 },
    isTentative: true,
    source: 'SSC CPO Notification',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  },
  {
    id: 'vac-je-2026',
    exam: 'je',
    year: 2026,
    post: 'Junior Engineer (Civil, Mechanical, Electrical)',
    department: 'CPWD, MES, BRO, CWC, Farakka, NTRO',
    category: { ur: 730, obc: 465, sc: 260, st: 135, ews: 175, esm: 120, total: 1765 },
    isTentative: true,
    source: 'SSC JE Official Notice',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  },
  {
    id: 'vac-steno-2026',
    exam: 'stenographer',
    year: 2026,
    post: 'Stenographer Grade C & D',
    department: 'Central Ministries & Attached Offices',
    category: { ur: 840, obc: 530, sc: 300, st: 140, ews: 196, esm: 180, total: 2006 },
    isTentative: true,
    source: 'SSC Stenographer Notification',
    sourceUrl: 'https://ssc.gov.in',
    lastVerified: '2026-09-28'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'vacancies', 'vacancies.json'), JSON.stringify(vacanciesData, null, 2));
console.log('Vacancies data created.');

// 4. HISTORICAL CUTOFFS DATA
const cutoffsData = [
  {
    id: 'cut-cgl-2024-t1',
    exam: 'cgl',
    year: 2024,
    tier: 'Tier-I (Out of 200 - Normalized)',
    category: 'UR',
    post: 'All Posts (except JSO & AAO)',
    cutoff: 153.28,
    candidatesQualified: 13735,
    source: 'SSC CGL Tier-I Result Writeup (Official)',
    notes: 'Qualifying for appearing in Tier-II. Negative marking was 0.50.'
  },
  {
    id: 'cut-cgl-2024-t1-obc',
    exam: 'cgl',
    year: 2024,
    tier: 'Tier-I (Out of 200 - Normalized)',
    category: 'OBC',
    post: 'All Posts (except JSO & AAO)',
    cutoff: 146.54,
    candidatesQualified: 28412,
    source: 'SSC CGL Tier-I Result Writeup',
    notes: 'OBC category cutoff for Tier-II qualification.'
  },
  {
    id: 'cut-cgl-2024-t1-ews',
    exam: 'cgl',
    year: 2024,
    tier: 'Tier-I (Out of 200 - Normalized)',
    category: 'EWS',
    post: 'All Posts',
    cutoff: 143.82,
    candidatesQualified: 14210,
    source: 'SSC CGL Result Writeup',
    notes: 'Economically Weaker Section.'
  },
  {
    id: 'cut-cgl-2024-t1-sc',
    exam: 'cgl',
    year: 2024,
    tier: 'Tier-I (Out of 200 - Normalized)',
    category: 'SC',
    post: 'All Posts',
    cutoff: 126.86,
    candidatesQualified: 18920,
    source: 'SSC CGL Result Writeup',
    notes: 'Scheduled Caste.'
  },
  {
    id: 'cut-cgl-2024-t1-st',
    exam: 'cgl',
    year: 2024,
    tier: 'Tier-I (Out of 200 - Normalized)',
    category: 'ST',
    post: 'All Posts',
    cutoff: 118.15,
    candidatesQualified: 8940,
    source: 'SSC CGL Result Writeup',
    notes: 'Scheduled Tribe.'
  },
  {
    id: 'cut-cgl-2024-t1-esm',
    exam: 'cgl',
    year: 2024,
    tier: 'Tier-I (Out of 200 - Normalized)',
    category: 'ESM',
    post: 'All Posts',
    cutoff: 92.40,
    candidatesQualified: 4210,
    source: 'SSC CGL Result Writeup',
    notes: 'Ex-Servicemen qualification cutoff.'
  },
  {
    id: 'cut-chsl-2024-t1-ur',
    exam: 'chsl',
    year: 2024,
    tier: 'Tier-I (Out of 200)',
    category: 'UR',
    post: 'LDC / JSA',
    cutoff: 157.72,
    candidatesQualified: 8920,
    source: 'SSC CHSL Tier-I Result Writeup',
    notes: 'Normalized Tier-I cutoff.'
  },
  {
    id: 'cut-chsl-2024-t1-obc',
    exam: 'chsl',
    year: 2024,
    tier: 'Tier-I (Out of 200)',
    category: 'OBC',
    post: 'LDC / JSA',
    cutoff: 156.45,
    candidatesQualified: 12840,
    source: 'SSC CHSL Tier-I Result Writeup',
    notes: 'OBC qualification mark.'
  },
  {
    id: 'cut-cpo-2024-p1-male',
    exam: 'cpo',
    year: 2024,
    tier: 'Paper-I (Out of 200)',
    category: 'UR',
    post: 'Sub-Inspector in Delhi Police & CAPFs (Male)',
    cutoff: 138.80,
    candidatesQualified: 6240,
    source: 'SSC CPO Paper-I Result Notification',
    notes: 'Male candidate cutoff for appearing in PET/PST.'
  },
  {
    id: 'cut-cpo-2024-p1-female',
    exam: 'cpo',
    year: 2024,
    tier: 'Paper-I (Out of 200)',
    category: 'UR',
    post: 'Sub-Inspector (Female)',
    cutoff: 143.20,
    candidatesQualified: 1420,
    source: 'SSC CPO Paper-I Result Notification',
    notes: 'Female candidate cutoff for PET/PST.'
  },
  {
    id: 'cut-mts-2024-s2-ur',
    exam: 'mts',
    year: 2024,
    tier: 'Session-II (Out of 150 - Merit determining)',
    category: 'UR (Delhi State)',
    post: 'MTS (18-25 years)',
    cutoff: 132.40,
    candidatesQualified: 1850,
    source: 'SSC MTS Final Result Gazette',
    notes: 'Session-II marks (GA 75 + English 75) decided the merit.'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'cutoffs', 'cutoffs.json'), JSON.stringify(cutoffsData, null, 2));
console.log('Cutoffs data created.');

// 5. OFFICIAL LIVE NOTIFICATIONS & UPDATES
const liveUpdatesData = [
  {
    id: 'upd-01',
    category: 'important',
    date: '2026-09-25',
    title: {
      en: 'SSC CGL 2026 Tier-I Examination Schedule & Shift-wise Timings Announced',
      hi: 'एसएससी सीजीएल 2026 टियर-I परीक्षा कार्यक्रम एवं शिफ्ट-वार समय घोषित'
    },
    exam: 'cgl',
    linkText: { en: 'Read Official Schedule Notice', hi: 'आधिकारिक कार्यक्रम नोटिस पढ़ें' },
    url: 'https://ssc.gov.in',
    isOfficial: true
  },
  {
    id: 'upd-02',
    category: 'deadline',
    date: '2026-09-20',
    title: {
      en: 'SSC GD Constable 2026 Application Window Closing Soon - Apply Online at ssc.gov.in',
      hi: 'एसएससी जीडी कांस्टेबल 2026 ऑनलाइन आवेदन अंतिम तिथि निकट - ssc.gov.in पर आवेदन करें'
    },
    exam: 'gd',
    linkText: { en: 'Direct Application Portal', hi: 'सीधा आवेदन पोर्टल' },
    url: 'https://ssc.gov.in',
    isOfficial: true
  },
  {
    id: 'upd-03',
    category: 'new',
    date: '2026-09-18',
    title: {
      en: 'SSC Annual Calendar 2026-2027 Released with Tentative Notification & CBE Dates',
      hi: 'एसएससी वार्षिक कैलेंडर 2026-2027 संभावित अधिसूचना एवं परीक्षा तिथियों सहित जारी'
    },
    exam: 'all',
    linkText: { en: 'View Official SSC Calendar PDF', hi: 'आधिकारिक एसएससी कैलेंडर पीडीएफ देखें' },
    url: 'https://ssc.gov.in',
    isOfficial: true
  },
  {
    id: 'upd-04',
    category: 'info',
    date: '2026-09-15',
    title: {
      en: 'SSC CHSL 2026 Tier-I Final Answer Keys with Candidate Response Sheets Uploaded',
      hi: 'एसएससी सीएचएसएल 2026 टियर-I अंतिम उत्तर कुंजी एवं अभ्यर्थी रिस्पांस शीट अपलोड'
    },
    exam: 'chsl',
    linkText: { en: 'Candidate Portal Login', hi: 'अभ्यर्थी पोर्टल लॉगिन' },
    url: 'https://ssc.gov.in',
    isOfficial: true
  },
  {
    id: 'upd-05',
    category: 'important',
    date: '2026-09-10',
    title: {
      en: 'Important Instructions for Candidates regarding Physical Efficiency Test (PET/PST) for CPO SI',
      hi: 'सीपीओ एसआई हेतु शारीरिक दक्षता परीक्षा (PET/PST) के संबंध में महत्वपूर्ण निर्देश'
    },
    exam: 'cpo',
    linkText: { en: 'Read PET/PST Guidelines', hi: 'पीईटी/पीएसटी दिशानिर्देश पढ़ें' },
    url: 'https://ssc.gov.in',
    isOfficial: true
  }
];

fs.writeFileSync(path.join(publicDataDir, 'notifications', 'updates.json'), JSON.stringify(liveUpdatesData, null, 2));
console.log('Live updates data created.');

// 6. LEGITIMATE BOOK LIBRARY (Strict copyright safe, legitimate established publishers)
const booksData = [
  {
    id: 'book-kiran-ssc-math',
    title: 'SSC Mathematics Chapterwise & Typewise Solved Papers (1999 - Present)',
    author: 'Think Tank of Kiran Institute of Career Excellence (KICX)',
    publisher: 'Kiran Publication',
    edition: 'Latest Revised Edition',
    year: 2025,
    exams: ['cgl', 'chsl', 'cpo', 'mts', 'selection-post', 'gd'],
    subject: 'Quantitative Aptitude',
    syllabusCoverage: {
      en: 'Complete coverage of Arithmetic and Advanced Mathematics (Algebra, Trigonometry, Geometry, Mensuration, Coordinate Geometry, Statistics & Probability).',
      hi: 'अंकगणित और अग्रिम गणित (बीजगणित, त्रिकोणमिति, ज्यामिति, क्षेत्रमिति, सांख्यिकी) का संपूर्ण कवरेज।'
    },
    pyqCoverage: {
      en: '12,500+ chapterwise and typewise previous years questions with authentic detailed solutions.',
      hi: '12,500+ अध्यायवार और प्रकारवार पिछले वर्षों के प्रश्न प्रामाणिक विस्तृत हल सहित।'
    },
    practiceQuantity: '12,500+ Questions',
    difficulty: 'Basic to Exam Advanced',
    intendedLearner: {
      en: 'Essential for all SSC aspirants building concept clarity and pattern recognition.',
      hi: 'पैटर्न की समझ और अवधारणाओं को मजबूत करने हेतु सभी एसएससी अभ्यर्थियों के लिए अनिवार्य।'
    },
    publisherPage: 'https://kiranprakashan.com',
    purchaseLinks: [
      { store: 'Publisher Official Store', url: 'https://kiranprakashan.com', badge: 'Official' },
      { store: 'Amazon India', url: 'https://www.amazon.in', badge: 'Verified Publisher Listing' },
      { store: 'Flipkart', url: 'https://www.flipkart.com', badge: 'Verified Seller' }
    ],
    mappingToSyllabus: {
      subject: 'Quantitative Aptitude',
      topics: ['Number System', 'Percentage', 'Profit & Loss', 'Ratio & Proportion', 'Time & Work', 'Algebra', 'Trigonometry', 'Geometry']
    }
  },
  {
    id: 'book-pinnacle-ssc-english',
    title: 'SSC English 7600+ TCS MCQ Chapter-wise Solved Papers',
    author: 'Pinnacle Editorial Board',
    publisher: 'Pinnacle Publications',
    edition: '5th Edition',
    year: 2025,
    exams: ['cgl', 'chsl', 'cpo', 'stenographer', 'mts'],
    subject: 'English Language',
    syllabusCoverage: {
      en: 'Exhaustive coverage of Grammar rules, Vocabulary (Synonyms, Antonyms, Idioms, One-word substitution, Spellings), Cloze Test, Reading Comprehension, Sentence Improvement, Active/Passive, Narration.',
      hi: 'व्याकरण नियम, शब्दावली (समानार्थी, विलोम, मुहावरे, अनेक शब्दों के लिए एक शब्द), क्लोज टेस्ट, कॉम्प्रिहेंशन, एक्टिव/पैसिव का संपूर्ण संकलन।'
    },
    pyqCoverage: {
      en: '7,600+ recent TCS pattern questions with Hindi-English bilingual explanations and frequency indices.',
      hi: '7,600+ नवीनतम टीसीएस पैटर्न प्रश्न द्विभाषी स्पष्टीकरण सहित।'
    },
    practiceQuantity: '7,600+ Questions',
    difficulty: 'Moderate to Advanced',
    intendedLearner: {
      en: 'Ideal for mastering high-scoring English in CGL Tier-II (135 marks) and CHSL/Steno (100 marks).',
      hi: 'सीजीएल टियर-II (135 अंक) और स्टेनो (100 अंक) में अधिकतम अंक प्राप्त करने हेतु आदर्श।'
    },
    publisherPage: 'https://ssccglpinnacle.com',
    purchaseLinks: [
      { store: 'Pinnacle Official Portal', url: 'https://ssccglpinnacle.com', badge: 'Official' },
      { store: 'Amazon India', url: 'https://www.amazon.in', badge: 'Authentic Edition' }
    ],
    mappingToSyllabus: {
      subject: 'English Language',
      topics: ['Vocabulary', 'Error Detection', 'Sentence Improvement', 'Cloze Test', 'Active/Passive', 'Direct/Indirect Speech', 'Reading Comprehension']
    }
  },
  {
    id: 'book-rakesh-yadav-reasoning',
    title: 'SSC Reasoning 7300+ Chapterwise Solved Questions',
    author: 'Rakesh Yadav',
    publisher: 'Rakesh Yadav Readers Publication (RYP)',
    edition: 'Latest Edition',
    year: 2025,
    exams: ['cgl', 'chsl', 'cpo', 'je', 'mts', 'stenographer', 'gd'],
    subject: 'General Intelligence & Reasoning',
    syllabusCoverage: {
      en: 'Both Verbal and Non-Verbal reasoning chapters: Syllogism, Blood Relations, Coding-Decoding, Seating Arrangement, Puzzles, Statement-Assumption, Dice, Paper Cutting.',
      hi: 'भाषिक एवं अभाषिक तर्कशक्ति: न्याय निगमन, रक्त संबंध, कोडिंग-डिकोडिंग, बैठक व्यवस्था, पहेलियां, पासा, कागज मोड़ना।'
    },
    pyqCoverage: {
      en: '7,300+ verified previous year questions with QR code video solutions and logical shortcuts.',
      hi: '7,300+ सत्यापित पिछले वर्षों के प्रश्न तार्किक शॉर्टकट विधियों सहित।'
    },
    practiceQuantity: '7,300+ Questions',
    difficulty: 'Basic to Exam Standard',
    intendedLearner: {
      en: 'Suitable for beginners and repeaters seeking speed and accuracy in reasoning.',
      hi: 'तर्कशक्ति में गति और सटीकता बढ़ाने हेतु शुरुआती और अनुभवी अभ्यर्थियों दोनों के लिए उपयुक्त।'
    },
    publisherPage: 'https://rakeshyadavreaderspublication.com',
    purchaseLinks: [
      { store: 'RYP Official Store', url: 'https://rakeshyadavreaderspublication.com', badge: 'Official' },
      { store: 'Amazon India', url: 'https://www.amazon.in', badge: 'Verified Listing' }
    ],
    mappingToSyllabus: {
      subject: 'General Intelligence & Reasoning',
      topics: ['Analogy', 'Series', 'Coding-Decoding', 'Blood Relations', 'Direction', 'Syllogism', 'Puzzles', 'Non-Verbal']
    }
  },
  {
    id: 'book-disha-ssc-gk',
    title: 'Disha 10000+ Objective General Knowledge & Current Affairs for SSC Exams',
    author: 'Disha Experts',
    publisher: 'Disha Publication',
    edition: '7th Revised Edition',
    year: 2025,
    exams: ['cgl', 'chsl', 'mts', 'gd', 'cpo', 'je', 'stenographer', 'selection-post'],
    subject: 'General Awareness',
    syllabusCoverage: {
      en: 'Indian History, Geography, Indian Polity, Economy, General Science (Physics, Chemistry, Biology), Environment, Static GK, Computer Literacy, Art & Culture.',
      hi: 'भारतीय इतिहास, भूगोल, राजव्यवस्था, अर्थव्यवस्था, सामान्य विज्ञान (भौतिकी, रसायन, जीवविज्ञान), पर्यावरण, स्टेटिक जीके, कंप्यूटर।'
    },
    pyqCoverage: {
      en: '10,000+ topic-wise objective MCQs compiled from SSC CGL, CHSL, CPO, MTS, and State exams with trend analysis.',
      hi: '10,000+ विषयवार वस्तुनिष्ठ प्रश्न विस्तृत व्याख्या सहित।'
    },
    practiceQuantity: '10,000+ Questions',
    difficulty: 'Comprehensive',
    intendedLearner: {
      en: 'Comprehensive revision guide for non-science and science background students alike.',
      hi: 'सामान्य अध्ययन में व्यापक रिवीजन और तथ्य याद रखने हेतु सर्वश्रेष्ठ पुस्तक।'
    },
    publisherPage: 'https://dishapublication.com',
    purchaseLinks: [
      { store: 'Disha Publication Portal', url: 'https://dishapublication.com', badge: 'Official' },
      { store: 'Amazon India', url: 'https://www.amazon.in', badge: 'Verified Store' }
    ],
    mappingToSyllabus: {
      subject: 'General Awareness',
      topics: ['History', 'Geography', 'Polity', 'Economy', 'General Science', 'Static GK', 'Art & Culture']
    }
  },
  {
    id: 'book-arihant-ssc-je-civil',
    title: 'SSC Junior Engineer Civil Engineering Paper-I & II Chapterwise Solved Papers',
    author: 'Arihant Experts',
    publisher: 'Arihant Publications India Ltd',
    edition: '2025 Edition',
    year: 2025,
    exams: ['je'],
    subject: 'Engineering',
    syllabusCoverage: {
      en: 'Building Materials, Estimating & Costing, Surveying, Soil Mechanics, Hydraulics, Irrigation, Transportation, Environmental Engineering, Structural Theory, RCC & Steel Design.',
      hi: 'भवन निर्माण सामग्री, प्राक्कलन, सर्वेक्षण, मृदा यांत्रिकी, द्रवचालिती, सिंचाई, पर्यावरण इंजीनियरिंग, आरसीसी एवं स्टील डिजाइन।'
    },
    pyqCoverage: {
      en: 'Over 15 years of SSC JE Civil solved papers with step-by-step calculations and diagrams.',
      hi: '15 से अधिक वर्षों के एसएससी जेई सिविल हल प्रश्न पत्र।'
    },
    practiceQuantity: '4,500+ Technical Questions',
    difficulty: 'Engineering Standard (Diploma/Degree)',
    intendedLearner: {
      en: 'Indispensable for Civil Engineering candidates targeting CPWD, MES, BRO, and CWC.',
      hi: 'सीपीडब्ल्यूडी, एमईएस, बीआरओ में जेई पद हेतु सिविल इंजीनियरिंग अभ्यर्थियों के लिए अनिवार्य।'
    },
    publisherPage: 'https://arihantbooks.com',
    purchaseLinks: [
      { store: 'Arihant Official Portal', url: 'https://arihantbooks.com', badge: 'Official' },
      { store: 'Amazon India', url: 'https://www.amazon.in', badge: 'Verified Seller' }
    ],
    mappingToSyllabus: {
      subject: 'Engineering',
      topics: ['Building Materials', 'Surveying', 'Soil Mechanics', 'Hydraulics', 'RCC Design', 'Structural Theory']
    }
  }
];

fs.writeFileSync(path.join(publicDataDir, 'books', 'books.json'), JSON.stringify(booksData, null, 2));
console.log('Books data created.');

// 7. CURRENT AFFAIRS DATA
const currentAffairsData = [
  {
    id: 'ca-2026-09-01',
    date: '2026-09-26',
    category: 'National',
    title: {
      en: 'Cabinet Approves Expansion of National Highway Network Under PM GatiShakti Plan',
      hi: 'मंत्रिमंडल ने पीएम गतिशक्ति योजना के तहत राष्ट्रीय राजमार्ग नेटवर्क विस्तार को मंजूरी दी'
    },
    summary: {
      en: 'The Union Cabinet chaired by the Prime Minister has approved 8 major national high-speed corridor projects spanning 936 km with an estimated capital cost of Rs 50,655 crore to boost logistics efficiency across 6 states.',
      hi: 'प्रधानमंत्री की अध्यक्षता में केंद्रीय मंत्रिमंडल ने 6 राज्यों में लॉजिस्टिक्स दक्षता बढ़ाने हेतु 50,655 करोड़ रुपये की अनुमानित लागत से 936 किमी की 8 प्रमुख हाई-स्पीड कॉरिडोर परियोजनाओं को मंजूरी दी।'
    },
    examRelevance: {
      en: 'Directly relevant for SSC CGL Tier-I & II, CHSL, and MTS General Awareness questions under Economy, Infrastructure, and Government Schemes.',
      hi: 'एसएससी परीक्षाओं में अर्थव्यवस्था, अवसंरचना एवं सरकारी योजनाओं के अंतर्गत अति महत्वपूर्ण।'
    },
    source: 'Press Information Bureau (PIB), Government of India',
    lastVerified: '2026-09-28',
    keyFacts: [
      'Total Project Length: 936 km across 8 key corridors.',
      'Approved Capital Outlay: Rs 50,655 crore.',
      'Aims to reduce logistics cost from 14% to under 9% of GDP.'
    ]
  },
  {
    id: 'ca-2026-09-02',
    date: '2026-09-22',
    category: 'Science & Tech',
    title: {
      en: 'ISRO Successfully Tests Cryogenic Upper Stage for Gaganyaan Human Spaceflight Mission',
      hi: 'इसरो ने गगनयान मानव अंतरिक्ष उड़ान मिशन हेतु क्रायोजेनिक अपर स्टेज का सफल परीक्षण किया'
    },
    summary: {
      en: 'The Indian Space Research Organisation (ISRO) successfully conducted the hot test of the human-rated CE20 cryogenic engine at the ISRO Propulsion Complex (IPRC), Mahendragiri, Tamil Nadu for an endurance duration of 720 seconds.',
      hi: 'इसरो ने महेंद्रगिरि, तमिलनाडु स्थित प्रणोदन परिसर में 720 सेकंड की अवधि हेतु मानव-रेटेड CE20 क्रायोजेनिक इंजन का सफल हॉट टेस्ट किया।'
    },
    examRelevance: {
      en: 'Frequently asked in SSC exams under Science & Technology, Space Missions, and ISRO achievements.',
      hi: 'विज्ञान एवं प्रौद्योगिकी, अंतरिक्ष मिशन और इसरो उपलब्धियों के अंतर्गत अक्सर पूछा जाता है।'
    },
    source: 'ISRO Official Press Release & PIB',
    lastVerified: '2026-09-28',
    keyFacts: [
      'Engine Name: Human-Rated CE20 Cryogenic Engine.',
      'Testing Facility: IPRC Mahendragiri, Tamil Nadu.',
      'Mission: Gaganyaan Indian Human Spaceflight Programme.'
    ]
  },
  {
    id: 'ca-2026-09-03',
    date: '2026-09-18',
    category: 'Sports',
    title: {
      en: 'India Wins 12 Medals at World Athletics Continental Tour',
      hi: 'विश्व एथलेटिक्स कॉन्टिनेंटल टूर में भारत ने जीते 12 पदक'
    },
    summary: {
      en: 'Indian track and field contingent secured 5 Gold, 4 Silver, and 3 Bronze medals at the Continental Tour event, featuring top performances in Javelin Throw, Steeplechase, and 400m hurdles.',
      hi: 'भारतीय ट्रैक एवं फील्ड दल ने भाला फेंक, स्टीपलचेज और 400 मीटर बाधा दौड़ में उत्कृष्ट प्रदर्शन करते हुए 5 स्वर्ण, 4 रजत और 3 कांस्य पदक जीते।'
    },
    examRelevance: {
      en: 'Essential for Sports category questions in SSC GD, CPO, MTS, and CHSL.',
      hi: 'एसएससी जीडी, सीपीओ, एमटीएस में खेलकूद श्रेणी के प्रश्नों हेतु महत्वपूर्ण।'
    },
    source: 'Ministry of Youth Affairs & Sports (MYAS)',
    lastVerified: '2026-09-28',
    keyFacts: [
      'Medal tally: 5 Gold, 4 Silver, 3 Bronze (Total 12).',
      'Governing body: Athletics Federation of India (AFI).'
    ]
  },
  {
    id: 'ca-2026-09-04',
    date: '2026-09-12',
    category: 'Economy',
    title: {
      en: 'RBI Monetary Policy Committee Maintains Repo Rate at 6.50% to Balance Growth and Inflation',
      hi: 'आरबीआई मौद्रिक नीति समिति ने विकास और मुद्रास्फीति संतुलन हेतु रेपो दर 6.50% पर अपरिवर्तित रखी'
    },
    summary: {
      en: 'The Reserve Bank of India’s Monetary Policy Committee (MPC) decided to keep the policy Repo Rate unchanged at 6.50% with an ongoing stance focused on "withdrawal of accommodation" to ensure consumer price index (CPI) aligns with the 4% target.',
      hi: 'आरबीआई की मौद्रिक नीति समिति ने सीपीआई मुद्रास्फीति को 4% के लक्ष्य के अनुरूप बनाए रखने हेतु रेपो दर को 6.50% पर यथावत रखा।'
    },
    examRelevance: {
      en: 'Directly tested in SSC CGL, CPO, and JE under Banking & Monetary Policy topics.',
      hi: 'एसएससी परीक्षाओं में मौद्रिक नीति और बैंकिंग शब्दावली के अंतर्गत अनिवार्य प्रश्न।'
    },
    source: 'Reserve Bank of India (RBI) Monetary Policy Statement',
    lastVerified: '2026-09-28',
    keyFacts: [
      'Repo Rate: 6.50%.',
      'Standing Deposit Facility (SDF) rate: 6.25%.',
      'Marginal Standing Facility (MSF) rate: 6.75%.',
      'Inflation target mandate: 4% (+/- 2%).'
    ]
  },
  {
    id: 'ca-2026-09-05',
    date: '2026-09-05',
    category: 'Environment',
    title: {
      en: 'India Designates Three New Ramsar Wetlands of International Importance',
      hi: 'भारत ने अंतरराष्ट्रीय महत्व के तीन नए रामसर आर्द्रभूमि स्थल घोषित किए'
    },
    summary: {
      en: 'With the addition of 3 new wetlands from Madhya Pradesh, Tamil Nadu, and Karnataka, India’s total tally of Ramsar sites reached 85, placing India among the top countries globally in terms of protected wetland coverage under the Ramsar Convention.',
      hi: 'मध्य प्रदेश, तमिलनाडु और कर्नाटक से 3 नए आर्द्रभूमि स्थलों के जुड़ने से भारत में रामसर स्थलों की कुल संख्या 85 पहुंच गई है।'
    },
    examRelevance: {
      en: 'High frequency topic in SSC Static GK & Environmental Ecology.',
      hi: 'एसएससी स्टेटिक जीके और पर्यावरण में बार-बार पूछे जाने वाले प्रमुख स्थल।'
    },
    source: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
    lastVerified: '2026-09-28',
    keyFacts: [
      'Total Ramsar Sites in India: 85.',
      'Ramsar Convention signed: 2 February 1971 in Ramsar, Iran.',
      'World Wetlands Day: Observed annually on 2nd February.'
    ]
  }
];

fs.writeFileSync(path.join(publicDataDir, 'current-affairs', 'current-affairs.json'), JSON.stringify(currentAffairsData, null, 2));
console.log('Current affairs data created.');

// 8. FORMULA MASTER DATA (Quant & Math formulas)
const formulasData = [
  {
    id: 'formula-quant-01',
    topic: 'Percentage & Successive Change',
    subject: 'Quantitative Aptitude',
    title: { en: 'Successive Percentage Change Formula', hi: 'क्रमागत प्रतिशत परिवर्तन सूत्र' },
    formula: 'Net Change % = a + b + (a × b) / 100',
    notes: {
      en: 'Use positive values for increases and negative values for discounts/decreases. Works for two successive percentage variations.',
      hi: 'वृद्धि हेतु धनात्मक और कमी/छूट हेतु ऋणात्मक मान प्रयोग करें। दो क्रमागत प्रतिशत परिवर्तनों पर लागू होता है।'
    },
    example: {
      en: 'If length of a rectangle increases by 20% and breadth decreases by 10%: Net Area Change = 20 - 10 + (20 × -10)/100 = 10 - 2 = +8% increase.',
      hi: 'यदि आयत की लंबाई में 20% वृद्धि और चौड़ाई में 10% कमी होती है: कुल क्षेत्रफल परिवर्तन = 20 - 10 + (20 × -10)/100 = +8% वृद्धि।'
    },
    trick: {
      en: 'For equal percentage increase and decrease of x%, there is always an overall loss of (x²/100)%.',
      hi: 'यदि किसी मान में x% की वृद्धि और फिर x% की कमी की जाए, तो सदैव कुल (x²/100)% की हानि होती है।'
    }
  },
  {
    id: 'formula-quant-02',
    topic: 'Profit, Loss & Discount',
    subject: 'Quantitative Aptitude',
    title: { en: 'Marked Price to Cost Price Ratio with Discount and Profit', hi: 'अंकित मूल्य एवं क्रय मूल्य का सीधा अनुपात' },
    formula: 'MP / CP = (100 + Profit%) / (100 - Discount%)',
    notes: {
      en: 'Most powerful time-saver for SSC CGL & CHSL problems involving Cost Price, Marked Price, Discount, and Net Profit.',
      hi: 'क्रय मूल्य, अंकित मूल्य, छूट और लाभ वाले जटिल प्रश्नों को कुछ ही सेकंड में हल करने वाला अत्यंत उपयोगी सूत्र।'
    },
    example: {
      en: 'A shopkeeper allows 10% discount and still makes 20% profit. MP/CP = (100 + 20) / (100 - 10) = 120 / 90 = 4/3. If CP = 300, MP = 400.',
      hi: 'एक दुकानदार 10% छूट देकर 20% लाभ कमाता है: MP/CP = 120/90 = 4/3। यदि CP = 300 है तो MP = 400 रुपये।'
    }
  },
  {
    id: 'formula-quant-03',
    topic: 'Compound Interest',
    subject: 'Quantitative Aptitude',
    title: { en: 'Difference Between CI and SI for 2 and 3 Years', hi: '2 वर्ष एवं 3 वर्ष हेतु चक्रवृद्धि व साधारण ब्याज का अंतर' },
    formula: '2 Years: Diff = P × (R / 100)²  |  3 Years: Diff = P × (R / 100)² × (3 + R / 100)',
    notes: {
      en: 'Appears in virtually every SSC shift. Memorizing this eliminates the need to calculate complete 3-year CI tables.',
      hi: 'एसएससी की प्रत्येक पाली में आने वाला सर्वप्रमुख सूत्र।'
    },
    example: {
      en: 'If P = 10,000, R = 10%, 2 Years Diff = 10000 × (10/100)² = 10000 × (1/100) = Rs 100.',
      hi: 'यदि मूलधन 10,000 रु, दर 10%, 2 वर्ष का अंतर = 10,000 × (1/100) = 100 रुपये।'
    }
  },
  {
    id: 'formula-quant-04',
    topic: 'Time, Speed and Distance',
    subject: 'Quantitative Aptitude',
    title: { en: 'Average Speed & Early-Late Travel Formula', hi: 'औसत गति एवं समय अंतर सूत्र' },
    formula: 'Avg Speed (Equal distance) = 2xy / (x + y)  |  Distance = [S₁ × S₂ / |S₁ - S₂|] × (Total Time Difference in hours)',
    notes: {
      en: 'When a person walks to office at S₁ and is late by t₁, and walks at S₂ and is early by t₂, use the second formula directly.',
      hi: 'जब कोई व्यक्ति S₁ गति से t₁ मिनट देर और S₂ गति से t₂ मिनट पहले पहुंचे, तो सीधे दूसरे सूत्र का प्रयोग करें।'
    },
    example: {
      en: 'Speed 4 km/h is 10 min late; Speed 5 km/h is 5 min early. Total time diff = 15 min = 1/4 hr. Distance = (4 × 5 / 1) × (1/4) = 5 km.',
      hi: '4 किमी/घंटे से 10 मिनट देर, 5 किमी/घंटे से 5 मिनट पहले। समयांतर 15 मिनट = 1/4 घंटा। दूरी = (4×5/1) × (1/4) = 5 किमी।'
    }
  },
  {
    id: 'formula-quant-05',
    topic: 'Algebra',
    subject: 'Quantitative Aptitude',
    title: { en: 'Standard Identity of x + 1/x', hi: 'x + 1/x के मानक सर्वसमिका सूत्र' },
    formula: 'If x + 1/x = k, then: x² + 1/x² = k² - 2, and x³ + 1/x³ = k³ - 3k',
    notes: {
      en: 'If x - 1/x = k, then: x² + 1/x² = k² + 2, and x³ - 1/x³ = k³ + 3k.',
      hi: 'यदि x - 1/x = k है, तो x² + 1/x² = k² + 2 और x³ - 1/x³ = k³ + 3k होता है।'
    },
    example: {
      en: 'If x + 1/x = 3, then x³ + 1/x³ = 3³ - 3(3) = 27 - 9 = 18.',
      hi: 'यदि x + 1/x = 3 है, तो x³ + 1/x³ = 27 - 9 = 18।'
    }
  },
  {
    id: 'formula-quant-06',
    topic: 'Geometry & Mensuration',
    subject: 'Quantitative Aptitude',
    title: { en: 'Inradius and Circumradius of Right Angled & Equilateral Triangle', hi: 'समकोण एवं समबाहु त्रिभुज की अंत:त्रिज्या व परित्रिज्या' },
    formula: 'Right Triangle: r = (P + B - H) / 2, R = H / 2  |  Equilateral Triangle: r = a / (2√3), R = a / √3',
    notes: {
      en: 'Ratio of circumradius to inradius in an equilateral triangle is always R : r = 2 : 1.',
      hi: 'समबाहु त्रिभुज में परित्रिज्या और अंत:त्रिज्या का अनुपात सदैव R : r = 2 : 1 होता है।'
    },
    example: {
      en: 'Right triangle with sides 6, 8, 10. r = (6 + 8 - 10) / 2 = 4 / 2 = 2 cm; R = 10 / 2 = 5 cm.',
      hi: 'भुजाएं 6, 8, 10 वाला समकोण त्रिभुज: अंत:त्रिज्या = (6+8-10)/2 = 2 सेमी, परित्रिज्या = 10/2 = 5 सेमी।'
    }
  }
];

fs.writeFileSync(path.join(publicDataDir, 'formulas', 'formulas.json'), JSON.stringify(formulasData, null, 2));
console.log('Formulas data created.');

// 9. FLASHCARDS DATA (GK, Static, Vocab, Rules)
const flashcardsData = [
  {
    id: 'fc-01',
    subject: 'General Awareness',
    category: 'Indian Polity - Articles',
    front: { en: 'Article 32 of the Constitution of India', hi: 'भारतीय संविधान का अनुच्छेद 32' },
    back: {
      en: 'Right to Constitutional Remedies. Empowers Supreme Court to issue 5 types of Writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari). Dr. B.R. Ambedkar called it "Heart and Soul of the Constitution".',
      hi: 'संवैधानिक उपचारों का अधिकार। सर्वोच्च न्यायालय को 5 प्रकार की रिट जारी करने का अधिकार देता है। डॉ. बी.आर. अंबेडकर ने इसे "संविधान का हृदय और आत्मा" कहा था।'
    },
    subtext: 'Part III • Fundamental Rights',
    tags: ['Polity', 'Constitution', 'High Frequency']
  },
  {
    id: 'fc-02',
    subject: 'General Awareness',
    category: 'History - Battles',
    front: { en: 'First Battle of Panipat (1526)', hi: 'पानीपत का प्रथम युद्ध (1526)' },
    back: {
      en: 'Fought on 21 April 1526 between Babur and Ibrahim Lodi (Sultan of Delhi). Babur introduced Tulughma tactical formation and gunpowder artillery (canons) for the first time in North India, defeating Lodi and establishing the Mughal Empire.',
      hi: '21 अप्रैल 1526 को बाबर और इब्राहिम लोदी के बीच लड़ा गया। बाबर ने तोपखाने और तुलुगमा पद्धति का उपयोग कर लोदी को पराजित किया और भारत में मुगल साम्राज्य की नींव रखी।'
    },
    subtext: 'Medieval Indian History',
    tags: ['History', 'Mughals', 'Panipat']
  },
  {
    id: 'fc-03',
    subject: 'General Awareness',
    category: 'Static GK - National Parks',
    front: { en: 'Keibul Lamjao National Park', hi: 'केइबुल लामजाओ राष्ट्रीय उद्यान' },
    back: {
      en: 'Located in Bishnupur district of Manipur on Loktak Lake. It is the WORLD\'S ONLY FLOATING NATIONAL PARK, home to the endangered Brow-antlered deer known as Sangai (Dancing Deer of Manipur) on floating biomass called phumdis.',
      hi: 'मणिपुर के लोकतक झील पर स्थित विश्व का एकमात्र तैरता हुआ राष्ट्रीय उद्यान। यह तैरती हुई फुमदी पर पाए जाने वाले संकटग्रस्त संगाई हिरण (डांसिंग डियर) का प्राकृतिक आवास है।'
    },
    subtext: 'Biodiversity • North-East India',
    tags: ['Geography', 'Environment', 'National Parks']
  },
  {
    id: 'fc-04',
    subject: 'English Language',
    category: 'Vocabulary - Idioms',
    front: { en: 'Burn the midnight oil', hi: 'Burn the midnight oil (मुहावरा)' },
    back: {
      en: 'Meaning: To work or study late into the night.\nExample: Aspirants are burning the midnight oil to clear the SSC CGL examination.',
      hi: 'अर्थ: देर रात तक कठिन परिश्रम या पढ़ाई करना।\nउदाहरण: अभ्यर्थी एसएससी सीजीएल परीक्षा उत्तीर्ण करने हेतु देर रात तक अध्ययन कर रहे हैं।'
    },
    subtext: 'Idioms & Phrases • SSC Frequent',
    tags: ['English', 'Idioms', 'Vocab']
  },
  {
    id: 'fc-05',
    subject: 'Computer Knowledge',
    category: 'Computer Fundamentals',
    front: { en: 'Cache Memory vs Virtual Memory', hi: 'कैश मेमोरी बनाम वर्चुअल मेमोरी' },
    back: {
      en: 'Cache Memory: Ultra-fast Static RAM (SRAM) located inside or near CPU to store frequently executed instructions.\nVirtual Memory: An OS storage allocation technique using Hard Disk/SSD space to simulate additional RAM when physical RAM is exhausted.',
      hi: 'कैश मेमोरी: सीपीयू के अंदर स्थित अति-तीव्र एसआरएएम जो बार-बार प्रयुक्त निर्देशों को रखती है।\nवर्चुअल मेमोरी: रैम समाप्त होने पर सेकेंडरी स्टोरेज (हार्ड डिस्क) को रैम के रूप में प्रयोग करने की ओएस तकनीक।'
    },
    subtext: 'Tier-II Computer Module Mandatory',
    tags: ['Computer', 'Memory', 'CGL Tier-II']
  },
  {
    id: 'fc-06',
    subject: 'General Awareness',
    category: 'Science - Physics Units',
    front: { en: 'SI Unit of Luminous Intensity & Magnetic Flux', hi: 'दीप्त तीव्रता एवं चुंबकीय फ्लक्स की एसआई इकाई' },
    back: {
      en: 'Luminous Intensity: Candela (cd)\nMagnetic Flux: Weber (Wb)\nMagnetic Flux Density (Field): Tesla (T)\nElectric Capacitance: Farad (F)',
      hi: 'दीप्त तीव्रता: कैंडेला (cd)\nचुंबकीय फ्लक्स: वेबर (Wb)\nचुंबकीय क्षेत्र घनत्व: टेस्ला (T)\nवैद्युत धारिता: फैराड (F)'
    },
    subtext: 'Units & Measurements • Physics',
    tags: ['Science', 'Physics', 'SI Units']
  }
];

fs.writeFileSync(path.join(publicDataDir, 'flashcards', 'flashcards.json'), JSON.stringify(flashcardsData, null, 2));
console.log('Flashcards data created.');

// 10. TYPING, STENO, TRANSLATION, AND PHYSICAL TEST LAB DATA
const typingData = [
  {
    id: 'typing-en-01',
    language: 'en',
    title: 'SSC CHSL & CGL Real Exam Standard English Passage 1',
    level: 'exam-standard',
    targetWPM: 35,
    timeSeconds: 600, // 10 minutes
    notes: 'Official standard passage reflecting administrative and economic vocabulary. Aim for < 5% error for UR category.',
    text: 'Good governance and efficient administration are the cornerstones of modern economic progress. In recent decades, government agencies across India have increasingly embraced digital technological solutions to expedite service delivery and streamline public distribution mechanisms. Transparency in public financial management guarantees that welfare funds reach the intended beneficiaries without leakages. The introduction of unified portal architectures and digital document verification has fundamentally transformed public recruitment procedures, ensuring parity of esteem and equal opportunity for every aspirant across rural and urban landscapes.'
  },
  {
    id: 'typing-hi-01',
    language: 'hi',
    title: 'एसएससी परीक्षा मानक हिंदी टाइपिंग अभ्यास (मंगल/रेमिंगटन गेल)',
    level: 'exam-standard',
    targetWPM: 30,
    timeSeconds: 600,
    notes: 'आधिकारिक परीक्षा मानक गद्यांश। 30 शब्द प्रति मिनट (9000 की-डिप्रेशन प्रति घंटा) की गति अनिवार्य है।',
    text: 'सुशासन और पारदर्शी प्रशासन किसी भी लोकतांत्रिक राष्ट्र के सर्वांगीण विकास की आधारशिला होते हैं। आधुनिक युग में डिजिटल प्रौद्योगिकी के प्रयोग ने सरकारी सेवाओं को आम नागरिकों तक अत्यंत सुलभ और तीव्र बना दिया है। प्रत्यक्ष लाभ अंतरण योजना के माध्यम से कल्याणकारी योजनाओं का धन सीधे लाभार्थियों के बैंक खातों में पहुंच रहा है। इससे न केवल प्रशासनिक दक्षता में वृद्धि हुई है बल्कि बिचौलियों की भूमिका भी समाप्त हुई है। कर्मचारी चयन आयोग द्वारा आयोजित की जाने वाली विभिन्न प्रतियोगी परीक्षाओं में लाखों युवा अपनी योग्यता और निष्ठा के बल पर राष्ट्र निर्माण में योगदान देने का संकल्प लेते हैं।'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'typing', 'typing.json'), JSON.stringify(typingData, null, 2));

const stenoData = [
  {
    id: 'steno-01',
    grade: 'Grade D (80 WPM)',
    language: 'en',
    title: 'Parliamentary Debate Speech on National Education and Skill Development',
    targetSpeed: 80,
    durationMinutes: 10,
    wordCount: 800,
    dictationText: 'Mr. Speaker Sir, I rise to support the legislative measure introduced by the honorable Minister for promoting vocational education and technical skills among our youthful population. It is an acknowledged reality that academic certification alone cannot fulfill the aspirations of millions of young citizens entering the workforce every successive year. The proposed infrastructure will create specialized training centers in every parliamentary constituency, offering curricula aligned with emerging industrial requirements. Modern manufacturing, information technology, renewable energy installations, and telecommunications demand technical proficiencies of the highest order. By creating a national framework for skill certification, this bill empowers apprentices from backward and rural segments to secure dignified employment in both public undertakings and organized private sectors. I urge all members of this august House to pass this progressive enactment unanimously without partisan hesitation.'
  },
  {
    id: 'steno-02',
    grade: 'Grade C (100 WPM)',
    language: 'en',
    title: 'Economic Survey and Infrastructure Finance Address',
    targetSpeed: 100,
    durationMinutes: 10,
    wordCount: 1000,
    dictationText: 'Honorable Chairman, the deliberations of this standing committee have highlighted the imperative necessity of sustaining capital expenditure across logistics and transportation networks. The macroeconomic indicators of the country demonstrate resilient growth trajectories notwithstanding complex international headwinds. Public investments in dedicated freight corridors, port modernization, and multi-modal logistics parks have already yielded significant reductions in transit periods and fuel expenditure. When logistical expenditures decrease, indigenous manufacturing enterprises attain competitive parity in international export markets. Consequently, our foreign exchange reserves expand, stabilizing fiscal balances and creating sustainable employment in auxiliary sectors. The commission recommends that public private partnerships should be revitalized through transparent dispute resolution mechanisms and sovereign risk mitigating guarantees. Let us ensure that public funds are allocated with rigorous financial prudence to maximize societal benefits.'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'steno', 'steno.json'), JSON.stringify(stenoData, null, 2));

const translationData = [
  {
    id: 'trans-01',
    title: 'Administrative Memorandum on Code of Conduct',
    direction: 'en_to_hi',
    sourceText: 'Every government servant shall at all times maintain absolute integrity, devotion to duty, and do nothing which is unbecoming of a government servant. Promptness and courtesy must be extended to all members of the public seeking official assistance.',
    modelTranslation: 'प्रत्येक सरकारी कर्मचारी हर समय पूर्ण सत्यनिष्ठा और कर्तव्यपरायणता बनाए रखेगा तथा ऐसा कोई आचरण नहीं करेगा जो एक सरकारी कर्मचारी के लिए अशोभनीय हो। आधिकारिक सहायता प्राप्त करने के इच्छुक जनता के सभी सदस्यों के प्रति तत्परता और विनम्रता का व्यवहार किया जाना चाहिए।',
    keyTerminology: [
      { term: 'Absolute integrity', meaning: 'पूर्ण सत्यनिष्ठा' },
      { term: 'Devotion to duty', meaning: 'कर्तव्यपरायणता' },
      { term: 'Unbecoming', meaning: 'अशोभनीय' },
      { term: 'Promptness and courtesy', meaning: 'तत्परता और विनम्रता' }
    ],
    grammarNotes: 'In official administrative Hindi, future obligations for conduct use future imperative forms (बनाए रखेगा, व्यवहार किया जाना चाहिए).'
  },
  {
    id: 'trans-02',
    title: 'Financial Management Notification',
    direction: 'hi_to_en',
    sourceText: 'वित्तीय वर्ष के समापन पर सभी आहरण एवं संवितरण अधिकारियों को यह सुनिश्चित करना अनिवार्य है कि स्वीकृत बजट का व्यय नियमानुसार ही किया जाए और कोई भी धनराशि बिना औचित्य के समर्पित न की जाए।',
    modelTranslation: 'At the close of the financial year, it is mandatory for all Drawing and Disbursing Officers to ensure that the expenditure of the sanctioned budget is incurred strictly according to rules and no funds are surrendered without proper justification.',
    keyTerminology: [
      { term: 'आहरण एवं संवितरण अधिकारी', meaning: 'Drawing and Disbursing Officer (DDO)' },
      { term: 'स्वीकृत बजट', meaning: 'Sanctioned budget' },
      { term: 'व्यय', meaning: 'Expenditure' },
      { term: 'समर्पित करना', meaning: 'Surrender (of funds)' }
    ],
    grammarNotes: 'Notice the translation of "सुनिश्चित करना अनिवार्य है" as "it is mandatory to ensure".'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'translation', 'translation.json'), JSON.stringify(translationData, null, 2));

const physicalStandardsData = [
  {
    id: 'phys-gd-male',
    exam: 'gd',
    gender: 'male',
    category: 'General / OBC / SC',
    heightMinCm: 170,
    chestMinCm: 80,
    chestExpansionMinCm: 5,
    petEvents: [
      {
        event: { en: 'Running', hi: 'दौड़' },
        requirement: { en: '5 Kilometres within 24 Minutes', hi: '24 मिनट के भीतर 5 किलोमीटर' },
        relaxations: { en: 'For Ladakh region candidates: 1.6 km in 7 minutes.', hi: 'लद्दाख क्षेत्र के अभ्यर्थियों हेतु: 7 मिनट में 1.6 किमी।' }
      }
    ],
    officialSource: 'SSC GD Constable Gazette Notification'
  },
  {
    id: 'phys-gd-female',
    exam: 'gd',
    gender: 'female',
    category: 'General / OBC / SC',
    heightMinCm: 157,
    petEvents: [
      {
        event: { en: 'Running', hi: 'दौड़' },
        requirement: { en: '1.6 Kilometres within 8.5 Minutes', hi: '8.5 मिनट के भीतर 1.6 किलोमीटर' },
        relaxations: { en: 'For Ladakh region candidates: 800 metres in 5 minutes.', hi: 'लद्दाख क्षेत्र के अभ्यर्थियों हेतु: 5 मिनट में 800 मीटर।' }
      }
    ],
    officialSource: 'SSC GD Constable Gazette Notification'
  },
  {
    id: 'phys-cpo-male',
    exam: 'cpo',
    gender: 'male',
    category: 'General / OBC / SC',
    heightMinCm: 170,
    chestMinCm: 80,
    chestExpansionMinCm: 5,
    petEvents: [
      { event: { en: '100m Sprint', hi: '100 मीटर स्प्रिंट' }, requirement: { en: 'Within 16 Seconds', hi: '16 सेकंड के भीतर' } },
      { event: { en: '1.6 km Race', hi: '1.6 किमी दौड़' }, requirement: { en: 'Within 6.5 Minutes', hi: '6.5 मिनट के भीतर' } },
      { event: { en: 'Long Jump', hi: 'लंबी कूद' }, requirement: { en: '3.65 Metres (in 3 chances)', hi: '3.65 मीटर (3 अवसरों में)' } },
      { event: { en: 'High Jump', hi: 'ऊंची कूद' }, requirement: { en: '1.2 Metres (in 3 chances)', hi: '1.2 मीटर (3 अवसरों में)' } },
      { event: { en: 'Shot Put (16 lbs)', hi: 'गोला फेंक (16 पाउंड)' }, requirement: { en: '4.5 Metres (in 3 chances)', hi: '4.5 मीटर (3 अवसरों में)' } }
    ],
    officialSource: 'SSC CPO Sub-Inspector Official Notification'
  },
  {
    id: 'phys-cpo-female',
    exam: 'cpo',
    gender: 'female',
    category: 'General / OBC / SC',
    heightMinCm: 157,
    petEvents: [
      { event: { en: '100m Sprint', hi: '100 मीटर स्प्रिंट' }, requirement: { en: 'Within 18 Seconds', hi: '18 सेकंड के भीतर' } },
      { event: { en: '800m Race', hi: '800 मीटर दौड़' }, requirement: { en: 'Within 4 Minutes', hi: '4 मिनट के भीतर' } },
      { event: { en: 'Long Jump', hi: 'लंबी कूद' }, requirement: { en: '2.7 Metres (in 3 chances)', hi: '2.7 मीटर (3 अवसरों में)' } },
      { event: { en: 'High Jump', hi: 'ऊंची कूद' }, requirement: { en: '0.9 Metres (in 3 chances)', hi: '0.9 मीटर (3 अवसरों में)' } }
    ],
    officialSource: 'SSC CPO Sub-Inspector Official Notification'
  },
  {
    id: 'phys-mts-havaldar-male',
    exam: 'mts',
    gender: 'male',
    category: 'Havaldar in CBIC & CBN',
    heightMinCm: 157.5,
    chestMinCm: 81,
    chestExpansionMinCm: 5,
    petEvents: [
      {
        event: { en: 'Walking', hi: 'पैदल चाल' },
        requirement: { en: '1600 Metres in 15 Minutes', hi: '15 मिनट में 1600 मीटर' }
      }
    ],
    officialSource: 'SSC MTS & Havaldar Notification'
  }
];

fs.writeFileSync(path.join(publicDataDir, 'physical', 'physical.json'), JSON.stringify(physicalStandardsData, null, 2));
console.log('Physical standards data created.');

console.log('Data generation script phase 1 completed.');
