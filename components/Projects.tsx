import { ProjectLineSection } from './ProjectLineSection';
import { SERVICE_LINES } from '@/data/projects';

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        {/* accent-dark (6.03:1), not accent (4.28:1 — fails AA at 11px bold). */}
        <p className="eyebrow text-[11px] font-bold uppercase tracking-[0.18em] text-accent-dark">
          Selected Works
        </p>
        <h2
          id="projects-heading"
          // Focus target for fragment navigation (WCAG 2.4.3).
          tabIndex={-1}
          className="mt-2 rounded text-3xl font-bold tracking-tight text-navy-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas sm:text-4xl"
        >
          Projects
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-600">
          Five service lines, one builder: marketing websites, custom
          applications, SEO, workflow automation, and AI agents — each led by
          its strongest proof, with the full catalog one click away.
        </p>

        {/* One component, five instances, keyed by `line.id` and never by array
            index — so expand state can never follow position if SERVICE_LINES
            is reordered. */}
        <div className="mt-14 flex flex-col gap-20">
          {SERVICE_LINES.map((line) => (
            <ProjectLineSection key={line.id} line={line} />
          ))}
        </div>
      </div>
    </section>
  );
}
