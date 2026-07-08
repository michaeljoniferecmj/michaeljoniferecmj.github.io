import { test, expect } from '@playwright/test';
import { profile } from '../../data/profile';

test.describe('Mobile viewport', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile-only checks');

  test('page renders without horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero-heading')).toBeVisible();

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, 'page should not scroll horizontally on mobile').toBeLessThanOrEqual(clientWidth + 1);
  });

  test('nav is visible and usable', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByText(profile.name)).toBeVisible();
    await expect(header.getByText('Available for Hire')).toBeVisible();

    // Scroll down, then use the navbar's home anchor to get back to the hero.
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await header.getByRole('link', { name: 'Back to top' }).click();
    await expect(page.locator('#hero')).toBeInViewport();
  });

  test('skills cards stack in a single column', async ({ page }) => {
    await page.goto('/');
    const skillCards = page.locator('#skills article');
    const count = await skillCards.count();
    expect(count).toBeGreaterThan(1);

    const first = (await skillCards.nth(0).boundingBox())!;
    const second = (await skillCards.nth(1).boundingBox())!;
    expect(Math.abs(first.x - second.x)).toBeLessThan(2);
    expect(second.y).toBeGreaterThan(first.y + first.height - 1);
  });
});
