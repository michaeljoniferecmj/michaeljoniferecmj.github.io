'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { featuredProjects, projects } from '@/data/projects';

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
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : featuredProjects;

  return (
    <section
      id="projects"
      className="py-20 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
          Selected Works
        </p>
        <h2
          id="projects-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
        >
          Projects
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-600">
          A collection of automation systems, client websites, and full-stack
          applications built for real businesses — from emergency triage and
          procurement pipelines to production SaaS platforms and AI-powered
          staff assistants.
        </p>

        <div className="mt-12 flex flex-col gap-6">
          {displayed.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            {showAll ? (
              <>Show Less <ChevronUp /></>
            ) : (
              <>View All {projects.length} Projects <ArrowRight /></>
            )}
          </button>
          <p className="text-xs text-navy-500">
            {showAll
              ? `Showing all ${projects.length} projects`
              : `Showing ${featuredProjects.length} of ${projects.length} projects`}
          </p>
        </div>
      </div>
    </section>
  );
}
