import { useState } from 'react';
import { Target, Users, Layers, ArrowRight, Lightbulb, CheckCircle, ZoomIn, X } from 'lucide-react';

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-6xl w-full" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1.5 text-sm"
        >
          <X className="w-4 h-4" /> Close
        </button>
        <img src={src} alt={alt} className="w-full rounded-xl shadow-2xl" />
      </div>
    </div>
  );
}

export function AboutView() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const pillars = [
    {
      icon: Target,
      color: '#6366f1',
      bg: '#eef2ff',
      title: 'A clear goal',
      body: 'Every GTM starts with defining the desired outcome: what customer, sales, adoption, or behavioral change should this initiative drive? That measurable goal is the north star for every decision that follows.',
    },
    {
      icon: Users,
      color: '#8b5cf6',
      bg: '#f5f3ff',
      title: 'The right people',
      body: 'GTM is never one team\'s job. Product, Marketing, Sales, CS, and Enablement each own a piece. A GTM works when everyone knows their role — and when those roles are explicit, not assumed.',
    },
    {
      icon: Layers,
      color: '#06b6d4',
      bg: '#ecfeff',
      title: 'A structured process',
      body: 'From scoping the initiative to measuring post-launch adoption, our GTM process follows a 6-phase arc. Each phase has a purpose, a set of deliverables, and clear ownership. None of them is optional.',
    },
  ];

  const forWho = [
    {
      label: 'New to GTM?',
      color: '#10b981',
      bg: '#ecfdf5',
      points: [
        'GTM stands for Go-To-Market — it\'s the plan for getting a product or feature in front of the right people, in a way they understand and act on.',
        'It\'s not just a marketing campaign. It includes internal training, sales preparation, customer communication, and post-launch learning.',
        'You don\'t need to own the whole process — but you do need to know where your piece fits.',
      ],
    },
    {
      label: 'Already working in GTM?',
      color: '#f59e0b',
      bg: '#fffbeb',
      points: [
        'This framework makes the implicit explicit: who owns what, when, and why — across every phase.',
        'Our 6-phase model gives you a shared language with every team you collaborate with.',
        'The configurator lets you scope a real GTM: which phases, which tasks, who\'s responsible — for a specific initiative.',
      ],
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">

      {/* Hero */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">
          <Lightbulb className="w-3.5 h-3.5" />
          Understanding GTM
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          What is GTM — and how do we run it?
        </h1>
        <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          The cross-functional design and execution of how a product, feature, capability, or offering change reaches the right audience, becomes understandable and usable for our internal teams, and drives measurable customer, sales, or adoption impact.
        </p>
      </div>

      {/* Two-level definition block */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 divide-y divide-indigo-100 overflow-hidden">

        {/* GTM Goal */}
        <div className="p-5">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-2">GTM Goal</p>
          <p className="text-sm text-indigo-900 leading-relaxed">
            To turn a product or service launch, feature introduction, capability rollout, or offering change into <span className="font-semibold">measurable market impact</span> — by aligning the right audience, message, channels, internal readiness, launch activities, and adoption or expected behavioral-change goals.
          </p>
        </div>

        {/* GTM Initiative */}
        <div className="p-5">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-2">GTM Initiative</p>
          <p className="text-sm text-indigo-900 leading-relaxed">
            A dedicated, time-bound GTM workstream associated with a specific product, version, capability, or offering change.
          </p>
          <p className="text-xs text-indigo-600 leading-relaxed mt-2 italic">
            Each major launch, capability introduction, or offering change can trigger its own GTM initiative — with a defined scope, target audience, message, readiness needs, launch activities, and measurable customer, sales, adoption, or behavioral-change goals.
          </p>
        </div>

      </div>

      {/* Three pillars */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Three things every GTM needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map(p => (
            <div key={p.title} className="rounded-xl border border-gray-200 p-5 bg-white">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: p.bg }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* For who */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">This tool is for you — whoever you are</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forWho.map(f => (
            <div key={f.label} className="rounded-xl border border-gray-200 p-5 bg-white">
              <span
                className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-4"
                style={{ backgroundColor: f.bg, color: f.color }}
              >
                {f.label}
              </span>
              <ul className="space-y-3">
                {f.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: f.color }} />
                    <span className="text-sm text-gray-700 leading-snug">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Infographic 1 — How our GTM Initiative works */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">How our GTM Initiative works</h2>
          <p className="text-sm text-gray-600 mt-1">
            Purpose, stakeholders, collaboration model, and governance — the complete picture of how we run a GTM and who is in the room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800">A GTM Orchestrator keeps the process moving.</span>{' '}
              Accountable for running the GTM governance cadence, facilitating alignment, tracking decisions and actions, and managing dependencies across teams.
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <ArrowRight className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800">The GTM Roundtable is where alignment happens.</span>{' '}
              A recurring cross-functional forum where stakeholders or their representatives align on progress, strategy, and decisions.
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800">The Initiative Owner owns scope and direction.</span>{' '}
              Responsible for defining and maintaining the initiative's purpose, scope, strategy, and intended outcome — ensuring key decisions stay aligned.
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <ArrowRight className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-800">Functional owners deliver their part of the plan.</span>{' '}
              Messaging, assets, enablement, launch execution, adoption support — each functional owner is accountable within their domain.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full tracking-wide">GTM Initiative One Pager</span>
          <span className="text-xs text-gray-500">Click to enlarge</span>
        </div>

        <div
          className="relative rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in group"
          onClick={() => setLightbox('gtm-framework.png')}
        >
          <img
            src="./gtm-framework.png"
            alt="How a GTM Initiative works — framework infographic"
            className="w-full object-contain bg-white"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 shadow">
              <ZoomIn className="w-4 h-4" />
              Click to enlarge
            </div>
          </div>
        </div>
      </div>

      {/* Infographic 2 — GTM on a timeline */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">GTM Initiatives on a timeline</h2>
          <p className="text-sm text-gray-600 mt-1">
            In practice, multiple initiatives run in parallel. This shows how our GTM workstreams overlap — and why our shared framework matters at portfolio scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="font-medium text-gray-800 mb-1">Release / Offering view</p>
            <p>Product or offering changes delivered over time — what ships and when.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="font-medium text-gray-800 mb-1">GTM view</p>
            <p>The cross-functional work that brings each release or offering change to market.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="font-medium text-gray-800 mb-1">Portfolio objectives</p>
            <p>The strategic context guiding multiple GTM initiatives — ensuring individual GTMs serve larger business goals.</p>
          </div>
        </div>

        <div
          className="relative rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in group"
          onClick={() => setLightbox('gtm-timeline.png')}
        >
          <img
            src="./gtm-timeline.png"
            alt="GTM Initiatives on a timeline — infographic"
            className="w-full object-contain bg-white"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 shadow">
              <ZoomIn className="w-4 h-4" />
              Click to enlarge
            </div>
          </div>
        </div>
      </div>

      {/* Bridge to the tool */}
      <div className="rounded-2xl bg-gray-900 text-white p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Ready to explore our process?</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The <span className="text-white font-medium">Explore Process</span> tab shows our full 6-phase GTM framework — who does what, in which phase, and why. The <span className="text-white font-medium">GTM Configurations</span> tab lets you build a real GTM plan for a specific initiative.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm flex-shrink-0">
          <div className="flex items-center gap-2 text-indigo-300">
            <ArrowRight className="w-3.5 h-3.5" />
            Explore Process → see the full framework
          </div>
          <div className="flex items-center gap-2 text-violet-300">
            <ArrowRight className="w-3.5 h-3.5" />
            GTM Configurations → build your own plan
          </div>
        </div>
      </div>

      <div className="pb-8" />

      {lightbox && (
        <ImageLightbox
          src={`./${lightbox}`}
          alt={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
