<script lang="ts">
  import { WireframePage } from '@aps/ui';
  import { selectors } from '@aps/contracts';
  import NavigationSection from './sections/NavigationSection.svelte';
</script>

<div data-testid={selectors.uiKitPanel}>
  <WireframePage title="UI Kit — navigation" subtitle="Rails, tabs, bottom nav, device preview">
    <NavigationSection />
  </WireframePage>
</div>
