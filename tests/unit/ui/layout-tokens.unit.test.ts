import { describe, expect, it } from 'vitest';
import { breakpoints, contentMaxWidth, devicePreviewWidths, devicePreview } from '@aps/ui';

describe('layout tokens', () => {
  it('orders breakpoints for shell and auth card steps', () => {
    expect(breakpoints.sm).toBeLessThan(breakpoints.md);
  });

  it('aligns device preview theme widths with layout token numbers', () => {
    expect(devicePreview.widths.mobile).toBe(`${devicePreviewWidths.mobile}px`);
    expect(devicePreview.widths.tablet).toBe(`${devicePreviewWidths.tablet}px`);
    expect(devicePreview.widths.desktop).toBe(`${devicePreviewWidths.desktop}px`);
  });

  it('uses matching auth content max widths for card and shell', () => {
    expect(contentMaxWidth.auth).toBe('32rem');
    expect(contentMaxWidth.authShell).toBe(contentMaxWidth.auth);
  });
});
