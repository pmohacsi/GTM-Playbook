import type { } from 'react';
import { Grid3X3, Layers, Users } from 'lucide-react';
import { MatrixView } from './MatrixView';
import { PhaseView } from './PhaseView';
import { StakeholderView } from './StakeholderView';

type ViewMode = 'matrix' | 'phases' | 'stakeholder';

interface ExploreViewProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ExploreView({ viewMode, onViewModeChange }: ExploreViewProps) {

  const tabs: { id: ViewMode; label: string; icon: typeof Grid3X3; description: string }[] = [
    { id: 'matrix', label: 'Full Matrix', icon: Grid3X3, description: 'Overview of all stakeholders across all phases' },
    { id: 'phases', label: 'By Phase', icon: Layers, description: 'Deep-dive each phase: goals, tasks, roles' },
    { id: 'stakeholder', label: 'By Stakeholder', icon: Users, description: 'See our GTM journey from each team\'s perspective' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <h1 className="text-2xl font-bold text-gray-900">Our GTM Process</h1>
        <p className="text-gray-600 text-sm mt-1 mb-5">
          Explore our 6-phase GTM framework — who does what, when, and why.
        </p>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onViewModeChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'matrix' && <MatrixView />}
      {viewMode === 'phases' && <PhaseView />}
      {viewMode === 'stakeholder' && <StakeholderView />}
    </div>
  );
}
