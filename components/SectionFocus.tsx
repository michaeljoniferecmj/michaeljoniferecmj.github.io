'use client';

import { useEffect } from 'react';

/**
 * WCAG 2.4.3 Focus Order (Level A).
 *
 * A plain `<a href="#section">` moves the VIEWPORT but not FOCUS: keyboard
 * focus stays on the nav link, so the next Tab continues from the header rather
 * than from the content the visitor just jumped to, and a screen reader gets no
 * announcement of where it landed.
 *
 * This moves focus to the section's own labelling heading on every fragment
 * navigation — nav activation, repeat activation of the already-current link,
 * back/forward, and load-with-fragment. It applies to ALL section anchors on
 * the page (hero, skills, projects, contact + the five service lines), not just
 * the new ones, because the defect was never specific to the new ones.
 *
 * Scrolling is left entirely to the browser (`preventScroll: true`) so the
 * `:target { scroll-margin-top }` offset in globals.css stays the one place
 * that knows about the fixed header.
 */
function focusFragmentTarget(): void {
  const id = window.location.hash.replace(/^#/, '');
  if (!id) return;

  let section: HTMLElement | null = null;
  try {
    section = document.getElementById(decodeURIComponent(id));
  } catch {
    // Malformed percent-encoding in the hash — nothing to focus.
    return;
  }
  if (!section) return;

  const labelledBy = section.getAttribute('aria-labelledby');
  const heading = labelledBy ? document.getElementById(labelledBy) : null;
  const target = heading ?? section;

  // Every section heading already ships `tabindex="-1"` in markup; this is the
  // fallback for a section that gains an anchor without one.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');

  target.focus({ preventScroll: true });
}

export function SectionFocus() {
  useEffect(() => {
    const onHashChange = () => focusFragmentTarget();

    // Same-hash re-activation fires no `hashchange`, so also listen for clicks
    // on in-page links. Capture phase, so it still runs if a descendant stops
    // propagation.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      // Let the browser apply the hash and start scrolling first.
      window.setTimeout(focusFragmentTarget, 0);
    };

    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('click', onClick, true);

    // Load-with-fragment: the browser restores scroll position itself but never
    // moves focus.
    const initial = window.setTimeout(focusFragmentTarget, 0);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onClick, true);
      window.clearTimeout(initial);
    };
  }, []);

  return null;
}
