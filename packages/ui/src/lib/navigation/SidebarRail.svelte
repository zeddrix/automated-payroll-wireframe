<script lang="ts">
  import { selectors } from '@aps/contracts';

  interface NavItem {
    id: string;
    label: string;
    href: string;
  }

  interface Props {
    items: NavItem[];
    activeId: string;
    testId?: string;
  }

  let { items, activeId, testId = selectors.sidebarRail }: Props = $props();
</script>

<aside class="sidebar" data-testid={testId} aria-label="Main modules">
  <ul class="sidebar__list">
    {#each items as item (item.id)}
      <li>
        <a
          href={item.href}
          class="sidebar__link"
          class:active={item.id === activeId}
          data-testid={selectors.sidebarItem(item.id)}
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</aside>

<style>
  .sidebar {
    width: 12rem;
    flex-shrink: 0;
    border-right: 1px solid var(--auth-border, #e2e8f0);
    background: var(--auth-surface, #ffffff);
    padding: 1rem 0.5rem;
  }
  .sidebar__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .sidebar__link {
    display: block;
    padding: 0.5rem 0.75rem;
    color: var(--auth-muted, #64748b);
    text-decoration: none;
    border-radius: var(--auth-radius-sm, 6px);
    border: 1px solid transparent;
    font-size: 0.875rem;
    transition:
      color 0.15s ease,
      background 0.15s ease,
      border-color 0.15s ease;
  }
  .sidebar__link:hover {
    color: var(--auth-primary, #2563eb);
    background: var(--auth-primary-soft, #dbeafe);
  }
  .sidebar__link.active {
    background: var(--auth-primary-soft, #dbeafe);
    color: var(--auth-primary, #2563eb);
    font-weight: 600;
    border-color: var(--auth-border-focus, #93c5fd);
  }
</style>
