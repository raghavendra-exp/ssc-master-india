import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { Bookmark, BookmarkCheck, Trash2, ArrowRight, CheckCircle2, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

interface BookmarksViewProps {
  onNavigate: (view: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onNavigate }) => {
  const { language, bookmarkedQuestionIds, toggleBookmark, allQuestions, addErrorItem } = useApp();
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [addedNote, setAddedNote] = useState<string | null>(null);

  const bookmarkedQuestions = allQuestions.filter(q => bookmarkedQuestionIds.includes(q.id));

  const subjects = ['all', ...Array.from(new Set(bookmarkedQuestions.map(q => q.subject)))];

  const filtered = filterSubject === 'all'
    ? bookmarkedQuestions
    : bookmarkedQuestions.filter(q => q.subject === filterSubject);

  const handleAddToErrors = (qId: string) => {
    const q = allQuestions.find(x => x.id === qId);
    if (!q) return;
    addErrorItem({
      questionId: qId,
      question: q,
      userAnswer: -1,
      mistakeType: 'concept',
      notes: 'Saved from Bookmarks for focused conceptual review',
      timestamp: Date.now()
    });
    setAddedNote(qId);
    setTimeout(() => setAddedNote(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs 
        items={[
          { label: { en: 'Bookmarks', hi: 'बुकमार्क' } }
        ]} 
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            {language === 'hi' ? 'सहेजे गए प्रश्न' : 'Saved Questions'}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'hi' ? 'बुकमार्क किए गए प्रश्न' : 'My Bookmarked Questions'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {language === 'hi'
              ? `कुल ${bookmarkedQuestions.length} प्रश्न आपने त्वरित पुनरीक्षण के लिए सहेज रखे हैं`
              : `Total ${bookmarkedQuestions.length} questions saved for targeted revision`}
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <div className="flex items-center gap-3">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(s => (
                <option key={s} value={s}>
                  {s === 'all'
                    ? (language === 'hi' ? 'सभी विषय (All Subjects)' : 'All Subjects')
                    : s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Empty State */}
      {bookmarkedQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <BookmarkCheck className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {language === 'hi' ? 'कोई बुकमार्क नहीं मिला' : 'No Bookmarks Saved Yet'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {language === 'hi'
              ? 'प्रैक्टिस टेस्ट, मॉक टेस्ट या PYQ मास्टर के दौरान किसी भी प्रश्न पर बुकमार्क आइकन दबाकर यहाँ सहेजें।'
              : 'Save important or tricky questions by clicking the bookmark icon during Practice, Mock Tests, or PYQ Master.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('practice')}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {language === 'hi' ? 'प्रैक्टिस टेस्ट शुरू करें' : 'Start Practice'}
            </button>
            <button
              onClick={() => onNavigate('pyq-master')}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              {language === 'hi' ? 'PYQ मास्टर देखें' : 'Explore PYQs'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q, idx) => {
            const secondaryLang = language === 'hi' ? 'en' : 'hi';
            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 transition hover:border-slate-300 dark:hover:border-slate-600"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      Q #{idx + 1} ({q.id})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {q.exam.toUpperCase()} • {q.subject}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full ${
                      q.difficulty === 'easy'
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : q.difficulty === 'medium'
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
                    }`}>
                      {q.difficulty.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                      {q.source}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToErrors(q.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5"
                      title={language === 'hi' ? 'त्रुटि नोटबुक में जोड़ें' : 'Add to Error Notebook'}
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      {addedNote === q.id
                        ? (language === 'hi' ? 'जोड़ दिया गया!' : 'Added!')
                        : (language === 'hi' ? 'त्रुटि नोटबुक' : 'Add to Errors')}
                    </button>
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition"
                      title={language === 'hi' ? 'बुकमार्क हटाएं' : 'Remove Bookmark'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <div className="text-base font-medium text-slate-900 dark:text-white leading-relaxed">
                    {q.question[language]}
                  </div>
                  {/* Secondary Language Subtext */}
                  <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {q.question[secondaryLang]}
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.answer;
                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-sm flex items-start gap-2.5 transition ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                            : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isCorrect
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <div className="flex-1">
                          <div>{opt[language]}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {opt[secondaryLang]}
                          </div>
                        </div>
                        {isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Explanation */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs space-y-1.5">
                    <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      {language === 'hi' ? 'विस्तृत समाधान (Solution):' : 'Detailed Solution & Concept:'}
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {q.explanation[language]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
