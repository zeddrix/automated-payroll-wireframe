import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import {
  clickBottomNav,
  clickModuleTab,
  clickSidebar,
  getElementBox,
  gotoModuleTab,
  resetWireframeSession,
  setDesktopViewport,
  setMobileViewport,
  waitForPageLoad
} from '../fixtures/test-helpers';

test.describe('Wireframe shell and navigation', () => {
  test('bootstrap redirect then sidebar navigation to employees', async ({ page }) => {
    await setDesktopViewport(page);
    await page.goto('/');
    await waitForPageLoad(page);
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.appHeader}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.authStatusBadge}"]`)).toContainText(
      'Signed out'
    );

    await clickSidebar(page, 'employees');
    await expect(page).toHaveURL(/\/employees\/directory/);
    await expect(
      page.locator(`[data-testid="${selectors.employeesDirectoryPanel}"]`)
    ).toBeVisible();
  });

  test('mobile viewport login card uses narrow layout', async ({ page }) => {
    await setMobileViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await expect(page.locator(`[data-testid="${selectors.authLoginPanel}"]`)).toBeVisible();

    const card = await getElementBox(page, selectors.authLoginCard);
    expect(card.width).toBeLessThanOrEqual(390);

    await expect(page.locator(`[data-testid="${selectors.bottomNav}"]`)).toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.sidebarRail}"]`)).toBeHidden();
  });

  test('mobile bottom nav payroll run-preview then approval panel', async ({ page }) => {
    await setMobileViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await clickBottomNav(page, 'payroll');
    await expect(page).toHaveURL(/\/payroll\/run-preview/);
    await clickModuleTab(page, 'approval');
    await expect(page).toHaveURL(/\/payroll\/approval/);
    await expect(page.locator(`[data-testid="${selectors.payrollApprovalPanel}"]`)).toBeVisible();
  });

  test('desktop sidebar attendance then daily log shows placeholder panel', async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await clickSidebar(page, 'attendance');
    await expect(page).toHaveURL(/\/attendance\/daily-log/);
    await expect(
      page.locator(`[data-testid="${selectors.attendanceDailyLogPanel}"]`)
    ).toBeVisible();
  });

  test('shell header never shows lo-fi or hi-fi language', async ({ page }) => {
    await resetWireframeSession(page);
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    const phase = page.locator('.shell__phase');
    await expect(phase).toBeVisible();
    await expect(phase).not.toContainText(/lo-?fi/i);
    await expect(phase).not.toContainText(/hi-?fi/i);
    await clickSidebar(page, 'admin');
    await expect(page).toHaveURL(/\/admin\/overview/);
    await expect(phase).not.toContainText(/lo-?fi/i);
    await expect(phase).not.toContainText(/hi-?fi/i);
  });

  test('admin roles tab navigates to placeholder panel', async ({ page }) => {
    await resetWireframeSession(page);
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'admin', 'overview');
    await clickModuleTab(page, 'roles');
    await expect(page).toHaveURL(/\/admin\/roles/);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();
  });

  test('employees directory profile onboarding tab tour', async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'employees', 'directory');
    await clickModuleTab(page, 'profile');
    await expect(page).toHaveURL(/\/employees\/profile/);
    await expect(page.locator(`[data-testid="${selectors.moduleTab('profile')}"]`)).toHaveClass(
      /active/
    );
    await clickModuleTab(page, 'onboarding');
    await expect(page).toHaveURL(/\/employees\/onboarding/);
    await waitForPageLoad(page);
    await expect(page.locator(`[data-testid="${selectors.contentRegion}"]`)).toBeVisible();
  });
});
