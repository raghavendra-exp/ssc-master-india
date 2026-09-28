import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  GraduationCap, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import type { ExamId } from '../types/index.ts';

interface EligibilityFinderViewProps {
  onNavigate: (view: string) => void;
}

export const EligibilityFinderView: React.FC<EligibilityFinderViewProps> = ({ onNavigate }) => {
  const { language, examConfigs, setActiveExam } = useApp();

  // Inputs
  const [age, setAge] = useState<number>(23);
  const [qualification, setQualification] = useState<string>('graduate');
  const [category, setCategory] = useState<string>('ur');
  const [hasDrivingLicense, setHasDrivingLicense] = useState<boolean>(false);
  const [hasShorthand, setHasShorthand] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(35);
  const [isESM, setIsESM] = useState<boolean>(false);

  // Category age relaxation
  const ageBonus = isESM ? 5 : (category === 'sc' || category === 'st' ? 5 : (category === 'obc' ? 3 : 0));
  const effectiveMaxAgeForComparison = (baseMax: number) => baseMax + ageBonus;

  // Evaluation logic grounded in official SSC Gazette rules
  const eligibleExams: { examId: ExamId; name: string; eligible: boolean; reasons: string[]; notes: string }[] = [
    {
      examId: 'cgl',
      name: 'SSC CGL (Combined Graduate Level)',
      eligible: (qualification === 'graduate' || qualification === 'postgraduate-hindi' || qualification === 'engineering-degree') && age <= effectiveMaxAgeForComparison(32) && age >= 18,
      reasons: [
        qualification === 'graduate' || qualification === 'engineering-degree' || qualification === 'postgraduate-hindi'
          ? 'Graduate qualification satisfied.'
          : 'Requires minimum Bachelor’s Degree in any discipline.',
        age <= effectiveMaxAgeForComparison(32) && age >= 18
          ? `Age ${age} falls within permissible range (18-32 years with ${ageBonus}y relaxation).`
          : `Age ${age} outside permissible limits.`
      ],
      notes: 'For JSO post: 60% in Math at 12th standard or Statistics at Degree level is required.'
    },
    {
      examId: 'chsl',
      name: 'SSC CHSL (10+2 Level)',
      eligible: (qualification === '12th' || qualification === 'graduate' || qualification === 'engineering-degree' || qualification === 'engineering-diploma' || qualification === 'postgraduate-hindi') && age <= effectiveMaxAgeForComparison(27) && age >= 18,
      reasons: [
        '10+2 (Higher Secondary) requirement satisfied.',
        age <= effectiveMaxAgeForComparison(27) && age >= 18
          ? `Age ${age} is within 18-27 years (+${ageBonus}y relaxation).`
          : `Age ${age} exceeds 27 years (+ relaxations).`
      ],
      notes: 'For DEO Grade A: 12th Standard in Science Stream with Mathematics is required.'
    },
    {
      examId: 'mts',
      name: 'SSC MTS & Havaldar',
      eligible: age <= effectiveMaxAgeForComparison(27) && age >= 18,
      reasons: [
        'Matriculation (10th Pass) requirement satisfied.',
        age <= effectiveMaxAgeForComparison(27) && age >= 18
          ? `Age ${age} within 18-25 / 18-27 years.`
          : `Age ${age} exceeds maximum limit.`
      ],
      notes: 'No negative marking in Session-I (Numerical & Reasoning). Havaldar post requires walking PET.'
    },
    {
      examId: 'gd',
      name: 'SSC GD Constable (CAPFs & Armed Forces)',
      eligible: age <= effectiveMaxAgeForComparison(23) && age >= 18,
      reasons: [
        '10th Matric requirement satisfied.',
        age <= effectiveMaxAgeForComparison(23) && age >= 18
          ? `Age ${age} is within 18-23 years (+${ageBonus}y relaxation).`
          : `Age ${age} exceeds 23 years.`
      ],
      notes: 'Mandatory Physical Efficiency Test: 5 km in 24 mins (Male) / 1.6 km in 8.5 mins (Female).'
    },
    {
      examId: 'cpo',
      name: 'SSC CPO (Sub-Inspector in Delhi Police & CAPFs)',
      eligible: (qualification === 'graduate' || qualification === 'engineering-degree' || qualification === 'postgraduate-hindi') && age <= effectiveMaxAgeForComparison(25) && age >= 20,
      reasons: [
        qualification === 'graduate' || qualification === 'engineering-degree' || qualification === 'postgraduate-hindi'
          ? 'Bachelor’s degree requirement met.'
          : 'Requires Bachelor’s Degree.',
        age <= effectiveMaxAgeForComparison(25) && age >= 20
          ? `Age ${age} is within 20-25 years (+${ageBonus}y relaxation).`
          : `Age ${age} outside 20-25 range.`,
        hasDrivingLicense ? 'Possesses LMV Driving License (Eligible for Delhi Police SI).' : 'Note: Delhi Police SI requires LMV Driving License for male candidates (CAPFs SI eligible).'
      ],
      notes: 'Rigorous 5-stage physical test and paper-II English test.'
    },
    {
      examId: 'je',
      name: 'SSC JE (Junior Engineer)',
      eligible: (qualification === 'engineering-degree' || qualification === 'engineering-diploma') && age <= effectiveMaxAgeForComparison(30) && age >= 18,
      reasons: [
        qualification === 'engineering-degree' || qualification === 'engineering-diploma'
          ? 'Engineering Degree/Diploma satisfied.'
          : 'Requires Degree or 3-year Diploma in Civil, Electrical or Mechanical Engineering.',
        age <= effectiveMaxAgeForComparison(30) && age >= 18
          ? `Age ${age} within 18-30 years.`
          : `Age ${age} outside limit.`
      ],
      notes: 'Diploma holders require 2 years experience for MES and BRO departments.'
    },
    {
      examId: 'stenographer',
      name: 'SSC Stenographer (Grade C & D)',
      eligible: (qualification !== '10th') && hasShorthand && age <= effectiveMaxAgeForComparison(30) && age >= 18,
      reasons: [
        hasShorthand ? 'Shorthand skill confirmed.' : 'Requires Shorthand knowledge (80 WPM for D, 100 WPM for C).',
        age <= effectiveMaxAgeForComparison(30) && age >= 18
          ? `Age within permissible limits (Grade C: up to 30, Grade D: up to 27).`
          : `Age outside limits.`
      ],
      notes: 'No Mathematics in the CBE exam. High weightage to English Language (100 marks).'
    },
    {
      examId: 'jht',
      name: 'SSC JHT (Junior Hindi Translator)',
      eligible: qualification === 'postgraduate-hindi' && age <= effectiveMaxAgeForComparison(30) && age >= 18,
      reasons: [
        qualification === 'postgraduate-hindi'
          ? 'Master’s Degree in Hindi/English requirement met.'
          : 'Requires Master’s Degree in Hindi with English or vice-versa + translation diploma.',
        age <= effectiveMaxAgeForComparison(30) && age >= 18 ? 'Age criteria met.' : 'Age outside limits.'
      ],
      notes: 'Paper-I is 200 marks bilingual objective; Paper-II is descriptive translation & essay.'
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Tools', hi: 'उपकरण' }, view: 'dashboard' },
          { label: { en: 'Exam Eligibility Finder', hi: 'पात्रता खोजक' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'आधिकारिक भर्ती नियमों पर आधारित' : 'Based on Official DoPT / SSC Rules'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          {language === 'hi' ? 'मैं कौन सा एसएससी फॉर्म भर सकता हूँ?' : 'Which SSC Exam Can I Apply For?'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          {language === 'hi'
            ? 'अपनी आयु, शैक्षणिक योग्यता, श्रेणी और कौशल दर्ज करें। सिस्टम आधिकारिक अधिसूचनाओं के आधार पर आपकी वास्तविक पात्रता की गणना करेगा।'
            : 'Enter your age, educational qualification, category, and skills. The tool computes your potential exam eligibility based on official notifications.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Inputs Card */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{language === 'hi' ? 'अपनी जानकारी दर्ज करें' : 'Enter Your Profile'}</span>
          </h2>

          {/* Age input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'आयु (वर्षों में):' : 'Current Age (in years):'} <strong className="text-blue-600 text-sm">{age}</strong>
            </label>
            <input
              type="range"
              min="17"
              max="38"
              value={age}
              onChange={e => setAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>17 yrs</span>
              <span>25 yrs</span>
              <span>32 yrs</span>
              <span>38 yrs</span>
            </div>
          </div>

          {/* Educational Qualification */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'उच्चतम शैक्षणिक योग्यता:' : 'Highest Qualification:'}
            </label>
            <select
              value={qualification}
              onChange={e => setQualification(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium"
            >
              <option value="10th">{language === 'hi' ? '10वीं (मैट्रिक पास)' : '10th Pass (Matriculation)'}</option>
              <option value="12th">{language === 'hi' ? '12वीं (उच्चतर माध्यमिक)' : '12th Pass (Higher Secondary)'}</option>
              <option value="graduate">{language === 'hi' ? 'स्नातक (Bachelor\'s Degree - Any Subject)' : 'Bachelor’s Degree (Graduate)'}</option>
              <option value="engineering-degree">{language === 'hi' ? 'इंजीनियरिंग डिग्री (B.E. / B.Tech)' : 'Engineering Degree (B.E. / B.Tech)'}</option>
              <option value="engineering-diploma">{language === 'hi' ? '3-वर्षीय इंजीनियरिंग डिप्लोमा (Polytechnic)' : '3-Year Polytechnic Engineering Diploma'}</option>
              <option value="postgraduate-hindi">{language === 'hi' ? 'परास्नातक (M.A. Hindi with English)' : 'Master’s Degree in Hindi with English'}</option>
            </select>
          </div>

          {/* Social Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'आरक्षण श्रेणी (आयु छूट हेतु):' : 'Social Category (Age Relaxation):'}
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium"
            >
              <option value="ur">UR / General (No Age Relaxation)</option>
              <option value="obc">OBC (+3 Years Relaxation)</option>
              <option value="sc">SC (+5 Years Relaxation)</option>
              <option value="st">ST (+5 Years Relaxation)</option>
              <option value="ews">EWS (Economically Weaker Section)</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasDrivingLicense}
                onChange={e => setHasDrivingLicense(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'वैध ड्राइविंग लाइसेंस (कार व बाइक - LMV)' : 'Valid Driving License for LMV (Motorcycle & Car)'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasShorthand}
                onChange={e => setHasShorthand(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'आशुलिपि (Shorthand) ज्ञान' : 'Knows Shorthand (Stenography)'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isESM}
                onChange={e => setIsESM(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'भूतपूर्व सैनिक (Ex-Servicemen)' : 'Ex-Servicemen (ESM)'}
              </span>
            </label>
          </div>
        </div>

        {/* Right Eligibility Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'hi' ? 'आपकी संभावित एसएससी पात्रता परिणाम' : 'Calculated Potential Eligibility'}
            </h2>
            <span className="text-xs text-slate-500">
              {eligibleExams.filter(e => e.eligible).length} {language === 'hi' ? 'परीक्षाएं पात्र' : 'Potentially Eligible'}
            </span>
          </div>

          <div className="space-y-3">
            {eligibleExams.map(ex => (
              <div
                key={ex.examId}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  ex.eligible
                    ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {ex.eligible ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {ex.name}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          ex.eligible
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {ex.eligible ? (language === 'hi' ? 'पात्र (Eligible)' : 'Eligible') : (language === 'hi' ? 'अपात्र' : 'Not Eligible')}
                        </span>
                      </div>

                      <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {ex.reasons.map((r, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      {ex.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic">
                          ℹ Note: {ex.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {ex.eligible && (
                    <button
                      onClick={() => {
                        setActiveExam(ex.examId);
                        onNavigate(`exam-${ex.examId}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 flex-shrink-0 transition-colors"
                    >
                      <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              {language === 'hi'
                ? 'महत्वपूर्ण सूचना: यह कैलकुलेटर सामान्य दिशानिर्देश प्रदान करता है। विशिष्ट पदों हेतु शारीरिक मानक, विषय अनिवार्यता या अनुभव संबंधी अतिरिक्त शर्तें आधिकारिक अधिसूचना में देखें।'
                : 'Legal Disclaimer: This tool provides general guidance based on baseline SSC standards. Always verify specific posts and categories in the official notification issued on ssc.gov.in.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
