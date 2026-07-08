import { test, expect } from '@playwright/test';
import { profile } from '../../data/profile';

test.describe('Contact section', () => {
  test('email link is a mailto: to the profile address', async ({ page }) => {
    await page.goto('/#contact');

    const mailLink = page.locator(`a[href="mailto:${profile.email}"]`);
    await expect(mailLink).toHaveCount(1);
    await expect(mailLink).toBeVisible();
    await expect(mailLink).toContainText(profile.email);
  });

  test('social links have correct hrefs and open safely in a new tab', async ({ page }) => {
    await page.goto('/#contact');

    const linkedin = page.getByRole('link', { name: 'LinkedIn profile' });
    await expect(linkedin).toHaveAttribute('href', profile.linkedin);
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', /noopener/);

    const github = page.getByRole('link', { name: 'GitHub profile' });
    await expect(github).toHaveAttribute('href', profile.github);
    await expect(github).toHaveAttribute('target', '_blank');
    await expect(github).toHaveAttribute('rel', /noopener/);
  });
});
