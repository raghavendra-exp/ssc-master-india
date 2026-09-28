import React, { useState } from 'react';
import { 
  CalendarDays, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Target 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface StudyPlannerViewProps {
  onNavigate: (view: string) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({ onNavigate }) => {
  const { language } = useApp();

  const [targetExam, setTargetExam] = useState<string>('cgl');
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [monthsAvailable, setMonthsAvailable] = useState<number>(6);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'repeater'>('intermediate');

  const roadmapSteps = [
    { level: 0, title: { en: 'Choose Your Exam', hi: 'परीक्षा का चयन' }, desc: { en: 'Identify your target post based on eligibility, age, and interest.', hi: 'योग्यता और रुचि के अनुसार लक्ष्य परीक्षा चुनें।' } },
    { level: 1, title: { en: 'Understand Exam Pattern', hi: 'परीक्षा पैटर्न समझें' }, desc: { en: 'Master stages, negative marking, sectional timings, and qualifying modules.', hi: 'टियर, नकारात्मक अंकन एवं क्वालिफाइंग खंडों की समझ।' } },
    { level: 2, title: { en: 'Complete Foundation', hi: 'मूल अवधारणाएं स्पष्ट करें' }, desc: { en: 'NCERT basics, English grammar fundamentals, and arithmetic concepts.', hi: 'अंकगणित, व्याकरण और जीएस के मूल सिद्धांत।' } },
    { level: 3, title: { en: 'Complete Syllabus', hi: 'संपूर्ण पाठ्यक्रम पूरा करें' }, desc: { en: 'Cover each subject topic systematically from standard books.', hi: 'अध्यायवार सभी विषयों का विस्तृत अध्ययन।' } },
    { level: 4, title: { en: 'Topic Practice', hi: 'अध्यायवार अभ्यास' }, desc: { en: 'Solve 100-200 questions immediately after each topic.', hi: 'प्रत्येक अध्याय के बाद तुरंत बहुविकल्पीय प्रश्न हल करें।' } },
    { level: 5, title: { en: 'Verified TCS PYQs', hi: 'सत्यापित पूर्व वर्ष प्रश्न' }, desc: { en: 'Master the last 5 years of TCS shift papers and question formats.', hi: 'विगत 5 वर्षों के टीसीएस प्रश्नों का गहन अभ्यास।' } },
    { level: 6, title: { en: 'Sectional Tests', hi: 'अनुभागीय टेस्ट' }, desc: { en: 'Improve speed in individual sections (Math, Reasoning, English, GA).', hi: 'अलग-अलग विषयों में 15-20 मिनट की समय सीमा में टेस्ट।' } },
    { level: 7, title: { en: 'Full Mock Tests', hi: 'पूर्ण मॉक टेस्ट' }, desc: { en: 'Simulate exact exam conditions twice a week with countdown timer.', hi: 'सप्ताह में 2-3 बार परीक्षा हॉल जैसा अभ्यास।' } },
    { level: 8, title: { en: 'Error Notebook Correction', hi: 'गलतियों का सुधार' }, desc: { en: 'Log every wrong question into the Error Notebook and analyze cause.', hi: 'कमजोर अध्यायों और गलतियों का सूक्ष्म विश्लेषण।' } },
    { level: 9, title: { en: 'Spaced Revision', hi: 'नियमित दोहराव (रिवीजन)' }, desc: { en: '1-day, 7-day, and 30-day spaced recall for vocab, GK, and formulas.', hi: 'सूत्रों, करंट अफेयर्स एवं शब्दावली का नियमित रिवीजन।' } },
    { level: 10, title: { en: 'Final Exam Simulation', hi: 'अंतिम परीक्षा सिमुलेशन' }, desc: { en: 'Peak mental readiness, typing accuracy, and final selection.', hi: 'परीक्षा से 10 दिन पूर्व आत्मविश्वास एवं अंतिम रूपरेखा।' } }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Strategy', hi: 'रणनीति' }, view: 'dashboard' },
          { label: { en: 'Zero-to-SSC Roadmap & Planner', hi: '0-से-चयन रोडमैप एवं प्लानर' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-blue-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Structured Selection Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? '0-से-एसएससी चयन रोडमैप एवं अध्ययन योजनाकार' : 'Zero-to-SSC Roadmap & Study Planner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'प्रारंभिक तैयारी से लेकर अंतिम चयन तक 10-स्तरीय वैज्ञानिक कार्ययोजना एवं व्यक्तिगत समय-सारणी।'
              : 'The comprehensive 10-level preparation framework from choosing an exam to topic mastery, PYQs, and mock simulation.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive Calculator */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-600" />
            <span>{language === 'hi' ? 'अपनी समय सारणी बनाएं' : 'Build Custom Routine'}</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Exam
            </label>
            <select
              value={targetExam}
              onChange={e => setTargetExam(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium"
            >
              <option value="cgl">SSC CGL</option>
              <option value="chsl">SSC CHSL</option>
              <option value="mts">SSC MTS</option>
              <option value="gd">SSC GD</option>
              <option value="cpo">SSC CPO</option>
              <option value="je">SSC JE</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Daily Study Hours:</span>
              <strong className="text-blue-600 font-bold">{dailyHours} Hours / Day</strong>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              value={dailyHours}
              onChange={e => setDailyHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Preparation Window:</span>
              <strong className="text-emerald-600 font-bold">{monthsAvailable} Months</strong>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={monthsAvailable}
              onChange={e => setMonthsAvailable(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Generated Timetable Blueprint */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              {language === 'hi' ? 'दैनिक समय विभाजन सुझाव:' : 'Recommended Daily Allocation:'}
            </span>
            <div className="flex justify-between">
              <span>Quantitative Aptitude:</span>
              <strong className="font-mono">{Math.round(dailyHours * 0.35)} Hours</strong>
            </div>
            <div className="flex justify-between">
              <span>English & Vocab:</span>
              <strong className="font-mono">{Math.round(dailyHours * 0.25)} Hours</strong>
            </div>
            <div className="flex justify-between">
              <span>Reasoning Practice:</span>
              <strong className="font-mono">{Math.round(dailyHours * 0.20)} Hours</strong>
            </div>
            <div className="flex justify-between">
              <span>General Awareness & CA:</span>
              <strong className="font-mono">{Math.round(dailyHours * 0.20)} Hours</strong>
            </div>
          </div>
        </div>

        {/* Right: 10-Level Zero-to-SSC Roadmap */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>{language === 'hi' ? '10-स्तरीय शून्य से चयन रोडमैप' : 'The 10-Level Zero-to-SSC Roadmap'}</span>
          </h2>

          <div className="space-y-3">
            {roadmapSteps.map(step => (
              <div
                key={step.level}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3 transition-colors hover:bg-slate-50"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  L{step.level}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {step.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {step.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
