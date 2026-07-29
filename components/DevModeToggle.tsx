'use client';

import { useEffect, useState } from 'react';

/** Shared with the pre-hydration script in app/layout.tsx. Change both. */
export const MODE_STORAGE_KEY = 'portfolio-mode';

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

/**
 * Dev Mode switch.
 *
 * A toggle button (`aria-pressed`), NOT a checkbox and NOT a two-option
 * switch widget: there is one default presentation and one alternate skin, so
 * pressed/unpressed is the honest semantic. WCAG 4.1.2 is satisfied by
 * `aria-pressed` rather than by the label text changing — the label stays
 * "Dev mode" in both states so the control never renames itself under the
 * pointer.
 *
 * State lives on `document.documentElement`, not in React context: the
 * pre-hydration script in layout.tsx sets the same attribute before first
 * paint, and reading it back on mount is what keeps the two in agreement
 * without a flash. The server always renders the unpressed markup, so there is
 * no hydration mismatch — the effect corrects the state one tick later.
 */
export function DevModeToggle() {
  const [dev, setDev] = useState(false);

  useEffect(() => {
    setDev(document.documentElement.dataset.mode === 'dev');
  }, []);

  const toggle = () => {
    const next = !dev;
    setDev(next);

    if (next) {
      document.documentElement.dataset.mode = 'dev';
    } else {
      delete document.documentElement.dataset.mode;
    }

    // Private-mode Safari throws on setItem. The toggle must still work when
    // persistence does not.
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, next ? 'dev' : 'default');
    } catch {
      /* non-fatal — the mode simply will not survive a reload */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dev}
      data-testid="dev-mode-toggle"
      title="Switch between the standard view and a developer-console skin"
      className="inline-flex h-6 flex-shrink-0 items-center gap-1.5 rounded-full border border-navy-200 bg-surface px-2 text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-navy-600 transition hover:border-navy-300 hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface aria-pressed:border-accent-200 aria-pressed:bg-accent-50 aria-pressed:text-accent-dark sm:px-2.5"
    >
      <CodeIcon />
      {/* Hidden, not removed, below `sm`: the nav strip beside it is a scroll
          container, and every pixel this control takes is a pixel of service
          label that scrolls out of the default view. The accessible name
          survives because the <span> stays in the tree. */}
      <span className="sr-only sm:not-sr-only">Dev mode</span>
      {/* Status readout, not a second label. `aria-hidden` because
          `aria-pressed` already conveys the state to assistive tech — exposing
          both would announce it twice. */}
      <span aria-hidden="true" className="hidden font-mono lg:inline">
        {dev ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
