import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, setDesktopViewport } from '../fixtures/test-helpers';

test.describe('Viewport preview toggle', () => {
  test.beforeEach(async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
  });

  test('mobile preview shows bottom nav and hides sidebar at desktop browser width', async ({
    page
  }) => {
    await page.locator(`[data-testid="${selectors.viewportPreviewMobile}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.appShell}"]`)).toHaveAttribute(
      'data-viewport-preview',
      'mobile'
    );
    await expect(page.locator(`[data-testid="${selectors.bottomNav}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeHidden();
  });

  test('desktop preview shows sidebar and hides bottom nav', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.viewportPreviewMobile}"]`).click();
    await page.locator(`[data-testid="${selectors.viewportPreviewDesktop}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.appShell}"]`)).toHaveAttribute(
      'data-viewport-preview',
      'desktop'
    );
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.bottomNav}"]`)).toBeHidden();
  });

  test('system preview restores responsive behavior', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.viewportPreviewMobile}"]`).click();
    await page.locator(`[data-testid="${selectors.viewportPreviewSystem}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.appShell}"]`)).toHaveAttribute(
      'data-viewport-preview',
      'system'
    );
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeVisible();
  });
});
