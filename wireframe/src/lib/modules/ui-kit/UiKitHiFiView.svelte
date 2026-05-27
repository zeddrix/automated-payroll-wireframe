<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import HiFiSection from './sections/HiFiSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — hi-fi" subtitle="Auth hi-fi components and patterns">
    <HiFiSection />
  </WireframePage>
</div>
