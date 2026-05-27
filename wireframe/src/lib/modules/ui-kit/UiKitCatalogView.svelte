<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import TokensSection from './sections/TokensSection.svelte';
  import LowFiSection from './sections/LowFiSection.svelte';
  import HiFiSection from './sections/HiFiSection.svelte';
  import NavigationSection from './sections/NavigationSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — catalog" subtitle="All specimens in one scrollable page">
    <TokensSection />
    <LowFiSection />
    <HiFiSection />
    <NavigationSection />
  </WireframePage>
</div>
