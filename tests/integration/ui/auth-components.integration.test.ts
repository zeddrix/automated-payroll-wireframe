/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import {
  blueTheme,
  DevicePreviewFrame,
  DevicePreviewTabbar,
  Field,
  PasswordRequirements
} from '@aps/ui';
import { resolveModuleView } from '../../../wireframe/src/lib/shell/module-view-registry';
import PlaceholderView from '../../../wireframe/src/lib/modules/shared/PlaceholderView.svelte';

describe('auth components and device preview wiring', () => {
  it('exports blue theme tokens and device preview components', () => {
    expect(blueTheme.colors.primary).toBe('#2563eb');
    expect(blueTheme.colors.primarySoft).toBe('#dbeafe');
    expect(DevicePreviewFrame).toBeTruthy();
    expect(DevicePreviewTabbar).toBeTruthy();
  });

  it('resolves all auth tabs to reference views', () => {
    const tabs = ['login', 'sign-up', 'forgot-password'] as const;
    for (const tabId of tabs) {
      const { component } = resolveModuleView('auth', tabId);
      expect(component).not.toBe(PlaceholderView);
    }
  });

  it('Field sets aria-invalid and aria-describedby when error is shown', () => {
    const { getByTestId } = render(Field, {
      props: {
        id: 'test-email',
        label: 'Email',
        testId: 'test-email-input',
        error: 'Enter a valid email address'
      }
    });
    const input = getByTestId('test-email-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('test-email-error');
  });

  it('Field password toggle switches input type and preserves value', async () => {
    const { getByTestId } = render(Field, {
      props: {
        id: 'test-password',
        label: 'Password',
        type: 'password',
        testId: 'test-password-input',
        value: 'SecretPass1!'
      }
    });
    const input = getByTestId('test-password-input') as HTMLInputElement;
    const toggle = getByTestId('test-password-input-visibility-toggle');

    expect(input.type).toBe('password');
    await toggle.click();
    expect(input.type).toBe('text');
    expect(input.value).toBe('SecretPass1!');
    await toggle.click();
    expect(input.type).toBe('password');
  });

  it('PasswordRequirements lists policy rules when password is non-empty', () => {
    const { getByTestId } = render(PasswordRequirements, {
      props: { password: 'ab', testId: 'pw-reqs' }
    });
    expect(getByTestId('pw-reqs')).toBeTruthy();
    expect(getByTestId('password-requirement-minLength').getAttribute('data-met')).toBe('false');
  });
});
