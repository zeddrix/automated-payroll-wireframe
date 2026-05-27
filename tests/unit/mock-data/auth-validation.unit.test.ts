import { describe, expect, it } from 'vitest';
import { validateSignUpForm, validateForgotPasswordForm } from '@aps/mock-data';

describe('validateSignUpForm', () => {
  it('rejects empty name and short name', () => {
    expect(validateSignUpForm('', 'a@b.com', 'secret1', 'secret1', true)).toBe(
      'Full name is required'
    );
    expect(validateSignUpForm('A', 'a@b.com', 'secret1', 'secret1', true)).toBe(
      'Full name must be at least 2 characters'
    );
  });

  it('rejects invalid email and password mismatch', () => {
    expect(validateSignUpForm('Jane Doe', '', 'secret1', 'secret1', true)).toBe(
      'Email is required'
    );
    expect(validateSignUpForm('Jane Doe', 'bad', 'secret1', 'secret1', true)).toBe(
      'Enter a valid email address'
    );
    expect(validateSignUpForm('Jane Doe', 'j@d.com', 'secret1', 'other1', true)).toBe(
      'Passwords do not match'
    );
  });

  it('requires terms acceptance', () => {
    expect(validateSignUpForm('Jane Doe', 'j@d.com', 'secret1', 'secret1', false)).toBe(
      'You must accept the terms to continue'
    );
  });

  it('accepts valid sign-up input', () => {
    expect(validateSignUpForm('Jane Doe', 'j@d.com', 'secret1', 'secret1', true)).toBeNull();
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
