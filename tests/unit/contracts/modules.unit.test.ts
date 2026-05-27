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
  it('defines six payroll wireframe modules', () => {
    expect(MODULES).toHaveLength(6);
    expect(MODULES.map((m) => m.id)).toEqual([
      'auth',
      'admin',
      'employees',
      'attendance',
      'payroll',
      'ui-kit'
    ]);
  });

  it('builds module tab paths', () => {
    expect(moduleTabPath('payroll', 'approval')).toBe('/payroll/approval');
    expect(moduleTabPath('ui-kit', 'tokens')).toBe('/ui-kit/tokens');
    expect(defaultModuleTabPath('auth')).toBe('/auth/login');
  });

  it('validates module and tab ids', () => {
    expect(isModuleId('admin')).toBe(true);
    expect(isModuleId('invalid')).toBe(false);
    expect(isTabIdForModule('admin', 'overview')).toBe(true);
    expect(isTabIdForModule('admin', 'login')).toBe(false);
    expect(isTabIdForModule('ui-kit', 'tokens')).toBe(true);
    expect(getModule('employees').tabs).toHaveLength(3);
  });
});
