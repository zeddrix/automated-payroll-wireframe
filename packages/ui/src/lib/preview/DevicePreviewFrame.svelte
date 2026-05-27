<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { DevicePreviewMode } from './device-preview-types.js';

  interface Props {
    mode: DevicePreviewMode;
    children: Snippet;
    testId?: string;
    screenTestId?: string;
  }

  let {
    mode,
    children,
    testId = 'device-preview-frame',
    screenTestId = 'device-preview-frame-screen'
  }: Props = $props();
</script>

<div
  class="device-frame"
  class:device-frame--system={mode === 'system'}
  class:device-frame--mobile={mode === 'mobile'}
  class:device-frame--tablet={mode === 'tablet'}
  class:device-frame--desktop={mode === 'desktop'}
  data-testid={testId}
  data-device-mode={mode}
>
  {#if mode === 'system'}
    <div class="device-frame__pass" data-testid={screenTestId}>
      {@render children()}
    </div>
  {:else if mode === 'mobile'}
    <div class="device-frame__stage">
      <div class="device-frame__phone">
        <div class="device-frame__phone-notch" aria-hidden="true"></div>
        <div class="device-frame__phone-screen" data-testid={screenTestId}>
          {@render children()}
        </div>
      </div>
    </div>
  {:else if mode === 'tablet'}
    <div class="device-frame__stage">
      <div class="device-frame__tablet">
        <div class="device-frame__tablet-screen" data-testid={screenTestId}>
          {@render children()}
        </div>
      </div>
    </div>
  {:else}
    <div class="device-frame__stage">
      <div class="device-frame__desktop">
        <div class="device-frame__desktop-screen" data-testid={screenTestId}>
          {@render children()}
        </div>
        <div class="device-frame__desktop-stand" aria-hidden="true"></div>
      </div>
    </div>
  {/if}
</div>

<style>
  .device-frame {
    width: 100%;
  }
  .device-frame--system .device-frame__pass {
    width: 100%;
  }
  .device-frame__stage {
    display: flex;
    justify-content: center;
    padding: 1rem 0.5rem 1.5rem;
    background: #e2e8f0;
    border-radius: var(--auth-radius-md, 10px);
  }
  .device-frame__phone {
    width: 100%;
    max-width: 390px;
    padding: 0.625rem;
    background: #1e293b;
    border-radius: 2rem;
    box-shadow:
      0 12px 40px rgba(15, 23, 42, 0.2),
      inset 0 0 0 1px #334155;
  }
  .device-frame__phone-notch {
    width: 5rem;
    height: 0.375rem;
    margin: 0 auto 0.5rem;
    background: #0f172a;
    border-radius: 999px;
  }
  .device-frame__phone-screen {
    max-height: 70dvh;
    overflow: auto;
    background: #fff;
    border-radius: 1.25rem;
    -webkit-overflow-scrolling: touch;
  }
  .device-frame__tablet {
    width: 100%;
    max-width: 768px;
    padding: 0.75rem;
    background: #334155;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(15, 23, 42, 0.15);
  }
  .device-frame__tablet-screen {
    max-height: 75dvh;
    overflow: auto;
    background: #fff;
    border-radius: 0.5rem;
  }
  .device-frame__desktop {
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .device-frame__desktop-screen {
    width: 100%;
    max-height: 80dvh;
    overflow: auto;
    background: #fff;
    border: 2px solid #334155;
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0 4px 24px rgba(15, 23, 42, 0.1);
  }
  .device-frame__desktop-stand {
    width: 6rem;
    height: 2rem;
    margin-top: -1px;
    background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
    border-radius: 0 0 4px 4px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
  }
</style>
