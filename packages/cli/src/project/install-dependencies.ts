import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { execa } from "execa";

import type { PackageManager } from "./detect-project.js";

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface DependencyRequirements {
  dependencies: string[];
  devDependencies: string[];
}

export interface InstallCommand {
  command: string;
  args: string[];
}

export type InstallCommandRunner = (
  command: string,
  args: string[],
  options: { cwd: string }
) => Promise<void>;

export interface InstallDependenciesOptions {
  cwd: string;
  packageManager: PackageManager;
  requirements: DependencyRequirements;
  runner?: InstallCommandRunner;
}

export interface InstallDependenciesResult {
  packageManager: Exclude<PackageManager, "unknown">;
  dependencies: string[];
  devDependencies: string[];
  commands: InstallCommand[];
}

export class DependencyInstallError extends Error {
  constructor(
    public readonly command: InstallCommand,
    public readonly packageManager: Exclude<PackageManager, "unknown">,
    public readonly causeError: unknown
  ) {
    const reason = causeError instanceof Error ? causeError.message : String(causeError);
    super(`Dependency installation failed: \`${command.command} ${command.args.join(" ")}\` (${reason})`);
    this.name = "DependencyInstallError";
  }
}

async function readPackageJson(cwd: string): Promise<PackageJson> {
  const packageJsonPath = resolve(cwd, "package.json");
  const content = await readFile(packageJsonPath, "utf8");
  return JSON.parse(content) as PackageJson;
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function resolvePackageManager(packageManager: PackageManager): Exclude<PackageManager, "unknown"> {
  if (packageManager === "unknown") {
    return "npm";
  }
  return packageManager;
}

function createInstallCommands(
  packageManager: Exclude<PackageManager, "unknown">,
  requirements: DependencyRequirements
) {
  const commands: InstallCommand[] = [];

  if (requirements.dependencies.length > 0) {
    if (packageManager === "pnpm") {
      commands.push({ command: "pnpm", args: ["add", ...requirements.dependencies] });
    } else if (packageManager === "yarn") {
      commands.push({ command: "yarn", args: ["add", ...requirements.dependencies] });
    } else if (packageManager === "bun") {
      commands.push({ command: "bun", args: ["add", ...requirements.dependencies] });
    } else {
      commands.push({ command: "npm", args: ["install", ...requirements.dependencies] });
    }
  }

  if (requirements.devDependencies.length > 0) {
    if (packageManager === "pnpm") {
      commands.push({ command: "pnpm", args: ["add", "-D", ...requirements.devDependencies] });
    } else if (packageManager === "yarn") {
      commands.push({ command: "yarn", args: ["add", "-D", ...requirements.devDependencies] });
    } else if (packageManager === "bun") {
      commands.push({ command: "bun", args: ["add", "-d", ...requirements.devDependencies] });
    } else {
      commands.push({ command: "npm", args: ["install", "-D", ...requirements.devDependencies] });
    }
  }

  return commands;
}

export async function resolveMissingDependencies(options: {
  cwd: string;
  requirements: DependencyRequirements;
}) {
  const packageJson = await readPackageJson(options.cwd);
  const existing = new Set<string>([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {})
  ]);

  const dependencies = unique(options.requirements.dependencies)
    .filter((dependency) => !existing.has(dependency))
    .sort();

  const dependencySet = new Set(dependencies);
  const devDependencies = unique(options.requirements.devDependencies)
    .filter((dependency) => !existing.has(dependency) && !dependencySet.has(dependency))
    .sort();

  return {
    dependencies,
    devDependencies
  };
}

async function defaultRunner(command: string, args: string[], options: { cwd: string }) {
  await execa(command, args, {
    cwd: options.cwd,
    stdio: "inherit"
  });
}

export async function installDependencies(
  options: InstallDependenciesOptions
): Promise<InstallDependenciesResult> {
  const packageManager = resolvePackageManager(options.packageManager);
  const missing = await resolveMissingDependencies({
    cwd: options.cwd,
    requirements: options.requirements
  });

  const commands = createInstallCommands(packageManager, missing);
  const runner = options.runner ?? defaultRunner;

  for (const command of commands) {
    try {
      await runner(command.command, command.args, { cwd: options.cwd });
    } catch (error) {
      throw new DependencyInstallError(command, packageManager, error);
    }
  }

  return {
    packageManager,
    dependencies: missing.dependencies,
    devDependencies: missing.devDependencies,
    commands
  };
}
