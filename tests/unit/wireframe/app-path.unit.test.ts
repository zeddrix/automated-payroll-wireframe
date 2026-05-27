import { describe, expect, it } from 'vitest';
import { appPath, joinAppPath } from '../../../wireframe/src/lib/app-path';

describe('wireframe/app-path', () => {
  it('prefixes route paths with the app base', () => {
    expect(joinAppPath('/auth/login', '')).toBe('/auth/login');
    expect(joinAppPath('/auth/login', '/automated-payroll-wireframe')).toBe(
      '/automated-payroll-wireframe/auth/login'
    );
  });

  it('rejects paths without a leading slash', () => {
    expect(() => joinAppPath('auth/login', '')).toThrow(/must start with \//);
  });

  it('appPath uses the configured base in tests', () => {
    expect(appPath('/auth/login')).toBe('/auth/login');
  });
});
