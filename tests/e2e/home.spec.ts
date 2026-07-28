import { test, expect, Page } from '@playwright/test';
import { profile } from '../../data/profile';
import { SERVICE_LINES } from '../../data/projects';
import { showAllLines } from './helpers';

function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    errors.push(`pageerror: ${err.message}`);
  });
  return errors;
}

test.describe('Home page', () => {
  test('loads with expected title, hero heading, and no console/page errors', async ({ page }) => {
    const errors = collectPageErrors(page);

    await page.goto('/');

    await expect(page).toHaveTitle(`${profile.name} — ${profile.title}`);

    // The assertion above derives its expectation from the same file it tests,
    // so it proves the title is WIRED but cannot catch a regression of the
    // positioning copy itself (FR-09). Pin the literal string as well.
    expect(profile.title).toBe('Web, App, SEO, Automation & AI Agent Developer');

    const heroHeading = page.locator('#hero-heading');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Building');
    await expect(heroHeading).toContainText('automation workflows');

    // Give the page a moment to surface any late async errors.
    await page.waitForLoadState('networkidle');
    expect(errors, `Unexpected browser errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('the meta description carries the five-service-line positioning (FR-10)', async ({ page }) => {
    // `profile.summary` had no coverage at all: it only feeds the meta
    // description, so nothing on the rendered page would reveal a regression.
    await page.goto('/');

    const description = page.locator('head meta[name="description"]');
    await expect(description).toHaveAttribute('content', profile.summary);

    // All five lines must be named, and the string must stay inside the
    // meta-description sweet spot.
    for (const term of ['websites', 'apps', 'SEO', 'automation', 'AI agents']) {
      expect(profile.summary).toContain(term);
    }
    expect(profile.summary.length).toBeGreaterThan(120);
    expect(profile.summary.length).toBeLessThanOrEqual(165);
  });

  test('renders all main sections', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hero', 'skills', 'projects', 'contact']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
    await expect(page.locator('#skills-heading')).toHaveText('Tech Stack & Tools');
    await expect(page.locator('#projects-heading')).toHaveText('Projects');
    await expect(page.locator('#contact-heading')).toHaveText("Let's work together");
  });

  test('navbar anchor links point at existing sections and scroll to them', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('header a[href^="#"]');
    const count = await navLinks.count();
    // Pinned, not `> 0`: under the old assertion a dropped nav link passed
    // silently. One "Back to top" logo link + one per service line.
    expect(count).toBe(SERVICE_LINES.length + 1);

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = (await link.getAttribute('href'))!;
      const targetId = href.slice(1);

      // The anchor target must exist on the page.
      const target = page.locator(`#${targetId}`);
      await expect(target).toHaveCount(1);

      // Scroll away, click the link, and verify the target enters the viewport.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await link.click();
      await expect(target).toBeInViewport();
    }
  });

  test('deep-linking to each section anchor scrolls it into view', async ({ page }) => {
    // Explicit budget: this loop went from 3 anchors to 9, each requiring two
    // full navigations (about:blank + the fragment) and a 10s in-viewport
    // wait. ~16s typical, so the 30s default leaves too little headroom.
    test.setTimeout(90_000);

    // The five service-line fragments are a permanent public contract from
    // first deploy — they are covered here alongside the original four.
    const ids = ['skills', 'projects', 'contact', ...SERVICE_LINES.map((l) => l.sectionId)];
    for (const id of ids) {
      // Fresh document per anchor: chained same-document hash navigations
      // race the previous smooth-scroll animation, which is not the
      // deep-linking behavior this test covers.
      await page.goto('about:blank');
      await page.goto(`/#${id}`);
      await expect(page.locator(`section#${id}`)).toBeInViewport({ timeout: 10_000 });
    }
  });

  test('fragment navigation moves focus, not just the viewport (WCAG 2.4.3)', async ({ page }) => {
    // Explicit budget: 9 anchors x 2 navigations for the load-with-fragment
    // half, plus 5 nav activations, each with a polled activeElement check.
    // ~20s typical and observed at 27.7s under load — 2.3s of margin against
    // the 30s default is not a budget, it is a coin flip.
    test.setTimeout(90_000);

    // A bare `<a href="#x">` scrolls the viewport but leaves keyboard focus on
    // the link, so the next Tab continues from the header rather than from the
    // content the visitor just jumped to.
    const anchors = [
      { section: 'hero', heading: 'hero-heading' },
      { section: 'skills', heading: 'skills-heading' },
      { section: 'projects', heading: 'projects-heading' },
      { section: 'contact', heading: 'contact-heading' },
      ...SERVICE_LINES.map((l) => ({
        section: l.sectionId,
        heading: `${l.sectionId}-heading`,
      })),
    ];
    expect(anchors).toHaveLength(9);

    // (a) Load-with-fragment.
    for (const { section, heading } of anchors) {
      await page.goto('about:blank');
      await page.goto(`/#${section}`);
      await expect
        .poll(() => page.evaluate(() => document.activeElement?.id ?? null))
        .toBe(heading);
    }

    // (b) Activating a nav link in an already-loaded document.
    await page.goto('/');
    const navLinks = page.locator('header nav[aria-label="Service lines"] a');
    const navCount = await navLinks.count();
    for (let i = 0; i < navCount; i++) {
      const href = (await navLinks.nth(i).getAttribute('href'))!;
      await navLinks.nth(i).click();
      await expect
        .poll(() => page.evaluate(() => document.activeElement?.id ?? null))
        .toBe(`${href.slice(1)}-heading`);
    }
  });

  test('a11y sanity: exactly one h1 and every image has an alt attribute', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveCount(1);

    // Reveal every card in every line so all card images are in the DOM.
    await showAllLines(page);

    const images = page.locator('img');
    const total = await images.count();
    for (let i = 0; i < total; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `img #${i} (src=${await images.nth(i).getAttribute('src')}) is missing an alt attribute`).not.toBeNull();
    }
  });
});
