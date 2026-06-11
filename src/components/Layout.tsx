import type { ReactNode } from 'react';
import { Map, Settings, ChevronRight, BookOpen, MessageSquare, FlaskConical } from 'lucide-react';

type Tab = 'about' | 'explore' | 'configs';

interface LayoutProps {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const NAV_ITEMS: { tab: Tab; label: string; icon: typeof BookOpen }[] = [
  { tab: 'about',   label: 'What is GTM?',               icon: BookOpen  },
  { tab: 'explore', label: 'Explore Process',             icon: Map       },
  { tab: 'configs', label: 'GTM Initiative Configurator', icon: Settings  },
];

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Concept banner — full width, above everything */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2.5 text-sm text-amber-800">
          <FlaskConical className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>
            <span className="font-semibold">This is a concept.</span>
            {' '}Content and structure are open for review — feedback is very welcome.
          </span>
        </div>
        <a
          href="https://miro.com/app/board/uXjVHHf0z04=/?share_link_id=87082451748"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Leave feedback on Miro
        </a>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
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
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
