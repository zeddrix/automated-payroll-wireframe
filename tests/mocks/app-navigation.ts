export function goto(_url: string): Promise<void> {
  return Promise.resolve();
}

export function invalidate(_url: string): Promise<void> {
  return Promise.resolve();
}

export function beforeNavigate(_callback: () => void): void {
  // no-op in tests
}

export function afterNavigate(_callback: () => void): void {
  // no-op in tests
}
