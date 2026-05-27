import { test, expect } from '@playwright/test';
import { MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD } from '@aps/mock-data';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, resetWireframeSession, waitForPageLoad } from '../fixtures/test-helpers';

test.describe('Wireframe auth', () => {
  test.beforeEach(async ({ page }) => {
    await resetWireframeSession(page);
    await waitForPageLoad(page);
    const signOut = page.locator(`[data-testid="${selectors.authSignOut}"]`);
    if (await signOut.isVisible()) {
      await signOut.click();
    }
  });

  test('login invalid then valid sign-in sign-out', async ({ page }) => {
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

  test('auth module tab tour login sign-up forgot round trip', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await expect(page).toHaveURL(/\/auth\/sign-up/);
    await waitForPageLoad(page);
    await expect(page.locator(`[data-testid="${selectors.authSignUpPanel}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.moduleTab('forgot-password')}"]`).click();
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
    await expect(page.locator(`[data-testid="${selectors.authForgotPanel}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.moduleTab('login')}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });

  test('sign-up validation success then footer to login', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await waitForPageLoad(page);
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authSignUpName}"]`).fill('Jane Doe');
    await page.locator(`[data-testid="${selectors.authSignUpEmail}"]`).fill('jane@example.com');
    await page.locator(`[data-testid="${selectors.authSignUpPassword}"]`).fill('secret1');
    await page.locator(`[data-testid="${selectors.authSignUpConfirmPassword}"]`).fill('secret1');
    await page.locator(`[data-testid="${selectors.authSignUpTerms}"]`).check();
    await page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authSignUpSuccess}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.authFooterLinkLogin}"]`).click();
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });

  test('forgot password validation success then footer to login', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('forgot-password')}"]`).click();
    await waitForPageLoad(page);
    await expect(page.locator(`[data-testid="${selectors.authForgotSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authForgotEmail}"]`).fill('bad');
    await expect(page.locator(`[data-testid="${selectors.authForgotSubmit}"]`)).toBeDisabled();

    await page.locator(`[data-testid="${selectors.authForgotEmail}"]`).fill('user@example.com');
    await page.locator(`[data-testid="${selectors.authForgotSubmit}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.authForgotSuccess}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.authFooterLinkLogin}"]`).click();
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
  });
});
