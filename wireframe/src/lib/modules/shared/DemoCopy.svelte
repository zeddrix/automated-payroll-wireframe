<script lang="ts">
  import type { Snippet } from 'svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

{#if demoLook.enabled}
  {@render children()}
{/if}
