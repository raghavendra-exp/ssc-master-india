import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Timer, 
  TrendingUp, 
  ExternalLink, 
  Layers, 
  Briefcase, 
  ChevronDown, 
  ChevronUp,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import type { ExamId } from '../types/index.ts';

interface ExamDetailViewProps {
  examId: ExamId;
  onNavigate: (view: string) => void;
}

export const ExamDetailView: React.FC<ExamDetailViewProps> = ({ examId, onNavigate }) => {
  const { language, examConfigs, postsData, vacanciesData, cutoffsData } = useApp();
  const config = examConfigs[examId] || examConfigs.cgl;

  // Selected pattern year (versioning)
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [activeTab, setActiveTab] = useState<'pattern' | 'syllabus' | 'eligibility' | 'posts' | 'notification'>('pattern');
  const [expandedStage, setExpandedStage] = useState<string>(config.stages[0]?.stageId || 'stage-0');

  // Filter posts related to this exam
  const examPosts = postsData.filter(p => p.exam === examId);
  const examVacancies = vacanciesData.filter(v => v.exam === examId);
  const examCutoffs = cutoffsData.filter(c => c.exam === examId);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: { en: 'Exams', hi: 'परीक्षाएं' }, view: 'dashboard' },
          { label: config.examName, view: `exam-${examId}` }
        ]}
        onNavigate={onNavigate}
      />

      {/* Exam Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 border border-blue-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
                {config.badge}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-800/80 text-blue-200 border border-blue-700">
                Official Exam Code: {config.examCode.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              {config.examName[language]}
            </h1>
            <p className="text-sm sm:text-base text-blue-200 mt-1 font-medium">
              {config.fullName[language]}
            </p>
          </div>

          {/* Version Switcher (Section 5 Requirement) */}
          <div className="flex-shrink-0 bg-slate-950/60 p-3 rounded-2xl border border-slate-700/80 backdrop-blur-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>{language === 'hi' ? 'परीक्षा पैटर्न संस्करण' : 'Exam Pattern Version'}</span>
              <span className="text-emerald-400 text-[10px]">● Live Data</span>
            </div>
            <div className="flex items-center gap-1.5">
              {['2024', '2025', '2026', 'Latest'].map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedYear === yr
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick CTA Actions */}
        <div className="mt-6 pt-6 border-t border-blue-800/70 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('practice')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>{language === 'hi' ? 'इस परीक्षा के प्रश्न हल करें' : 'Practice This Exam'}</span>
          </button>

          <button
            onClick={() => onNavigate('mock-tests')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all"
          >
            <Timer className="w-4 h-4" />
            <span>{language === 'hi' ? 'पूर्ण सीबीटी मॉक टेस्ट' : 'Full CBT Mock Test'}</span>
          </button>

          <button
            onClick={() => onNavigate('post-explorer')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>{language === 'hi' ? 'भर्ती पद एवं विभाग' : 'Posts & Departments'}</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap gap-1">
        {[
          { id: 'pattern', label: { en: 'Exam Pattern & Stages', hi: 'परीक्षा पैटर्न एवं चरण' } },
          { id: 'eligibility', label: { en: 'Eligibility & Age Limit', hi: 'पात्रता एवं आयु सीमा' } },
          { id: 'syllabus', label: { en: 'Detailed Syllabus', hi: 'विस्तृत पाठ्यक्रम' } },
          { id: 'posts', label: { en: `Posts (${examPosts.length})`, hi: `पद सूची (${examPosts.length})` } },
          { id: 'notification', label: { en: 'Official Notice & Dates', hi: 'आधिकारिक अधिसूचना' } }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label[language]}
          </button>
        ))}
      </div>

      {/* Tab 1: Exam Pattern & Stages */}
      {activeTab === 'pattern' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{language === 'hi' ? 'आधिकारिक अंकन योजना:' : 'Official Marking Scheme Rule:'} </span>
              {config.negativeMarking}. {language === 'hi' ? 'परीक्षा कंप्यूटर आधारित (CBT) माध्यम में वस्तुनिष्ठ बहुविकल्पीय प्रारूप पर आयोजित की जाती है।' : 'Conducted in Computer Based Test (CBT) mode with bilingual questions (English & Hindi) plus recognized regional languages.'}
            </div>
          </div>

          <div className="space-y-4">
            {config.stages.map((stg, sIdx) => {
              const isExpanded = expandedStage === stg.stageId;
              return (
                <div
                  key={stg.stageId}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setExpandedStage(isExpanded ? '' : stg.stageId)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 uppercase">
                          Stage {sIdx + 1}
                        </span>
                        {stg.qualifyingNature && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            {language === 'hi' ? 'क्वालिफाइंग' : 'Qualifying in Nature'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {stg.stageName[language]}
                      </h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        <span>⏱ {stg.duration}</span>
                        <span>•</span>
                        <span>{stg.totalQuestions} {language === 'hi' ? 'प्रश्न' : 'Questions'}</span>
                        <span>•</span>
                        <span>{stg.totalMarks} {language === 'hi' ? 'अंक' : 'Marks'}</span>
                        <span>•</span>
                        <span>{language === 'hi' ? 'नकारात्मक अंकन:' : 'Negative:'} {stg.negativeMarking}</span>
                      </div>
                    </div>

                    <div className="p-2 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        {language === 'hi' ? 'खंडवार विषय, प्रश्न एवं अंक तालिका' : 'Sectional Breakdown Table'}
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                              <th className="py-2.5 px-3">{language === 'hi' ? 'खंड / विषय' : 'Section / Module'}</th>
                              <th className="py-2.5 px-3 text-center">{language === 'hi' ? 'प्रश्न' : 'Questions'}</th>
                              <th className="py-2.5 px-3 text-center">{language === 'hi' ? 'अधिकतम अंक' : 'Max Marks'}</th>
                              <th className="py-2.5 px-3 text-center">{language === 'hi' ? 'नकारात्मक अंकन' : 'Negative'}</th>
                              <th className="py-2.5 px-3">{language === 'hi' ? 'समय सीमा' : 'Time Limit'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {stg.sections.map((sec, secIdx) => (
                              <tr key={secIdx} className="hover:bg-white dark:hover:bg-slate-900 transition-colors">
                                <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-slate-100">
                                  {sec.name[language]}
                                </td>
                                <td className="py-2.5 px-3 text-center font-mono font-semibold">{sec.questions}</td>
                                <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">{sec.marks}</td>
                                <td className="py-2.5 px-3 text-center font-mono text-red-500">
                                  {sec.negativePerWrong > 0 ? `-${sec.negativePerWrong}` : 'Nil'}
                                </td>
                                <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{sec.timeLimit || 'Sectional / Overall'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Eligibility & Age Limit */}
      {activeTab === 'eligibility' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>{language === 'hi' ? 'अनिवार्य शैक्षणिक योग्यता' : 'Educational Qualification'}</span>
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {config.eligibility.education[language]}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>{language === 'hi' ? 'आयु सीमा एवं छूट' : 'Age Limit & Relaxations'}</span>
            </h3>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-slate-500">{language === 'hi' ? 'सामान्य आयु सीमा:' : 'Standard Age Window:'}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {config.eligibility.ageMin} to {config.eligibility.ageMax} {language === 'hi' ? 'वर्ष' : 'Years'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-semibold">{language === 'hi' ? 'श्रेणीवार छूट:' : 'Category Relaxations:'} </span>
                {config.eligibility.ageRelaxation[language]}
              </div>
            </div>
          </div>

          {config.eligibility.physical && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-rose-500" />
                <span>{language === 'hi' ? 'शारीरिक मानक एवं पीईटी' : 'Physical Standards'}</span>
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {config.eligibility.physical[language]}
              </p>
            </div>
          )}

          {config.eligibility.skillReq && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-amber-500" />
                <span>{language === 'hi' ? 'कौशल / टाइपिंग आवश्यकता' : 'Skill / Typing Requirement'}</span>
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {config.eligibility.skillReq[language]}
              </p>
            </div>
          )}

          <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{language === 'hi' ? 'भूतपूर्व सैनिक (ESM) प्रावधान' : 'Ex-Servicemen (ESM) Provisions'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {config.eligibility.esmProvisions[language]}
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Detailed Syllabus */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.subjects.map((sub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {sub}
                  </h3>
                  <button
                    onClick={() => onNavigate('practice')}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    {language === 'hi' ? 'प्रश्न हल करें →' : 'Practice Topic →'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sub === 'Quantitative Aptitude' && 'Number Systems, Computation of Whole Numbers, Decimals, Fractions, Relationships between numbers, Percentage, Ratio & Proportion, Square roots, Averages, Interest (Simple and Compound), Profit and Loss, Discount, Partnership Business, Mixture and Alligation, Time and distance, Time & Work, Basic algebraic identities, Elementary surds, Graphs of Linear Equations, Triangle and its centers, Congruence and similarity, Circle, chords, tangents, Quadrilaterals, Regular Polygons, Right Prism, Right Circular Cone, Cylinder, Sphere, Hemispheres, Rectangular Parallelepiped, Regular Right Pyramid with triangular or square base, Trigonometric ratios, Degree and Radian Measures, Standard Identities, Complementary angles, Heights and Distances, Histogram, Frequency polygon, Bar diagram & Pie chart.'}
                  {sub === 'General Intelligence & Reasoning' && 'Analogies, similarities and differences, spatial visualization, spatial orientation, problem solving, analysis, judgment, decision making, visual memory, discriminating observation, relationship concepts, arithmetical reasoning and figural classification, arithmetic number series, non-verbal series, coding and decoding, statement conclusion, syllogistic reasoning.'}
                  {sub === 'English Language' && 'Vocabulary, English Grammar, Sentence Structure, Spot the Error, Fill in the Blanks, Synonyms, Antonyms, Spellings/Detecting misspelt words, Idioms & Phrases, One word substitution, Improvement of Sentences, Active/Passive Voice of Verbs, Conversion into Direct/Indirect narration, Shuffling of Sentence parts, Shuffling of Sentences in a passage, Cloze Passage, Comprehension Passage.'}
                  {sub === 'General Awareness' && 'History, Culture, Geography, Economic Scene, General Policy & Scientific Research, Current Affairs, Indian Constitution, Awards, Sports, Books, Important Days, General Science (Physics, Chemistry, Biology).'}
                  {sub === 'Computer Knowledge' && 'Computer Basics (Organization of a computer, CPU, Input/Output devices, Computer memory, Memory organization, Back- up devices, PORTs, Windows Explorer, Keyboard shortcuts), Software (Windows Operating system including basics of Microsoft Office like MS Word, MS Excel and Power Point etc.), Working with Internet and e-mails (Web Browsing & Searching, Downloading & Uploading, Managing an E-mail Account, e-Banking), Basics of networking and cyber security (Networking devices and protocols, Network and information security threats like hacking, virus, worms, Trojan etc. and preventive measures).'}
                  {sub === 'Engineering' && 'Civil / Electrical / Mechanical domain core engineering engineering concepts, design calculations, IS specifications, materials and machines.'}
                  {sub === 'General Hindi' && 'संधि, समास, उपसर्ग, प्रत्यय, पर्यायवाची, विलोम, मुहावरे एवं लोकोक्तियां, वाक्य शुद्धि, वर्तनी शुद्धि, अनेक शब्दों के लिए एक शब्द, रस, छंद, अलंकार एवं गद्यांश आधारित प्रश्न।'}
                  {sub === 'Statistics' && 'Collection, Classification and Presentation of Statistical Data, Measures of Central Tendency, Measures of Dispersion, Moments, Skewness and Kurtosis, Correlation and Regression, Probability Theory, Random Variable and Probability Distributions, Sampling Theory, Statistical Inference, Analysis of Variance, Time Series Analysis, Index Numbers.'}
                  {sub === 'Translation' && 'Translation from Hindi to English and English to Hindi of official administrative, legal, economic and parliamentary passages with precise terminology.'}
                  {sub === 'Shorthand' && 'Dictation transcription at 80 WPM (Grade D) and 100 WPM (Grade C) in English or Hindi on computer within stipulated transcription duration.'}
                  {sub === 'Typing' && 'Typing speed of 35 WPM in English or 30 WPM in Hindi on computer for Lower Division Clerk / JSA and 8000 key depressions per hour for DEO.'}
                  {sub === 'Physical Preparation' && 'Endurance training, distance running (5 km in 24 mins for GD, 1.6 km in 6.5 mins for CPO SI), sprint, high jump, long jump, shot put, height and chest expansion conditioning.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Posts & Departments */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'hi' ? `${config.examName[language]} के अंतर्गत भर्ती पद` : `Posts Recruited Through ${config.examName.en}`}
            </h3>
            <button
              onClick={() => onNavigate('post-explorer')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {language === 'hi' ? 'विस्तृत पद एक्सप्लोरर खोलें →' : 'Open Full Post Explorer →'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examPosts.map(p => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      Pay Level {p.payLevel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {p.payScale}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {p.postName[language]}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {p.department} ({p.ministry})
                  </p>

                  <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{language === 'hi' ? 'आयु सीमा:' : 'Age:'} </span>
                      {p.ageRequirement}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{language === 'hi' ? 'कार्य वातावरण:' : 'Work:'} </span>
                      {p.workEnvironment[language]}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 truncate max-w-[200px]">{p.officialSource}</span>
                  <button
                    onClick={() => onNavigate('post-preferences')}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {language === 'hi' ? '+ वरीयता में जोड़ें' : '+ Add Preference'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Official Notice & Dates */}
      {activeTab === 'notification' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'कर्मचारी चयन आयोग आधिकारिक अधिसूचना डेटा' : 'Staff Selection Commission Official Notice'}
                </h3>
                <p className="text-xs text-slate-500">
                  Ref: {config.officialNotification.notificationNumber}
                </p>
              </div>

              <a
                href={config.officialNotification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open ssc.gov.in'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-xs">{language === 'hi' ? 'अधिसूचना तिथि:' : 'Notification Date:'}</span>
                <span className="font-bold text-slate-900 dark:text-white">{config.officialNotification.notificationDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-xs">{language === 'hi' ? 'ऑनलाइन आवेदन अवधि:' : 'Application Window:'}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {config.officialNotification.applicationStart} to {config.officialNotification.applicationEnd}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-xs">{language === 'hi' ? 'संभावित परीक्षा विंडो:' : 'Exam Window:'}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{config.officialNotification.examDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-xs">{language === 'hi' ? 'संभावित रिक्तियां:' : 'Tentative Vacancies:'}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {config.officialNotification.tentativeVacancies.toLocaleString()} {language === 'hi' ? 'पद' : 'Posts'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 sm:col-span-2">
                <span className="text-slate-400 block text-xs">{language === 'hi' ? 'प्रामाणिक स्रोत:' : 'Official Authority Source:'}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{config.officialNotification.source}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
