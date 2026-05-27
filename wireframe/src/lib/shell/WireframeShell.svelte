<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { goto } from '$app/navigation';
  import { BottomNav, SidebarRail, ModuleTabs, LowFiButton } from '@aps/ui';
  import { selectors, type ModuleId, type TabId } from '@aps/contracts';
  import { buildModuleNavItems, buildTabNavItems } from './nav-items';
  import { wireframeUiState } from '../state/wireframe-ui-state.svelte';
  import { viewportPreviewState } from '../state/viewport-preview.svelte';
  import { demoLook } from '../state/wireframe-demo-look.svelte';
  import { uiKitLayout } from '../state/wireframe-ui-kit-layout.svelte';
  import WireframeDevicePreview from './WireframeDevicePreview.svelte';
  import DemoLookToggle from './DemoLookToggle.svelte';
  import UiKitLayoutToggle from './UiKitLayoutToggle.svelte';

  interface Props {
    moduleId: ModuleId;
    tabId: TabId;
    children: Snippet;
  }

  let { moduleId, tabId, children }: Props = $props();

  let clientReady = $state(false);
  onMount(() => {
    viewportPreviewState.init();
    demoLook.init();
    uiKitLayout.init();
    clientReady = true;
  });

  const moduleNavItems = buildModuleNavItems();
  const tabNavItems = $derived(buildTabNavItems(moduleId, tabId));
  const isAuthModule = $derived(moduleId === 'auth');
  const isUiKitModule = $derived(moduleId === 'ui-kit');
  const phaseLabel = $derived(isAuthModule ? 'Proposal / hi-fi auth' : 'Proposal / low-fi');

  const uiKitTabNavItems = $derived(
    isUiKitModule && uiKitLayout.mode === 'tabs'
      ? tabNavItems.filter((t) => t.id !== 'catalog')
      : tabNavItems
  );

  $effect(() => {
    if (!clientReady) return;
    if (!isUiKitModule) return;

    if (uiKitLayout.mode === 'scroll' && tabId !== 'catalog') {
      goto('/ui-kit/catalog');
    }

    if (uiKitLayout.mode === 'tabs' && tabId === 'catalog') {
      goto('/ui-kit/tokens');
    }
  });
</script>

<div
  class="shell"
  data-testid={selectors.appShell}
  data-client-ready={clientReady ? 'true' : 'false'}
  class:shell--auth={isAuthModule}
>
  <header class="shell__header" data-testid={selectors.appHeader}>
    <div class="shell__brand-row">
      <span class="shell__brand">Payroll Wireframe</span>
      <span class="shell__phase">{phaseLabel}</span>
    </div>
    <div class="shell__status">
      <span data-testid={selectors.authStatusBadge}>
        {#if wireframeUiState.authenticated}
          Signed in as {wireframeUiState.displayName}
        {:else}
          Signed out
        {/if}
      </span>
      {#if wireframeUiState.authenticated}
        <LowFiButton
          variant="ghost"
          disabled={false}
          testId={selectors.authSignOut}
          onclick={() => wireframeUiState.signOut()}
        >
          Sign out
        </LowFiButton>
      {/if}
    </div>
  </header>

  <div class="shell__body">
    <div class="shell__sidebar hide-mobile">
      <SidebarRail items={moduleNavItems} activeId={moduleId} />
    </div>

    <main class="shell__main">
      <WireframeDevicePreview>
        {#snippet between()}
          <div class="module-toolbar" data-testid={selectors.moduleToolbar}>
            <div class="module-toolbar__tabs">
              {#if isUiKitModule && uiKitLayout.mode === 'scroll'}
                <UiKitLayoutToggle />
              {:else if isUiKitModule && uiKitLayout.mode === 'tabs'}
                <ModuleTabs
                  tabs={uiKitTabNavItems.map((t) => ({ id: t.id, label: t.label, href: t.href }))}
                  activeTabId={tabId}
                  variant="lowfi"
                />
              {:else}
                <ModuleTabs
                  tabs={tabNavItems.map((t) => ({ id: t.id, label: t.label, href: t.href }))}
                  activeTabId={tabId}
                  variant={isAuthModule ? 'hifi' : 'lowfi'}
                />
              {/if}
            </div>
            <div class="module-toolbar__actions">
              {#if isUiKitModule && uiKitLayout.mode === 'tabs'}
                <UiKitLayoutToggle />
              {/if}
              <DemoLookToggle />
            </div>
          </div>
        {/snippet}
        <div class="shell__content" data-testid={selectors.contentRegion}>
          {@render children()}
        </div>
      </WireframeDevicePreview>
    </main>
  </div>

  <div class="shell__bottom hide-desktop">
    <BottomNav items={moduleNavItems} activeId={moduleId} />
  </div>
</div>

<style>
  .shell {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 100%;
  }
  .shell--auth .shell__header {
    border-bottom-color: #93c5fd;
  }
  .shell__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid #d4d4d8;
    background: #fff;
  }
  .shell__brand-row {
    min-width: 0;
  }
  .shell__brand {
    font-weight: 700;
    font-size: 1rem;
  }
  .shell__phase {
    margin-left: 0.5rem;
    font-size: 0.75rem;
    color: #71717a;
  }
  .shell--auth .shell__phase {
    color: #2563eb;
  }
  .shell__status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  .shell__body {
    flex: 1;
    display: flex;
    min-height: 0;
  }
  .shell__main {
    flex: 1;
    padding: 0 1rem 1rem;
    overflow: auto;
    min-width: 0;
  }
  .shell__content {
    padding-top: 0.5rem;
  }
  .module-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
  }
  .module-toolbar__tabs {
    flex: 1;
    min-width: 0;
  }
  .module-toolbar__actions {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  .module-toolbar__tabs :global(.module-tabs) {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }
  .hide-mobile {
    display: none;
  }
  .shell__bottom {
    flex-shrink: 0;
  }
  @media (min-width: 768px) {
    .hide-mobile {
      display: block;
    }
    .hide-desktop {
      display: none;
    }
    .shell__main {
      padding: 0 1.5rem 1.5rem;
    }
  }
</style>
