/**
 * Service-line taxonomy — see ADR-0001.
 *
 * P1: `lines` is the controlled key; `category` is prose. They never touch.
 *     NEVER parse `category` in code.
 * P2: Membership, anchor status, and ordering are one-line edits in THIS file.
 *     No component may hard-code a project id or a curated list.
 * P3: Every invariant the type system cannot express is asserted at module
 *     scope and fails `next build`.
 * P4: `sectionId` is the public URL contract; `id` is the internal key.
 * P5: The unsuffixed card instance is canonical and must render where it is
 *     visible by default.
 */

export type ServiceLine = 'websites' | 'apps' | 'seo' | 'automation' | 'ai-agents';

export type ServiceLineDef = {
  id: ServiceLine;
  /** Display label — used in headings, nav, and control copy. */
  label: string;
  /** DOM id of the section; also the nav href fragment. PUBLIC CONTRACT (P4). */
  sectionId: string;
  /** One-sentence client-facing framing, rendered under the heading. */
  blurb: string;
};

/**
 * Order here is the single source of truth for BOTH the nav order and the
 * section stack order. They must never diverge (Nielsen #4 — consistency).
 */
export const SERVICE_LINES: ServiceLineDef[] = [
  {
    id: 'websites',
    label: 'Websites',
    sectionId: 'projects-websites',
    // COUPLING (ADR-0001, deferred `proofStatus` trigger): the "one live client
    // build" clause is true ONLY because `houseplan-group` is cross-listed into
    // this line. If that cross-listing is ever removed, this sentence silently
    // becomes false — rewrite it, and adopt `proofStatus` at the same time.
    blurb:
      'Marketing and catalog sites. One live client build serving real customers today, ' +
      'plus three complete pitch packages with working demo sites.',
  },
  {
    id: 'apps',
    label: 'Apps',
    sectionId: 'projects-apps',
    blurb:
      'Standalone software products with their own data and interfaces — SaaS platforms, ' +
      'internal tools, and cross-platform desktop and mobile apps. Three are shipped and ' +
      'screenshotted; three are built and documented but not yet photographed.',
  },
  {
    id: 'seo',
    label: 'SEO',
    sectionId: 'projects-seo',
    blurb:
      'Organic-search and AI-answer architecture as the deliverable: crawlable taxonomies, ' +
      'entity and schema build-out, and redirect consolidation. Two live client sites — a ' +
      'revenue-generating storefront that also appears under Websites, and a technical ' +
      'remediation engagement for its parent company.',
  },
  {
    id: 'automation',
    label: 'Automation',
    sectionId: 'projects-automation',
    blurb:
      'Triggered workflow systems that remove manual steps — intake, routing, approvals, ' +
      'alerting, and reporting. The deepest and most established line here, by a wide margin.',
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    sectionId: 'projects-ai-agents',
    blurb:
      'Agentic systems where coordinated AI does the work — not a single model call bolted ' +
      'onto a workflow. The newest line: one flagship platform, held to that definition ' +
      'rather than padded to look deeper.',
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  /** UNCHANGED — freeform display kicker. Prose, never parsed (P1). */
  category: string;
  stack: string[];
  description: string;
  highlights: string[];
  /**
   * Service-line membership. Non-empty BY TYPE; `lines[0]` is the PRIMARY line.
   *
   * Tuple, not `ServiceLine[]`: tsconfig has `strict: true` but
   * `noUncheckedIndexedAccess` is OFF, so `ServiceLine[]` would make `lines[0]`
   * non-null by silent assumption rather than by proof.
   */
  lines: [ServiceLine, ...ServiceLine[]];
  /** Exactly one project per line. Must equal `lines[0]` when set. */
  anchorFor?: ServiceLine;
  gradient: string;
  screenshots?: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'ask-trevor',
    title: 'Ask Trevor',
    tagline: 'AI Property-Development Operating System',
    category: 'AI Platform · Multi-Agent Orchestration',
    stack: [
      'LangGraph',
      'Claude API (claude-sonnet-4)',
      'Firestore',
      'Google Cloud Storage',
      'Vertex AI Vector Search',
      'Pub/Sub',
      'ArcGIS',
      'LangSmith',
      'Python',
    ],
    description:
      'AI property-development operating system for Australia, guiding homeowners, owner-builders, architects, engineers, certifiers, surveyors, town planners, builders, and trades across every stage of a development — from planning intelligence through approvals, construction coordination, and compliance. A network of specialised AI agents works behind a single user-facing persona, "Trevor", connected through a common orchestration and safety layer.',
    highlights: [
      'Multi-agent architecture behind one persona: specialised agents coordinated by an internal orchestration agent ("Astro"), with Trevor as the only user-facing intelligence',
      'Deterministic regulatory path — the Planning Rules Agent runs no LLM in rules determinations, so identical inputs always yield identical outputs',
      'Council knowledge answers are advisory and source-cited, never presented as determinations',
      'ArcGIS spatial resolution turns an address into zone, lot, overlays, and planning controls',
      'Phase 1 MVP live: session loader, LLM node, address resolver, Firestore chat sessions, and an end-to-end session + ArcGIS flow',
      'Planning Rules Agent live for two NSW councils — Kempsey and Port Macquarie-Hastings',
      'LangSmith tracing across all orchestration nodes for full observability',
    ],
    lines: ['ai-agents'],
    anchorFor: 'ai-agents',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #0891b2 100%)',
    screenshots: ['/screenshots/ask-trevor/01-trevor-ai-command-centre.png'],
    liveUrl: 'https://ask-trevor-report.vercel.app',
  },
  {
    id: 'irongrid-it',
    title: 'IronGrid IT',
    tagline: 'Emergency Hardware Procurement',
    category: 'Approval Workflow · Business Automation',
    stack: ['n8n', 'Webhooks', 'Gmail', 'Google Sheets'],
    description:
      'Tiered procurement pipeline for industrial manufacturing sites where downtime costs thousands per minute. Auto-approves under $250, routes to a project manager for $250–$1,500, and to a director above $1,500. Includes 30-minute escalation timeouts and a 16-column Google Sheets audit log.',
    highlights: [
      'Unique Request ID generated per request (REQ-XXXXXXXX-XXXX format)',
      'Three approval tiers: auto-approve (<$250), PM ($250–$1,500), director (>$1,500)',
      '30-minute escalation timeout — unanswered PM approvals auto-escalate to a secondary contact',
      'One-click APPROVE / DENY buttons in the approval email — no login required',
      'Full Google Sheets audit log: every request, decision, and timestamp recorded across 16 columns',
      'Real-time email notification to the technician with the GO/NO-GO decision',
      'Eliminates phone tag and manual email chains during critical downtime events',
    ],
    lines: ['automation'],
    anchorFor: 'automation',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #b45309 100%)',
    screenshots: [
      '/screenshots/irongrid-it/01-workflow-canvas.jpg',
      '/screenshots/irongrid-it/02-auto-approval-email.jpg',
      '/screenshots/irongrid-it/03-pm-approval-email.jpg',
      '/screenshots/irongrid-it/04-director-approval-email.jpg',
      '/screenshots/irongrid-it/05-sheets-audit-log.jpg',
    ],
    repoUrl: 'https://github.com/michaeljoniferecmj/irongrid-hardware-procurement',
  },
  {
    id: 'iron-and-vine',
    title: 'Iron & Vine',
    tagline: 'Lead Qualification System',
    category: 'Lead Generation · CRM Automation',
    stack: ['n8n', 'Webhooks', 'Google Sheets', 'Gmail', 'Discord'],
    description:
      "Ingests event-booking inquiries from a mobile meadery's website, validates and normalizes the payload, qualifies leads against service-area and guest-count rules, then routes each lead to the correct Google Sheets CRM tab with a tailored email response and Discord notification.",
    highlights: [
      'Webhook intake with full payload validation and normalization',
      'Zip code service-area check — out-of-range leads routed to a separate sheet with Discord alert',
      'Guest count switch: <50 (Low Priority), 50–200 (Standard), >200 (Requires Review)',
      'Event type branching: Wedding vs Corporate/Festival with separate CRM tabs and email templates',
      'Error path captures malformed submissions to an Errors tab — no inquiry is lost',
      'Replaced manual copy-paste triage by the events coordinator',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1e293b 0%, #6366f1 100%)',
    screenshots: [
      '/screenshots/iron-vine/01-wedding-qualified-branch.jpg',
      '/screenshots/iron-vine/02-requires-review-branch.jpg',
      '/screenshots/iron-vine/03-out-of-range-branch.jpg',
      '/screenshots/iron-vine/04-error-handler-branch.jpg',
    ],
  },
  {
    id: 'ginkgo-leaf-academy',
    title: 'Ginkgo Leaf Academy',
    tagline: 'Enrollment Inquiry Prioritization',
    category: 'Lead Triage · Business Automation',
    stack: ['n8n', 'Webhooks', 'Google Sheets', 'Discord'],
    description:
      'Automated enrollment-inquiry triage for a Montessori school. Inquiries arrive via webhook, get tagged URGENT or STANDARD based on how soon the desired start date is, every lead is logged to Google Sheets, and urgent inquiries fire an immediate Discord alert to staff.',
    highlights: [
      'Priority computed from desired-start-date proximity — no manual inbox triage',
      'Every lead logged to Google Sheets regardless of priority, so nothing slips',
      'Discord alert fires only for URGENT leads — staff attention goes where it matters',
      'Input sanitization with sensible fallbacks (missing phone → N/A) and submission timestamps',
      'Fully documented workflow: architecture diagram, sample payloads, and setup guide in the repo',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #14532d 0%, #65a30d 100%)',
    screenshots: [
      '/screenshots/ginkgo-leaf-academy/canvas.jpg',
      '/screenshots/ginkgo-leaf-academy/sheet.jpg',
      '/screenshots/ginkgo-leaf-academy/discord.jpg',
    ],
    repoUrl: 'https://github.com/michaeljoniferecmj/ginkgo-leaf-academy',
  },
  {
    id: 'vellum-and-vine',
    title: 'Vellum & Vine',
    tagline: 'Lead Qualification & Brief Generator',
    category: 'Lead Generation · CRM Automation',
    stack: ['n8n', 'HubSpot', 'Google Docs', 'Slack', 'Gmail'],
    description:
      'Turns boutique agency lead intake into a fully qualified, CRM-synced, brief-ready pipeline in under 30 seconds. Applies a 6-rule scoring algorithm (0–50 score, S/A/B/C tiers), enforces a $3K budget gate, upserts HubSpot contacts, and generates a personalized Discovery Brief Google Doc from a 13-token template.',
    highlights: [
      '6-rule scoring algorithm producing S/A/B/C lead tiers',
      '$3K monthly budget hard gate — disqualified leads get a courteous rejection email automatically',
      'HubSpot contact and deal upserted with full scoring metadata',
      'Personalized Discovery Brief Google Doc generated from a 13-token template',
      'Slack alert to team lead with a direct link to the generated brief',
      'Replaced ~4 hours/week of manual triage for the agency team',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #4338ca 100%)',
  },
  {
    id: 'resonance-stringed-instruments',
    title: 'Resonance Stringed Instruments',
    tagline: 'Repair Triage System',
    category: 'Business Process Automation',
    stack: ['n8n', 'Webhooks', 'Google Sheets', 'Gmail', 'Discord'],
    description:
      '23-node n8n workflow with 5 execution paths. Validates intake payloads, classifies inquiries into urgent repair, standard repair, and sales/appraisal tracks, reads live workshop capacity from Google Sheets, creates project-board cards, and emails customers a branded confirmation with a unique tracking ID.',
    highlights: [
      '23 nodes across 5 execution paths: urgent repair, standard repair, sales, appraisal, dead-letter',
      'Live workshop capacity check from Google Sheets before routing',
      'Unique tracking ID generated per inquiry for customer reference',
      'Dead-letter path with Discord alerts ensures no lead is ever lost',
      'Branded confirmation email sent to customer within seconds of submission',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #0d9488 100%)',
    repoUrl: 'https://github.com/michaeljoniferecmj/resonance-stringed-instruments',
  },
  {
    id: 'root-and-rind-bistro',
    title: 'Root & Rind Bistro',
    tagline: 'AI Staff Knowledge Assistant',
    category: 'AI Integration · Internal Tooling',
    stack: ['n8n', 'OpenAI GPT-4o-mini', 'Gmail'],
    description:
      'GPT-4o-mini chatbot for restaurant waitstaff. Answers real-time questions about dish sourcing, farm origins, allergens, and HR policies from a curated knowledge base. Automatically escalates unknown questions to HR via email.',
    highlights: [
      'Powered by OpenAI GPT-4o-mini with a curated knowledge base of dishes, farms, and allergens',
      'Handles two knowledge domains: menu/sourcing questions and HR policy questions',
      'Automatic email escalation to HR Manager when question falls outside the knowledge base',
      'Zero onboarding required — staff interact via a simple chat interface',
      'Knowledge base updated via a CSV file, no code changes needed',
    ],
    // Automation, NOT AI Agents (ADR-0001 precedence criterion 1): a single
    // GPT-4o-mini node inside an n8n flow is not an agentic system.
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)',
    screenshots: [
      '/screenshots/root-and-rind/workflow-success.jpg',
      '/screenshots/root-and-rind/workflow-false.jpg',
    ],
  },
  {
    id: 'terrafirm-machinery-academy',
    title: 'TerraFirm Machinery Academy',
    tagline: 'Corporate Enrollment Engine',
    category: 'Lead Scoring · Sales Automation',
    stack: ['n8n', 'Webhooks', 'Google Sheets', 'Discord', 'Gmail'],
    description:
      'Segments B2B vs. individual leads, generates tiered per-student quotes, scores priority (High/Medium/Low), logs 22-column lead data to Google Sheets, fires Discord alerts, and queues personalized Gmail drafts for sales reps.',
    highlights: [
      'B2B segmentation: filters personal email domains out of the corporate pipeline automatically',
      'Tiered pricing engine: Tier 1/2/3 per-student quotes generated automatically',
      'Priority scoring: High/Medium/Low based on student volume and enrollment urgency',
      '22-column Google Sheets lead log captures full inquiry schema per submission',
      'Discord alerts for High and Medium priority opportunities — sales team responds in minutes',
      'Gmail draft queued for sales rep review with pre-filled personalized quote',
      'Includes 5 ready-to-run test cases with curl script',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
  },
  {
    id: 'velvet-flutter-salon-hub',
    title: 'Velvet Flutter Salon Hub',
    tagline: 'Staff Status Board',
    category: 'Web Application · PHP',
    stack: ['PHP', 'SQLite', 'PDO', 'CSS'],
    description:
      'Dependency-free internal PHP communication board for a lash and brow studio. SQLite backend, CSV seeding on first run, fully FTP-deployable on any shared host — no Composer, no server requirements.',
    highlights: [
      'Zero external dependencies — pure PHP + SQLite, no Composer required',
      'FTP-deployable: works on any shared hosting with PHP 7.4+',
      'PRG (Post–Redirect–Get) pattern eliminates double-submit on page refresh',
      'Staff members and status types are allowlisted to prevent unexpected POST values',
      'CSV seeding on first run — 15 starter rows loaded automatically, never runs twice',
      'All output escaped via a single e() helper — auditable XSS protection',
      'Reverse-chronological feed always showing the 10 most recent status updates',
    ],
    lines: ['apps'],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #db2777 100%)',
    screenshots: [
      '/screenshots/velvet-flutter-salon-hub/status-board.png',
      '/screenshots/velvet-flutter-salon-hub/new-update-posted.png',
    ],
  },
  {
    id: 'houseplan-group',
    title: 'HousePlan Group',
    tagline: 'Digital House Plan Marketplace',
    // Kicker rewritten at Gate A1 for prose/taxonomy coherence: this card is
    // 100% of what a visitor reads under the SEO heading.
    category: 'SEO Architecture · Client Website',
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Houzez Theme', 'PHP'],
    description:
      'Live production website for an Australian house plan business (a subsidiary of Dennis Partners Structural & Civil Engineering, est. 1974). Sells professionally designed house, granny flat, garage, and shed-house plans as instant digital downloads in editable AutoCAD and Revit formats, with a browsable catalog filtered by architectural style and plan category.',
    highlights: [
      'Deployed and serving real customers at houseplangroup.com.au',
      'WooCommerce digital-download storefront — tiered plan sets from $90 preliminary PDFs to ~$980 construction sets with editable Revit/CAD files',
      'Faceted plan search: bedrooms, bathrooms, storeys, floor size, plus lot-specific filters (width, depth, shape, slope)',
      'Browse-by-style taxonomy with 10+ architectural styles (Hamptons, Coastal, Farmhouse, Queenslander…), each with its own SEO landing page',
      'Plan detail pages with 3D render galleries, spec tables, and plan-set comparison',
      'Educational content hub: How It Works, What You Get, DA vs CDC approval-pathway guides, and FAQ',
    ],
    // The ONE cross-listed project (FR-03). Primary line is `seo` — it clears
    // precedence criterion 3 (generated page-per-style taxonomy + indexable
    // faceted catalog) before criterion 4. It independently clears Websites
    // (live WooCommerce storefront), which is what earns the second line.
    // Its unsuffixed card therefore renders in #projects-seo; the Websites
    // section renders `project-card-houseplan-group-websites`.
    lines: ['seo', 'websites'],
    anchorFor: 'seo',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #059669 100%)',
    screenshots: [
      '/screenshots/houseplan-group/01-home-hero.png',
      '/screenshots/houseplan-group/02-plan-detail-seaview.png',
      '/screenshots/houseplan-group/03-home-styles-section.png',
      '/screenshots/houseplan-group/04-how-it-works.png',
      '/screenshots/houseplan-group/05-what-you-get.png',
      '/screenshots/houseplan-group/06-mobile-home.png',
    ],
    liveUrl: 'https://houseplangroup.com.au',
  },
  {
    id: 'dennis-partners-seo',
    title: 'Dennis Partners',
    tagline: 'Technical SEO & GEO Remediation',
    category: 'SEO Architecture · Client Engagement',
    stack: ['WordPress', 'Rank Math Pro', 'OptimizePress', 'Schema.org JSON-LD', 'MySQL', 'PHP'],
    description:
      'Technical SEO and GEO (Generative Engine Optimization) remediation for a NSW structural and civil engineering firm operating since 1974 — the parent company of HousePlan Group. A read-only audit of all 36 published URLs first, then a staged remediation: duplicate-title and missing-H1 fixes across the service-area pages, redirect consolidation of competing duplicate pages, a full entity and schema build-out, and removal of placeholder content left behind by a previous developer.',
    highlights: [
      'Audited all 36 published URLs individually — nothing sampled, nothing inferred — before changing anything',
      '38 logged items: verified changes each carrying its own rollback command, plus three flagged findings held for client decision',
      'Flagged the engagement’s highest-impact finding: a country-level firewall admitting Google and Bing but blocking US-based AI crawlers (GPTBot, ClaudeBot, PerplexityBot) — which would make the GEO work invisible to answer engines until the client lifts it',
      'Fixed 12 pages that shared one identical title copied from an unrelated service page; added the missing H1 to all 11 service-area pages',
      'Consolidated 23 URLs competing for 11 local queries into 11 single-hop 301s — the duplicates were orphaned, templated, and carried doorway-page risk; originals drafted rather than deleted',
      'Removed a stale static robots.txt advertising a nine-month-old 5-URL sitemap that was shadowing the real 35-URL index',
      'Entity and schema build-out: ProfessionalService + Organization with verified NAP and trading hours, FAQPage across 4 pages (20 Q&As), Service schema on all 8 service pages, and Person schema carrying each director’s professional registration — CPEng/NER for one, Building Practitioner registration for the other',
      'Purged 1,150+ references to the previous developer’s dead domain across 52 database rows, plus a 29 MB error log left rotating since 2025',
      'Removed fabricated demo content the site had been live with: invented testimonials, Lorem Ipsum FAQ answers, and a placeholder sales funnel',
      'GEO audit against 8 target AI-answer queries; published indicative pricing as visible copy and in schema — the highest-value question gap identified',
    ],
    // Single line. Clears precedence criterion 3 on shipped search-facing
    // artifacts (schema, redirect consolidation, sitemap correction, title/H1
    // remediation). Deliberately NOT cross-listed to Websites: the deliverable
    // is SEO remediation on an existing site, not a site build — cross-listing
    // it would pad Websites, which FR-03 forbids.
    lines: ['seo'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
    liveUrl: 'https://dennispartners.com.au',
  },
  {
    id: 'reviewpilot',
    title: 'ReviewPilot',
    tagline: 'AI-Powered Review Management Platform',
    category: 'SaaS Product · Full-Stack',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe', 'Claude API', 'Tailwind CSS'],
    description:
      'Multi-tenant SaaS that helps local service businesses generate, monitor, and respond to online reviews from a single dashboard. Aggregates Google, Yelp, and Facebook reviews into one inbox, sends automated SMS/email review requests, drafts on-brand AI replies with a human approval queue, and handles subscription billing end-to-end. Nine modules built and shipped with 785 passing tests and zero TypeScript errors.',
    highlights: [
      '9 of 9 planned modules complete — auth, aggregation, request engine, dashboard, AI responses, reporting, billing, onboarding/marketing site, and admin tools',
      '785 automated tests passing across the platform, 0 TypeScript errors',
      'Multi-tenant architecture with PostgreSQL row-level security: organizations, locations, and role-based membership (owner/manager/staff)',
      'Review aggregation from Google Business Profile, Yelp Fusion, and Meta Graph APIs into a unified, deduplicated inbox',
      'SMS/email review request campaigns via Twilio and SendGrid with multi-touch drip sequences and opt-out handling',
      'Claude-powered response drafting with tone profiles, auto-reply rules, sentiment classification, and a human approval queue for sub-4-star reviews',
      'Stripe subscription billing with webhook idempotency log, plus an internal admin panel with MRR dashboard and per-org feature flags',
    ],
    lines: ['apps'],
    anchorFor: 'apps',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    screenshots: [
      '/screenshots/reviewpilot/landing.png',
      '/screenshots/reviewpilot/features.png',
      '/screenshots/reviewpilot/pricing.png',
    ],
  },
  {
    id: 'heides-cozy-spa',
    title: "Heide's Cozy Spa",
    tagline: 'Website Pitch Package & Working Demo',
    category: 'Web Development · Client Pitch',
    stack: ['HTML/CSS', 'JavaScript', 'UX Wireframes', 'Design Tokens', 'WordPress (proposed)'],
    description:
      "Full pre-sale pitch package for a neighborhood spa in Minglanilla, Cebu that currently exists only on Facebook: discovery brief, mobile-first UX sitemap and wireframes, a UI style tile with every hex value traced to the client's real brand assets, a working six-page demo site, and a client-facing proposal deck.",
    highlights: [
      "Discovery brief grounded entirely in the client's own materials — a photographed 14-item services poster, logo, and interior photos; nothing invented",
      'Working 6-page demo site: Home, Services & Pricing, Book an Appointment, About, Location & Hours, Contact',
      'Mobile-web-first IA built for "massage near me" searches — tap-to-call primary CTA on every page, booking form as the after-hours channel',
      "Full menu on one page, grouped exactly like the client's printed poster (Massages / Scrubs & Facials / Combos)",
      'UI style tile: sage-green, gold, and cream palette with every token traced to a specific client asset',
      'Proposal recommends WordPress + Google Business Profile, with real-time booking and payments deliberately deferred from v1',
    ],
    // Websites, not SEO: search-informed IA rationale is explicitly excluded by
    // precedence criterion 3 — no shipped taxonomy, no measured organic outcome.
    lines: ['websites'],
    gradient: 'linear-gradient(135deg, #1c3527 0%, #b7791f 100%)',
    screenshots: [
      '/screenshots/heides-cozy-spa/01-home-hero.png',
      '/screenshots/heides-cozy-spa/02-services-pricing.png',
      '/screenshots/heides-cozy-spa/03-booking.png',
    ],
    liveUrl: 'https://heides-cozy-spa-demo.vercel.app',
    repoUrl: 'https://github.com/michaeljoniferecmj/heides-cozy-spa-demo',
  },
  {
    id: 'vision-sportswear-ph',
    title: 'Vision Sportswear PH',
    tagline: 'Custom Sportswear Demo Site & Pitch',
    category: 'Web Development · Client Pitch',
    stack: ['HTML/CSS', 'JavaScript', 'GSAP', 'Swiper', 'Alpine.js', 'WordPress (proposed)'],
    description:
      'Pitch package and zero-build demo site for a Philippine custom sublimation sportswear printer whose entire sales pipeline lives in Facebook Messenger DMs. Turns "DM us for pricing" into a structured path: gallery-first homepage, dual-axis catalog, and a four-step quote request form — with Messenger and WhatsApp kept front and center alongside it.',
    highlights: [
      'Single-page demo built on a reusable zero-build kit: vanilla JS over vendored GSAP, ScrollTrigger, Lenis, Swiper, and Alpine — no bundler required',
      'Dual-axis catalog IA: browse by product (jerseys, shorts, polos) and by buyer (basketball teams, corporate sponsors, civic/fraternal clubs) simultaneously',
      "Four-step quote form — what they need → sizing → logo/design upload → contact and budget — designed so buyers don't need every detail figured out",
      '"Powered by Epson SureColor" trust badge placed at three deliberate high-trust moments, including next to the quote CTA',
      'Gold reserved exclusively for the Request a Quote button — impossible to miss when it counts',
      'Process transparency baked into the homepage: Inquire → Design Proof → Approve → Production → Delivery',
    ],
    // Websites, not SEO: a single-page demo has no page-per-facet to index.
    lines: ['websites'],
    anchorFor: 'websites',
    gradient: 'linear-gradient(135deg, #101c3f 0%, #c9a227 100%)',
    screenshots: [
      '/screenshots/vision-sportswear-ph/01-home-hero.png',
      '/screenshots/vision-sportswear-ph/02-catalog.png',
      '/screenshots/vision-sportswear-ph/03-process.png',
      '/screenshots/vision-sportswear-ph/04-quote-form.png',
    ],
    liveUrl: 'https://vision-sportswear-demo.vercel.app',
    repoUrl: 'https://github.com/michaeljoniferecmj/vision-sportswear-demo',
  },
  {
    id: 'hi-tech-automotive',
    title: 'Hi-Tech Automotive',
    tagline: 'Website Redesign Pitch & Working Demo',
    category: 'Web Development · Client Pitch',
    stack: ['HTML/CSS', 'JavaScript', 'GSAP', 'Design Tokens', 'WordPress (proposed)'],
    description:
      'Seven-page redesign concept for an auto repair shop in Silverlake, Los Angeles — replacing a dated stock-theme site with a zero-build demo whose entire visual language is derived from the shop itself: signage, storefront brick, and service photography. Built for a redesign pitch where the client can open the demo from a folder with no internet.',
    highlights: [
      'Seven pages including dedicated Hybrid & EV and Classics & Motorsport service lines the old site buried',
      "Brand color corrected by evidence: four physical sources of the shop's brick red overruled the old website's stock-theme orange",
      'Zero build step — vendored GSAP/ScrollTrigger as classic scripts so the demo runs from file:// in a client meeting',
      'Self-hosted woff2 fonts, no CDN calls; WCAG contrast checked by computation',
      'Three-tier design token system (tokens → base → kit) reusable across client pitches',
      'prefers-reduced-motion respected throughout the GSAP scroll choreography',
    ],
    // Websites, not SEO: seven hand-authored pages is a sitemap, not a
    // generated page-per-term taxonomy.
    lines: ['websites'],
    gradient: 'linear-gradient(135deg, #3f1d1d 0%, #b45309 100%)',
    screenshots: [
      '/screenshots/hi-tech-automotive/hi-tech-automotive-1920x1080.jpg',
      '/screenshots/hi-tech-automotive/hi-tech-automotive-1200x900.jpg',
      '/screenshots/hi-tech-automotive/hi-tech-automotive-mobile-1170x1992.jpg',
    ],
    liveUrl: 'https://hi-tech-automotive-demo.vercel.app',
    repoUrl: 'https://github.com/michaeljoniferecmj/hi-tech-automotive-demo',
  },
  {
    id: 'shop-management',
    title: 'Shop Management System',
    tagline: 'Shopee Seller Backend & Web Admin',
    category: 'Full-Stack Platform · Backend Engineering',
    stack: ['TypeScript', 'Fastify', 'Next.js 14', 'PostgreSQL', 'Prisma', 'BullMQ', 'Redis', 'Gmail API', 'Turborepo'],
    description:
      "Cloud backend and web admin for a Shopee live seller in the Philippines, companion to an existing Android sticker-printing app. Continuously ingests Shopee order-notification emails from Gmail via OAuth2 watch/Pub/Sub push, normalizes customers and parcels into PostgreSQL, and exposes a fast lookup API so the seller can see a buyer's completed/returned/cancelled history live on stream.",
    highlights: [
      'Turborepo + pnpm monorepo: Fastify API, Next.js 14 admin, and BullMQ background workers sharing one Prisma schema',
      'Gmail ingestion pipeline: watch/Pub/Sub push with a polling fallback, targeting sub-5-minute email-to-database latency',
      'Parcel lifecycle tracking: shipping → delivered → completed / returned / cancelled, with an append-only event log',
      'Hot-path customer lookup API for the Android app with a 500ms p95 latency target, secured by a rotatable hashed API key',
      'Encrypted OAuth token storage and Pub/Sub webhook request verification',
      'Deployed to Railway (Singapore) with PostgreSQL + Redis, migrations applied, and green CI (lint, typecheck, build)',
    ],
    // Apps, not Automation: the Gmail ingestion pipeline is an implementation
    // detail of a backend + admin platform (criterion 2 — datastore + own UI).
    lines: ['apps'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #ea580c 100%)',
    screenshots: [
      '/screenshots/shop-management/01-dashboard.png',
      '/screenshots/shop-management/02-gmail-connected.png',
      '/screenshots/shop-management/03-gmail-disconnected.png',
    ],
  },
  {
    id: 'midnight-molar',
    title: 'Midnight Molar',
    tagline: 'Emergency Dental Triage',
    category: 'Healthcare Automation',
    stack: ['n8n', 'Webhooks', 'Discord', 'Slack', 'Google Sheets'],
    description:
      'After-hours dental emergency triage workflow. Routes urgent cases (pain level 8+) to Discord/Slack for immediate staff response and logs every submission to Google Sheets for tracking and review.',
    highlights: [
      'Pain level threshold gate: cases rated 8+ trigger immediate Discord/Slack alert',
      'Every submission logged to Google Sheets regardless of urgency level',
      'Dual notification channels: Discord for staff chat, Slack for operations',
      'Handles after-hours coverage without requiring on-call staff to monitor inboxes',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #dc2626 100%)',
    screenshots: ['/screenshots/midnight-molar/workflow-canvas.png'],
    repoUrl: 'https://github.com/michaeljoniferecmj/midnight-molar-triage',
  },
  {
    id: 'obsidian-ridge',
    title: 'Obsidian Ridge',
    tagline: 'Weather-Aware Activity Safety Alerts',
    category: 'Real-Time Alert System',
    stack: ['n8n', 'OpenWeatherMap API', 'Telegram', 'Google Sheets'],
    description:
      'Monitors live weather conditions for guest activity bookings at a luxury glamping resort. Sends real-time Telegram alerts to staff when wind, cloud cover, or rain conditions make activities unsafe.',
    highlights: [
      'OpenWeatherMap API integration for live weather data per booking location',
      'Activity-specific safety thresholds: wind >15 knots for kayaking, cloud cover >60% for stargazing',
      'Telegram alert to staff with specific condition that triggered the warning',
      'API failure path: error alert sent to Founder + logged to Google Sheets',
      'Protects guests and equipment by giving staff time to act before conditions worsen',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
    repoUrl: 'https://github.com/michaeljoniferecmj/obsidian-ridge',
  },
  {
    id: 'peak-canvas-glamping',
    title: 'Peak Canvas Glamping',
    tagline: 'High-Wind Safety Alert System',
    category: 'Real-Time Alert System',
    stack: ['n8n', 'OpenWeatherMap API', 'Slack', 'Cron'],
    description:
      'Polls OpenWeatherMap every 4 hours and pushes Slack alerts when sustained wind speed or gusts exceed the safety threshold for canvas yurt structures at Big Sur, CA. Silent exit when conditions are safe — zero alert fatigue.',
    highlights: [
      'Cron-scheduled every 4 hours — fully autonomous, no manual checks needed',
      '25 mph wind threshold matches canvas yurt rated wind-load tolerance',
      'Silent exit on safe conditions — alert fatigue eliminated by design',
      'Slack message includes location, wind speed, gusts, and timestamp',
      'API failure routed to a dedicated operations error channel',
      'Gives on-site team time to secure flaps, drop awnings, or relocate guests',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1f2937 0%, #0891b2 100%)',
  },
  {
    id: 'refined-cabins',
    title: 'Refined Cabins',
    tagline: 'Material Procurement & Multi-Stage Approval Engine',
    category: 'Approval Workflow · Business Automation',
    stack: ['n8n', 'Webhooks', 'Gmail', 'Google Sheets'],
    description:
      'Two-gate approval pipeline for exotic leather and aviation upholstery sourcing. A Master Craftsman quality gate is followed by a Project Manager financial gate before any purchase order is released. Full audit log and live project board.',
    highlights: [
      'Zone 1 — Intake: webhook-triggered sourcing request from sourcing agents',
      'Zone 2 — Craftsman Gate: email with Approve/Reject links sent to Master Craftsman; rejection sends agent back to source alternatives',
      'Zone 3 — PM Gate: cost, vendor terms, and budget-fit approval by Project Manager',
      'Zone 4 — Fulfillment: status flipped to In-Transit on project board on PM approval',
      'Full audit log captures every decision, timestamp, and approver',
      'Used for Bentley, Rolls-Royce, Porsche, and Gulfstream cabin re-trim projects',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #292524 0%, #92400e 100%)',
  },
  {
    id: 'shield-and-canopy-insurance',
    title: 'Shield & Canopy Insurance Group',
    tagline: 'License Compliance Alert System',
    category: 'Compliance Automation',
    stack: ['n8n', 'Google Sheets', 'Gmail'],
    description:
      'Monitors insurance agent license expiration dates across a 30-agent dataset. Sends tiered alerts at 90, 30, and 7-day windows to agents and compliance managers, preventing regulatory lapses.',
    highlights: [
      '30-agent dataset with multi-state license tracking',
      'Three alert tiers: 90-day early warning, 30-day action required, 7-day critical',
      'Agents receive personalized emails; compliance managers receive summary reports',
      'Runs on a daily schedule — no manual monitoring required',
      'Prevents license lapses that would trigger regulatory penalties or lost sales',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  },
  {
    id: 'summit-ridge-heritage',
    title: 'Summit Ridge Heritage Restorations',
    tagline: 'Legacy Communication Bridge',
    category: 'CRM Migration · Email Automation',
    stack: ['n8n', 'Gmail', 'Google Drive', 'Google Sheets'],
    description:
      'Monitors a legacy Gmail inbox for a heritage home renovation contractor. Classifies emails by type (permit, bid, client communication), extracts key data, routes PDF and image attachments to organized Google Drive folders, and logs every message to a project tracker.',
    highlights: [
      'Gmail trigger polls legacy inbox every 60 seconds',
      'Email classifier: permit, bid, or client communication routing',
      'SplitInBatch node uploads PDF and image attachments to organized Google Drive folders',
      'Auto-reply to senders and CRM forwarding during migration window',
      'Full message log in Google Sheets project tracker — date, sender, type, snippet',
      'Bridge pattern: runs in parallel with new CRM until migration is complete',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #3f3f46 0%, #a16207 100%)',
  },
  {
    id: 'velox-lead-migration',
    title: 'Velox Lead Migration',
    tagline: 'Lead Migration Bridge',
    category: 'CRM Migration · Email Automation',
    stack: ['n8n', 'IMAP', 'Webhooks'],
    description:
      'Monitors a legacy IMAP inbox for SEO lead emails, parses contact details (name, email, service, budget) via regex, routes leads by budget priority, and forwards them to a new CRM via webhook. Zero data loss during system migration.',
    highlights: [
      'IMAP trigger polls inbox every 60 seconds for new SEO lead emails',
      'Subject keyword filter: "Audit Request" OR "Backlink Inquiry"',
      'Regex extraction: Name, Email, Service Type, and Budget from email body',
      'Budget-based priority routing before CRM webhook forward',
      'Unmatched emails silently ignored — no noise, no false positives',
      'Zero data loss guarantee during legacy-to-new-CRM transition period',
    ],
    // Automation, NOT SEO: the CLIENT is in SEO; the DELIVERABLE is an
    // IMAP→CRM bridge. Precedence criterion 3 excludes "the client merely
    // operating in the SEO industry" — this is the exact case a keyword
    // matcher would have mis-filed (P1).
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)',
  },
  {
    id: 'veridian-curls-and-tones',
    title: 'Veridian Curls & Tones',
    tagline: 'Post-Service Care Automation',
    category: 'Customer Engagement',
    stack: ['n8n', 'Google Sheets', 'Gmail', 'Discord'],
    description:
      'Sends personalized aftercare emails to salon clients 48 hours after their appointment, matched to service type (Chemical/Color or Natural Styling). Simultaneously notifies the assigned stylist via Discord to follow up personally.',
    highlights: [
      'Google Sheets checkout log triggers the workflow per completed appointment',
      'Service-matched email: Chemical/Color clients get vivid color aftercare, Natural Styling get texture care guide',
      'Stylist Discord notification fires simultaneously for personal follow-up',
      'Error path: missing or invalid email logged to Error Log tab, processing stopped cleanly',
      '48-hour delay built into the workflow — no manual scheduling needed',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #831843 0%, #ec4899 100%)',
  },
  {
    id: 'spine-and-ledger',
    title: 'Spine & Ledger',
    tagline: 'Event-to-Inventory Sync',
    category: 'Calendar Integration',
    stack: ['n8n', 'Google Calendar', 'Google Sheets'],
    description:
      "Monitors a bookstore's Google Calendar, filters events by keyword (Author, Signing, Launch), and syncs relevant events to an inventory prep Google Sheet with event title, date, time, and book/ISBN description.",
    highlights: [
      'Google Calendar trigger polls for new and updated events automatically',
      'Keyword filter: "Author", "Signing", or "Launch" — case-insensitive matching',
      'Non-matching events (e.g. "Store Cleaning") silently ignored — zero noise',
      'Synced columns: Event Title, Start Date, Start Time, Book ISBN/Description',
      'Null-safe fallback for empty description fields — no crash on missing data',
      'Verified with live Google Sheet accessible to anyone with the link',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #422006 0%, #d97706 100%)',
    screenshots: [
      '/screenshots/spine-and-ledger/n8n-error-flow.png',
      '/screenshots/spine-and-ledger/google-calendar.png',
    ],
  },
  {
    id: 'old-barrel-meadery',
    title: 'Old Barrel Meadery',
    tagline: 'New Order Workflow Automation',
    category: 'Order Management · Automation',
    stack: ['n8n', 'Webhooks', 'Google Sheets'],
    description:
      'Automated new order intake and routing workflow for a craft meadery. Captures incoming orders via webhook, processes and normalizes the order data, and routes it to the appropriate fulfillment path with logging.',
    highlights: [
      'Webhook-triggered order intake from the meadery storefront',
      'Order normalization and routing logic',
      'Google Sheets logging for order tracking and fulfillment',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1c0a00 0%, #7c3200 100%)',
    screenshots: [
      '/screenshots/old-barrel-meadery/workflow-canvas.jpg',
    ],
  },
  {
    id: 'velvet-crema-lab',
    title: 'Velvet Crema Lab',
    tagline: 'Subscription Sync',
    category: 'Subscription Management',
    stack: ['n8n', 'Google Sheets', 'Gmail', 'Airtable'],
    description:
      'Subscription management workflow that keeps subscriber records synchronized between intake forms and the CRM sheet, with automated status tracking. Normalizes new-subscriber data, flags missing addresses via Gmail alerts, and routes premium vs. basic tiers to separate Airtable fulfillment tables.',
    highlights: [
      'Intake form submissions automatically synced to subscriber CRM sheet',
      'Status tracking updated per subscriber action',
      'Google Sheets as the source of truth for subscriber state',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #44403c 0%, #b45309 100%)',
    screenshots: ['/screenshots/velvet-crema-lab/workflow-canvas.png'],
  },
  {
    id: 'glacier-and-gorse',
    title: 'Glacier & Gorse',
    tagline: 'Automated Expedition Alert & Logistics System',
    category: 'Logistics Automation · Alert System',
    stack: ['Node.js', 'Express', 'Playwright', 'Excel/XLSX'],
    description:
      'Automated expedition alert and logistics system for an outdoor adventure company. Handles expedition scheduling, participant alerts, and logistics coordination with Excel-based reporting and end-to-end Playwright test coverage.',
    highlights: [
      'Express-based backend handling expedition intake and routing',
      'Excel/XLSX report generation for logistics and participant data',
      'Automated alerts for expedition status changes and scheduling',
      'Full Playwright E2E test suite for workflow verification',
      'PDF report generation for expedition briefings',
    ],
    // Named boundary call (ADR-0001): stays Automation. Its highlights evidence
    // reporting and alerting, not a persistent datastore + its own UI, so it
    // fails criterion 2. One-line edit to revisit.
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0c2340 0%, #1a5276 100%)',
  },
  {
    id: 'bags-emporium',
    title: 'Bags Emporium',
    tagline: 'Tiered Pricing & Inventory Management',
    category: 'E-commerce · Inventory Automation',
    stack: ['PHP', 'Excel/XLSX', 'Google Sheets'],
    description:
      'Pricing tier management and inventory tracking system for a bags retail store. Manages multi-tier product pricing (₱20–₱500 range) with structured Excel-based data management for stock and sales tracking.',
    highlights: [
      'Multi-tier pricing structure covering ₱20–₱500 product range',
      'Excel-based inventory and pricing data management',
      'Structured data schema for stock levels and product categories',
    ],
    // Named boundary call (ADR-0001): stays Automation. No UI and no persistent
    // datastore evidenced in its highlights, so it fails criterion 2.
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #6b21a8 100%)',
  },
  {
    id: 'cafe-supply-optimizer',
    title: 'CafeSupplyOptimizer',
    tagline: 'Cafe Supply Chain Optimization',
    category: 'Supply Chain · Inventory Automation',
    stack: ['n8n', 'Google Sheets'],
    description:
      'Supply chain optimization workflow for a cafe, automating inventory tracking, supplier order triggers, and stock level monitoring to eliminate manual reorder processes and reduce waste.',
    highlights: [
      'Automated low-stock detection and reorder trigger',
      'Supplier communication automation on stock threshold breach',
      'Inventory consumption tracking and reporting',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #1a1000 0%, #92400e 100%)',
  },
  {
    id: 'aurora-archives',
    title: 'Aurora Archives',
    tagline: 'Automated Document Archiving System',
    category: 'Document Management · Automation',
    stack: ['n8n', 'Google Drive', 'Google Sheets'],
    description:
      'Automated document archiving and organization system. Monitors incoming files, classifies documents by type, routes them to organized archive folders, and maintains a searchable index for retrieval.',
    highlights: [
      'Automated document intake and classification by type',
      'Organized folder routing in Google Drive',
      'Searchable archive index maintained in Google Sheets',
      'Eliminates manual filing and document misplacement',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #4a90d9 100%)',
  },
  {
    id: 'prism-root-color-lab',
    title: 'Prism Root Color Lab',
    tagline: 'Color Service Automation',
    category: 'Beauty & Wellness Automation',
    stack: ['n8n', 'Google Sheets', 'Gmail'],
    description:
      'Automated workflow system for a hair color lab. Manages client color formulation records, service scheduling, and follow-up communications to streamline color consultations and appointment management.',
    highlights: [
      'Client color formulation records stored and retrieved automatically',
      'Appointment scheduling and confirmation workflow',
      'Post-service follow-up emails with care instructions',
      'Service history tracking per client',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #2d0a3e 0%, #c026d3 100%)',
  },
  {
    id: 'solstice-salt-flow',
    title: 'Solstice Salt Flow',
    tagline: 'Wellness Session Booking Automation',
    category: 'Wellness · Booking Automation',
    stack: ['n8n', 'Google Sheets', 'Gmail', 'Telegram'],
    description:
      'Booking and session management automation for a salt therapy and wellness studio. Handles session reservations, intake forms, reminder notifications, and post-session follow-ups.',
    highlights: [
      'Session booking intake via webhook',
      'Automated reminder notifications via Telegram and email',
      'Post-session follow-up and rebooking prompts',
      'Session log maintained in Google Sheets',
    ],
    lines: ['automation'],
    gradient: 'linear-gradient(135deg, #0e3460 0%, #27a4a4 100%)',
  },

  // ── New Apps entries (text-only until Phase C lands screenshots) ──────────
  // Deliberately appended at the end of the array: with anchor-first ordering
  // and a bound of 3, this places all three behind the Apps expand control so
  // the default Apps view is the three screenshotted entries.
  {
    id: 'message-hub',
    title: 'Message Hub',
    tagline: 'Unified Clinic Inbox — Multi-Tenant SaaS',
    category: 'SaaS Product · Multi-Tenant Backend',
    stack: ['Laravel 12', 'PHP 8.3', 'Vue 3.5', 'MySQL', 'Redis', 'Laravel Horizon', 'Vite', 'Playwright'],
    description:
      'Multi-tenant SaaS that gives Philippine dental clinics one screen for every customer conversation — web chat, SMS, Viber, and Telegram — with AI-suggested replies a human must approve before anything is sent. Built on a channel-adapter architecture so a new messaging platform is a manifest plus an adapter, never a change to the inbox core. Shipped through v0.2.0 with a green three-suite test run; not yet publicly deployed.',
    highlights: [
      'Laravel 12 + Vue 3.5 monolith with an embeddable web-chat widget compiled as its own Vite bundle',
      'Tenant isolation enforced structurally — every query is business-scoped via global scopes and policies, and a missed scope is treated as a ship-blocking defect, not a bug to triage',
      '258 tests green at the v0.2.0 release: 200 PHPUnit, 53 Vitest, 5 Playwright end-to-end',
      'Channel-adapter contract (verifyWebhook / parseInbound / sendMessage / mapStatusCallback / connect) — the connection UI renders from each adapter manifest, so adding a channel is one config line',
      'Two adapters shipped: web chat (own verification model) and Telegram (first per-tenant-credential platform)',
      'Every inbound webhook is verified or rejected, answers 200 immediately, dedupes by external_id, and hands off to a Horizon queue — no business logic in the request cycle',
      'Channel tokens and webhook secrets encrypted at rest, never logged, never included in an LLM prompt',
      'AI suggests, never auto-sends: no code path can deliver model output to a patient without an explicit human tap',
    ],
    lines: ['apps'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #0ea5e9 100%)',
  },
  {
    id: 'solo-pm',
    title: 'SoloPM (Command Center)',
    tagline: 'Native Desktop Project & Invoicing App',
    category: 'Desktop Application · Tauri + Rust',
    stack: ['Tauri 2', 'Rust', 'Vue 3', 'TypeScript', 'SQLite', 'Vitest', 'Bun'],
    description:
      'Native cross-platform desktop app for running a one-person software business end to end: projects, clients, time tracking, activity, and invoicing in a single local-first application. A Rust core handles persistence and the filesystem, a TypeScript sidecar owns the business API, and a Vue 3 frontend renders it — with money correctness treated as a proof obligation rather than a test case. Currently at v0.15.0, database schema version 12; distributed as a local build, not yet published.',
    highlights: [
      'Tauri 2 + Rust shell around a Vue 3 / TypeScript frontend — a real native binary, not a packaged web page',
      '1,500+ automated tests across three suites (Rust core, TypeScript sidecar, Vue frontend); one release alone shipped 721 sidecar and 484 frontend tests green',
      'Invoicing with money-correctness proofs — integer-cent arithmetic with regression tests pinning rounding behaviour, plus concurrency tests proving a single-entry edit can never interleave',
      'Versioned SQLite schema with explicit migrations — currently schema_version 12, every bump called out in the changelog',
      'Collapsible full-height sidebar navigation (⌘B) with the layout choice persisted across launches',
      'Typed API contract generated from an OpenAPI spec (openapi-typescript) so the frontend and sidecar cannot silently drift',
      'Shopify integration for pulling store data alongside client projects',
      'Keep-a-Changelog discipline with semantic versioning and an explicit breaking-change section on every release',
    ],
    lines: ['apps'],
    gradient: 'linear-gradient(135deg, #111827 0%, #f59e0b 100%)',
  },
  {
    id: 'shopee-live-sticker-helper',
    title: 'Shopee Live Sticker Helper',
    tagline: 'Android Live-Comment Capture & Thermal Printing',
    category: 'Mobile Application · Kotlin/Android',
    stack: ['Kotlin 1.9', 'Jetpack Compose', 'Material 3', 'Hilt 2.51', 'Room 2.6', 'Coroutines', 'Gradle/AGP 8.3'],
    description:
      'Native Android app for Filipino Shopee Live sellers. An Accessibility Service reads the live comment stream in real time, matches buyer order comments, queues them, and prints sticker labels straight to a Bluetooth thermal printer — so a seller running a live sale never has to transcribe orders by hand. Built as a five-module Gradle project with a signed release APK and a user manual written for non-technical sellers.',
    highlights: [
      'Five-module Gradle architecture — :app (Compose UI + Hilt), :core (domain models), :data (Room + repositories), :printer (Bluetooth abstraction), :accessibility (comment scraping) — so the scraper and the printer can each be replaced without touching the UI',
      'Android AccessibilityService reads the Shopee Live comment stream in real time, with no dependency on an official API',
      'Bluetooth thermal-printer abstraction behind a Hilt-bound interface, keeping printer-model specifics out of the domain layer',
      'Room-backed offline queue: CommentEvent → PrintJob → LiveSession, so nothing is lost if the printer drops mid-stream',
      'Jetpack Compose + Material 3 dark theme, targeting Android 8.0 (API 26) and above',
      'Signed release APK produced from a checked-in signing configuration',
      'Ships a plain-language user manual and a KNOWN_ISSUES log written for the seller, not for developers',
    ],
    lines: ['apps'],
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  },
];

/** Cards shown per line before the visitor expands it. */
export const DEFAULT_VISIBLE_PER_LINE = 3;

/**
 * Anchor first, then data-file order. `Array.prototype.sort` is stable in V8,
 * so array position remains the editorial ordering for every non-anchor (P2).
 */
export function projectsForLine(line: ServiceLine): Project[] {
  return projects
    .filter((p) => p.lines.includes(line))
    .sort((a, b) => Number(b.anchorFor === line) - Number(a.anchorFor === line));
}

export function anchorForLine(line: ServiceLine): Project {
  const anchor = projects.find((p) => p.anchorFor === line);
  if (!anchor) throw new Error(`Service line "${line}" has no anchor project`);
  return anchor;
}

/**
 * P3 — every taxonomy invariant the type system cannot express, asserted at
 * module scope so a violation fails `next build`, `next dev`, and every
 * Playwright run rather than reaching a visitor. Exported so it can be reused
 * directly if a unit-test runner is ever added (there is none today).
 */
export function assertServiceLineInvariants(): void {
  // Cardinality — not expressible in the type system.
  for (const { id } of SERVICE_LINES) {
    if (!projects.some((p) => p.lines.includes(id)))
      throw new Error(`Service line "${id}" has no projects`);
    const n = projects.filter((p) => p.anchorFor === id).length;
    if (n !== 1)
      throw new Error(`Service line "${id}" must have exactly one anchor, found ${n}`);
  }

  const seenIds = new Set<string>();
  for (const p of projects) {
    // Id uniqueness — the card testid derives from it.
    if (seenIds.has(p.id)) throw new Error(`Duplicate project id "${p.id}"`);
    seenIds.add(p.id);

    // Uniqueness — not expressible in the type system.
    if (new Set(p.lines).size !== p.lines.length)
      throw new Error(`Project "${p.id}" has duplicate service lines`);

    // Cross-field agreement — not expressible in the type system. Holds by
    // construction under the ADR-0001 precedence rule; asserted because the
    // rule lives in prose and this file does not.
    if (p.anchorFor && p.anchorFor !== p.lines[0])
      throw new Error(`Project "${p.id}" must anchor its primary line (lines[0])`);
  }

  // P5 — the unsuffixed (canonical) card instance must be visible by default,
  // so `project-card-{id}` stays a stable addressable handle for Playwright.
  // Scoped to cross-listed projects only: that is the sole case where the
  // canonical instance could land in a different line than the suffixed one.
  for (const p of projects.filter((x) => x.lines.length > 1)) {
    const pos = projectsForLine(p.lines[0]).findIndex((x) => x.id === p.id);
    if (pos >= DEFAULT_VISIBLE_PER_LINE)
      throw new Error(
        `Project "${p.id}" renders its canonical card at position ${pos + 1} of line ` +
          `"${p.lines[0]}", behind the expand control. P5 requires the unsuffixed instance ` +
          `to be visible by default, or openModalForCard() will time out rather than fail cleanly.`,
      );
  }
}

assertServiceLineInvariants();

export const anchorProjects: Project[] = SERVICE_LINES.map((l) => anchorForLine(l.id));
