# Portfolio site

Michael Ervin Superable's portfolio. Next.js 14 (App Router), statically
exported, TypeScript, Tailwind CSS, Playwright for end-to-end tests. Deployed
from one repo to two live targets — GitHub Pages and Vercel (see
[Deploy and rollback](#deploy-and-rollback)).

Projects are organized into five service lines — **Websites**, **Apps**,
**SEO**, **Automation**, **AI Agents** — each rendered as its own section with
one anchor project and a bounded default view. See ADR-0001 ("Service-line
taxonomy for the portfolio site" — held in the project's planning workspace,
not in this repo) for the full rationale behind that structure; this document
covers the parts of it a maintainer touches day to day.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to out/ (output: 'export' in next.config.mjs)
npm run start     # serve the production build locally
npm run lint       # next lint
npm run test:e2e  # Playwright, see playwright.config.ts
```

There is no unit-test runner in this repo — Playwright end-to-end tests
(`tests/e2e/`) are the only automated test tooling.

## Project structure

```
app/                  Next.js App Router pages (app/page.tsx assembles the homepage)
components/           Hero, Navbar, Projects, ProjectLineSection, ProjectCard, Pill, ...
data/
  profile.ts           Name, title, summary, contact links, skills
  projects.ts          Project data, ServiceLine taxonomy, and its build-time invariants
tests/e2e/             Playwright specs
```

`data/projects.ts` is the single source of truth for what appears on the
site. Almost everything under "How to add or change a project" below is an
edit to that one file.

## How to add or change a project

This is the section that matters most: the whole point of the current
architecture is that "what appears on the site" is a data edit, never a
component edit (see P2 below). Read `data/projects.ts` alongside this section
— the field names and the invariant-checking function referenced here are
quoted directly from that file, not paraphrased.

### Adding a new project

1. Add a new object to the `projects` array in `data/projects.ts`.
2. Required fields on `Project`: `id` (unique, kebab-case — this becomes the
   Playwright test id `project-card-{id}`), `title`, `tagline`, `category`
   (freeform display prose — see P1 below, never parsed), `stack: string[]`,
   `description`, `highlights: string[]`, `lines` (a non-empty tuple, see
   next section), and `gradient` (a CSS gradient string used as placeholder
   card art before/without screenshots).
3. Optional fields: `anchorFor`, `screenshots: string[]`, `liveUrl`,
   `repoUrl`.
4. Where you insert it in the array matters. `projectsForLine()` sorts
   anchor-first, then falls back to array order (a stable sort) for every
   other project on that line. Appending to the end of `projects` puts a new
   entry at the back of its line's queue — behind that line's expand control
   once the line already has 3 or more cards (`DEFAULT_VISIBLE_PER_LINE = 3`).
   Move it earlier in the array, or make it the line's `anchorFor`, if it
   should be visible by default.
5. Run `npm run build` or `npm run dev` after editing. `data/projects.ts`
   calls `assertServiceLineInvariants()` at module scope, so a broken entry
   throws immediately — see "What the build-time invariant rejects" below.

### Changing which line(s) a project belongs to

- `lines: [ServiceLine, ...ServiceLine[]]` is a non-empty tuple, where
  `ServiceLine` is one of `'websites' | 'apps' | 'seo' | 'automation' |
  'ai-agents'`.
- `lines[0]` is the **primary** line. It decides which section renders the
  project's canonical, unsuffixed card
  (`data-testid="project-card-{id}"`).
- To move a project from one line to another, edit its `lines` array. That's
  the entire change — no `.tsx` file needs to change (P2).
- To cross-list a project into a *second* line, append the second
  `ServiceLine`: e.g. `lines: ['seo', 'websites']`. The unsuffixed card still
  renders under `lines[0]`; every additional line renders a second,
  *suffixed* card instance (`project-card-{id}-{line}`), so
  `getByTestId('project-card-{id}')` in Playwright stays an exact, single-match
  handle for the canonical card regardless of how many lines a project is in.

### The rule for when a project may belong to two lines

Per ADR-0001's secondary-line evidence rule: a project may hold a **second**
line only if that line's classification criterion is **independently
evidenced in the project's own `highlights` array** — never inferred from the
tech stack, never "technically defensible," never because the deliverable
happens to touch that domain. As of this writing exactly one project
(`houseplan-group`) qualifies: it is cross-listed as `lines: ['seo',
'websites']` because its `highlights` separately evidence a generated
SEO landing-page taxonomy *and* a live WooCommerce storefront.

The classification precedence order used to decide a project's *primary*
line (when it could plausibly fit more than one) is, strictly in this order:
**AI Agents → Apps → SEO → Websites → Automation**. The first criterion a
project clears is `lines[0]`. Full criteria and worked boundary calls are in
ADR-0001 — don't re-derive them from the code comments alone; several
entries in `data/projects.ts` carry inline comments explaining a specific
boundary call (e.g. `glacier-and-gorse`, `bags-emporium`,
`velox-lead-migration`) and those comments assume the ADR's precedence rule
as context.

### Moving an anchor

- `anchorFor?: ServiceLine` marks the one project that anchors a given line.
  The anchor renders first in its section (visually pinned, with a
  "Flagship" pill) and is exempt from being hidden behind the expand control.
- Exactly one project must have `anchorFor: '<line>'` for each of the five
  lines — no more, no fewer. This is enforced at build time (see below).
- To move a line's anchor: remove `anchorFor` from the current anchor
  project, and add `anchorFor: '<line>'` to the new one.
- `anchorFor`, when set, must equal that project's own `lines[0]` — you
  cannot anchor a line that isn't the project's *primary* line.

### What the build-time invariant rejects, and why

`assertServiceLineInvariants()` (in `data/projects.ts`) runs once at module
load — which means on every `next build`, `next dev`, and every Playwright
run, because the whole site is statically exported (`output: 'export'` in
`next.config.mjs`) and there is no server available to catch a bad data entry
at request time. Reading the function as it exists today, it throws when:

1. **A service line has no projects.** Every `id` in `SERVICE_LINES` must
   appear in at least one project's `lines` array, or you get
   `Service line "X" has no projects`.
2. **A service line doesn't have exactly one anchor.** Zero anchors or two-
   plus anchors for the same line both throw:
   `Service line "X" must have exactly one anchor, found N`.
3. **Two projects share an `id`.** `Duplicate project id "X"` — `id` is the
   basis for the Playwright test id, so it must be unique across the whole
   `projects` array.
4. **A project lists the same line twice.** `Project "X" has duplicate
   service lines` — e.g. `lines: ['apps', 'apps']`.
5. **`anchorFor` doesn't match `lines[0]`.** `Project "X" must anchor its
   primary line (lines[0])` — you set `anchorFor` on a line that isn't that
   project's primary line.
6. **A cross-listed project's canonical card would be hidden by default.**
   If a project is in more than one line, its canonical (unsuffixed) card —
   which always renders under `lines[0]` — must land within the first
   `DEFAULT_VISIBLE_PER_LINE` (3) positions of that line's list. If editing
   the array pushes it behind the expand control, the build fails with a
   message noting that a Playwright helper (`openModalForCard()`) would time
   out rather than fail cleanly. Fix by moving the project earlier in the
   array or making it the line's anchor.

Every one of these is a one-line fix in `data/projects.ts`. If you ever find
yourself editing a `.tsx` file to make a project show up correctly, that's a
sign the taxonomy is being bypassed — see P2 below.

## Principles that affect anyone editing this repo

The full reasoning lives in ADR-0001 ("Service-line taxonomy for the
portfolio site") — this is only the subset that changes how you should edit
`data/projects.ts` or the components that read it.

- **P1 — `category` is prose; `lines` is data; they never touch.** `category`
  is a freeform display string rendered as a card kicker. **Never parse
  `category` in code** to derive service-line membership or anything else.
  If you ever find code reading `.category` for logic rather than display,
  that is a violation to fix, not a pattern to extend.
- **P2 — Membership, anchor status, and ordering are data, not code.**
  Everything covered above (adding, cross-listing, anchoring) is an edit to
  `data/projects.ts`. No component may hard-code a project `id` or a curated
  list of projects. If changing what appears on the site requires editing a
  `.tsx` file, something has gone wrong.
- **P3 — Invariants the type system can't express are asserted at module
  scope, and failure means the build fails.** `assertServiceLineInvariants()`
  is that assertion. Don't remove or weaken it to get past a build error —
  fix the data instead (see the six conditions above).
- **P4 — `sectionId` is a public URL contract; `id` is internal.**
  `ServiceLineDef.sectionId` becomes both the DOM `id` of a section and the
  fragment in its nav link (e.g. `#projects-seo`); it is linkable and
  indexable from the moment it's deployed. `ServiceLineDef.id` is the
  internal key used by `lines` and `anchorFor` and can be renamed without
  breaking a published link — `sectionId` cannot be renamed without breaking
  one.
- **P5 — The unsuffixed card is canonical and must be visible by default.**
  For a cross-listed project, the card that renders without a `-{line}`
  suffix (i.e., under `lines[0]`) must appear within the default 3-card view
  of that line. This is condition 6 in "What the build-time invariant
  rejects" above.
- **P6 — A new service line needs evidence, not intent.** Don't add a sixth
  `ServiceLine` to make a point about breadth; a line ships when a project's
  own `highlights` independently clears that line's classification
  criterion.

## Deploy and rollback

Two live targets are served from this one repo:

- **GitHub Pages** — `.github/workflows/deploy.yml` runs on every push to
  `main` (plus manual `workflow_dispatch`). It runs `npm ci`, `npm run build`
  (static export via `output: 'export'`), and publishes the `out/` directory
  to Pages. **Pushing to `main` is the deploy** — there is no separate
  release step, no staging environment, and no manual approval gate in front
  of this workflow.
  - **Rollback:** `git revert <bad-commit>` and push to `main` — this
    re-triggers the workflow and republishes from the reverted state. If an
    immediate fix isn't ready, re-run the workflow via `workflow_dispatch`
    against a known-good prior commit instead of leaving the broken build
    live.
- **Vercel** — deployed manually from a local checkout with
  `vercel --prod --yes`. It is not wired into CI: there is no Vercel
  workflow step in `.github/workflows/`, and `.vercel/project.json` only
  links the local checkout to a Vercel project (`portfolio-site`) — it does
  not trigger deploys on push.
  - **Rollback:** use `vercel rollback` to revert to the previous production
    deployment, or promote an earlier deployment from the Vercel dashboard.
