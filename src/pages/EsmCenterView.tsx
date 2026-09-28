import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle,
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface EsmCenterViewProps {
  onNavigate: (view: string) => void;
}

export const EsmCenterView: React.FC<EsmCenterViewProps> = ({ onNavigate }) => {
  const { language } = useApp();

  const esmProvisions = [
    {
      exam: 'SSC CGL',
      posts: 'Group "C" Posts (Auditor, Accountant, Tax Assistant, UDC/SSA)',
      reservation: 'Horizontal reservation for ESM in Group C posts as per DoPT orders.',
      ageRelaxation: '3 years after deduction of the military service rendered from the actual age as on the closing date.',
      feeExemption: '100% Fee Exemption (No application fee for Ex-Servicemen).',
      physicalExemption: 'ESM candidates are exempt from PET in posts where PET is purely qualifying, though minimum medical standards apply.',
      certificateReq: 'Discharge Certificate / NOC within stipulated timeline before document verification.'
    },
    {
      exam: 'SSC CHSL',
      posts: 'Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA)',
      reservation: '10% horizontal reservation in Group C ministerial posts.',
      ageRelaxation: '3 years after deduction of military service from actual age.',
      feeExemption: 'Complete exemption from application fee.',
      physicalExemption: 'Typing test is mandatory; exemption allowed only for physically disabled ESM as per DoPT guidelines.',
      certificateReq: 'Service book copy, pension payment order (PPO), or certificate of serving personnel.'
    },
    {
      exam: 'SSC GD Constable',
      posts: 'Constable (GD) in BSF, CISF, CRPF, SSB, ITBP, Assam Rifles, SSF',
      reservation: '10% of total vacancies reserved horizontally for Ex-Servicemen.',
      ageRelaxation: '3 years after deduction of military service.',
      feeExemption: 'Fee fully exempted.',
      physicalExemption: 'EXEMPTED from Physical Efficiency Test (PET). ESM candidates are required to appear directly for PST for recording height/chest.',
      certificateReq: 'Army/Navy/Air Force Discharge book and medical category grading.'
    },
    {
      exam: 'SSC CPO (Sub-Inspector)',
      posts: 'Sub-Inspector in Delhi Police & CAPFs',
      reservation: 'Special quota for ESM in Delhi Police (including Commando category) and CAPFs as notified.',
      ageRelaxation: '3 years after deduction of military service.',
      feeExemption: 'Exempted from fee payment.',
      physicalExemption: 'Must meet baseline medical fitness standards; PET standards applicable as specified in MHA guidelines.',
      certificateReq: 'Defence personnel serving certificate or release order.'
    },
    {
      exam: 'SSC MTS & Havaldar',
      posts: 'Multi-Tasking Staff across Ministries',
      reservation: 'State-wise horizontal reservation in MTS cadre.',
      ageRelaxation: '3 years after military service deduction.',
      feeExemption: 'Complete application fee waiver.',
      physicalExemption: 'Walking PET for Havaldar posts must be completed.',
      certificateReq: 'Discharge certificate from Armed Forces.'
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Recruitment', hi: 'भर्ती' }, view: 'dashboard' },
          { label: { en: 'Ex-Servicemen (ESM) Center', hi: 'भूतपूर्व सैनिक सूचना केंद्र' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-900/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Official Ex-Servicemen Welfare & DoPT Provisions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी भूतपूर्व सैनिक (ESM) सूचना केंद्र' : 'SSC Ex-Servicemen (ESM) Information Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'सेना, नौसेना एवं वायुसेना के भूतपूर्व सैनिकों हेतु परीक्षा-वार आरक्षण, आयु छूट, शुल्क छूट एवं पीईटी नियमों का आधिकारिक संकलन।'
              : 'Official recruitment provisions, age relaxations, fee waivers, and physical test exemptions for Ex-Servicemen across SSC exams.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-bold border border-slate-700 text-amber-400">
            DoPT OM Grounded
          </span>
        </div>
      </div>

      {/* Crucial Advisory from Prompt Section 71 */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{language === 'hi' ? 'महत्वपूर्ण आधिकारिक नियम:' : 'Crucial Legal Rule:'} </span>
          {language === 'hi'
            ? 'कभी भी यह न मानें कि ईएसएम लाभ प्रत्येक एसएससी परीक्षा या पद पर समान रूप से लागू होता है। ग्रुप "ए" एवं अधिकांश ग्रुप "बी" राजपत्रित पदों में ईएसएम आरक्षण लागू नहीं होता; केवल ग्रुप "सी" पदों में क्षैतिज आरक्षण देय होता है। कृपया संबंधित अधिसूचना में पद-विशिष्ट शर्तें अवश्य देखें।'
            : 'Never assume ESM benefit applies uniformly to every SSC examination/post. Reservation is largely applicable to Group C posts under DoPT guidelines. Age relaxation is permissible for Group B & C posts. Verify specific posts in the official gazette.'}
        </div>
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {esmProvisions.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 uppercase">
                  {item.exam}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {item.posts}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {language === 'hi' ? 'आरक्षण प्रावधान (Reservation):' : 'Reservation Quota:'}
                </span>
                <p className="text-slate-600 dark:text-slate-300">{item.reservation}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {language === 'hi' ? 'आयु सीमा में छूट (Age Relaxation):' : 'Age Relaxation Formula:'}
                </span>
                <p className="text-slate-600 dark:text-slate-300">{item.ageRelaxation}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {language === 'hi' ? 'शारीरिक दक्षता परीक्षण छूट (PET Exemption):' : 'PET Exemption Rule:'}
                </span>
                <p className="text-slate-600 dark:text-slate-300">{item.physicalExemption}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {language === 'hi' ? 'प्रमाणपत्र अनिवार्यता (Documentation):' : 'Certificate Requirement:'}
                </span>
                <p className="text-slate-600 dark:text-slate-300">{item.certificateReq}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
