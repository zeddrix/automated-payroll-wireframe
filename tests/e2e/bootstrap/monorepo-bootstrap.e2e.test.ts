import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { waitForPageLoad } from '../fixtures/test-helpers';

test.describe('Monorepo bootstrap', () => {
  test('wireframe root redirects to auth login shell', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });

  test('app shell exposes header and content region', async ({ page }) => {
    await page.goto('/auth/login');
    await waitForPageLoad(page);
    await expect(page.locator(`[data-testid="${selectors.appHeader}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.contentRegion}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.moduleTabs}"]`)).toBeVisible();
  });

  test('signed-out badge shows on initial load', async ({ page }) => {
    await page.goto('/admin/overview');
    await waitForPageLoad(page);
    const badge = page.locator(`[data-testid="${selectors.authStatusBadge}"]`);
    await expect(badge).toContainText('Signed out');
  });
});
