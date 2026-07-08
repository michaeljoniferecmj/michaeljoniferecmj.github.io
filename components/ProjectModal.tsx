'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const [activeShot, setActiveShot] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shots = project.screenshots ?? [];

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const prev = () => setActiveShot((i) => (i - 1 + shots.length) % shots.length);
  const next = () => setActiveShot((i) => (i + 1) % shots.length);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-7 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-500">
              {project.category}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">{project.title}</h2>
            <p className="text-sm text-slate-500">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-4 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">

          {/* Screenshot gallery */}
          {shots.length > 0 && (
            <div className="relative bg-slate-950">
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={shots[activeShot]}
                  src={shots[activeShot]}
                  alt={`${project.title} screenshot ${activeShot + 1} of ${shots.length}`}
                  className="h-full w-full object-contain"
                />
              </div>

              {shots.length > 1 && (
                <>
                  <button onClick={prev} aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button onClick={next} aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 overflow-x-auto bg-slate-900 px-4 py-3">
                    {shots.map((src, i) => (
                      <button key={i} onClick={() => setActiveShot(i)} aria-label={`View screenshot ${i + 1}`}
                        className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition ${i === activeShot ? 'border-indigo-400' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="h-full w-full object-cover" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="grid gap-8 px-7 py-6 sm:grid-cols-3">

            {/* Left: description + highlights */}
            <div className="sm:col-span-2">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-slate-400">About This Project</h3>
              <p className="text-[15px] leading-relaxed text-slate-700">{project.description}</p>

              {project.highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Key Features</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5 text-[14px] text-slate-700">
                        <span className="mt-0.5 flex-shrink-0 text-indigo-500">
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: tech stack */}
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-[13px] font-medium text-indigo-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
