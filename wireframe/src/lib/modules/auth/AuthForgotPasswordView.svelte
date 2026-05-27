<script lang="ts">
  import { validateForgotPasswordForm } from '@aps/mock-data';
  import { moduleTabPath, selectors } from '@aps/contracts';
  import { AuthPageHeader, HiFiField, HiFiButton } from '@aps/ui';
  import AuthHiFiShell from './AuthHiFiShell.svelte';

  let email = $state('');
  let fieldError = $state<string | null>(null);
  let showSuccess = $state(false);

  const canSubmit = $derived(validateForgotPasswordForm(email) === null);

  const footerLinks = [{ label: 'Back to login', href: moduleTabPath('auth', 'login') }];

  function handleSubmit(event: Event) {
    event.preventDefault();
    const validation = validateForgotPasswordForm(email);
    if (validation) {
      fieldError = validation;
      return;
    }
    fieldError = null;
    showSuccess = true;
  }
</script>

<AuthHiFiShell panelTestId={selectors.authForgotPanel} {footerLinks}>
  <AuthPageHeader
    title="Forgot Password"
    subtitle="We'll send a reset link — demo only"
    sectionTitle="Reset request"
  />
  {#if showSuccess}
    <div class="success" data-testid={selectors.authForgotSuccess} role="status">
      <p class="success__title">Reset link sent (demo)</p>
      <p class="success__message">
        Check your inbox for instructions. This wireframe does not send email.
        <a href={moduleTabPath('auth', 'login')}>Return to login</a>
      </p>
    </div>
  {:else}
    <form onsubmit={handleSubmit}>
      <HiFiField
        id="forgot-email"
        label="Email"
        type="email"
        bind:value={email}
        error={fieldError}
        testId={selectors.authForgotEmail}
      />
      <HiFiButton type="submit" disabled={!canSubmit} testId={selectors.authForgotSubmit}>
        Send reset link
      </HiFiButton>
    </form>
  {/if}
</AuthHiFiShell>

<style>
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
