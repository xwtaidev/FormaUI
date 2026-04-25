import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { detectProject } from "../project/detect-project.js";
import { writeFiles } from "../project/write-files.js";
import { createLogger, type Logger } from "../utils/logger.js";

const DEFAULT_THEME_CSS = `:root {
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
}
`;

const DEFAULT_UTILS = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

export interface InitCommandOptions {
  cwd?: string;
  yes?: boolean;
  logger?: Logger;
  confirmOverwrite?: (conflicts: string[]) => Promise<boolean>;
}

export async function runInitCommand(options: InitCommandOptions = {}) {
  const cwd = options.cwd ?? process.cwd();
  const logger = options.logger ?? createLogger();
  const project = await detectProject(cwd);

  if (!project.isReactProject) {
    throw new Error("`formaui init` requires a React project (react dependency not found).");
  }

  const formauiConfig = {
    $schema: "https://formaui.dev/schema.json",
    aliases: {
      components: "components",
      lib: "lib",
      styles: "styles"
    },
    css: {
      entry: project.cssEntryPath,
      variables: "styles/formaui.css"
    }
  };

  await mkdir(resolve(cwd, "components"), { recursive: true });

  await writeFiles({
    cwd,
    overwrite: options.yes ?? false,
    confirmOverwrite: options.confirmOverwrite,
    files: [
      {
        targetPath: "formaui.json",
        content: `${JSON.stringify(formauiConfig, null, 2)}\n`
      },
      {
        targetPath: "lib/utils.ts",
        content: DEFAULT_UTILS
      },
      {
        targetPath: "styles/formaui.css",
        content: DEFAULT_THEME_CSS
      }
    ]
  });

  logger.success("Initialized FormaUI configuration.");

  return {
    project,
    configPath: "formaui.json"
  };
}
