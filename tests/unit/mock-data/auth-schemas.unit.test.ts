import { describe, expect, it } from 'vitest';
import {
  evaluatePasswordRequirements,
  passwordMeetsPolicy,
  SIGNUP_VALID_PASSWORD,
  MOCK_VALID_PASSWORD
} from '@aps/mock-data';
import { isLoginSubmittable, isSignUpSubmittable, parseLogin, parseSignUp } from '@aps/mock-data';

describe('password policy', () => {
  it('rejects secret1 without special character', () => {
    expect(passwordMeetsPolicy('secret1')).toBe(false);
    const reqs = evaluatePasswordRequirements('secret1');
    expect(reqs.hasSpecial).toBe(false);
  });

  it('accepts SecurePass1! and Wireframe1!', () => {
    expect(passwordMeetsPolicy(SIGNUP_VALID_PASSWORD)).toBe(true);
    expect(passwordMeetsPolicy(MOCK_VALID_PASSWORD)).toBe(true);
    const reqs = evaluatePasswordRequirements(SIGNUP_VALID_PASSWORD);
    expect(reqs.minLength).toBe(true);
    expect(reqs.hasLetter).toBe(true);
    expect(reqs.hasNumber).toBe(true);
    expect(reqs.hasSpecial).toBe(true);
  });
});

describe('parseSignUp', () => {
  it('rejects weak password', () => {
    const result = parseSignUp('Jane Doe', 'jane@example.com', 'secret1', 'secret1', true);
    expect(result.success).toBe(false);
    expect(result.fieldErrors?.password).toBeDefined();
  });

  it('accepts valid sign-up', () => {
    const result = parseSignUp(
      'Jane Doe',
      'jane@example.com',
      SIGNUP_VALID_PASSWORD,
      SIGNUP_VALID_PASSWORD,
      true
    );
    expect(result.success).toBe(true);
  });

  it('rejects password mismatch', () => {
    const result = parseSignUp(
      'Jane Doe',
      'jane@example.com',
      SIGNUP_VALID_PASSWORD,
      'OtherPass1!',
      true
    );
    expect(result.success).toBe(false);
    expect(result.fieldErrors?.confirmPassword).toBe('Passwords do not match');
  });
});

describe('parseLogin', () => {
  it('accepts mock credentials', () => {
    const result = parseLogin('admin@wireframe.local', MOCK_VALID_PASSWORD);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = parseLogin('not-email', MOCK_VALID_PASSWORD);
    expect(result.success).toBe(false);
    expect(result.fieldErrors?.email).toBe('Enter a valid email address');
  });
});

describe('isSubmittable helpers', () => {
  it('login submittable when email and password present', () => {
    expect(isLoginSubmittable('a@b.com', 'x')).toBe(true);
    expect(isLoginSubmittable('', 'x')).toBe(false);
  });

  it('sign-up submittable only when schema passes', () => {
    expect(
      isSignUpSubmittable('Jane', 'j@d.com', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, true)
    ).toBe(true);
    expect(isSignUpSubmittable('Jane', 'j@d.com', 'secret1', 'secret1', true)).toBe(false);
  });
});
