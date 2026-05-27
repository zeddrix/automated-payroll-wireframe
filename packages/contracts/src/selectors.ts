/** Stable data-testid values for E2E and component testId props */

export const selectors = {
  appShell: 'app-shell',
  appHeader: 'app-header',
  authStatusBadge: 'auth-status-badge',
  contentRegion: 'content-region',

  bottomNav: 'bottom-nav',
  bottomNavItem: (moduleId: string) => `bottom-nav-${moduleId}`,

  sidebarRail: 'sidebar-rail',
  sidebarItem: (moduleId: string) => `sidebar-${moduleId}`,

  moduleTabs: 'module-tabs',
  moduleTab: (tabId: string) => `module-tab-${tabId}`,

  emptyState: 'empty-state',
  loadingState: 'loading-state',
  errorState: 'error-state',

  authLoginPanel: 'auth-login-panel',
  authLoginEmail: 'auth-login-email',
  authLoginPassword: 'auth-login-password',
  authLoginSubmit: 'auth-login-submit',
  authLoginError: 'auth-login-error',
  authSignOut: 'auth-sign-out',

  authSignUpPanel: 'auth-sign-up-panel',
  authSignUpName: 'auth-sign-up-name',
  authSignUpEmail: 'auth-sign-up-email',
  authSignUpPassword: 'auth-sign-up-password',
  authSignUpConfirmPassword: 'auth-sign-up-confirm-password',
  authSignUpTerms: 'auth-sign-up-terms',
  authSignUpSubmit: 'auth-sign-up-submit',
  authSignUpSuccess: 'auth-sign-up-success',

  authForgotPanel: 'auth-forgot-panel',
  authForgotEmail: 'auth-forgot-email',
  authForgotSubmit: 'auth-forgot-submit',
  authForgotSuccess: 'auth-forgot-success',

  viewportPreviewToggle: 'viewport-preview-toggle',
  viewportPreviewMobile: 'viewport-preview-mobile',
  viewportPreviewTablet: 'viewport-preview-tablet',
  viewportPreviewDesktop: 'viewport-preview-desktop',
  viewportPreviewSystem: 'viewport-preview-system',

  adminOverviewPanel: 'admin-overview-panel',
  adminOpenRolesModal: 'admin-open-roles-modal',
  adminRolesModal: 'admin-roles-modal',
  adminRolesFilter: 'admin-roles-filter',
  adminRolesTable: 'admin-roles-table',
  adminAuditSnippet: 'admin-audit-snippet',
  adminModalClose: 'admin-modal-close',

  attendanceDailyLogPanel: 'attendance-daily-log-panel',
  employeesDirectoryPanel: 'employees-directory-panel',
  payrollApprovalPanel: 'payroll-approval-panel',

  wireframePlaceholder: 'wireframe-placeholder',
  referenceMockBanner: 'reference-mock-banner'
} as const;

export type SelectorKey = keyof typeof selectors;
