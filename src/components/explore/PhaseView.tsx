import { useState } from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { PHASES, STAKEHOLDERS } from "../../data/gtmData";
import type { Task, Phase } from '../../data/gtmData';
import { RoleBadge } from '../RoleBadge';
import { TaskDrawer } from '../TaskDrawer';

export function PhaseView() {
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set(['phase1']));
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  const togglePhase = (id: string) => {
    setOpenPhases(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 space-y-4">
      {PHASES.map(phase => {
        const isOpen = openPhases.has(phase.id);
        return (
          <div
            key={phase.id}
            className="border border-gray-300 rounded-xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => togglePhase(phase.id)}
              className="w-full text-left flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: phase.color }}
              >
                {phase.number}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: phase.lightColor, color: phase.color }}
                  >
                    {phase.tasks.length} tasks
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5 truncate">{phase.essence}</p>
              </div>
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="border-t border-gray-200">
                {/* Goal & roles */}
                <div className="grid grid-cols-2 gap-0 border-b border-gray-200">
                  <div className="p-5" style={{ backgroundColor: phase.lightColor }}>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Goal</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{phase.goal}</p>
                  </div>
                  <div className="p-5 bg-white border-l border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Stakeholder Roles</p>
                    <div className="flex flex-col gap-2">
                      {STAKEHOLDERS.map(s => {
                        const pr = s.phases.find(p => p.phaseId === phase.id);
                        if (!pr) return null;
                        return (
                          <div key={s.id} className="flex items-center justify-between gap-2">
                            <span className="text-xs text-gray-700 truncate">{s.name}</span>
                            <RoleBadge role={pr.role} size="sm" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="p-5 bg-white">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    Key Tasks — click to learn more
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {phase.tasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => { setSelectedTask(task); setSelectedPhase(phase); }}
                        className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-left transition-colors group"
                      >
                        <Info className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 flex-shrink-0 mt-0.5 transition-colors" />
                        <span className="text-sm text-gray-700 leading-snug">{task.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <TaskDrawer
        task={selectedTask}
        phase={selectedPhase}
        onClose={() => { setSelectedTask(null); setSelectedPhase(null); }}
      />
    </div>
  );
}
