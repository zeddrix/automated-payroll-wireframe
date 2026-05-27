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

export function validateSignUpForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean
): string | null {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return 'Full name is required';
  }
  if (trimmedName.length < 2) {
    return 'Full name must be at least 2 characters';
  }
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
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  if (!termsAccepted) {
    return 'You must accept the terms to continue';
  }
  return null;
}

export function validateForgotPasswordForm(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!email.includes('@')) {
    return 'Enter a valid email address';
  }
  return null;
}
