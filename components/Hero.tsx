import { projects } from '@/data/projects';

const SPECIALTIES = [
  {
    label: 'Workflow Automation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.14.68.34.94.6.26.26.46.58.6.94H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    label: 'API & Webhook Integration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    label: 'AI-Powered Tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: 'Web Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: 'SEO & GEO',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 7.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3.5 py-1.5 shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-700">
            Available for Automation &amp; Web Development Projects
          </span>
        </div>

        <h1
          id="hero-heading"
          className="mt-8 text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-[56px] lg:text-[64px]"
        >
          Building{' '}
          <span className="accent-underline text-accent">smart</span> automation
          workflows and web applications powered by{' '}
          <span className="soft-underline">n8n</span>,{' '}
          <span className="soft-underline">Next.js</span>, and{' '}
          <span className="soft-underline">AI</span>.
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-navy-600 sm:text-[17px]">
          Automation specialist and full-stack web developer — designing
          end-to-end n8n workflows, AI-powered tools, and production websites
          and SaaS products, plus SEO and Generative Engine Optimization, for
          small and medium businesses.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-navy-900">{projects.length}+</span>
            <span className="text-navy-500">Projects</span>
          </div>
          <div aria-hidden="true" className="h-4 w-px bg-navy-200" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-navy-900">5+</span>
            <span className="text-navy-500">Industries Served</span>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2.5">
          {SPECIALTIES.map((specialty) => (
            <li key={specialty.label}>
              <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-3.5 py-2 text-[13px] font-medium text-navy-700 shadow-sm transition hover:border-navy-300 hover:shadow">
                <span className="text-navy-500">{specialty.icon}</span>
                {specialty.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
