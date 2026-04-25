export const defaultTheme = `:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 4%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --border: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.75rem;
  --semantic-surface-base: var(--background);
  --semantic-surface-raised: var(--card);
  --semantic-surface-muted: var(--muted);
  --semantic-text-primary: var(--foreground);
  --semantic-text-secondary: var(--muted-foreground);
  --semantic-border-default: var(--border);
  --semantic-interactive-primary: var(--primary);
  --semantic-interactive-primary-foreground: var(--primary-foreground);
  --semantic-status-success: 142 71% 45%;
  --semantic-status-warning: 38 92% 50%;
  --semantic-status-danger: 0 84% 60%;
  --semantic-status-info: 214 95% 60%;
  --semantic-model-chip-bg: var(--muted);
  --semantic-model-chip-border: var(--border);
  --semantic-model-chip-foreground: var(--foreground);
  --semantic-model-chip-selected-bg: var(--primary);
  --semantic-model-chip-selected-border: var(--primary);
  --semantic-model-chip-selected-foreground: var(--primary-foreground);
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --card: 240 10% 6%;
  --card-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --border: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
  --semantic-surface-base: var(--background);
  --semantic-surface-raised: var(--card);
  --semantic-surface-muted: var(--muted);
  --semantic-text-primary: var(--foreground);
  --semantic-text-secondary: var(--muted-foreground);
  --semantic-border-default: var(--border);
  --semantic-interactive-primary: var(--primary);
  --semantic-interactive-primary-foreground: var(--primary-foreground);
  --semantic-status-success: 142 58% 58%;
  --semantic-status-warning: 40 95% 64%;
  --semantic-status-danger: 0 91% 71%;
  --semantic-status-info: 214 95% 72%;
  --semantic-model-chip-bg: var(--card);
  --semantic-model-chip-border: var(--border);
  --semantic-model-chip-foreground: var(--foreground);
  --semantic-model-chip-selected-bg: var(--primary);
  --semantic-model-chip-selected-border: var(--primary);
  --semantic-model-chip-selected-foreground: var(--primary-foreground);
}
`;

export const avocadoTheme = `/* Accent reference: #A8C66C */
:root {
  --background: 90 33% 98%;
  --foreground: 110 20% 16%;
  --card: 0 0% 100%;
  --card-foreground: 110 20% 16%;
  --primary: 89 43% 60%;
  --primary-foreground: 110 30% 12%;
  --muted: 90 30% 94%;
  --muted-foreground: 110 12% 38%;
  --border: 90 24% 85%;
  --ring: 89 43% 55%;
  --radius: 0.75rem;
  --semantic-surface-base: var(--background);
  --semantic-surface-raised: var(--card);
  --semantic-surface-muted: var(--muted);
  --semantic-text-primary: var(--foreground);
  --semantic-text-secondary: var(--muted-foreground);
  --semantic-border-default: var(--border);
  --semantic-interactive-primary: var(--primary);
  --semantic-interactive-primary-foreground: var(--primary-foreground);
  --semantic-status-success: 124 52% 42%;
  --semantic-status-warning: 36 82% 52%;
  --semantic-status-danger: 0 76% 57%;
  --semantic-status-info: 201 79% 48%;
  --semantic-model-chip-bg: var(--muted);
  --semantic-model-chip-border: var(--border);
  --semantic-model-chip-foreground: var(--foreground);
  --semantic-model-chip-selected-bg: var(--primary);
  --semantic-model-chip-selected-border: var(--primary);
  --semantic-model-chip-selected-foreground: var(--primary-foreground);
}

.dark {
  --background: 110 18% 10%;
  --foreground: 90 25% 93%;
  --card: 110 16% 13%;
  --card-foreground: 90 25% 93%;
  --primary: 89 43% 60%;
  --primary-foreground: 110 26% 10%;
  --muted: 110 14% 18%;
  --muted-foreground: 90 16% 73%;
  --border: 110 12% 24%;
  --ring: 89 43% 60%;
  --semantic-surface-base: var(--background);
  --semantic-surface-raised: var(--card);
  --semantic-surface-muted: var(--muted);
  --semantic-text-primary: var(--foreground);
  --semantic-text-secondary: var(--muted-foreground);
  --semantic-border-default: var(--border);
  --semantic-interactive-primary: var(--primary);
  --semantic-interactive-primary-foreground: var(--primary-foreground);
  --semantic-status-success: 124 40% 64%;
  --semantic-status-warning: 36 88% 66%;
  --semantic-status-danger: 0 82% 70%;
  --semantic-status-info: 201 85% 68%;
  --semantic-model-chip-bg: var(--card);
  --semantic-model-chip-border: var(--border);
  --semantic-model-chip-foreground: var(--foreground);
  --semantic-model-chip-selected-bg: var(--primary);
  --semantic-model-chip-selected-border: var(--primary);
  --semantic-model-chip-selected-foreground: var(--primary-foreground);
}
`;

export const themes = {
  default: defaultTheme,
  avocado: avocadoTheme
} as const;
