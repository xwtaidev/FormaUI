#!/usr/bin/env node

import { runAddCommand } from "./commands/add.js";
import { runDoctorCommand } from "./commands/doctor.js";
import { runInfoCommand } from "./commands/info.js";
import { runInitCommand } from "./commands/init.js";
import { runListCommand } from "./commands/list.js";
import { runSearchCommand } from "./commands/search.js";
import type { RegistryKind } from "./registry/load-item.js";
import type { Logger } from "./utils/logger.js";

function printHelp() {
  console.log(
    `FormaUI CLI\n\nUsage:\n  formaui init\n  formaui add <name>\n  formaui block add <name>\n  formaui template add <name>\n  formaui theme add <name>\n  formaui list [--kind <component|block|template|theme>]\n  formaui search <query>\n  formaui info <name> [--kind <component|block|template|theme>]\n  formaui doctor\n\nOptions:\n  --cwd <path>      Target project directory\n  --registry <path> Registry root directory\n  --dry-run         Print install plan without writing files\n  -y, --yes         Overwrite conflicting files without prompt`
  );
}

function parseFlagValue(args: string[], flag: string) {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
}

function hasFlag(args: string[], ...flags: string[]) {
  return flags.some((flag) => args.includes(flag));
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

function stripFlags(args: string[], flags: string[]) {
  return args.filter((arg) => !flags.includes(arg));
}

function stripGlobalArgs(args: string[]) {
  return stripFlags(
    stripFlagsWithValue(args, ["--cwd", "--registry"]),
    ["-y", "--yes", "--dry-run"]
  );
}

const REGISTRY_KINDS: RegistryKind[] = ["component", "block", "template", "theme"];

function parseRegistryKind(value?: string) {
  if (!value) {
    return undefined;
  }
  if (REGISTRY_KINDS.includes(value as RegistryKind)) {
    return value as RegistryKind;
  }
  throw new Error(`Invalid --kind value: ${value}`);
}

interface CliContext {
  cwd?: string;
  yes: boolean;
  dryRun: boolean;
  registryRoot?: string;
}

function parseContext(args: string[]): CliContext {
  return {
    cwd: parseFlagValue(args, "--cwd"),
    yes: hasFlag(args, "-y", "--yes"),
    dryRun: hasFlag(args, "--dry-run"),
    registryRoot: parseFlagValue(args, "--registry")
  };
}

export interface RunCliOptions {
  logger?: Logger;
  registryRoot?: string;
  confirmOverwrite?: (conflicts: string[]) => Promise<boolean>;
}

export async function runCli(argv = process.argv.slice(2), options: RunCliOptions = {}) {
  if (argv.length === 0 || hasFlag(argv, "-h", "--help")) {
    printHelp();
    return;
  }

  const context = parseContext(argv);
  const positionalArgs = stripGlobalArgs(argv);
  const [command, ...commandArgs] = positionalArgs;
  if (!command) {
    printHelp();
    return;
  }

  const registryRoot = context.registryRoot ?? options.registryRoot;
  const logger = options.logger;

  if (command === "init") {
    await runInitCommand({
      cwd: context.cwd,
      yes: context.yes,
      logger,
      confirmOverwrite: options.confirmOverwrite
    });
    return;
  }

  if (command === "add") {
    const [name] = commandArgs;
    if (!name) {
      throw new Error("Usage: formaui add <name>");
    }

    await runAddCommand({
      kind: "component",
      name,
      cwd: context.cwd,
      yes: context.yes,
      dryRun: context.dryRun,
      logger,
      registryRoot,
      confirmOverwrite: options.confirmOverwrite
    });
    return;
  }

  const groupedCommandMap: Record<string, RegistryKind> = {
    block: "block",
    template: "template",
    theme: "theme"
  };

  if (Object.prototype.hasOwnProperty.call(groupedCommandMap, command)) {
    const [subCommand, name] = commandArgs;
    if (subCommand !== "add" || !name) {
      throw new Error(`Usage: formaui ${command} add <name>`);
    }
    const groupedKind = groupedCommandMap[command as keyof typeof groupedCommandMap];
    if (!groupedKind) {
      throw new Error(`Unsupported grouped command: ${command}`);
    }

    await runAddCommand({
      kind: groupedKind,
      name,
      cwd: context.cwd,
      yes: context.yes,
      dryRun: context.dryRun,
      logger,
      registryRoot,
      confirmOverwrite: options.confirmOverwrite
    });
    return;
  }

  if (command === "list") {
    const kind = parseRegistryKind(parseFlagValue(commandArgs, "--kind"));
    await runListCommand({
      kind,
      logger,
      registryRoot
    });
    return;
  }

  if (command === "search") {
    const [query] = commandArgs;
    if (!query) {
      throw new Error("Usage: formaui search <query>");
    }
    await runSearchCommand({
      query,
      logger,
      registryRoot
    });
    return;
  }

  if (command === "info") {
    const kind = parseRegistryKind(parseFlagValue(commandArgs, "--kind"));
    const infoArgs = stripFlagsWithValue(commandArgs, ["--kind"]);
    const [name] = infoArgs;
    if (!name) {
      throw new Error("Usage: formaui info <name>");
    }
    await runInfoCommand({
      name,
      kind,
      logger,
      registryRoot
    });
    return;
  }

  if (command === "doctor") {
    await runDoctorCommand({
      cwd: context.cwd,
      logger
    });
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
