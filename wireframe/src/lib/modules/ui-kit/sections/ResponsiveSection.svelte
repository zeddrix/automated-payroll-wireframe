<script lang="ts">
  import {
    WireframeSection,
    AuthCard,
    AuthPageHeader,
    breakpoints,
    devicePreviewWidths
  } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  const rules = [
    {
      name: 'Device preview frame',
      applies: 'Container (@container wireframe-screen)',
      narrow: `${devicePreviewWidths.mobile}px`,
      tablet: `${devicePreviewWidths.tablet}px`,
      wide: `${devicePreviewWidths.desktop}px`
    },
    {
      name: 'Shell navigation',
      applies: 'Browser viewport',
      narrow: 'Bottom nav',
      tablet: 'Bottom nav',
      wide: `Sidebar rail (≥ ${breakpoints.md}px)`
    },
    {
      name: 'Auth card max width',
      applies: 'Container',
      narrow: '100% of frame',
      tablet: '28rem',
      wide: '32rem'
    }
  ] as const;
</script>

<div data-testid={selectors.uiKitResponsiveSection}>
  <WireframeSection title="Responsive rules">
    <p class="intro">
      Device preview resizes content inside the frame only. Shell sidebar vs bottom nav follows your
      browser window width, not the preview tabbar.
    </p>
    <table class="rules-table">
      <thead>
        <tr>
          <th>Rule</th>
          <th>Applies to</th>
          <th>Mobile / narrow</th>
          <th>Tablet</th>
          <th>Desktop / wide</th>
        </tr>
      </thead>
      <tbody>
        {#each rules as rule (rule.name)}
          <tr>
            <td>{rule.name}</td>
            <td>{rule.applies}</td>
            <td>{rule.narrow}</td>
            <td>{rule.tablet}</td>
            <td>{rule.wide}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </WireframeSection>

  <WireframeSection title="Live auth card specimen">
    <AuthCard>
      <AuthPageHeader
        title="Responsive specimen"
        subtitle="Card width follows the preview frame container."
        sectionTitle="Auth"
      />
      <p class="specimen-copy">
        Resize preview mode or narrow the browser to see padding and width adapt.
      </p>
    </AuthCard>
  </WireframeSection>
</div>

<style>
  .intro {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    color: var(--auth-muted, #64748b);
    line-height: 1.5;
  }
  .rules-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
  }
  .rules-table th,
  .rules-table td {
    border: 1px solid var(--auth-border, #e2e8f0);
    padding: 0.5rem 0.625rem;
    text-align: left;
    vertical-align: top;
  }
  .rules-table th {
    background: var(--auth-primary-soft, #dbeafe);
    font-weight: 700;
  }
  .specimen-copy {
    margin: 0;
    font-size: var(--text-body, 0.9375rem);
    color: var(--auth-muted, #64748b);
  }
</style>
