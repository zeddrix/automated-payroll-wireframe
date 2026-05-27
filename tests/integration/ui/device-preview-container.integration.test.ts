/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import { selectors } from '@aps/contracts';
import DevicePreviewHarness from './fixtures/DevicePreviewHarness.svelte';

describe('DevicePreviewFrame container layout', () => {
  it('marks preview screen as wireframe-screen layout container', () => {
    const { container } = render(DevicePreviewHarness, { props: { mode: 'mobile' } });

    const screen = container.querySelector(`[data-testid="${selectors.devicePreviewFrameScreen}"]`);
    expect(screen).not.toBeNull();
    expect(screen?.getAttribute('data-layout-container')).toBe('wireframe-screen');
    expect(screen?.className).toContain('device-frame__phone-screen');
  });

  it('marks system pass-through screen as layout container', () => {
    const { container } = render(DevicePreviewHarness, { props: { mode: 'system' } });

    const screen = container.querySelector(`[data-testid="${selectors.devicePreviewFrameScreen}"]`);
    expect(screen).not.toBeNull();
    expect(screen?.getAttribute('data-layout-container')).toBe('wireframe-screen');
    expect(screen?.className).toContain('device-frame__pass');
  });
});
