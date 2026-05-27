<script lang="ts">
  import { filterMockRoles, MOCK_AUDIT_SNIPPET } from '@aps/mock-data';
  import { selectors } from '@aps/contracts';
  import { WireframePage, WireframeSection, Button, Field, Modal, Table } from '@aps/ui';
  import ReferenceMockBanner from '../shared/ReferenceMockBanner.svelte';
  import DemoCopy from '../shared/DemoCopy.svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  const auditSectionTitle = $derived(demoLook.enabled ? 'Recent audit (mock)' : 'Recent audit');
  const rolesModalTitle = $derived(demoLook.enabled ? 'Roles (mock)' : 'Roles');

  let rolesModalOpen = $state(false);
  let filterQuery = $state('');

  const filteredRoles = $derived(filterMockRoles(filterQuery));

  const roleColumns = [
    { key: 'name', label: 'Role' },
    { key: 'scope', label: 'Scope' }
  ] as const;

  const roleRows = $derived(filteredRoles.map((r) => ({ name: r.name, scope: r.scope })));
</script>

<div data-testid={selectors.adminOverviewPanel}>
  <WireframePage title="Admin overview" subtitle="Roles & audit — reference pattern">
    {#snippet banner()}
      <DemoCopy>
        <ReferenceMockBanner />
      </DemoCopy>
    {/snippet}

    <WireframeSection title="Quick actions">
      <Button
        variant="primary"
        disabled={false}
        testId={selectors.adminOpenRolesModal}
        onclick={() => {
          rolesModalOpen = true;
        }}
      >
        Manage roles
      </Button>
    </WireframeSection>

    <WireframeSection title={auditSectionTitle}>
      <ul class="audit-list" data-testid={selectors.adminAuditSnippet}>
        {#each MOCK_AUDIT_SNIPPET as entry (entry.id)}
          <li>
            <strong>{entry.action}</strong>
            — {entry.actor} at {entry.at}
          </li>
        {/each}
      </ul>
    </WireframeSection>
  </WireframePage>
</div>

<Modal
  open={rolesModalOpen}
  title={rolesModalTitle}
  testId={selectors.adminRolesModal}
  onclose={() => {
    rolesModalOpen = false;
  }}
>
  <Field
    id="roles-filter"
    label="Filter roles"
    bind:value={filterQuery}
    testId={selectors.adminRolesFilter}
  />
  <Table columns={[...roleColumns]} rows={roleRows} testId={selectors.adminRolesTable} />
</Modal>

<style>
  .audit-list {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.875rem;
    color: #52525b;
  }
</style>
