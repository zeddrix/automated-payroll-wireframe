import { describe, expect, it } from 'vitest';
import {
  SIGNUP_VALID_PASSWORD,
  validateSignUpForm,
  validateForgotPasswordForm
} from '@aps/mock-data';

describe('validateSignUpForm', () => {
  it('rejects empty name and short name', () => {
    expect(
      validateSignUpForm('', 'a@b.com', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, true)
    ).toBe('Full name is required');
    expect(
      validateSignUpForm('A', 'a@b.com', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, true)
    ).toBe('Full name must be at least 2 characters');
  });

  it('rejects invalid email and password mismatch', () => {
    expect(
      validateSignUpForm('Jane Doe', '', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, true)
    ).toBe('Email is required');
    expect(
      validateSignUpForm('Jane Doe', 'bad', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, true)
    ).toBe('Enter a valid email address');
    expect(
      validateSignUpForm('Jane Doe', 'j@d.com', SIGNUP_VALID_PASSWORD, 'OtherPass1!', true)
    ).toBe('Passwords do not match');
  });

  it('rejects weak password', () => {
    expect(validateSignUpForm('Jane Doe', 'j@d.com', 'secret1', 'secret1', true)).toBe(
      'Password does not meet security requirements'
    );
  });

  it('requires terms acceptance', () => {
    expect(
      validateSignUpForm('Jane Doe', 'j@d.com', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, false)
    ).toBe('You must accept the terms to continue');
  });

  it('accepts valid sign-up input', () => {
    expect(
      validateSignUpForm('Jane Doe', 'j@d.com', SIGNUP_VALID_PASSWORD, SIGNUP_VALID_PASSWORD, true)
    ).toBeNull();
  });
});

describe('validateForgotPasswordForm', () => {
  it('rejects empty and invalid email', () => {
    expect(validateForgotPasswordForm('')).toBe('Email is required');
    expect(validateForgotPasswordForm('not-email')).toBe('Enter a valid email address');
  });

  it('accepts valid email', () => {
    expect(validateForgotPasswordForm('user@example.com')).toBeNull();
  });
});
