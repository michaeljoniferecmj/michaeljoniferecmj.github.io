import { profile } from '@/data/profile';

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg"
          aria-label="Back to top"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 font-mono text-[13px] font-bold text-white shadow-sm"
          >
            &gt;_
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[14px] font-semibold tracking-tight text-navy-900">
              {profile.name}
            </span>
            <span className="hidden text-[11px] font-medium text-navy-500 sm:block">
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
    </header>
  );
}
