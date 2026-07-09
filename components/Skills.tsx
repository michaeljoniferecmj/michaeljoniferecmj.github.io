type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  items: string[];
};

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Automation Core',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.14.68.34.94.6.26.26.46.58.6.94H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    items: [
      'n8n Workflow Builder',
      'Webhook Design & Intake',
      'Multi-Step Logic & Branching',
      'Error Handling & Dead-Letter Queues',
      'Cron Scheduling',
    ],
  },
  {
    title: 'Integrations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    items: [
      'Google Sheets / Drive / Gmail',
      'Discord / Slack / Telegram',
      'HubSpot CRM',
      'IMAP Email Processing',
      'OpenWeatherMap API',
    ],
  },
  {
    title: 'AI & Intelligence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <path d="M12 3l1.5 4 4 1.5-4 1.5L12 14l-1.5-4-4-1.5 4-1.5L12 3z" />
        <path d="M19 14l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14z" />
        <path d="M5 16l.7 1.7L7 18l-1.3.3L5 20l-.7-1.7L3 18l1.3-.3L5 16z" />
      </svg>
    ),
    items: [
      'OpenAI GPT-4o / GPT-4o-mini',
      'Knowledge Base Design',
      'Prompt Engineering',
      'AI Chatbot Workflows',
      'Escalation Logic',
    ],
  },
  {
    title: 'Web Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    items: [
      'Next.js / React / TypeScript',
      'Node.js (Fastify) & REST APIs',
      'PostgreSQL / Prisma / Supabase',
      'PHP & WordPress / WooCommerce',
      'CSS / Tailwind CSS',
      'Vercel / Railway Deployment',
    ],
  },
  {
    title: 'SEO & GEO',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 7.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" />
      </svg>
    ),
    items: [
      'Generative Engine Optimization (GEO)',
      'AI Overviews & LLM Citations',
      'Technical & On-Page SEO',
      'Schema Markup / Structured Data',
      'Core Web Vitals Optimization',
      'WordPress SEO (Yoast / RankMath)',
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 sm:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
          Expertise
        </p>
        <h2
          id="skills-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
        >
          Tech Stack &amp; Tools
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-600">
          A toolkit built around automation, integrations, AI, SEO/GEO, and
          lightweight full-stack delivery — chosen for reliability over novelty.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <article
              key={category.title}
              className="flex flex-col rounded-2xl bg-navy-100/70 p-6 transition hover:bg-navy-100"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent shadow-sm">
                {category.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy-900">
                {category.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13.5px] leading-snug text-navy-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
