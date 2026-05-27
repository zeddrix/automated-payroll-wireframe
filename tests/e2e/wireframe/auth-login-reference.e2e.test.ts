import { test, expect } from '@playwright/test';
import { MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD } from '@aps/mock-data';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, waitForPageLoad } from '../fixtures/test-helpers';

test.describe('Auth login reference', () => {
  test.beforeEach(async ({ page }) => {
    await gotoModuleTab(page, 'auth', 'login');
    const signOut = page.locator(`[data-testid="${selectors.authSignOut}"]`);
    if (await signOut.isVisible()) {
      await signOut.click();
    }
  });

  test('invalid submit shows error then valid credentials sign in and out', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.authLoginEmail}"]`).fill('bad');
    await page.locator(`[data-testid="${selectors.authLoginPassword}"]`).fill('short');
    await expect(page.locator(`[data-testid="${selectors.authLoginSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authLoginEmail}"]`).fill('wrong@test.com');
    await page.locator(`[data-testid="${selectors.authLoginPassword}"]`).fill('wrongpass1');
    await expect(page.locator(`[data-testid="${selectors.authLoginSubmit}"]`)).toBeEnabled();
    await page.locator(`[data-testid="${selectors.authLoginSubmit}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authLoginError}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.authLoginEmail}"]`).fill(MOCK_VALID_EMAIL);
    await page.locator(`[data-testid="${selectors.authLoginPassword}"]`).fill(MOCK_VALID_PASSWORD);
    await page.locator(`[data-testid="${selectors.authLoginSubmit}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authStatusBadge}"]`)).toContainText(
      'Signed in'
    );

    await page.locator(`[data-testid="${selectors.authSignOut}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authStatusBadge}"]`)).toContainText(
      'Signed out'
    );
  });

  test('switch to sign-up tab shows placeholder without losing shell', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await expect(page).toHaveURL(/\/auth\/sign-up/);
    await waitForPageLoad(page);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();
    await page.locator(`[data-testid="${selectors.moduleTab('login')}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });

  test('forgot password tab is reachable from login module', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('forgot-password')}"]`).click();
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();
  });
});
