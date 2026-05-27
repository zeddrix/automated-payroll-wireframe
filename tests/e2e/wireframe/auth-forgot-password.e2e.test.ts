import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, waitForPageLoad } from '../fixtures/test-helpers';

test.describe('Auth forgot password', () => {
  test.beforeEach(async ({ page }) => {
    await gotoModuleTab(page, 'auth', 'forgot-password');
  });

  test('invalid email keeps submit disabled then success after valid submit', async ({ page }) => {
    await expect(page.locator(`[data-testid="${selectors.authForgotSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authForgotEmail}"]`).fill('bad');
    await expect(page.locator(`[data-testid="${selectors.authForgotSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authForgotEmail}"]`).fill('user@example.com');
    await expect(page.locator(`[data-testid="${selectors.authForgotSubmit}"]`)).toBeEnabled();
    await page.locator(`[data-testid="${selectors.authForgotSubmit}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authForgotSuccess}"]`)).toBeVisible();
  });

  test('back to login link returns to login panel', async ({ page }) => {
    await page.getByRole('link', { name: 'Back to login' }).click();
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });
});
