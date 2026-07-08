import { test, expect, Locator, Page } from '@playwright/test';
import { projects, featuredProjects } from '../../data/projects';

const CARD_SELECTOR = 'article[data-testid^="project-card-"]';

async function showAllProjects(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: /View All \d+ Projects/ }).click();
  await expect(page.locator(CARD_SELECTOR)).toHaveCount(projects.length);
}

async function openModalForCard(page: Page, projectId: string): Promise<Locator> {
  const card = page.getByTestId(`project-card-${projectId}`);
  await card.scrollIntoViewIfNeeded();
  await card.getByRole('button', { name: 'View Project Details' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  return dialog;
}

test.describe('Projects section', () => {
  test('shows featured projects by default and all projects after "View All"', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator(CARD_SELECTOR);
    await expect(cards).toHaveCount(featuredProjects.length);

    await page.getByRole('button', { name: `View All ${projects.length} Projects` }).click();
    await expect(cards).toHaveCount(projects.length);
    await expect(page.getByText(`Showing all ${projects.length} projects`)).toBeVisible();

    // Every project from the data file has its own card, exactly once.
    for (const project of projects) {
      await expect(page.getByTestId(`project-card-${project.id}`)).toHaveCount(1);
    }

    // Collapse back down.
    await page.getByRole('button', { name: 'Show Less' }).click();
    await expect(cards).toHaveCount(featuredProjects.length);
  });

  test('project card opens a modal with the project details; closes via button and Escape', async ({ page }) => {
    const project = projects[0];
    await page.goto('/');

    // Open the modal from the first card.
    const dialog = await openModalForCard(page, project.id);
    await expect(dialog).toHaveAttribute('aria-label', `${project.title} details`);
    await expect(dialog.getByRole('heading', { level: 2, name: project.title })).toBeVisible();
    await expect(dialog.getByText(project.description)).toBeVisible();
    await expect(dialog.getByText(project.tagline)).toBeVisible();

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
    const projectsWithShots = projects.filter((p) => (p.screenshots ?? []).length > 0);
    expect(projectsWithShots.length).toBeGreaterThan(0);

    await showAllProjects(page);

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
