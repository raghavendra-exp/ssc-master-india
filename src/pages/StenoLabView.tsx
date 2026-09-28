import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  AlertCircle,
  FileText 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface StenoLabViewProps {
  onNavigate: (view: string) => void;
}

export const StenoLabView: React.FC<StenoLabViewProps> = ({ onNavigate }) => {
  const { language, stenoData } = useApp();

  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(stenoData[0]?.id || 'steno-01');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [transcriptionInput, setTranscriptionInput] = useState<string>('');
  const [showOriginal, setShowOriginal] = useState<boolean>(false);

  const activeExercise = stenoData.find(e => e.id === selectedExerciseId) || stenoData[0];
  const words = activeExercise.dictationText.split(' ');
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Speed calculation: word interval in ms
  // targetSpeed is 80 or 100 WPM
  const msPerWord = Math.round((60 / activeExercise.targetSpeed) * 1000);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
    setTranscriptionInput('');
    setShowOriginal(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [selectedExerciseId]);

  useEffect(() => {
    if (isPlaying && currentWordIndex < words.length) {
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, msPerWord);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentWordIndex, msPerWord, words.length]);

  // Speech synthesis for authentic audio dictation!
  const playSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeExercise.dictationText);
      utterance.rate = activeExercise.targetSpeed === 100 ? 1.15 : 0.95;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
    setIsPlaying(true);
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setIsPlaying(false);
  };

  const resetSteno = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentWordIndex(0);
    setTranscriptionInput('');
    setShowOriginal(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Skill Labs', hi: 'कौशल कार्यशाला' }, view: 'dashboard' },
          { label: { en: 'Stenography Dictation Lab', hi: 'स्टेनोग्राफी डिक्टेशन लैब' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-pink-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>Grade C (100 WPM) & Grade D (80 WPM) Standards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी स्टेनोग्राफी डिक्टेशन एवं ट्रांसक्रिप्शन लैब' : 'SSC Stenography Dictation Lab'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'आधिकारिक परीक्षा गति (80/100 शब्द प्रति मिनट) पर संसदीय भाषणों का ऑडियो डिक्टेशन एवं कंप्यूटर पर ट्रांसक्रिप्शन अभ्यास।'
              : 'Official audio dictation simulation at standard SSC speeds with a transcription editor to compute error percentage.'}
          </p>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-700 text-center self-start md:self-center">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Target Speed</span>
          <span className="text-2xl sm:text-3xl font-black text-pink-400 font-mono">
            {activeExercise.targetSpeed} <span className="text-xs text-slate-400">WPM</span>
          </span>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {stenoData.map(ex => (
            <button
              key={ex.id}
              onClick={() => setSelectedExerciseId(ex.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedExerciseId === ex.id
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {ex.grade}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={playSpeech}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{language === 'hi' ? 'डिक्टेशन सुनें' : 'Play Dictation Audio'}</span>
            </button>
          ) : (
            <button
              onClick={pauseSpeech}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={resetSteno}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dictation Teleprompter & Transcription Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teleprompter Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-pink-600" />
              <span>{activeExercise.title}</span>
            </h3>

            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showOriginal ? (language === 'hi' ? 'मूल पाठ छिपाएं' : 'Hide Script') : (language === 'hi' ? 'मूल पाठ देखें' : 'View Script')}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-64 overflow-y-auto text-sm leading-relaxed font-serif">
            {showOriginal ? (
              <p className="text-slate-800 dark:text-slate-200">
                {activeExercise.dictationText}
              </p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Mic className={`w-12 h-12 mb-2 ${isPlaying ? 'text-pink-500 animate-bounce' : 'text-slate-400'}`} />
                <p className="text-xs font-semibold text-slate-500">
                  {isPlaying 
                    ? (language === 'hi' ? 'डिक्टेशन चालू है... आशुलिपि में अपनी नोटबुक में लिखें।' : 'Dictation in progress... write shorthand in your steno notebook.')
                    : (language === 'hi' ? 'डिक्टेशन सुनने हेतु "Play" दबाएं।' : 'Click Play Dictation Audio to start transcription pace.')}
                </p>
                <div className="mt-2 text-xs font-mono text-slate-400">
                  {currentWordIndex} / {words.length} words
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transcription Editor */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{language === 'hi' ? 'कंप्यूटर ट्रांसक्रिप्शन संपादक' : 'Computer Transcription Editor'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Words typed: {transcriptionInput.trim().split(/\s+/).filter(Boolean).length}
            </span>
          </div>

          <textarea
            rows={8}
            value={transcriptionInput}
            onChange={e => setTranscriptionInput(e.target.value)}
            placeholder={language === 'hi' ? 'अपनी आशुलिपि नोटबुक से यहाँ टाइप करके ट्रांसक्राइब करें...' : 'Type your English / Hindi transcription here from your shorthand notes...'}
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs sm:text-sm leading-relaxed focus:border-pink-500 focus:outline-hidden"
          />

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 flex items-center justify-between">
            <span>Official Tolerance: Grade C &lt; 5% errors; Grade D &lt; 7% errors</span>
            <button
              onClick={() => setShowOriginal(true)}
              className="font-bold text-pink-600 dark:text-pink-400 hover:underline"
            >
              Verify Transcription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
