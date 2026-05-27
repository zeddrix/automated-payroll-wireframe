/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, beforeEach } from 'vitest';
import { demoLook } from '../../../wireframe/src/lib/state/wireframe-demo-look.svelte';

describe('wireframe demo look state', () => {
  beforeEach(() => {
    sessionStorage.clear();
    demoLook.setEnabled(true);
  });

  it('defaults to enabled when storage is empty', () => {
    demoLook.init();
    expect(demoLook.enabled).toBe(true);
  });

  it('persists disabled state in sessionStorage', () => {
    demoLook.setEnabled(false);
    expect(demoLook.enabled).toBe(false);
    expect(sessionStorage.getItem('wireframe-demo-look')).toBe('false');
    demoLook.init();
    expect(demoLook.enabled).toBe(false);
  });

  it('re-enabling updates enabled for reactive readers', () => {
    demoLook.setEnabled(false);
    expect(demoLook.enabled).toBe(false);
    demoLook.setEnabled(true);
    expect(demoLook.enabled).toBe(true);
    expect(sessionStorage.getItem('wireframe-demo-look')).toBe('true');
  });
});
