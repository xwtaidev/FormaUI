import { formatRegistryInfoLines, getRegistryItemInfo } from "../registry/index.js";
import type { RegistryKind } from "../registry/load-item.js";
import { createLogger, type Logger } from "../utils/logger.js";

export interface InfoCommandOptions {
  name: string;
  kind?: RegistryKind;
  logger?: Logger;
  registryRoot?: string;
}

export async function runInfoCommand(options: InfoCommandOptions) {
  const logger = options.logger ?? createLogger();
  const entry = await getRegistryItemInfo({
    name: options.name,
    kind: options.kind,
    registryRoot: options.registryRoot
  });

  for (const line of formatRegistryInfoLines(entry)) {
    logger.info(line);
  }

  return entry;
}
