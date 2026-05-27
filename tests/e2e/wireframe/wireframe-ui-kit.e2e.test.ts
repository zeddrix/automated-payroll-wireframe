import { expect, test } from '@playwright/test';
import { selectors } from '@aps/contracts';
import {
  clickModuleTab,
  clickSidebar,
  gotoModuleTab,
  resetWireframeSession,
  setDesktopViewport
} from '../fixtures/test-helpers';

test.describe('UI Kit module', () => {
  test.beforeEach(async ({ page }) => {
    await resetWireframeSession(page);
    await setDesktopViewport(page);
  });

  test('opens from sidebar and lands on tokens tab', async ({ page }) => {
    await gotoModuleTab(page, 'auth', 'login');
    await clickSidebar(page, 'ui-kit');
    await expect(page).toHaveURL(/\/ui-kit\/tokens/);
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toBeVisible();
  });

  test('tabbed mode switches to low-fi section', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await clickModuleTab(page, 'low-fi');
    await expect(page).toHaveURL(/\/ui-kit\/low-fi/);
    await expect(page.locator(`[data-testid="${selectors.uiKitLowFiSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toHaveCount(0);
  });

  test('scroll mode hides module tabs and renders full catalog', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await page.locator(`[data-testid="${selectors.uiKitLayoutScroll}"]`).click();
    await expect(page).toHaveURL(/\/ui-kit\/catalog/);
    await expect(page.locator(`[data-testid="${selectors.moduleTab('tokens')}"]`)).toHaveCount(0);
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitLowFiSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitHiFiSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitNavigationSection}"]`)).toBeVisible();
  });

  test('scroll mode persists after reload', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await page.locator(`[data-testid="${selectors.uiKitLayoutScroll}"]`).click();
    await expect(page).toHaveURL(/\/ui-kit\/catalog/);
    await page.reload();
    await expect(page).toHaveURL(/\/ui-kit\/catalog/);
    await expect(page.locator(`[data-testid="${selectors.uiKitLayoutScroll}"]`)).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  test('switching back to tabbed mode returns to tokens', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await page.locator(`[data-testid="${selectors.uiKitLayoutScroll}"]`).click();
    await expect(page).toHaveURL(/\/ui-kit\/catalog/);
    await page.locator(`[data-testid="${selectors.uiKitLayoutTabs}"]`).click();
    await expect(page).toHaveURL(/\/ui-kit\/tokens/);
    await expect(page.locator(`[data-testid="${selectors.moduleTabs}"]`)).toBeVisible();
  });
});
