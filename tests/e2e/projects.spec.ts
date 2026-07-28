import { test, expect, Locator, Page } from '@playwright/test';
import { projects } from '../../data/projects';
import { CARD_SELECTOR, TOTAL_CARD_INSTANCES, showAllLines } from './helpers';

async function openModalForCard(page: Page, projectId: string): Promise<Locator> {
  const card = page.getByTestId(`project-card-${projectId}`);
  await card.scrollIntoViewIfNeeded();
  await card.getByRole('button', { name: 'View Project Details' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  return dialog;
}

test.describe('Projects section', () => {
  // Replaces the old featured/"View All" test. There is no longer one global
  // toggle: each service line is independently bounded and expanded. The
  // per-line anchor, bound, and control assertions live in
  // service-lines.spec.ts; what this file keeps is the DOM-identity guarantee
  // that every card is uniquely addressable, which the modal tests below rely
  // on.
  test('every project in the data file has exactly one uniquely addressable card', async ({ page }) => {
    await page.goto('/');
    await showAllLines(page);

    await expect(page.locator(CARD_SELECTOR)).toHaveCount(TOTAL_CARD_INSTANCES);

    for (const project of projects) {
      await expect(page.getByTestId(`project-card-${project.id}`)).toHaveCount(1);
    }
  });

  test('project card opens a modal with the project details; closes via button and Escape', async ({ page }) => {
    const project = projects[0];
    await page.goto('/');

    // Open the modal from the first card.
    const dialog = await openModalForCard(page, project.id);
    await expect(dialog).toHaveAttribute('aria-label', `${project.title} details`);
    await expect(dialog.getByRole('heading', { level: 2, name: project.title })).toBeVisible();
    await expect(dialog.getByText(project.description)).toBeVisible();
    await expect(dialog.getByText(project.tagline, { exact: true })).toBeVisible();

    // Close via the close button.
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);

    // Re-open and close via the Escape key.
    await openModalForCard(page, project.id);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('modal shows key features and tech stack from the data file', async ({ page }) => {
    const project = projects.find((p) => p.highlights.length > 0 && p.stack.length > 0)!;
    await page.goto('/');
    const dialog = await openModalForCard(page, project.id);

    await expect(dialog.getByText(project.highlights[0])).toBeVisible();
    for (const tech of project.stack) {
      await expect(dialog.getByText(tech, { exact: true }).first()).toBeVisible();
    }
  });

  test('every screenshot listed in the data file loads in its project modal', async ({ page }) => {
    // Explicit budget, not the 30s default. This test's scope grew with the
    // restructure: it now expands all five lines, traverses 36 card instances,
    // and opens a modal per screenshotted project while polling each image's
    // naturalWidth. Typical wall time is ~20s, but it has been observed at
    // 35.6s under parallel load — i.e. red CI on an unrelated future PR. The
    // budget states the real cost; it does not reduce what is covered.
    test.setTimeout(90_000);

    const projectsWithShots = projects.filter((p) => (p.screenshots ?? []).length > 0);
    expect(projectsWithShots.length).toBeGreaterThan(0);

    await page.goto('/');
    await showAllLines(page);

    for (const project of projectsWithShots) {
      const shots = project.screenshots!;
      const dialog = await openModalForCard(page, project.id);

      for (let i = 0; i < shots.length; i++) {
        if (shots.length > 1) {
          await dialog.getByRole('button', { name: `View screenshot ${i + 1}`, exact: true }).click();
        }
        const img = dialog.locator(`img[src="${shots[i]}"][alt*="screenshot ${i + 1} of ${shots.length}"]`);
        await expect(img).toBeVisible();
        await expect
          .poll(
            () => img.evaluate((el: HTMLImageElement) => el.naturalWidth),
            { message: `${project.id} screenshot ${shots[i]} should load (naturalWidth > 0)` },
          )
          .toBeGreaterThan(0);
      }

      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  });

  test('card layout: preview and content stack on mobile, sit side-by-side on desktop', async ({ page, isMobile }) => {
    await page.goto('/');

    const firstCard = page.locator(CARD_SELECTOR).first();
    await firstCard.scrollIntoViewIfNeeded();
    const preview = firstCard.locator('> div').nth(0);
    const content = firstCard.locator('> div').nth(1);

    const previewBox = (await preview.boundingBox())!;
    const contentBox = (await content.boundingBox())!;

    if (isMobile) {
      // Stacked: content starts below the preview panel.
      expect(contentBox.y).toBeGreaterThanOrEqual(previewBox.y + previewBox.height - 1);
    } else {
      // Side-by-side: content starts to the right of the preview panel.
      expect(contentBox.x).toBeGreaterThanOrEqual(previewBox.x + previewBox.width - 1);
      expect(Math.abs(contentBox.y - previewBox.y)).toBeLessThan(2);
    }
  });
});
