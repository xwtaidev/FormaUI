import { runAddCommand } from "./add.js";
import { runInfoCommand } from "./info.js";
import { runListCommand } from "./list.js";
import type { InstallCommandRunner } from "../project/install-dependencies.js";
import type { Logger } from "../utils/logger.js";

function parseFlagValue(args: string[], flag: string) {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return args[index + 1];
}

function stripFlagsWithValue(args: string[], flags: string[]) {
  const strippedArgs: string[] = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg) {
      continue;
    }

    if (flags.includes(arg)) {
      i += 1;
      continue;
    }

    strippedArgs.push(arg);
  }

  return strippedArgs;
}

export interface PackCommandOptions {
  args: string[];
  cwd?: string;
  yes: boolean;
  dryRun: boolean;
  logger?: Logger;
  registryRoot?: string;
  confirmOverwrite?: (conflicts: string[]) => Promise<boolean>;
  installCommandRunner?: InstallCommandRunner;
}

export async function runPackCommand(options: PackCommandOptions) {
  const [subCommand, ...subArgs] = options.args;
  const category = parseFlagValue(subArgs, "--category");
  const scenario = parseFlagValue(subArgs, "--scenario");
  const valueFlags = ["--category", "--scenario"];
  const [name] = stripFlagsWithValue(subArgs, valueFlags);

  if (subCommand === "list") {
    return runListCommand({
      kind: "pack",
      category,
      scenario,
      logger: options.logger,
      registryRoot: options.registryRoot
    });
  }

  if (subCommand === "info") {
    if (!name) {
      throw new Error("Usage: formaui pack info <name>");
    }
    return runInfoCommand({
      name,
      kind: "pack",
      category,
      scenario,
      logger: options.logger,
      registryRoot: options.registryRoot
    });
  }

  if (subCommand === "add") {
    if (!name) {
      throw new Error("Usage: formaui pack add <name>");
    }
    return runAddCommand({
      kind: "pack",
      name,
      cwd: options.cwd,
      yes: options.yes,
      dryRun: options.dryRun,
      logger: options.logger,
      registryRoot: options.registryRoot,
      confirmOverwrite: options.confirmOverwrite,
      installCommandRunner: options.installCommandRunner
    });
  }

  throw new Error("Usage: formaui pack <list|info|add> [name]");
}
