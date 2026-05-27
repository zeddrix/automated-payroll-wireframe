<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    subtitle?: string;
    children: Snippet;
    banner?: Snippet;
  }

  let { title, subtitle, children, banner }: Props = $props();
</script>

<div class="wf-page">
  {#if banner}
    <div class="wf-page__banner">
      {@render banner()}
    </div>
  {/if}
  <header class="wf-page__header">
    <h1 class="wf-page__title">{title}</h1>
    {#if subtitle}
      <p class="wf-page__subtitle">{subtitle}</p>
    {/if}
  </header>
  <div class="wf-page__body">
    {@render children()}
  </div>
</div>

<style>
  .wf-page__header {
    margin-bottom: 1rem;
  }
  .wf-page__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #18181b;
  }
  .wf-page__subtitle {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #71717a;
  }
  .wf-page__banner {
    margin-bottom: 0.75rem;
  }
</style>
