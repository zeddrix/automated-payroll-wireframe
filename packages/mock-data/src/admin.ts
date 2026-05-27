export interface MockRoleRow {
  id: string;
  name: string;
  scope: string;
}

export interface MockAuditEntry {
  id: string;
  action: string;
  actor: string;
  at: string;
}

export const MOCK_ROLES: MockRoleRow[] = [
  { id: 'r1', name: 'Payroll Admin', scope: 'Payroll' },
  { id: 'r2', name: 'HR Manager', scope: 'Employees' },
  { id: 'r3', name: 'Timekeeper', scope: 'Attendance' },
  { id: 'r4', name: 'Auditor', scope: 'Read-only' }
];

export const MOCK_AUDIT_SNIPPET: MockAuditEntry[] = [
  { id: 'a1', action: 'Role updated', actor: 'system.admin', at: '2026-05-27 09:00' },
  { id: 'a2', action: 'User invited', actor: 'hr.lead', at: '2026-05-26 14:30' }
];

export function filterMockRoles(query: string): MockRoleRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return MOCK_ROLES;
  return MOCK_ROLES.filter(
    (r) => r.name.toLowerCase().includes(q) || r.scope.toLowerCase().includes(q)
  );
}
