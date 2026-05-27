/** High-fidelity blue theme tokens for auth and polished wireframe screens */

export const hifiBlue = {
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

export const hifiBlueCssVars = {
  '--auth-primary': hifiBlue.colors.primary,
  '--auth-primary-hover': hifiBlue.colors.primaryHover,
  '--auth-primary-soft': hifiBlue.colors.primarySoft,
  '--auth-surface': hifiBlue.colors.surface,
  '--auth-border': hifiBlue.colors.border,
  '--auth-border-focus': hifiBlue.colors.borderFocus,
  '--auth-text': hifiBlue.colors.text,
  '--auth-muted': hifiBlue.colors.muted,
  '--auth-danger': hifiBlue.colors.danger,
  '--auth-danger-soft': hifiBlue.colors.dangerSoft,
  '--auth-radius-sm': hifiBlue.radius.sm,
  '--auth-radius-md': hifiBlue.radius.md,
  '--auth-radius-lg': hifiBlue.radius.lg,
  '--auth-shadow-card': hifiBlue.shadow.card,
  '--auth-page-gradient-start': hifiBlue.colors.pageGradientStart,
  '--auth-page-gradient-end': hifiBlue.colors.pageGradientEnd
} as const;
