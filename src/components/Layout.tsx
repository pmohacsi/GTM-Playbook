import type { ReactNode } from 'react';
import { Map, Settings, ChevronRight, BookOpen, MessageSquare, FlaskConical } from 'lucide-react';

type Tab = 'about' | 'explore' | 'configs';

interface LayoutProps {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  miroLink: string;
}

const NAV_ITEMS: { tab: Tab; label: string; shortLabel: string; icon: typeof BookOpen }[] = [
  { tab: 'about',   label: 'What is GTM?',               shortLabel: 'What is GTM?', icon: BookOpen },
  { tab: 'explore', label: 'Explore Process',             shortLabel: 'Explore',      icon: Map      },
  { tab: 'configs', label: 'GTM Initiative Configurator', shortLabel: 'Configurator', icon: Settings },
];

export function Layout({ children, activeTab, onTabChange, miroLink }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* Concept banner — sticky */}
      <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 px-4 py-2 md:px-6 md:py-2.5 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 text-xs md:text-sm text-amber-800 min-w-0">
          <FlaskConical className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 flex-shrink-0" />
          <span className="truncate">
            <span className="font-semibold">This is a concept.</span>
            <span className="hidden sm:inline"> Content and structure are open for review — feedback is very welcome.</span>
          </span>
        </div>
        <a
          href={miroLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Leave </span>feedback<span className="hidden sm:inline"> on Miro</span>
        </a>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex w-56 flex-shrink-0 bg-white border-r border-gray-200 flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">GTM Playbook</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1 p-3 flex-1">
            {NAV_ITEMS.map(({ tab, label, icon: Icon }) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${activeTab === tab ? 'text-indigo-500' : 'text-gray-400'}`} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto pb-20 md:pb-0">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center gap-2.5 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center flex-shrink-0">
              <ChevronRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-gray-900 text-sm">GTM Playbook</span>
          </div>

          {children}
        </main>
      </div>

      {/* Bottom tab bar — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex">
        {NAV_ITEMS.map(({ tab, shortLabel, icon: Icon }) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className={`w-5 h-5 ${activeTab === tab ? 'text-indigo-600' : 'text-gray-400'}`} />
            {shortLabel}
            {activeTab === tab && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
