/** Toggle proposal/demo copy in wireframe screens — shared reactive object for cross-component updates */

const STORAGE_KEY = 'wireframe-demo-look';

function readStored(): boolean {
  if (typeof sessionStorage === 'undefined') {
    return true;
  }
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored === 'false') {
    return false;
  }
  if (stored === 'true') {
    return true;
  }
  return true;
}

class WireframeDemoLookState {
  enabled = $state(true);

  init(): void {
    this.enabled = readStored();
  }

  setEnabled(value: boolean): void {
    this.enabled = value;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
    }
  }
}

export const demoLook = new WireframeDemoLookState();

/** @deprecated Use demoLook.init() */
export function initWireframeDemoLook(): void {
  demoLook.init();
}

/** @deprecated Use demoLook.setEnabled() */
export function setWireframeDemoLookEnabled(value: boolean): void {
  demoLook.setEnabled(value);
}
