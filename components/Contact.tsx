import { profile } from '@/data/profile';

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm-1.78 13.02h3.56V9H3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.69-3.87-1.54-3.87-1.54-.52-1.34-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-navy-200 bg-white py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[720px] px-5 text-center sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
          Get In Touch
        </p>
        <h2
          id="contact-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
        >
          Let&apos;s work together
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-600">
          Available for automation projects, workflow consulting, and full-stack
          development work.
        </p>

        <div className="mt-8 flex flex-col items-center gap-5">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <MailIcon />
            {profile.email}
          </a>

          <div className="flex items-center gap-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 bg-white text-navy-600 transition hover:border-navy-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <LinkedInIcon />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 bg-white text-navy-600 transition hover:border-navy-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1100px] border-t border-navy-200 px-5 pt-6 text-center sm:px-8">
        <p className="text-xs text-navy-500">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js
          and Tailwind CSS.
        </p>
      </div>
    </section>
  );
}
