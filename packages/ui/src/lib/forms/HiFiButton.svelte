<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'button' | 'submit';
    disabled?: boolean;
    variant?: 'primary' | 'ghost';
    testId?: string;
    onclick?: () => void;
    children: Snippet;
  }

  let {
    type = 'button',
    disabled = true,
    variant = 'primary',
    testId,
    onclick,
    children
  }: Props = $props();
</script>

<button
  {type}
  class="btn"
  class:btn--ghost={variant === 'ghost'}
  class:btn--primary={variant === 'primary'}
  {disabled}
  data-testid={testId}
  {onclick}
>
  {@render children()}
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
    font-weight: 600;
    border-radius: var(--auth-radius-sm, 6px);
    border: 1px solid transparent;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease,
      opacity 0.15s ease;
  }
  .btn--primary {
    width: 100%;
    background: var(--auth-primary, #2563eb);
    color: #ffffff;
    border-color: var(--auth-primary, #2563eb);
  }
  .btn--primary:not(:disabled):hover {
    background: var(--auth-primary-hover, #1d4ed8);
    border-color: var(--auth-primary-hover, #1d4ed8);
  }
  .btn--ghost {
    background: transparent;
    color: var(--auth-primary, #2563eb);
    border-color: var(--auth-border, #e2e8f0);
  }
  .btn--ghost:not(:disabled):hover {
    background: var(--auth-primary-soft, #dbeafe);
    border-color: var(--auth-border-focus, #93c5fd);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
