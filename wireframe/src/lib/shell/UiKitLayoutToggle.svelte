<script lang="ts">
  import { selectors } from '@aps/contracts';
  import { uiKitLayout, type UiKitLayoutMode } from '../state/wireframe-ui-kit-layout.svelte';

  const mode = $derived(uiKitLayout.mode);

  function setMode(next: UiKitLayoutMode) {
    uiKitLayout.setMode(next);
  }
</script>

<div
  class="toggle"
  role="radiogroup"
  aria-label="UI Kit layout"
  data-testid={selectors.uiKitLayoutToggle}
>
  <button
    type="button"
    class="toggle__option"
    class:toggle__option--active={mode === 'tabs'}
    role="radio"
    aria-checked={mode === 'tabs'}
    data-testid={selectors.uiKitLayoutTabs}
    onclick={() => setMode('tabs')}
  >
    Tabbed
  </button>
  <button
    type="button"
    class="toggle__option"
    class:toggle__option--active={mode === 'scroll'}
    role="radio"
    aria-checked={mode === 'scroll'}
    data-testid={selectors.uiKitLayoutScroll}
    onclick={() => setMode('scroll')}
  >
    Scroll
  </button>
</div>

<style>
  .toggle {
    display: inline-flex;
    border: 2px solid #d4d4d8;
    border-radius: 999px;
    overflow: hidden;
    background: #ffffff;
  }
  .toggle__option {
    appearance: none;
    border: none;
    background: transparent;
    padding: 0.35rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 700;
    color: #52525b;
    cursor: pointer;
  }
  .toggle__option--active {
    background: #e4e4e7;
    color: #18181b;
  }
  .toggle__option:focus-visible {
    outline: 2px solid #3f3f46;
    outline-offset: -2px;
  }
</style>
