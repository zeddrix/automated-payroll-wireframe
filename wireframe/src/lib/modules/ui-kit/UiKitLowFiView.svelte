<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import LowFiSection from './sections/LowFiSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — low-fi" subtitle="Wireframe-grade components and states">
    <LowFiSection />
  </WireframePage>
</div>
