import React, { useState } from 'react';
import { 
  BrainCircuit, 
  RotateCcw, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers,
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface FlashcardsViewProps {
  onNavigate: (view: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onNavigate }) => {
  const { language, flashcardsData } = useApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownIds, setKnownIds] = useState<string[]>([]);

  const activeCard = flashcardsData[currentIndex] || flashcardsData[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % flashcardsData.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + flashcardsData.length) % flashcardsData.length);
  };

  const markKnown = () => {
    if (!knownIds.includes(activeCard.id)) {
      setKnownIds(prev => [...prev, activeCard.id]);
    }
    handleNext();
  };

  const markUnknown = () => {
    setKnownIds(prev => prev.filter(id => id !== activeCard.id));
    handleNext();
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Resources', hi: 'संसाधन' }, view: 'dashboard' },
          { label: { en: 'Bilingual Flashcards', hi: 'द्विभाषी फ्लैशकार्ड्स' } }
        ]}
        onNavigate={onNavigate}
      />

      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'स्पेसड रिपीटिशन तकनीक' : 'Spaced Repetition Active Recall'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी फ्लैशकार्ड्स लैब' : 'SSC Flashcards Engine'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'राजव्यवस्था के अनुच्छेद, इतिहास के युद्ध, राष्ट्रीय उद्यान, विज्ञान तथ्य एवं शब्दावली को त्वरित याद रखने हेतु इंटरैक्टिव कार्ड्स।'
              : 'Master high-yield facts, polity articles, historical battles, static GK, and vocabulary using memory flipcards.'}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-700 backdrop-blur-xs self-start md:self-center">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Card</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {currentIndex + 1} / {flashcardsData.length}
            </span>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Mastered</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {knownIds.length}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Flip Flashcard */}
      <div className="max-w-xl mx-auto space-y-6">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative min-h-[300px] sm:min-h-[340px] rounded-3xl p-8 cursor-pointer select-none border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between transition-all hover:scale-101 text-center"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                {activeCard.category}
              </span>
              <span className="text-xs text-slate-400">
                {isFlipped ? (language === 'hi' ? 'उत्तर (Back)' : 'Answer (Back)') : (language === 'hi' ? 'प्रश्न (Front)' : 'Prompt (Front)')}
              </span>
            </div>

            <div className="py-6 flex items-center justify-center min-h-[140px]">
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                {isFlipped ? activeCard.back[language] : activeCard.front[language]}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>{activeCard.subtext}</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {language === 'hi' ? 'पलटने हेतु क्लिक करें ↻' : 'Click to flip card ↻'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={markUnknown}
              className="px-5 py-2.5 rounded-2xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>{language === 'hi' ? 'पुनः अभ्यास (Review Again)' : 'Need Review'}</span>
            </button>

            <button
              onClick={markKnown}
              className="px-5 py-2.5 rounded-2xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'hi' ? 'याद हो गया (Known)' : 'Mastered'}</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
