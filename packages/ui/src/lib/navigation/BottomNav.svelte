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
    border-top: 1px solid var(--auth-border, #e2e8f0);
    background: var(--auth-surface, #ffffff);
  }
  .bottom-nav__item {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.25rem;
    font-size: 0.75rem;
    color: var(--auth-muted, #64748b);
    text-decoration: none;
    border-radius: var(--auth-radius-sm, 6px);
    border: 1px solid transparent;
  }
  .bottom-nav__item.active {
    color: var(--auth-primary, #2563eb);
    font-weight: 600;
    border-color: var(--auth-border-focus, #93c5fd);
    background: var(--auth-primary-soft, #dbeafe);
  }
</style>
