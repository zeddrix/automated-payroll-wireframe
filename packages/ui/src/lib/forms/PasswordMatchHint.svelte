<script lang="ts">
  interface Props {
    password: string;
    confirmPassword: string;
    testId?: string;
  }

  let { password, confirmPassword, testId = 'auth-sign-up-password-match' }: Props = $props();

  const status = $derived.by(() => {
    if (!confirmPassword) {
      return 'hidden' as const;
    }
    if (!password) {
      return 'neutral' as const;
    }
    return password === confirmPassword ? ('match' as const) : ('mismatch' as const);
  });

  const message = $derived.by(() => {
    if (status === 'match') {
      return 'Passwords match';
    }
    if (status === 'mismatch') {
      return 'Passwords do not match';
    }
    return 'Confirm your password';
  });
</script>

{#if status !== 'hidden'}
  <p
    class="pw-match"
    class:pw-match--match={status === 'match'}
    class:pw-match--mismatch={status === 'mismatch'}
    data-testid={testId}
    data-status={status}
    aria-live="polite"
  >
    {message}
  </p>
{/if}

<style>
  .pw-match {
    margin: -0.5rem 0 1rem;
    font-size: 0.8125rem;
    color: var(--auth-muted, #64748b);
  }
  .pw-match--match {
    color: #16a34a;
  }
  .pw-match--mismatch {
    color: var(--auth-danger, #dc2626);
  }
</style>
