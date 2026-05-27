<script lang="ts">
  import type { Snippet } from 'svelte';
  import { selectors } from '@aps/contracts';
  import Button from '../forms/Button.svelte';

  interface Props {
    open: boolean;
    title: string;
    testId?: string;
    onclose?: () => void;
    children: Snippet;
  }

  let { open, title, testId, onclose, children }: Props = $props();
</script>

{#if open}
  <div
    class="modal-backdrop"
    role="presentation"
    onclick={(e) => e.target === e.currentTarget && onclose?.()}
  >
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-testid={testId}
    >
      <header class="modal__header">
        <h2 id="modal-title" class="modal__title">{title}</h2>
        <Button
          variant="ghost"
          disabled={false}
          testId={selectors.adminModalClose}
          onclick={() => onclose?.()}
        >
          Close
        </Button>
      </header>
      <div class="modal__body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(24, 24, 27, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    padding: 1rem;
  }
  .modal {
    width: min(100%, 32rem);
    max-height: 90vh;
    overflow: auto;
    background: var(--auth-surface, #ffffff);
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-md, 10px);
    padding: 1.25rem;
    box-shadow: var(--auth-shadow-card, 0 4px 24px rgba(37, 99, 235, 0.08));
  }
  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--auth-border, #e2e8f0);
  }
  .modal__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--auth-text, #0f172a);
  }
</style>
