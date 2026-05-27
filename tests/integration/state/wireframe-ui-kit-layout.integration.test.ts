/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { uiKitLayout } from '../../../wireframe/src/lib/state/wireframe-ui-kit-layout.svelte';

describe('wireframe ui kit layout state', () => {
  beforeEach(() => {
    sessionStorage.clear();
    uiKitLayout.setMode('tabs');
  });

  it('defaults to tabs when storage is empty', () => {
    uiKitLayout.init();
    expect(uiKitLayout.mode).toBe('tabs');
  });

  it('persists scroll mode in sessionStorage', () => {
    uiKitLayout.setMode('scroll');
    expect(uiKitLayout.mode).toBe('scroll');
    expect(sessionStorage.getItem('wireframe-ui-kit-layout')).toBe('scroll');
    uiKitLayout.init();
    expect(uiKitLayout.mode).toBe('scroll');
  });
});
