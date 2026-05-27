<script lang="ts">
  import { selectors } from '@aps/contracts';

  interface TabItem {
    id: string;
    label: string;
    href: string;
  }

  interface Props {
    tabs: TabItem[];
    activeTabId: string;
    testId?: string;
  }

  let { tabs, activeTabId, testId = selectors.moduleTabs }: Props = $props();
</script>

<div class="module-tabs" data-testid={testId} role="tablist" aria-label="Module sections">
  {#each tabs as tab (tab.id)}
    <a
      href={tab.href}
      role="tab"
      class="module-tabs__tab"
      class:active={tab.id === activeTabId}
      aria-selected={tab.id === activeTabId}
      data-testid={selectors.moduleTab(tab.id)}
    >
      {tab.label}
    </a>
  {/each}
</div>

<style>
  .module-tabs {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.375rem;
    padding: 0.75rem 0;
    border-bottom: 2px solid var(--auth-border, #e2e8f0);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .module-tabs__tab {
    flex-shrink: 0;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    text-decoration: none;
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-sm, 6px);
    color: var(--auth-muted, #64748b);
    background: var(--auth-surface, #fff);
    transition:
      color 0.15s ease,
      border-color 0.15s ease,
      background 0.15s ease;
  }
  .module-tabs__tab:hover {
    color: var(--auth-primary, #2563eb);
    border-color: var(--auth-border-focus, #93c5fd);
  }
  .module-tabs__tab.active {
    color: var(--auth-primary, #2563eb);
    font-weight: 600;
    border-color: var(--auth-primary, #2563eb);
    background: var(--auth-primary-soft, #dbeafe);
  }
</style>
