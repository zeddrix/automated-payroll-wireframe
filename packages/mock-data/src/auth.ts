export const MOCK_VALID_EMAIL = 'admin@wireframe.local';
export const MOCK_VALID_PASSWORD = 'wireframe-demo';

export interface MockAuthCredentials {
  email: string;
  password: string;
}

export function validateMockLogin(email: string, password: string): boolean {
  return email.trim() === MOCK_VALID_EMAIL && password === MOCK_VALID_PASSWORD;
}

export function validateLoginForm(email: string, password: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!email.includes('@')) {
    return 'Enter a valid email address';
  }
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
}
