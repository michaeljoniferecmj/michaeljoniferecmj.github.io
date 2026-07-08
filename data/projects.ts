export type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  stack: string[];
  description: string;
  highlights: string[];
  featured?: boolean;
  gradient: string;
  screenshots?: string[];
};

export const projects: Project[] = [
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
    featured: true,
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
    featured: true,
    gradient: 'linear-gradient(135deg, #0f172a 0%, #0d9488 100%)',
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
    featured: true,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)',
    screenshots: [
      '/screenshots/root-and-rind/workflow-success.jpg',
      '/screenshots/root-and-rind/workflow-false.jpg',
    ],
  },
  {
    id: 'irongrid-it',
    title: 'IronGrid IT',
    tagline: 'Emergency Hardware Procurement',
    category: 'Approval Workflow · Business Automation',
    stack: ['n8n', 'Webhooks', 'Gmail', 'Google Sheets'],
    description:
      'Tiered procurement pipeline for industrial manufacturing sites where downtime costs thousands per minute. Auto-approves under $250, routes to manager for $250–$1K, director for over $1K. Includes 30-minute escalation timeouts and a Google Sheets audit log.',
    highlights: [
      'Unique Request ID generated per request (REQ-XXXXXXXX-XXXX format)',
      'Three approval tiers: auto-approve (<$250), manager ($250–$1K), director (>$1K)',
      '30-minute escalation timeout — unanswered approvals auto-escalate up the chain',
      'Full Google Sheets audit log: every request, decision, and timestamp recorded',
      'Real-time email notifications to requestor with GO/NO-GO decision',
      'Eliminates phone tag and manual email chains during critical downtime events',
    ],
    featured: true,
    gradient: 'linear-gradient(135deg, #0f172a 0%, #b45309 100%)',
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
    featured: true,
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
    featured: true,
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #db2777 100%)',
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
    featured: true,
    gradient: 'linear-gradient(135deg, #1e293b 0%, #6366f1 100%)',
    screenshots: [
      '/screenshots/iron-vine/01-wedding-qualified-branch.jpg',
      '/screenshots/iron-vine/02-requires-review-branch.jpg',
      '/screenshots/iron-vine/03-out-of-range-branch.jpg',
      '/screenshots/iron-vine/04-error-handler-branch.jpg',
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
    gradient: 'linear-gradient(135deg, #0f172a 0%, #dc2626 100%)',
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
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
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
    featured: true,
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
    featured: true,
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
    stack: ['n8n', 'Google Sheets'],
    description:
      'Subscription management workflow that keeps subscriber records synchronized between intake forms and the CRM sheet, with automated status tracking.',
    highlights: [
      'Intake form submissions automatically synced to subscriber CRM sheet',
      'Status tracking updated per subscriber action',
      'Google Sheets as the source of truth for subscriber state',
    ],
    gradient: 'linear-gradient(135deg, #44403c 0%, #b45309 100%)',
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
    gradient: 'linear-gradient(135deg, #0e3460 0%, #27a4a4 100%)',
  },
];

export const featuredProjects: Project[] = projects.filter((p) => p.featured);
