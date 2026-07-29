import type { ReactNode } from 'react';
import { SERVICE_LINES, projects, type ServiceLine } from '@/data/projects';

/**
 * One icon per service line. The LABELS are never written here — they are
 * derived from `SERVICE_LINES` at render time (P2), so renaming a line in the
 * data file can never leave the hero showing a stale name.
 *
 * `Record<ServiceLine, ReactNode>` is deliberate: adding a sixth service line
 * makes this object a compile error until it gets an icon, rather than
 * silently rendering a chip with a blank glyph.
 *
 * These are non-interactive chips, not navigation. Chip-as-nav was rejected in
 * design consensus; the nav lives in the header. Note also that `#hero` must
 * contain exactly ONE <ul> — skills-hero.spec.ts asserts `#hero ul li` totals
 * five, so a second list anywhere inside this section breaks the suite.
 */
const SPECIALTY_ICONS: Record<ServiceLine, ReactNode> = {
  websites: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.01" />
      <path d="M9.5 6.5h.01" />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 7.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.14.68.34.94.6.26.26.46.58.6.94H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  'ai-agents': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-3.5 w-3.5">
      <rect x="4" y="8" width="16" height="12" rx="2.5" />
      <path d="M12 8V5.5" />
      <circle cx="12" cy="4" r="1.4" />
      <path d="M9 13.5h.01" />
      <path d="M15 13.5h.01" />
      <path d="M9.5 17h5" />
    </svg>
  ),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        {/* Document order (H1/subhead, then headshot) is the render order at
            every breakpoint. This was `flex-col-reverse`, which put the
            headshot ABOVE the H1 on narrow viewports and could push the
            sentence naming all five service lines below the fold — silently
            defeating the comprehension metric this section exists to serve.
            On `lg` the row layout is unchanged: text left, headshot right. */}
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-surface px-3.5 py-1.5 shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-700">
            Available for Website, App &amp; Automation Projects
          </span>
        </div>

        {/* PINNED SUBSTRINGS — home.spec.ts asserts `toContainText('Building')`
            and `toContainText('automation workflows')`. Both must survive any
            future copy edit verbatim and uninterrupted by markup. */}
        <h1
          id="hero-heading"
          // Focus target for fragment navigation (WCAG 2.4.3).
          tabIndex={-1}
          className="mt-8 rounded text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight text-navy-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas sm:text-[56px] lg:text-[64px]"
        >
          Building websites, apps,{' '}
          <span className="accent-underline text-accent">AI agents</span>, and
          automation workflows — with the{' '}
          <span className="soft-underline">SEO</span> to get them found.
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-navy-600 sm:text-[17px]">
          {/* PINNED SUBSTRING — skills-hero.spec.ts asserts
              /SEO and Generative Engine Optimization/ inside #hero. */}
          Full-stack developer across five service lines for small and medium
          businesses: marketing websites, custom applications, workflow
          automation, AI agents, plus SEO and Generative Engine Optimization to
          get all of it found.
        </p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/headshot.jpg"
            alt="Michael Ervin Superable"
            width={224}
            height={224}
            className="h-40 w-40 flex-shrink-0 rounded-2xl border border-navy-200 object-cover shadow-lg lg:h-56 lg:w-56"
          />
        </div>

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
          {SERVICE_LINES.map((line) => (
            <li key={line.id}>
              <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-surface px-3.5 py-2 text-[13px] font-medium text-navy-700 shadow-sm transition hover:border-navy-300 hover:shadow">
                <span className="text-navy-500">{SPECIALTY_ICONS[line.id]}</span>
                {line.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
