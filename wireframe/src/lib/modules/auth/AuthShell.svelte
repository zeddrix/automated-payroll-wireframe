<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AuthCard } from '@aps/ui';
  import ReferenceMockBanner from '../shared/ReferenceMockBanner.svelte';
  import { demoLook } from '../../state/wireframe-demo-look.svelte';

  interface FooterLink {
    label: string;
    href: string;
    testId?: string;
  }

  interface Props {
    panelTestId?: string;
    cardTestId?: string;
    children: Snippet;
    footerLinks?: FooterLink[];
  }

  let { panelTestId, cardTestId, children, footerLinks = [] }: Props = $props();
</script>

<div class="auth-shell" data-testid={panelTestId}>
  <div class="auth-shell__backdrop">
    <div class="auth-shell__inner">
      {#if demoLook.enabled}
        <div class="auth-shell__banner">
          <ReferenceMockBanner />
        </div>
      {/if}
      <AuthCard testId={cardTestId}>
        {@render children()}
        {#if footerLinks.length > 0}
          <nav class="auth-shell__footer" aria-label="Auth navigation">
            {#each footerLinks as link (link.href)}
              <a href={link.href} data-testid={link.testId}>{link.label}</a>
            {/each}
          </nav>
        {/if}
      </AuthCard>
    </div>
  </div>
</div>

<style>
  .auth-shell {
    margin: -0.5rem -0.5rem 0;
    padding: 0.5rem;
  }
  .auth-shell__backdrop {
    padding: 1rem var(--space-page-x, 0.75rem) 1.5rem;
    background: linear-gradient(
      165deg,
      var(--auth-page-gradient-start, #eff6ff) 0%,
      var(--auth-page-gradient-end, #f8fafc) 100%
    );
    border-radius: var(--auth-radius-md, 10px);
    min-height: 12rem;
  }
  .auth-shell__inner {
    max-width: min(100%, var(--content-max-auth-shell, 32rem));
    margin: 0 auto;
  }
  .auth-shell__banner :global(.banner) {
    border-color: var(--auth-border-focus, #93c5fd);
    background: var(--auth-primary-soft, #dbeafe);
    color: var(--auth-text, #0f172a);
    border-style: solid;
    margin-bottom: 1rem;
  }
  .auth-shell__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--auth-border, #e2e8f0);
  }
  .auth-shell__footer a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--auth-primary, #2563eb);
    text-decoration: none;
  }
  .auth-shell__footer a:hover {
    color: var(--auth-primary-hover, #1d4ed8);
    text-decoration: underline;
  }
</style>
