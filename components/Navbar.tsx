import { profile } from '@/data/profile';
import { SERVICE_LINES } from '@/data/projects';
import { DevModeToggle } from './DevModeToggle';

export function Navbar() {
  return (
    // Height is `--header-h` in globals.css. Keep the two in sync: every
    // anchor offset derives from that variable.
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy-200/70 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-lg"
          aria-label="Back to top"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-chip font-mono text-[13px] font-bold text-chip-ink shadow-sm"
          >
            &gt;_
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[14px] font-semibold tracking-tight text-navy-900">
              {profile.name}
            </span>
            {/* `md:` not `sm:` — the title grew from 34 to 46 characters and no
                test covers the 640–768px band. `truncate` is the backstop. */}
            <span className="hidden max-w-[46ch] truncate text-[11px] font-medium text-navy-500 md:block">
              {profile.title}
            </span>
          </span>
        </a>

        <div
          className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5"
          role="status"
          aria-label="Availability status: available for hire"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
            Available for Hire
          </span>
        </div>
      </div>

      {/* Row 2: service-line nav + the Dev Mode switch.
          The switch lives HERE, not in row 1. Row 1 is already at capacity on
          a phone — at 390px the name and the availability badge each wrap to
          two lines — so a third item there truncates the name to "Michael E…".
          It is also deliberately a SIBLING of the <nav>, not a child: the nav
          is an overflow-x-auto scroll container, and a control parked inside
          it scrolls out of reach on narrow viewports. */}
      <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-5 pb-2 sm:px-8">
        {/* The `overflow-x-auto` sits on the <nav> and the <ul> inside is
            `w-max whitespace-nowrap`, so any horizontal scrolling happens
            INSIDE the nav box and `document.documentElement.scrollWidth` never
            grows. That is exactly what mobile.spec.ts measures, and page-level
            horizontal overflow is a hard failure.

            `min-w-0` is what lets the flex item actually shrink below its
            content width — without it the default `min-width: auto` would let
            the nav push the page wide and defeat the containment above.

            Byte-identical markup at every breakpoint — at 1440px all five
            labels fit and no scroll occurs. No hamburger, no JS, no focus trap.

            `[scrollbar-width:none]` only. `-ms-overflow-style` is deliberately
            omitted: IE10 / Edge Legacy, both EOL. */}
        <nav
          aria-label="Service lines"
          className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]"
        >
          <ul className="flex w-max gap-x-5 whitespace-nowrap text-sm">
            {SERVICE_LINES.map((line) => (
              <li key={line.id}>
                <a
                  href={`#${line.sectionId}`}
                  className="rounded font-medium text-navy-600 transition hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  {line.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <DevModeToggle />
      </div>
    </header>
  );
}
