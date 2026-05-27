import { describe, expect, it, beforeEach } from 'vitest';

// Test the state class pattern in isolation (mirrors app module behavior)
class WireframeUiState {
  authenticated = false;
  displayName: string | null = null;

  signIn(email: string): void {
    this.authenticated = true;
    this.displayName = email.split('@')[0] ?? 'User';
  }

  signOut(): void {
    this.authenticated = false;
    this.displayName = null;
  }

  reset(): void {
    this.signOut();
  }
}

describe('wireframe UI state', () => {
  let state: WireframeUiState;

  beforeEach(() => {
    state = new WireframeUiState();
  });

  it('starts signed out', () => {
    expect(state.authenticated).toBe(false);
    expect(state.displayName).toBeNull();
  });

  it('sign in and sign out cycle', () => {
    state.signIn('admin@wireframe.local');
    expect(state.authenticated).toBe(true);
    expect(state.displayName).toBe('admin');
    state.signOut();
    expect(state.authenticated).toBe(false);
    expect(state.displayName).toBeNull();
  });

  it('reset is idempotent', () => {
    state.signIn('user@test.com');
    state.reset();
    state.reset();
    expect(state.authenticated).toBe(false);
  });
});
