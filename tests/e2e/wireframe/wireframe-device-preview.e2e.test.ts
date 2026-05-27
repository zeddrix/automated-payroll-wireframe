import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab, setDesktopViewport } from '../fixtures/test-helpers';

test.describe('Device preview tabbar', () => {
  test.beforeEach(async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
  });

  test('device preview mode tour mobile desktop system', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.devicePreviewMobile}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'mobile'
    );
    await expect(
      page.locator(`[data-testid="${selectors.devicePreviewFrameScreen}"]`)
    ).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.bottomNav}"]`)).toBeHidden();

    await page.locator(`[data-testid="${selectors.devicePreviewDesktop}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'desktop'
    );
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.devicePreviewSystem}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'system'
    );
  });
});
