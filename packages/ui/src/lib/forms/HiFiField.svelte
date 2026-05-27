<script lang="ts">
  interface Props {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    value?: string;
    error?: string | null;
    testId?: string;
    oninput?: (value: string) => void;
  }

  let {
    id,
    label,
    type = 'text',
    value = $bindable(''),
    error = null,
    testId,
    oninput
  }: Props = $props();

  function handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    value = target.value;
    oninput?.(target.value);
  }
</script>

<div class="field">
  <label class="field__label" for={id}>{label}</label>
  <input
    {id}
    {type}
    class="field__input"
    class:field__input--error={!!error}
    bind:value
    data-testid={testId}
    oninput={handleInput}
  />
  {#if error}
    <p class="field__error" role="alert">{error}</p>
  {/if}
</div>

<style>
  .field {
    margin-bottom: 1rem;
  }
  .field__label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--auth-text, #0f172a);
    margin-bottom: 0.375rem;
  }
  .field__input {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--auth-border, #e2e8f0);
    border-radius: var(--auth-radius-sm, 6px);
    font-size: 0.9375rem;
    background: var(--auth-surface, #ffffff);
    color: var(--auth-text, #0f172a);
    box-sizing: border-box;
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease;
  }
  .field__input:focus {
    outline: none;
    border-color: var(--auth-primary, #2563eb);
    box-shadow: 0 0 0 3px var(--auth-primary-soft, #dbeafe);
  }
  .field__input--error {
    border-color: var(--auth-danger, #dc2626);
    background: var(--auth-danger-soft, #fef2f2);
  }
  .field__input--error:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  }
  .field__error {
    margin: 0.375rem 0 0;
    font-size: 0.8125rem;
    color: var(--auth-danger, #dc2626);
  }
</style>
