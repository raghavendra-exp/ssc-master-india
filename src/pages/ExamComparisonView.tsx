import React from 'react';
import { 
  Sliders, 
  Check, 
  X, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface ExamComparisonViewProps {
  onNavigate: (view: string) => void;
}

export const ExamComparisonView: React.FC<ExamComparisonViewProps> = ({ onNavigate }) => {
  const { language, examConfigs, setActiveExam } = useApp();

  const comparisonRows = [
    {
      exam: 'SSC CGL',
      code: 'cgl',
      minQual: 'Graduation (Bachelor’s Degree in any discipline)',
      minQualHi: 'किसी भी संकाय में स्नातक डिग्री',
      stages: 'Tier-I (Qualifying) + Tier-II (Paper-I + DEST + Paper-II JSO)',
      stagesHi: 'टियर-I (क्वालिफाइंग) + टियर-II (पेपर-I + DEST)',
      majorSubjects: 'Reasoning, Quant (Adv Math), English, GA, Computer',
      majorSubjectsHi: 'रीजनिंग, गणित (एडवांस्ड), अंग्रेजी, जीएस, कंप्यूटर',
      skillPhysical: 'Mandatory DEST for all; PET/PST only for Excise/Examiner/CBI',
      skillPhysicalHi: 'सभी हेतु DEST अनिवार्य; केवल आबकारी/सीबीआई हेतु पीईटी',
      payLevels: 'Pay Levels 4, 5, 6, 7, 8 (Rs. 25,500 to 1,51,100)'
    },
    {
      exam: 'SSC CHSL',
      code: 'chsl',
      minQual: '12th Standard (Higher Secondary 10+2)',
      minQualHi: '12वीं कक्षा (उच्चतर माध्यमिक)',
      stages: 'Tier-I (CBE) + Tier-II (Sec I, II, III + Typing/Skill Test)',
      stagesHi: 'टियर-I + टियर-II (कंप्यूटर + टाइपिंग/स्किल टेस्ट)',
      majorSubjects: 'English (Basic), Quant (Arithmetic + Alg), Reasoning, GA',
      majorSubjectsHi: 'अंग्रेजी, गणित, रीजनिंग, सामान्य जागरूकता',
      skillPhysical: 'Typing Test (Eng 35 WPM / Hin 30 WPM) or DEO Skill Test',
      skillPhysicalHi: 'टाइपिंग टेस्ट (35 WPM अंग्रेजी / 30 WPM हिंदी)',
      payLevels: 'Pay Levels 2, 4, 5 (Rs. 19,900 to 92,300)'
    },
    {
      exam: 'SSC MTS & Havaldar',
      code: 'mts',
      minQual: '10th Class (Matriculation)',
      minQualHi: '10वीं (मैट्रिक पास)',
      stages: 'Session-I (Math + Reasoning) + Session-II (GA + English)',
      stagesHi: 'सत्र-I (गणित+तर्कशक्ति) + सत्र-II (मेरिट निर्धारक)',
      majorSubjects: 'Numerical Ability, Reasoning, General Awareness, English',
      majorSubjectsHi: 'संख्यात्मक अभिरुचि, रीजनिंग, जीएस, अंग्रेजी',
      skillPhysical: 'Walking PET (1600m in 15m) & PST only for Havaldar posts',
      skillPhysicalHi: 'केवल हवलदार पद हेतु 1600 मी पैदल चाल व शारीरिक परीक्षण',
      payLevels: 'Pay Level 1 (Rs. 18,000 to 56,900)'
    },
    {
      exam: 'SSC GD Constable',
      code: 'gd',
      minQual: '10th Class (Matriculation)',
      minQualHi: '10वीं (मैट्रिक पास)',
      stages: 'Computer Based Exam (80 Qs) + PET + PST + Medical (DME)',
      stagesHi: 'सीबीटी परीक्षा (80 प्रश्न) + पीईटी + पीएसटी + मेडिकल',
      majorSubjects: 'Reasoning, GK, Elementary Maths, English OR Hindi',
      majorSubjectsHi: 'रीजनिंग, सामान्य ज्ञान, प्रारंभिक गणित, हिंदी/अंग्रेजी',
      skillPhysical: 'Mandatory Running: 5 km in 24 mins (Male) / 1.6 km in 8.5 mins (Female)',
      skillPhysicalHi: 'दौड़: पुरुष 24 मिनट में 5 किमी, महिला 8.5 मिनट में 1.6 किमी',
      payLevels: 'Pay Level 3 (Rs. 21,700 to 69,100)'
    },
    {
      exam: 'SSC CPO',
      code: 'cpo',
      minQual: 'Graduation (Bachelor’s Degree) + LMV DL for DP SI',
      minQualHi: 'स्नातक + दिल्ली पुलिस पुरुष हेतु ड्राइविंग लाइसेंस',
      stages: 'Paper-I (200 Qs) + PET/PST + Paper-II (English 200 Qs) + Medical',
      stagesHi: 'पेपर-I + शारीरिक परीक्षण (PET/PST) + पेपर-II (अंग्रेजी) + मेडिकल',
      majorSubjects: 'Reasoning, GA, Quant, English Language (High weightage)',
      majorSubjectsHi: 'रीजनिंग, जीएस, गणित, अंग्रेजी भाषा (अत्यधिक भार)',
      skillPhysical: 'Comprehensive 5-event athletic PET + Height/Chest standards',
      skillPhysicalHi: '100 मी, 1.6 किमी, लंबी कूद, ऊंची कूद, गोला फेंक',
      payLevels: 'Pay Level 6 (Rs. 35,400 to 1,12,400)'
    },
    {
      exam: 'SSC JE',
      code: 'je',
      minQual: 'Engineering Degree or 3-year Polytechnic Diploma',
      minQualHi: 'इंजीनियरिंग डिग्री अथवा 3-वर्षीय डिप्लोमा',
      stages: 'Paper-I (Non-tech 100 Qs + Tech 100 Qs) + Paper-II Technical (100 Qs)',
      stagesHi: 'पेपर-I (गैर-तकनीकी + तकनीकी) + पेपर-II तकनीकी',
      majorSubjects: 'Civil / Electrical / Mechanical Domain + Reasoning + GA',
      majorSubjectsHi: 'सिविल / इलेक्ट्रिकल / मैकेनिकल कोर + रीजनिंग + जीएस',
      skillPhysical: 'No standard physical running test; BRO has specific medical criteria',
      skillPhysicalHi: 'कोई दौड़ नहीं; बीआरओ हेतु विशिष्ट स्वास्थ्य मानक',
      payLevels: 'Pay Level 6 (Rs. 35,400 to 1,12,400)'
    },
    {
      exam: 'SSC Stenographer',
      code: 'stenographer',
      minQual: '12th Standard Pass + Shorthand skill',
      minQualHi: '12वीं उत्तीर्ण + आशुलिपि कौशल',
      stages: 'CBE (200 Qs - No Math!) + Shorthand Skill Test (80/100 WPM)',
      stagesHi: 'सीबीटी (200 प्रश्न - गणित नहीं!) + आशुलिपि कौशल परीक्षा',
      majorSubjects: 'English Comprehension (100 Marks), Reasoning (50), GA (50)',
      majorSubjectsHi: 'अंग्रेजी (100 अंक), रीजनिंग (50 अंक), सामान्य जागरूकता (50)',
      skillPhysical: 'Mandatory Shorthand dictation and computer transcription',
      skillPhysicalHi: 'अनिवार्य आशुलिपि डिक्टेशन एवं कंप्यूटर ट्रांसक्रिप्शन',
      payLevels: 'Grade C: Level 6/7; Grade D: Level 4'
    },
    {
      exam: 'SSC JHT / SHT',
      code: 'jht',
      minQual: 'Master’s Degree in Hindi/English + Translation Diploma',
      minQualHi: 'हिंदी/अंग्रेजी में परास्नातक + अनुवाद डिप्लोमा',
      stages: 'Paper-I (Hindi 100 + English 100) + Paper-II Descriptive Translation',
      stagesHi: 'पेपर-I (हिंदी 100 + अंग्रेजी 100) + पेपर-II वर्णनात्मक अनुवाद',
      majorSubjects: 'General Hindi, General English, Translation & Essay',
      majorSubjectsHi: 'सामान्य हिंदी, सामान्य अंग्रेजी, अनुवाद एवं निबंध',
      skillPhysical: 'No physical test; Paper-II tests handwritten translation',
      skillPhysicalHi: 'कोई शारीरिक परीक्षा नहीं; पेपर-II में हस्तलिखित अनुवाद',
      payLevels: 'Pay Level 6 & Level 7 (Rs. 35,400 to 1,42,400)'
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Comparison', hi: 'तुलना' }, view: 'dashboard' },
          { label: { en: 'SSC Exam Comparison Matrix', hi: 'एसएससी परीक्षा तुलना तालिका' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Factual Examination Architecture Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी परीक्षा तुलना मैट्रिक्स' : 'SSC Exam Comparison Matrix'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'आधिकारिक अधिसूचनाओं से संकलित तथ्यात्मक तुलना: शैक्षणिक योग्यता, मुख्य चरण, प्रमुख विषय, कौशल एवं शारीरिक परीक्षण।'
              : 'Direct factual comparison across SSC CGL, CHSL, MTS, GD, CPO, JE, Steno, and JHT derived from latest official notices.'}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="py-3 px-3">Exam</th>
              <th className="py-3 px-3">Minimum Qualification</th>
              <th className="py-3 px-3">Main Stages</th>
              <th className="py-3 px-3">Major Subjects</th>
              <th className="py-3 px-3">Skill / Physical Test</th>
              <th className="py-3 px-3">Pay Scales</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {comparisonRows.map(row => (
              <tr key={row.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3.5 px-3 font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  {row.exam}
                </td>
                <td className="py-3.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                  {language === 'hi' ? row.minQualHi : row.minQual}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                  {language === 'hi' ? row.stagesHi : row.stages}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                  {language === 'hi' ? row.majorSubjectsHi : row.majorSubjects}
                </td>
                <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                  {language === 'hi' ? row.skillPhysicalHi : row.skillPhysical}
                </td>
                <td className="py-3.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                  {row.payLevels}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => {
                      setActiveExam(row.code as any);
                      onNavigate(`exam-${row.code}`);
                    }}
                    className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-bold text-xs"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
