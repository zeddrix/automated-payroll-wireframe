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
    margin-bottom: 0.75rem;
  }
  .field__label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #52525b;
    margin-bottom: 0.25rem;
  }
  .field__input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 2px solid #d4d4d8;
    border-radius: 4px;
    font-size: 0.875rem;
    background: #fafafa;
    box-sizing: border-box;
  }
  .field__input--error {
    border-color: #71717a;
    background: #f4f4f5;
  }
  .field__error {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #3f3f46;
  }
</style>
