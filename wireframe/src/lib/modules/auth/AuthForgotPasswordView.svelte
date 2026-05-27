<script lang="ts">
  import { getForgotPasswordFieldErrors, isForgotPasswordSubmittable } from '@aps/mock-data';
  import { moduleTabPath, selectors } from '@aps/contracts';
  import { AuthPageHeader, Field, Button } from '@aps/ui';
  import { appPath } from '../../app-path';
  import AuthShell from './AuthShell.svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  let email = $state('');
  let showSuccess = $state(false);
  let submitted = $state(false);
  let touched = $state({ email: false });

  const fieldErrors = $derived(getForgotPasswordFieldErrors(email, { touched, submitted }));
  const canSubmit = $derived(isForgotPasswordSubmittable(email));

  const footerLinks = [
    {
      label: 'Back to login',
      href: appPath(moduleTabPath('auth', 'login')),
      testId: selectors.authFooterLinkLogin
    }
  ];

  const subtitle = $derived(
    demoLook.enabled
      ? "We'll send a reset link — demo only"
      : "We'll send a reset link to your email"
  );

  function handleSubmit(event: Event) {
    event.preventDefault();
    submitted = true;
    if (!canSubmit) {
      return;
    }
    showSuccess = true;
  }
</script>

<AuthShell panelTestId={selectors.authForgotPanel} {footerLinks}>
  <AuthPageHeader title="Forgot Password" {subtitle} sectionTitle="Reset request" />
  {#if showSuccess}
    <div class="success" data-testid={selectors.authForgotSuccess} role="status">
      {#if demoLook.enabled}
        <p class="success__title">Reset link sent (demo)</p>
        <p class="success__message">
          Check your inbox for instructions. This wireframe does not send email.
          <a href={appPath(moduleTabPath('auth', 'login'))}>Return to login</a>
        </p>
      {:else}
        <p class="success__title">Reset link sent</p>
        <p class="success__message">
          Check your inbox for instructions.
          <a href={appPath(moduleTabPath('auth', 'login'))}>Return to login</a>
        </p>
      {/if}
    </div>
  {:else}
    <form onsubmit={handleSubmit} novalidate>
      <Field
        id="forgot-email"
        label="Email"
        type="email"
        bind:value={email}
        error={fieldErrors.email ?? null}
        testId={selectors.authForgotEmail}
        onblur={() => {
          touched = { ...touched, email: true };
        }}
      />
      <Button type="submit" disabled={!canSubmit} testId={selectors.authForgotSubmit}>
        Send reset link
      </Button>
    </form>
  {/if}
</AuthShell>

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
