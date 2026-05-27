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
    variant?: 'lowfi' | 'hifi';
  }

  let { tabs, activeTabId, testId = selectors.moduleTabs, variant = 'lowfi' }: Props = $props();
</script>

<div
  class="module-tabs"
  class:module-tabs--hifi={variant === 'hifi'}
  data-testid={testId}
  role="tablist"
  aria-label="Module sections"
>
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
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem 0;
    border-bottom: 2px solid #d4d4d8;
  }
  .module-tabs__tab {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    color: #71717a;
    text-decoration: none;
    border: 1px dashed #d4d4d8;
    border-radius: 4px;
    background: #fff;
  }
  .module-tabs__tab.active {
    color: #18181b;
    font-weight: 600;
    border-style: solid;
    border-color: #71717a;
    background: #f4f4f5;
  }
  .module-tabs--hifi {
    border-bottom-color: var(--auth-border, #e2e8f0);
    gap: 0.375rem;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .module-tabs--hifi .module-tabs__tab {
    flex-shrink: 0;
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-sm, 6px);
    color: var(--auth-muted, #64748b);
    background: var(--auth-surface, #fff);
    transition:
      color 0.15s ease,
      border-color 0.15s ease,
      background 0.15s ease;
  }
  .module-tabs--hifi .module-tabs__tab:hover {
    color: var(--auth-primary, #2563eb);
    border-color: var(--auth-border-focus, #93c5fd);
  }
  .module-tabs--hifi .module-tabs__tab.active {
    color: var(--auth-primary, #2563eb);
    font-weight: 600;
    border-color: var(--auth-primary, #2563eb);
    background: var(--auth-primary-soft, #dbeafe);
  }
</style>
