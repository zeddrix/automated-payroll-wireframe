<script lang="ts">
  import { selectors } from '@aps/contracts';

  interface Props {
    title: string;
    message?: string;
    testId?: string;
  }

  let { title, message, testId = selectors.errorState }: Props = $props();
</script>

<div class="error" data-testid={testId} role="alert">
  <p class="error__title">{title}</p>
  {#if message}
    <p class="error__msg">{message}</p>
  {/if}
</div>

<style>
  .error {
    padding: 1rem;
    border: 2px solid #71717a;
    border-radius: 8px;
    background: #f4f4f5;
  }
  .error__title {
    margin: 0;
    font-weight: 600;
    color: #18181b;
  }
  .error__msg {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: #52525b;
  }
</style>
