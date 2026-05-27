import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, waitForPageLoad } from '../fixtures/test-helpers';

test.describe('Auth sign up', () => {
  test.beforeEach(async ({ page }) => {
    await gotoModuleTab(page, 'auth', 'sign-up');
  });

  test('submit stays disabled until form is valid then shows success', async ({ page }) => {
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authSignUpName}"]`).fill('Jane Doe');
    await page.locator(`[data-testid="${selectors.authSignUpEmail}"]`).fill('jane@example.com');
    await page.locator(`[data-testid="${selectors.authSignUpPassword}"]`).fill('secret1');
    await page.locator(`[data-testid="${selectors.authSignUpConfirmPassword}"]`).fill('secret1');
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authSignUpTerms}"]`).check();
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeEnabled();
    await page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authSignUpSuccess}"]`)).toBeVisible();
  });

  test('footer link navigates to login tab', async ({ page }) => {
    await page.getByRole('link', { name: 'Already have an account? Sign in' }).click();
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });
});
