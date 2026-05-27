import { describe, expect, it } from 'vitest';
import {
  MODULES,
  defaultModuleTabPath,
  getModule,
  isModuleId,
  isTabIdForModule,
  moduleTabPath
} from '@aps/contracts';

describe('contracts/modules', () => {
  it('defines five payroll wireframe modules', () => {
    expect(MODULES).toHaveLength(5);
    expect(MODULES.map((m) => m.id)).toEqual([
      'auth',
      'admin',
      'employees',
      'attendance',
      'payroll'
    ]);
  });

  it('builds module tab paths', () => {
    expect(moduleTabPath('payroll', 'approval')).toBe('/payroll/approval');
    expect(defaultModuleTabPath('auth')).toBe('/auth/login');
  });

  it('validates module and tab ids', () => {
    expect(isModuleId('admin')).toBe(true);
    expect(isModuleId('invalid')).toBe(false);
    expect(isTabIdForModule('admin', 'overview')).toBe(true);
    expect(isTabIdForModule('admin', 'login')).toBe(false);
    expect(getModule('employees').tabs).toHaveLength(3);
  });
});
