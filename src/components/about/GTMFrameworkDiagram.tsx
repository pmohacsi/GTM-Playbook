import { Package, Megaphone, Palette, Users, BookOpen, PenTool, Code2, Globe, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const gtmPurposes = [
  'Align product, market, and execution',
  'Define audience, positioning, and messaging',
  'Coordinate launch and go-live readiness',
  'Enable sales, partners, and customer-facing teams',
  'Drive adoption, business impact, and learning',
];

const stakeholders = [
  { name: 'Product Management',                    icon: Package    },
  { name: 'Product Marketing',                     icon: Megaphone  },
  { name: 'Marketing / Campaigns / Creative',      icon: Palette    },
  { name: 'Sales / Sales Enablement',              icon: BookOpen   },
  { name: 'Customer Success / Support / Education',icon: Users      },
  { name: 'Journey Design / UX / Research',        icon: PenTool    },
  { name: 'Engineering / Delivery',                icon: Code2      },
  { name: 'Regional / Partner / Channel teams',    icon: Globe      },
  { name: 'Portfolio / Business leadership',       icon: TrendingUp },
];

const roundtableActivities = [
  'Create or confirm the GTM initiative',
  'Align on scope, goals, audience, and success metrics',
  'Review and accept the GTM strategy',
  'Plan launch, readiness, and deliverables',
  'Coordinate dependencies and ownership',
  'Track progress and adopt after launch',
];

const keyRoles = [
  {
    color: '#6366f1',
    bg: '#eef2ff',
    title: 'GTM Orchestrator',
    description: 'Accountable for running the GTM process and governance cadence. Facilitates alignment, prepares agendas, tracks decisions and actions, manages dependencies, and keeps the initiative moving across teams.',
  },
  {
    color: '#8b5cf6',
    bg: '#f5f3ff',
    title: 'Initiative Owner',
    description: 'Responsible for defining and maintaining the GTM Initiative\'s purpose, scope, strategy, and intended outcome. Ensures the initiative has clear direction and that key decisions are aligned with the scope and situation.',
  },
  {
    color: '#06b6d4',
    bg: '#ecfeff',
    title: 'Functional Owners',
    description: 'Represent their teams, contribute expertise, and deliver their part of the plan — such as messaging, assets, enablement, launch execution, and adoption support.',
  },
];

const flowSteps = [
  { number: 1, label: 'Trigger', detail: 'new release, capability, market opportunity, or business goal identified', color: '#6366f1' },
  { number: 2, label: 'Frame',   detail: 'scope, target audience, customer problem, goals, and success criteria',   color: '#8b5cf6' },
  { number: 3, label: 'Align',   detail: 'GTM strategy, positioning, messaging, motion, channels, plan, roles, metrics', color: '#06b6d4' },
  { number: 4, label: 'Execute', detail: 'create assets, enable readiness, execute launch activities across channels', color: '#10b981' },
  { number: 5, label: 'Learn',   detail: 'analyze results, gather feedback, optimize, feed learnings into next cycle', color: '#f59e0b' },
];

// ─── Section wrapper ───────────────────────────────────────────────────────────

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-gray-200 bg-gray-50">
        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {number}
        </span>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function GTMFrameworkDiagram() {
  return (
    <div className="space-y-4 text-sm">

      {/* ── 1. What GTM is meant to achieve + Goal ── */}
      <Section number={1} title="What GTM is meant to achieve">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ul className="space-y-2">
            {gtmPurposes.map(p => (
              <li key={p} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-snug">{p}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 flex flex-col gap-2">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide">GTM Goal</p>
            <p className="text-indigo-900 leading-relaxed text-xs">
              To turn a product, release, or offering change into market impact by aligning the right audience, message, channels, readiness, launch activities, and adoption goals.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 2. Typical stakeholders ── */}
      <Section number={2} title="Typical stakeholders">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {stakeholders.map(s => (
            <div key={s.name} className="flex items-center gap-2.5 p-3 rounded-lg border border-gray-100 bg-gray-50">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <s.icon className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span className="text-xs text-gray-700 leading-tight">{s.name}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 italic">
          The exact mix depends on the initiative, but GTM is always cross-functional.
        </p>
      </Section>

      {/* ── 3. How they work together ── */}
      <Section number={3} title="How they work together">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-4 mb-3 text-center">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-1">GTM Roundtable</p>
              <p className="text-xs text-gray-600 italic mb-2">also: GTM Council / GTM Forum</p>
              <p className="text-xs text-indigo-800 leading-relaxed">
                A recurring cross-functional forum where the stakeholders or their representatives align and make progress on the initiative.
              </p>
            </div>
            <div className="space-y-1.5">
              {roundtableActivities.map((a, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-xs text-gray-700 leading-snug">{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-violet-200 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-violet-700" />
                </div>
                <p className="text-xs font-bold text-violet-700 uppercase tracking-wide">Initiative Owner</p>
              </div>
              <p className="text-xs text-violet-900 leading-relaxed">
                Responsible for defining and maintaining the initiative's purpose, scope, strategy, and intended outcome. Ensures key decisions are aligned with the scope and situation.
              </p>
            </div>
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-cyan-200 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-cyan-700" />
                </div>
                <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide">Functional Owners</p>
              </div>
              <p className="text-xs text-cyan-900 leading-relaxed">
                Represent their teams, contribute expertise, and deliver their part of the plan — messaging, assets, enablement, launch execution, and adoption support.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4. Key roles in the model ── */}
      <Section number={4} title="Key roles in the model">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {keyRoles.map(r => (
            <div key={r.title} className="rounded-xl border p-4" style={{ borderColor: r.color + '40', backgroundColor: r.bg }}>
              <div
                className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: r.color + '20', color: r.color }}
              >
                {r.title}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. GTM collaboration flow ── */}
      <Section number={5} title="GTM collaboration flow">
        <div className="flex flex-col sm:flex-row gap-2">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex sm:flex-col items-center sm:items-stretch gap-2 sm:gap-1 flex-1">
              <div
                className="rounded-xl p-3 flex-1 flex flex-col gap-1"
                style={{ backgroundColor: step.color + '15', border: `1px solid ${step.color}40` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">{step.label}</span>
                </div>
                <p className="text-xs text-gray-600 leading-snug pl-7">{step.detail}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 self-center hidden sm:block mt-3" />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 italic mt-3">
          A GTM Initiative is the dedicated workstream for a specific product, version, release, or capability.
        </p>
      </Section>

    </div>
  );
}
