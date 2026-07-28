import { expect, Page } from '@playwright/test';
import {
  DEFAULT_VISIBLE_PER_LINE,
  SERVICE_LINES,
  projectsForLine,
  projects,
  type ServiceLineDef,
} from '../../data/projects';

/**
 * Shared service-line test helpers.
 *
 * Not a spec file — Playwright's default `testMatch` only collects
 * `*.spec.ts`, so nothing here is treated as a test.
 */

export const CARD_SELECTOR = 'article[data-testid^="project-card-"]';

/**
 * Total card INSTANCES rendered when every line is expanded.
 *
 * This is `projects.length + 1`, not `projects.length`. The +1 is the
 * deliberate FR-03 cross-listing: `houseplan-group` is a member of both `seo`
 * (its primary line, rendering the canonical `project-card-houseplan-group`)
 * and `websites` (rendering the suffixed
 * `project-card-houseplan-group-websites`). It is NOT a duplicate-render bug —
 * do not "fix" it by making these numbers equal.
 */
export const TOTAL_CARD_INSTANCES = SERVICE_LINES.reduce(
  (n, line) => n + projectsForLine(line.id).length,
  0,
);

export function lineTotal(line: ServiceLineDef): number {
  return projectsForLine(line.id).length;
}

export function expandControlName(line: ServiceLineDef): string {
  return `View all ${lineTotal(line)} ${line.label} projects`;
}

export function collapseControlName(line: ServiceLineDef): string {
  return `Show fewer ${line.label} projects`;
}

/**
 * Expands every service line that has an expand control, then asserts the
 * whole catalog is in the DOM.
 *
 * Replaces the old single global `showAllProjects()` — there is no longer one
 * "View All" button, there are up to five per-line controls.
 */
export async function showAllLines(page: Page): Promise<void> {
  for (const line of SERVICE_LINES) {
    const total = lineTotal(line);
    // Lines at or under the bound render NO control at all (never a disabled
    // one), so there is nothing to click.
    if (total <= DEFAULT_VISIBLE_PER_LINE) continue;

    await page
      .getByRole('button', { name: expandControlName(line), exact: true })
      .click();
    await expect(page.locator(`#${line.sectionId} ${CARD_SELECTOR}`)).toHaveCount(total);
  }

  await expect(page.locator(CARD_SELECTOR)).toHaveCount(TOTAL_CARD_INSTANCES);
  expect(TOTAL_CARD_INSTANCES).toBe(projects.length + 1);
}
