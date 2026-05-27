/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';
import { hifiBlue } from '@aps/ui';
import { resolveModuleView } from '../../../wireframe/src/lib/shell/module-view-registry';
import PlaceholderView from '../../../wireframe/src/lib/modules/shared/PlaceholderView.svelte';

describe('HiFi auth wiring', () => {
  it('exports blue theme tokens', () => {
    expect(hifiBlue.colors.primary).toBe('#2563eb');
    expect(hifiBlue.colors.primarySoft).toBe('#dbeafe');
  });

  it('resolves all auth tabs to reference views', () => {
    const tabs = ['login', 'sign-up', 'forgot-password'] as const;
    for (const tabId of tabs) {
      const { component } = resolveModuleView('auth', tabId);
      expect(component).not.toBe(PlaceholderView);
    }
  });
});
