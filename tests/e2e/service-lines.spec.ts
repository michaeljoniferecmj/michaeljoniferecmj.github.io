import { test, expect } from '@playwright/test';
import {
  DEFAULT_VISIBLE_PER_LINE,
  SERVICE_LINES,
  anchorForLine,
  projects,
  projectsForLine,
} from '../../data/projects';
import {
  CARD_SELECTOR,
  TOTAL_CARD_INSTANCES,
  collapseControlName,
  expandControlName,
  lineTotal,
  showAllLines,
} from './helpers';

/**
 * Replaces `featured-projects.spec.ts`, which guarded the deleted
 * `featured` / `featuredProjects` curation mechanism. The file name now
 * describes what it actually guards.
 */
test.describe('Service lines', () => {
  test('every service line renders exactly once, with its heading and blurb', async ({ page }) => {
    await page.goto('/');

    for (const line of SERVICE_LINES) {
      const section = page.locator(`section#${line.sectionId}`);
      await expect(section).toHaveCount(1);

      // 1.3.1 Info and Relationships — each section must keep its own
      // aria-labelledby pointing at its own heading.
      await expect(section).toHaveAttribute('aria-labelledby', `${line.sectionId}-heading`);

      const heading = page.locator(`#${line.sectionId}-heading`);
      await expect(heading).toHaveText(line.label);
      // Programmatic focus target for fragment navigation (WCAG 2.4.3).
      await expect(heading).toHaveAttribute('tabindex', '-1');

      await expect(section.getByText(line.blurb)).toBeVisible();
    }
  });

  test('each line leads with its anchor project', async ({ page }) => {
    await page.goto('/');

    for (const line of SERVICE_LINES) {
      const anchor = anchorForLine(line.id);
      const firstCard = page.locator(`#${line.sectionId} ${CARD_SELECTOR}`).first();
      await expect(firstCard).toHaveAttribute(
        'data-testid',
        `project-card-${anchor.id}`,
      );
      // Anchor primacy is a wrapper treatment one level up, never a different
      // card component — so the badge lives outside the <article>.
      await expect(
        page.locator(`#${line.sectionId}`).getByTestId('pill-flagship').first(),
      ).toBeVisible();
    }

    // Pins the actual five anchors, independent of whatever the data file
    // happens to contain. Replaces the old ['Ask Trevor', 'HousePlan Group',
    // 'Iron & Vine'] featured pin.
    expect(SERVICE_LINES.map((l) => anchorForLine(l.id).title)).toEqual([
      'Vision Sportswear PH',
      'ReviewPilot',
      'HousePlan Group',
      'IronGrid IT',
      'Ask Trevor',
    ]);
  });

  test('bounded default: every line shows at most three cards before any interaction', async ({ page }) => {
    await page.goto('/');

    let defaultTotal = 0;
    for (const line of SERVICE_LINES) {
      const expected = Math.min(DEFAULT_VISIBLE_PER_LINE, lineTotal(line));
      await expect(page.locator(`#${line.sectionId} ${CARD_SELECTOR}`)).toHaveCount(expected);
      defaultTotal += expected;
    }

    await expect(page.locator(CARD_SELECTOR)).toHaveCount(defaultTotal);
    // NFR: the default page weight never exceeds 5 lines x 3 cards.
    expect(defaultTotal).toBeLessThanOrEqual(SERVICE_LINES.length * DEFAULT_VISIBLE_PER_LINE);
  });

  test('helper text states the true total for every line, including one-card lines', async ({ page }) => {
    await page.goto('/');

    for (const line of SERVICE_LINES) {
      const total = lineTotal(line);
      const visible = Math.min(DEFAULT_VISIBLE_PER_LINE, total);
      const noun = total === 1 ? 'project' : 'projects';
      const expected =
        visible === total
          ? `Showing all ${total} ${line.label} ${noun}`
          : `Showing ${visible} of ${total} ${line.label} ${noun}`;

      const helper = page.locator(`#${line.sectionId}`).getByText(expected, { exact: true });
      await expect(helper).toBeVisible();
      // WCAG 4.1.3 — it updates in place while focus stays on the button.
      await expect(helper).toHaveAttribute('aria-live', 'polite');
    }
  });

  test('the expand control exists if and only if a line holds more than three projects', async ({ page }) => {
    // Explicit budget: a fresh document per line (5 navigations), each with an
    // expand, a 24-card render, and a collapse. ~10s typical, but it is the
    // third-heaviest declaration in the suite and sits closest to the default
    // after the two already raised.
    test.setTimeout(60_000);

    for (const line of SERVICE_LINES) {
      await page.goto('/');
      const section = page.locator(`#${line.sectionId}`);
      const total = lineTotal(line);
      const expandControl = section.getByRole('button', {
        name: expandControlName(line),
        exact: true,
      });

      if (total <= DEFAULT_VISIBLE_PER_LINE) {
        // OMITTED, never rendered-disabled: a disabled control reads as broken,
        // an absent one reads as complete. Assert absence, not disabled-ness.
        await expect(expandControl).toHaveCount(0);
        // No disclosure control of ANY kind — enabled or disabled — in a
        // section that has nothing more to show.
        await expect(
          section.getByRole('button', { name: /(View all|Show fewer).*project/ }),
        ).toHaveCount(0);
        continue;
      }

      await expect(expandControl).toHaveCount(1);
      await expect(expandControl).toHaveAttribute('aria-expanded', 'false');

      await expandControl.click();
      await expect(section.locator(CARD_SELECTOR)).toHaveCount(total);
      await expect(
        section.getByText(`Showing all ${total} ${line.label} projects`, { exact: true }),
      ).toBeVisible();

      // Two collapse controls once expanded: one beside the heading, one at the
      // end of the list. For Automation's 24 entries the end-of-list control
      // alone is a very long scroll back. Same copy, same state, two locations.
      const collapseControls = section.getByRole('button', {
        name: collapseControlName(line),
        exact: true,
      });
      await expect(collapseControls).toHaveCount(2);
      for (let i = 0; i < 2; i++) {
        await expect(collapseControls.nth(i)).toHaveAttribute('aria-expanded', 'true');
      }

      // Collapsing from the heading-adjacent control restores the bound.
      await collapseControls.first().click();
      await expect(section.locator(CARD_SELECTOR)).toHaveCount(DEFAULT_VISIBLE_PER_LINE);
      await expect(expandControl).toHaveCount(1);
    }
  });

  test('expand state is per line: expanding one line leaves the others bounded', async ({ page }) => {
    await page.goto('/');

    const expandable = SERVICE_LINES.filter((l) => lineTotal(l) > DEFAULT_VISIBLE_PER_LINE);
    expect(expandable.length).toBeGreaterThan(1);

    const [first] = expandable;
    await page
      .getByRole('button', { name: expandControlName(first), exact: true })
      .click();
    await expect(page.locator(`#${first.sectionId} ${CARD_SELECTOR}`)).toHaveCount(
      lineTotal(first),
    );

    for (const other of SERVICE_LINES) {
      if (other.id === first.id) continue;
      await expect(page.locator(`#${other.sectionId} ${CARD_SELECTOR}`)).toHaveCount(
        Math.min(DEFAULT_VISIBLE_PER_LINE, lineTotal(other)),
      );
    }
  });

  test('aggregate integrity: every project renders exactly one canonical card', async ({ page }) => {
    await page.goto('/');
    await showAllLines(page);

    await expect(page.locator(CARD_SELECTOR)).toHaveCount(TOTAL_CARD_INSTANCES);

    for (const project of projects) {
      await expect(page.getByTestId(`project-card-${project.id}`)).toHaveCount(1);
    }

    // DELIBERATE, NOT A DUPLICATE BUG. `houseplan-group` is cross-listed
    // (FR-03): its canonical card renders in its primary line (#projects-seo)
    // and a suffixed instance renders in #projects-websites. This is why the
    // total instance count is projects.length + 1. If you are here because a
    // count looks "off by one", this comment is the answer — do not delete the
    // cross-listing to make the numbers match.
    await expect(page.getByTestId('project-card-houseplan-group-websites')).toHaveCount(1);
    await expect(page.locator('#projects-seo [data-testid="project-card-houseplan-group"]')).toHaveCount(1);
    await expect(
      page.locator('#projects-websites [data-testid="project-card-houseplan-group-websites"]'),
    ).toHaveCount(1);

    // Both instances carry the same content — only the wrapper and the pill
    // differ. A stripped-down second instance would contradict what the
    // "Also serves" pill promises the visitor.
    const canonicalText = await page
      .getByTestId('project-card-houseplan-group')
      .innerText();
    const crossListedText = await page
      .getByTestId('project-card-houseplan-group-websites')
      .innerText();
    expect(crossListedText).toEqual(canonicalText);

    // And the visitor is told why it appears twice, in both places.
    await expect(
      page.locator('#projects-websites').getByTestId('pill-cross-listed'),
    ).toHaveText('Also serves SEO');
    await expect(
      page.locator('#projects-seo').getByTestId('pill-cross-listed'),
    ).toHaveText('Also serves Websites');
  });

  test('the service-line nav pins to the five sections, in stack order', async ({ page }) => {
    await page.goto('/');

    const navLinks = page.locator('header nav[aria-label="Service lines"] a');
    await expect(navLinks).toHaveCount(SERVICE_LINES.length);

    const hrefs = await navLinks.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href')),
    );
    // Nav order MUST equal section stack order (Nielsen #4). Both derive from
    // SERVICE_LINES, and this pins that they still do.
    expect(hrefs).toEqual(SERVICE_LINES.map((l) => `#${l.sectionId}`));

    const labels = await navLinks.evaluateAll((els) =>
      els.map((el) => el.textContent?.trim()),
    );
    expect(labels).toEqual(SERVICE_LINES.map((l) => l.label));

    // A dropped nav link used to pass silently under `count > 0`.
    await expect(page.locator('header a[href^="#"]')).toHaveCount(
      SERVICE_LINES.length + 1, // + the "Back to top" logo link
    );
  });

  test('the Apps line ships the three new entries, by title and in order', async ({ page }) => {
    // FR-12. These three were previously covered only generically, via the
    // Apps count of 6 — which a wrong entry, a wrong title, or a wrong
    // position would all have satisfied.
    await page.goto('/');

    const apps = SERVICE_LINES.find((l) => l.id === 'apps')!;
    await page
      .getByRole('button', { name: expandControlName(apps), exact: true })
      .click();

    const titles = await page
      .locator(`#${apps.sectionId} ${CARD_SELECTOR} h3`)
      .evaluateAll((els) => els.map((el) => el.textContent?.trim()));

    expect(titles).toEqual([
      'ReviewPilot',
      'Velvet Flutter Salon Hub',
      'Shop Management System',
      'Message Hub',
      'SoloPM (Command Center)',
      'Shopee Live Sticker Helper',
    ]);

    // The three new entries are appended after the screenshotted ones
    // deliberately: every card visible before any interaction carries real
    // visual proof, and the text-only entries sit behind the expand control.
    for (const title of titles.slice(0, DEFAULT_VISIBLE_PER_LINE)) {
      const project = projectsForLine('apps').find((p) => p.title === title)!;
      expect(project.screenshots?.length ?? 0).toBeGreaterThan(0);
    }
  });

  test('the data-file assignment matches the shipped section counts', async () => {
    // Guards the taxonomy itself rather than the DOM: a mis-assigned project
    // would otherwise only surface as a card appearing under the wrong heading.
    const counts = Object.fromEntries(
      SERVICE_LINES.map((l) => [l.id, projectsForLine(l.id).length]),
    );
    expect(counts).toEqual({
      websites: 4,
      apps: 6,
      seo: 2,
      automation: 24,
      'ai-agents': 1,
    });

    // Primary-line membership partitions the catalog exactly once.
    const primaryTotal = SERVICE_LINES.reduce(
      (n, l) => n + projects.filter((p) => p.lines[0] === l.id).length,
      0,
    );
    expect(primaryTotal).toBe(projects.length);
  });
});
