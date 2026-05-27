<script lang="ts">
  interface Props {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    value?: string;
    error?: string | null;
    testId?: string;
    hintId?: string;
    oninput?: (value: string) => void;
    onblur?: () => void;
  }

  let {
    id,
    label,
    type = 'text',
    value = $bindable(''),
    error = null,
    testId,
    hintId,
    oninput,
    onblur
  }: Props = $props();

  let passwordVisible = $state(false);

  const isPasswordField = $derived(type === 'password');
  const inputType = $derived(isPasswordField && passwordVisible ? 'text' : type);
  const errorId = $derived(`${id}-error`);
  const visibilityToggleTestId = $derived(
    testId ? `${testId}-visibility-toggle` : `${id}-visibility-toggle`
  );
  const describedBy = $derived(
    [hintId, error ? errorId : null].filter((part): part is string => !!part).join(' ') || undefined
  );

  function handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    value = target.value;
    oninput?.(target.value);
  }

  function handleBlur() {
    onblur?.();
  }

  function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
  }
</script>

<div class="field">
  <label class="field__label" for={id}>{label}</label>
  {#if isPasswordField}
    <div class="field__control">
      <input
        {id}
        type={inputType}
        class="field__input field__input--with-toggle"
        class:field__input--error={!!error}
        bind:value
        data-testid={testId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        oninput={handleInput}
        onblur={handleBlur}
      />
      <button
        type="button"
        class="field__visibility"
        data-testid={visibilityToggleTestId}
        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
        aria-pressed={passwordVisible}
        onclick={togglePasswordVisibility}
      >
        {#if passwordVisible}
          <svg
            class="field__visibility-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
            />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <path d="M1 1l22 22" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          </svg>
        {:else}
          <svg
            class="field__visibility-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        {/if}
      </button>
    </div>
  {:else}
    <input
      {id}
      type={inputType}
      class="field__input"
      class:field__input--error={!!error}
      bind:value
      data-testid={testId}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      oninput={handleInput}
      onblur={handleBlur}
    />
  {/if}
  {#if error}
    <p class="field__error" id={errorId} role="alert">{error}</p>
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
  .field__control {
    position: relative;
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
  .field__input--with-toggle {
    padding-right: 2.75rem;
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
  .field__visibility {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--auth-muted, #64748b);
    cursor: pointer;
  }
  .field__visibility:hover {
    color: var(--auth-text, #0f172a);
    background: var(--auth-primary-soft, #dbeafe);
  }
  .field__visibility:focus-visible {
    outline: 2px solid var(--auth-primary, #2563eb);
    outline-offset: 2px;
  }
  .field__visibility-icon {
    width: 1.125rem;
    height: 1.125rem;
  }
  .field__error {
    margin: 0.375rem 0 0;
    font-size: 0.8125rem;
    color: var(--auth-danger, #dc2626);
  }
</style>
