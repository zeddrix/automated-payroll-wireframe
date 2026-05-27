import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import {
  clickBottomNav,
  clickModuleTab,
  clickSidebar,
  gotoModuleTab,
  setDesktopViewport,
  setMobileViewport,
  waitForPageLoad
} from '../fixtures/test-helpers';

test.describe('Navigation contract', () => {
  test('mobile: bottom nav payroll then approval tab updates route', async ({ page }) => {
    await setMobileViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await clickBottomNav(page, 'payroll');
    await expect(page).toHaveURL(/\/payroll\/run-preview/);
    await clickModuleTab(page, 'approval');
    await expect(page).toHaveURL(/\/payroll\/approval/);
    await expect(page.locator(`[data-testid="${selectors.moduleTab('approval')}"]`)).toHaveClass(
      /active/
    );
  });

  test('desktop: sidebar attendance then daily log shows placeholder panel', async ({ page }) => {
    await setDesktopViewport(page);
    await gotoModuleTab(page, 'auth', 'login');
    await clickSidebar(page, 'attendance');
    await expect(page).toHaveURL(/\/attendance\/daily-log/);
    await expect(
      page.locator(`[data-testid="${selectors.attendanceDailyLogPanel}"]`)
    ).toBeVisible();
  });

  test('module tabs stay active across employees directory to profile', async ({ page }) => {
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
