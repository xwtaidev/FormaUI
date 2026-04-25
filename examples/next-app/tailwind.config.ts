import type { Config } from "tailwindcss";

import { formaUIPreset } from "@formaui/tailwind-preset";

const config: Config = {
  presets: [formaUIPreset as unknown as Partial<Config>],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/components/src/**/*.{ts,tsx}",
    "../../packages/blocks/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};

export default config;
