import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { GlobalSearchModal } from './components/GlobalSearchModal.tsx';
import type { ExamId } from './types/index.ts';

// Pages
import { DashboardView } from './pages/DashboardView.tsx';
import { ExamDetailView } from './pages/ExamDetailView.tsx';
import { PracticeEngineView } from './pages/PracticeEngineView.tsx';
import { MockTestView } from './pages/MockTestView.tsx';
import { SpeedLabView } from './pages/SpeedLabView.tsx';
import { PyqMasterView } from './pages/PyqMasterView.tsx';
import { EligibilityFinderView } from './pages/EligibilityFinderView.tsx';
import { ExamComparisonView } from './pages/ExamComparisonView.tsx';
import { PostExplorerView } from './pages/PostExplorerView.tsx';
import { PostPreferencesView } from './pages/PostPreferencesView.tsx';
import { TypingLabView } from './pages/TypingLabView.tsx';
import { StenoLabView } from './pages/StenoLabView.tsx';
import { TranslationLabView } from './pages/TranslationLabView.tsx';
import { PhysicalTestView } from './pages/PhysicalTestView.tsx';
import { FormulaBookView } from './pages/FormulaBookView.tsx';
import { FlashcardsView } from './pages/FlashcardsView.tsx';
import { BooksLibraryView } from './pages/BooksLibraryView.tsx';
import { ErrorNotebookView } from './pages/ErrorNotebookView.tsx';
import { CutoffsView } from './pages/CutoffsView.tsx';
import { VacanciesView } from './pages/VacanciesView.tsx';
import { EsmCenterView } from './pages/EsmCenterView.tsx';
import { UpdatesView } from './pages/UpdatesView.tsx';
import { StudyPlannerView } from './pages/StudyPlannerView.tsx';
import { BookmarksView } from './pages/BookmarksView.tsx';

import { ShieldCheck, Heart, ExternalLink, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const { language, activeExam, setActiveExam } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Hash-based navigation for smooth GitHub Pages routing
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'dashboard';
  };

  const [currentView, setCurrentView] = useState<string>(getInitialView);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.location.hash = view;
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync active exam if navigating to an exam view
    if (view.startsWith('exam-')) {
      const examId = view.replace('exam-', '') as ExamId;
      setActiveExam(examId);
    }
  };

  // Sync hash changes (e.g. back/forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentView) {
        setCurrentView(hash);
        if (hash.startsWith('exam-')) {
          setActiveExam(hash.replace('exam-', '') as ExamId);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView, setActiveExam]);

  // Scroll to top button visibility
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Render view router
  const renderCurrentView = () => {
    if (currentView.startsWith('exam-')) {
      const examId = currentView.replace('exam-', '') as ExamId;
      return <ExamDetailView examId={examId} onNavigate={navigateTo} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={navigateTo} />;
      case 'eligibility-finder':
        return <EligibilityFinderView onNavigate={navigateTo} />;
      case 'exam-comparison':
        return <ExamComparisonView onNavigate={navigateTo} />;
      case 'practice':
        return <PracticeEngineView onNavigate={navigateTo} />;
      case 'mock-tests':
        return <MockTestView onNavigate={navigateTo} />;
      case 'speed-lab':
        return <SpeedLabView onNavigate={navigateTo} />;
      case 'pyq-master':
        return <PyqMasterView onNavigate={navigateTo} />;
      case 'error-notebook':
        return <ErrorNotebookView onNavigate={navigateTo} />;
      case 'flashcards':
        return <FlashcardsView onNavigate={navigateTo} />;
      case 'formula-book':
        return <FormulaBookView onNavigate={navigateTo} />;
      case 'typing-lab':
        return <TypingLabView onNavigate={navigateTo} />;
      case 'steno-lab':
        return <StenoLabView onNavigate={navigateTo} />;
      case 'translation-lab':
        return <TranslationLabView onNavigate={navigateTo} />;
      case 'physical-test':
        return <PhysicalTestView onNavigate={navigateTo} />;
      case 'post-explorer':
        return <PostExplorerView onNavigate={navigateTo} />;
      case 'post-preferences':
        return <PostPreferencesView onNavigate={navigateTo} />;
      case 'books-library':
        return <BooksLibraryView onNavigate={navigateTo} />;
      case 'vacancies':
        return <VacanciesView onNavigate={navigateTo} />;
      case 'cutoffs':
        return <CutoffsView onNavigate={navigateTo} />;
      case 'esm-center':
        return <EsmCenterView onNavigate={navigateTo} />;
      case 'updates':
        return <UpdatesView onNavigate={navigateTo} />;
      case 'study-planner':
        return <StudyPlannerView onNavigate={navigateTo} />;
      case 'bookmarks':
        return <BookmarksView onNavigate={navigateTo} />;
      default:
        return <DashboardView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={navigateTo}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal onNavigate={navigateTo} />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Platform Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors mt-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Mission */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  SSC
                </span>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  SSC MASTER INDIA
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                {language === 'hi'
                  ? 'भारत का सबसे संपूर्ण, द्विभाषी (हिंदी + English) एवं 100% आधिकारिक कर्मचारी चयन आयोग (SSC) परीक्षा तैयारी प्लेटफॉर्म। संपूर्ण पाठ्यक्रम, परीक्षा पैटर्न, 1,100+ प्रश्न, सीबीटी मॉक टेस्ट, स्पीड लैब, टाइपिंग एवं स्टेनो लैब।'
                  : 'India\'s most comprehensive, bilingual (Hindi + English), and 100% official Staff Selection Commission (SSC) preparation platform. Complete syllabus, exam patterns, 1,100+ questions, CBT mocks, Speed Lab, Typing & Steno Labs.'}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {language === 'hi' 
                    ? '100% कॉपीराइट सुरक्षित • कोई अनधिकृत पीडीएफ नहीं • पूर्णतः आधिकारिक अधिसूचनाओं पर आधारित'
                    : '100% Copyright Safe • Zero Pirated PDFs • Grounded in Official SSC Notifications'}
                </span>
              </div>
            </div>

            {/* Column 2: Exams */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {language === 'hi' ? 'प्रमुख एसएससी परीक्षाएं' : 'Major SSC Exams'}
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                <li><button onClick={() => navigateTo('exam-cgl')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC CGL (Graduate Level)</button></li>
                <li><button onClick={() => navigateTo('exam-chsl')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC CHSL (10+2 Level)</button></li>
                <li><button onClick={() => navigateTo('exam-mts')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC MTS & Havaldar</button></li>
                <li><button onClick={() => navigateTo('exam-gd')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC GD Constable (CAPFs)</button></li>
                <li><button onClick={() => navigateTo('exam-cpo')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC CPO (SI Delhi Police)</button></li>
                <li><button onClick={() => navigateTo('exam-je')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC JE (Civil/Elect/Mech)</button></li>
                <li><button onClick={() => navigateTo('exam-stenographer')} className="hover:text-blue-600 dark:hover:text-blue-400">SSC Stenographer Grade C & D</button></li>
              </ul>
            </div>

            {/* Column 3: Interactive Labs & Official Portals */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {language === 'hi' ? 'लैब एवं आधिकारिक पोर्टल' : 'Interactive Labs & Links'}
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                <li><button onClick={() => navigateTo('mock-tests')} className="hover:text-blue-600 dark:hover:text-blue-400">CBT Mock Tests</button></li>
                <li><button onClick={() => navigateTo('typing-lab')} className="hover:text-blue-600 dark:hover:text-blue-400">Typing & DEST Lab</button></li>
                <li><button onClick={() => navigateTo('steno-lab')} className="hover:text-blue-600 dark:hover:text-blue-400">Steno Dictation Lab</button></li>
                <li><button onClick={() => navigateTo('speed-lab')} className="hover:text-blue-600 dark:hover:text-blue-400">Mental Math & Speed Lab</button></li>
                <li><button onClick={() => navigateTo('post-preferences')} className="hover:text-blue-600 dark:hover:text-blue-400">Post Preference Builder</button></li>
                <li className="pt-1">
                  <a 
                    href="https://ssc.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Staff Selection Commission (ssc.gov.in)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>
              © {new Date().getFullYear()} SSC MASTER INDIA. Non-commercial open educational resource for SSC aspirants nationwide.
            </p>
            <p className="flex items-center gap-1">
              <span>Made with dedication for candidates across India</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
