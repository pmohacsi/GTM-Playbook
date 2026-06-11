export type RoleType = 'owner' | 'co-owner' | 'core-partner' | 'contributes' | 'input';

export interface Task {
  id: string;
  label: string;
  description: string;
  whyItMatters: string;
  examples: string[];
}

export interface Phase {
  id: string;
  number: number;
  name: string;
  essence: string;
  goal: string;
  tasks: Task[];
  color: string;
  lightColor: string;
}

export interface StakeholderPhaseRole {
  phaseId: string;
  role: RoleType;
  description: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  textColor: string;
  phases: StakeholderPhaseRole[];
}

export const PHASES: Phase[] = [
  {
    id: 'phase1',
    number: 1,
    name: 'Product & Market Context',
    essence: 'What are we releasing, for whom, and why does it matter?',
    goal: 'Create a shared starting point and strategic input for GTM Strategy & Design: release scope, target audience, customer problem and business context.',
    color: '#6366f1',
    lightColor: '#eef2ff',
    tasks: [
      {
        id: 't1-1',
        label: 'Understand release scope: in / out',
        description: 'Define clearly what is included in this release and what is explicitly out of scope. This prevents scope creep and ensures every GTM stakeholder is working from the same baseline.',
        whyItMatters: 'Misaligned scope understanding is the most common cause of wasted effort in GTM — marketing creates content for features not in the release, sales pitches capabilities not yet shipped.',
        examples: [
          'A release includes a new dashboard but NOT the underlying data export API — GTM materials must reflect this boundary.',
          'Explicitly listing "out of scope: mobile support" prevents CS from over-promising to customers.',
        ],
      },
      {
        id: 't1-2',
        label: 'Identify target segment, persona, use case',
        description: 'Specify which customer segment, buyer/user persona, and primary use case this release is designed for. This narrows the GTM focus and makes every downstream decision more precise.',
        whyItMatters: 'Without a clear target, messaging becomes generic, sales pitches to the wrong accounts, and adoption lags because the right customers don\'t hear about it.',
        examples: [
          'Target: mid-market finance teams (persona: Finance Operations Manager) automating monthly close.',
          'Use case: reducing manual reconciliation time by 60% — this becomes the anchor of the value story.',
        ],
      },
      {
        id: 't1-3',
        label: 'Clarify product / portfolio / roadmap context',
        description: 'Place this release in the context of the broader product portfolio and roadmap. Is this a standalone feature, part of a larger initiative, or a bridge to a future major release?',
        whyItMatters: 'Context determines launch tier and narrative. A feature that is a stepping stone to something bigger should be positioned differently than a standalone capability.',
        examples: [
          'This release is Phase 1 of a 3-part workflow automation initiative — the GTM story should hint at the bigger vision.',
          'It replaces a legacy feature sunset in Q4 — migration narrative is as important as new value.',
        ],
      },
      {
        id: 't1-4',
        label: 'Define customer problem and value hypothesis',
        description: 'Articulate the specific customer problem this release solves and the hypothesis about how it creates value. This becomes the foundation of all messaging.',
        whyItMatters: 'Features without a problem statement lead to feature-forward marketing that customers ignore. The value hypothesis keeps all teams anchored to customer outcomes.',
        examples: [
          'Problem: teams spend 3+ hours weekly exporting reports manually. Hypothesis: automated scheduling reduces this to near zero.',
          'Problem: sales reps can\'t find the right collateral at point of need. Hypothesis: smart search surfaces relevant content in under 10 seconds.',
        ],
      },
      {
        id: 't1-5',
        label: 'Gather competitor, alternative and market context',
        description: 'Research how competitors and alternatives address the same problem. Identify the market timing context — is this table stakes, differentiated, or category-defining?',
        whyItMatters: 'Positioning only works relative to alternatives. Without knowing what customers compare you to, messaging can accidentally undersell strengths or highlight weaknesses.',
        examples: [
          'Competitor X has a similar feature but requires manual setup — our automated approach is the differentiator.',
          'This capability is now table stakes in the segment — GTM should focus on "finally done right" rather than "brand new category".',
        ],
      },
      {
        id: 't1-6',
        label: 'Flag pricing / packaging / entitlement impacts',
        description: 'Identify whether this release changes pricing tiers, packaging bundles, or feature entitlements. If it does, these changes need to be communicated precisely to Sales, CS, and customers.',
        whyItMatters: 'Pricing changes are high-risk GTM moments. Confusion about who gets access creates sales blockers and customer trust issues that are hard to walk back.',
        examples: [
          'This feature moves from add-on to core plan — Sales needs clear talking points for customers currently paying extra.',
          'New enterprise-only tier requires updated sales qualification criteria and CS renewal conversations.',
        ],
      },
    ],
  },
  {
    id: 'phase2',
    number: 2,
    name: 'GTM Strategy & Design',
    essence: 'What impact, behavior change and story do we want to create?',
    goal: 'Define which audience the release targets, with what value story, through which GTM motion, and toward what business or adoption outcome.',
    color: '#8b5cf6',
    lightColor: '#f5f3ff',
    tasks: [
      {
        id: 't2-1',
        label: 'Define GTM strategy',
        description: 'Synthesize all Phase 1 inputs into a coherent go-to-market strategy: who we reach, how we reach them, what we say, and what success looks like.',
        whyItMatters: 'Without an explicit strategy document, different teams execute in different directions. The GTM strategy is the single source of truth that aligns all downstream execution.',
        examples: [
          'Strategy: target expansion within existing mid-market accounts via CS-led adoption push, supported by a case study campaign.',
        ],
      },
      {
        id: 't2-2',
        label: 'Refine target audience / segment',
        description: 'Sharpen the Phase 1 audience definition with firmographic, behavioral, and psychographic criteria. Define primary and secondary audiences explicitly.',
        whyItMatters: 'A refined audience prevents diluted messaging. "All customers" is not a target — "Finance Ops Managers at 100-500 person companies in regulated industries" is.',
        examples: [
          'Primary: existing customers in manufacturing vertical. Secondary: new logo prospects in the same vertical currently using Competitor X.',
        ],
      },
      {
        id: 't2-3',
        label: 'Define release significance / launch tier',
        description: 'Classify this release into a launch tier (e.g., Tier 1 major launch, Tier 2 significant update, Tier 3 minor release) to calibrate the level of GTM investment.',
        whyItMatters: 'Not every release deserves the same GTM effort. Launch tiers prevent over-investing in minor updates and under-investing in major launches.',
        examples: [
          'Tier 1: major new product module requiring full campaign, event, and executive alignment.',
          'Tier 3: performance improvement — changelog entry and CS notification only.',
        ],
      },
      {
        id: 't2-4',
        label: 'Define desired behavior change',
        description: 'Articulate what you want customers, prospects, or internal teams to do differently after the launch. Behavior change is the ultimate success metric.',
        whyItMatters: 'If you can\'t describe the behavior change you want, you can\'t measure success or design an effective GTM motion. It forces clarity on what "good" looks like.',
        examples: [
          'We want existing users to activate the new feature within 30 days of launch.',
          'We want Sales to lead with the new capability in all mid-market demos starting launch week.',
        ],
      },
      {
        id: 't2-5',
        label: 'Establish positioning and messaging foundations',
        description: 'Create the core positioning statement (for whom, what problem, what solution, what proof) and the key messages that will be consistent across all channels and assets.',
        whyItMatters: 'Inconsistent messaging across Sales, Marketing, and CS creates customer confusion. A messaging foundation ensures everyone tells the same story.',
        examples: [
          'Positioning: "For finance teams drowning in manual reporting, [Product] is the only solution that automates the entire close process — proven by 200+ companies cutting close time by 50%."',
        ],
      },
      {
        id: 't2-6',
        label: 'Build value story / release narrative',
        description: 'Craft the narrative arc for this release: the before state, the problem, the solution, the proof, and the call to action. This narrative drives all content creation.',
        whyItMatters: 'A compelling story is what makes a release memorable and shareable. Features alone don\'t spread — stories do.',
        examples: [
          'Before: teams patch together 5 tools to get a single report. After: one-click automated reports in the format each stakeholder needs.',
        ],
      },
      {
        id: 't2-7',
        label: 'Choose GTM motion',
        description: 'Select the primary GTM motion: sales-led, CS-led, marketing-led, product-led, event-led, or a mixed approach. This drives channel and asset decisions.',
        whyItMatters: 'The wrong motion wastes resources. A product-led motion with no in-product activation is just expensive marketing that doesn\'t convert.',
        examples: [
          'Sales-led for enterprise accounts; product-led (in-app notifications) for SMB self-serve.',
          'Event-led: anchor the launch to a user conference keynote, then follow up with targeted outreach.',
        ],
      },
      {
        id: 't2-8',
        label: 'Define business outcome and success metrics hypothesis',
        description: 'Set measurable success criteria for the GTM effort: adoption rates, pipeline created, revenue influenced, NPS impact, or other relevant KPIs.',
        whyItMatters: 'Without defined metrics upfront, the Learn & Optimize phase has nothing to measure against. It also forces alignment on what the business actually needs from this launch.',
        examples: [
          '30% feature activation rate among existing customers within 60 days.',
          '$500K influenced pipeline from launch campaign within 90 days.',
        ],
      },
      {
        id: 't2-9',
        label: 'Define proof points and evidence',
        description: 'Identify the evidence that supports your value story: customer quotes, beta user data, analyst references, internal benchmarks, or case studies.',
        whyItMatters: 'Claims without proof are marketing noise. Evidence turns a story into a credible argument and gives Sales concrete material to use in conversations.',
        examples: [
          'Beta customer reduced reporting time from 8 hours to 45 minutes — this becomes the lead proof point.',
          'Internal benchmark: feature processes 10x more data than previous version.',
        ],
      },
    ],
  },
  {
    id: 'phase3',
    number: 3,
    name: 'GTM Planning',
    essence: 'Through which channels, assets, events and responsibilities do we take it to market?',
    goal: 'Clarify channels, content, events, readiness steps, responsibilities and metrics.',
    color: '#06b6d4',
    lightColor: '#ecfeff',
    tasks: [
      {
        id: 't3-1',
        label: 'Finalize launch tier / launch level',
        description: 'Lock the launch tier decision and communicate it to all stakeholders so they can calibrate their effort and resource allocation.',
        whyItMatters: 'A final tier decision is the trigger for resource planning. Changing it late causes churn across all teams.',
        examples: ['Tier 2 confirmed: targeted campaign + sales enablement + CS communication, no press release.'],
      },
      {
        id: 't3-2',
        label: 'Define channel strategy and content plan',
        description: 'Map which channels will be used (email, social, webinar, in-app, PR, events) and what content is needed for each, with a production timeline.',
        whyItMatters: 'Without a channel-content map, assets get created without a home and channels run without coordinated content.',
        examples: [
          'Email to existing customers (week 0), LinkedIn post (week 0), webinar invite (week +1), in-app banner (week 0–4).',
        ],
      },
      {
        id: 't3-3',
        label: 'Plan internal, Sales and CS readiness',
        description: 'Define what training and preparation each internal team needs before launch day: what to know, what to say, what to show, and how to handle questions.',
        whyItMatters: 'A customer-facing team caught off guard by a launch destroys trust faster than any external campaign can build it.',
        examples: [
          'Sales: 30-min briefing + updated battlecard 2 weeks before launch.',
          'CS: full training session + FAQ doc 1 week before launch.',
        ],
      },
      {
        id: 't3-4',
        label: 'Decide on release event',
        description: 'Determine whether a launch event (webinar, live demo, customer briefing) is warranted, and if so: for whom, why, and with what call to action.',
        whyItMatters: 'Events create a moment of focus and urgency that async communication cannot. But they also require significant production effort — the decision must be deliberate.',
        examples: [
          'Live demo webinar for existing customers: "See the new reporting module in action." CTA: schedule a personalized walkthrough.',
        ],
      },
      {
        id: 't3-5',
        label: 'Define demo strategy and demo asset scope',
        description: 'Determine what demo environments, scripts, and data sets are needed — for Sales, for events, and for product education.',
        whyItMatters: 'A product demo is often the highest-leverage GTM asset. Poorly prepared demos lose deals; great demos close them.',
        examples: [
          'Need: one scripted 5-min demo for Sales one-on-ones + one 15-min walkthrough for webinars.',
          'Demo environment requires pre-loaded dataset representing a finance team\'s real workflow.',
        ],
      },
      {
        id: 't3-6',
        label: 'Plan sales playbook / battlecard / FAQ needs',
        description: 'Specify exactly what sales enablement materials need to be created: playbook updates, new battlecards, objection-handling guides, or FAQs.',
        whyItMatters: 'Sales reps need specific, actionable guidance — not general product information. The right materials at the right time directly impact deal velocity.',
        examples: [
          'New battlecard: how to position against Competitor X\'s similar feature (launched last quarter).',
          'FAQ: top 10 questions CS expects from existing customers about migration.',
        ],
      },
      {
        id: 't3-7',
        label: 'Schedule customer communications',
        description: 'Plan the timing and sequencing of customer-facing communications: who gets notified, when, through which channel, and in what order.',
        whyItMatters: 'Poorly timed communications — especially for changes that affect existing workflows — create support spikes and erode trust.',
        examples: [
          'Week -2: preview email to power users. Week 0: announcement email to all customers. Week +1: follow-up with activation tips.',
        ],
      },
      {
        id: 't3-8',
        label: 'Define success metrics and learning plan',
        description: 'Finalize how success will be measured and how learnings will be captured. Assign ownership of post-launch measurement.',
        whyItMatters: 'Metrics without a measurement plan are wishes. Someone must own the data collection, analysis cadence, and communication of results.',
        examples: [
          'PMM owns weekly adoption report for 8 weeks post-launch. CS owns customer sentiment tracking.',
        ],
      },
      {
        id: 't3-9',
        label: 'Clarify ownerships (RACI)',
        description: 'Document who is Responsible, Accountable, Consulted, and Informed for each major GTM workstream.',
        whyItMatters: 'Without explicit ownership, work falls through the cracks or gets duplicated. RACI alignment prevents both outcomes.',
        examples: [
          'PMM: accountable for all external messaging. Marketing: responsible for campaign execution. Sales Enablement: responsible for playbook.',
        ],
      },
    ],
  },
  {
    id: 'phase4',
    number: 4,
    name: 'Asset & Readiness Production',
    essence: 'Launch, sales, CS, enablement and marketing materials are created.',
    goal: 'Ensure every team has usable, consistent and approved launch assets.',
    color: '#f59e0b',
    lightColor: '#fffbeb',
    tasks: [
      {
        id: 't4-1',
        label: 'Core messaging, positioning, launch brief',
        description: 'Produce the canonical messaging document: positioning statement, key messages, tone guidelines, and a launch brief that all other asset creators reference.',
        whyItMatters: 'Every other asset derives from this. If this document is wrong or unclear, every downstream asset will be inconsistent.',
        examples: ['One-page launch brief with positioning, top 3 messages, target audience, proof points, and CTA.'],
      },
      {
        id: 't4-2',
        label: 'Product / scenario one-pagers',
        description: 'Create concise one-page documents that explain specific product capabilities or use case scenarios — used by Sales for leave-behinds and by CS for customer education.',
        whyItMatters: 'Customers and prospects rarely read long documents. A well-crafted one-pager communicates the essential value in under 2 minutes.',
        examples: ['One-pager: "How [Product] handles the monthly close for mid-market finance teams" — 4 steps, 3 outcomes, 1 customer quote.'],
      },
      {
        id: 't4-3',
        label: 'Website / landing page, email, social, blog / PR',
        description: 'Produce all external-facing digital assets: updated website copy, launch landing page, announcement email, social posts, and blog or press content.',
        whyItMatters: 'External digital assets are the public face of the launch. They drive awareness, inbound interest, and establish the narrative in the market.',
        examples: [
          'Landing page: headline, 3 benefits, 1 video, 2 customer quotes, CTA to schedule a demo.',
          'Launch email to customers: 3-sentence announcement + link to learn more.',
        ],
      },
      {
        id: 't4-4',
        label: 'Demo script, storyline, demo dataset / environment',
        description: 'Build the demo infrastructure: write the narrative script, prepare the demo environment with realistic data, and create a repeatable flow that sales reps can execute consistently.',
        whyItMatters: 'An improvised demo is a liability. A scripted, practiced demo with the right data tells a story the prospect can see themselves in.',
        examples: [
          'Demo script: "You\'re a Finance Manager at a 200-person company. It\'s end of month. Here\'s how you close in 45 minutes instead of 8 hours."',
        ],
      },
      {
        id: 't4-5',
        label: 'Sales deck, playbook, battlecard, objection handling',
        description: 'Create or update all sales-facing enablement materials: the pitch deck, detailed playbook, competitive battlecard, and objection response guide.',
        whyItMatters: 'Sales reps need structured, tested guidance — not raw product knowledge. These assets bridge the gap between product capabilities and winning conversations.',
        examples: [
          'Updated slide 7 of sales deck with new feature benefit.',
          'Battlecard: how to respond when prospect says "Competitor X just launched the same thing."',
        ],
      },
      {
        id: 't4-6',
        label: 'Internal training deck, FAQ, what to say / not to say',
        description: 'Produce internal-only materials that help all customer-facing teams communicate consistently: training slides, a comprehensive FAQ, and explicit guidance on messaging boundaries.',
        whyItMatters: '"What not to say" is as important as what to say. Over-promising or mis-characterizing features creates downstream CS and legal issues.',
        examples: [
          'FAQ entry: "Is this available on mobile?" — Answer: "Not yet — web-only for now, mobile in Q2."',
          '"What not to say": Do not compare to Competitor X\'s pricing publicly.',
        ],
      },
      {
        id: 't4-7',
        label: 'CS onboarding guide, support / KB content',
        description: 'Create materials that help Customer Success guide customers to adoption: onboarding guides, knowledge base articles, support scripts, and escalation guidance.',
        whyItMatters: 'Adoption doesn\'t happen automatically after a launch. CS-facing content is the bridge between "we shipped it" and "customers use it."',
        examples: [
          'KB article: step-by-step setup guide with screenshots.',
          'Onboarding checklist: 5 actions new users should take in their first week.',
        ],
      },
      {
        id: 't4-8',
        label: 'Release notes, event content, talking points',
        description: 'Write polished release notes for the product changelog, content for any launch events (webinar slides, script), and executive talking points.',
        whyItMatters: 'Release notes are often the first thing a power user reads. Event content shapes the narrative at the highest-visibility moment of the launch.',
        examples: [
          'Release notes: 3-sentence summary + link to full documentation.',
          'Webinar deck: 12 slides, 30-minute flow, live demo in the middle.',
        ],
      },
      {
        id: 't4-9',
        label: 'Review and approval rounds',
        description: 'Run structured review cycles across Legal, Product, Marketing, and relevant stakeholders to approve all external-facing assets before launch.',
        whyItMatters: 'Unapproved claims in external content create legal, compliance, and brand risk. Approval cycles are a control point, not a bureaucratic delay.',
        examples: [
          'Legal review required for all pricing-related claims.',
          'Product review required for all feature descriptions — no asset goes external without Product sign-off.',
        ],
      },
    ],
  },
  {
    id: 'phase5',
    number: 5,
    name: 'Internal Enablement & Launch Execution',
    essence: 'Internal teams are ready, then the external launch is executed.',
    goal: 'Ensure internal readiness and coordinate the external market introduction.',
    color: '#10b981',
    lightColor: '#ecfdf5',
    tasks: [
      {
        id: 't5-1',
        label: 'Sales, CS, Support, Partner training',
        description: 'Deliver live or recorded training to all customer-facing teams covering: what\'s launching, why it matters, how to explain it, and how to handle questions.',
        whyItMatters: 'Training is the moment the GTM strategy becomes operational. Skipping or rushing it means customer-facing teams go into the market unprepared.',
        examples: [
          '60-minute live training for Sales + recording for asynchronous catch-up.',
          'CS briefing document sent 5 days before launch with FAQ attached.',
        ],
      },
      {
        id: 't5-2',
        label: 'Internal launch session and demo walkthrough',
        description: 'Run a company-wide or cross-functional internal launch session where the product is demonstrated and the GTM plan is communicated.',
        whyItMatters: 'Internal alignment creates internal advocates. When everyone understands the launch and can explain it confidently, the entire company becomes a GTM channel.',
        examples: [
          'All-hands demo: 10-minute product walkthrough + 5-minute Q&A.',
          'Slack announcement with 2-minute demo video for async consumption.',
        ],
      },
      {
        id: 't5-3',
        label: 'Objection handling and qualification guidance practice',
        description: 'Run practice sessions or roleplay exercises with Sales to rehearse objection responses and qualification questions specific to this release.',
        whyItMatters: 'Knowledge of the right answer in a calm setting is not the same as being able to deliver it under pressure in a live sales call.',
        examples: [
          '30-minute roleplay session: Sales Enablement plays skeptical prospect, reps practice responses.',
        ],
      },
      {
        id: 't5-4',
        label: 'Readiness check: who, what, how to position / show',
        description: 'Formally verify that all teams are ready before launch: confirm asset access, validate understanding, and green-light go/no-go.',
        whyItMatters: 'A readiness check catches gaps before they become customer-facing problems. It\'s the last safety gate before external execution.',
        examples: [
          'Readiness checklist: all assets live in shared drive ✓, Sales confirmed training complete ✓, CS FAQ reviewed ✓, launch email scheduled ✓.',
        ],
      },
      {
        id: 't5-5',
        label: 'Publish website / landing page',
        description: 'Go live with all updated web properties: product page updates, launch landing page, and any relevant documentation.',
        whyItMatters: 'Web content is discoverable and persistent. It\'s often the first place a prospect or customer goes after hearing about the release.',
        examples: ['Landing page published at product.com/new-reporting on launch day 9am.'],
      },
      {
        id: 't5-6',
        label: 'Product announcement, email, social, PR / blog / webinar',
        description: 'Execute the external launch: send announcement emails, publish social posts, issue press release if applicable, post blog content, and run the launch webinar.',
        whyItMatters: 'Coordinated external execution amplifies reach. Staggered or inconsistent execution fragments the narrative and reduces impact.',
        examples: [
          'Launch day: email sent at 9am, social posts at 10am, blog live at 9am, webinar at 1pm.',
        ],
      },
      {
        id: 't5-7',
        label: 'Sales outreach, partner communication, CS communication',
        description: 'Activate direct customer and partner channels: Sales begins outreach to target accounts, partners are briefed, CS sends personalized communication to key accounts.',
        whyItMatters: 'Broadcast marketing reaches many; direct outreach converts the most important accounts. Both are needed for a complete launch.',
        examples: [
          'Sales: personalized email to top 20 accounts day 1. CS: personal call to top 10 accounts week 1.',
        ],
      },
      {
        id: 't5-8',
        label: 'In-product communication and release notes',
        description: 'Activate in-product notifications, banners, or tooltips that guide existing users to discover and activate the new feature.',
        whyItMatters: 'In-product communication reaches active users at the highest moment of context. It\'s often the most effective activation channel for existing customers.',
        examples: [
          'In-app banner: "New: Automated Reports are here — try it now" shown to all users on next login.',
          'Changelog notification in product for power users.',
        ],
      },
      {
        id: 't5-9',
        label: 'Start campaign tracking and field feedback monitoring',
        description: 'Activate all tracking mechanisms and establish a cadence for collecting field feedback from Sales and CS during the launch window.',
        whyItMatters: 'The launch window is the highest-signal period for learning. Missing it means making optimization decisions with incomplete data.',
        examples: [
          'UTM parameters live on all launch links. Weekly Slack check-in channel for Sales/CS feedback established.',
        ],
      },
    ],
  },
  {
    id: 'phase6',
    number: 6,
    name: 'Learn & Optimize',
    essence: 'Results, feedback, adoption, improvements and inputs for the next release.',
    goal: 'Maximize adoption, sales and customer impact; close the GTM and product learning loop.',
    color: '#f43f5e',
    lightColor: '#fff1f2',
    tasks: [
      {
        id: 't6-1',
        label: 'Launch performance review',
        description: 'Conduct a structured review of launch results against the success metrics defined in Phase 3: what did we achieve, what fell short, and why.',
        whyItMatters: 'Without a formal review, teams repeat mistakes and miss opportunities. The retrospective is how GTM capability improves over time.',
        examples: [
          'Weekly review for first 4 weeks: adoption rate, pipeline created, top objections, support ticket volume.',
        ],
      },
      {
        id: 't6-2',
        label: 'Analyze campaign metrics, sales feedback and CS feedback',
        description: 'Deep-dive into quantitative campaign data (open rates, conversion, pipeline) and qualitative field feedback from Sales and CS.',
        whyItMatters: 'Quantitative data shows what happened; qualitative field feedback explains why. Both are needed for actionable insights.',
        examples: [
          'Email open rate 42% (good) but demo conversion 8% (below 15% target) — investigate landing page or demo quality.',
        ],
      },
      {
        id: 't6-3',
        label: 'Interpret customer feedback and usage data',
        description: 'Analyze how customers are actually using the new feature, what feedback they\'re giving to CS and in surveys, and where the adoption journey breaks down.',
        whyItMatters: 'Customers use products in ways teams don\'t anticipate. Usage data reveals the real adoption story, not the intended one.',
        examples: [
          'Feature activated by 40% of users but only 15% use it weekly — onboarding flow needs improvement.',
        ],
      },
      {
        id: 't6-4',
        label: 'Identify adoption barriers',
        description: 'Systematically identify what is preventing customers from activating or adopting the feature: UX friction, missing education, wrong ICP, pricing confusion, or technical issues.',
        whyItMatters: 'Adoption barriers are often fixable without a product change. A better onboarding guide or a targeted CS campaign can often move the needle significantly.',
        examples: [
          'Barrier identified: customers don\'t know the feature exists — in-app discovery is insufficient. Fix: add onboarding checklist item.',
        ],
      },
      {
        id: 't6-5',
        label: 'Improve messaging, sales assets and demo assets',
        description: 'Update external and sales-facing content based on what actually resonated in the market versus what was hypothesized in Phase 2.',
        whyItMatters: 'Phase 2 messaging is a hypothesis. Phase 6 is where it gets validated and refined. Assets that aren\'t updated based on market reality become a liability.',
        examples: [
          'Battlecard updated: "automated" was the winning differentiator, not "fast" — all decks updated.',
        ],
      },
      {
        id: 't6-6',
        label: 'Update FAQ / support / enablement content',
        description: 'Refresh all support, FAQ, and enablement materials based on the questions actually being asked by customers and prospects post-launch.',
        whyItMatters: 'Pre-launch FAQs are based on anticipated questions. Post-launch FAQs should reflect actual questions — the difference is often significant.',
        examples: [
          '"Can I export to Google Sheets?" was asked 23 times in the first week — added to FAQ and KB immediately.',
        ],
      },
      {
        id: 't6-7',
        label: 'Surface journey problems',
        description: 'Identify experience gaps, touchpoint inconsistencies, and friction points in the customer journey that weren\'t visible before real usage data arrived.',
        whyItMatters: 'Journey problems compound over time. Early identification and escalation to the right team (Product, UX, CS) prevents churn and adoption stalls.',
        examples: [
          'Journey problem: customers who activate via email CTA hit a login wall before reaching the feature — conversion drops 60% at this step.',
        ],
      },
      {
        id: 't6-8',
        label: 'Feed product backlog and roadmap input back to product',
        description: 'Formally document and communicate product-level learnings — feature gaps, unexpected use cases, customer requests — to the Product team for roadmap consideration.',
        whyItMatters: 'The GTM team is closest to the market post-launch. Their insights are the highest-quality input for the next product cycle — but only if they\'re systematically captured and shared.',
        examples: [
          'Top 3 feature requests from Sales, CS, and customer interviews compiled into a backlog input document and reviewed with PM.',
        ],
      },
      {
        id: 't6-9',
        label: 'Capture learnings for the next release GTM',
        description: 'Document what worked, what didn\'t, and what should be done differently in the next GTM cycle. Maintain a living GTM retrospective that improves the process over time.',
        whyItMatters: 'GTM quality compounds when learnings are captured and applied. Without institutional memory, each launch reinvents the wheel.',
        examples: [
          'GTM retrospective document: "What we\'d do differently" — 5 specific process changes for next quarter\'s release.',
        ],
      },
    ],
  },
];

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'product-management',
    name: 'Product Management',
    shortName: 'PM',
    color: '#6366f1',
    bgColor: '#eef2ff',
    textColor: '#4338ca',
    phases: [
      { phaseId: 'phase1', role: 'owner', description: 'Owner: release scope, customer problem, business objective, roadmap / product strategy context.' },
      { phaseId: 'phase2', role: 'core-partner', description: 'Core partner: ensures GTM strategy and story are consistent with product strategy, scope, customer problem and roadmap context.' },
      { phaseId: 'phase3', role: 'contributes', description: 'Validates product accuracy, scope, release readiness and roadmap context.' },
      { phaseId: 'phase4', role: 'contributes', description: 'Product accuracy reviewer; provides expert validation and product deep-dive checks.' },
      { phaseId: 'phase5', role: 'contributes', description: 'Supports the launch as product expert; participates in events / webinars where relevant.' },
      { phaseId: 'phase6', role: 'owner', description: 'Owner: product feedback, roadmap implications and backlog-input prioritization.' },
    ],
  },
  {
    id: 'product-marketing',
    name: 'Product Marketing / PMM',
    shortName: 'PMM',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    textColor: '#6d28d9',
    phases: [
      { phaseId: 'phase1', role: 'contributes', description: 'Contributes market interpretation, audience, positioning input and launch significance assessment.' },
      { phaseId: 'phase2', role: 'owner', description: 'Owner: GTM strategy, positioning, messaging, audience, GTM motion, launch logic, release narrative, value story and success metrics / outcome hypothesis.' },
      { phaseId: 'phase3', role: 'owner', description: 'Owner: GTM plan, launch plan, message, audience and channel/content logic coordination.' },
      { phaseId: 'phase4', role: 'owner', description: 'Owner: core messaging, launch brief, external story and sales/customer-facing narrative.' },
      { phaseId: 'phase5', role: 'co-owner', description: 'Owner/co-owner: launch narrative, messaging consistency and GTM coordination during launch.' },
      { phaseId: 'phase6', role: 'owner', description: 'Owner: GTM learning, messaging / positioning optimization and launch retrospective.' },
    ],
  },
  {
    id: 'marketing-creative',
    name: 'Marketing / Creative / Visual',
    shortName: 'MKT',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    textColor: '#b45309',
    phases: [
      { phaseId: 'phase1', role: 'input', description: 'Gets early signal on potential campaign or creative direction needs.' },
      { phaseId: 'phase2', role: 'contributes', description: 'Contributes to how the story can become communication, creative direction and campaign potential.' },
      { phaseId: 'phase3', role: 'co-owner', description: 'Owner/co-owner: campaign plan, creative concept, landing page, social, email and event promotion.' },
      { phaseId: 'phase4', role: 'owner', description: 'Owner: external campaign materials, visual assets, landing page design and launch creative execution.' },
      { phaseId: 'phase5', role: 'owner', description: 'Owner: external campaign execution, publishing and creative / promotional channels.' },
      { phaseId: 'phase6', role: 'contributes', description: 'Analyzes campaign performance and optimizes channel/content operation.' },
    ],
  },
  {
    id: 'product-enablement',
    name: 'Product Enablement',
    shortName: 'PE',
    color: '#06b6d4',
    bgColor: '#ecfeff',
    textColor: '#0e7490',
    phases: [
      { phaseId: 'phase1', role: 'input', description: 'Understands early what product knowledge internal teams will need.' },
      { phaseId: 'phase2', role: 'contributes', description: 'Contributes to making the story teachable, understandable and internally transferable.' },
      { phaseId: 'phase3', role: 'owner', description: 'Owner: internal product enablement plan, training and product knowledge needs.' },
      { phaseId: 'phase4', role: 'owner', description: 'Owner: internal product knowledge assets, training, product explanation and scenario logic.' },
      { phaseId: 'phase5', role: 'owner', description: 'Owner: internal product knowledge transfer; monitors whether assets are usable.' },
      { phaseId: 'phase6', role: 'contributes', description: 'Updates internal product knowledge assets and training materials.' },
    ],
  },
  {
    id: 'sales-enablement',
    name: 'Sales Enablement',
    shortName: 'SE',
    color: '#10b981',
    bgColor: '#ecfdf5',
    textColor: '#047857',
    phases: [
      { phaseId: 'phase1', role: 'input', description: 'Signals sales-readiness implications and special preparation needs.' },
      { phaseId: 'phase2', role: 'contributes', description: 'Contributes sales story, discovery, qualification and objection-handling perspectives.' },
      { phaseId: 'phase3', role: 'owner', description: 'Owner: sales readiness plan, sales playbook, pitch flow and objection-handling structure.' },
      { phaseId: 'phase4', role: 'owner', description: 'Owner: sales asset structure, sales playbook, pitch, qualification support and sales training.' },
      { phaseId: 'phase5', role: 'owner', description: 'Owner: sales readiness, sales training, playbook activation and launch-time sales support.' },
      { phaseId: 'phase6', role: 'contributes', description: 'Updates sales guidance, playbook, objection handling and training.' },
    ],
  },
  {
    id: 'sales',
    name: 'Sales',
    shortName: 'SLS',
    color: '#f43f5e',
    bgColor: '#fff1f2',
    textColor: '#be123c',
    phases: [
      { phaseId: 'phase1', role: 'input', description: 'Input: customer pain, objections, sales situations and buying triggers.' },
      { phaseId: 'phase2', role: 'input', description: 'Validates whether the story works in real sales situations and what customer questions to expect.' },
      { phaseId: 'phase3', role: 'input', description: 'Validates whether sales motion, pitch, demo and outreach are usable.' },
      { phaseId: 'phase4', role: 'input', description: 'Input and validation: whether assets work in real sales conversations.' },
      { phaseId: 'phase5', role: 'owner', description: 'Owner: sales outreach, account conversations and opportunity creation / progression.' },
      { phaseId: 'phase6', role: 'contributes', description: 'Gives feedback on what worked, what objections emerged and what assets were missing.' },
    ],
  },
  {
    id: 'customer-success',
    name: 'Customer Success',
    shortName: 'CS',
    color: '#84cc16',
    bgColor: '#f7fee7',
    textColor: '#4d7c0f',
    phases: [
      { phaseId: 'phase1', role: 'input', description: 'Input: existing customer needs, adoption barriers and retention / expansion context.' },
      { phaseId: 'phase2', role: 'input', description: 'Input: adoption, onboarding, existing customer communication and customer health perspectives.' },
      { phaseId: 'phase3', role: 'co-owner', description: 'Owner/co-owner: existing customer adoption, onboarding, customer communication and renewal / expansion support.' },
      { phaseId: 'phase4', role: 'co-owner', description: 'Owner/reviewer: adoption, onboarding, existing customer communication and FAQ.' },
      { phaseId: 'phase5', role: 'owner', description: 'Owner: existing customer communication, adoption push, customer health and retention / expansion context.' },
      { phaseId: 'phase6', role: 'owner', description: 'Owner: adoption, customer health, renewal / expansion feedback and customer risk signals.' },
    ],
  },
  {
    id: 'journey-design',
    name: 'Journey Design / UX',
    shortName: 'JD',
    color: '#ec4899',
    bgColor: '#fdf2f8',
    textColor: '#9d174d',
    phases: [
      { phaseId: 'phase1', role: 'input', description: 'Input: workflow, journey, experience impact and customer touchpoint problems.' },
      { phaseId: 'phase2', role: 'contributes', description: 'Contributes journey, workflow, UX value, adoption friction and touchpoint coherence.' },
      { phaseId: 'phase3', role: 'contributes', description: 'Contributes touchpoint, onboarding, adoption flow and end-to-end journey coherence.' },
      { phaseId: 'phase4', role: 'contributes', description: 'Contributes journey touchpoints, onboarding/adoption logic and customer experience coherence.' },
      { phaseId: 'phase5', role: 'contributes', description: 'Monitors customer journey consistency and breaks between launch touchpoints.' },
      { phaseId: 'phase6', role: 'contributes', description: 'Identifies deeper customer insights, journey-level learnings and experience gaps.' },
    ],
  },
  {
    id: 'release-program-management',
    name: 'Release Program Management',
    shortName: 'RPM',
    color: '#f97316',
    bgColor: '#fff7ed',
    textColor: '#c2410c',
    phases: [
      { phaseId: 'phase1', role: 'contributes', description: 'Ensures that release scope, timeline, key milestones, dependencies, and decision points are visible and aligned.' },
      { phaseId: 'phase2', role: 'contributes', description: 'Helps align GTM strategy decisions with release timing, governance, and readiness expectations.' },
      { phaseId: 'phase3', role: 'co-owner', description: 'Co-owns or strongly coordinates the cross-functional GTM plan, milestones, dependencies, RACI, and decision log.' },
      { phaseId: 'phase4', role: 'contributes', description: 'Tracks the status of assets, enablement materials, reviews, approvals, risks, and blockers.' },
      { phaseId: 'phase5', role: 'co-owner', description: 'Coordinates launch readiness checkpoints, internal readiness status, and launch day / launch window activities.' },
      { phaseId: 'phase6', role: 'contributes', description: 'Supports launch retrospectives, open action items, and process learnings for the next release.' },
    ],
  },
  {
    id: 'portfolio-leadership',
    name: 'Portfolio / Business Leadership',
    shortName: 'PBL',
    color: '#64748b',
    bgColor: '#f8fafc',
    textColor: '#334155',
    phases: [
      { phaseId: 'phase1', role: 'core-partner', description: 'Sets business priority, portfolio alignment, strategic intent, investment context, and executive expectation for the initiative.' },
      { phaseId: 'phase2', role: 'contributes', description: 'Validates GTM strategy from a portfolio and business perspective; confirms alignment with strategic intent and investment rationale.' },
    ],
  },
];

export const ROLE_LABELS: Record<RoleType, string> = {
  'owner': 'Owner',
  'co-owner': 'Co-owner',
  'core-partner': 'Core Partner',
  'contributes': 'Contributes',
  'input': 'Input',
};

export const ROLE_COLORS: Record<RoleType, { bg: string; text: string; border: string }> = {
  'owner': { bg: '#1e293b', text: '#ffffff', border: '#1e293b' },
  'co-owner': { bg: '#334155', text: '#ffffff', border: '#334155' },
  'core-partner': { bg: '#475569', text: '#ffffff', border: '#475569' },
  'contributes': { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
  'input': { bg: '#ffffff', text: '#94a3b8', border: '#e2e8f0' },
};
