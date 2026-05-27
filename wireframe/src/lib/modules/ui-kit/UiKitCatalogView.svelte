<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import TokensSection from './sections/TokensSection.svelte';
  import ComponentsSection from './sections/ComponentsSection.svelte';
  import NavigationSection from './sections/NavigationSection.svelte';
  import ResponsiveSection from './sections/ResponsiveSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — catalog" subtitle="All specimens in one scrollable page">
    <ResponsiveSection />
    <TokensSection />
    <ComponentsSection />
    <NavigationSection />
  </WireframePage>
</div>
