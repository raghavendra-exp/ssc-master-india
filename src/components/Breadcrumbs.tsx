import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export interface BreadcrumbItem {
  label: { en: string; hi: string };
  view?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (view: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  const { language } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="mb-4 overflow-x-auto whitespace-nowrap py-1">
      <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <li className="flex items-center">
          <button
            onClick={() => onNavigate && onNavigate('dashboard')}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'होम' : 'Home'}</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              {isLast || !item.view ? (
                <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[200px] sm:max-w-none">
                  {item.label[language]}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    else if (item.view && onNavigate) onNavigate(item.view);
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label[language]}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
