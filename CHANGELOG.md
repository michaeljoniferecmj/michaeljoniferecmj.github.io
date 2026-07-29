# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> This is the first release recorded under this format. Work predating it is
> not retroactively documented.

## [1.2.1] - 2026-07-30

Motion-layer pass. The whole release came out of one review against the
`review-animations` craft bar (vendored from
[emilkowalski/skills](https://github.com/emilkowalski/skills)), which returned
a **Block**. Two commits: unambiguous bugs first, judgment calls second.

### Fixed

- **`transition-all` on the carousel dot indicators.** `transition-property: all`
  is unbounded — it animates every property later added to that element. Scoped
  to `width,background-color`, 200ms ease-out. The `width` animation is a
  documented exception to transform/opacity-only: a 6px dot inside an
  absolutely-positioned overlay, whose layout pass touches nothing else.
- **The screenshot crossfade never existed.** The `<img>` carried
  `transition-opacity duration-300` *and* `key={src}`, so React remounted the
  element on every arrow click and the transition had no prior opacity to move
  from. The code claimed a 300ms crossfade; users saw a hard cut, and no test
  could catch it because the class was present and the image did change.
  Replaced with an 180ms `animate-shot-in` entry fade — an animation rather
  than a transition precisely *because* the element remounts.
- **No press feedback anywhere** — 0 `:active` rules in the compiled CSS. Every
  pressable element was inert under the finger. Added `active:scale-*` sized to
  the hit area across buttons, links, arrows, and the Dev Mode toggle.
- **Ungated hover motion** — 0 `(hover: hover)` queries site-wide. Touch fires
  `:hover` on tap and leaves it applied, so tapping a project card on a phone
  lifted it and left it lifted. Added a `fine-pointer:` variant gating the
  three movement hovers. Deliberately *not* applied to
  `group-hover:opacity-100` on the carousel arrows — that same false hover is
  what reveals them on touch.
- **Reduced motion was zeroing everything.** `animation-duration: 0.01ms` and
  `transition-duration: 0.01ms` on `*` also destroyed colour and opacity
  transitions, which aid comprehension and cause no vestibular discomfort. Now
  `transform` is dropped from the transition property list while colour,
  opacity, border and shadow still ease at full duration; movement hovers and
  the press response are removed outright rather than made instant.

### Changed

- **Modals now animate in.** Backdrop fades 200ms; panel `scale(0.97) → 1` plus
  opacity, 200ms. Previously both appeared instantly — the one surface in the
  "occasional" tier that clearly warrants motion had none. From 0.97, never
  `scale(0)`.
- **`fade-in-up` 400ms → 220ms, with a 45ms per-card stagger** capped at 6
  steps. Expanding Automation revealed seven cards simultaneously, which read
  as one flash rather than a list arriving.
- **The infinite `animate-ping` is gone from the fixed header.** It was on
  screen for 100% of every session — the most-seen motion on the site — for a
  claim that never changes. The hero keeps the animated version, seen once on
  arrival. The header dot is now static.
- **Added `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`** and `--ease-in-out`,
  applied to entrances only. Hover and colour transitions keep the default
  in-out, which is the right shape for a state change with no direction.

## [1.2.0] - 2026-07-29

### Added

- Added **Dev Mode**: a header toggle that re-skins the whole site as a
  developer console — monospace type, squared panels, a faint editor grid,
  `//` comment markers on section kickers, a `#` prefix on the five
  service-line headings, and a blinking terminal caret after the H1. The `>_`
  logo mark inverts to a green plate. The choice persists in `localStorage`
  under the key `portfolio-mode` and is restored by a blocking inline script in
  `<head>` **before first paint**, so returning visitors never see a white
  flash. Default (light) mode is unchanged and remains what ships in the HTML.
- Added `tests/e2e/dev-mode.spec.ts` (7 declarations, 13 runs): default-off,
  press/re-press, persistence in both directions, the before-first-paint
  guarantee asserted at `domcontentloaded` rather than after hydration,
  content-parity between modes, and a mobile no-horizontal-overflow check.

### Changed

- **Colour tokens now resolve through CSS custom properties.**
  `tailwind.config.ts` maps `navy`, `slate`, `indigo`, `emerald`, `accent` and
  `canvas` to `rgb(var(--c-*) / <alpha-value>)`; the two value sets live in
  `:root` and `html[data-mode='dev']` in `app/globals.css`. The default values
  are byte-identical to 1.1.0, so no shipped colour changed — including the
  three documented AA contrast fixes.
- Added four semantic tokens for cases where one Tailwind colour was doing two
  incompatible jobs and so could not simply be inverted:
  - `surface` — panel background. Replaces `bg-white` on the nine card/panel
    surfaces. `bg-white` is retained on the carousel dot indicators, which sit
    on a screenshot and must stay white in both modes.
  - `accent-on` — ink on a filled accent/indigo button. Replaces `text-white`
    on the mailto CTA and the modal's "View Live Site" link.
  - `chip` / `chip-ink` — the inverted `>_` logo plate and the skip link.
    Replaces `bg-navy-900` + `text-white`, which collided with the twelve
    `text-navy-900` body/heading uses.
  - `shot` / `shot-strip` — the modal's screenshot letterbox and thumbnail
    strip. Replaces `bg-slate-950` / `bg-slate-900`, which collided with
    `text-slate-900`. Deliberately mode-independent.
- Moved the service-line nav into a flex row that also holds the Dev Mode
  switch, as a sibling of `<nav>` rather than a child — the nav is an
  `overflow-x-auto` scroll container, and a control inside it scrolls out of
  reach on a phone. Header row 1 is untouched: at 390px the name and the
  availability badge each already wrap, and a third item there truncated the
  name to "Michael E…".
- `--header-h` 5.75rem → **6rem**. Row 2 is now 24px (the switch is pinned to
  `h-6` so the height is identical at every breakpoint) plus the existing 8px
  `pb-2`. Every `:target` anchor offset derives from this variable.
- `ProjectModal`'s "View Live Site" hover changed from `hover:bg-indigo-700` to
  `hover:brightness-110`. `indigo-700` is also the *text* colour on the tech
  stack chips, so the two uses could not share one inverted value.

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
