<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { parseModuleTabParams, defaultModuleTabPath } from '@aps/contracts';
  import WireframeShell from '$lib/shell/WireframeShell.svelte';
  import { resolveModuleView } from '$lib/shell/module-view-registry';
  import PlaceholderView from '$lib/modules/shared/PlaceholderView.svelte';

  const params = $derived($page.params);
  const parsed = $derived(parseModuleTabParams(params.module, params.tab));

  $effect(() => {
    if (!parsed && params.module) {
      void goto(defaultModuleTabPath('auth'));
    }
  });

  const view = $derived(parsed ? resolveModuleView(parsed.moduleId, parsed.tabId) : null);
</script>

{#if parsed && view}
  <WireframeShell moduleId={parsed.moduleId} tabId={parsed.tabId}>
    {#if view.placeholderTitle}
      <PlaceholderView title={view.placeholderTitle} testId={view.placeholderTestId} />
    {:else}
      {@const View = view.component}
      <View />
    {/if}
  </WireframeShell>
{/if}
