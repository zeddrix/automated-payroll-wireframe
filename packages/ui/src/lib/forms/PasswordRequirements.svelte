<script lang="ts">
  import { PASSWORD_REQUIREMENTS, evaluatePasswordRequirements } from '@aps/mock-data';

  interface Props {
    password: string;
    testId?: string;
    requirementTestId?: (id: string) => string;
  }

  let {
    password,
    testId = 'auth-sign-up-password-requirements',
    requirementTestId
  }: Props = $props();

  const met = $derived(evaluatePasswordRequirements(password));
</script>

{#if password.length > 0}
  <ul class="pw-reqs" data-testid={testId} aria-live="polite">
    {#each PASSWORD_REQUIREMENTS as rule (rule.id)}
      <li
        class="pw-reqs__item"
        class:pw-reqs__item--met={met[rule.id]}
        data-testid={requirementTestId?.(rule.id) ?? `password-requirement-${rule.id}`}
        data-met={met[rule.id] ? 'true' : 'false'}
      >
        <span class="pw-reqs__mark" aria-hidden="true">{met[rule.id] ? '✓' : '○'}</span>
        {rule.label}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .pw-reqs {
    margin: 0 0 1rem;
    padding: 0;
    list-style: none;
    font-size: 0.8125rem;
    color: var(--auth-muted, #64748b);
  }
  .pw-reqs__item {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.25rem;
  }
  .pw-reqs__item--met {
    color: var(--auth-text, #0f172a);
  }
  .pw-reqs__mark {
    width: 1rem;
    flex-shrink: 0;
    text-align: center;
    font-size: 0.75rem;
  }
  .pw-reqs__item--met .pw-reqs__mark {
    color: #16a34a;
  }
</style>
