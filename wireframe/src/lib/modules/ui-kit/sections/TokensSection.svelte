<script lang="ts">
  import { WireframeSection, blueTheme, devicePreview } from '@aps/ui';
  import { selectors } from '@aps/contracts';

  const typographySamples = [
    { label: 'XS (12px)', size: 12, weight: 500 },
    { label: 'SM (14px)', size: 14, weight: 500 },
    { label: 'Base (16px)', size: 16, weight: 500 },
    { label: 'LG (20px)', size: 20, weight: 600 },
    { label: 'XL (24px)', size: 24, weight: 700 },
    { label: '2XL (32px)', size: 32, weight: 800 }
  ] as const;

  const colorGroups = [
    { title: 'Blue theme', tokens: blueTheme.colors },
    { title: 'Device preview', tokens: devicePreview.colors }
  ] as const;

  const radiusGroups = [{ title: 'Blue theme radius', tokens: blueTheme.radius }] as const;
</script>

<div data-testid={selectors.uiKitTokensSection}>
  <WireframeSection title="Color tokens">
    <div class="grid">
      {#each colorGroups as group (group.title)}
        <div class="card">
          <div class="card__title">{group.title}</div>
          <div class="swatches">
            {#each Object.entries(group.tokens) as [key, hex] (key)}
              <div class="swatch">
                <div
                  class="swatch__chip"
                  style={`background: ${hex};`}
                  data-testid={selectors.uiKitColorSwatch(`${group.title}-${key}`)}
                  aria-hidden="true"
                ></div>
                <div class="swatch__meta">
                  <div class="swatch__key">{key}</div>
                  <div class="swatch__hex">{hex}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </WireframeSection>

  <WireframeSection title="Typography samples">
    <div class="type-stack">
      {#each typographySamples as sample (sample.label)}
        <div class="type-row">
          <div class="type-row__label">{sample.label}</div>
          <div
            class="type-row__sample"
            style={`font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: ${sample.size}px; font-weight: ${sample.weight};`}
          >
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
      {/each}
    </div>
  </WireframeSection>

  <WireframeSection title="Radius & shadow">
    <div class="grid">
      {#each radiusGroups as group (group.title)}
        <div class="card">
          <div class="card__title">{group.title}</div>
          <div class="samples">
            {#each Object.entries(group.tokens) as [key, value] (key)}
              <div class="sample">
                <div class="sample__box" style={`border-radius: ${value};`}></div>
                <div class="sample__meta">
                  <div class="sample__key">{key}</div>
                  <div class="sample__value">{value}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}

      <div class="card">
        <div class="card__title">Blue theme shadow</div>
        <div class="samples">
          <div class="sample">
            <div
              class="sample__box"
              style={`box-shadow: ${blueTheme.shadow.card}; border-radius: ${blueTheme.radius.md};`}
            ></div>
            <div class="sample__meta">
              <div class="sample__key">card</div>
              <div class="sample__value">{blueTheme.shadow.card}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WireframeSection>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .card {
    border: 2px solid #d4d4d8;
    border-radius: 8px;
    background: #fff;
    padding: 0.75rem;
  }
  .card__title {
    font-size: 0.8125rem;
    font-weight: 800;
    color: #18181b;
    margin-bottom: 0.5rem;
  }
  .swatches,
  .samples {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .swatch,
  .sample {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    border: 1px dashed #d4d4d8;
    border-radius: 8px;
    padding: 0.5rem 0.625rem;
    background: #fafafa;
  }
  .swatch__chip {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
  }
  .swatch__key,
  .sample__key {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #18181b;
  }
  .swatch__hex,
  .sample__value {
    font-size: 0.75rem;
    color: #52525b;
    word-break: break-word;
  }
  .sample__box {
    width: 3rem;
    height: 2rem;
    background: #ffffff;
    border: 2px solid #d4d4d8;
    flex-shrink: 0;
  }
  .type-stack {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .type-row {
    border: 1px dashed #d4d4d8;
    border-radius: 8px;
    padding: 0.625rem 0.75rem;
    background: #fff;
  }
  .type-row__label {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #71717a;
    margin-bottom: 0.25rem;
  }
  .type-row__sample {
    color: #18181b;
  }
  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
