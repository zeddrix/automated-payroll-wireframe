/**
 * In-app viewport preview for wireframe demos — not production responsive logic.
 *
 * Preview mode constrains the device frame and drives container-query layout inside
 * `wireframe-screen`. Shell chrome (sidebar vs bottom nav) still follows the browser
 * viewport width via WireframeShell @media rules.
 */

export type ViewportPreview = 'system' | 'mobile' | 'tablet' | 'desktop';

const STORAGE_KEY = 'wireframe-viewport-preview';

function readStored(): ViewportPreview {
  if (typeof sessionStorage === 'undefined') {
    return 'system';
  }
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored === 'mobile' || stored === 'tablet' || stored === 'desktop' || stored === 'system') {
    return stored;
  }
  return 'system';
}

class ViewportPreviewState {
  mode = $state<ViewportPreview>('system');

  init(): void {
    this.mode = readStored();
  }

  setMode(mode: ViewportPreview): void {
    this.mode = mode;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, mode);
    }
  }
}

export const viewportPreviewState = new ViewportPreviewState();
