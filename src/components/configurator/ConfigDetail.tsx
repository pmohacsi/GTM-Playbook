import { useState } from 'react';
import { ArrowLeft, Grid3X3, Layers, Users, Download, Trash2, Target, Calendar, Rocket, UserCheck } from 'lucide-react';
import { useGTMStore } from '../../store/gtmStore';
import { PHASES, STAKEHOLDERS } from "../../data/gtmData";
import type { Task, Phase } from '../../data/gtmData';
import { RoleBadge } from '../RoleBadge';
import { TaskDrawer } from '../TaskDrawer';

interface ConfigDetailProps {
  configId: string;
  onBack: () => void;
}

type ViewMode = 'matrix' | 'phases' | 'stakeholder';

const LAUNCH_TYPE_LABELS: Record<string, string> = {
  full: 'Full Launch',
  soft: 'Soft Launch',
  beta: 'Beta / Preview',
  internal: 'Internal Only',
};

export function ConfigDetail({ configId, onBack }: ConfigDetailProps) {
  const { getConfig, deleteConfig } = useGTMStore();
  const config = getConfig(configId);
  const [viewMode, setViewMode] = useState<ViewMode>('phases');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  if (!config) return null;

  const includedPhases = config.phases.filter(cp => cp.included);

  const getAssigneeName = (stakeholderId: string) => {
    const cs = config.stakeholders.find(s => s.stakeholderId === stakeholderId);
    return cs?.personName || '';
  };

  const isTaskIncluded = (phaseId: string, taskId: string) => {
    const cp = config.phases.find(p => p.phaseId === phaseId);
    return cp?.tasks.find(t => t.taskId === taskId)?.included ?? false;
  };

  // For a given phase, returns stakeholders who have a role AND are assigned a person in this config
  const getPhaseAssignees = (phaseId: string) => {
    return STAKEHOLDERS
      .filter(s => {
        const hasRole = s.phases.some(p => p.phaseId === phaseId);
        const isAssigned = !!getAssigneeName(s.id);
        return hasRole && isAssigned;
      })
      .map(s => ({
        stakeholder: s,
        role: s.phases.find(p => p.phaseId === phaseId)!.role,
        personName: getAssigneeName(s.id),
      }));
  };

  const hasFraming = config.initiativeOwner || config.productArea || config.targetAudience ||
    config.launchType || config.targetLaunchDate || config.successMetric;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
            All configurations
          </button>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed"
              title="Coming soon"
              disabled
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export to Jira</span>
            </button>
            <button
              onClick={() => { if (confirm('Delete this configuration?')) { deleteConfig(configId); onBack(); } }}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-900">{config.name}</h1>
        {config.description && <p className="text-sm text-gray-600 mt-0.5">{config.description}</p>}
      </div>

      {/* Framing / initiative parameters */}
      {hasFraming && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Initiative parameters</p>
          <div className="flex flex-wrap gap-3">
            {config.initiativeOwner && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Owner</p>
                  <p className="text-sm font-semibold text-gray-800">{config.initiativeOwner}</p>
                </div>
              </div>
            )}
            {config.productArea && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Rocket className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Product / Feature</p>
                  <p className="text-sm font-semibold text-gray-800">{config.productArea}</p>
                </div>
              </div>
            )}
            {config.targetAudience && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Users className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Target Audience</p>
                  <p className="text-sm font-semibold text-gray-800">{config.targetAudience}</p>
                </div>
              </div>
            )}
            {config.launchType && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Launch Type</p>
                  <p className="text-sm font-semibold text-gray-800">{LAUNCH_TYPE_LABELS[config.launchType] ?? config.launchType}</p>
                </div>
              </div>
            )}
            {config.targetLaunchDate && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Calendar className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Target Launch</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(config.targetLaunchDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
            {config.successMetric && (
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <Target className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">North Star</p>
                  <p className="text-sm font-semibold text-gray-800">{config.successMetric}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stakeholder chips */}
      {config.stakeholders.some(s => s.personName) && (
        <div className="flex flex-wrap gap-2 mb-5">
          {STAKEHOLDERS.map(s => {
            const name = getAssigneeName(s.id);
            if (!name) return null;
            return (
              <div key={s.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: s.bgColor, color: s.textColor }}>
                <span className="font-bold">{s.shortName}</span>
                {name}
              </div>
            );
          })}
        </div>
      )}

      {/* View toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
        {[
          { id: 'phases' as const, label: 'By Phase', icon: Layers },
          { id: 'matrix' as const, label: 'Matrix', icon: Grid3X3 },
          { id: 'stakeholder' as const, label: 'By Stakeholder', icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── PHASES VIEW ── */}
      {viewMode === 'phases' && (
        <div className="space-y-4">
          {includedPhases.map(cp => {
            const phase = PHASES.find(p => p.id === cp.phaseId)!;
            const includedTasks = phase.tasks.filter(t => isTaskIncluded(phase.id, t.id));
            const assignees = getPhaseAssignees(phase.id);
            return (
              <div key={cp.phaseId} className="border border-gray-300 rounded-xl overflow-hidden">
                {/* Phase header */}
                <div className="p-4" style={{ backgroundColor: phase.lightColor }}>
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: phase.color }}>
                      {phase.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm">{phase.name}</span>
                        <span className="text-xs text-gray-500">{includedTasks.length} task{includedTasks.length !== 1 ? 's' : ''}</span>
                      </div>
                      {/* Assignees for this phase */}
                      {assignees.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {assignees.map(({ stakeholder, role, personName }) => (
                            <div
                              key={stakeholder.id}
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/70 border border-white/80 text-xs"
                            >
                              <span
                                className="w-4 h-4 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                                style={{ backgroundColor: stakeholder.bgColor, color: stakeholder.textColor, fontSize: '8px' }}
                              >
                                {stakeholder.shortName}
                              </span>
                              <span className="font-medium text-gray-700">{personName}</span>
                              <RoleBadge role={role} size="sm" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Tasks */}
                <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                  {includedTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => { setSelectedTask(task); setSelectedPhase(phase); }}
                      className="flex items-start gap-2 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-left transition-colors text-sm text-gray-700 leading-snug"
                    >
                      {task.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MATRIX VIEW ── */}
      {viewMode === 'matrix' && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wide w-44 sticky left-0 bg-gray-50">
                  Stakeholder
                </th>
                {includedPhases.map(cp => {
                  const phase = PHASES.find(p => p.id === cp.phaseId)!;
                  return (
                    <th key={cp.phaseId} className="p-3 text-center min-w-[140px]">
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: phase.color }}>
                          {phase.number}
                        </span>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">{phase.name}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {STAKEHOLDERS.map((stakeholder, idx) => {
                const assignee = getAssigneeName(stakeholder.id);
                return (
                  <tr key={stakeholder.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className={`p-4 sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: stakeholder.bgColor, color: stakeholder.textColor }}>
                          {stakeholder.shortName}
                        </span>
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-gray-800 block leading-tight">{stakeholder.name}</span>
                          {assignee && <span className="text-xs text-gray-500">{assignee}</span>}
                        </div>
                      </div>
                    </td>
                    {includedPhases.map(cp => {
                      const phase = PHASES.find(p => p.id === cp.phaseId)!;
                      const phaseRole = stakeholder.phases.find(p => p.phaseId === phase.id);
                      return (
                        <td key={cp.phaseId} className="p-3 text-center">
                          {phaseRole && <RoleBadge role={phaseRole.role} size="sm" />}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── STAKEHOLDER VIEW ── */}
      {viewMode === 'stakeholder' && (
        <div className="space-y-3">
          {STAKEHOLDERS.map(stakeholder => {
            const assignee = getAssigneeName(stakeholder.id);
            return (
              <div key={stakeholder.id} className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                <div className="flex items-center gap-3 p-4" style={{ backgroundColor: stakeholder.bgColor }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: stakeholder.color }}>
                    {stakeholder.shortName}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{stakeholder.name}</span>
                    {assignee && <span className="text-xs text-gray-700 ml-2">→ {assignee}</span>}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    {includedPhases.map(cp => {
                      const phase = PHASES.find(p => p.id === cp.phaseId)!;
                      const phaseRole = stakeholder.phases.find(p => p.phaseId === phase.id);
                      if (!phaseRole) return null;
                      return (
                        <div key={cp.phaseId} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border border-gray-100">
                          <span className="font-bold" style={{ color: phase.color }}>{phase.number}</span>
                          <RoleBadge role={phaseRole.role} size="sm" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TaskDrawer
        task={selectedTask}
        phase={selectedPhase}
        onClose={() => { setSelectedTask(null); setSelectedPhase(null); }}
      />
    </div>
  );
}
