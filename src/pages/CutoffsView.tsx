import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  AlertCircle, 
  ShieldCheck, 
  FileText,
  Filter 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface CutoffsViewProps {
  onNavigate: (view: string) => void;
}

export const CutoffsView: React.FC<CutoffsViewProps> = ({ onNavigate }) => {
  const { language, cutoffsData } = useApp();

  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCutoffs = cutoffsData.filter(c => {
    if (selectedExam !== 'all' && c.exam !== selectedExam) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Analytics', hi: 'विश्लेषण' }, view: 'dashboard' },
          { label: { en: 'Historical Cutoff Database', hi: 'ऐतिहासिक कटऑफ डेटा' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-yellow-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-yellow-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Official SSC Result Gazette Statistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी ऐतिहासिक कटऑफ डेटाबेस' : 'SSC Historical Cutoff Database'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'विभिन्न वर्षों में कर्मचारी चयन आयोग द्वारा जारी आधिकारिक रिजल्ट राइटअप के अनुसार श्रेणीवार एवं टियर-वार कटऑफ अंक।'
              : 'Category-wise, tier-wise, and post-wise normalized cutoff scores extracted directly from official SSC result notices.'}
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer as requested in Section 53 */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{language === 'hi' ? 'ऐतिहासिक विश्लेषण सूचना:' : 'HISTORICAL ANALYSIS NOTICE:'} </span>
          {language === 'hi'
            ? 'यह डेटा केवल विगत वर्षों के परीक्षा स्तर एवं प्रतिस्पर्धा को समझने हेतु है। कभी भी यह दावा न करें कि ऐतिहासिक कटऑफ भविष्य की कटऑफ का सटीक अनुमान लगाती है। आगामी कटऑफ परीक्षा के कठिनाई स्तर, पालियों की संख्या एवं रिक्तियों पर निर्भर करती है।'
            : 'This compilation reflects past official result writeups for competitive context only. Historical cutoffs never predict future cutoffs, which strictly depend on vacancy volume, paper difficulty, and normalization factors.'}
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-3">
        <select
          value={selectedExam}
          onChange={e => setSelectedExam(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी एसएससी परीक्षाएं' : 'All SSC Exams'}</option>
          <option value="cgl">SSC CGL</option>
          <option value="chsl">SSC CHSL</option>
          <option value="mts">SSC MTS</option>
          <option value="cpo">SSC CPO</option>
        </select>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी श्रेणियां (All Categories)' : 'All Categories'}</option>
          <option value="UR">UR (Unreserved)</option>
          <option value="OBC">OBC</option>
          <option value="EWS">EWS</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="ESM">ESM (Ex-Servicemen)</option>
        </select>
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="py-3 px-3">Exam</th>
              <th className="py-3 px-3">Year / Stage</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Post Group</th>
              <th className="py-3 px-3 text-right">Cutoff Score</th>
              <th className="py-3 px-3 text-right">Qualified</th>
              <th className="py-3 px-3">Official Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredCutoffs.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400 uppercase">{item.exam}</td>
                <td className="py-3 px-3 font-medium text-slate-900 dark:text-slate-100">{item.year} • {item.tier}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{item.post || 'All Posts'}</td>
                <td className="py-3 px-3 text-right font-mono font-black text-amber-600 dark:text-amber-400 text-sm sm:text-base">
                  {item.cutoff}
                </td>
                <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                  {item.candidatesQualified ? item.candidatesQualified.toLocaleString() : '-'}
                </td>
                <td className="py-3 px-3 text-slate-400 text-xs">{item.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
