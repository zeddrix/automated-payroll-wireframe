<script lang="ts">
  import type { Snippet } from 'svelte';
  import { selectors } from '@aps/contracts';
  import LowFiButton from '../forms/LowFiButton.svelte';

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
        <LowFiButton
          variant="ghost"
          disabled={false}
          testId={selectors.adminModalClose}
          onclick={() => onclose?.()}
        >
          Close
        </LowFiButton>
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
    background: #fff;
    border: 2px solid #52525b;
    border-radius: 8px;
    padding: 1rem;
  }
  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .modal__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
</style>
