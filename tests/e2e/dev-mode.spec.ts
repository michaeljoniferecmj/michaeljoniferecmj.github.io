import { test, expect } from '@playwright/test';
import { DEFAULT_VISIBLE_PER_LINE, SERVICE_LINES } from '../../data/projects';
import { CARD_SELECTOR, expandControlName, lineTotal } from './helpers';

const STORAGE_KEY = 'portfolio-mode';

/** Reads the two properties that prove the whole variable swap took effect. */
async function bodySkin(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const s = getComputedStyle(document.body);
    return { background: s.backgroundColor, font: s.fontFamily };
  });
}

test.describe('Dev Mode', () => {
  test('defaults to off, and the control says so', async ({ page }) => {
    await page.goto('/');

    // Absence, not `data-mode="default"`. The default view is the shipped
    // design; it should not need an opt-in attribute to render correctly, and
    // a static export that ships with no attribute cannot flash the wrong one.
    await expect(page.locator('html')).not.toHaveAttribute('data-mode', /.*/);

    const toggle = page.getByRole('button', { name: 'Dev mode' });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    const skin = await bodySkin(page);
    expect(skin.background).toBe('rgb(250, 250, 250)');
    expect(skin.font).toContain('Inter');
  });

  test('pressing it re-skins the whole interface, not just the button', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Dev mode' });

    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dev');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    const skin = await bodySkin(page);
    expect(skin.background).toBe('rgb(10, 14, 20)');
    expect(skin.font).toContain('monospace');

    // The swap has to reach components too, not only <body>. The project card
    // is the furthest thing from the toggle that shares the `surface` token,
    // so it is the honest end-to-end check that the variables cascade.
    const card = page.locator(CARD_SELECTOR).first();
    await expect(card).toHaveCSS('background-color', 'rgb(15, 20, 29)');

    // Squared corners are the other half of the editor read. 4px, not 0 —
    // hairline-sharp corners alias badly against the 1px borders.
    await expect(card).toHaveCSS('border-radius', '4px');
  });

  test('pressing it again returns the default view exactly', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Dev mode' });

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dev');

    await toggle.click();
    await expect(page.locator('html')).not.toHaveAttribute('data-mode', /.*/);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect((await bodySkin(page)).background).toBe('rgb(250, 250, 250)');
  });

  test('the choice survives a reload, and lands before first paint', async ({ page, context }) => {
    await context.addInitScript(
      ([key]) => {
        try {
          window.localStorage.setItem(key, 'dev');
        } catch {
          /* ignore */
        }
      },
      [STORAGE_KEY],
    );

    // `domcontentloaded`, deliberately: this asserts the blocking <head>
    // script applied the mode, NOT that a React effect got there eventually.
    // If this ever regresses to an effect, the attribute will be missing here
    // and the user will see a full-page white flash on every load.
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dev');

    // ...and the button catches up on hydration rather than reporting "off"
    // while the page is plainly dark.
    await expect(page.getByRole('button', { name: 'Dev mode' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('turning it off is persisted too, not just forgotten', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Dev mode' });

    await toggle.click();
    await toggle.click();

    expect(await page.evaluate((k) => localStorage.getItem(k), STORAGE_KEY)).toBe('default');

    await page.reload();
    await expect(page.locator('html')).not.toHaveAttribute('data-mode', /.*/);
  });

  test('the skin is presentation only — content and controls are unchanged', async ({ page }) => {
    // The failure this guards against is a "theme" that quietly swaps copy or
    // drops elements. Dev Mode is a stylesheet, and this pins that.
    await page.goto('/');
    await page.getByRole('button', { name: 'Dev mode' }).click();

    // Section kickers gain a `// ` marker from a ::before pseudo-element, so
    // the accessible/queryable text is byte-identical in both modes.
    await expect(page.getByText('Selected Works', { exact: true })).toBeVisible();

    for (const line of SERVICE_LINES) {
      const section = page.locator(`section#${line.sectionId}`);
      await expect(section).toHaveCount(1);
      await expect(page.locator(`#${line.sectionId}-heading`)).toHaveText(line.label);
      await expect(section.locator(CARD_SELECTOR)).toHaveCount(
        Math.min(DEFAULT_VISIBLE_PER_LINE, lineTotal(line)),
      );
    }

    // And the disclosure still discloses.
    const automation = SERVICE_LINES.find((l) => l.id === 'automation')!;
    await page
      .getByRole('button', { name: expandControlName(automation), exact: true })
      .click();
    await expect(page.locator(`#${automation.sectionId} ${CARD_SELECTOR}`)).toHaveCount(
      lineTotal(automation),
    );
  });

  test('mobile: the toggle fits the header without a label, and adds no page width', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'mobile-only check');
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Dev mode' });
    await expect(toggle).toBeVisible();

    // Accessible name is intact even though the word is visually collapsed —
    // getByRole above already proves that. What matters here is that adding a
    // third item to the header row did not push the page into horizontal
    // scroll, which is a hard failure on this site.
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dev');

    const after = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(after.scrollWidth).toBeLessThanOrEqual(after.clientWidth + 1);
  });
});
