import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  PieChart, 
  BarChart3,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import type { ExamId, QuestionItem, UserMockResult } from '../types/index.ts';

interface MockTestViewProps {
  onNavigate: (view: string) => void;
}

type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked';

export const MockTestView: React.FC<MockTestViewProps> = ({ onNavigate }) => {
  const { language, allQuestions, saveMockResult, examConfigs } = useApp();

  // Selected mock type
  const [selectedMock, setSelectedMock] = useState<string>('cgl-tier1');
  const [inTest, setInTest] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Mock questions and answers
  const [testQuestions, setTestQuestions] = useState<QuestionItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [statuses, setStatuses] = useState<Record<number, QuestionStatus>>({});
  const [timeLeft, setTimeLeft] = useState<number>(3600); // seconds
  const [lastResult, setLastResult] = useState<UserMockResult | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mockConfigs: Record<string, { title: { en: string; hi: string }; exam: ExamId; questionsCount: number; durationSeconds: number; negativeMarking: number; marksPerQuestion: number }> = {
    'cgl-tier1': {
      title: { en: 'SSC CGL Tier-I Official Full Mock Test', hi: 'एसएससी सीजीएल टियर-I आधिकारिक फुल मॉक टेस्ट' },
      exam: 'cgl',
      questionsCount: 100,
      durationSeconds: 3600, // 60 mins
      negativeMarking: 0.50,
      marksPerQuestion: 2.0
    },
    'chsl-tier1': {
      title: { en: 'SSC CHSL Tier-I Full Length Mock Test', hi: 'एसएससी सीएचएसएल टियर-I फुल लेंथ मॉक टेस्ट' },
      exam: 'chsl',
      questionsCount: 100,
      durationSeconds: 3600,
      negativeMarking: 0.50,
      marksPerQuestion: 2.0
    },
    'mts-cbe': {
      title: { en: 'SSC MTS & Havaldar Real CBE Mock Simulation', hi: 'एसएससी एमटीएस एवं हवलदार सीबीटी मॉक सिमुलेशन' },
      exam: 'mts',
      questionsCount: 90,
      durationSeconds: 5400, // 90 mins
      negativeMarking: 1.0, // in session 2
      marksPerQuestion: 3.0
    },
    'gd-cbe': {
      title: { en: 'SSC GD Constable Computer Based Test Simulation', hi: 'एसएससी जीडी कांस्टेबल सीबीटी मॉक टेस्ट' },
      exam: 'gd',
      questionsCount: 80,
      durationSeconds: 3600,
      negativeMarking: 0.25,
      marksPerQuestion: 2.0
    },
    'cpo-paper1': {
      title: { en: 'SSC CPO Sub-Inspector Paper-I Full Mock', hi: 'एसएससी सीपीओ उप-निरीक्षक पेपर-I फुल मॉक' },
      exam: 'cpo',
      questionsCount: 100,
      durationSeconds: 7200, // 120 mins
      negativeMarking: 0.25,
      marksPerQuestion: 1.0
    },
    'je-paper1': {
      title: { en: 'SSC JE Junior Engineer Paper-I Full Mock', hi: 'एसएससी जेई पेपर-I फुल मॉक टेस्ट' },
      exam: 'je',
      questionsCount: 100,
      durationSeconds: 7200,
      negativeMarking: 0.25,
      marksPerQuestion: 1.0
    },
    'steno-cbe': {
      title: { en: 'SSC Stenographer Grade C & D (No Math) Full Mock', hi: 'एसएससी आशुलिपिक ग्रेड सी व डी (गणित रहित) फुल मॉक' },
      exam: 'stenographer',
      questionsCount: 100,
      durationSeconds: 7200,
      negativeMarking: 0.25,
      marksPerQuestion: 1.0
    }
  };

  const activeConfig = mockConfigs[selectedMock] || mockConfigs['cgl-tier1'];

  // Start test
  const handleStartTest = () => {
    // Filter questions relevant to this exam or pool
    let pool = allQuestions.filter(q => q.exam === activeConfig.exam);
    if (pool.length < activeConfig.questionsCount) {
      pool = [...pool, ...allQuestions.filter(q => q.exam !== activeConfig.exam)];
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, activeConfig.questionsCount);

    setTestQuestions(shuffled);
    setCurrentIdx(0);
    setAnswers({});
    const initialStatuses: Record<number, QuestionStatus> = {};
    shuffled.forEach((_, i) => {
      initialStatuses[i] = i === 0 ? 'not_answered' : 'not_visited';
    });
    setStatuses(initialStatuses);
    setTimeLeft(activeConfig.durationSeconds);
    setShowResult(false);
    setInTest(true);
  };

  // Timer effect
  useEffect(() => {
    if (inTest && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (inTest && timeLeft === 0) {
      handleSubmitTest();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inTest, timeLeft]);

  // Handle option selection
  const handleSelectOption = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  // Actions
  const handleSaveAndNext = () => {
    const isAnswered = answers[currentIdx] !== undefined;
    setStatuses(prev => ({
      ...prev,
      [currentIdx]: isAnswered ? 'answered' : 'not_answered'
    }));

    if (currentIdx < testQuestions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      if (statuses[nextIdx] === 'not_visited') {
        setStatuses(prev => ({ ...prev, [nextIdx]: 'not_answered' }));
      }
    }
  };

  const handleMarkForReviewAndNext = () => {
    const isAnswered = answers[currentIdx] !== undefined;
    setStatuses(prev => ({
      ...prev,
      [currentIdx]: isAnswered ? 'answered_marked' : 'marked_for_review'
    }));

    if (currentIdx < testQuestions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      if (statuses[nextIdx] === 'not_visited') {
        setStatuses(prev => ({ ...prev, [nextIdx]: 'not_answered' }));
      }
    }
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIdx];
      return copy;
    });
    setStatuses(prev => ({ ...prev, [currentIdx]: 'not_answered' }));
  };

  const handleSubmitTest = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const subjectBreakdown: Record<string, { correct: number; incorrect: number; unattempted: number; score: number }> = {};

    testQuestions.forEach((q, idx) => {
      const userAns = answers[idx];
      const sub = q.subject;
      if (!subjectBreakdown[sub]) {
        subjectBreakdown[sub] = { correct: 0, incorrect: 0, unattempted: 0, score: 0 };
      }

      if (userAns === undefined) {
        unattemptedCount++;
        subjectBreakdown[sub].unattempted++;
      } else if (userAns === q.answer) {
        correctCount++;
        subjectBreakdown[sub].correct++;
        subjectBreakdown[sub].score += activeConfig.marksPerQuestion;
      } else {
        incorrectCount++;
        subjectBreakdown[sub].incorrect++;
        subjectBreakdown[sub].score -= activeConfig.negativeMarking;
      }
    });

    const totalScore = Math.max(0, correctCount * activeConfig.marksPerQuestion - incorrectCount * activeConfig.negativeMarking);
    const maxScore = testQuestions.length * activeConfig.marksPerQuestion;
    const accuracy = (correctCount + incorrectCount > 0) ? (correctCount / (correctCount + incorrectCount)) * 100 : 0;
    const timeSpent = activeConfig.durationSeconds - timeLeft;

    const resultObj: UserMockResult = {
      id: `mock-${Date.now()}`,
      mockId: selectedMock,
      mockTitle: activeConfig.title[language],
      exam: activeConfig.exam,
      date: new Date().toLocaleDateString(),
      totalScore: Number(totalScore.toFixed(2)),
      maxScore,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracy: Number(accuracy.toFixed(1)),
      timeSpentSeconds: timeSpent,
      subjectBreakdown
    };

    saveMockResult(resultObj);
    setLastResult(resultObj);
    setInTest(false);
    setShowResult(true);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Color helper for CBT Question Palette
  const getPaletteColor = (status: QuestionStatus) => {
    switch (status) {
      case 'answered': return 'bg-emerald-500 text-white';
      case 'not_answered': return 'bg-red-500 text-white';
      case 'marked_for_review': return 'bg-purple-600 text-white';
      case 'answered_marked': return 'bg-purple-600 text-white ring-2 ring-emerald-400';
      default: return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: { en: 'Mock Tests', hi: 'मॉक टेस्ट' }, view: 'mock-tests' },
          { label: activeConfig.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Screen 1: Selection Dashboard */}
      {!inTest && !showResult && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
                <Timer className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'वास्तविक टीसीएस सीबीटी इंटरफेस' : 'Authentic TCS CBT Interface'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                {language === 'hi' ? 'एसएससी सीबीटी मॉक टेस्ट इंजन' : 'SSC CBT Mock Test Engine'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {language === 'hi'
                  ? 'कर्मचारी चयन आयोग के वास्तविक ऑनलाइन परीक्षा पैटर्न, आधिकारिक नकारात्मक अंकन, प्रश्न पैलेट एवं विस्तृत प्रदर्शन विश्लेषण।'
                  : 'Experience authentic SSC exam conditions with countdown timer, question status palette, negative marking, and post-exam analytics.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(mockConfigs).map(([key, mock]) => {
              const isSelected = selectedMock === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedMock(key)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 uppercase">
                      {mock.exam.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      ⏱ {mock.durationSeconds / 60} {language === 'hi' ? 'मिनट' : 'Mins'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {mock.title[language]}
                  </h3>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{mock.questionsCount} {language === 'hi' ? 'प्रश्न' : 'Questions'}</span>
                    <span className="text-red-500 font-medium">-{mock.negativeMarking} {language === 'hi' ? 'नेगेटिव' : 'Negative'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Test Instructions & Start Button */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>{language === 'hi' ? 'महत्वपूर्ण परीक्षा निर्देश' : 'Important Examination Instructions'}</span>
            </h2>

            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li>{language === 'hi' ? `परीक्षा की कुल समयावधि ${activeConfig.durationSeconds / 60} मिनट है। सर्वर घड़ी समय की गणना करेगी।` : `Total duration is ${activeConfig.durationSeconds / 60} minutes. The on-screen countdown timer will track time.`}</li>
              <li>{language === 'hi' ? `प्रत्येक सही उत्तर हेतु +${activeConfig.marksPerQuestion} अंक दिए जाएंगे एवं प्रत्येक गलत उत्तर पर -${activeConfig.negativeMarking} अंक काटे जाएंगे।` : `Each correct answer carries +${activeConfig.marksPerQuestion} marks and each incorrect answer deducts -${activeConfig.negativeMarking} marks.`}</li>
              <li>{language === 'hi' ? 'प्रश्न स्थिति पैलेट: हरा = उत्तर दिया गया, लाल = उत्तर नहीं दिया, बैंगनी = समीक्षा हेतु चिह्नित।' : 'Question Palette: Green = Answered, Red = Not Answered, Purple = Marked for Review.'}</li>
            </ul>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={handleStartTest}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-102"
              >
                <Timer className="w-4 h-4" />
                <span>{language === 'hi' ? 'मॉक टेस्ट प्रारंभ करें' : 'Start Mock Test Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Active Real CBT Interface */}
      {inTest && testQuestions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Question & Option View (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Bar with Timer */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {testQuestions[currentIdx]?.subject}
                </span>
                <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {language === 'hi' ? 'प्रश्न संख्या' : 'Question No.'} {currentIdx + 1}
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-mono font-bold text-sm sm:text-base">
                <Timer className="w-4 h-4 animate-spin-slow" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 min-h-[350px] flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium mb-3">
                  Marks: +{activeConfig.marksPerQuestion} | Negative: -{activeConfig.negativeMarking}
                </div>

                <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  {testQuestions[currentIdx]?.question[language]}
                </p>

                {/* Options */}
                <div className="mt-6 space-y-3">
                  {testQuestions[currentIdx]?.options.map((opt, optIdx) => {
                    const isSelected = answers[currentIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-sm leading-snug">{opt[language]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CBT Controls */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkForReviewAndNext}
                    className="px-3.5 py-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-200"
                  >
                    {language === 'hi' ? 'समीक्षा हेतु चिह्नित करें' : 'Mark for Review & Next'}
                  </button>
                  <button
                    onClick={handleClearResponse}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {language === 'hi' ? 'उत्तर हटाएं' : 'Clear Response'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAndNext}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                  >
                    {language === 'hi' ? 'सुरक्षित करें एवं अगला' : 'Save & Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar (1 col) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'hi' ? 'प्रश्न पैलेट' : 'Question Palette'}
            </h3>

            {/* Status Legends */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
                <span>{language === 'hi' ? 'उत्तर दिया' : 'Answered'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-red-500" />
                <span>{language === 'hi' ? 'उत्तर नहीं दिया' : 'Not Answered'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-purple-600" />
                <span>{language === 'hi' ? 'समीक्षा हेतु' : 'Marked'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-300 dark:bg-slate-700" />
                <span>{language === 'hi' ? 'देखा नहीं' : 'Not Visited'}</span>
              </div>
            </div>

            {/* Grid of Question buttons */}
            <div className="max-h-72 overflow-y-auto p-1 grid grid-cols-5 gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
              {testQuestions.map((_, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => {
                    if (statuses[qIdx] === 'not_visited') {
                      setStatuses(prev => ({ ...prev, [qIdx]: 'not_answered' }));
                    }
                    setCurrentIdx(qIdx);
                  }}
                  className={`h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${
                    currentIdx === qIdx ? 'ring-2 ring-blue-500 scale-105' : ''
                  } ${getPaletteColor(statuses[qIdx])}`}
                >
                  {qIdx + 1}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleSubmitTest}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                {language === 'hi' ? 'मॉक टेस्ट सबमिट करें' : 'Submit Mock Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Post-Exam Analytics Report */}
      {showResult && lastResult && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 uppercase">
                  Test Completed
                </span>
                <h2 className="text-xl sm:text-3xl font-black mt-2">
                  {lastResult.mockTitle}
                </h2>
                <p className="text-xs text-slate-300">
                  Date: {lastResult.date} • Time Spent: {Math.round(lastResult.timeSpentSeconds / 60)} mins
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black text-amber-400">
                  {lastResult.totalScore} <span className="text-lg text-slate-300">/ {lastResult.maxScore}</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                  Accuracy: {lastResult.accuracy}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Correct</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {lastResult.correctCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Incorrect</div>
              <div className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">
                {lastResult.incorrectCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Unattempted</div>
              <div className="text-2xl font-black text-slate-500 dark:text-slate-400 mt-1">
                {lastResult.unattemptedCount}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Accuracy</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {lastResult.accuracy}%
              </div>
            </div>
          </div>

          {/* Sectional Performance Breakdown */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>{language === 'hi' ? 'विषयवार प्रदर्शन विश्लेषण' : 'Subject-wise Performance Breakdown'}</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3 text-center">Correct</th>
                    <th className="py-2.5 px-3 text-center">Incorrect</th>
                    <th className="py-2.5 px-3 text-center">Skipped</th>
                    <th className="py-2.5 px-3 text-right">Net Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {Object.entries(lastResult.subjectBreakdown).map(([sub, data]) => (
                    <tr key={sub}>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">{sub}</td>
                      <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">{data.correct}</td>
                      <td className="py-2.5 px-3 text-center text-red-500 font-bold">{data.incorrect}</td>
                      <td className="py-2.5 px-3 text-center text-slate-400">{data.unattempted}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-600 dark:text-blue-400">
                        {data.score.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Back to Mocks CTA */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setShowResult(false);
                setInTest(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {language === 'hi' ? '← अन्य मॉक टेस्ट चुनें' : '← Take Another Mock Test'}
            </button>

            <button
              onClick={() => onNavigate('error-notebook')}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              {language === 'hi' ? 'गलती नोटबुक में गलतियां देखें' : 'Review Mistakes in Error Notebook'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
