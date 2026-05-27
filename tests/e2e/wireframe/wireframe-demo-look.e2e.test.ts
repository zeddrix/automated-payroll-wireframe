import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, resetWireframeSession } from '../fixtures/test-helpers';

test.describe('Demo look toggle', () => {
  test.beforeEach(async ({ page }) => {
    await resetWireframeSession(page);
    await gotoModuleTab(page, 'auth', 'login');
    await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).check();
  });

  test('demo look toggles auth copy and persists', async ({ page }) => {
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.authLoginDemoHint}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.authLoginSubtitle}"]`)).toContainText(
      'reference pattern'
    );

    await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).uncheck();
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeHidden();
    await expect(page.locator(`[data-testid="${selectors.authLoginDemoHint}"]`)).toBeHidden();
    await expect(page.locator(`[data-testid="${selectors.authLoginSubtitle}"]`)).toContainText(
      'Sign in to your account'
    );

    await page.reload();
    await expect(page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`)).not.toBeChecked();
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeHidden();

    await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).check();
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.authLoginDemoHint}"]`)).toBeVisible();
  });

  test('demo look toggles admin banner', async ({ page }) => {
    await gotoModuleTab(page, 'admin', 'overview');
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).uncheck();
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeHidden();

    await page.locator(`[data-testid="${selectors.demoLookCheckbox}"]`).check();
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
  });
});
