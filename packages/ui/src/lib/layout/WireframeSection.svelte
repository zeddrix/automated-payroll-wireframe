<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    children: Snippet;
    testId?: string;
  }

  let { title, children, testId }: Props = $props();
</script>

<section class="wf-section" data-testid={testId}>
  {#if title}
    <h2 class="wf-section__title">{title}</h2>
  {/if}
  {@render children()}
</section>

<style>
  .wf-section {
    margin-bottom: 1.25rem;
    padding: 1rem;
    border: 2px dashed #d4d4d8;
    border-radius: 8px;
    background: #fff;
  }
  .wf-section__title {
    margin: 0 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #52525b;
  }
</style>
