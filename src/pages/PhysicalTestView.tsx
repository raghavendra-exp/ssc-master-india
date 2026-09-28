import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ShieldCheck, 
  Award, 
  Timer, 
  Ruler, 
  Flame 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import type { ExamId } from '../types/index.ts';

interface PhysicalTestViewProps {
  onNavigate: (view: string) => void;
}

export const PhysicalTestView: React.FC<PhysicalTestViewProps> = ({ onNavigate }) => {
  const { language, physicalStandardsData } = useApp();

  const [selectedExam, setSelectedExam] = useState<ExamId>('gd');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(172);
  const [chestCm, setChestCm] = useState<number>(82);
  const [chestExpCm, setChestExpCm] = useState<number>(6);
  const [runningMinutes, setRunningMinutes] = useState<number>(22);
  const [runningSeconds, setRunningSeconds] = useState<number>(30);
  const [isSTorHillArea, setIsSTorHillArea] = useState<boolean>(false);

  // Standards computation
  let minHeight = gender === 'male' ? 170 : 157;
  let minChest = 80;
  let minExpansion = 5;

  if (selectedExam === 'mts') {
    minHeight = gender === 'male' ? 157.5 : 152;
    minChest = 81;
  }

  // Relaxation for ST and Gorkhas/Hill
  if (isSTorHillArea) {
    if (selectedExam === 'gd' || selectedExam === 'cpo') {
      minHeight = gender === 'male' ? 162.5 : 150;
      minChest = 76;
    }
  }

  const heightPass = heightCm >= minHeight;
  const chestPass = gender === 'female' || (chestCm >= minChest && chestExpCm >= minExpansion);

  // Running test assessment
  let runningPass = false;
  const totalRunningSecs = runningMinutes * 60 + runningSeconds;

  if (selectedExam === 'gd') {
    runningPass = gender === 'male' ? totalRunningSecs <= 24 * 60 : totalRunningSecs <= 8.5 * 60;
  } else if (selectedExam === 'cpo') {
    runningPass = gender === 'male' ? totalRunningSecs <= 6.5 * 60 : totalRunningSecs <= 4 * 60;
  } else if (selectedExam === 'mts') {
    // Walking Havaldar
    runningPass = gender === 'male' ? totalRunningSecs <= 15 * 60 : totalRunningSecs <= 20 * 60;
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Physical Prep', hi: 'शारीरिक तैयारी' }, view: 'dashboard' },
          { label: { en: 'PET & PST Fitness Lab', hi: 'शारीरिक दक्षता एवं मानक केंद्र' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-red-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जीडी • सीपीओ • हवलदार आधिकारिक शारीरिक मानक' : 'GD • CPO SI • Havaldar Official Physical Standards'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी शारीरिक दक्षता (PET) एवं मानक (PST) केंद्र' : 'SSC Physical Fitness (PET & PST) Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'दौड़, ऊंचाई, सीना फुलाव एवं शारीरिक मानकों का आधिकारिक नियमों के अनुसार मूल्यांकन। (चिकित्सीय सलाह रहित, केवल भर्ती मानक)'
              : 'Evaluate your running timing, height, and chest metrics strictly according to official recruitment gazette rules.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-xs font-bold border border-slate-700 text-amber-400">
            {language === 'hi' ? 'केवल आधिकारिक भर्ती नियम' : 'Official Gazette Grounded'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Inputs Card */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Ruler className="w-5 h-5 text-red-600" />
            <span>{language === 'hi' ? 'अपने शारीरिक माप दर्ज करें' : 'Enter Your Physical Metrics'}</span>
          </h2>

          {/* Exam choice */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'परीक्षा चुनें:' : 'Select Examination:'}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['gd', 'cpo', 'mts'] as ExamId[]).map(e => (
                <button
                  key={e}
                  onClick={() => setSelectedExam(e)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all uppercase ${
                    selectedExam === e
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {e === 'mts' ? 'Havaldar' : e.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'लिंग:' : 'Gender:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGender('male')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  gender === 'male'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {language === 'hi' ? 'पुरुष (Male)' : 'Male'}
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  gender === 'female'
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {language === 'hi' ? 'महिला (Female)' : 'Female'}
              </button>
            </div>
          </div>

          {/* Height */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>{language === 'hi' ? 'ऊंचाई (Height):' : 'Height:'}</span>
              <strong className="text-blue-600 text-sm">{heightCm} cm</strong>
            </div>
            <input
              type="range"
              min="145"
              max="195"
              value={heightCm}
              onChange={e => setHeightCm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Chest (for male) */}
          {gender === 'male' && (
            <>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{language === 'hi' ? 'सीना (बिना फुलाए):' : 'Chest (Unexpanded):'}</span>
                  <strong className="text-blue-600 text-sm">{chestCm} cm</strong>
                </div>
                <input
                  type="range"
                  min="70"
                  max="105"
                  value={chestCm}
                  onChange={e => setChestCm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{language === 'hi' ? 'सीना फुलाव (Expansion):' : 'Chest Expansion:'}</span>
                  <strong className="text-blue-600 text-sm">{chestExpCm} cm</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={chestExpCm}
                  onChange={e => setChestExpCm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </>
          )}

          {/* Running time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'hi' ? 'आपकी वर्तमान दौड़/चाल का समय:' : 'Your Running / Walking Time:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="60"
                value={runningMinutes}
                onChange={e => setRunningMinutes(Number(e.target.value))}
                className="w-16 p-2 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
              />
              <span className="text-xs font-medium text-slate-500">mins</span>
              <input
                type="number"
                min="0"
                max="59"
                value={runningSeconds}
                onChange={e => setRunningSeconds(Number(e.target.value))}
                className="w-16 p-2 text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
              />
              <span className="text-xs font-medium text-slate-500">secs</span>
            </div>
          </div>

          {/* ST / Hill relaxation toggle */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={isSTorHillArea}
                onChange={e => setIsSTorHillArea(e.target.checked)}
                className="w-4 h-4 rounded text-red-600"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'एसटी अथवा पहाड़ी / पूर्वोत्तर क्षेत्र छूट' : 'Belongs to ST / Gorkha / Hill Area'}
              </span>
            </label>
          </div>
        </div>

        {/* Right Evaluation Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>{language === 'hi' ? 'आधिकारिक पात्रता मूल्यांकन' : 'Official PST & PET Compliance Status'}</span>
            </h3>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Height Check */}
              <div className={`p-4 rounded-xl border ${
                heightPass 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-500">Height (PST)</span>
                  {heightPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {heightCm} cm
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Required: {minHeight} cm ({heightPass ? 'Qualified' : `Short by ${minHeight - heightCm} cm`})
                </div>
              </div>

              {/* Chest Check */}
              <div className={`p-4 rounded-xl border ${
                chestPass 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-500">Chest (PST)</span>
                  {chestPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {gender === 'male' ? `${chestCm} + ${chestExpCm} cm` : 'Exempt'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {gender === 'male' ? `Req: ${minChest} cm (+${minExpansion} cm)` : 'Not applicable for females'}
                </div>
              </div>

              {/* Running Check */}
              <div className={`p-4 rounded-xl border ${
                runningPass 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-500">Running / PET</span>
                  {runningPass ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {runningMinutes}m {runningSeconds}s
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {selectedExam === 'gd' && (gender === 'male' ? 'Req: 5 km in 24 mins' : 'Req: 1.6 km in 8.5 mins')}
                  {selectedExam === 'cpo' && (gender === 'male' ? 'Req: 1.6 km in 6.5 mins' : 'Req: 800m in 4 mins')}
                  {selectedExam === 'mts' && (gender === 'male' ? 'Req: 1600m in 15 mins' : 'Req: 1 km in 20 mins')}
                </div>
              </div>
            </div>

            {/* Official Requirements Table */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                {language === 'hi' ? 'आधिकारिक भर्ती नियम एवं चरण' : 'Official Recruitment Event Rules'}
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="py-2 px-3">Event</th>
                      <th className="py-2 px-3">Male Requirement</th>
                      <th className="py-2 px-3">Female Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {selectedExam === 'gd' && (
                      <>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Running (PET)</td>
                          <td className="py-2 px-3">5 Kilometres in 24 Minutes</td>
                          <td className="py-2 px-3">1.6 Kilometres in 8.5 Minutes</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Height (PST)</td>
                          <td className="py-2 px-3">170 cm (ST: 162.5 cm)</td>
                          <td className="py-2 px-3">157 cm (ST: 150 cm)</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Chest (PST)</td>
                          <td className="py-2 px-3">80 cm + 5 cm expansion</td>
                          <td className="py-2 px-3">Not Applicable</td>
                        </tr>
                      </>
                    )}

                    {selectedExam === 'cpo' && (
                      <>
                        <tr>
                          <td className="py-2 px-3 font-semibold">100m Sprint</td>
                          <td className="py-2 px-3">Within 16 Seconds</td>
                          <td className="py-2 px-3">Within 18 Seconds</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Distance Race</td>
                          <td className="py-2 px-3">1.6 Kilometres in 6.5 Minutes</td>
                          <td className="py-2 px-3">800 Metres in 4 Minutes</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Long Jump (3 chances)</td>
                          <td className="py-2 px-3">3.65 Metres</td>
                          <td className="py-2 px-3">2.7 Metres</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">High Jump (3 chances)</td>
                          <td className="py-2 px-3">1.2 Metres</td>
                          <td className="py-2 px-3">0.9 Metres</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Shot Put (16 lbs)</td>
                          <td className="py-2 px-3">4.5 Metres (3 chances)</td>
                          <td className="py-2 px-3">Not Applicable</td>
                        </tr>
                      </>
                    )}

                    {selectedExam === 'mts' && (
                      <>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Walking (Havaldar)</td>
                          <td className="py-2 px-3">1600 Metres in 15 Minutes</td>
                          <td className="py-2 px-3">1 Kilometre in 20 Minutes</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">Height (Havaldar)</td>
                          <td className="py-2 px-3">157.5 cm (relaxable 5 cm)</td>
                          <td className="py-2 px-3">152 cm (relaxable 2.5 cm)</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'चिकित्सीय सूचना अस्वीकरण: यह मॉड्यूल केवल कर्मचारी चयन आयोग के आधिकारिक भर्ती अधिसूचना मानकों पर आधारित है। कोई व्यक्तिगत चिकित्सकीय सलाह या फिटनेस दावा नहीं किया जाता।'
                  : 'Mandatory Notice: Never provide medical eligibility advice beyond official recruitment standards. Formal measurement is conducted by authorized CAPF / Medical Boards.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
