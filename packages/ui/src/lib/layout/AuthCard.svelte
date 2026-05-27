<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    testId?: string;
  }

  let { children, testId }: Props = $props();
</script>

<div class="auth-card" data-testid={testId}>
  {@render children()}
</div>

<style>
  .auth-card {
    width: 100%;
    max-width: min(100%, 28rem);
    margin: 0 auto;
    padding: 1.5rem;
    background: var(--auth-surface, #ffffff);
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-lg, 14px);
    box-shadow: var(--auth-shadow-card, 0 4px 24px rgba(37, 99, 235, 0.08));
    box-sizing: border-box;
  }
  @media (min-width: 640px) {
    .auth-card {
      padding: 2rem;
      max-width: min(100%, 32rem);
    }
  }
</style>
