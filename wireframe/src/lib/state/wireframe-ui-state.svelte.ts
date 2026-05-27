/** Mock session state for wireframe demos only — not production auth */

class WireframeUiState {
  authenticated = $state(false);
  displayName = $state<string | null>(null);

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

export const wireframeUiState = new WireframeUiState();
