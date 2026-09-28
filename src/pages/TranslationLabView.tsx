import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRightLeft, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  FileCheck2 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface TranslationLabViewProps {
  onNavigate: (view: string) => void;
}

export const TranslationLabView: React.FC<TranslationLabViewProps> = ({ onNavigate }) => {
  const { language, translationData } = useApp();

  const [selectedExId, setSelectedExId] = useState<string>(translationData[0]?.id || 'trans-01');
  const [userTranslation, setUserTranslation] = useState<string>('');
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  const activeEx = translationData.find(t => t.id === selectedExId) || translationData[0];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Skill Labs', hi: 'कौशल कार्यशाला' }, view: 'dashboard' },
          { label: { en: 'JHT Translation Lab', hi: 'अनुवाद कार्यशाला' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
            <Languages className="w-3.5 h-3.5" />
            <span>SSC JHT / SHT Paper-II Descriptive Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी अनुवाद कार्यशाला (Translation Lab)' : 'SSC JHT Translation Lab'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'अंग्रेजी से हिंदी एवं हिंदी से अंग्रेजी आधिकारिक प्रशासनिक, वित्तीय व विधिक गद्यांशों का अनुवाद, मॉडल उत्तर व शब्दावली।'
              : 'Practice official administrative passages with model translations, terminology glossary, and grammar error analysis.'}
          </p>
        </div>
      </div>

      {/* Selector */}
      <div className="flex items-center gap-2">
        {translationData.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedExId(t.id);
              setUserTranslation('');
              setShowModelAnswer(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedExId === t.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {t.direction === 'en_to_hi' ? 'English → Hindi' : 'Hindi → English'} • {t.title}
          </button>
        ))}
      </div>

      {/* Exercise Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Text Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              {activeEx.direction === 'en_to_hi' ? 'Original English Passage' : 'मूल हिंदी गद्यांश'}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
              Paper-II Standard
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-serif">
            {activeEx.sourceText}
          </div>

          {/* Key Terminology Glossary */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {language === 'hi' ? 'महत्वपूर्ण प्रशासनिक पारिभाषिक शब्दावली' : 'Key Administrative Terminology'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {activeEx.keyTerminology.map((term, tIdx) => (
                <div key={tIdx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">{term.term}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{term.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Translation workspace */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              {activeEx.direction === 'en_to_hi' ? 'आपका हिंदी अनुवाद' : 'Your English Translation'}
            </span>
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {showModelAnswer ? (language === 'hi' ? 'मॉडल उत्तर छिपाएं' : 'Hide Model Answer') : (language === 'hi' ? 'आधिकारिक मॉडल उत्तर देखें' : 'View Model Translation')}
            </button>
          </div>

          <textarea
            rows={6}
            value={userTranslation}
            onChange={e => setUserTranslation(e.target.value)}
            placeholder={language === 'hi' ? 'यहाँ अपना अनुवाद लिखें...' : 'Type your translation here...'}
            className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-serif text-sm leading-relaxed focus:border-emerald-500 focus:outline-hidden"
          />

          {showModelAnswer && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2 animate-fade-in text-xs sm:text-sm">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" />
                <span>{language === 'hi' ? 'आदर्श मॉडल अनुवाद:' : 'Ideal Model Translation:'}</span>
              </span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                {activeEx.modelTranslation}
              </p>
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-emerald-200 dark:border-emerald-900">
                <strong>Grammar Insight:</strong> {activeEx.grammarNotes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
