<script lang="ts">
  import { selectors } from '@aps/contracts';
  import { demoLook } from '../state/wireframe-demo-look.svelte';

  function handleChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    demoLook.setEnabled(target.checked);
  }
</script>

<label class="demo-look-toggle" data-testid={selectors.demoLookLabel}>
  <input
    type="checkbox"
    bind:checked={demoLook.enabled}
    data-testid={selectors.demoLookCheckbox}
    onchange={handleChange}
  />
  Demo look
</label>

<style>
  .demo-look-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--auth-muted, #64748b);
    cursor: pointer;
    user-select: none;
  }
  .demo-look-toggle input {
    width: 0.875rem;
    height: 0.875rem;
    accent-color: var(--auth-primary, #2563eb);
    cursor: pointer;
  }
</style>
