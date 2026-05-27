import { expect, test } from '@playwright/test';
import { selectors } from '@aps/contracts';
import {
  clickModuleTab,
  clickSidebar,
  gotoModuleTab,
  resetWireframeSession,
  setDesktopViewport,
  setMobileViewport
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

  test('tabbed mode switches to components section', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await clickModuleTab(page, 'components');
    await expect(page).toHaveURL(/\/ui-kit\/components/);
    await expect(page.locator(`[data-testid="${selectors.uiKitComponentsSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toHaveCount(0);
  });

  test('switching tabs changes section and URL', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await clickModuleTab(page, 'components');
    await expect(page).toHaveURL(/\/ui-kit\/components/);
    await expect(page.locator(`[data-testid="${selectors.uiKitComponentsSection}"]`)).toBeVisible();
    await clickModuleTab(page, 'tokens');
    await expect(page).toHaveURL(/\/ui-kit\/tokens/);
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitComponentsSection}"]`)).toHaveCount(
      0
    );
  });

  test('tokens tab shows production theme swatches', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toBeVisible();
    await expect(
      page.locator(`[data-testid="${selectors.uiKitColorSwatch('Blue theme-primary')}"]`)
    ).toBeVisible();
    await expect(page.getByText('Low-fi', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Hi-fi', { exact: true })).toHaveCount(0);
  });

  test('scroll mode hides module tabs and renders full catalog', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await page.locator(`[data-testid="${selectors.uiKitLayoutScroll}"]`).click();
    await expect(page).toHaveURL(/\/ui-kit\/catalog/);
    await expect(page.locator(`[data-testid="${selectors.moduleTab('tokens')}"]`)).toHaveCount(0);
    await expect(page.locator(`[data-testid="${selectors.uiKitTokensSection}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.uiKitComponentsSection}"]`)).toBeVisible();
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

  test('mobile viewport components button row stacks', async ({ page }) => {
    await setMobileViewport(page);
    await gotoModuleTab(page, 'ui-kit', 'components');
    await page.locator(`[data-testid="${selectors.uiKitButtonPrimary}"]`).scrollIntoViewIfNeeded();
    await page.locator(`[data-testid="${selectors.uiKitButtonPrimary}"]`).click();

    const primary = await page
      .locator(`[data-testid="${selectors.uiKitButtonPrimary}"]`)
      .boundingBox();
    const ghost = await page.locator(`[data-testid="${selectors.uiKitButtonGhost}"]`).boundingBox();
    const disabled = await page
      .locator(`[data-testid="${selectors.uiKitButtonDisabled}"]`)
      .boundingBox();

    expect(primary).not.toBeNull();
    expect(ghost).not.toBeNull();
    expect(disabled).not.toBeNull();
    if (!primary || !ghost || !disabled) {
      throw new Error('Expected button bounding boxes');
    }
    expect(ghost.y).toBeGreaterThan(primary.y);
    expect(disabled.y).toBeGreaterThan(ghost.y);
  });

  test('catalog scroll mode includes responsive rules section', async ({ page }) => {
    await gotoModuleTab(page, 'ui-kit', 'tokens');
    await page.locator(`[data-testid="${selectors.uiKitLayoutScroll}"]`).click();
    await expect(page).toHaveURL(/\/ui-kit\/catalog/);
    await page
      .locator(`[data-testid="${selectors.uiKitResponsiveSection}"]`)
      .scrollIntoViewIfNeeded();
    await expect(page.locator(`[data-testid="${selectors.uiKitResponsiveSection}"]`)).toBeVisible();
    await expect(
      page.getByText('Device preview resizes content inside the frame only')
    ).toBeVisible();
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
