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
      className="fixed inset-0 z-50 flex animate-backdrop-in items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl animate-modal-in flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl">

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
            className="ml-4 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition active:scale-90 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
            <div className="relative bg-shot">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition active:scale-90 hover:bg-black/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button onClick={next} aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition active:scale-90 hover:bg-black/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 overflow-x-auto bg-shot-strip px-4 py-3">
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

            {/* Right: tech stack + links */}
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

              {(project.liveUrl || project.repoUrl) && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Links</h3>
                  <div className="flex flex-col gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-[13px] font-semibold text-accent-on transition active:scale-[0.97] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        View Live Site
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition active:scale-[0.97] hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                        </svg>
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
