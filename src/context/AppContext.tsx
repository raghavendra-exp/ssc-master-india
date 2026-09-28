import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, ExamId, QuestionItem, PostProfile, UserMockResult, UserPracticeAttempt } from '../types/index.ts';
import { 
  EXAM_CONFIGS, 
  POSTS_DATA, 
  ALL_QUESTIONS, 
  VERIFIED_PYQS, 
  BOOKS_DATA, 
  VACANCIES_DATA, 
  CUTOFFS_DATA, 
  UPDATES_DATA, 
  CURRENT_AFFAIRS_DATA, 
  FORMULAS_DATA, 
  FLASHCARDS_DATA, 
  PHYSICAL_STANDARDS_DATA, 
  TYPING_DATA, 
  STENO_DATA, 
  TRANSLATION_DATA 
} from '../data/initialData.ts';

export interface PostPreferenceItem {
  preferenceRank: number;
  post: PostProfile;
}

export interface ErrorNotebookItem {
  questionId: string;
  question: QuestionItem;
  userAnswer: number;
  mistakeType: 'concept' | 'calculation' | 'misread' | 'guess' | 'time-pressure' | 'careless' | 'elimination';
  notes?: string;
  timestamp: number;
  revisionStatus: 'due' | 'reviewed';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  activeExam: ExamId;
  setActiveExam: (exam: ExamId) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarkedQuestionIds: string[];
  toggleBookmark: (questionId: string) => void;
  errorNotebook: ErrorNotebookItem[];
  addErrorItem: (item: Omit<ErrorNotebookItem, 'revisionStatus'>) => void;
  removeErrorItem: (questionId: string) => void;
  markErrorReviewed: (questionId: string) => void;
  mockResults: UserMockResult[];
  saveMockResult: (result: UserMockResult) => void;
  practiceAttempts: Record<string, UserPracticeAttempt>;
  savePracticeAttempt: (attempt: UserPracticeAttempt) => void;
  postPreferences: PostPreferenceItem[];
  addPostPreference: (post: PostProfile) => void;
  removePostPreference: (postId: string) => void;
  movePostPreference: (index: number, direction: 'up' | 'down') => void;
  clearPostPreferences: () => void;
  allQuestions: QuestionItem[];
  verifiedPyqs: QuestionItem[];
  examConfigs: typeof EXAM_CONFIGS;
  postsData: typeof POSTS_DATA;
  vacanciesData: typeof VACANCIES_DATA;
  cutoffsData: typeof CUTOFFS_DATA;
  booksData: typeof BOOKS_DATA;
  updatesData: typeof UPDATES_DATA;
  currentAffairsData: typeof CURRENT_AFFAIRS_DATA;
  formulasData: typeof FORMULAS_DATA;
  flashcardsData: typeof FLASHCARDS_DATA;
  physicalStandardsData: typeof PHYSICAL_STANDARDS_DATA;
  typingData: typeof TYPING_DATA;
  stenoData: typeof STENO_DATA;
  translationData: typeof TRANSLATION_DATA;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ssc_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ssc_lang', lang);
  };

  // 2. Theme state
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('ssc_theme');
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const applyThemeToDOM = (t: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    const isDark = t === 'dark' || (t === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
    localStorage.setItem('ssc_theme', theme);

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyThemeToDOM('system');
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [theme]);

  const setTheme = (t: 'light' | 'dark' | 'system') => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState(prev => {
      const isDark = prev === 'dark' || (prev === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || document.documentElement.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      applyThemeToDOM(next);
      return next;
    });
  };

  // 3. Active Exam
  const [activeExam, setActiveExam] = useState<ExamId>('cgl');

  // 4. Global Search modal
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 5. Bookmarks
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ssc_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedQuestionIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('ssc_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  // 6. Error Notebook
  const [errorNotebook, setErrorNotebook] = useState<ErrorNotebookItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ssc_errors') || '[]');
    } catch {
      return [];
    }
  });

  const addErrorItem = (item: Omit<ErrorNotebookItem, 'revisionStatus'>) => {
    setErrorNotebook(prev => {
      const filtered = prev.filter(x => x.questionId !== item.questionId);
      const next = [{ ...item, revisionStatus: 'due' as const }, ...filtered];
      localStorage.setItem('ssc_errors', JSON.stringify(next));
      return next;
    });
  };

  const removeErrorItem = (questionId: string) => {
    setErrorNotebook(prev => {
      const next = prev.filter(x => x.questionId !== questionId);
      localStorage.setItem('ssc_errors', JSON.stringify(next));
      return next;
    });
  };

  const markErrorReviewed = (questionId: string) => {
    setErrorNotebook(prev => {
      const next = prev.map(x => x.questionId === questionId ? { ...x, revisionStatus: 'reviewed' as const } : x);
      localStorage.setItem('ssc_errors', JSON.stringify(next));
      return next;
    });
  };

  // 7. Mock Results
  const [mockResults, setMockResults] = useState<UserMockResult[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ssc_mock_results') || '[]');
    } catch {
      return [];
    }
  });

  const saveMockResult = (res: UserMockResult) => {
    setMockResults(prev => {
      const next = [res, ...prev];
      localStorage.setItem('ssc_mock_results', JSON.stringify(next));
      return next;
    });
  };

  // 8. Practice Attempts
  const [practiceAttempts, setPracticeAttempts] = useState<Record<string, UserPracticeAttempt>>(() => {
    try {
      return JSON.parse(localStorage.getItem('ssc_practice_attempts') || '{}');
    } catch {
      return {};
    }
  });

  const savePracticeAttempt = (att: UserPracticeAttempt) => {
    setPracticeAttempts(prev => {
      const next = { ...prev, [att.questionId]: att };
      localStorage.setItem('ssc_practice_attempts', JSON.stringify(next));
      return next;
    });
  };

  // 9. Post Preferences ("My Post Preference List")
  const [postPreferences, setPostPreferences] = useState<PostPreferenceItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ssc_post_prefs') || '[]');
    } catch {
      return [];
    }
  });

  const addPostPreference = (post: PostProfile) => {
    setPostPreferences(prev => {
      if (prev.some(p => p.post.id === post.id)) return prev;
      const next = [...prev, { preferenceRank: prev.length + 1, post }];
      localStorage.setItem('ssc_post_prefs', JSON.stringify(next));
      return next;
    });
  };

  const removePostPreference = (postId: string) => {
    setPostPreferences(prev => {
      const filtered = prev.filter(p => p.post.id !== postId);
      const renumbered = filtered.map((p, idx) => ({ ...p, preferenceRank: idx + 1 }));
      localStorage.setItem('ssc_post_prefs', JSON.stringify(renumbered));
      return renumbered;
    });
  };

  const movePostPreference = (index: number, direction: 'up' | 'down') => {
    setPostPreferences(prev => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      const renumbered = copy.map((p, idx) => ({ ...p, preferenceRank: idx + 1 }));
      localStorage.setItem('ssc_post_prefs', JSON.stringify(renumbered));
      return renumbered;
    });
  };

  const clearPostPreferences = () => {
    setPostPreferences([]);
    localStorage.removeItem('ssc_post_prefs');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        activeExam,
        setActiveExam,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        bookmarkedQuestionIds,
        toggleBookmark,
        errorNotebook,
        addErrorItem,
        removeErrorItem,
        markErrorReviewed,
        mockResults,
        saveMockResult,
        practiceAttempts,
        savePracticeAttempt,
        postPreferences,
        addPostPreference,
        removePostPreference,
        movePostPreference,
        clearPostPreferences,
        allQuestions: ALL_QUESTIONS,
        verifiedPyqs: VERIFIED_PYQS,
        examConfigs: EXAM_CONFIGS,
        postsData: POSTS_DATA,
        vacanciesData: VACANCIES_DATA,
        cutoffsData: CUTOFFS_DATA,
        booksData: BOOKS_DATA,
        updatesData: UPDATES_DATA,
        currentAffairsData: CURRENT_AFFAIRS_DATA,
        formulasData: FORMULAS_DATA,
        flashcardsData: FLASHCARDS_DATA,
        physicalStandardsData: PHYSICAL_STANDARDS_DATA,
        typingData: TYPING_DATA,
        stenoData: STENO_DATA,
        translationData: TRANSLATION_DATA
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
