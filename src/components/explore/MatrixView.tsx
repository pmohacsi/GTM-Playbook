import { useState, useRef, useEffect } from 'react';
import { PHASES, STAKEHOLDERS } from '../../data/gtmData';
import type { Task, Phase } from '../../data/gtmData';
import { RoleBadge } from '../RoleBadge';
import { TaskDrawer } from '../TaskDrawer';
import { ChevronDown, ChevronUp, Info, List, Filter, X } from 'lucide-react';

export function MatrixView() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [tappedCell, setTappedCell] = useState<string | null>(null);

  const handleCellTap = (key: string) => {
    setTappedCell(prev => prev === key ? null : key);
  };

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  };
  const [filteredStakeholderId, setFilteredStakeholderId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const visibleStakeholders = filteredStakeholderId
    ? STAKEHOLDERS.filter(s => s.id === filteredStakeholderId)
    : STAKEHOLDERS;
  const isSingleView = filteredStakeholderId !== null;


  const ownershipAreas = [
    { stakeholderId: 'product-management',  area: 'Product scope, customer problem, roadmap context' },
    { stakeholderId: 'product-marketing',   area: 'Positioning, messaging, GTM design, launch logic' },
    { stakeholderId: 'marketing-creative',  area: 'Campaign execution, channels, creative output' },
    { stakeholderId: 'sales-enablement',    area: 'Sales readiness, sales playbook, pitch, objection handling' },
    { stakeholderId: 'sales',               area: 'Sales conversations, pipeline impact' },
    { stakeholderId: 'product-enablement',  area: 'Internal product understanding, product knowledge transfer' },
    { stakeholderId: 'customer-success',    area: 'Adoption, onboarding, existing customer success' },
    { stakeholderId: 'journey-design',            area: 'Customer journey coherence, touchpoints, experience gaps' },
    { stakeholderId: 'release-program-management', area: 'Release governance, timeline, milestones, dependency management, readiness orchestration' },
    { stakeholderId: 'portfolio-leadership',        area: 'Business priority, portfolio alignment, strategic intent, investment context, executive expectation setting' },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* GTM definition */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4">
        <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-1.5">GTM Initiative</p>
        <p className="text-sm text-indigo-900 leading-relaxed">
          A dedicated, time-bound GTM workstream associated with a specific product, version, capability, or offering change.
        </p>
        <p className="text-xs text-indigo-600 leading-relaxed mt-2 italic">
          Each major launch, capability introduction, or offering change can trigger its own GTM initiative — with a defined scope, target audience, message, readiness needs, launch activities, and measurable customer, sales, adoption, or behavioral-change goals.
        </p>
      </div>

      {/* Stakeholder ownership block */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Stakeholder ownership areas</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {ownershipAreas.map(({ stakeholderId, area }) => {
            const s = STAKEHOLDERS.find(s => s.id === stakeholderId)!;
            return (
              <div key={stakeholderId} className="flex items-start gap-3 p-4">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: s.bgColor, color: s.textColor }}
                >
                  {s.shortName}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight mb-0.5">{s.name}</p>
                  <p className="text-sm text-gray-600 leading-snug">{area}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase cards — side by side */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">The 6 phases of our GTM process</h2>
          <p className="text-xs text-gray-500 mt-0.5">Expand tasks and click any task for details</p>
        </div>
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
          const isExpanded = showAllTasks || expandedPhases.has(phase.id);
          return (
            <div
              key={phase.id}
              className="border border-gray-300 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Card header */}
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
                <p className="text-sm text-gray-600 leading-snug">{phase.essence}</p>
              </div>

              {/* Goal */}
              <div className="px-3 py-2 bg-white border-t border-gray-200 flex-1">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Goal</p>
                <p className="text-sm text-gray-700 leading-snug">{phase.goal}</p>
              </div>

              {/* Tasks count indicator — clickable toggle */}
              <button
                onClick={() => togglePhaseExpand(phase.id)}
                className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-medium text-gray-500 transition-colors w-full text-left"
              >
                <span>{phase.tasks.length} tasks</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

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

      {/* Matrix — filter + table */}
      <div className="space-y-3">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Stakeholder × phase matrix</h2>
            <p className="text-xs text-gray-500 mt-0.5">Filter to a single stakeholder for inline descriptions · hover or tap any cell for details</p>
          </div>
        </div>

        {/* Stakeholder filter — compact dropdown */}
        <div className="flex items-center justify-end" ref={dropdownRef}>
          <div className="relative">
            {/* Trigger button */}
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                filteredStakeholderId
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {filteredStakeholderId
                ? (() => { const s = STAKEHOLDERS.find(s => s.id === filteredStakeholderId)!; return s.name; })()
                : 'Filter by stakeholder'}
              {filteredStakeholderId
                ? <span
                    onClick={e => { e.stopPropagation(); setFilteredStakeholderId(null); }}
                    className="ml-1 hover:text-red-500 transition-colors cursor-pointer"
                  ><X className="w-3 h-3" /></span>
                : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-xl border border-gray-200 shadow-lg z-30 py-1 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Show single stakeholder</p>
                </div>
                {STAKEHOLDERS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setFilteredStakeholderId(filteredStakeholderId === s.id ? null : s.id); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left ${
                      filteredStakeholderId === s.id
                        ? 'bg-indigo-50 text-indigo-800'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: s.bgColor, color: s.textColor }}
                    >
                      {s.shortName}
                    </span>
                    {s.name}
                    {filteredStakeholderId === s.id && <span className="ml-auto text-indigo-500">✓</span>}
                  </button>
                ))}
                {filteredStakeholderId && (
                  <>
                    <div className="border-t border-gray-200 mt-1" />
                    <button
                      onClick={() => { setFilteredStakeholderId(null); setDropdownOpen(false); }}
                      className="w-full px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-left transition-colors"
                    >
                      Show all stakeholders
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wide w-44 sticky left-0 bg-gray-50 z-10">
                  Stakeholder
                </th>
                {PHASES.map(phase => (
                  <th key={phase.id} className={`p-3 text-center ${isSingleView ? 'min-w-[200px]' : 'min-w-[140px]'}`}>
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: phase.color }}
                      >
                        {phase.number}
                      </span>
                      <span className="text-xs font-medium text-gray-700 leading-tight text-center">
                        {phase.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleStakeholders.map((stakeholder, idx) => (
                <tr
                  key={stakeholder.id}
                  className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className={`p-4 sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <div className="flex items-center gap-2 group/row">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: stakeholder.bgColor, color: stakeholder.textColor }}
                      >
                        {stakeholder.shortName}
                      </span>
                      <span className="text-sm font-medium text-gray-800 leading-tight flex-1">
                        {stakeholder.name}
                      </span>
                      <button
                        onClick={() => setFilteredStakeholderId(
                          filteredStakeholderId === stakeholder.id ? null : stakeholder.id
                        )}
                        title={filteredStakeholderId === stakeholder.id ? 'Show all' : 'Filter to this stakeholder'}
                        className={`opacity-0 group-hover/row:opacity-100 transition-opacity flex-shrink-0 p-1 rounded-md ${
                          filteredStakeholderId === stakeholder.id
                            ? 'text-indigo-600 bg-indigo-50 opacity-100'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {filteredStakeholderId === stakeholder.id
                          ? <X className="w-3 h-3" />
                          : <Filter className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  {PHASES.map(phase => {
                    const phaseRole = stakeholder.phases.find(p => p.phaseId === phase.id);
                    return (
                      <td key={phase.id} className={`${isSingleView ? 'p-4' : 'p-3'}`}>
                        {isSingleView ? (
                          /* Single stakeholder — inline description */
                          phaseRole && (
                            <div className="flex flex-col gap-1.5">
                              <RoleBadge role={phaseRole.role} size="sm" />
                              <p className="text-xs text-gray-600 leading-snug">{phaseRole.description}</p>
                            </div>
                          )
                        ) : (
                          /* All stakeholders — hover (desktop) or tap (mobile) tooltip */
                          (() => {
                            const cellKey = `${stakeholder.id}-${phase.id}`;
                            const isTapped = tappedCell === cellKey;
                            return (
                              <div
                                className="flex flex-col items-center gap-1.5 group relative cursor-pointer"
                                onClick={() => phaseRole && handleCellTap(cellKey)}
                              >
                                {phaseRole && (
                                  <>
                                    <RoleBadge role={phaseRole.role} size="sm" />
                                    <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 bg-gray-900 text-white text-xs rounded-lg p-2.5 transition-opacity z-20 shadow-xl ${
                                      isTapped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100'
                                    }`}>
                                      <div className="font-medium mb-1" style={{ color: phase.color === '#6366f1' ? '#a5b4fc' : phase.color }}>
                                        {phase.name}
                                      </div>
                                      {phaseRole.description}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TaskDrawer
        task={selectedTask}
        phase={selectedPhase}
        onClose={() => { setSelectedTask(null); setSelectedPhase(null); }}
      />
    </div>
  );
}
