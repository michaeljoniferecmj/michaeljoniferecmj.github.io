import { test, expect } from '@playwright/test';

test.describe('Skills section', () => {
  test('renders a "SEO & GEO" category alongside the other four', async ({ page }) => {
    await page.goto('/');

    const cards = page.locator('#skills article');
    await expect(cards).toHaveCount(5);

    const titles = await cards.evaluateAll((els) =>
      els.map((el) => el.querySelector('h3')?.textContent?.trim()),
    );
    expect(titles).toEqual([
      'Automation Core',
      'Integrations',
      'AI & Intelligence',
      'Web Development',
      'SEO & GEO',
    ]);

    const seoCard = cards.filter({ has: page.getByRole('heading', { level: 3, name: 'SEO & GEO' }) });
    await expect(seoCard.getByText('Generative Engine Optimization (GEO)')).toBeVisible();
    await expect(seoCard.getByText('Technical & On-Page SEO')).toBeVisible();
  });

  test('intro copy mentions SEO/GEO', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#skills').getByText(/SEO\/GEO/)).toBeVisible();
  });
});

test.describe('Hero section', () => {
  test('renders a "SEO & GEO" specialty chip alongside the other four', async ({ page }) => {
    await page.goto('/');

    const chips = page.locator('#hero ul li');
    await expect(chips).toHaveCount(5);
    await expect(chips.getByText('SEO & GEO', { exact: true })).toBeVisible();
  });

  test('positioning copy mentions SEO and Generative Engine Optimization', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('#hero').getByText(/SEO and Generative Engine Optimization/),
    ).toBeVisible();
  });
});
