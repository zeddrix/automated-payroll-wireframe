<script lang="ts">
  export interface TableColumn<T> {
    key: keyof T & string;
    label: string;
  }

  interface Props<T extends Record<string, string>> {
    columns: TableColumn<T>[];
    rows: T[];
    testId?: string;
    onRowClick?: (row: T) => void;
  }

  let { columns, rows, testId, onRowClick }: Props<Record<string, string>> = $props();
</script>

<table class="table" data-testid={testId}>
  <thead>
    <tr>
      {#each columns as col (col.key)}
        <th>{col.label}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rows as row, i (i)}
      <tr
        class:clickable={!!onRowClick}
        onclick={() => onRowClick?.(row)}
        onkeydown={(e) => e.key === 'Enter' && onRowClick?.(row)}
        role={onRowClick ? 'button' : undefined}
        tabindex={onRowClick ? 0 : undefined}
      >
        {#each columns as col (col.key)}
          <td>{row[col.key]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  .table th,
  .table td {
    border: 1px solid var(--auth-border, #e2e8f0);
    padding: 0.625rem 0.75rem;
    text-align: left;
  }
  .table th {
    background: var(--auth-primary-soft, #dbeafe);
    font-weight: 600;
    color: var(--auth-text, #0f172a);
  }
  .table td {
    color: var(--auth-text, #0f172a);
  }
  tr.clickable {
    cursor: pointer;
  }
  tr.clickable:hover td {
    background: var(--auth-primary-soft, #dbeafe);
  }
</style>
