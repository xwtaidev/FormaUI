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

export interface DoctorCheck {
  key: "package-json" | "react" | "tailwind" | "typescript" | "css-entry" | "formaui-config";
  label: string;
  hint: string;
  ok: boolean;
}

export interface DoctorReport {
  root: string;
  packageManager: PackageManager;
  checks: DoctorCheck[];
  healthy: boolean;
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

async function findCssEntryPath(root: string) {
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

  return null;
}

async function detectCssEntryPath(root: string) {
  return (await findCssEntryPath(root)) ?? "src/styles/globals.css";
}

async function readPackageJson(root: string) {
  try {
    const packageJsonPath = resolve(root, "package.json");
    const packageJsonContent = await readFile(packageJsonPath, "utf8");
    return JSON.parse(packageJsonContent) as PackageJson;
  } catch {
    return null;
  }
}

export async function detectProject(root: string): Promise<ProjectInfo> {
  const packageJson = await readPackageJson(root);
  if (!packageJson) {
    throw new Error("Could not read package.json from the target project.");
  }

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

export async function inspectProject(root: string): Promise<DoctorReport> {
  const packageJson = await readPackageJson(root);
  const hasPackageJson = packageJson !== null;
  const tailwindConfigPath = await detectTailwindConfig(root);
  const cssEntryPath = await findCssEntryPath(root);

  const checks: DoctorCheck[] = [
    {
      key: "package-json",
      label: "package.json present",
      hint: "Create package.json at the project root before running FormaUI commands.",
      ok: hasPackageJson
    },
    {
      key: "react",
      label: "React dependency",
      hint: "Install react and react-dom dependencies before running `formaui init`.",
      ok: packageJson ? hasDependency(packageJson, "react") : false
    },
    {
      key: "tailwind",
      label: "Tailwind config",
      hint: "Add a tailwind.config.ts (or .js/.mjs/.cjs) file.",
      ok: Boolean(tailwindConfigPath)
    },
    {
      key: "typescript",
      label: "TypeScript config",
      hint: "Add a tsconfig.json file for TypeScript support.",
      ok: await pathExists(resolve(root, "tsconfig.json"))
    },
    {
      key: "css-entry",
      label: "CSS entry file",
      hint: "Create src/styles/globals.css (or another supported CSS entry) and include FormaUI styles.",
      ok: Boolean(cssEntryPath)
    },
    {
      key: "formaui-config",
      label: "FormaUI config",
      hint: "Run `formaui init` to generate formaui.json.",
      ok: await pathExists(resolve(root, "formaui.json"))
    }
  ];

  return {
    root,
    packageManager: await detectPackageManager(root),
    checks,
    healthy: checks.every((check) => check.ok)
  };
}
