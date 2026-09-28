import React from 'react';
import { 
  Search, 
  Globe, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Bookmark, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { language, setLanguage, theme, setTheme, setSearchOpen, bookmarkedQuestionIds, errorNotebook } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-xs">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
              {language === 'hi' ? 'लाइव सूचना' : 'Official Update'}
            </span>
            <span className="truncate">
              {language === 'hi' 
                ? 'एसएससी वार्षिक परीक्षा कैलेंडर 2026-27 एवं सीजीएल/जीडी अधिसूचना जारी • ssc.gov.in' 
                : 'SSC Annual Exam Calendar 2026-27 & CGL/GD Official Notifications Live • ssc.gov.in'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-300 text-[11px] flex-shrink-0">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {language === 'hi' ? '100% आधिकारिक स्रोत' : '100% Official Source Grounded'}
            </span>
            <span>•</span>
            <span>Staff Selection Commission</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-blue-950 dark:text-white">
                  SSC <span className="text-amber-600 dark:text-amber-400">MASTER</span> INDIA
                </span>
                <span className="hidden md:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  v2026
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs md:max-w-sm">
                {language === 'hi' 
                  ? 'सीजीएल • सीएचएसएल • जीडी • एमटीएस • सीपीओ • जेई संपूर्ण तैयारी मंच' 
                  : 'CGL • CHSL • GD • MTS • CPO • JE • Preparation & Jobs Platform'}
              </p>
            </div>
          </button>
        </div>

        {/* Center: Search Bar Trigger */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-white dark:hover:bg-slate-800 transition-all text-left shadow-2xs"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-slate-400" />
              <span>{language === 'hi' ? 'परीक्षा, पद, प्रश्न, PYQ, पुस्तक खोजें...' : 'Search exams, posts, questions, PYQs, books...'}</span>
            </span>
            <kbd className="hidden lg:inline-block text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-mono">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile search icon button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Bilingual Toggle Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
            title="Toggle English / Hindi (द्विभाषी भाषा बदलें)"
          >
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Bookmarks quick link */}
          <button
            onClick={() => onNavigate('bookmarks')}
            className={`relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              currentView === 'bookmarks' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' : ''
            }`}
            title={language === 'hi' ? 'सहेजे गए प्रश्न' : 'Saved Questions'}
          >
            <Bookmark className="w-5 h-5" />
            {bookmarkedQuestionIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                {bookmarkedQuestionIds.length > 99 ? '99+' : bookmarkedQuestionIds.length}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={language === 'hi' ? 'थीम बदलें' : 'Toggle Theme'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
