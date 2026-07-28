# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> This is the first release recorded under this format. Work predating it is
> not retroactively documented.

## [1.1.0] - 2026-07-28

### BREAKING CHANGES

- **BREAKING:** Removed `Project.featured?: boolean` and the `featuredProjects`
  export from `data/projects.ts`. Replaced by `Project.lines: [ServiceLine,
  ...ServiceLine[]]` (which service line(s) a project belongs to) and
  `Project.anchorFor?: ServiceLine` (which single project anchors a given
  line). Any fork, script, or import that reads `featured` or imports
  `featuredProjects` will fail to compile: TypeScript now requires every
  `Project` to carry a non-empty `lines` tuple, and `featuredProjects` no
  longer exists as an export.
  **Migration:** replace `featured: true` with `lines: ['<line>']` (add
  `anchorFor: '<line>'` if the project should anchor that line), and replace
  `import { featuredProjects } from '@/data/projects'` with
  `import { projectsForLine } from '@/data/projects'`. See ADR-0001
  ("Service-line taxonomy for the portfolio site" — held in the project's
  planning workspace, not this repo) for full rationale, and the README
  section "How to add or change a project" for the day-to-day mechanics.

### Added

- Added a service-line taxonomy to the project data model: a new
  `ServiceLine` union (`'websites' | 'apps' | 'seo' | 'automation' |
  'ai-agents'`), a `SERVICE_LINES` const (id/label/sectionId/blurb per line),
  and derived helpers `projectsForLine()` and `anchorForLine()` in
  `data/projects.ts`.
- Added a module-scope `assertServiceLineInvariants()` check in
  `data/projects.ts` that runs on every `next build`, `next dev`, and
  Playwright run, and throws (failing the build) on a broken taxonomy
  invariant — see the README for the exact conditions it checks.
- Added three new project entries under the Apps line: **Message Hub**
  (unified multi-channel clinic inbox, Laravel/Vue), **SoloPM (Command
  Center)** (native desktop project/invoicing app, Tauri + Rust + Vue), and
  **Shopee Live Sticker Helper** (Android live-comment capture and thermal
  label printing, Kotlin/Compose). Project count goes from 32 to 35; total
  rendered card instances go to 36 (`houseplan-group` is cross-listed into
  both SEO and Websites).
- Added `components/ProjectLineSection.tsx` — renders one service line as an
  anchor-first, bounded-default (3 cards), expandable section.
- Added `components/Pill.tsx` — shared "Flagship" / "Also serves…" badge
  primitive used on anchor and cross-listed cards.
- Added `components/SectionFocus.tsx` — moves keyboard/screen-reader focus to
  a section's heading on fragment navigation (nav click, repeat click,
  back/forward, load-with-fragment), across all nine section anchors on the
  page (WCAG 2.4.3).
- Added a five-link service-line fragment nav (`Websites`, `Apps`, `SEO`,
  `Automation`, `AI Agents`) inside the header, with `aria-label="Service
  lines"` and horizontal scroll contained inside the nav box on narrow
  viewports.
- Added `aria-expanded` to the shared per-line expand/collapse control (WCAG
  4.1.2) and `aria-live="polite"` to the "Showing X of N" status line per
  section (WCAG 4.1.3).
- Added the `--header-h` CSS custom property in `app/globals.css`, and
  rewired `:target { scroll-margin-top }` to derive from it
  (`calc(var(--header-h) + 1.5rem)`) instead of a hard-coded `96px`.

### Changed

- Changed the homepage Projects section from a flat 32-project list (3
  arbitrary `featured` entries plus one global "View All N Projects" toggle)
  to five stacked, anchor-led service-line sections, each with its own
  bounded default view (3 cards) and its own expand control.
- Changed `data/profile.ts`: `profile.title` (`"Automation & Full Stack
  Developer"` → `"Web, App, SEO, Automation & AI Agent Developer"`) and
  `profile.summary` to reflect all five service lines instead of only
  automation.
- Changed the Hero headline framing and the five Hero specialty chips
  (`components/Hero.tsx`) to derive their labels from `SERVICE_LINES` at
  render time instead of a hard-coded array, so renaming a line in the data
  file can never leave the hero showing a stale label.
- Changed Hero's mobile layout from `flex-col-reverse` to `flex-col` so the
  headshot no longer renders above the H1 on narrow viewports.

### Removed

- **BREAKING:** Removed the `featured` boolean field and `featuredProjects`
  export — see "BREAKING CHANGES" above.
- Removed the global "View All N Projects" toggle button and its "Showing X
  of Y projects" caption from `components/Projects.tsx` (superseded by the
  per-line expand controls in `ProjectLineSection.tsx`).
- Removed `tests/e2e/featured-projects.spec.ts` (the behavior it tested no
  longer exists); coverage for the new section layout lives in the new
  `tests/e2e/service-lines.spec.ts`.

### Fixed

- Fixed insufficient color contrast (WCAG 1.4.3) on three accent-on-light
  instances: the Contact page's primary CTA button (`bg-accent` on white was
  4.47:1 at 14px semibold, below the 4.5:1 AA threshold for that size;
  changed to `bg-accent-dark`, 6.29:1), and the "Get In Touch" / "Selected
  Works" / "Expertise" eyebrow labels (`text-accent` at 11px bold was 4.28–
  4.47:1; changed to `text-accent-dark`, 6.02–6.29:1).
