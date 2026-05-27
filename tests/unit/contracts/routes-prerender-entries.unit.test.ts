import { describe, expect, it } from 'vitest';
import { listModuleTabPrerenderEntries, MODULES } from '@aps/contracts';

describe('contracts/routes prerender entries', () => {
  it('lists every module tab for static prerender', () => {
    const expectedCount = MODULES.reduce((sum, mod) => sum + mod.tabs.length, 0);
    const entries = listModuleTabPrerenderEntries();

    expect(entries).toHaveLength(expectedCount);
    expect(entries).toHaveLength(19);
    expect(entries).toContainEqual({ module: 'auth', tab: 'login' });
    expect(entries).toContainEqual({ module: 'payroll', tab: 'approval' });
    expect(entries).toContainEqual({ module: 'ui-kit', tab: 'catalog' });
  });
});
