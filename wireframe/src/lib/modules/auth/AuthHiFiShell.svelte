<script lang="ts">
  import type { Snippet } from 'svelte';
  import { AuthCard } from '@aps/ui';
  import ReferenceMockBanner from '../shared/ReferenceMockBanner.svelte';

  interface FooterLink {
    label: string;
    href: string;
  }

  interface Props {
    panelTestId?: string;
    children: Snippet;
    footerLinks?: FooterLink[];
  }

  let { panelTestId, children, footerLinks = [] }: Props = $props();
</script>

<div class="auth-hifi" data-testid={panelTestId}>
  <div class="auth-hifi__backdrop">
    <div class="auth-hifi__inner">
      <div class="auth-hifi__banner">
        <ReferenceMockBanner />
      </div>
      <AuthCard>
        {@render children()}
        {#if footerLinks.length > 0}
          <nav class="auth-hifi__footer" aria-label="Auth navigation">
            {#each footerLinks as link (link.href)}
              <a href={link.href}>{link.label}</a>
            {/each}
          </nav>
        {/if}
      </AuthCard>
    </div>
  </div>
</div>

<style>
  .auth-hifi {
    margin: -0.5rem -0.5rem 0;
    padding: 0.5rem;
  }
  .auth-hifi__backdrop {
    padding: 1rem 0.5rem 1.5rem;
    background: linear-gradient(
      165deg,
      var(--auth-page-gradient-start, #eff6ff) 0%,
      var(--auth-page-gradient-end, #f8fafc) 100%
    );
    border-radius: var(--auth-radius-md, 10px);
    min-height: 12rem;
  }
  .auth-hifi__inner {
    max-width: 36rem;
    margin: 0 auto;
  }
  .auth-hifi__banner :global(.banner) {
    border-color: var(--auth-border-focus, #93c5fd);
    background: var(--auth-primary-soft, #dbeafe);
    color: var(--auth-text, #0f172a);
    border-style: solid;
    margin-bottom: 1rem;
  }
  .auth-hifi__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--auth-border, #e2e8f0);
  }
  .auth-hifi__footer a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--auth-primary, #2563eb);
    text-decoration: none;
  }
  .auth-hifi__footer a:hover {
    color: var(--auth-primary-hover, #1d4ed8);
    text-decoration: underline;
  }
</style>
