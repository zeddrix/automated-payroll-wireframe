/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, beforeEach } from 'vitest';
import { viewportPreviewState } from '../../../wireframe/src/lib/state/viewport-preview.svelte';

describe('viewportPreviewState', () => {
  beforeEach(() => {
    sessionStorage.clear();
    viewportPreviewState.setMode('system');
  });

  it('persists selected mode in sessionStorage', () => {
    viewportPreviewState.setMode('mobile');
    expect(viewportPreviewState.mode).toBe('mobile');
    expect(sessionStorage.getItem('wireframe-viewport-preview')).toBe('mobile');
  });

  it('init restores stored mode', () => {
    sessionStorage.setItem('wireframe-viewport-preview', 'tablet');
    viewportPreviewState.init();
    expect(viewportPreviewState.mode).toBe('tablet');
  });
});
