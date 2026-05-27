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
    border: 2px dashed #d4d4d8;
    border-radius: 8px;
    background: #fafafa;
  }
  .empty__title {
    margin: 0;
    font-weight: 600;
    color: #52525b;
  }
  .empty__desc {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: #71717a;
  }
</style>
