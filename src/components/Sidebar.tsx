import React from 'react';
import { 
  LayoutDashboard, 
  Award, 
  BookOpen, 
  FileText, 
  BrainCircuit, 
  Timer, 
  Zap, 
  Library, 
  Briefcase, 
  TrendingUp, 
  Bell, 
  ShieldAlert, 
  Activity, 
  Keyboard, 
  Mic, 
  Languages, 
  Compass, 
  BookmarkCheck, 
  HelpCircle, 
  BookMarked, 
  CalendarDays, 
  Medal, 
  GraduationCap, 
  Sliders,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import type { ExamId } from '../types/index.ts';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { language, activeExam, setActiveExam, examConfigs } = useApp();

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navSectionClass = "text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-3 mb-1 mt-4";
  const navItemClass = (isActive: boolean) => `
    w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left
    ${isActive 
      ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30' 
      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-blue-400'}
  `;

  const examsList: { id: ExamId; name: string }[] = [
    { id: 'cgl', name: 'SSC CGL' },
    { id: 'chsl', name: 'SSC CHSL' },
    { id: 'mts', name: 'SSC MTS & Havaldar' },
    { id: 'gd', name: 'SSC GD Constable' },
    { id: 'cpo', name: 'SSC CPO' },
    { id: 'je', name: 'SSC JE' },
    { id: 'stenographer', name: 'SSC Stenographer' },
    { id: 'selection-post', name: 'SSC Selection Post' },
    { id: 'jht', name: 'SSC JHT / SHT' },
    { id: 'other', name: 'Other Official Exams' }
  ];

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-40 w-64 sm:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out
          lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Main Navigation */}
          <button
            onClick={() => handleNav('dashboard')}
            className={navItemClass(currentView === 'dashboard')}
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
            <span>{language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</span>
          </button>

          <button
            onClick={() => handleNav('eligibility-finder')}
            className={navItemClass(currentView === 'eligibility-finder')}
          >
            <Compass className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {language === 'hi' ? 'कौन सा फॉर्म भर सकता हूँ?' : 'Which SSC Exam Can I Apply For?'}
            </span>
          </button>

          <button
            onClick={() => handleNav('exam-comparison')}
            className={navItemClass(currentView === 'exam-comparison')}
          >
            <Sliders className="w-4 h-4 flex-shrink-0" />
            <span>{language === 'hi' ? 'एसएससी परीक्षा तुलना' : 'SSC Exam Comparison Matrix'}</span>
          </button>

          {/* 9 Major SSC Engines */}
          <div className={navSectionClass}>
            {language === 'hi' ? 'एसएससी परीक्षाएं' : 'SSC Examinations'}
          </div>

          <div className="space-y-0.5">
            {examsList.map(e => (
              <button
                key={e.id}
                onClick={() => {
                  setActiveExam(e.id);
                  handleNav(`exam-${e.id}`);
                }}
                className={navItemClass(currentView === `exam-${e.id}` || (currentView.startsWith('exam-') && activeExam === e.id))}
              >
                <Award className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="truncate">{e.name}</span>
              </button>
            ))}
          </div>

          {/* Practice & Mock Engines */}
          <div className={navSectionClass}>
            {language === 'hi' ? 'अभ्यास एवं मॉक टेस्ट' : 'Practice & Mock Engines'}
          </div>

          <button
            onClick={() => handleNav('practice')}
            className={navItemClass(currentView === 'practice')}
          >
            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'प्रैक्टिस इंजन (1,100+ प्रश्न)' : 'Practice Engine (1,100+ Qs)'}</span>
          </button>

          <button
            onClick={() => handleNav('mock-tests')}
            className={navItemClass(currentView === 'mock-tests')}
          >
            <Timer className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'असली सीबीटी मॉक टेस्ट' : 'SSC Real CBT Mock Tests'}</span>
          </button>

          <button
            onClick={() => handleNav('speed-lab')}
            className={navItemClass(currentView === 'speed-lab')}
          >
            <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'स्पीड टेस्ट लैब' : 'SSC Speed Test Lab'}</span>
          </button>

          <button
            onClick={() => handleNav('pyq-master')}
            className={navItemClass(currentView === 'pyq-master')}
          >
            <FileText className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'सत्यापित PYQ मास्टर' : 'Verified PYQ Master'}</span>
          </button>

          <button
            onClick={() => handleNav('error-notebook')}
            className={navItemClass(currentView === 'error-notebook')}
          >
            <BookMarked className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'गलती नोटबुक (Error Book)' : 'Error Notebook'}</span>
          </button>

          <button
            onClick={() => handleNav('flashcards')}
            className={navItemClass(currentView === 'flashcards')}
          >
            <BrainCircuit className="w-4 h-4 text-teal-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'फ्लैशकार्ड्स (स्पेसड रिपीट)' : 'Flashcards (Spaced Rep)'}</span>
          </button>

          <button
            onClick={() => handleNav('formula-book')}
            className={navItemClass(currentView === 'formula-book')}
          >
            <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'मैथ्स फार्मूला मास्टर' : 'Quant Formula Master'}</span>
          </button>

          {/* Specialized Skill & Physical Labs */}
          <div className={navSectionClass}>
            {language === 'hi' ? 'कौशल एवं शारीरिक परीक्षण' : 'Skill & Physical Labs'}
          </div>

          <button
            onClick={() => handleNav('typing-lab')}
            className={navItemClass(currentView === 'typing-lab')}
          >
            <Keyboard className="w-4 h-4 text-cyan-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'टाइपिंग लैब (English/हिंदी)' : 'Typing & DEST Lab'}</span>
          </button>

          <button
            onClick={() => handleNav('steno-lab')}
            className={navItemClass(currentView === 'steno-lab')}
          >
            <Mic className="w-4 h-4 text-pink-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'स्टेनोग्राफी डिक्टेशन लैब' : 'Steno Dictation Lab'}</span>
          </button>

          <button
            onClick={() => handleNav('translation-lab')}
            className={navItemClass(currentView === 'translation-lab')}
          >
            <Languages className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'अनुवाद कार्यशाला (JHT)' : 'Translation Lab (JHT)'}</span>
          </button>

          <button
            onClick={() => handleNav('physical-test')}
            className={navItemClass(currentView === 'physical-test')}
          >
            <Activity className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'शारीरिक दक्षता (PET/PST)' : 'Physical Fitness (PET/PST)'}</span>
          </button>

          {/* Recruitment, Posts & Data Trackers */}
          <div className={navSectionClass}>
            {language === 'hi' ? 'पद, कटऑफ एवं भर्तियां' : 'Recruitment & Job Profiles'}
          </div>

          <button
            onClick={() => handleNav('post-explorer')}
            className={navItemClass(currentView === 'post-explorer')}
          >
            <Briefcase className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{language === 'hi' ? 'पद एवं विभाग एक्सप्लोरर' : 'Post & Department Explorer'}</span>
          </button>

          <button
            onClick={() => handleNav('post-preferences')}
            className={navItemClass(currentView === 'post-preferences')}
          >
            <Medal className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{language === 'hi' ? 'मेरी पद वरीयता सूची' : 'My Post Preference List'}</span>
          </button>

          <button
            onClick={() => handleNav('books-library')}
            className={navItemClass(currentView === 'books-library')}
          >
            <Library className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{language === 'hi' ? 'पुस्तक पुस्तकालय (प्रमाणित)' : 'Book Library (Publishers)'}</span>
          </button>

          <button
            onClick={() => handleNav('vacancies')}
            className={navItemClass(currentView === 'vacancies')}
          >
            <TrendingUp className="w-4 h-4 text-violet-500 flex-shrink-0" />
            <span>{language === 'hi' ? 'रिक्तियां ट्रैकर (Vacancies)' : 'SSC Vacancy Tracker'}</span>
          </button>

          <button
            onClick={() => handleNav('cutoffs')}
            className={navItemClass(currentView === 'cutoffs')}
          >
            <TrendingUp className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <span>{language === 'hi' ? 'ऐतिहासिक कटऑफ डेटा' : 'Historical Cutoff DB'}</span>
          </button>

          <button
            onClick={() => handleNav('esm-center')}
            className={navItemClass(currentView === 'esm-center')}
          >
            <ShieldAlert className="w-4 h-4 text-blue-700 flex-shrink-0" />
            <span>{language === 'hi' ? 'भूतपूर्व सैनिक (ESM) केंद्र' : 'Ex-Servicemen (ESM) Center'}</span>
          </button>

          <button
            onClick={() => handleNav('updates')}
            className={navItemClass(currentView === 'updates')}
          >
            <Bell className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{language === 'hi' ? 'आधिकारिक अपडेट एवं कैलेंडर' : 'Updates & Annual Calendar'}</span>
          </button>

          <button
            onClick={() => handleNav('study-planner')}
            className={navItemClass(currentView === 'study-planner')}
          >
            <CalendarDays className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>{language === 'hi' ? '0-से-चयन रोडमैप एवं प्लान' : 'Zero-to-SSC Roadmap & Plan'}</span>
          </button>
        </div>

        {/* Official authority badge in sidebar footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            {language === 'hi' ? 'आधिकारिक एसएससी पोर्टल' : 'Official SSC Portal'}
          </p>
          <a
            href="https://ssc.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
          >
            <span>ssc.gov.in</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </aside>
    </>
  );
};
