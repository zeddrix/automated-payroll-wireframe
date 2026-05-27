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
  {disabled}
  data-testid={testId}
  {onclick}
>
  {@render children()}
</button>

<style>
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 4px;
    border: 2px solid #52525b;
    background: #e4e4e7;
    color: #18181b;
    cursor: pointer;
  }
  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    border-style: dashed;
  }
  .btn:not(:disabled):hover {
    background: #d4d4d8;
  }
  .btn--ghost {
    background: transparent;
    border-color: #d4d4d8;
  }
</style>
