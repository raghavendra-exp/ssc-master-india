import React from 'react';
import { 
  Bell, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Clock 
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface UpdatesViewProps {
  onNavigate: (view: string) => void;
}

export const UpdatesView: React.FC<UpdatesViewProps> = ({ onNavigate }) => {
  const { language, updatesData, examConfigs } = useApp();

  const calendarEvents = [
    { exam: 'SSC CGL 2026', notifDate: '11-06-2026', closeDate: '10-07-2026', examWindow: 'Sep-Oct 2026', status: 'Active' },
    { exam: 'SSC CHSL 2026', notifDate: '08-04-2026', closeDate: '07-05-2026', examWindow: 'July 2026', status: 'Upcoming Stage' },
    { exam: 'SSC MTS & Havaldar 2026', notifDate: '27-06-2026', closeDate: '31-07-2026', examWindow: 'Oct-Nov 2026', status: 'Scheduled' },
    { exam: 'SSC GD Constable 2026', notifDate: '27-08-2026', closeDate: '05-10-2026', examWindow: 'Jan-Feb 2027', status: 'Application Active' },
    { exam: 'SSC CPO Sub-Inspector 2026', notifDate: '04-03-2026', closeDate: '29-03-2026', examWindow: 'June 2026', status: 'PET Pending' },
    { exam: 'SSC JE 2026', notifDate: '28-03-2026', closeDate: '18-04-2026', examWindow: 'June 2026', status: 'Paper-II Scheduled' },
    { exam: 'SSC Stenographer 2026', notifDate: '26-07-2026', closeDate: '24-08-2026', examWindow: 'Nov-Dec 2026', status: 'Scheduled' },
    { exam: 'SSC JHT / SHT 2026', notifDate: '02-08-2026', closeDate: '25-08-2026', examWindow: 'Oct-Nov 2026', status: 'Scheduled' }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: { en: 'Updates', hi: 'अपडेट' }, view: 'dashboard' },
          { label: { en: 'Official Updates & Annual Calendar', hi: 'आधिकारिक सूचनाएं एवं वार्षिक कैलेंडर' } }
        ]}
        onNavigate={onNavigate}
      />

      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-red-900/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Staff Selection Commission Official Gazette Updates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'hi' ? 'एसएससी लाइव अपडेट एवं वार्षिक परीक्षा कैलेंडर' : 'SSC Live Updates & Annual Calendar'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {language === 'hi'
              ? 'आधिकारिक पोर्टल (ssc.gov.in) से सत्यापित नवीनतम सूचनाएं, परीक्षा कार्यक्रम, आवेदन तिथियां एवं परिणाम नोटिस।'
              : 'Direct verified feeds from ssc.gov.in including examination schedules, admit card links, and recruitment circulars.'}
          </p>
        </div>

        <a
          href="https://ssc.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md self-start md:self-center"
        >
          <span>Official ssc.gov.in Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Annual Calendar Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>{language === 'hi' ? 'एसएससी वार्षिक परीक्षा कैलेंडर 2026-27' : 'SSC Annual Examination Calendar 2026-27'}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                <th className="py-3 px-3">Examination Name</th>
                <th className="py-3 px-3">Notification Date</th>
                <th className="py-3 px-3">Closing Date</th>
                <th className="py-3 px-3">Exam Schedule</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {calendarEvents.map((ev, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{ev.exam}</td>
                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{ev.notifDate}</td>
                  <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{ev.closeDate}</td>
                  <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">{ev.examWindow}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {language === 'hi' ? 'आधिकारिक सूचना फीड' : 'Official Notice Archive'}
        </h2>

        {updatesData.map(u => (
          <div
            key={u.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 font-semibold">
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 uppercase text-[10px]">
                  {u.exam.toUpperCase()}
                </span>
                <span>{u.date}</span>
                <span className="text-emerald-600 dark:text-emerald-400">● Official Verified</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {u.title[language]}
              </h3>
            </div>

            <a
              href={u.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors"
            >
              <span>{u.linkText[language]}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
