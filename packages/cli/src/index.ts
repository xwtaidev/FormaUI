#!/usr/bin/env node

import { runAddCommand } from "./commands/add.js";
import { runInitCommand } from "./commands/init.js";
import type { RegistryKind } from "./registry/load-item.js";

function printHelp() {
  console.log(`FormaUI CLI\n\nUsage:\n  formaui init\n  formaui add <name>\n  formaui block add <name>\n  formaui template add <name>\n  formaui theme add <name>\n\nOptions:\n  --cwd <path>   Target project directory\n  -y, --yes      Overwrite conflicting files without prompt`);
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

interface CliContext {
  cwd?: string;
  yes: boolean;
}

function parseContext(args: string[]): CliContext {
  return {
    cwd: parseFlagValue(args, "--cwd"),
    yes: hasFlag(args, "-y", "--yes")
  };
}

export async function runCli(argv = process.argv.slice(2)) {
  if (argv.length === 0 || hasFlag(argv, "-h", "--help")) {
    printHelp();
    return;
  }

  const context = parseContext(argv);
  const [command, maybeSubCommand, maybeName] = argv;
  if (!command) {
    printHelp();
    return;
  }

  if (command === "init") {
    await runInitCommand({
      cwd: context.cwd,
      yes: context.yes
    });
    return;
  }

  if (command === "add") {
    if (!maybeSubCommand) {
      throw new Error("Usage: formaui add <name>");
    }

    await runAddCommand({
      kind: "component",
      name: maybeSubCommand,
      cwd: context.cwd,
      yes: context.yes
    });
    return;
  }

  const groupedCommandMap: Record<string, RegistryKind> = {
    block: "block",
    template: "template",
    theme: "theme"
  };

  if (Object.prototype.hasOwnProperty.call(groupedCommandMap, command)) {
    if (maybeSubCommand !== "add" || !maybeName) {
      throw new Error(`Usage: formaui ${command} add <name>`);
    }
    const groupedKind = groupedCommandMap[command as keyof typeof groupedCommandMap];
    if (!groupedKind) {
      throw new Error(`Unsupported grouped command: ${command}`);
    }

    await runAddCommand({
      kind: groupedKind,
      name: maybeName,
      cwd: context.cwd,
      yes: context.yes
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
