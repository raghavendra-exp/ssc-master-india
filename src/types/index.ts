export type Language = 'en' | 'hi';

export type ExamId = 
  | 'cgl' 
  | 'chsl' 
  | 'mts' 
  | 'gd' 
  | 'cpo' 
  | 'je' 
  | 'stenographer' 
  | 'selection-post' 
  | 'jht' 
  | 'other';

export type SubjectCategory =
  | 'Quantitative Aptitude'
  | 'General Intelligence & Reasoning'
  | 'English Language'
  | 'General Awareness'
  | 'Current Affairs'
  | 'Computer Knowledge'
  | 'Statistics'
  | 'Engineering'
  | 'General Hindi'
  | 'Translation'
  | 'Shorthand'
  | 'Typing'
  | 'Physical Preparation';

export interface StageConfig {
  stageId: string;
  stageName: { en: string; hi: string };
  mode: string;
  duration: string;
  totalQuestions: number;
  totalMarks: number;
  negativeMarking: string;
  qualifyingNature?: boolean;
  sections: {
    name: { en: string; hi: string };
    questions: number;
    marks: number;
    negativePerWrong: number;
    timeLimit?: string;
  }[];
}

export interface EligibilityConfig {
  education: { en: string; hi: string };
  ageMin: number;
  ageMax: number;
  ageRelaxation: { en: string; hi: string };
  physical?: { en: string; hi: string };
  drivingLicense?: boolean;
  skillReq?: { en: string; hi: string };
  esmProvisions: { en: string; hi: string };
}

export interface OfficialNotificationInfo {
  notificationNumber: string;
  notificationDate: string;
  applicationStart: string;
  applicationEnd: string;
  correctionWindow?: string;
  admitCardDate?: string;
  examDate: string;
  url: string;
  tentativeVacancies: number;
  finalVacancies?: number;
  source: string;
}

export interface ExamConfig {
  examId: string;
  examCode: ExamId;
  examName: { en: string; hi: string };
  fullName: { en: string; hi: string };
  badge: string;
  year: number;
  stages: StageConfig[];
  duration: string;
  questions: number;
  marks: number;
  negativeMarking: string;
  subjects: SubjectCategory[];
  eligibility: EligibilityConfig;
  officialNotification: OfficialNotificationInfo;
  lastVerified: string;
  postsOverview: string;
}

export interface QuestionItem {
  id: string;
  exam: string; // e.g. 'cgl', 'chsl', 'mts', etc. or 'all'
  stage: string; // 'Tier-I', 'Tier-II', 'Paper-I', etc.
  section: string;
  subject: SubjectCategory;
  chapter: string;
  topic: string;
  subtopic?: string;
  year?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: { en: string; hi: string };
  options: { en: string; hi: string }[];
  answer: number; // 0, 1, 2, 3
  explanation: { en: string; hi: string };
  sourceType: 'verified-pyq' | 'original' | 'pyq-style';
  source: string;
  shiftInfo?: string;
  tags: string[];
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  year: number;
  exams: ExamId[];
  subject: SubjectCategory;
  syllabusCoverage: { en: string; hi: string };
  pyqCoverage: { en: string; hi: string };
  practiceQuantity: string;
  difficulty: string;
  intendedLearner: { en: string; hi: string };
  publisherPage: string;
  purchaseLinks: { store: string; url: string; badge?: string }[];
  mappingToSyllabus: { subject: string; topics: string[] };
}

export interface VacancyItem {
  id: string;
  exam: ExamId;
  year: number;
  post: string;
  department: string;
  category: {
    ur: number;
    obc: number;
    sc: number;
    st: number;
    ews: number;
    esm?: number;
    total: number;
  };
  isTentative: boolean;
  source: string;
  sourceUrl: string;
  lastVerified: string;
}

export interface CutoffItem {
  id: string;
  exam: ExamId;
  year: number;
  tier: string;
  category: string;
  post?: string;
  cutoff: number;
  candidatesQualified?: number;
  source: string;
  notes: string;
}

export interface ResultItem {
  id: string;
  exam: ExamId;
  year: number;
  stage: string;
  announcementDate: string;
  writeupUrl: string;
  resultPdfUrl: string;
  status: 'Declared' | 'Tentative' | 'Upcoming';
  source: string;
}

export interface PostProfile {
  id: string;
  exam: ExamId;
  postName: { en: string; hi: string };
  department: string;
  ministry: string;
  group: 'Group B (Gazetted)' | 'Group B (Non-Gazetted)' | 'Group C' | 'Group D';
  payLevel: number;
  payScale: string;
  ageRequirement: string;
  qualification: { en: string; hi: string };
  duties: { en: string; hi: string }[];
  workEnvironment: { en: string; hi: string };
  postingLocation: { en: string; hi: string };
  physicalRequirements?: { en: string; hi: string };
  skillRequirements?: { en: string; hi: string };
  careerProgression: { en: string; hi: string }[];
  officialSource: string;
  colorBadge: string;
}

export interface CurrentAffairItem {
  id: string;
  date: string;
  category: 'National' | 'International' | 'Economy' | 'Science & Tech' | 'Sports' | 'Awards' | 'Defence' | 'Environment' | 'Appointments' | 'Schemes';
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  examRelevance: { en: string; hi: string };
  source: string;
  lastVerified: string;
  keyFacts: string[];
}

export interface FlashcardItem {
  id: string;
  subject: SubjectCategory;
  category: string;
  front: { en: string; hi: string };
  back: { en: string; hi: string };
  subtext: string;
  tags: string[];
}

export interface FormulaItem {
  id: string;
  topic: string;
  subject: SubjectCategory;
  title: { en: string; hi: string };
  formula: string;
  notes: { en: string; hi: string };
  example: { en: string; hi: string };
  trick?: { en: string; hi: string };
}

export interface TypingExercise {
  id: string;
  language: 'en' | 'hi';
  title: string;
  level: 'beginner' | 'intermediate' | 'exam-standard';
  text: string;
  targetWPM: number;
  timeSeconds: number;
  notes: string;
}

export interface StenoExercise {
  id: string;
  grade: 'Grade C (100 WPM)' | 'Grade D (80 WPM)';
  language: 'en' | 'hi';
  title: string;
  targetSpeed: number; // 80 or 100
  durationMinutes: number;
  wordCount: number;
  dictationText: string;
}

export interface TranslationExercise {
  id: string;
  title: string;
  direction: 'en_to_hi' | 'hi_to_en';
  sourceText: string;
  modelTranslation: string;
  keyTerminology: { term: string; meaning: string }[];
  grammarNotes: string;
}

export interface PhysicalStandard {
  id: string;
  exam: ExamId;
  gender: 'male' | 'female';
  category: string;
  heightMinCm: number;
  chestMinCm?: number;
  chestExpansionMinCm?: number;
  weightMinKg?: number;
  petEvents: {
    event: { en: string; hi: string };
    requirement: { en: string; hi: string };
    relaxations?: { en: string; hi: string };
  }[];
  officialSource: string;
}

export interface UserPracticeAttempt {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: number;
  mistakeType?: 'concept' | 'calculation' | 'misread' | 'guess' | 'time-pressure' | 'careless' | 'elimination';
}

export interface UserMockResult {
  id: string;
  mockId: string;
  mockTitle: string;
  exam: ExamId;
  date: string;
  totalScore: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracy: number;
  timeSpentSeconds: number;
  subjectBreakdown: Record<string, { correct: number; incorrect: number; unattempted: number; score: number }>;
}

export interface LiveUpdateItem {
  id: string;
  category: 'important' | 'deadline' | 'new' | 'info';
  date: string;
  title: { en: string; hi: string };
  exam: ExamId | 'all';
  linkText: { en: string; hi: string };
  url: string;
  isOfficial: boolean;
}
