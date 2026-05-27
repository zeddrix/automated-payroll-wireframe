import { type Page, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';

export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator(`[data-testid="${selectors.appShell}"]`)).toBeVisible();
  await expect(
    page.locator(`[data-testid="${selectors.appShell}"][data-client-ready="true"]`)
  ).toBeVisible({ timeout: 15000 });
}

export async function setMobileViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 390, height: 844 });
}

export async function setDesktopViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 1280, height: 800 });
}

export async function setTabletViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 768, height: 1024 });
}

export type DevicePreviewMode = 'mobile' | 'tablet' | 'desktop' | 'system';

const devicePreviewSelectorByMode: Record<DevicePreviewMode, string> = {
  mobile: selectors.devicePreviewMobile,
  tablet: selectors.devicePreviewTablet,
  desktop: selectors.devicePreviewDesktop,
  system: selectors.devicePreviewSystem
};

export async function selectDevicePreview(page: Page, mode: DevicePreviewMode): Promise<void> {
  await page.locator(`[data-testid="${devicePreviewSelectorByMode[mode]}"]`).click();
  await expect(page.locator(`[data-testid="${selectors.devicePreviewFrame}"]`)).toHaveAttribute(
    'data-device-mode',
    mode
  );
}

export async function getElementBox(
  page: Page,
  testId: string
): Promise<{ width: number; height: number; x: number; y: number }> {
  const box = await page.locator(`[data-testid="${testId}"]`).boundingBox();
  if (!box) {
    throw new Error(`Element [data-testid="${testId}"] has no bounding box`);
  }
  return box;
}

export async function gotoModuleTab(page: Page, moduleId: string, tabId: string): Promise<void> {
  await page.goto(`/${moduleId}/${tabId}`);
  await waitForPageLoad(page);
}

export async function clickBottomNav(page: Page, moduleId: string): Promise<void> {
  await page.locator(`[data-testid="${selectors.bottomNavItem(moduleId)}"]`).click();
}

export async function clickSidebar(page: Page, moduleId: string): Promise<void> {
  await page.locator(`[data-testid="${selectors.sidebarItem(moduleId)}"]`).click();
}

export async function clickModuleTab(page: Page, tabId: string): Promise<void> {
  await page.locator(`[data-testid="${selectors.moduleTab(tabId)}"]`).click();
}

export async function resetWireframeSession(page: Page): Promise<void> {
  await page.goto('/auth/login');
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}
