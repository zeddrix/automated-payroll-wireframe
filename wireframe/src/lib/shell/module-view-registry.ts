import type { Component } from 'svelte';
import { selectors, type ModuleId, type TabId } from '@aps/contracts';
import AuthLoginView from '../modules/auth/AuthLoginView.svelte';
import AdminOverviewView from '../modules/admin/AdminOverviewView.svelte';
import PlaceholderView from '../modules/shared/PlaceholderView.svelte';

type ViewKey = `${ModuleId}:${TabId}`;

const REFERENCE_VIEWS: Partial<Record<ViewKey, Component>> = {
  'auth:login': AuthLoginView,
  'admin:overview': AdminOverviewView
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
