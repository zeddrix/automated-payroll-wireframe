<script lang="ts">
  import { selectors } from '@aps/contracts';

  interface Props {
    message?: string;
    testId?: string;
  }

  let { message = 'Loading…', testId = selectors.loadingState }: Props = $props();
</script>

<div class="loading" data-testid={testId} role="status" aria-live="polite">
  <span class="loading__bar" aria-hidden="true"></span>
  <p class="loading__text">{message}</p>
</div>

<style>
  .loading {
    padding: 2rem 1rem;
    text-align: center;
    border: 2px dashed #d4d4d8;
    border-radius: 8px;
    background: #f4f4f5;
  }
  .loading__bar {
    display: block;
    width: 40%;
    height: 0.5rem;
    margin: 0 auto 0.75rem;
    background: repeating-linear-gradient(90deg, #d4d4d8, #d4d4d8 8px, #e4e4e7 8px, #e4e4e7 16px);
    border-radius: 4px;
  }
  .loading__text {
    margin: 0;
    font-size: 0.875rem;
    color: #71717a;
  }
</style>
