<script lang="ts">
  import {
    MOCK_VALID_EMAIL,
    MOCK_VALID_PASSWORD,
    validateLoginForm,
    validateMockLogin
  } from '@aps/mock-data';
  import { moduleTabPath, selectors } from '@aps/contracts';
  import { AuthPageHeader, HiFiField, HiFiButton, ErrorState } from '@aps/ui';
  import AuthHiFiShell from './AuthHiFiShell.svelte';
  import DemoCopy from '../shared/DemoCopy.svelte';
  import { wireframeUiState } from '../../state/wireframe-ui-state.svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  let email = $state('');
  let password = $state('');
  let fieldError = $state<string | null>(null);
  let submitError = $state<string | null>(null);

  const canSubmit = $derived(
    !!email.trim() && !!password && validateLoginForm(email, password) === null
  );

  const footerLinks = [
    {
      label: 'Create account',
      href: moduleTabPath('auth', 'sign-up'),
      testId: selectors.authFooterLinkSignUp
    },
    {
      label: 'Forgot password?',
      href: moduleTabPath('auth', 'forgot-password'),
      testId: selectors.authFooterLinkForgot
    }
  ];

  const loginSubtitle = $derived(
    demoLook.enabled ? 'Auth milestone — reference pattern' : 'Sign in to your account'
  );

  const invalidCredentialsMessage = $derived(
    demoLook.enabled
      ? 'Invalid credentials. Use the demo email and password shown below.'
      : 'Invalid credentials.'
  );

  function handleSubmit(event: Event) {
    event.preventDefault();
    submitError = null;
    const validation = validateLoginForm(email, password);
    if (validation) {
      fieldError = validation;
      return;
    }
    fieldError = null;
    if (!validateMockLogin(email, password)) {
      submitError = invalidCredentialsMessage;
      return;
    }
    wireframeUiState.signIn(email);
  }
</script>

<AuthHiFiShell panelTestId={selectors.authLoginPanel} {footerLinks}>
  <AuthPageHeader
    title="Login"
    subtitle={loginSubtitle}
    subtitleTestId={selectors.authLoginSubtitle}
    sectionTitle="Credentials"
  />
  <form onsubmit={handleSubmit}>
    <HiFiField
      id="login-email"
      label="Email"
      type="email"
      bind:value={email}
      error={fieldError && !email.trim() ? fieldError : null}
      testId={selectors.authLoginEmail}
    />
    <HiFiField
      id="login-password"
      label="Password"
      type="password"
      bind:value={password}
      error={fieldError && email.trim() && !password ? fieldError : null}
      testId={selectors.authLoginPassword}
    />
    {#if submitError}
      <div class="submit-error" data-testid={selectors.authLoginError}>
        <ErrorState title="Sign in failed" message={submitError} />
      </div>
    {/if}
    <HiFiButton type="submit" disabled={!canSubmit} testId={selectors.authLoginSubmit}>
      Sign in
    </HiFiButton>
  </form>
  <DemoCopy>
    <p class="hint" data-testid={selectors.authLoginDemoHint}>
      Demo: <code>{MOCK_VALID_EMAIL}</code> / <code>{MOCK_VALID_PASSWORD}</code>
    </p>
  </DemoCopy>
</AuthHiFiShell>

<style>
  .hint {
    margin: 1rem 0 0;
    font-size: 0.8125rem;
    color: var(--auth-muted, #64748b);
  }
  .hint code {
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    background: var(--auth-primary-soft, #dbeafe);
    border-radius: 4px;
    color: var(--auth-text, #0f172a);
  }
  .submit-error {
    margin-bottom: 0.75rem;
  }
  .submit-error :global(.error-state) {
    border-color: var(--auth-danger, #dc2626);
    background: var(--auth-danger-soft, #fef2f2);
  }
</style>
