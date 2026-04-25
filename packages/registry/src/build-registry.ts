import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { blockRegistryItems } from "./items/blocks.js";
import { componentRegistryItems } from "./items/components.js";
import { templateRegistryItems } from "./items/templates.js";
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
  const allItems = [
    ...componentRegistryItems,
    ...themeRegistryItems,
    ...blockRegistryItems,
    ...templateRegistryItems
  ];

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
  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/blocks"),
    items: blockRegistryItems
  });
  await writeRegistryGroup({
    outputDir: resolve(repoRoot, "registry/templates"),
    items: templateRegistryItems
  });

  return {
    components: componentRegistryItems.length,
    themes: themeRegistryItems.length,
    blocks: blockRegistryItems.length,
    templates: templateRegistryItems.length
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildRegistry()
    .then((summary) => {
      console.log(
        `Generated ${summary.components} component items, ${summary.themes} theme items, ${summary.blocks} block items, and ${summary.templates} template items.`
      );
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
