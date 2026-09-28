import React from 'react';
import { 
  Award, 
  BookOpen, 
  FileText, 
  Timer, 
  Zap, 
  Compass, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Bell, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Keyboard, 
  Activity, 
  Calendar,
  ExternalLink,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import type { ExamId } from '../types/index.ts';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { 
    language, 
    examConfigs, 
    allQuestions, 
    verifiedPyqs, 
    updatesData, 
    vacanciesData, 
    setActiveExam 
  } = useApp();

  const totalVacancies = vacanciesData.reduce((acc, v) => acc + v.category.total, 0);

  const majorExams: { id: ExamId; name: string; tag: string; color: string; desc: { en: string; hi: string } }[] = [
    {
      id: 'cgl',
      name: 'SSC CGL',
      tag: 'Graduation Level • 17,700+ Vacancies',
      color: 'from-blue-600 to-indigo-700',
      desc: {
        en: 'Combined Graduate Level for ASO, Income Tax Inspector, GST Inspector, ED, CBI & Group B/C Officers.',
        hi: 'एएसओ, आयकर निरीक्षक, जीएसटी निरीक्षक, ईडी, सीबीआई एवं ग्रुप बी/सी पदों हेतु संयुक्त स्नातक परीक्षा।'
      }
    },
    {
      id: 'chsl',
      name: 'SSC CHSL',
      tag: '10+2 Level • LDC, JSA, DEO',
      color: 'from-sky-600 to-blue-700',
      desc: {
        en: '10+2 Level Examination for Lower Division Clerk, Junior Secretariat Assistant & Data Entry Operator.',
        hi: 'लोअर डिवीजन क्लर्क, कनिष्ठ सचिवालय सहायक एवं डाटा एंट्री ऑपरेटर हेतु 10+2 स्तरीय परीक्षा।'
      }
    },
    {
      id: 'mts',
      name: 'SSC MTS & Havaldar',
      tag: '10th Matric Pass • 9,500+ Vacancies',
      color: 'from-emerald-600 to-teal-700',
      desc: {
        en: 'Multi-Tasking (Non-Technical) Staff in Central Ministries & Havaldar in CBIC / CBN (No negative in Session-I).',
        hi: 'केंद्रीय मंत्रालयों में एमटीएस एवं सीबीआईसी/सीबीएन में हवलदार (सत्र-I में कोई नकारात्मक अंकन नहीं)।'
      }
    },
    {
      id: 'gd',
      name: 'SSC GD Constable',
      tag: '10th Matric • 39,400+ Vacancies',
      color: 'from-amber-600 to-orange-700',
      desc: {
        en: 'Constable (General Duty) in BSF, CISF, CRPF, SSB, ITBP, Assam Rifles & SSF.',
        hi: 'सीमा सुरक्षा बल, सीआईएसएफ, सीआरपीएफ, आईटीबीपी, असम राइफल्स में कांस्टेबल (जनरल ड्यूटी) भर्ती।'
      }
    },
    {
      id: 'cpo',
      name: 'SSC CPO',
      tag: 'Graduation • Sub-Inspector (Pay Level 6)',
      color: 'from-red-600 to-rose-700',
      desc: {
        en: 'Sub-Inspector in Delhi Police & Central Armed Police Forces (Paper-I + PET/PST + Paper-II English).',
        hi: 'दिल्ली पुलिस एवं केंद्रीय सशस्त्र पुलिस बलों में उप-निरीक्षक (एसआई) भर्ती परीक्षा।'
      }
    },
    {
      id: 'je',
      name: 'SSC JE',
      tag: 'Degree/Diploma • Civil, Electrical, Mech',
      color: 'from-violet-600 to-purple-700',
      desc: {
        en: 'Junior Engineer in CPWD, MES, BRO, and Central Water Commission with domain technical testing.',
        hi: 'सीपीडब्ल्यूडी, एमईएस, बीआरओ, सीडब्ल्यूसी में सिविल, इलेक्ट्रिकल व मैकेनिकल कनिष्ठ अभियंता।'
      }
    },
    {
      id: 'stenographer',
      name: 'SSC Stenographer',
      tag: '12th Pass • Grade C & D (No Math)',
      color: 'from-fuchsia-600 to-pink-700',
      desc: {
        en: 'Stenographer Grade C & D in Ministries with 100 WPM / 80 WPM Shorthand & 100-mark English focus.',
        hi: 'मंत्रालयों में आशुलिपिक ग्रेड सी एवं डी (गणित रहित, अंग्रेजी व आशुलिपि प्रमुख भार)।'
      }
    },
    {
      id: 'selection-post',
      name: 'SSC Selection Post',
      tag: 'Phase-XII / XIII • Matric, 10+2, Degree',
      color: 'from-teal-600 to-cyan-700',
      desc: {
        en: 'Specialized departmental vacancies across Northern, Western, Southern, Central & Eastern regions.',
        hi: 'सभी क्षेत्रीय कार्यालयों में विशिष्ट तकनीकी, प्रयोगशाला एवं लिपिकीय पदों की भर्ती।'
      }
    },
    {
      id: 'jht',
      name: 'SSC JHT / SHT',
      tag: "Master's in Hindi/English • Pay Level 6/7",
      color: 'from-indigo-600 to-blue-800',
      desc: {
        en: 'Junior Translation Officer (JTO) and Senior Hindi Translator in CSOLS and Subordinate Offices.',
        hi: 'केंद्रीय सचिवालय राजभाषा सेवा एवं अधीनस्थ कार्यालयों में कनिष्ठ अनुवाद अधिकारी एवं वरिष्ठ अनुवादक।'
      }
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-blue-900/50">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'संपूर्ण एसएससी परीक्षा तैयारी एवं भर्ती मंच' : 'Complete Official SSC Preparation Ecosystem'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            SSC <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">MASTER INDIA</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {language === 'hi'
              ? 'कर्मचारी चयन आयोग (SSC) द्वारा आयोजित सभी परीक्षाओं का संपूर्ण आधिकारिक पाठ्यक्रम, वास्तविक पिछले वर्षों के प्रश्न (PYQs), सीबीटी मॉक टेस्ट, पद एवं विभाग एक्सप्लोरर, टाइपिंग लैब और योग्यता कैलकुलेटर।'
              : 'The authoritative, 100% official bilingual platform covering SSC CGL, CHSL, MTS, GD, CPO, JE, Stenographer, Selection Post, and JHT — official syllabus, verified PYQs, CBT mocks, post finder, typing lab, and physical fitness guidance.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('eligibility-finder')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'hi' ? 'कौन सा फॉर्म भर सकता हूँ?' : 'Which Exam Can I Apply For?'}</span>
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>{language === 'hi' ? '1,100+ प्रश्न अभ्यास शुरू करें' : 'Start 1,100+ Practice Engine'}</span>
            </button>

            <button
              onClick={() => onNavigate('mock-tests')}
              className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Timer className="w-4 h-4" />
              <span>{language === 'hi' ? 'असली सीबीटी मॉक दें' : 'Take CBT Mock Test'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background grid & badges */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
          <Award className="w-80 h-80 text-white" />
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>{language === 'hi' ? 'कुल प्रश्न बैंक' : 'Question Bank'}</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {allQuestions.length}+
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            {verifiedPyqs.length} {language === 'hi' ? 'सत्यापित PYQs शामिल' : 'Verified TCS PYQs'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>{language === 'hi' ? 'प्रमुख एसएससी परीक्षाएं' : 'Major SSC Exams'}</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            9 Major +
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'hi' ? 'अलग-अलग परीक्षा इंजन' : 'Separate Dedicated Engines'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>{language === 'hi' ? 'अधिसूचित रिक्तियां' : 'Live Vacancies'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {totalVacancies.toLocaleString()}+
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
            {language === 'hi' ? 'आधिकारिक एसएससी अधिसूचनाएं' : 'Official Notifications Grounded'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>{language === 'hi' ? 'कौशल एवं शारीरिक लैब' : 'Skill & Physical Labs'}</span>
            <Keyboard className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            4 Interactive
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Typing • Steno • Trans • PET
          </div>
        </div>
      </section>

      {/* Official Notifications & Live Ticker */}
      <section className="bg-amber-50 dark:bg-slate-900/80 border border-amber-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'नवीनतम आधिकारिक सूचनाएं एवं अपडेट' : 'Latest Official SSC Updates & Notices'}</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigate('updates')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {updatesData.slice(0, 4).map(u => (
            <div
              key={u.id}
              className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <span className="uppercase px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    {u.exam.toUpperCase()}
                  </span>
                  <span>{u.date}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {u.title[language]}
                </h3>
              </div>
              <a
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                title="Official Portal Notice"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Major SSC Examination Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {language === 'hi' ? 'एसएससी परीक्षा मॉड्यूल (समर्पित इंजन)' : 'SSC Examination Engines'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === 'hi' 
                ? 'प्रत्येक परीक्षा का अपना विशिष्ट पाठ्यक्रम, योग्यता, परीक्षा पैटर्न, पद एवं चरण'
                : 'Each examination features its own official pattern, stages, eligibility, syllabus & posts'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {majorExams.map(exam => {
            const config = examConfigs[exam.id];
            return (
              <div
                key={exam.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {exam.tag}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {config?.officialNotification.examDate || '2026 Scheduled'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {config?.examName[language] || exam.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {config?.fullName[language]}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2">
                    {exam.desc[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span>{config?.stages.length || 2} {language === 'hi' ? 'चरण (Stages)' : 'Stages'}</span>
                    <span className="mx-1">•</span>
                    <span>{config?.marks} {language === 'hi' ? 'अंक' : 'Marks'}</span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveExam(exam.id);
                      onNavigate(`exam-${exam.id}`);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{language === 'hi' ? 'पूरा विवरण' : 'Explore Engine'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Preparation Tools Showcase */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl sm:text-2xl font-black">
            {language === 'hi' ? 'इंटरैक्टिव तैयारी एवं कौशल कार्यशालाएं' : 'Interactive Preparation & Skill Labs'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {language === 'hi'
              ? 'केवल किताब पढ़ना पर्याप्त नहीं—एसएससी में चयन हेतु गति, टाइपिंग, शारीरिक मानक और गलतियों के विश्लेषण की आवश्यकता होती है।'
              : 'Beyond theory: real exam timer CBT simulation, real-time typing speed test, steno dictation, and physical fitness tracking.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('typing-lab')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all hover:scale-102"
          >
            <Keyboard className="w-6 h-6 text-cyan-400 mb-2" />
            <h3 className="font-bold text-sm text-white">
              {language === 'hi' ? 'टाइपिंग एवं DEST लैब' : 'Typing & DEST Lab'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'hi' ? 'अंग्रेजी 35 WPM / हिंदी 30 WPM परीक्षा मानक पैसेज' : 'English 35 WPM / Hindi 30 WPM with real-time error calculation.'}
            </p>
          </button>

          <button
            onClick={() => onNavigate('speed-lab')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all hover:scale-102"
          >
            <Sparkles className="w-6 h-6 text-amber-400 mb-2" />
            <h3 className="font-bold text-sm text-white">
              {language === 'hi' ? 'कैलकुलेशन स्पीड टेस्ट' : 'Calculation Speed Lab'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'hi' ? 'पहाड़े, वर्ग, घन और मानसिक गणना गति बढ़ाएं' : 'Tables, squares, cubes & mental math drills against timer.'}
            </p>
          </button>

          <button
            onClick={() => onNavigate('post-preferences')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all hover:scale-102"
          >
            <Briefcase className="w-6 h-6 text-emerald-400 mb-2" />
            <h3 className="font-bold text-sm text-white">
              {language === 'hi' ? 'मेरी पद वरीयता सूची' : 'My Post Preferences'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'hi' ? 'वेतन स्तर 4-8 के आधार पर अपनी व्यक्तिगत पद वरीयता तैयार करें' : 'Build and reorder your CGL/CHSL preference form.'}
            </p>
          </button>

          <button
            onClick={() => onNavigate('physical-test')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all hover:scale-102"
          >
            <Activity className="w-6 h-6 text-rose-400 mb-2" />
            <h3 className="font-bold text-sm text-white">
              {language === 'hi' ? 'शारीरिक दक्षता (PET/PST)' : 'Physical Fitness Tracker'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'hi' ? 'जीडी कांस्टेबल एवं सीपीओ एसआई दौड़ व ऊंचाई मानक' : 'GD 5km running and CPO SI athletic events criteria.'}
            </p>
          </button>
        </div>
      </section>

      {/* Official Footnote / Transparency Box */}
      <footer className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            {language === 'hi'
              ? 'यह प्लेटफॉर्म पूर्णतः कॉपीराइट-सुरक्षित एवं भारत सरकार के कर्मचारी चयन आयोग के आधिकारिक गजट/नोटिस पर आधारित है।'
              : 'Official Source Transparency: Grounded strictly in official notifications published by the Staff Selection Commission (ssc.gov.in).'}
          </span>
        </div>
        <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
          <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">
            Official Portal
          </a>
          <span>•</span>
          <span>Version 2026.1</span>
        </div>
      </footer>
    </div>
  );
};
