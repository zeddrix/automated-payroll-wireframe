import type { Component } from 'svelte';
import { selectors, type ModuleId, type TabId } from '@aps/contracts';
import AuthLoginView from '../modules/auth/AuthLoginView.svelte';
import AuthSignUpView from '../modules/auth/AuthSignUpView.svelte';
import AuthForgotPasswordView from '../modules/auth/AuthForgotPasswordView.svelte';
import AdminOverviewView from '../modules/admin/AdminOverviewView.svelte';
import UiKitTokensView from '../modules/ui-kit/UiKitTokensView.svelte';
import UiKitLowFiView from '../modules/ui-kit/UiKitLowFiView.svelte';
import UiKitHiFiView from '../modules/ui-kit/UiKitHiFiView.svelte';
import UiKitNavigationView from '../modules/ui-kit/UiKitNavigationView.svelte';
import UiKitCatalogView from '../modules/ui-kit/UiKitCatalogView.svelte';
import PlaceholderView from '../modules/shared/PlaceholderView.svelte';

type ViewKey = `${ModuleId}:${TabId}`;

const REFERENCE_VIEWS: Partial<Record<ViewKey, Component>> = {
  'auth:login': AuthLoginView,
  'auth:sign-up': AuthSignUpView,
  'auth:forgot-password': AuthForgotPasswordView,
  'admin:overview': AdminOverviewView,
  'ui-kit:tokens': UiKitTokensView,
  'ui-kit:low-fi': UiKitLowFiView,
  'ui-kit:hi-fi': UiKitHiFiView,
  'ui-kit:navigation': UiKitNavigationView,
  'ui-kit:catalog': UiKitCatalogView
};

const PLACEHOLDER_TEST_IDS: Partial<Record<ViewKey, string>> = {
  'attendance:daily-log': selectors.attendanceDailyLogPanel,
  'employees:directory': selectors.employeesDirectoryPanel,
  'payroll:approval': selectors.payrollApprovalPanel
};

export interface ResolvedView {
  component: Component;
  placeholderTestId?: string;
  placeholderTitle?: string;
}

export function resolveModuleView(moduleId: ModuleId, tabId: TabId): ResolvedView {
  const key = `${moduleId}:${tabId}` as ViewKey;
  const reference = REFERENCE_VIEWS[key];
  if (reference) {
    return { component: reference };
  }

  const mod = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
  const tabLabel = tabId.replace(/-/g, ' ');

  return {
    component: PlaceholderView,
    placeholderTestId: PLACEHOLDER_TEST_IDS[key],
    placeholderTitle: `${mod} — ${tabLabel}`
  };
}
