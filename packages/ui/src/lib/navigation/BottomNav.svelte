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

  let { items, activeId, testId = selectors.bottomNav }: Props = $props();
</script>

<nav class="bottom-nav" data-testid={testId} aria-label="Main modules">
  {#each items as item (item.id)}
    <a
      href={item.href}
      class="bottom-nav__item"
      class:active={item.id === activeId}
      data-testid={selectors.bottomNavItem(item.id)}
    >
      <span class="bottom-nav__label">{item.label}</span>
    </a>
  {/each}
</nav>

<style>
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-top: 2px solid #d4d4d8;
    background: #fff;
  }
  .bottom-nav__item {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.25rem;
    font-size: 0.75rem;
    color: #71717a;
    text-decoration: none;
    border-radius: 4px;
    border: 1px dashed transparent;
  }
  .bottom-nav__item.active {
    color: #18181b;
    font-weight: 600;
    border-color: #a1a1aa;
    background: #f4f4f5;
  }
</style>
