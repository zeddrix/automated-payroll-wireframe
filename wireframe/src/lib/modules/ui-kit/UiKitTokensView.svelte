<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import TokensSection from './sections/TokensSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — tokens" subtitle="Colors, typography, radius, shadows">
    <TokensSection />
  </WireframePage>
</div>
