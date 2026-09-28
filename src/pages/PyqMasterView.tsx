import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  HelpCircle, 
  BarChart3, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface PyqMasterViewProps {
  onNavigate: (view: string) => void;
}

export const PyqMasterView: React.FC<PyqMasterViewProps> = ({ onNavigate }) => {
  const { 
    language, 
    verifiedPyqs, 
    bookmarkedQuestionIds, 
    toggleBookmark 
  } = useApp();

  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const filteredPyqs = verifiedPyqs.filter(q => {
    if (selectedExam !== 'all' && q.exam !== selectedExam) return false;
    if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
    if (selectedYear !== 'all' && q.year !== selectedYear) return false;
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      return (
        q.question.en.toLowerCase().includes(s) ||
        q.question.hi.includes(s) ||
        q.chapter.toLowerCase().includes(s) ||
        q.topic.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const toggleSolution = (id: string) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'PYQ Master', hi: 'पूर्व वर्ष प्रश्न' }, view: 'dashboard' },
          { label: { en: 'Verified TCS PYQ Archive', hi: 'सत्यापित टीसीएस PYQ संग्रह' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-purple-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>100% Genuine Shift-wise TCS PYQs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी सत्यापित PYQ मास्टर' : 'SSC Verified PYQ Master'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'कर्मचारी चयन आयोग की वास्तविक टीसीएस पालियों से संकलित 520+ सत्यापित प्रश्न, संपूर्ण द्विभाषी स्पष्टीकरण सहित।'
              : 'Authentic previous year questions with verified shift metadata and in-depth conceptual solutions.'}
          </p>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-700 text-center self-start md:self-center">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Verified PYQs</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
            {verifiedPyqs.length}
          </span>
        </div>
      </div>

      {/* Historical Analysis Callout (Section 33) */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <BarChart3 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 dark:text-white uppercase">
            {language === 'hi' ? 'ऐतिहासिक विश्लेषण लेबल:' : 'HISTORICAL ANALYSIS:'} 
          </span>
          {language === 'hi'
            ? ' विगत 5 वर्षों के टीसीएस प्रश्नों का अध्ययन परीक्षा पैटर्न को समझने हेतु है। कभी यह दावा न करें कि कोई विशेष प्रश्न या विषय आगामी परीक्षा में अवश्य आएगा।'
            : ' Frequency trends provide historical context only. No topic or question is ever officially guaranteed to repeat.'}
        </div>
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'PYQ प्रश्न या अध्याय खोजें...' : 'Search questions, chapters, or topics...'}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden"
          />
        </div>

        <select
          value={selectedExam}
          onChange={e => setSelectedExam(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी परीक्षाएं' : 'All Exams'}</option>
          <option value="cgl">SSC CGL</option>
          <option value="chsl">SSC CHSL</option>
          <option value="mts">SSC MTS</option>
          <option value="gd">SSC GD</option>
          <option value="cpo">SSC CPO</option>
          <option value="je">SSC JE</option>
          <option value="stenographer">SSC Stenographer</option>
        </select>

        <select
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी विषय' : 'All Subjects'}</option>
          <option value="Quantitative Aptitude">Quantitative Aptitude</option>
          <option value="General Intelligence & Reasoning">Reasoning</option>
          <option value="English Language">English Language</option>
          <option value="General Awareness">General Awareness</option>
          <option value="Computer Knowledge">Computer Knowledge</option>
          <option value="Engineering">Engineering</option>
        </select>

        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी वर्ष' : 'All Years'}</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      {/* PYQ List */}
      <div className="space-y-4">
        {filteredPyqs.slice(0, 50).map((q, idx) => {
          const isRevealed = revealedSolutions[q.id];
          const isBookmarked = bookmarkedQuestionIds.includes(q.id);

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold uppercase text-[10px]">
                    VERIFIED PYQ
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {q.exam.toUpperCase()} • {q.stage}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{q.subject}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">{q.source}</span>
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1 rounded text-slate-400 hover:text-amber-500"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                {q.chapter} • {q.topic}
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                {q.question[language]}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                      isRevealed && oIdx === q.answer
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt[language]}</span>
                  </div>
                ))}
              </div>

              {/* Reveal Solution toggle */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => toggleSolution(q.id)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isRevealed
                    ? (language === 'hi' ? 'हल छिपाएं ▲' : 'Hide Solution ▲')
                    : (language === 'hi' ? 'उत्तर एवं विस्तृत व्याख्या देखें ▼' : 'Reveal Answer & Detailed Solution ▼')}
                </button>

                <span className="text-[11px] text-slate-400 capitalize">
                  Difficulty: {q.difficulty}
                </span>
              </div>

              {isRevealed && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fade-in">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                    {language === 'hi' ? 'आधिकारिक हल एवं व्याख्या:' : 'Verified Official Explanation:'}
                  </span>
                  <p className="whitespace-pre-line leading-relaxed">{q.explanation[language]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
