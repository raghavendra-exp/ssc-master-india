import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Zap, 
  TrendingUp,
  BrainCircuit 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface SpeedLabViewProps {
  onNavigate: (view: string) => void;
}

export const SpeedLabView: React.FC<SpeedLabViewProps> = ({ onNavigate }) => {
  const { language } = useApp();

  const [mode, setMode] = useState<'tables' | 'squares' | 'cubes' | 'addition' | 'vocab'>('squares');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentProblem, setCurrentProblem] = useState<{ question: string; answer: number | string; options: (number | string)[] }>({
    question: '17²',
    answer: 289,
    options: [289, 279, 299, 319]
  });
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60-second speed drill

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateProblem = (type: typeof mode) => {
    if (type === 'squares') {
      const n = 11 + Math.floor(Math.random() * 40); // 11 to 50
      const ans = n * n;
      const options = [ans, ans + 10, ans - 10, ans + 20].sort(() => 0.5 - Math.random());
      return { question: `${n}² = ?`, answer: ans, options };
    } else if (type === 'cubes') {
      const n = 2 + Math.floor(Math.random() * 25); // 2 to 26
      const ans = n * n * n;
      const options = [ans, ans + 15, ans - 25, ans + 50].sort(() => 0.5 - Math.random());
      return { question: `${n}³ = ?`, answer: ans, options };
    } else if (type === 'tables') {
      const a = 12 + Math.floor(Math.random() * 18); // 12 to 29
      const b = 3 + Math.floor(Math.random() * 16);
      const ans = a * b;
      const options = [ans, ans + a, ans - a, ans + 12].sort(() => 0.5 - Math.random());
      return { question: `${a} × ${b} = ?`, answer: ans, options };
    } else if (type === 'addition') {
      const a = 25 + Math.floor(Math.random() * 75);
      const b = 15 + Math.floor(Math.random() * 85);
      const ans = a + b;
      const options = [ans, ans + 10, ans - 10, ans + 5].sort(() => 0.5 - Math.random());
      return { question: `${a} + ${b} = ?`, answer: ans, options };
    } else {
      // Vocab speed drill
      const vocabList = [
        { word: 'GARRULOUS', ans: 'Talkative', opts: ['Talkative', 'Silent', 'Cruel', 'Timid'] },
        { word: 'BENEVOLENT', ans: 'Kind', opts: ['Kind', 'Hostile', 'Greedy', 'Lazy'] },
        { word: 'EPHEMERAL', ans: 'Short-lived', opts: ['Short-lived', 'Permanent', 'Ancient', 'Deep'] },
        { word: 'CANDID', ans: 'Frank', opts: ['Frank', 'Deceitful', 'Arrogant', 'Dull'] },
        { word: 'LACONIC', ans: 'Concise', opts: ['Concise', 'Wordy', 'Loud', 'Fierce'] }
      ];
      const item = vocabList[Math.floor(Math.random() * vocabList.length)];
      return { question: `Synonym of ${item.word}:`, answer: item.ans, options: [...item.opts].sort(() => 0.5 - Math.random()) };
    }
  };

  const startDrill = () => {
    setIsRunning(true);
    setScore(0);
    setTotalAttempts(0);
    setTimeLeft(60);
    setCurrentProblem(generateProblem(mode));
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleOptionClick = (opt: number | string) => {
    if (!isRunning) return;

    setTotalAttempts(prev => prev + 1);
    if (opt === currentProblem.answer) {
      setScore(prev => prev + 1);
    }
    setCurrentProblem(generateProblem(mode));
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Speed Labs', hi: 'स्पीड लैब' }, view: 'dashboard' },
          { label: { en: 'Calculation Speed Lab', hi: 'कैलकुलेशन स्पीड टेस्ट' } }
        ]}
        onNavigate={onNavigate}
      />

      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>60-Second Rapid Fire Speed Drill</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी स्पीड टेस्ट लैब' : 'SSC Calculation Speed Lab'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'एसएससी परीक्षाओं में गणित एवं रीजनिंग में समय बचाने हेतु वर्ग (1-50), घन (1-30), पहाड़े और तीव्र मानसिक गणना अभ्यास।'
              : 'Drill mental arithmetic, tables up to 30, squares up to 50, and instant vocabulary recall against a 60-second timer.'}
          </p>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-700 backdrop-blur-xs self-start md:self-center">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Timer</span>
            <span className="text-2xl font-black text-red-400 font-mono">
              {timeLeft}s
            </span>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Score</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {score} / {totalAttempts}
            </span>
          </div>
        </div>
      </div>

      {/* Mode selection buttons */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-2">
        {[
          { id: 'squares', label: 'Squares (1-50)' },
          { id: 'cubes', label: 'Cubes (1-25)' },
          { id: 'tables', label: 'Multiplication Tables' },
          { id: 'addition', label: 'Fast Addition' },
          { id: 'vocab', label: 'Vocabulary Speed' }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id as any);
              setIsRunning(false);
              setCurrentProblem(generateProblem(m.id as any));
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === m.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Interactive Drill Arena */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-xl mx-auto space-y-6">
        {!isRunning ? (
          <div className="py-6 space-y-4">
            <BrainCircuit className="w-16 h-16 mx-auto text-blue-600 animate-pulse" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? '60 सेकंड का तीव्र अभ्यास' : 'Ready for 60-Second Challenge?'}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'hi'
                ? 'स्क्रीन पर लगातार प्रश्न आएंगे। सही विकल्प पर तुरंत क्लिक करें।'
                : 'Questions will appear in rapid sequence. Tap the correct option as fast as possible.'}
            </p>
            <button
              onClick={startDrill}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              Start Speed Drill
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-xs text-slate-400 uppercase font-semibold">
              Question #{totalAttempts + 1}
            </div>

            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono tracking-wider py-4">
              {currentProblem.question}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentProblem.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleOptionClick(opt)}
                  className="py-4 px-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white transition-all active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
