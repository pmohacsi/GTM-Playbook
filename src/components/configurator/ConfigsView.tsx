import { useState } from 'react';
import { Plus, ChevronRight, Calendar, Layers, Rocket, UserCheck, Target, Pencil, Trash2 } from 'lucide-react';
import { useGTMStore } from '../../store/gtmStore';
import { PHASES } from '../../data/gtmData';
import { ConfiguratorWizard } from './ConfiguratorWizard';
import { ConfigDetail } from './ConfigDetail';

const LAUNCH_TYPE_LABELS: Record<string, string> = {
  full: 'Full Launch',
  soft: 'Soft Launch',
  beta: 'Beta / Preview',
  internal: 'Internal Only',
};

export function ConfigsView() {
  const { configs, deleteConfig } = useGTMStore();
  const [showWizard, setShowWizard] = useState(false);
  const [editingConfigId, setEditingConfigId] = useState<string | null>(null);
  const [viewingConfigId, setViewingConfigId] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteConfig(id);
    }
  };

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEditingConfigId(id);
  };

  if (viewingConfigId) {
    return (
      <ConfigDetail
        configId={viewingConfigId}
        onBack={() => setViewingConfigId(null)}
      />
    );
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">

      {/* Page header + explanation */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">GTM Initiative Configurator</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Create a named GTM plan for a specific initiative. Define the framing (who owns it, what's going to market, who it's for), assign people to stakeholder roles, and select the phases and tasks that apply. Each saved configuration is a standalone GTM brief you can share, review, and — soon — export to Jira.
          </p>
        </div>
        <button
          onClick={() => setShowWizard(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          New GTM Initiative
        </button>
      </div>

      {/* Why this exists — explainer callout */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 mb-8 flex gap-4 items-start">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Layers className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-900 mb-1">Why create a GTM configuration?</p>
          <p className="text-sm text-indigo-700 leading-relaxed">
            Not every GTM initiative needs the same effort or scope. A broad market launch looks very different from an internal enablement rollout or a beta. Our configurator lets you define exactly <em>what applies</em> to a given initiative — which phases of our framework, which tasks, and who is accountable — so the team has a shared, explicit plan rather than a set of assumptions. Once configured, it becomes the single source of truth you can walk through in a GTM Roundtable and eventually push as Jira tickets.
          </p>
        </div>
      </div>

      {configs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No configurations yet</h3>
          <p className="text-gray-600 text-sm mb-6 max-w-sm">
            Create your first GTM initiative — give it a name, define the framing, assign stakeholders, and select the relevant phases and tasks.
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create your first GTM initiative
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {configs.map(config => {
            const includedPhaseCount = config.phases.filter(p => p.included).length;
            const totalTaskCount = config.phases
              .filter(p => p.included)
              .reduce((sum, p) => sum + p.tasks.filter(t => t.included).length, 0);
            const assignedCount = config.stakeholders.filter(s => s.personName).length;

            return (
              <div
                key={config.id}
                onClick={() => setViewingConfigId(config.id)}
                className="text-left p-5 bg-white border border-gray-300 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{config.name}</h3>
                    {config.description && (
                      <p className="text-sm text-gray-600 mt-0.5 truncate">{config.description}</p>
                    )}
                  </div>
                  {/* Right side: action buttons (hover) + chevron */}
                  <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
                    <button
                      onClick={(e) => handleEdit(e, config.id)}
                      title="Edit initiative"
                      className="p-1.5 rounded-lg text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, config.id, config.name)}
                      title="Delete initiative"
                      className="p-1.5 rounded-lg text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>

                {/* Phase mini-bar */}
                <div className="flex gap-1 mb-3">
                  {PHASES.map(phase => {
                    const cp = config.phases.find(p => p.phaseId === phase.id);
                    return (
                      <div
                        key={phase.id}
                        className="flex-1 h-1.5 rounded-full"
                        style={{ backgroundColor: cp?.included ? phase.color : '#e5e7eb' }}
                      />
                    );
                  })}
                </div>

                {/* Framing quick-view */}
                <div className="space-y-1.5 mb-3">
                  {config.initiativeOwner && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <UserCheck className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                      <span className="truncate">{config.initiativeOwner}</span>
                    </div>
                  )}
                  {config.productArea && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Rocket className="w-3 h-3 text-violet-400 flex-shrink-0" />
                      <span className="truncate">{config.productArea}</span>
                    </div>
                  )}
                  {config.successMetric && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Target className="w-3 h-3 text-rose-400 flex-shrink-0" />
                      <span className="truncate">{config.successMetric}</span>
                    </div>
                  )}
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    {includedPhaseCount} phases · {totalTaskCount} tasks
                  </span>
                  {config.launchType && (
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                      {LAUNCH_TYPE_LABELS[config.launchType]}
                    </span>
                  )}
                  {config.targetLaunchDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(config.targetLaunchDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  {assignedCount > 0 && (
                    <span>{assignedCount} assigned</span>
                  )}
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setShowWizard(true)}
            className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-gray-500 hover:text-indigo-500 min-h-[140px]"
          >
            <Plus className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">New GTM Initiative</span>
          </button>
        </div>
      )}

      {showWizard && (
        <ConfiguratorWizard
          onComplete={(id) => { setShowWizard(false); setViewingConfigId(id); }}
          onCancel={() => setShowWizard(false)}
        />
      )}

      {editingConfigId && (
        <ConfiguratorWizard
          editConfigId={editingConfigId}
          onComplete={(id) => { setEditingConfigId(null); setViewingConfigId(id); }}
          onCancel={() => setEditingConfigId(null)}
        />
      )}
    </div>
  );
}
