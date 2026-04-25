export const semantic = {
  surface: {
    base: "hsl(var(--semantic-surface-base))",
    raised: "hsl(var(--semantic-surface-raised))",
    muted: "hsl(var(--semantic-surface-muted))"
  },
  text: {
    primary: "hsl(var(--semantic-text-primary))",
    secondary: "hsl(var(--semantic-text-secondary))"
  },
  border: {
    default: "hsl(var(--semantic-border-default))"
  },
  interactive: {
    primary: "hsl(var(--semantic-interactive-primary))",
    primaryForeground: "hsl(var(--semantic-interactive-primary-foreground))"
  },
  status: {
    success: "hsl(var(--semantic-status-success))",
    warning: "hsl(var(--semantic-status-warning))",
    danger: "hsl(var(--semantic-status-danger))",
    info: "hsl(var(--semantic-status-info))"
  },
  modelSelector: {
    chipBackground: "hsl(var(--semantic-model-chip-bg))",
    chipBorder: "hsl(var(--semantic-model-chip-border))",
    chipForeground: "hsl(var(--semantic-model-chip-foreground))",
    chipSelectedBackground: "hsl(var(--semantic-model-chip-selected-bg))",
    chipSelectedBorder: "hsl(var(--semantic-model-chip-selected-border))",
    chipSelectedForeground: "hsl(var(--semantic-model-chip-selected-foreground))"
  }
} as const;
