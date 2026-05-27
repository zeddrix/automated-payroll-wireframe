/** Shared layout breakpoints and content width caps (source for CSS vars and docs). */

export const breakpoints = {
  sm: 640,
  md: 768
} as const;

export const devicePreviewWidths = {
  mobile: 390,
  tablet: 768,
  desktop: 1280
} as const;

export const contentMaxWidth = {
  auth: '32rem',
  authShell: '32rem'
} as const;
