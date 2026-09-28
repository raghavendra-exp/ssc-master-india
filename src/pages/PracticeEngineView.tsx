import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  BookmarkCheck, 
  RefreshCw, 
  Filter, 
  ArrowRight, 
  BookMarked, 
  ChevronRight, 
  SlidersHorizontal,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import type { QuestionItem, SubjectCategory, ExamId } from '../types/index.ts';

interface PracticeEngineViewProps {
  onNavigate: (view: string) => void;
}

export const PracticeEngineView: React.FC<PracticeEngineViewProps> = ({ onNavigate }) => {
  const { 
    language, 
    allQuestions, 
    bookmarkedQuestionIds, 
    toggleBookmark, 
    addErrorItem,
    savePracticeAttempt 
  } = useApp();

  // Filters
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSourceType, setSelectedSourceType] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(20);

  // Practice state
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  // Filtered pool
  const filteredPool = useMemo(() => {
    return allQuestions.filter(q => {
      if (selectedExam !== 'all' && q.exam !== selectedExam) return false;
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedSourceType !== 'all' && q.sourceType !== selectedSourceType) return false;
      return true;
    });
  }, [allQuestions, selectedExam, selectedSubject, selectedDifficulty, selectedSourceType]);

  // Active quiz set
  const [activeQuizSet, setActiveQuizSet] = useState<QuestionItem[]>([]);

  const startPractice = () => {
    const shuffled = [...filteredPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    setActiveQuizSet(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation({});
    setIsPracticing(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (userAnswers[currentIndex] !== undefined) return; // already answered

    const currentQ = activeQuizSet[currentIndex];
    const isCorrect = optionIndex === currentQ.answer;

    setUserAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [currentIndex]: true }));

    // Record attempt
    savePracticeAttempt({
      questionId: currentQ.id,
      selectedOption: optionIndex,
      isCorrect,
      timeSpentSeconds: 15,
      timestamp: Date.now()
    });

    // If incorrect, prompt/add to error notebook
    if (!isCorrect) {
      addErrorItem({
        questionId: currentQ.id,
        question: currentQ,
        userAnswer: optionIndex,
        mistakeType: 'concept',
        timestamp: Date.now()
      });
    }
  };

  const subjectsList: SubjectCategory[] = [
    'Quantitative Aptitude',
    'General Intelligence & Reasoning',
    'English Language',
    'General Awareness',
    'Computer Knowledge',
    'Engineering',
    'General Hindi'
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: { en: 'Practice', hi: 'अभ्यास' }, view: 'practice' },
          { label: { en: 'Interactive Practice Engine', hi: 'इंटरैक्टिव प्रश्न बैंक' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>1,128+ {language === 'hi' ? 'द्विभाषी प्रश्न अनुक्रमित' : 'Bilingual Questions'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी प्रैक्टिस इंजन' : 'SSC Practice Engine'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {language === 'hi'
              ? 'सत्यापित पिछले वर्षों के प्रश्न (PYQs) एवं विषयवार अभ्यास सेट तत्काल समाधान एवं विश्लेषण सहित हल करें।'
              : 'Practice authenticated TCS PYQs & chapterwise questions with detailed explanations and instant error tracking.'}
          </p>
        </div>

        {isPracticing && (
          <button
            onClick={() => setIsPracticing(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 self-start md:self-center"
          >
            {language === 'hi' ? '← फिल्टर बदलें' : '← Change Filters'}
          </button>
        )}
      </div>

      {!isPracticing ? (
        /* Configuration Panel */
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <span>{language === 'hi' ? 'कस्टम प्रैक्टिस सेट कॉन्फ़िगर करें' : 'Configure Custom Practice Set'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            {/* Exam selector */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'hi' ? 'लक्ष्य एसएससी परीक्षा' : 'Target SSC Exam'}
              </label>
              <select
                value={selectedExam}
                onChange={e => setSelectedExam(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="all">{language === 'hi' ? 'सभी एसएससी परीक्षाएं (All)' : 'All SSC Exams (Combined)'}</option>
                <option value="cgl">SSC CGL</option>
                <option value="chsl">SSC CHSL</option>
                <option value="mts">SSC MTS & Havaldar</option>
                <option value="gd">SSC GD Constable</option>
                <option value="cpo">SSC CPO</option>
                <option value="je">SSC JE</option>
                <option value="stenographer">SSC Stenographer</option>
                <option value="selection-post">SSC Selection Post</option>
                <option value="jht">SSC JHT / SHT</option>
              </select>
            </div>

            {/* Subject selector */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'hi' ? 'विषय चुनें' : 'Select Subject'}
              </label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="all">{language === 'hi' ? 'सभी विषय (Mixed Subjects)' : 'All Subjects (Full Mixed)'}</option>
                {subjectsList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'hi' ? 'कठिनाई स्तर' : 'Difficulty Level'}
              </label>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="all">{language === 'hi' ? 'सभी स्तर (All Levels)' : 'All Levels'}</option>
                <option value="easy">{language === 'hi' ? 'सरल (Easy)' : 'Easy'}</option>
                <option value="medium">{language === 'hi' ? 'मध्यम (Medium)' : 'Medium'}</option>
                <option value="hard">{language === 'hi' ? 'कठिन (Hard)' : 'Hard'}</option>
              </select>
            </div>

            {/* Source Type */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'hi' ? 'प्रश्न का प्रकार (स्रोत)' : 'Question Source Classification'}
              </label>
              <select
                value={selectedSourceType}
                onChange={e => setSelectedSourceType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
              >
                <option value="all">{language === 'hi' ? 'सभी प्रकार (PYQs + Original)' : 'All Types (Combined)'}</option>
                <option value="verified-pyq">Verified PYQ (वास्तविक पूर्व वर्ष प्रश्न)</option>
                <option value="pyq-style">PYQ-Style (टीसीएस पैटर्न अनुरूप)</option>
                <option value="original">Original Practice (मूल अभ्यास प्रश्न)</option>
              </select>
            </div>
          </div>

          {/* Number of Questions selector */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm">
              {language === 'hi' ? 'प्रश्नों की संख्या चुनें:' : 'Select Question Quantity:'}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[10, 20, 50, 100].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setQuestionCount(cnt)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    questionCount === cnt
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cnt} {language === 'hi' ? 'प्रश्न' : 'Questions'}
                </button>
              ))}
            </div>
          </div>

          {/* Start Practice Action */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span>{language === 'hi' ? 'उपलब्ध प्रश्न:' : 'Available in matching pool:'} </span>
              <strong className="text-blue-600 dark:text-blue-400 font-bold">{filteredPool.length}</strong>
            </div>

            <button
              onClick={startPractice}
              disabled={filteredPool.length === 0}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <Zap className="w-4 h-4" />
              <span>{language === 'hi' ? `अभ्यास शुरू करें (${Math.min(questionCount, filteredPool.length)} प्रश्न)` : `Start Practice (${Math.min(questionCount, filteredPool.length)} Questions)`}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Practice Interface */
        activeQuizSet.length > 0 && (
          <div className="space-y-4">
            {/* Top status bar */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'प्रश्न' : 'Question'} {currentIndex + 1} / {activeQuizSet.length}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase">
                  {activeQuizSet[currentIndex].subject}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                  activeQuizSet[currentIndex].sourceType === 'verified-pyq'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {activeQuizSet[currentIndex].sourceType === 'verified-pyq' ? 'VERIFIED PYQ' : activeQuizSet[currentIndex].sourceType.toUpperCase()}
                </span>

                <button
                  onClick={() => toggleBookmark(activeQuizSet[currentIndex].id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500"
                  title="Bookmark Question"
                >
                  {bookmarkedQuestionIds.includes(activeQuizSet[currentIndex].id) ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {activeQuizSet[currentIndex].chapter} • {activeQuizSet[currentIndex].topic}
              </div>

              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                {activeQuizSet[currentIndex].question[language]}
              </div>

              {/* Options list */}
              <div className="space-y-2.5">
                {activeQuizSet[currentIndex].options.map((opt, optIdx) => {
                  const hasAnswered = userAnswers[currentIndex] !== undefined;
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  const isCorrectAnswer = optIdx === activeQuizSet[currentIndex].answer;

                  let optClass = "border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 text-slate-800 dark:text-slate-200";
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      optClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrectAnswer) {
                      optClass = "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200";
                    } else {
                      optClass = "border-slate-200 dark:border-slate-800 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={hasAnswered}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${optClass}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm flex-1 leading-snug">
                        {opt[language]}
                      </span>
                      {hasAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* In-depth Explanation section */}
              {showExplanation[currentIndex] && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 animate-fade-in">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4" />
                    <span>{language === 'hi' ? 'विस्तृत हल एवं व्याख्या' : 'Detailed Solution & Concept Explanation'}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {activeQuizSet[currentIndex].explanation[language]}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span>Source: {activeQuizSet[currentIndex].source}</span>
                    <span className="capitalize">Difficulty: {activeQuizSet[currentIndex].difficulty}</span>
                  </div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs sm:text-sm font-semibold transition-colors"
                >
                  {language === 'hi' ? '← पिछला' : '← Previous'}
                </button>

                {currentIndex < activeQuizSet.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>{language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPracticing(false)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>{language === 'hi' ? 'अभ्यास समाप्त करें' : 'Finish Practice'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
