import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  MapPin, 
  DollarSign, 
  Award, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import type { PostProfile } from '../types/index.ts';

interface PostExplorerViewProps {
  onNavigate: (view: string) => void;
}

export const PostExplorerView: React.FC<PostExplorerViewProps> = ({ onNavigate }) => {
  const { 
    language, 
    postsData, 
    postPreferences, 
    addPostPreference, 
    removePostPreference 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayLevel, setSelectedPayLevel] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const filteredPosts = postsData.filter(p => {
    if (selectedExam !== 'all' && p.exam !== selectedExam) return false;
    if (selectedPayLevel !== 'all' && String(p.payLevel) !== selectedPayLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.postName.en.toLowerCase().includes(q) ||
        p.postName.hi.includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.ministry.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Recruitment', hi: 'भर्ती' }, view: 'dashboard' },
          { label: { en: 'Post & Department Explorer', hi: 'पद एवं विभाग एक्सप्लोरर' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'वेतन स्तर 1 से 8 तक संपूर्ण पद संवर्ग' : 'Pay Levels 1 to 8 Factual Profiles'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी पद एवं विभाग एक्सप्लोरर' : 'SSC Post & Department Explorer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'आधिकारिक भर्ती नियमों के अनुसार प्रत्येक पद का वेतनमान, कार्य प्रकृति, पदस्थापन स्थल, पदोन्नति अवसर और आवश्यक अर्हताएं।'
              : 'Factual attributes of all SSC recruited posts: official pay scales, duties, posting profiles, and career ladders without subjective rankings.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('post-preferences')}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 flex-shrink-0 transition-all shadow-md self-start md:self-center"
        >
          <span>{language === 'hi' ? 'मेरी वरीयता सूची देखें' : 'My Preference List'}</span>
          <span className="w-5 h-5 rounded-full bg-slate-950 text-white text-xs flex items-center justify-center font-bold">
            {postPreferences.length}
          </span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'पद नाम, विभाग, या मंत्रालय खोजें...' : 'Search post name, department, or ministry...'}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedPayLevel}
            onChange={e => setSelectedPayLevel(e.target.value)}
            className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
          >
            <option value="all">{language === 'hi' ? 'सभी वेतन स्तर' : 'All Pay Levels'}</option>
            <option value="7">Level 7 (44,900 - 1,42,400)</option>
            <option value="6">Level 6 (35,400 - 1,12,400)</option>
            <option value="4">Level 4 (25,500 - 81,100)</option>
            <option value="3">Level 3 (21,700 - 69,100)</option>
            <option value="2">Level 2 (19,900 - 63,200)</option>
            <option value="1">Level 1 (18,000 - 56,900)</option>
          </select>

          <select
            value={selectedExam}
            onChange={e => setSelectedExam(e.target.value)}
            className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
          >
            <option value="all">{language === 'hi' ? 'सभी परीक्षाएं' : 'All Exams'}</option>
            <option value="cgl">SSC CGL</option>
            <option value="chsl">SSC CHSL</option>
            <option value="mts">SSC MTS</option>
            <option value="gd">SSC GD</option>
            <option value="cpo">SSC CPO</option>
          </select>
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.map(post => {
          const isAdded = postPreferences.some(p => p.post.id === post.id);

          return (
            <div
              key={post.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      Level {post.payLevel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      {post.group}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {post.payScale}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {post.postName[language]}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {post.department} • {post.ministry}
                </p>

                {/* Duties list */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                    {language === 'hi' ? 'प्रमुख कार्य एवं दायित्व:' : 'Primary Job Duties:'}
                  </span>
                  {post.duties.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <span>{d[language]}</span>
                    </div>
                  ))}
                </div>

                {/* Key metadata points */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{language === 'hi' ? 'आयु सीमा:' : 'Age:'} </span>
                    {post.ageRequirement}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{language === 'hi' ? 'पदस्थापन:' : 'Location:'} </span>
                    {post.postingLocation[language]}
                  </div>
                </div>

                {/* Career progression */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {language === 'hi' ? 'पदोन्नति संवर्ग (Career Progression):' : 'Promotion Ladder:'}
                  </span>
                  <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {post.careerProgression.map((cp, cpIdx) => (
                      <React.Fragment key={cpIdx}>
                        <span>{cp[language]}</span>
                        {cpIdx < post.careerProgression.length - 1 && (
                          <span className="text-blue-500 font-bold">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preference toggle button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {post.officialSource}
                </span>

                <button
                  onClick={() => {
                    if (isAdded) removePostPreference(post.id);
                    else addPostPreference(post);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isAdded
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'वरीयता में जोड़ा गया' : 'Added to Preferences'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'वरीयता में जोड़ें' : 'Add to Preference List'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
