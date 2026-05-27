<script lang="ts">
  import type { DevicePreviewMode } from './device-preview-types.js';

  interface DeviceOption {
    mode: DevicePreviewMode;
    label: string;
    testId: string;
  }

  interface Props {
    activeMode: DevicePreviewMode;
    onSelect: (mode: DevicePreviewMode) => void;
    testId?: string;
    mobileTestId: string;
    tabletTestId: string;
    desktopTestId: string;
    systemTestId: string;
  }

  let {
    activeMode,
    onSelect,
    testId = 'device-preview-tabbar',
    mobileTestId,
    tabletTestId,
    desktopTestId,
    systemTestId
  }: Props = $props();

  const options = $derived<DeviceOption[]>([
    { mode: 'mobile', label: 'Mobile preview', testId: mobileTestId },
    { mode: 'tablet', label: 'Tablet preview', testId: tabletTestId },
    { mode: 'desktop', label: 'Desktop preview', testId: desktopTestId },
    { mode: 'system', label: 'Full width', testId: systemTestId }
  ]);
</script>

<div class="device-tabbar" data-testid={testId} role="tablist" aria-label="Device preview">
  {#each options as option (option.mode)}
    <button
      type="button"
      class="device-tabbar__btn"
      class:active={activeMode === option.mode}
      role="tab"
      aria-selected={activeMode === option.mode}
      aria-label={option.label}
      data-testid={option.testId}
      onclick={() => onSelect(option.mode)}
    >
      {#if option.mode === 'mobile'}
        <svg class="device-tabbar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="7"
            y="2"
            width="10"
            height="20"
            rx="2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
          />
          <circle cx="12" cy="18" r="0.75" fill="currentColor" />
        </svg>
      {:else if option.mode === 'tablet'}
        <svg class="device-tabbar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="3"
            width="16"
            height="18"
            rx="2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
          />
          <circle cx="12" cy="18.5" r="0.75" fill="currentColor" />
        </svg>
      {:else if option.mode === 'desktop'}
        <svg class="device-tabbar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3"
            y="4"
            width="18"
            height="12"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
          />
          <path
            d="M9 20h6M12 16v4"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      {:else}
        <svg class="device-tabbar__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M2 12h20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      {/if}
      <span class="device-tabbar__sr">{option.label}</span>
    </button>
  {/each}
</div>

<style>
  .device-tabbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    padding: 0.375rem 0;
    margin-bottom: 0.5rem;
  }
  .device-tabbar__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-sm, 6px);
    background: var(--auth-surface, #fff);
    color: var(--auth-muted, #64748b);
    cursor: pointer;
    transition:
      color 0.15s ease,
      border-color 0.15s ease,
      background 0.15s ease;
  }
  .device-tabbar__btn:hover {
    color: var(--auth-primary, #2563eb);
    border-color: var(--auth-border-focus, #93c5fd);
    background: var(--auth-primary-soft, #eff6ff);
  }
  .device-tabbar__btn.active {
    color: var(--auth-primary, #2563eb);
    border-color: var(--auth-primary, #2563eb);
    background: var(--auth-primary-soft, #dbeafe);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  }
  .device-tabbar__icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  .device-tabbar__sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
