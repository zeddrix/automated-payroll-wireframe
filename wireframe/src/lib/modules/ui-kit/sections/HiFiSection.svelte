<script lang="ts">
  import { WireframeSection, AuthCard, AuthPageHeader, HiFiButton, HiFiField } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  let email = $state('demo@company.com');
  let password = $state('password123');
  let emailError = $state<string | null>(null);
  let checked = $state(false);
  let clickCount = $state(0);
</script>

<div class="auth-hifi" data-testid={selectors.uiKitHiFiSection}>
  <WireframeSection title="Auth card">
    <AuthCard>
      <AuthPageHeader
        title="Hi-fi specimens"
        subtitle="These components rely on the auth hi-fi CSS variables."
        sectionTitle="Components"
      />

      <HiFiField
        id="ui-kit-hifi-email"
        label="Email"
        type="email"
        bind:value={email}
        error={emailError}
        onblur={() => {
          emailError = email.includes('@') ? null : 'Enter a valid email.';
        }}
      />
      <HiFiField id="ui-kit-hifi-password" label="Password" type="password" bind:value={password} />

      <div class="row">
        <HiFiButton
          variant="primary"
          disabled={false}
          onclick={() => {
            clickCount += 1;
          }}
        >
          Primary
        </HiFiButton>
        <HiFiButton
          variant="ghost"
          disabled={false}
          onclick={() => {
            clickCount += 1;
          }}
        >
          Ghost
        </HiFiButton>
        <HiFiButton
          variant="primary"
          disabled={true}
          onclick={() => {
            clickCount += 1;
          }}
        >
          Disabled
        </HiFiButton>
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
</div>

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
  @media (min-width: 768px) {
    .row {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
