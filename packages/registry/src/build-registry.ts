import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { componentRegistryItems } from "./items/components.js";
import { themeRegistryItems } from "./items/themes.js";
import type { RegistryItem } from "./schema.js";
import { validateRegistryItems } from "./validate.js";

export interface BuildRegistryOptions {
  repoRoot?: string;
}

async function writeRegistryGroup(options: {
  outputDir: string;
  items: RegistryItem[];
}) {
  await mkdir(options.outputDir, { recursive: true });
  await Promise.all(
    options.items.map(async (item) => {
      const outputPath = resolve(options.outputDir, `${item.name}.json`);
      await writeFile(outputPath, `${JSON.stringify(item, null, 2)}\n`, "utf8");
    })
  );
}

export async function buildRegistry(options: BuildRegistryOptions = {}) {
  const currentFileDir = dirname(fileURLToPath(import.meta.url));
  const repoRoot = options.repoRoot ?? resolve(currentFileDir, "../../..");
  const allItems = [...componentRegistryItems, ...themeRegistryItems];

  const validation = validateRegistryItems(allItems, {
    checkFiles: true,
    repoRoot
  });

  if (!validation.valid) {
    const message = validation.issues
      .map((issue) => `- ${issue.field}: ${issue.message}`)
      .join("\n");
    throw new Error(`Registry validation failed:\n${message}`);
  }

  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/components"),
    items: componentRegistryItems
  });
  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/themes"),
    items: themeRegistryItems
  });

  return {
    components: componentRegistryItems.length,
    themes: themeRegistryItems.length
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildRegistry()
    .then((summary) => {
      console.log(
        `Generated ${summary.components} component items and ${summary.themes} theme items.`
      );
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
