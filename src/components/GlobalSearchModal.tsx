import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Award, Briefcase, HelpCircle, BookOpen, ChevronRight, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface GlobalSearchModalProps {
  onNavigate: (view: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ onNavigate }) => {
  const { 
    searchOpen, 
    setSearchOpen, 
    language, 
    allQuestions, 
    examConfigs, 
    postsData, 
    booksData, 
    formulasData 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search results
  const matchedExams = Object.values(examConfigs).filter(e => 
    !cleanQuery || 
    e.examName.en.toLowerCase().includes(cleanQuery) || 
    e.examName.hi.includes(cleanQuery) ||
    e.fullName.en.toLowerCase().includes(cleanQuery) ||
    e.examCode.toLowerCase().includes(cleanQuery)
  ).slice(0, 4);

  const matchedPosts = postsData.filter(p => 
    cleanQuery && (
      p.postName.en.toLowerCase().includes(cleanQuery) ||
      p.postName.hi.includes(cleanQuery) ||
      p.department.toLowerCase().includes(cleanQuery) ||
      p.ministry.toLowerCase().includes(cleanQuery)
    )
  ).slice(0, 4);

  const matchedQuestions = cleanQuery ? allQuestions.filter(q => 
    q.question.en.toLowerCase().includes(cleanQuery) ||
    q.question.hi.includes(cleanQuery) ||
    q.chapter.toLowerCase().includes(cleanQuery) ||
    q.topic.toLowerCase().includes(cleanQuery) ||
    q.subject.toLowerCase().includes(cleanQuery)
  ).slice(0, 5) : [];

  const matchedBooks = cleanQuery ? booksData.filter(b => 
    b.title.toLowerCase().includes(cleanQuery) ||
    b.author.toLowerCase().includes(cleanQuery) ||
    b.publisher.toLowerCase().includes(cleanQuery) ||
    b.subject.toLowerCase().includes(cleanQuery)
  ).slice(0, 3) : [];

  const matchedFormulas = cleanQuery ? formulasData.filter(f => 
    f.topic.toLowerCase().includes(cleanQuery) ||
    f.title.en.toLowerCase().includes(cleanQuery) ||
    f.formula.toLowerCase().includes(cleanQuery)
  ).slice(0, 3) : [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs"
      onClick={() => setSearchOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] mt-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={language === 'hi' ? 'एसएससी परीक्षा, पद, प्रश्न, अध्याय, सूत्र, पुस्तक खोजें...' : 'Search exams, posts, questions, topics, formulas, books...'}
            className="flex-1 bg-transparent border-0 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
          {/* Exams */}
          {matchedExams.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'hi' ? 'एसएससी परीक्षाएं' : 'SSC Examinations'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedExams.map(e => (
                  <button
                    key={e.examId}
                    onClick={() => {
                      onNavigate(`exam-${e.examCode}`);
                      setSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-left transition-all group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {e.examName[language]}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                        {e.fullName[language]}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Posts & Departments */}
          {matchedPosts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'hi' ? 'पद एवं विभाग' : 'Posts & Departments'}</span>
              </div>
              <div className="space-y-1.5">
                {matchedPosts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate('post-explorer');
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {p.postName[language]}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                        • {p.department} ({p.payScale})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      Level {p.payLevel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Questions */}
          {matchedQuestions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>{language === 'hi' ? 'प्रश्न बैंक' : 'Questions & PYQs'}</span>
              </div>
              <div className="space-y-2">
                {matchedQuestions.map(q => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onNavigate('practice');
                      setSearchOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors block"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase">
                        {q.subject}
                      </span>
                      <span>•</span>
                      <span>{q.chapter}</span>
                      <span className="ml-auto px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                        {q.sourceType}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm">
                      {q.question[language]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulas */}
          {matchedFormulas.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>{language === 'hi' ? 'गणित सूत्र' : 'Math Formulas'}</span>
              </div>
              <div className="space-y-1.5">
                {matchedFormulas.map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onNavigate('formula-book');
                      setSearchOpen(false);
                    }}
                    className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors block"
                  >
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {f.title[language]} ({f.topic})
                    </div>
                    <div className="font-mono text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                      {f.formula}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && matchedExams.length === 0 && matchedPosts.length === 0 && matchedQuestions.length === 0 && matchedFormulas.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="font-medium">
                {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No matching results found'}
              </p>
              <p className="text-xs mt-1">
                {language === 'hi' ? 'कृपया अन्य कीवर्ड खोजें (जैसे: CGL, Percentage, Polity, Inspector)' : 'Try searching for CGL, Percentage, Polity, Inspector, Formula, etc.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>{language === 'hi' ? 'नेविगेट करने हेतु क्लिक करें' : 'Click any result to navigate'}</span>
          <span>1,128+ {language === 'hi' ? 'प्रश्न अनुक्रमित' : 'Questions Indexed'}</span>
        </div>
      </div>
    </div>
  );
};
