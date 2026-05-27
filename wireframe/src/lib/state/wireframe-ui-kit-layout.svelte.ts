const STORAGE_KEY = 'wireframe-ui-kit-layout';

export type UiKitLayoutMode = 'tabs' | 'scroll';

function readStoredMode(): UiKitLayoutMode {
  if (typeof sessionStorage === 'undefined') {
    return 'tabs';
  }
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored === 'scroll' ? 'scroll' : 'tabs';
}

class WireframeUiKitLayoutState {
  mode = $state<UiKitLayoutMode>('tabs');

  init(): void {
    this.mode = readStoredMode();
  }

  setMode(value: UiKitLayoutMode): void {
    this.mode = value;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, value);
    }
  }
}

export const uiKitLayout = new WireframeUiKitLayoutState();
