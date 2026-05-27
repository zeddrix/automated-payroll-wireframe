<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DevicePreviewTabbar, DevicePreviewFrame, type DevicePreviewMode } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import { viewportPreviewState } from '../state/viewport-preview.svelte';

  interface Props {
    between?: Snippet;
    children: Snippet;
  }

  let { between, children }: Props = $props();

  const mode = $derived(viewportPreviewState.mode as DevicePreviewMode);

  function handleSelect(next: DevicePreviewMode) {
    viewportPreviewState.setMode(next);
  }
</script>

<div class="wireframe-device-preview">
  <DevicePreviewTabbar
    activeMode={mode}
    onSelect={handleSelect}
    testId={selectors.devicePreviewTabbar}
    mobileTestId={selectors.devicePreviewMobile}
    tabletTestId={selectors.devicePreviewTablet}
    desktopTestId={selectors.devicePreviewDesktop}
    systemTestId={selectors.devicePreviewSystem}
  />
  {#if between}
    <div class="wireframe-device-preview__between">
      {@render between()}
    </div>
  {/if}
  <DevicePreviewFrame
    {mode}
    testId={selectors.devicePreviewFrame}
    screenTestId={selectors.devicePreviewFrameScreen}
  >
    {@render children()}
  </DevicePreviewFrame>
</div>

<style>
  .wireframe-device-preview {
    width: 100%;
  }
  .wireframe-device-preview__between {
    margin-bottom: 0.5rem;
  }
</style>
