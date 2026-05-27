<script lang="ts">
  import { selectors } from '@aps/contracts';
  import {
    viewportPreviewState,
    type ViewportPreview
  } from '../state/viewport-preview.svelte';

  const options: { mode: ViewportPreview; label: string; testId: string }[] = [
    { mode: 'mobile', label: 'Mobile', testId: selectors.viewportPreviewMobile },
    { mode: 'tablet', label: 'Tablet', testId: selectors.viewportPreviewTablet },
    { mode: 'desktop', label: 'Desktop', testId: selectors.viewportPreviewDesktop },
    { mode: 'system', label: 'System', testId: selectors.viewportPreviewSystem }
  ];

  function selectMode(mode: ViewportPreview) {
    viewportPreviewState.setMode(mode);
  }
</script>

<div class="viewport-toggle" data-testid={selectors.viewportPreviewToggle} role="group" aria-label="Viewport preview">
  {#each options as option (option.mode)}
    <button
      type="button"
      class="viewport-toggle__btn"
      class:active={viewportPreviewState.mode === option.mode}
      data-testid={option.testId}
      aria-pressed={viewportPreviewState.mode === option.mode}
      onclick={() => selectMode(option.mode)}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .viewport-toggle {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding: 0.125rem;
    background: #f4f4f5;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
  }
  .viewport-toggle__btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.6875rem;
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: 4px;
    background: transparent;
    color: #64748b;
    cursor: pointer;
  }
  .viewport-toggle__btn:hover {
    color: #2563eb;
    background: #eff6ff;
  }
  .viewport-toggle__btn.active {
    color: #2563eb;
    background: #ffffff;
    border-color: #93c5fd;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  }
</style>
