'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { Pill } from './Pill';
import {
  DEFAULT_VISIBLE_PER_LINE,
  SERVICE_LINES,
  projectsForLine,
  type ServiceLine,
  type ServiceLineDef,
} from '@/data/projects';

const LABEL_BY_LINE = new Map<ServiceLine, string>(
  SERVICE_LINES.map((l) => [l.id, l.label]),
);

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 transition-transform fine-pointer:group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

type ExpandControlProps = {
  expanded: boolean;
  total: number;
  label: string;
  controlsId: string;
  onToggle: () => void;
};

/**
 * One control definition, rendered in two DOM locations when a line is
 * expanded: once beside the heading and once at the end of the list. For
 * Automation's 24 entries the end-of-list control alone is a very long scroll
 * back from where the visitor started reading.
 *
 * Both instances share the same state, copy, icon and behaviour by
 * construction. `aria-expanded` is required (WCAG 4.1.2) — changing the button
 * text is not a substitute for programmatically-determinable state.
 *
 * It is a text button, not a filled `bg-accent` button, precisely because it
 * repeats five times on the page: high-emphasis styling competes with itself
 * (and with the anchor's accent frame) once instanced more than twice.
 *
 * `text-accent-dark` (6.03–6.29:1), never `text-accent` (4.28:1 — fails AA at
 * this size).
 */
function ExpandControl({ expanded, total, label, controlsId, onToggle }: ExpandControlProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={controlsId}
      className="group inline-flex items-center gap-2 rounded text-sm font-semibold text-accent-dark transition active:scale-[0.97] hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {expanded ? (
        <>Show fewer {label} projects <ChevronUp /></>
      ) : (
        <>View all {total} {label} projects <ArrowRight /></>
      )}
    </button>
  );
}

type Props = { line: ServiceLineDef };

export function ProjectLineSection({ line }: Props) {
  const [expanded, setExpanded] = useState(false);

  const all = projectsForLine(line.id);
  const total = all.length;
  const visible = expanded ? all : all.slice(0, DEFAULT_VISIBLE_PER_LINE);

  // The control exists ONLY when there is something behind it. On a one-card
  // line it is OMITTED, never rendered-disabled: a disabled control reads as
  // broken, an absent one reads as complete.
  const canExpand = total > DEFAULT_VISIBLE_PER_LINE;

  // ONE handler for BOTH control instances. The heading-adjacent control only
  // renders while expanded, so toggling is always a collapse there — but
  // hard-coding `setExpanded(false)` in one place and a toggle in the other
  // leaves two behaviours to keep in sync for no benefit.
  const toggle = () => setExpanded((prev) => !prev);

  const headingId = `${line.sectionId}-heading`;
  const listId = `${line.sectionId}-list`;
  const noun = total === 1 ? 'project' : 'projects';
  const showingAll = visible.length === total;

  return (
    <section id={line.sectionId} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3
          id={headingId}
          // Focus target for fragment navigation (WCAG 2.4.3) — see
          // components/SectionFocus.tsx. -1 keeps it out of the tab order
          // while allowing programmatic focus.
          tabIndex={-1}
          className="rounded text-2xl font-bold tracking-tight text-navy-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas sm:text-3xl"
        >
          {line.label}
        </h3>

        {canExpand && expanded && (
          <ExpandControl
            expanded={expanded}
            total={total}
            label={line.label}
            controlsId={listId}
            onToggle={toggle}
          />
        )}
      </div>

      {/* The blurb renders regardless of card count — it is what gives a
          one-card line the same minimum content weight as a 24-card line. */}
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-navy-600">
        {line.blurb}
      </p>

      <div id={listId} className="mt-8 flex flex-col gap-6">
        {visible.map((project, index) => {
          const isAnchor = project.anchorFor === line.id;
          const isCrossListedInstance = project.lines[0] !== line.id;
          const otherLines = project.lines.filter((l) => l !== line.id);

          return (
            <div
              key={project.id}
              className={[
                isAnchor
                  ? 'rounded-2xl border border-accent-200 bg-gradient-to-b from-accent-50/60 to-transparent p-3 shadow-md sm:p-4'
                  : '',
                // Only newly-revealed cards animate; the default view must not
                // animate on load. Covered by the existing wildcard
                // prefers-reduced-motion block in globals.css.
                expanded && index >= DEFAULT_VISIBLE_PER_LINE ? 'animate-fade-in-up' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              // Stagger the reveal 45ms per card rather than firing all of
              // them at once. Expanding Automation uncovers seven cards
              // simultaneously, which reads as one flash rather than a list
              // arriving. Capped at 6 steps (270ms) so a long line never
              // makes the last card feel late, and applied inline because the
              // delay is a function of position, not a fixed utility.
              style={
                expanded && index >= DEFAULT_VISIBLE_PER_LINE
                  ? { animationDelay: `${Math.min(index - DEFAULT_VISIBLE_PER_LINE, 6) * 45}ms` }
                  : undefined
              }
            >
              {(isAnchor || otherLines.length > 0) && (
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {isAnchor && <Pill variant="flagship">Flagship</Pill>}
                  {otherLines.length > 0 && (
                    // Answers "why does this project appear twice?" for the
                    // visitor — the user-facing counterpart of the code comment
                    // on the cross-listing test assertion.
                    <Pill variant="cross-listed">
                      Also serves{' '}
                      {otherLines.map((l) => LABEL_BY_LINE.get(l) ?? l).join(' and ')}
                    </Pill>
                  )}
                </div>
              )}

              <ProjectCard
                project={project}
                instanceLine={isCrossListedInstance ? line.id : undefined}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3">
        {canExpand && (
          <ExpandControl
            expanded={expanded}
            total={total}
            label={line.label}
            controlsId={listId}
            onToggle={toggle}
          />
        )}
        {/* Always visible — this is the honest depth signal, and it is what
            reframes "no expand control" on a one-card line as a stated total
            rather than a silent absence. aria-live because it updates in place
            while focus stays on the button (WCAG 4.1.3). */}
        <p aria-live="polite" className="text-xs text-navy-600">
          {showingAll
            ? `Showing all ${total} ${line.label} ${noun}`
            : `Showing ${visible.length} of ${total} ${line.label} ${noun}`}
        </p>
      </div>
    </section>
  );
}
