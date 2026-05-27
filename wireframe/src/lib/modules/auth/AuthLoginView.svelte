<script lang="ts">
  import {
    MOCK_VALID_EMAIL,
    MOCK_VALID_PASSWORD,
    validateLoginForm,
    validateMockLogin
  } from '@aps/mock-data';
  import { selectors } from '@aps/contracts';
  import { WireframePage, WireframeSection, LowFiField, LowFiButton, ErrorState } from '@aps/ui';
  import ReferenceMockBanner from '../shared/ReferenceMockBanner.svelte';
  import { wireframeUiState } from '../../state/wireframe-ui-state.svelte';

  let email = $state('');
  let password = $state('');
  let fieldError = $state<string | null>(null);
  let submitError = $state<string | null>(null);

  const canSubmit = $derived(
    !!email.trim() && !!password && validateLoginForm(email, password) === null
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
      submitError = 'Invalid credentials. Use the demo email and password shown below.';
      return;
    }
    wireframeUiState.signIn(email);
  }
</script>

<div data-testid={selectors.authLoginPanel}>
  <WireframePage title="Login" subtitle="Auth milestone — reference pattern">
    {#snippet banner()}
      <ReferenceMockBanner />
    {/snippet}
    <WireframeSection title="Credentials">
      <form onsubmit={handleSubmit}>
        <LowFiField
          id="login-email"
          label="Email"
          type="email"
          bind:value={email}
          error={fieldError && !email.trim() ? fieldError : null}
          testId={selectors.authLoginEmail}
        />
        <LowFiField
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
        <LowFiButton type="submit" disabled={!canSubmit} testId={selectors.authLoginSubmit}>
          Sign in
        </LowFiButton>
      </form>
      <p class="hint">
        Demo: <code>{MOCK_VALID_EMAIL}</code> / <code>{MOCK_VALID_PASSWORD}</code>
      </p>
    </WireframeSection>
  </WireframePage>
</div>

<style>
  .hint {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: #71717a;
  }
  .submit-error {
    margin-bottom: 0.75rem;
  }
</style>
