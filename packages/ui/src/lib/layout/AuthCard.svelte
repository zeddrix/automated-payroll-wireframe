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
    background: var(--auth-surface, #ffffff);
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-lg, 14px);
    box-shadow: var(--auth-shadow-card, 0 4px 24px rgba(37, 99, 235, 0.08));
  }
</style>
