import React, { useState } from 'react';
import { 
  Library, 
  Search, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  FileText 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface BooksLibraryViewProps {
  onNavigate: (view: string) => void;
}

export const BooksLibraryView: React.FC<BooksLibraryViewProps> = ({ onNavigate }) => {
  const { language, booksData } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const filteredBooks = booksData.filter(b => {
    if (selectedSubject !== 'all' && b.subject !== selectedSubject) return false;
    if (selectedExam !== 'all' && !b.exams.includes(selectedExam as any)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Resources', hi: 'संसाधन' }, view: 'dashboard' },
          { label: { en: 'Authentic Book Library', hi: 'प्रमाणित पुस्तक पुस्तकालय' } }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
            <Library className="w-3.5 h-3.5" />
            <span>100% Copyright Safe & Verified Publishers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी प्रामाणिक पुस्तक पुस्तकालय' : 'SSC Authentic Book Library'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'किरण, अरिहंत, पिनेकल, राकेश यादव एवं दिशा पब्लिकेशन्स की प्रामाणिक पुस्तकों का पाठ्यक्रम कवरेज, PYQ विश्लेषण एवं वैध लिंक।'
              : 'Detailed evaluation of legitimate prep books from established publishers mapped directly to official SSC topics.'}
          </p>
        </div>

        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-700 text-xs text-slate-300 max-w-xs self-start md:self-center">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'hi' ? 'कॉपीराइट सुरक्षा' : 'Anti-Piracy Pledge'}</span>
          </div>
          <p className="text-[11px] leading-tight text-slate-400">
            {language === 'hi'
              ? 'हम पाइरेटेड पीडीएफ का वितरण नहीं करते। केवल आधिकारिक प्रकाशकों एवं सत्यापित स्टोर के वैध लिंक दिए गए हैं।'
              : 'We strictly link only to legitimate publishers and official sellers. No pirated PDFs.'}
          </p>
        </div>
      </div>

      {/* Filter row */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center gap-3">
        <select
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी विषय (All Subjects)' : 'All Subjects'}</option>
          <option value="Quantitative Aptitude">Quantitative Aptitude</option>
          <option value="General Intelligence & Reasoning">General Intelligence & Reasoning</option>
          <option value="English Language">English Language</option>
          <option value="General Awareness">General Awareness</option>
          <option value="Engineering">Engineering (JE)</option>
        </select>

        <select
          value={selectedExam}
          onChange={e => setSelectedExam(e.target.value)}
          className="p-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
        >
          <option value="all">{language === 'hi' ? 'सभी परीक्षाएं (All Exams)' : 'All Exams'}</option>
          <option value="cgl">SSC CGL</option>
          <option value="chsl">SSC CHSL</option>
          <option value="mts">SSC MTS</option>
          <option value="gd">SSC GD</option>
          <option value="cpo">SSC CPO</option>
          <option value="je">SSC JE</option>
          <option value="stenographer">SSC Stenographer</option>
        </select>
      </div>

      {/* Books Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 uppercase">
                  {book.subject}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {book.publisher} • {book.edition}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {book.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                By {book.author}
              </p>

              {/* Coverage details */}
              <div className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {language === 'hi' ? 'पाठ्यक्रम कवरेज: ' : 'Syllabus Coverage: '}
                  </span>
                  {book.syllabusCoverage[language]}
                </div>

                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {language === 'hi' ? 'PYQ मात्रा: ' : 'PYQ Depth: '}
                  </span>
                  {book.pyqCoverage[language]} ({book.practiceQuantity})
                </div>

                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {language === 'hi' ? 'उपयुक्त पाठक: ' : 'Intended Aspirant: '}
                  </span>
                  {book.intendedLearner[language]}
                </div>
              </div>

              {/* Topic mapping pills */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  {language === 'hi' ? 'पाठ्यक्रम विषय मैपिंग:' : 'Mapped Syllabus Topics:'}
                </span>
                <div className="flex flex-wrap gap-1">
                  {book.mappingToSyllabus.topics.map((top, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchase & Official Links */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-400 font-medium">
                Difficulty: {book.difficulty}
              </span>

              <div className="flex items-center gap-2">
                {book.purchaseLinks.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    <span>{link.store}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
