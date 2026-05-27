/** Blue theme tokens for auth and polished wireframe screens */

export const blueTheme = {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primarySoft: '#dbeafe',
    surface: '#ffffff',
    border: '#e2e8f0',
    borderFocus: '#93c5fd',
    text: '#0f172a',
    muted: '#64748b',
    danger: '#dc2626',
    dangerSoft: '#fef2f2',
    pageGradientStart: '#eff6ff',
    pageGradientEnd: '#f8fafc'
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px'
  },
  shadow: {
    card: '0 4px 24px rgba(37, 99, 235, 0.08), 0 1px 3px rgba(15, 23, 42, 0.06)'
  }
} as const;

export const blueThemeCssVars = {
  '--auth-primary': blueTheme.colors.primary,
  '--auth-primary-hover': blueTheme.colors.primaryHover,
  '--auth-primary-soft': blueTheme.colors.primarySoft,
  '--auth-surface': blueTheme.colors.surface,
  '--auth-border': blueTheme.colors.border,
  '--auth-border-focus': blueTheme.colors.borderFocus,
  '--auth-text': blueTheme.colors.text,
  '--auth-muted': blueTheme.colors.muted,
  '--auth-danger': blueTheme.colors.danger,
  '--auth-danger-soft': blueTheme.colors.dangerSoft,
  '--auth-radius-sm': blueTheme.radius.sm,
  '--auth-radius-md': blueTheme.radius.md,
  '--auth-radius-lg': blueTheme.radius.lg,
  '--auth-shadow-card': blueTheme.shadow.card,
  '--auth-page-gradient-start': blueTheme.colors.pageGradientStart,
  '--auth-page-gradient-end': blueTheme.colors.pageGradientEnd
} as const;
