import { test, expect } from '@playwright/test';
import { SERVICE_LINES } from '../../data/projects';

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
  // Was: 'renders a "SEO & GEO" specialty chip alongside the other four'.
  // The chips are now the five service lines rather than an ad-hoc skills list,
  // so the assertion is updated to the new intended behaviour rather than
  // dropped. The count pin (5) is unchanged and still load-bearing: `#hero`
  // must contain exactly one <ul> with exactly five items.
  test('the specialty chips are the five service lines, in stack order', async ({ page }) => {
    await page.goto('/');

    const chips = page.locator('#hero ul li');
    await expect(chips).toHaveCount(SERVICE_LINES.length);
    expect(SERVICE_LINES.length).toBe(5);

    const labels = await chips.evaluateAll((els) =>
      els.map((el) => el.textContent?.trim()),
    );
    // Derived from the data file, so a line rename cannot desync the hero...
    expect(labels).toEqual(SERVICE_LINES.map((l) => l.label));
    // ...and pinned literally, so a copy regression in the data file is caught.
    expect(labels).toEqual(['Websites', 'Apps', 'SEO', 'Automation', 'AI Agents']);

    // Labelling change only — these are not links and must not become a
    // second nav (chip-as-nav was rejected in design consensus).
    await expect(page.locator('#hero ul li a')).toHaveCount(0);
  });

  test('positioning copy mentions SEO and Generative Engine Optimization', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('#hero').getByText(/SEO and Generative Engine Optimization/),
    ).toBeVisible();
  });
});
