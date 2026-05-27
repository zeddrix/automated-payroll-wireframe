import { parseForgotPassword, parseLogin, parseSignUp } from './auth-schemas.js';

export const MOCK_VALID_EMAIL = 'admin@wireframe.local';
export const MOCK_VALID_PASSWORD = 'Wireframe1!';

/** Valid sign-up password for tests and E2E */
export const SIGNUP_VALID_PASSWORD = 'SecurePass1!';

export interface MockAuthCredentials {
  email: string;
  password: string;
}

export function validateMockLogin(email: string, password: string): boolean {
  return email.trim() === MOCK_VALID_EMAIL && password === MOCK_VALID_PASSWORD;
}

export function validateLoginForm(email: string, password: string): string | null {
  const result = parseLogin(email, password);
  return result.success ? null : (result.error ?? 'Validation failed');
}

export function validateSignUpForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsAccepted: boolean
): string | null {
  const result = parseSignUp(name, email, password, confirmPassword, termsAccepted);
  return result.success ? null : (result.error ?? 'Validation failed');
}

export function validateForgotPasswordForm(email: string): string | null {
  const result = parseForgotPassword(email);
  return result.success ? null : (result.error ?? 'Validation failed');
}
