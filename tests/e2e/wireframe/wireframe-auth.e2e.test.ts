import { test, expect } from '@playwright/test';
import { MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD, SIGNUP_VALID_PASSWORD } from '@aps/mock-data';
import { selectors } from '@aps/contracts';
import { resetWireframeSession, waitForPageLoad } from '../fixtures/test-helpers';

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
    await page
      .locator(`[data-testid="${selectors.authSignUpPassword}"]`)
      .fill(SIGNUP_VALID_PASSWORD);
    await page
      .locator(`[data-testid="${selectors.authSignUpConfirmPassword}"]`)
      .fill(SIGNUP_VALID_PASSWORD);
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

  test('sign-up password checklist updates while typing', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await waitForPageLoad(page);

    const password = page.locator(`[data-testid="${selectors.authSignUpPassword}"]`);
    await password.focus();
    await password.fill('Sec');
    await expect(
      page.locator(`[data-testid="${selectors.authSignUpPasswordRequirements}"]`)
    ).toBeVisible();
    await expect(
      page.locator(`[data-testid="${selectors.passwordRequirement('minLength')}"]`)
    ).toHaveAttribute('data-met', 'false');

    await password.fill(SIGNUP_VALID_PASSWORD);
    for (const ruleId of ['minLength', 'hasLetter', 'hasNumber', 'hasSpecial'] as const) {
      await expect(
        page.locator(`[data-testid="${selectors.passwordRequirement(ruleId)}"]`)
      ).toHaveAttribute('data-met', 'true');
    }
  });

  test('sign-up submit disabled until policy met', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await waitForPageLoad(page);

    await page.locator(`[data-testid="${selectors.authSignUpName}"]`).fill('Jane Doe');
    await page.locator(`[data-testid="${selectors.authSignUpEmail}"]`).fill('jane@example.com');
    await page.locator(`[data-testid="${selectors.authSignUpPassword}"]`).fill('secret1');
    await page.locator(`[data-testid="${selectors.authSignUpConfirmPassword}"]`).fill('secret1');
    await page.locator(`[data-testid="${selectors.authSignUpTerms}"]`).check();
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeDisabled();

    await page
      .locator(`[data-testid="${selectors.authSignUpPassword}"]`)
      .fill(SIGNUP_VALID_PASSWORD);
    await page
      .locator(`[data-testid="${selectors.authSignUpConfirmPassword}"]`)
      .fill(SIGNUP_VALID_PASSWORD);
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeEnabled();
  });

  test('login password visibility toggle reveals and hides value', async ({ page }) => {
    const password = page.locator(`[data-testid="${selectors.authLoginPassword}"]`);
    const toggle = page.locator(
      `[data-testid="${selectors.fieldVisibilityToggle(selectors.authLoginPassword)}"]`
    );

    await password.fill(MOCK_VALID_PASSWORD);
    await expect(password).toHaveAttribute('type', 'password');

    await toggle.click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(password).toHaveValue(MOCK_VALID_PASSWORD);

    await toggle.click();
    await expect(password).toHaveAttribute('type', 'password');
    await expect(password).toHaveValue(MOCK_VALID_PASSWORD);
  });

  test('sign-up password fields toggle visibility independently', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await waitForPageLoad(page);

    const password = page.locator(`[data-testid="${selectors.authSignUpPassword}"]`);
    const confirm = page.locator(`[data-testid="${selectors.authSignUpConfirmPassword}"]`);
    const passwordToggle = page.locator(
      `[data-testid="${selectors.fieldVisibilityToggle(selectors.authSignUpPassword)}"]`
    );
    const confirmToggle = page.locator(
      `[data-testid="${selectors.fieldVisibilityToggle(selectors.authSignUpConfirmPassword)}"]`
    );

    await password.fill(SIGNUP_VALID_PASSWORD);
    await confirm.fill(SIGNUP_VALID_PASSWORD);
    await passwordToggle.click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(confirm).toHaveAttribute('type', 'password');

    await confirmToggle.click();
    await expect(confirm).toHaveAttribute('type', 'text');
    await expect(confirm).toHaveValue(SIGNUP_VALID_PASSWORD);
  });

  test('sign-up blur shows email error', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('sign-up')}"]`).click();
    await waitForPageLoad(page);

    const email = page.locator(`[data-testid="${selectors.authSignUpEmail}"]`);
    await email.fill('not-an-email');
    await email.blur();
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#signup-email-error')).toContainText('Enter a valid email address');
    await expect(page.locator(`[data-testid="${selectors.authSignUpSubmit}"]`)).toBeDisabled();
  });
});
