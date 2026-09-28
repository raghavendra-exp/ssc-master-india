import React, { useState } from 'react';
import { 
  BookMarked, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Calendar,
  Filter 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface ErrorNotebookViewProps {
  onNavigate: (view: string) => void;
}

export const ErrorNotebookView: React.FC<ErrorNotebookViewProps> = ({ onNavigate }) => {
  const { 
    language, 
    errorNotebook, 
    removeErrorItem, 
    markErrorReviewed 
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'due' | 'reviewed'>('all');

  const filteredErrors = errorNotebook.filter(e => {
    if (selectedFilter === 'all') return true;
    return e.revisionStatus === selectedFilter;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Personal Learning', hi: 'व्यक्तिगत अध्ययन' }, view: 'dashboard' },
          { label: { en: 'Error Notebook', hi: 'गलती नोटबुक' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold mb-2">
            <BookMarked className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'गलतियों का सक्रिय सुधार' : 'Active Mistake Correction'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी गलती नोटबुक (Error Notebook)' : 'SSC Error Notebook'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'प्रैक्टिस या मॉक टेस्ट में गलत हुए प्रश्नों का स्वतः संग्रहण, ताकि परीक्षा से पूर्व कमजोर बिंदुओं का दोहराव किया जा सके।'
              : 'Automatically records questions answered incorrectly during practice or mocks to prevent repeat mistakes in the final examination.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Mistakes</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {errorNotebook.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'due', 'reviewed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedFilter === tab
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {tab === 'all' && (language === 'hi' ? 'सभी गलतियां' : 'All Recorded')}
            {tab === 'due' && (language === 'hi' ? 'रिवीजन बाकी (Due)' : 'Revision Due')}
            {tab === 'reviewed' && (language === 'hi' ? 'दोहराया गया (Reviewed)' : 'Reviewed')}
          </button>
        ))}
      </div>

      {/* Error Questions List */}
      {filteredErrors.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-3">
          <BookMarked className="w-12 h-12 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {language === 'hi' ? 'इस श्रेणी में कोई गलती दर्ज नहीं है' : 'No recorded mistakes in this filter'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'hi'
              ? 'प्रैक्टिस इंजन या मॉक टेस्ट में जब आप कोई गलत विकल्प चुनेंगे, वह प्रश्न यहाँ स्वतः जुड़ जाएगा।'
              : 'Whenever you choose an incorrect answer during practice sessions, it will be automatically logged here for spaced review.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredErrors.map((err, idx) => (
            <div
              key={err.questionId}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {err.question.subject}
                  </span>
                  <span>•</span>
                  <span className="text-slate-500">{err.question.chapter}</span>
                  <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-[10px] font-bold uppercase">
                    Mistake: {err.mistakeType}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {err.revisionStatus === 'due' ? (
                    <button
                      onClick={() => markErrorReviewed(err.questionId)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'रिवीजन पूर्ण मार्क करें' : 'Mark Reviewed'}</span>
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-semibold">
                      Reviewed ✓
                    </span>
                  )}

                  <button
                    onClick={() => removeErrorItem(err.questionId)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                {err.question.question[language]}
              </p>

              {/* Show options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {err.question.options.map((opt, oIdx) => {
                  const isUserAns = err.userAnswer === oIdx;
                  const isCorrect = oIdx === err.question.answer;

                  return (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                          : isUserAns
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>{opt[language]}</span>
                      {isCorrect && <span className="text-[10px] font-bold text-emerald-600">Correct Answer</span>}
                      {isUserAns && !isCorrect && <span className="text-[10px] font-bold text-red-500">Your Choice</span>}
                    </div>
                  );
                })}
              </div>

              {/* Detailed Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {language === 'hi' ? 'अवधारणा एवं सही समाधान:' : 'Explanation & Correct Approach:'}
                </span>
                <p>{err.question.explanation[language]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
