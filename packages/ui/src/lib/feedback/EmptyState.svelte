<script lang="ts">
  import { selectors } from '@aps/contracts';

  interface Props {
    title: string;
    description?: string;
    testId?: string;
  }

  let { title, description, testId = selectors.emptyState }: Props = $props();
</script>

<div class="empty" data-testid={testId}>
  <p class="empty__title">{title}</p>
  {#if description}
    <p class="empty__desc">{description}</p>
  {/if}
</div>

<style>
  .empty {
    padding: 2rem 1rem;
    text-align: center;
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-md, 10px);
    background: var(--auth-surface, #ffffff);
    box-shadow: var(--auth-shadow-card, 0 4px 24px rgba(37, 99, 235, 0.08));
  }
  .empty__title {
    margin: 0;
    font-weight: 600;
    color: var(--auth-text, #0f172a);
  }
  .empty__desc {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: var(--auth-muted, #64748b);
  }
</style>
