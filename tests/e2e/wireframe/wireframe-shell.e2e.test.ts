import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import {
  clickBottomNav,
  clickModuleTab,
  clickSidebar,
  gotoModuleTab,
  setDesktopViewport,
  setMobileViewport
} from '../fixtures/test-helpers';

test.describe('Wireframe shell', () => {
  test('desktop: navigate auth login to employees directory placeholder', async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
    await clickSidebar(page, 'employees');
    await expect(page).toHaveURL(/\/employees\/directory/);
    await expect(
      page.locator(`[data-testid="${selectors.employeesDirectoryPanel}"]`)
    ).toBeVisible();
  });

  test('mobile: bottom nav auth to payroll approval placeholder', async ({ page }) => {
    await setMobileViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await clickBottomNav(page, 'payroll');
    await clickModuleTab(page, 'approval');
    await expect(page).toHaveURL(/\/payroll\/approval/);
    await expect(page.locator(`[data-testid="${selectors.payrollApprovalPanel}"]`)).toBeVisible();
  });

  test('admin overview reference screen loads from shell', async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'admin', 'overview');
    await expect(page.locator(`[data-testid="${selectors.adminOverviewPanel}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
  });
});
