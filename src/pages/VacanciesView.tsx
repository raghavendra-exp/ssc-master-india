import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface VacanciesViewProps {
  onNavigate: (view: string) => void;
}

export const VacanciesView: React.FC<VacanciesViewProps> = ({ onNavigate }) => {
  const { language, vacanciesData } = useApp();
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const filtered = vacanciesData.filter(v => selectedExam === 'all' || v.exam === selectedExam);
  const totalSum = filtered.reduce((acc, v) => acc + v.category.total, 0);

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Recruitment', hi: 'भर्ती' }, view: 'dashboard' },
          { label: { en: 'SSC Vacancy Tracker', hi: 'एसएससी रिक्तियां ट्रैकर' } }
        ]}
        onNavigate={onNavigate}
      />

      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Official SSC Vacancy Notifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी रिक्तियां ट्रैकर (Vacancy Tracker)' : 'SSC Vacancy Tracker'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'कर्मचारी चयन आयोग द्वारा विज्ञापित संभावित एवं अंतिम रिक्तियों का संवर्ग-वार एवं श्रेणी-वार आधिकारिक विवरण।'
              : 'Category-wise (UR, OBC, SC, ST, EWS, ESM) vacancy breakdown across ministries directly from official SSC notifications.'}
          </p>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-700 text-center self-start md:self-center">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Vacancies</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {totalSum.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Mandatory Notification: Clearly distinguish Tentative from Final (Section 52) */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{language === 'hi' ? 'संभावित बनाम अंतिम रिक्तियां नियम:' : 'Tentative vs Final Vacancy Rule:'} </span>
          {language === 'hi'
            ? 'प्रारंभिक अधिसूचना में दर्शाई गई रिक्तियां "संभावित (Tentative)" होती हैं। उपयोगकर्ता विभागों द्वारा मांग (Requisition) में संशोधन के आधार पर अंतिम परिणाम से पूर्व रिक्तियों में परिवर्तन संभव है।'
            : 'As explicitly stipulated by SSC, vacancies notified at the time of initial advertisement are tentative and subject to change until the declaration of final nominations by user departments.'}
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
        <select
          value={selectedExam}
          onChange={e => setSelectedExam(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी एसएससी परीक्षाएं' : 'All SSC Exams'}</option>
          <option value="cgl">SSC CGL</option>
          <option value="chsl">SSC CHSL</option>
          <option value="mts">SSC MTS & Havaldar</option>
          <option value="gd">SSC GD Constable</option>
          <option value="cpo">SSC CPO</option>
          <option value="je">SSC JE</option>
          <option value="stenographer">SSC Stenographer</option>
        </select>
      </div>

      {/* Vacancies Cards */}
      <div className="space-y-4">
        {filtered.map(vac => (
          <div
            key={vac.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 uppercase">
                    {vac.exam.toUpperCase()} • Year {vac.year}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    vac.isTentative ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {vac.isTentative ? (language === 'hi' ? 'संभावित (Tentative)' : 'Tentative Vacancy') : 'Final Vacancy'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {vac.post}
                </h3>
                <p className="text-xs text-slate-500">{vac.department}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {vac.category.total.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">{language === 'hi' ? 'कुल रिक्तियां' : 'Total Seats'}</span>
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">UR</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{vac.category.ur.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">OBC</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{vac.category.obc.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">EWS</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{vac.category.ews.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">SC</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{vac.category.sc.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">ST</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{vac.category.st.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-center">
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block">ESM (Ex-Serv.)</span>
                <span className="font-bold text-blue-900 dark:text-blue-200 text-sm">{vac.category.esm?.toLocaleString() || '-'}</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <span>{vac.source}</span>
              <a
                href={vac.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Official Notice</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
