import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import {
  getElementBox,
  gotoModuleTab,
  selectDevicePreview,
  setDesktopViewport
} from '../fixtures/test-helpers';

test.describe('Device preview tabbar', () => {
  test.beforeEach(async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
  });

  test('desktop browser mobile preview shrinks auth card inside frame', async ({ page }) => {
    await selectDevicePreview(page, 'mobile');
    await page.locator(`[data-testid="${selectors.authLoginEmail}"]`).focus();

    const card = await getElementBox(page, selectors.authLoginCard);
    expect(card.width).toBeGreaterThan(280);
    expect(card.width).toBeLessThan(400);
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.bottomNav}"]`)).toBeHidden();
  });

  test('tablet preview mode tour then system', async ({ page }) => {
    await selectDevicePreview(page, 'tablet');
    await expect(
      page.locator(`[data-testid="${selectors.devicePreviewFrameScreen}"]`)
    ).toBeVisible();

    await selectDevicePreview(page, 'system');
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'system'
    );
    await expect(
      page.locator(`[data-testid="${selectors.devicePreviewFrameScreen}"]`)
    ).toBeVisible();
  });

  test('device preview mode tour mobile desktop system', async ({ page }) => {
    await selectDevicePreview(page, 'mobile');
    await page.locator(`[data-testid="${selectors.authLoginPassword}"]`).focus();
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'mobile'
    );

    await selectDevicePreview(page, 'desktop');
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'desktop'
    );
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeVisible();

    await selectDevicePreview(page, 'system');
    await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
      'data-device-mode',
      'system'
    );
  });
});
