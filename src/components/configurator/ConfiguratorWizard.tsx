import { useState } from 'react';
import { useGTMStore } from "../../store/gtmStore";
import type { ConfiguredPhase, LaunchType } from '../../store/gtmStore';
import { PHASES, STAKEHOLDERS } from '../../data/gtmData';
import { Check, ChevronRight, X, Info } from 'lucide-react';

interface WizardProps {
  onComplete: (id: string) => void;
  onCancel: () => void;
  editConfigId?: string;
}

const LAUNCH_TYPE_OPTIONS: { value: LaunchType; label: string; description: string }[] = [
  { value: 'full',     label: 'Full Launch',     description: 'Broad public release with full GTM activation' },
  { value: 'soft',     label: 'Soft Launch',     description: 'Limited rollout, controlled visibility' },
  { value: 'beta',     label: 'Beta / Preview',  description: 'Early access for selected customers or partners' },
  { value: 'internal', label: 'Internal Only',   description: 'Sales, CS or partner enablement — no external comms' },
];

export function ConfiguratorWizard({ onComplete, onCancel, editConfigId }: WizardProps) {
  const { createConfig, updateConfig, getConfig } = useGTMStore();
  const isEditing = !!editConfigId;
  const existing = editConfigId ? getConfig(editConfigId) : undefined;

  const [step, setStep] = useState(1);
  const [configId, setConfigId] = useState<string | null>(editConfigId ?? null);

  // Step 1 — identity & framing (pre-populated when editing)
  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [initiativeOwner, setInitiativeOwner] = useState(existing?.initiativeOwner ?? '');
  const [productArea, setProductArea] = useState(existing?.productArea ?? '');
  const [targetAudience, setTargetAudience] = useState(existing?.targetAudience ?? '');
  const [launchType, setLaunchType] = useState<LaunchType>(existing?.launchType ?? '');
  const [targetLaunchDate, setTargetLaunchDate] = useState(existing?.targetLaunchDate ?? '');
  const [successMetric, setSuccessMetric] = useState(existing?.successMetric ?? '');

  // Step 2 — person names (pre-populated when editing)
  const [personNames, setPersonNames] = useState<Record<string, string>>(() => {
    if (!existing) return {};
    return Object.fromEntries(existing.stakeholders.map(s => [s.stakeholderId, s.personName]));
  });

  // Step 3 — phase/task selection (pre-populated when editing)
  const [phases, setPhases] = useState<ConfiguredPhase[]>(() => {
    if (existing) return existing.phases;
    return PHASES.map(phase => ({
      phaseId: phase.id,
      included: true,
      tasks: phase.tasks.map(task => ({ taskId: task.id, included: true })),
    }));
  });

  const handleStep1Next = () => {
    if (!name.trim()) return;
    const fields = {
      name: name.trim(),
      description: description.trim(),
      initiativeOwner: initiativeOwner.trim(),
      productArea: productArea.trim(),
      targetAudience: targetAudience.trim(),
      launchType,
      targetLaunchDate,
      successMetric: successMetric.trim(),
    };
    if (isEditing && configId) {
      updateConfig(configId, fields);
    } else {
      const id = createConfig(fields);
      setConfigId(id);
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!configId) return;
    const stakeholders = STAKEHOLDERS.map(s => ({
      stakeholderId: s.id,
      personName: personNames[s.id] || '',
    }));
    updateConfig(configId, { stakeholders });
    setStep(3);
  };

  const handleStep3Next = () => {
    if (!configId) return;
    updateConfig(configId, { phases, status: 'active' });
    setStep(4);
  };

  const handleFinish = () => {
    if (configId) onComplete(configId);
  };

  const togglePhase = (phaseId: string) => {
    setPhases(prev => prev.map(p =>
      p.phaseId === phaseId ? { ...p, included: !p.included } : p
    ));
  };

  const toggleTask = (phaseId: string, taskId: string) => {
    setPhases(prev => prev.map(p =>
      p.phaseId === phaseId
        ? { ...p, tasks: p.tasks.map(t => t.taskId === taskId ? { ...t, included: !t.included } : t) }
        : p
    ));
  };

  const steps = [
    { number: 1, label: 'Initiative details' },
    { number: 2, label: 'Stakeholders' },
    { number: 3, label: 'Phases & Tasks' },
    { number: 4, label: 'Review' },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            {isEditing ? 'Edit GTM Initiative' : 'New GTM Initiative'}
          </h2>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${step === s.number ? 'opacity-100' : step > s.number ? 'opacity-70' : 'opacity-40'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step > s.number ? 'bg-indigo-600 text-white' : step === s.number ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {step > s.number ? <Check className="w-3 h-3" /> : s.number}
                  </div>
                  <span className={`text-sm ${step === s.number ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── STEP 1: Initiative details ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">GTM Initiative Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Pricing v2 Launch Q3 2026"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Brief context about what this GTM initiative covers..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Initiative framing</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Initiative Owner</label>
                    <input type="text" value={initiativeOwner} onChange={e => setInitiativeOwner(e.target.value)}
                      placeholder="Who drives this GTM end-to-end?"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Product / Feature</label>
                    <input type="text" value={productArea} onChange={e => setProductArea(e.target.value)}
                      placeholder="e.g. Pricing v2, new onboarding flow, partner portal"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Target Audience</label>
                    <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)}
                      placeholder="Customer segment, ICP, or persona"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Target Launch Date</label>
                    <input type="date" value={targetLaunchDate} onChange={e => setTargetLaunchDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Launch Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {LAUNCH_TYPE_OPTIONS.map(opt => (
                      <button key={opt.value} type="button"
                        onClick={() => setLaunchType(launchType === opt.value ? '' : opt.value)}
                        className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                          launchType === opt.value
                            ? 'border-indigo-400 bg-indigo-50 text-indigo-800'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}>
                        <span className="text-xs font-semibold mb-0.5">{opt.label}</span>
                        <span className="text-xs opacity-60 leading-snug">{opt.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">North Star / Success Metric</label>
                  <input type="text" value={successMetric} onChange={e => setSuccessMetric(e.target.value)}
                    placeholder="What does success look like? e.g. 20% adoption in 60 days"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Stakeholders ── */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Assign people to each stakeholder role. Leave blank if the role is not covered in this GTM.
              </p>
              {STAKEHOLDERS.map(s => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: s.bgColor, color: s.textColor }}>{s.shortName}</span>
                  <span className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">{s.name}</span>
                  <input type="text" value={personNames[s.id] || ''}
                    onChange={e => setPersonNames(prev => ({ ...prev, [s.id]: e.target.value }))}
                    placeholder="Person name..."
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              ))}
            </div>
          )}

          {/* ── STEP 3: Phases & Tasks ── */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">
                All phases and tasks are included by default. Deselect anything not relevant to this GTM.
              </p>
              {PHASES.map(phase => {
                const configuredPhase = phases.find(p => p.phaseId === phase.id)!;
                const includedTaskCount = configuredPhase.tasks.filter(t => t.included).length;
                return (
                  <div key={phase.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 p-4 cursor-pointer"
                      style={{ backgroundColor: configuredPhase.included ? phase.lightColor : '#f9fafb' }}>
                      <input type="checkbox" checked={configuredPhase.included} onChange={() => togglePhase(phase.id)}
                        className="w-4 h-4 rounded accent-indigo-600" />
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: configuredPhase.included ? phase.color : '#9ca3af' }}>
                        {phase.number}
                      </span>
                      <div className="flex-1">
                        <span className={`font-medium text-sm ${configuredPhase.included ? 'text-gray-900' : 'text-gray-500'}`}>
                          {phase.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">{includedTaskCount}/{phase.tasks.length} tasks</span>
                      </div>
                    </div>
                    {configuredPhase.included && (
                      <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.tasks.map(task => {
                          const ct = configuredPhase.tasks.find(t => t.taskId === task.id)!;
                          return (
                            <label key={task.id}
                              className="flex items-start gap-2.5 p-2.5 rounded-lg cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200">
                              <input type="checkbox" checked={ct.included} onChange={() => toggleTask(phase.id, task.id)}
                                className="mt-0.5 w-3.5 h-3.5 rounded accent-indigo-600 flex-shrink-0" />
                              <span className={`text-xs leading-snug ${ct.included ? 'text-gray-700' : 'text-gray-300 line-through'}`}>
                                {task.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── STEP 4: Review ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">{name}</p>
                  {description && <p className="text-sm text-green-700 mt-0.5">{description}</p>}
                </div>
              </div>

              {(initiativeOwner || productArea || targetAudience || launchType || targetLaunchDate || successMetric) && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Initiative parameters</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {initiativeOwner && <div className="p-3 rounded-lg bg-gray-50 border border-gray-200"><p className="text-xs text-gray-500 mb-0.5">Owner</p><p className="text-sm font-medium text-gray-800">{initiativeOwner}</p></div>}
                    {productArea && <div className="p-3 rounded-lg bg-gray-50 border border-gray-200"><p className="text-xs text-gray-500 mb-0.5">Product / Feature</p><p className="text-sm font-medium text-gray-800">{productArea}</p></div>}
                    {targetAudience && <div className="p-3 rounded-lg bg-gray-50 border border-gray-200"><p className="text-xs text-gray-500 mb-0.5">Target Audience</p><p className="text-sm font-medium text-gray-800">{targetAudience}</p></div>}
                    {launchType && <div className="p-3 rounded-lg bg-gray-50 border border-gray-200"><p className="text-xs text-gray-500 mb-0.5">Launch Type</p><p className="text-sm font-medium text-gray-800">{LAUNCH_TYPE_OPTIONS.find(o => o.value === launchType)?.label}</p></div>}
                    {targetLaunchDate && <div className="p-3 rounded-lg bg-gray-50 border border-gray-200"><p className="text-xs text-gray-500 mb-0.5">Target Launch</p><p className="text-sm font-medium text-gray-800">{new Date(targetLaunchDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>}
                    {successMetric && <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 col-span-2 md:col-span-1"><p className="text-xs text-gray-500 mb-0.5">North Star</p><p className="text-sm font-medium text-gray-800">{successMetric}</p></div>}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Stakeholders</p>
                <div className="flex flex-wrap gap-2">
                  {STAKEHOLDERS.map(s => {
                    const n = personNames[s.id];
                    return (
                      <div key={s.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold"
                          style={{ backgroundColor: s.bgColor, color: s.textColor, fontSize: '9px' }}>{s.shortName}</span>
                        <span className="text-gray-600">{s.name}</span>
                        {n && <span className="font-medium text-gray-900">→ {n}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Phases & Tasks</p>
                <div className="space-y-2">
                  {phases.filter(p => p.included).map(cp => {
                    const phase = PHASES.find(p => p.id === cp.phaseId)!;
                    return (
                      <div key={cp.phaseId} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: phase.lightColor }}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: phase.color }}>{phase.number}</span>
                        <span className="text-sm font-medium text-gray-800">{phase.name}</span>
                        <span className="text-xs text-gray-600 ml-auto">{cp.tasks.filter(t => t.included).length} tasks</span>
                      </div>
                    );
                  })}
                  {phases.filter(p => !p.included).length > 0 && (
                    <div className="flex items-center gap-2 p-2 text-xs text-gray-500">
                      <Info className="w-3.5 h-3.5" />
                      {phases.filter(p => !p.included).length} phase(s) excluded
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 flex gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Jira export will be available in a future update. Your configuration is saved locally.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button onClick={step === 1 ? onCancel : () => setStep(s => s - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            {step === 1 ? 'Cancel' : '← Back'}
          </button>
          <button
            onClick={step === 1 ? handleStep1Next : step === 2 ? handleStep2Next : step === 3 ? handleStep3Next : handleFinish}
            disabled={step === 1 && !name.trim()}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-500 text-white text-sm font-medium rounded-lg transition-colors">
            {step === 4 ? (isEditing ? 'Save Changes' : 'Save Configuration') : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
