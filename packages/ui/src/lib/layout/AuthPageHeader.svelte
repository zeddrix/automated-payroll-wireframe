<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
    subtitleTestId?: string;
    sectionTitle?: string;
  }

  let { title, subtitle, subtitleTestId, sectionTitle }: Props = $props();
</script>

<header class="auth-header">
  <h1 class="auth-header__title">{title}</h1>
  {#if subtitle}
    <p class="auth-header__subtitle" data-testid={subtitleTestId}>{subtitle}</p>
  {/if}
  {#if sectionTitle}
    <p class="auth-header__section">{sectionTitle}</p>
  {/if}
</header>

<style>
  .auth-header {
    margin-bottom: 1.25rem;
  }
  .auth-header__title {
    margin: 0;
    font-size: var(--text-title, 1.5rem);
    font-weight: 700;
    color: var(--auth-text, #0f172a);
    letter-spacing: -0.02em;
  }
  .auth-header__subtitle {
    margin: 0.375rem 0 0;
    font-size: 0.875rem;
    color: var(--auth-muted, #64748b);
    line-height: 1.5;
  }
  .auth-header__section {
    margin: 1rem 0 0;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--auth-muted, #64748b);
  }
</style>
