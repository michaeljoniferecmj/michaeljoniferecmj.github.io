import { test, expect } from '@playwright/test';
import { projects, featuredProjects } from '../../data/projects';

const CARD_SELECTOR = 'article[data-testid^="project-card-"]';

test.describe('Featured projects on the homepage', () => {
  test('shows exactly the featured projects, in data-file order, on initial load', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator(CARD_SELECTOR);
    await expect(cards).toHaveCount(featuredProjects.length);

    const renderedIds = await cards.evaluateAll((els) =>
      els.map((el) => el.getAttribute('data-testid')),
    );
    const expectedIds = featuredProjects.map((p) => `project-card-${p.id}`);
    expect(renderedIds).toEqual(expectedIds);

    // Explicit, human-readable assertion of the exact order requested.
    const renderedTitles = await cards.evaluateAll((els) =>
      els.map((el) => el.querySelector('h3')?.textContent?.trim()),
    );
    expect(renderedTitles).toEqual(
      featuredProjects.map((p) => p.title),
    );

    // Hard-coded pin on the specific order this suite is guarding against
    // regressing, independent of whatever the data file happens to contain.
    expect(renderedTitles).toEqual(['Ask Trevor', 'HousePlan Group', 'Iron & Vine']);
  });

  test('helper text is accurate before and after expanding', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText(`Showing ${featuredProjects.length} of ${projects.length} projects`),
    ).toBeVisible();

    await page.getByRole('button', { name: `View All ${projects.length} Projects` }).click();

    await expect(page.getByText(`Showing all ${projects.length} projects`)).toBeVisible();
    await expect(
      page.getByText(`Showing ${featuredProjects.length} of ${projects.length} projects`),
    ).toHaveCount(0);
  });

  test('"View All" expands to every project and "Show Less" collapses back to featured only', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator(CARD_SELECTOR);
    await expect(cards).toHaveCount(featuredProjects.length);

    await page.getByRole('button', { name: `View All ${projects.length} Projects` }).click();
    await expect(cards).toHaveCount(projects.length);

    const expandedIds = await cards.evaluateAll((els) =>
      els.map((el) => el.getAttribute('data-testid')),
    );
    expect(expandedIds).toEqual(projects.map((p) => `project-card-${p.id}`));

    await page.getByRole('button', { name: 'Show Less' }).click();
    await expect(cards).toHaveCount(featuredProjects.length);

    const collapsedIds = await cards.evaluateAll((els) =>
      els.map((el) => el.getAttribute('data-testid')),
    );
    expect(collapsedIds).toEqual(featuredProjects.map((p) => `project-card-${p.id}`));
  });
});
