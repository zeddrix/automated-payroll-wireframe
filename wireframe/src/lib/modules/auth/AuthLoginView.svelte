<script lang="ts">
  import {
    MOCK_VALID_EMAIL,
    MOCK_VALID_PASSWORD,
    validateMockLogin,
    getLoginFieldErrors,
    isLoginSubmittable
  } from '@aps/mock-data';
  import { moduleTabPath, selectors } from '@aps/contracts';
  import { AuthPageHeader, HiFiField, HiFiButton, ErrorState } from '@aps/ui';
  import AuthHiFiShell from './AuthHiFiShell.svelte';
  import DemoCopy from '../shared/DemoCopy.svelte';
  import { wireframeUiState } from '../../state/wireframe-ui-state.svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  let email = $state('');
  let password = $state('');
  let submitError = $state<string | null>(null);
  let submitted = $state(false);
  let touched = $state({ email: false, password: false });

  const fieldErrors = $derived(getLoginFieldErrors(email, password, { touched, submitted }));
  const canSubmit = $derived(isLoginSubmittable(email, password));

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
    submitted = true;
    submitError = null;
    if (!canSubmit) {
      return;
    }
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
  <form onsubmit={handleSubmit} novalidate>
    <HiFiField
      id="login-email"
      label="Email"
      type="email"
      bind:value={email}
      error={fieldErrors.email ?? null}
      testId={selectors.authLoginEmail}
      onblur={() => {
        touched = { ...touched, email: true };
      }}
    />
    <HiFiField
      id="login-password"
      label="Password"
      type="password"
      bind:value={password}
      error={fieldErrors.password ?? null}
      testId={selectors.authLoginPassword}
      onblur={() => {
        touched = { ...touched, password: true };
      }}
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
