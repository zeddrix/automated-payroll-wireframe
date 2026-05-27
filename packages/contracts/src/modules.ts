export type ModuleId = 'auth' | 'admin' | 'employees' | 'attendance' | 'payroll' | 'ui-kit';

export type TabId =
  | 'login'
  | 'sign-up'
  | 'forgot-password'
  | 'overview'
  | 'roles'
  | 'audit-log'
  | 'directory'
  | 'profile'
  | 'onboarding'
  | 'daily-log'
  | 'exceptions'
  | 'import-review'
  | 'run-preview'
  | 'adjustments'
  | 'approval'
  | 'tokens'
  | 'low-fi'
  | 'hi-fi'
  | 'navigation'
  | 'catalog';

export interface ModuleTabDefinition {
  id: TabId;
  label: string;
}

export interface ModuleDefinition {
  id: ModuleId;
  label: string;
  tabs: ModuleTabDefinition[];
  defaultTab: TabId;
}

export const MODULES: ModuleDefinition[] = [
  {
    id: 'auth',
    label: 'Auth',
    defaultTab: 'login',
    tabs: [
      { id: 'login', label: 'Login' },
      { id: 'sign-up', label: 'Sign Up' },
      { id: 'forgot-password', label: 'Forgot Password' }
    ]
  },
  {
    id: 'admin',
    label: 'Admin',
    defaultTab: 'overview',
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'roles', label: 'Roles' },
      { id: 'audit-log', label: 'Audit Log' }
    ]
  },
  {
    id: 'employees',
    label: 'Employees',
    defaultTab: 'directory',
    tabs: [
      { id: 'directory', label: 'Directory' },
      { id: 'profile', label: 'Profile' },
      { id: 'onboarding', label: 'Onboarding' }
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    defaultTab: 'daily-log',
    tabs: [
      { id: 'daily-log', label: 'Daily Log' },
      { id: 'exceptions', label: 'Exceptions' },
      { id: 'import-review', label: 'Import Review' }
    ]
  },
  {
    id: 'payroll',
    label: 'Payroll',
    defaultTab: 'run-preview',
    tabs: [
      { id: 'run-preview', label: 'Run Preview' },
      { id: 'adjustments', label: 'Adjustments' },
      { id: 'approval', label: 'Approval' }
    ]
  },
  {
    id: 'ui-kit',
    label: 'UI Kit',
    defaultTab: 'tokens',
    tabs: [
      { id: 'tokens', label: 'Tokens' },
      { id: 'low-fi', label: 'Low-fi' },
      { id: 'hi-fi', label: 'Hi-fi' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'catalog', label: 'Catalog' }
    ]
  }
];

export function getModule(moduleId: ModuleId): ModuleDefinition {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) {
    throw new Error(`Unknown module: ${moduleId}`);
  }
  return mod;
}

export function isModuleId(value: string): value is ModuleId {
  return MODULES.some((m) => m.id === value);
}

export function isTabIdForModule(moduleId: ModuleId, tabId: string): tabId is TabId {
  const mod = getModule(moduleId);
  return mod.tabs.some((t) => t.id === tabId);
}
