<script lang="ts">
  import { getSignUpFieldErrors, isSignUpSubmittable } from '@aps/mock-data';
  import { moduleTabPath, selectors } from '@aps/contracts';
  import {
    AuthPageHeader,
    HiFiField,
    HiFiButton,
    PasswordRequirements,
    PasswordMatchHint
  } from '@aps/ui';
  import AuthHiFiShell from './AuthHiFiShell.svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  let name = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let termsAccepted = $state(false);
  let showSuccess = $state(false);
  let submitted = $state(false);
  let touched = $state({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    terms: false
  });

  const fieldErrors = $derived(
    getSignUpFieldErrors(name, email, password, confirmPassword, termsAccepted, {
      touched,
      submitted
    })
  );
  const canSubmit = $derived(
    isSignUpSubmittable(name, email, password, confirmPassword, termsAccepted)
  );

  const footerLinks = [
    {
      label: 'Already have an account? Sign in',
      href: moduleTabPath('auth', 'login'),
      testId: selectors.authFooterLinkLogin
    }
  ];

  const subtitle = $derived(
    demoLook.enabled ? 'Create a demo account — mock data only' : 'Create your account'
  );
  const termsLabel = $derived(
    demoLook.enabled ? 'I agree to the terms of service (demo)' : 'I agree to the terms of service'
  );

  const requirementsId = selectors.authSignUpPasswordRequirements;

  function handleSubmit(event: Event) {
    event.preventDefault();
    submitted = true;
    if (!canSubmit) {
      return;
    }
    showSuccess = true;
  }
</script>

<AuthHiFiShell panelTestId={selectors.authSignUpPanel} {footerLinks}>
  <AuthPageHeader title="Sign Up" {subtitle} sectionTitle="Account details" />
  {#if showSuccess}
    <div class="success" data-testid={selectors.authSignUpSuccess} role="status">
      {#if demoLook.enabled}
        <p class="success__title">Account created (demo)</p>
        <p class="success__message">
          This is a wireframe preview. No account was stored. You can continue to
          <a href={moduleTabPath('auth', 'login')}>sign in</a> with demo credentials.
        </p>
      {:else}
        <p class="success__title">Account created</p>
        <p class="success__message">
          You can <a href={moduleTabPath('auth', 'login')}>sign in</a> with your new account.
        </p>
      {/if}
    </div>
  {:else}
    <form onsubmit={handleSubmit} novalidate>
      <HiFiField
        id="signup-name"
        label="Full name"
        bind:value={name}
        error={fieldErrors.name ?? null}
        testId={selectors.authSignUpName}
        onblur={() => {
          touched = { ...touched, name: true };
        }}
      />
      <HiFiField
        id="signup-email"
        label="Email"
        type="email"
        bind:value={email}
        error={fieldErrors.email ?? null}
        testId={selectors.authSignUpEmail}
        onblur={() => {
          touched = { ...touched, email: true };
        }}
      />
      <HiFiField
        id="signup-password"
        label="Password"
        type="password"
        bind:value={password}
        error={fieldErrors.password ?? null}
        testId={selectors.authSignUpPassword}
        hintId={requirementsId}
        onblur={() => {
          touched = { ...touched, password: true };
        }}
      />
      <PasswordRequirements
        {password}
        testId={selectors.authSignUpPasswordRequirements}
        requirementTestId={selectors.passwordRequirement}
      />
      <HiFiField
        id="signup-confirm"
        label="Confirm password"
        type="password"
        bind:value={confirmPassword}
        error={fieldErrors.confirmPassword ?? null}
        testId={selectors.authSignUpConfirmPassword}
        onblur={() => {
          touched = { ...touched, confirmPassword: true };
        }}
      />
      <PasswordMatchHint {password} {confirmPassword} testId={selectors.authSignUpPasswordMatch} />
      <label class="terms" class:terms--error={!!fieldErrors.termsAccepted}>
        <input
          type="checkbox"
          bind:checked={termsAccepted}
          data-testid={selectors.authSignUpTerms}
          onchange={() => {
            touched = { ...touched, terms: true };
          }}
        />
        <span>{termsLabel}</span>
      </label>
      {#if fieldErrors.termsAccepted}
        <p class="terms-error" role="alert">{fieldErrors.termsAccepted}</p>
      {/if}
      <HiFiButton type="submit" disabled={!canSubmit} testId={selectors.authSignUpSubmit}>
        Create account
      </HiFiButton>
    </form>
  {/if}
</AuthHiFiShell>

<style>
  .terms {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--auth-text, #0f172a);
    cursor: pointer;
  }
  .terms--error {
    color: var(--auth-danger, #dc2626);
  }
  .terms input {
    margin-top: 0.2rem;
    width: 1rem;
    height: 1rem;
    accent-color: var(--auth-primary, #2563eb);
  }
  .terms-error {
    margin: -0.5rem 0 1rem;
    font-size: 0.8125rem;
    color: var(--auth-danger, #dc2626);
  }
  .success {
    padding: 1rem;
    border-radius: var(--auth-radius-md, 10px);
    background: var(--auth-primary-soft, #dbeafe);
    border: 1px solid var(--auth-border-focus, #93c5fd);
  }
  .success__title {
    margin: 0 0 0.5rem;
    font-weight: 600;
    color: var(--auth-text, #0f172a);
  }
  .success__message {
    margin: 0;
    font-size: 0.875rem;
    color: var(--auth-muted, #64748b);
    line-height: 1.5;
  }
  .success__message a {
    color: var(--auth-primary, #2563eb);
    font-weight: 500;
  }
</style>
