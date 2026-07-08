'use client';

import { useState } from 'react';
import type { Project } from '@/data/projects';
import { ProjectModal } from './ProjectModal';

type Props = { project: Project };

export function ProjectCard({ project }: Props) {
  const shots = project.screenshots ?? [];
  const hasImages = shots.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + shots.length) % shots.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % shots.length);
  };

  return (
    <>
      <article
        className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-5"
        data-testid={`project-card-${project.id}`}
      >
        {/* ── Preview panel ──
            min-h gives height on mobile. On desktop, grid stretches this
            cell to match the text column. The image/gradient uses
            absolute inset-0 so it always fills the container. */}
        <div
          className="relative min-h-[220px] overflow-hidden md:col-span-2"
          style={{ background: project.gradient }}
        >
          {hasImages && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={shots[activeIndex]}
              src={shots[activeIndex]}
              alt={`${project.title} screenshot ${activeIndex + 1}`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300"
            />
          )}

          {/* Subtle overlay so nav buttons are readable */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Watermark title (shown when no real screenshot) */}
          {!hasImages && (
            <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[clamp(1.1rem,2vw,1.8rem)] font-extrabold leading-tight tracking-tight text-white/20">
              {project.title}
            </span>
          )}

          {/* Prev / Next arrows (only when multiple shots) */}
          {hasImages && shots.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/75 focus:opacity-100"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/75 focus:opacity-100"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {shots.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>

              {/* Counter badge */}
              <span className="absolute right-3 top-3 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white">
                {activeIndex + 1}/{shots.length}
              </span>
            </>
          )}
        </div>

        {/* ── Content panel ── */}
        <div className="flex flex-col gap-4 p-6 sm:p-8 md:col-span-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {project.category}
            </p>
            <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">{project.tagline}</p>
          </div>

          <p className="line-clamp-3 text-[14.5px] leading-relaxed text-slate-700">
            {project.description}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="group/link inline-flex items-center gap-1.5 self-start rounded text-sm font-semibold text-indigo-600 transition hover:text-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              View Project Details
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 transition-transform group-hover/link:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-md bg-slate-100 px-2.5 py-1 text-[11.5px] font-medium text-slate-600">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {modalOpen && (
        <ProjectModal project={project} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
