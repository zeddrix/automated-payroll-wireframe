<script lang="ts">
  import {
    WireframeSection,
    LowFiButton,
    LowFiField,
    EmptyState,
    LoadingState,
    ErrorState,
    LowFiTable,
    LowFiModal
  } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  let modalOpen = $state(false);
  let fieldValue = $state('');
  let buttonClicks = $state(0);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' }
  ] as const;

  const rows = [
    { name: 'Payroll run #144', status: 'Ready' },
    { name: 'Payroll run #145', status: 'Draft' },
    { name: 'Payroll run #146', status: 'Blocked' }
  ] as const;
</script>

<div data-testid={selectors.uiKitLowFiSection}>
  <WireframeSection title="Buttons">
    <div class="row">
      <LowFiButton
        variant="primary"
        disabled={false}
        testId={selectors.uiKitButtonPrimary}
        onclick={() => {
          buttonClicks += 1;
        }}
      >
        Primary
      </LowFiButton>
      <LowFiButton
        variant="ghost"
        disabled={false}
        testId={selectors.uiKitButtonGhost}
        onclick={() => {
          buttonClicks += 1;
        }}
      >
        Ghost
      </LowFiButton>
      <LowFiButton
        variant="primary"
        disabled={true}
        testId={selectors.uiKitButtonDisabled}
        onclick={() => {
          buttonClicks += 1;
        }}
      >
        Disabled
      </LowFiButton>
    </div>
    <p class="meta">Button clicks: {buttonClicks}</p>
  </WireframeSection>

  <WireframeSection title="Fields">
    <LowFiField id="ui-kit-lowfi-field" label="Example field" bind:value={fieldValue} />
  </WireframeSection>

  <WireframeSection title="States">
    <div class="grid">
      <div class="state-card">
        <EmptyState title="Empty state" description="Nothing to show yet." testId="ui-kit-empty" />
      </div>
      <div class="state-card">
        <LoadingState message="Loading state — fetching records..." testId="ui-kit-loading" />
      </div>
      <div class="state-card">
        <ErrorState title="Error state" message="Something went wrong." testId="ui-kit-error" />
      </div>
    </div>
  </WireframeSection>

  <WireframeSection title="Table">
    <LowFiTable columns={[...columns]} rows={[...rows]} testId="ui-kit-table" />
  </WireframeSection>

  <WireframeSection title="Modal">
    <div class="row">
      <LowFiButton variant="primary" disabled={false} onclick={() => (modalOpen = true)}>
        Open modal
      </LowFiButton>
    </div>
  </WireframeSection>
</div>

<LowFiModal
  open={modalOpen}
  title="Low-fi modal demo"
  testId="ui-kit-modal"
  onclose={() => {
    modalOpen = false;
  }}
>
  <p class="modal-copy">
    This is a simple modal specimen. It should support an explicit close and clicking
    outside/escape.
  </p>
  <div class="row">
    <LowFiButton variant="ghost" disabled={false} onclick={() => (modalOpen = false)}
      >Close</LowFiButton
    >
  </div>
</LowFiModal>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .state-card {
    border: 2px dashed #d4d4d8;
    border-radius: 8px;
    padding: 0.75rem;
    background: #fff;
  }
  .modal-copy {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    color: #52525b;
    line-height: 1.45;
  }
  .meta {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    color: #71717a;
  }
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
