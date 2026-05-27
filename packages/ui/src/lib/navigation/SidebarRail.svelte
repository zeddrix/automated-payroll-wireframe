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
    border-right: 2px solid #d4d4d8;
    background: #fafafa;
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
    color: #52525b;
    text-decoration: none;
    border-radius: 4px;
    border: 1px dashed transparent;
    font-size: 0.875rem;
  }
  .sidebar__link.active {
    background: #e4e4e7;
    color: #18181b;
    font-weight: 600;
    border-color: #a1a1aa;
  }
</style>
