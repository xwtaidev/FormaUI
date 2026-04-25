import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

export type PackageManager = "pnpm" | "yarn" | "npm" | "bun" | "unknown";

export interface ProjectInfo {
  root: string;
  packageManager: PackageManager;
  isReactProject: boolean;
  isNextProject: boolean;
  hasTypeScript: boolean;
  tailwindConfigPath: string | null;
  cssEntryPath: string;
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

async function pathExists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function hasDependency(packageJson: PackageJson, name: string) {
  return Boolean(packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name]);
}

async function detectPackageManager(root: string): Promise<PackageManager> {
  if (await pathExists(resolve(root, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (await pathExists(resolve(root, "yarn.lock"))) {
    return "yarn";
  }
  if (await pathExists(resolve(root, "package-lock.json"))) {
    return "npm";
  }
  if (await pathExists(resolve(root, "bun.lockb"))) {
    return "bun";
  }
  return "unknown";
}

async function detectTailwindConfig(root: string) {
  const candidates = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
    "tailwind.config.cjs"
  ];

  for (const candidate of candidates) {
    const fullPath = resolve(root, candidate);
    if (await pathExists(fullPath)) {
      return candidate;
    }
  }

  return null;
}

async function detectCssEntryPath(root: string) {
  const candidates = [
    "src/app/globals.css",
    "app/globals.css",
    "src/styles/globals.css",
    "styles/globals.css",
    "src/index.css"
  ];

  for (const candidate of candidates) {
    if (await pathExists(resolve(root, candidate))) {
      return candidate;
    }
  }

  return "src/styles/globals.css";
}

export async function detectProject(root: string): Promise<ProjectInfo> {
  const packageJsonPath = resolve(root, "package.json");
  const packageJsonContent = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent) as PackageJson;

  return {
    root,
    packageManager: await detectPackageManager(root),
    isReactProject: hasDependency(packageJson, "react"),
    isNextProject: hasDependency(packageJson, "next"),
    hasTypeScript: await pathExists(resolve(root, "tsconfig.json")),
    tailwindConfigPath: await detectTailwindConfig(root),
    cssEntryPath: await detectCssEntryPath(root)
  };
}
