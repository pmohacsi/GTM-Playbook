import { useState } from 'react';
import { Info, ChevronDown, ChevronUp, List } from 'lucide-react';
import { PHASES, STAKEHOLDERS } from '../../data/gtmData';
import type { Task, Phase } from '../../data/gtmData';
import { RoleBadge } from '../RoleBadge';
import { TaskDrawer } from '../TaskDrawer';

export function StakeholderView() {
  const [selectedStakeholderId, setSelectedStakeholderId] = useState(STAKEHOLDERS[0].id);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const stakeholder = STAKEHOLDERS.find(s => s.id === selectedStakeholderId)!;

  return (
    <div className="p-6">
      {/* Stakeholder selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STAKEHOLDERS.map(s => (
          <button
            key={s.id}
            onClick={() => { setSelectedStakeholderId(s.id); setShowAllTasks(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all"
            style={
              s.id === selectedStakeholderId
                ? { backgroundColor: s.color, color: 'white', borderColor: s.color }
                : { backgroundColor: 'white', color: '#374151', borderColor: '#e5e7eb' }
            }
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={
                s.id === selectedStakeholderId
                  ? { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }
                  : { backgroundColor: s.bgColor, color: s.textColor }
              }
            >
              {s.shortName}
            </span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Stakeholder banner */}
      <div
        className="rounded-xl p-4 flex items-center gap-4 mb-5"
        style={{ backgroundColor: stakeholder.bgColor }}
      >
        <span
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: stakeholder.color }}
        >
          {stakeholder.shortName}
        </span>
        <div>
          <h2 className="font-bold text-gray-900 text-lg">{stakeholder.name}</h2>
          <p className="text-sm text-gray-700">GTM journey across all 6 phases</p>
        </div>
      </div>

      {/* Phase cards — side by side */}
      <div className="flex items-center justify-end mb-1">
        <button
          onClick={() => setShowAllTasks(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            showAllTasks
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          {showAllTasks ? 'Hide tasks' : 'Show tasks'}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {PHASES.map(phase => {
          const phaseRole = stakeholder.phases.find(p => p.phaseId === phase.id);
          if (!phaseRole) return null;
          const isExpanded = showAllTasks;

          return (
            <div
              key={phase.id}
              className="border border-gray-300 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Phase header */}
              <div className="p-3" style={{ backgroundColor: phase.lightColor }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.number}
                  </span>
                  <span className="text-xs font-semibold text-gray-800 leading-tight">{phase.name}</span>
                </div>
                <div className="mt-1">
                  <RoleBadge role={phaseRole.role} size="sm" />
                </div>
              </div>

              {/* Role description */}
              <div className="px-3 py-2 bg-white border-t border-gray-200 flex-1">
                <p className="text-sm text-gray-600 leading-snug">{phaseRole.description}</p>
              </div>

              {/* Tasks count indicator */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50 text-xs font-medium text-gray-500">
                <span>{phase.tasks.length} tasks</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {/* Tasks list — collapsible */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-white p-2 flex flex-col gap-1">
                  {phase.tasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => { setSelectedTask(task); setSelectedPhase(phase); }}
                      className="flex items-start gap-1.5 p-1.5 rounded-lg hover:bg-gray-50 text-left transition-colors group w-full"
                    >
                      <Info className="w-3 h-3 text-gray-300 group-hover:text-gray-600 flex-shrink-0 mt-0.5 transition-colors" />
                      <span className="text-sm text-gray-700 leading-snug">{task.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <TaskDrawer
        task={selectedTask}
        phase={selectedPhase}
        onClose={() => { setSelectedTask(null); setSelectedPhase(null); }}
      />
    </div>
  );
}
