import { test, expect, Page } from '@playwright/test';
import { profile } from '../../data/profile';

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

    const heroHeading = page.locator('#hero-heading');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Building');
    await expect(heroHeading).toContainText('automation workflows');

    // Give the page a moment to surface any late async errors.
    await page.waitForLoadState('networkidle');
    expect(errors, `Unexpected browser errors:\n${errors.join('\n')}`).toEqual([]);
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
    expect(count).toBeGreaterThan(0);

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
    for (const id of ['skills', 'projects', 'contact']) {
      await page.goto(`/#${id}`);
      await expect(page.locator(`section#${id}`)).toBeInViewport();
    }
  });

  test('a11y sanity: exactly one h1 and every image has an alt attribute', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveCount(1);

    // Reveal all projects so every card image is in the DOM.
    await page.getByRole('button', { name: /View All \d+ Projects/ }).click();

    const images = page.locator('img');
    const total = await images.count();
    for (let i = 0; i < total; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `img #${i} (src=${await images.nth(i).getAttribute('src')}) is missing an alt attribute`).not.toBeNull();
    }
  });
});
