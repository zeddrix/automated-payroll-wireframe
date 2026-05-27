<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import ComponentsSection from './sections/ComponentsSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — components" subtitle="Production-grade UI primitives and patterns">
    <ComponentsSection />
  </WireframePage>
</div>
