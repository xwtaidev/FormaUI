import { formatRegistryListLine, searchRegistryItems } from "../registry/index.js";
import type { RegistryKind } from "../registry/load-item.js";
import { createLogger, type Logger } from "../utils/logger.js";

export interface SearchCommandOptions {
  query: string;
  logger?: Logger;
  registryRoot?: string;
  kind?: RegistryKind;
  category?: string;
  scenario?: string;
}

export async function runSearchCommand(options: SearchCommandOptions) {
  const logger = options.logger ?? createLogger();
  const entries = await searchRegistryItems({
    query: options.query,
    registryRoot: options.registryRoot,
    kind: options.kind,
    category: options.category,
    scenario: options.scenario
  });

  if (entries.length === 0) {
    logger.warn(`No registry items matched query: ${options.query}`);
    return [];
  }

  logger.info(`Found ${entries.length} match(es) for "${options.query}".`);
  for (const entry of entries) {
    logger.info(`- ${formatRegistryListLine(entry)}`);
  }

  return entries;
}
