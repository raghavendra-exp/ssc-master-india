import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  RotateCcw, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Award,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface TypingLabViewProps {
  onNavigate: (view: string) => void;
}

export const TypingLabView: React.FC<TypingLabViewProps> = ({ onNavigate }) => {
  const { language, typingData } = useApp();

  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(typingData[0]?.id || 'typing-en-01');
  const [typedText, setTypedText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 mins
  const [allowBackspace, setAllowBackspace] = useState<boolean>(true);

  const activeExercise = typingData.find(e => e.id === selectedExerciseId) || typingData[0];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset exercise
  const resetTest = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedText('');
    setHasStarted(false);
    setIsCompleted(false);
    setTimeLeft(activeExercise.timeSeconds || 600);
  };

  useEffect(() => {
    resetTest();
  }, [selectedExerciseId]);

  // Timer loop
  useEffect(() => {
    if (hasStarted && !isCompleted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && hasStarted && !isCompleted) {
      setIsCompleted(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasStarted, isCompleted, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setTypedText(e.target.value);

    // If candidate reached end of text
    if (e.target.value.length >= activeExercise.text.length) {
      setIsCompleted(true);
    }
  };

  // Metrics calculation
  const totalCharacters = typedText.length;
  const timeElapsed = (activeExercise.timeSeconds || 600) - timeLeft;
  const minutes = Math.max(timeElapsed / 60, 0.05);

  // Count errors
  let errors = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== activeExercise.text[i]) {
      errors++;
    }
  }

  const grossWPM = Math.round((totalCharacters / 5) / minutes);
  const netWPM = Math.max(0, Math.round(((totalCharacters / 5) - errors) / minutes));
  const accuracy = totalCharacters > 0 ? Math.max(0, Math.round(((totalCharacters - errors) / totalCharacters) * 100)) : 100;
  const keyDepressionsPerHour = Math.round((totalCharacters / minutes) * 60);

  const isQualified = netWPM >= activeExercise.targetWPM && accuracy >= 95;

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Skill Labs', hi: 'कौशल कार्यशाला' }, view: 'dashboard' },
          { label: { en: 'Typing & DEST Speed Lab', hi: 'टाइपिंग एवं DEST लैब' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2">
            <Keyboard className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सीएचएसएल एवं सीजीएल आधिकारिक मानक' : 'CHSL Typing & CGL DEST Standards'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी टाइपिंग एवं DEST लैब' : 'SSC Typing & DEST Speed Lab'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'अंग्रेजी (35 WPM / 10500 KDPH) एवं हिंदी (30 WPM / 9000 KDPH) टाइपिंग गति, वास्तविक की-डिप्रेशन एवं त्रुटि गणना।'
              : 'Practice official examination passages in English & Hindi with real-time Gross WPM, Net WPM, accuracy, and KDPH tracking.'}
          </p>
        </div>

        {/* Real-time Score Badge */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-700 backdrop-blur-xs self-start md:self-center">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Net Speed</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {netWPM} <span className="text-xs text-slate-400">WPM</span>
            </span>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Accuracy</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {typingData.map(ex => (
            <button
              key={ex.id}
              onClick={() => setSelectedExerciseId(ex.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedExerciseId === ex.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {ex.language === 'en' ? 'English (35 WPM)' : 'हिंदी (30 WPM)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={allowBackspace}
              onChange={e => setAllowBackspace(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {language === 'hi' ? 'बैकस्पेस की अनुमति' : 'Allow Backspace'}
            </span>
          </label>

          <button
            onClick={resetTest}
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'रीसेट करें' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Target Passage Display Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>{activeExercise.title}</span>
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Timer className="w-4 h-4 text-red-500" />
            <span className="font-bold text-red-600">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Source Text with inline character matching */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed max-h-48 overflow-y-auto select-none font-mono">
          {activeExercise.text.split('').map((char, index) => {
            let color = "text-slate-600 dark:text-slate-400";
            if (index < typedText.length) {
              color = typedText[index] === char ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-red-500 bg-red-100 dark:bg-red-950 font-bold";
            } else if (index === typedText.length) {
              color = "bg-blue-300 dark:bg-blue-700 text-slate-900 dark:text-white";
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Interactive Typing Input */}
        <div>
          <textarea
            ref={inputRef}
            rows={5}
            value={typedText}
            onChange={handleInputChange}
            disabled={isCompleted}
            onKeyDown={e => {
              if (!allowBackspace && e.key === 'Backspace') {
                e.preventDefault();
              }
            }}
            placeholder={language === 'hi' ? 'यहाँ टाइप करना शुरू करें... टाइमर अपने आप चालू हो जाएगा।' : 'Start typing here... the timer starts automatically upon your first keypress.'}
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm leading-relaxed focus:border-blue-500 focus:outline-hidden transition-all shadow-inner"
          />
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Gross Speed</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{grossWPM} WPM</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Errors</span>
            <div className="text-xl font-black text-red-500 mt-0.5">{errors}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Key Depressions</span>
            <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{totalCharacters}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">KDPH Equiv.</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{keyDepressionsPerHour}</div>
          </div>
        </div>

        {/* Result Notification */}
        {isCompleted && (
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
            isQualified 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
              : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {isQualified ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
              <span className="font-bold text-sm">
                {isQualified
                  ? (language === 'hi' ? 'बधाई! आपने एसएससी परीक्षा मानक गति सफलतापूर्वक उत्तीर्ण कर ली है।' : 'Congratulations! You met the official qualifying speed and accuracy standard.')
                  : (language === 'hi' ? 'परीक्षा मानक गति अभी प्राप्त नहीं हुई। नियमित अभ्यास जारी रखें।' : 'Test finished. Speed or accuracy below official SSC qualification criteria. Keep practicing!')}
              </span>
            </div>
            <button
              onClick={resetTest}
              className="px-4 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs shadow-xs"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
