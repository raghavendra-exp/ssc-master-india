import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Check 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface FormulaBookViewProps {
  onNavigate: (view: string) => void;
}

export const FormulaBookView: React.FC<FormulaBookViewProps> = ({ onNavigate }) => {
  const { language, formulasData } = useApp();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = formulasData.filter(f => 
    !search.trim() ||
    f.topic.toLowerCase().includes(search.toLowerCase()) ||
    f.title.en.toLowerCase().includes(search.toLowerCase()) ||
    f.title.hi.includes(search) ||
    f.formula.toLowerCase().includes(search.toLowerCase())
  );

  const copyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Resources', hi: 'संसाधन' }, view: 'dashboard' },
          { label: { en: 'Quant Formula Master', hi: 'गणित सूत्र पुस्तिका' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'अंकगणित एवं अग्रिम गणित सूत्र' : 'Arithmetic & Advanced Math Formulas'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी गणित फार्मूला मास्टर' : 'SSC Quant Formula Master & Tricks'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'प्रतिशत, लाभ-हानि, चक्रवृद्धि ब्याज, बीजगणित, ज्यामिति एवं त्रिकोणमिति के परीक्षा में सबसे अधिक प्रयुक्त होने वाले प्रामाणिक सूत्र व ट्रिक्स।'
              : 'Essential high-frequency formulas, standard proofs, and verified shortcuts with solved numerical examples.'}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={language === 'hi' ? 'अध्याय या सूत्र खोजें (उदा. CI, Percentage, Algebra, Triangle)...' : 'Search formulas by topic, title, or equation...'}
          className="flex-1 bg-transparent border-0 text-xs sm:text-sm focus:outline-hidden text-slate-900 dark:text-slate-100 placeholder-slate-400"
        />
      </div>

      {/* Formulas List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(f => (
          <div
            key={f.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {f.topic}
                </span>
                <button
                  onClick={() => copyFormula(f.id, f.formula)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="Copy Formula"
                >
                  {copiedId === f.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {f.title[language]}
              </h3>

              {/* Highlighted formula box */}
              <div className="mt-3 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 font-mono text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200 text-center tracking-wide">
                {f.formula}
              </div>

              {/* Explanatory notes */}
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {f.notes[language]}
              </p>

              {/* Solved Example */}
              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {language === 'hi' ? 'उदाहरण हल:' : 'Solved Example:'}
                </span>
                <p>{f.example[language]}</p>
              </div>

              {/* Fast Trick if available */}
              {f.trick && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{language === 'hi' ? 'शॉर्टकट ट्रिक: ' : 'Fast Shortcut Trick: '}</span>
                    {f.trick[language]}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
