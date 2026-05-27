import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab } from '../fixtures/test-helpers';

test.describe('Wireframe admin', () => {
  test.beforeEach(async ({ page }) => {
    await gotoModuleTab(page, 'admin', 'overview');
  });

  test('roles modal filter close audit visible', async ({ page }) => {
    const openBtn = page.locator(`[data-testid="${selectors.adminOpenRolesModal}"]`);
    await openBtn.click();
    await expect(page.locator(`[data-testid="${selectors.adminRolesModal}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.adminRolesFilter}"]`).fill('HR');
    await expect(page.locator(`[data-testid="${selectors.adminRolesTable}"]`)).toContainText(
      'HR Manager'
    );

    await page.locator(`[data-testid="${selectors.adminModalClose}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.adminRolesModal}"]`)).not.toBeVisible();
    await expect(page.locator(`[data-testid="${selectors.adminAuditSnippet}"]`)).toBeVisible();
  });

  test('admin tabs overview roles audit-log tour', async ({ page }) => {
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.moduleTab('roles')}"]`).click();
    await expect(page).toHaveURL(/\/admin\/roles/);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.moduleTab('overview')}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.adminOverviewPanel}"]`)).toBeVisible();

    await page.locator(`[data-testid="${selectors.moduleTab('audit-log')}"]`).click();
    await expect(page).toHaveURL(/\/admin\/audit-log/);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();
  });
});
