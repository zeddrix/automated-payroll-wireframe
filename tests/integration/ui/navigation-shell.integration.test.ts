/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';
import { MODULES, moduleTabPath } from '@aps/contracts';

describe('navigation shell data contract', () => {
  it('builds consistent nav items for all modules', () => {
    const items = MODULES.map((mod) => ({
      id: mod.id,
      href: moduleTabPath(mod.id, mod.defaultTab)
    }));
    expect(items).toEqual([
      { id: 'auth', href: '/auth/login' },
      { id: 'admin', href: '/admin/overview' },
      { id: 'employees', href: '/employees/directory' },
      { id: 'attendance', href: '/attendance/daily-log' },
      { id: 'payroll', href: '/payroll/run-preview' }
    ]);
  });

  it('each module exposes at least three tabs', () => {
    for (const mod of MODULES) {
      expect(mod.tabs.length).toBeGreaterThanOrEqual(3);
    }
  });
});
