<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { BottomNav, SidebarRail, ModuleTabs, LowFiButton } from '@aps/ui';
  import { selectors, type ModuleId, type TabId } from '@aps/contracts';
  import { buildModuleNavItems, buildTabNavItems } from './nav-items';
  import { wireframeUiState } from '../state/wireframe-ui-state.svelte';
  import { viewportPreviewState } from '../state/viewport-preview.svelte';
  import ViewportPreviewToggle from './ViewportPreviewToggle.svelte';

  interface Props {
    moduleId: ModuleId;
    tabId: TabId;
    children: Snippet;
  }

  let { moduleId, tabId, children }: Props = $props();

  let clientReady = $state(false);
  onMount(() => {
    viewportPreviewState.init();
    clientReady = true;
  });

  const moduleNavItems = buildModuleNavItems();
  const tabNavItems = $derived(buildTabNavItems(moduleId, tabId));
  const isAuthModule = $derived(moduleId === 'auth');
  const phaseLabel = $derived(isAuthModule ? 'Proposal / hi-fi auth' : 'Proposal / low-fi');
  const previewMode = $derived(viewportPreviewState.mode);
  const usePreviewFrame = $derived(previewMode !== 'system');
</script>

<div
  class="shell-outer"
  class:shell-outer--framed={usePreviewFrame}
  data-viewport-frame={usePreviewFrame ? previewMode : undefined}
>
  <div
    class="shell"
    data-testid={selectors.appShell}
    data-client-ready={clientReady ? 'true' : 'false'}
    data-viewport-preview={previewMode}
    class:shell--auth={isAuthModule}
  >
    <header class="shell__header" data-testid={selectors.appHeader}>
      <div class="shell__brand-row">
        <span class="shell__brand">Payroll Wireframe</span>
        <span class="shell__phase">{phaseLabel}</span>
      </div>
      <div class="shell__status">
        <ViewportPreviewToggle />
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
        <ModuleTabs
          tabs={tabNavItems.map((t) => ({ id: t.id, label: t.label, href: t.href }))}
          activeTabId={tabId}
          variant={isAuthModule ? 'hifi' : 'lowfi'}
        />
        <div class="shell__content" data-testid={selectors.contentRegion}>
          {@render children()}
        </div>
      </main>
    </div>

    <div class="shell__bottom hide-desktop">
      <BottomNav items={moduleNavItems} activeId={moduleId} />
    </div>
  </div>
</div>

<style>
  .shell-outer {
    min-height: 100dvh;
  }
  .shell-outer--framed {
    padding: 1rem;
    background: #e2e8f0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .shell-outer--framed[data-viewport-frame='mobile'] .shell {
    width: 100%;
    max-width: 390px;
    min-height: 80dvh;
    border-radius: 16px;
    box-shadow:
      0 8px 32px rgba(15, 23, 42, 0.12),
      0 0 0 1px rgba(15, 23, 42, 0.06);
    overflow: hidden;
  }
  .shell-outer--framed[data-viewport-frame='tablet'] .shell {
    width: 100%;
    max-width: 768px;
    min-height: 80dvh;
    border-radius: 12px;
    box-shadow:
      0 8px 32px rgba(15, 23, 42, 0.1),
      0 0 0 1px rgba(15, 23, 42, 0.06);
    overflow: hidden;
  }
  .shell-outer--framed[data-viewport-frame='desktop'] .shell {
    width: 100%;
    max-width: 1280px;
    min-height: 80dvh;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
    overflow: hidden;
  }
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
  .hide-mobile {
    display: none;
  }
  .shell__bottom {
    flex-shrink: 0;
  }
  @media (min-width: 768px) {
    .shell[data-viewport-preview='system'] .hide-mobile {
      display: block;
    }
    .shell[data-viewport-preview='system'] .hide-desktop {
      display: none;
    }
    .shell__main {
      padding: 0 1.5rem 1.5rem;
    }
  }

  /* Forced viewport preview overrides */
  .shell[data-viewport-preview='mobile'] .hide-mobile {
    display: none !important;
  }
  .shell[data-viewport-preview='mobile'] .hide-desktop {
    display: block !important;
  }
  .shell[data-viewport-preview='tablet'] .hide-mobile {
    display: block !important;
  }
  .shell[data-viewport-preview='tablet'] .hide-desktop {
    display: none !important;
  }
  .shell[data-viewport-preview='desktop'] .hide-mobile {
    display: block !important;
  }
  .shell[data-viewport-preview='desktop'] .hide-desktop {
    display: none !important;
  }
</style>
