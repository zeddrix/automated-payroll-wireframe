import { devicePreviewWidths } from './layout-tokens.js';

export const devicePreview = {
  colors: {
    stage: '#e2e8f0',
    bezel: '#1e293b',
    bezelLight: '#334155',
    screen: '#ffffff',
    statusBar: '#0f172a'
  },
  widths: {
    mobile: `${devicePreviewWidths.mobile}px`,
    tablet: `${devicePreviewWidths.tablet}px`,
    desktop: `${devicePreviewWidths.desktop}px`
  }
} as const;
