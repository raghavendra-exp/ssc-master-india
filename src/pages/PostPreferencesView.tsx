import React from 'react';
import { 
  Medal, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Printer, 
  AlertCircle, 
  Briefcase, 
  Plus,
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface PostPreferencesViewProps {
  onNavigate: (view: string) => void;
}

export const PostPreferencesView: React.FC<PostPreferencesViewProps> = ({ onNavigate }) => {
  const { 
    language, 
    postPreferences, 
    movePostPreference, 
    removePostPreference, 
    clearPostPreferences 
  } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Recruitment', hi: 'भर्ती' }, view: 'post-explorer' },
          { label: { en: 'My Post Preference List', hi: 'मेरी पद वरीयता सूची' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            <Medal className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'व्यक्तिगत पद वरीयता निर्धारण टूल' : 'Custom Preference Order Tool'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'मेरी एसएससी पद वरीयता सूची' : 'My SSC Post Preference List'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'वेतन स्तर, पदस्थापन स्थल एवं व्यक्तिगत प्राथमिकताओं के आधार पर अपने पदों को क्रमबद्ध करें एवं आधिकारिक विकल्प फॉर्म हेतु प्रिंट निकालें।'
              : 'Organize your preferred posts according to pay level, work environment, and location without arbitrary "best post" rankings.'}
          </p>
        </div>

        {postPreferences.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-center no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्रिंट / पीडीएफ' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={clearPostPreferences}
              className="px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 font-bold text-xs border border-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Guidelines callout */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{language === 'hi' ? 'वरीयता निर्धारण सिद्धांत:' : 'Official Preference Principles:'} </span>
          {language === 'hi'
            ? 'कोई भी पद सार्वभौमिक रूप से "सर्वश्रेष्ठ" नहीं होता। गृह राज्य में पदस्थापन चाहने वाले अभ्यर्थियों के लिए ASO-CSS (दिल्ली स्थायी) या स्थानीय कार्यालय उपयुक्त हो सकते हैं, जबकि फील्ड एवं वर्दी पसंद करने वाले आयकर, जीएसटी या सीबीआई को वरीयता दे सकते हैं।'
            : 'Factual selection advice: Balance your preferences based on Pay Level (Levels 7/6 vs Level 4), home state transfer rules, desk vs field duties, and physical standards.'}
        </div>
      </div>

      {postPreferences.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-3">
          <Briefcase className="w-12 h-12 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {language === 'hi' ? 'आपकी वरीयता सूची अभी खाली है' : 'Your Preference List is Currently Empty'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {language === 'hi'
              ? 'पद एवं विभाग एक्सप्लोरर पर जाएं और अपनी पसंद के पदों पर "+ वरीयता में जोड़ें" बटन दबाएं।'
              : 'Browse the Post & Department Explorer and click "+ Add to Preference List" on posts you want to rank.'}
          </p>
          <button
            onClick={() => onNavigate('post-explorer')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'पद एक्सप्लोरर खोलें' : 'Browse All Posts'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {postPreferences.map((pref, idx) => (
            <div
              key={pref.post.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                {/* Preference Rank Badge */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white font-black text-sm sm:text-base flex items-center justify-center flex-shrink-0 shadow-md">
                  #{pref.preferenceRank}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      Level {pref.post.payLevel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {pref.post.payScale}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {pref.post.postName[language]}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {pref.post.department} • {pref.post.postingLocation[language]}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 no-print">
                <button
                  onClick={() => movePostPreference(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300"
                  title="Move Up in Rank"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  onClick={() => movePostPreference(idx, 'down')}
                  disabled={idx === postPreferences.length - 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300"
                  title="Move Down in Rank"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => removePostPreference(pref.post.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/60"
                  title="Remove from List"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
