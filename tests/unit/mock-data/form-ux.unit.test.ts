import { describe, expect, it } from 'vitest';
import { shouldShowFieldError } from '@aps/mock-data';

describe('shouldShowFieldError', () => {
  it('hides error before touch or submit', () => {
    expect(shouldShowFieldError({ touched: false, submitted: false, hasError: true })).toBe(false);
  });

  it('shows error after blur when touched', () => {
    expect(shouldShowFieldError({ touched: true, submitted: false, hasError: true })).toBe(true);
  });

  it('shows error after submit attempt', () => {
    expect(shouldShowFieldError({ touched: false, submitted: true, hasError: true })).toBe(true);
  });

  it('hides when no error', () => {
    expect(shouldShowFieldError({ touched: true, submitted: true, hasError: false })).toBe(false);
  });
});
