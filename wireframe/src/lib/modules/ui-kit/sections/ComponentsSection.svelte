<script lang="ts">
  import { WireframeSection, AuthCard, AuthPageHeader, Button, Field, Modal, Table } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  let email = $state('demo@company.com');
  let password = $state('password123');
  let emailError = $state<string | null>(null);
  let checked = $state(false);
  let clickCount = $state(0);
  let modalOpen = $state(false);

  const tableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' }
  ] as const;

  const tableRows = [
    { name: 'Alex Rivera', role: 'Admin' },
    { name: 'Jamie Lee', role: 'Payroll' }
  ];
</script>

<div class="auth-components" data-testid={selectors.uiKitComponentsSection}>
  <WireframeSection title="Auth card">
    <AuthCard>
      <AuthPageHeader
        title="Component specimens"
        subtitle="Production-grade UI primitives and patterns."
        sectionTitle="Components"
      />

      <Field
        id="ui-kit-components-email"
        label="Email"
        type="email"
        bind:value={email}
        error={emailError}
        onblur={() => {
          emailError = email.includes('@') ? null : 'Enter a valid email.';
        }}
      />
      <Field
        id="ui-kit-components-password"
        label="Password"
        type="password"
        bind:value={password}
      />

      <div class="row">
        <Button
          variant="primary"
          disabled={false}
          testId={selectors.uiKitButtonPrimary}
          onclick={() => {
            clickCount += 1;
          }}
        >
          Primary
        </Button>
        <Button
          variant="ghost"
          disabled={false}
          testId={selectors.uiKitButtonGhost}
          onclick={() => {
            clickCount += 1;
          }}
        >
          Ghost
        </Button>
        <Button
          variant="primary"
          disabled={true}
          testId={selectors.uiKitButtonDisabled}
          onclick={() => {
            clickCount += 1;
          }}
        >
          Disabled
        </Button>
      </div>
      <p class="meta">Button clicks: {clickCount}</p>

      <div class="checkbox">
        <label class="checkbox__label">
          <input type="checkbox" class="checkbox__input" bind:checked />
          <span class="checkbox__text">Ad-hoc pattern: inline checkbox specimen</span>
        </label>
      </div>
    </AuthCard>
  </WireframeSection>

  <WireframeSection title="Modal">
    <Button
      variant="primary"
      disabled={false}
      testId={selectors.uiKitOpenModal}
      onclick={() => {
        modalOpen = true;
      }}
    >
      Open modal
    </Button>
  </WireframeSection>

  <WireframeSection title="Table">
    <Table columns={[...tableColumns]} rows={tableRows} testId={selectors.uiKitTable} />
  </WireframeSection>
</div>

<Modal
  open={modalOpen}
  title="Example modal"
  testId={selectors.uiKitModal}
  onclose={() => {
    modalOpen = false;
  }}
>
  <p class="modal-copy">Modal body content for wireframe review.</p>
  <Button
    variant="ghost"
    disabled={false}
    onclick={() => {
      modalOpen = false;
    }}
  >
    Close
  </Button>
</Modal>

<style>
  .row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .checkbox {
    margin-top: 1rem;
  }
  .meta {
    margin: 0.5rem 0 0;
    font-size: 0.8125rem;
    color: var(--auth-muted, #64748b);
  }
  .checkbox__label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--auth-text, #0f172a);
  }
  .checkbox__input {
    width: 1rem;
    height: 1rem;
    accent-color: var(--auth-primary, #2563eb);
  }
  .modal-copy {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    color: var(--auth-muted, #64748b);
  }
  @media (min-width: 768px) {
    .row {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
