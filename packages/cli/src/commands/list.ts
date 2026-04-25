import { formatRegistryListLine, listRegistryItems } from "../registry/index.js";
import type { RegistryKind } from "../registry/load-item.js";
import { createLogger, type Logger } from "../utils/logger.js";

export interface ListCommandOptions {
  logger?: Logger;
  registryRoot?: string;
  kind?: RegistryKind;
  category?: string;
  scenario?: string;
}

export async function runListCommand(options: ListCommandOptions = {}) {
  const logger = options.logger ?? createLogger();
  const entries = await listRegistryItems({
    registryRoot: options.registryRoot,
    kind: options.kind,
    category: options.category,
    scenario: options.scenario
  });

  if (entries.length === 0) {
    logger.warn("No registry items found.");
    return [];
  }

  logger.info(`Found ${entries.length} registry item(s).`);
  for (const entry of entries) {
    logger.info(`- ${formatRegistryListLine(entry)}`);
  }

  return entries;
}
