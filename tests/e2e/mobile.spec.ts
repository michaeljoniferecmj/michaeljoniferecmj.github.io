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

  test('the service-line nav is its own scroll container, not a page-width source', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('header nav[aria-label="Service lines"]');
    await expect(nav).toBeVisible();

    const metrics = await nav.evaluate((el) => {
      const list = el.querySelector('ul')!;
      return {
        navOverflowX: getComputedStyle(el).overflowX,
        listWhiteSpace: getComputedStyle(list).whiteSpace,
        navScrollWidth: el.scrollWidth,
        navClientWidth: el.clientWidth,
        navBoxWidth: Math.round(el.getBoundingClientRect().width),
        docScrollWidth: document.documentElement.scrollWidth,
        docClientWidth: document.documentElement.clientWidth,
      };
    });

    // THE mechanism: overflow lives on the <nav>, and the <ul> never wraps.
    // Any horizontal scrolling therefore happens inside the nav box, so
    // document.documentElement.scrollWidth cannot grow with the label set.
    expect(metrics.navOverflowX).toBe('auto');
    expect(metrics.listWhiteSpace).toBe('nowrap');

    // The nav box itself never exceeds the viewport...
    expect(metrics.navBoxWidth).toBeLessThanOrEqual(metrics.docClientWidth);
    // ...and the page still does not scroll horizontally.
    expect(metrics.docScrollWidth).toBeLessThanOrEqual(metrics.docClientWidth + 1);

    // At 390px the five labels fit (the <ul> measures ~342px inside a ~350px
    // strip), so nothing overflows yet and the assertions above are the whole
    // story here. Narrow to 320px — the smallest supported viewport — where
    // the strip genuinely does overflow, and prove the containment rather than
    // assuming it.
    await page.setViewportSize({ width: 320, height: 660 });
    const narrow = await nav.evaluate((el) => {
      el.scrollLeft = 9999;
      return {
        navScrollWidth: el.scrollWidth,
        navClientWidth: el.clientWidth,
        scrollLeft: el.scrollLeft,
        docScrollWidth: document.documentElement.scrollWidth,
        docClientWidth: document.documentElement.clientWidth,
      };
    });

    // The nav overflows internally...
    expect(narrow.navScrollWidth).toBeGreaterThan(narrow.navClientWidth);
    // ...it really is the element that scrolls...
    expect(narrow.scrollLeft).toBeGreaterThan(0);
    // ...and the document width is unmoved by any of it.
    expect(narrow.docScrollWidth).toBeLessThanOrEqual(narrow.docClientWidth + 1);
  });

  test('the hero headline renders above the headshot on a narrow viewport', async ({ page }) => {
    // The five-service-line sentence must be the first thing on screen. This
    // layout previously reversed the stack, putting the headshot above the H1
    // and pushing that sentence toward (or past) the fold.
    await page.goto('/');

    const headingBox = (await page.locator('#hero-heading').boundingBox())!;
    const headshotBox = (await page.locator('#hero img').first().boundingBox())!;
    expect(headingBox.y).toBeLessThan(headshotBox.y);
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
