import { test, expect } from '@playwright/test';
import { selectors } from '@aps/contracts';
import { gotoModuleTab } from '../fixtures/test-helpers';

test.describe('Admin overview reference', () => {
  test.beforeEach(async ({ page }) => {
    await gotoModuleTab(page, 'admin', 'overview');
  });

  test('open roles modal, filter table, close and see audit snippet', async ({ page }) => {
    const openBtn = page.locator(`[data-testid="${selectors.adminOpenRolesModal}"]`);
    await expect(openBtn).toBeVisible();
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

  test('roles tab route shows placeholder then back to overview', async ({ page }) => {
    await page.locator(`[data-testid="${selectors.moduleTab('roles')}"]`).click();
    await expect(page).toHaveURL(/\/admin\/roles/);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();
    await page.locator(`[data-testid="${selectors.moduleTab('overview')}"]`).click();
    await expect(page.locator(`[data-testid="${selectors.adminOverviewPanel}"]`)).toBeVisible();
  });

  test('audit log tab shows placeholder with mock banner on overview only', async ({ page }) => {
    await expect(page.locator(`[data-testid="${selectors.referenceMockBanner}"]`)).toBeVisible();
    await page.locator(`[data-testid="${selectors.moduleTab('audit-log')}"]`).click();
    await expect(page).toHaveURL(/\/admin\/audit-log/);
    await expect(page.locator(`[data-testid="${selectors.wireframePlaceholder}"]`)).toBeVisible();
  });
});
