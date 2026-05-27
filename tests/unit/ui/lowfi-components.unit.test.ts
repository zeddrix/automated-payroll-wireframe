import { describe, expect, it } from 'vitest';
import {
  validateLoginForm,
  validateMockLogin,
  MOCK_VALID_EMAIL,
  MOCK_VALID_PASSWORD
} from '@aps/mock-data';

describe('mock auth validation (used by LowFi forms)', () => {
  it('rejects empty and invalid email', () => {
    expect(validateLoginForm('', 'password')).toBe('Email is required');
    expect(validateLoginForm('not-an-email', 'password123')).toBe('Enter a valid email address');
  });

  it('rejects short password', () => {
    expect(validateLoginForm('a@b.com', '123')).toBe('Password must be at least 6 characters');
  });

  it('accepts demo credentials for mock login', () => {
    expect(validateLoginForm(MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD)).toBeNull();
    expect(validateMockLogin(MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD)).toBe(true);
    expect(validateMockLogin(MOCK_VALID_EMAIL, 'wrong')).toBe(false);
  });
});
