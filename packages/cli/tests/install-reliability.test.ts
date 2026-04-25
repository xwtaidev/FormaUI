import { constants } from "node:fs";
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { runAddCommand } from "../src/commands/add";

interface InstallCall {
  command: string;
  args: string[];
}

async function exists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function createRegistryFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-install-registry-"));
  const registryRoot = resolve(root, "registry");
  const sourcesRoot = resolve(root, "sources");

  await mkdir(resolve(registryRoot, "components"), { recursive: true });
  await mkdir(resolve(registryRoot, "packs"), { recursive: true });
  await mkdir(sourcesRoot, { recursive: true });

  await writeFile(
    resolve(sourcesRoot, "cn.ts"),
    "export function cn(...x: string[]) { return x.join(' '); }\n",
    "utf8"
  );
  await writeFile(
    resolve(sourcesRoot, "button.tsx"),
    "export function Button() { return <button>Action</button>; }\n",
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "components/lib-cn.json"),
    JSON.stringify(
      {
        name: "lib-cn",
        type: "lib",
        dependencies: ["clsx"],
        devDependencies: ["typescript"],
        registryDependencies: [],
        files: [{ source: resolve(sourcesRoot, "cn.ts"), target: "components/lib/cn.ts" }]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "components/button.json"),
    JSON.stringify(
      {
        name: "button",
        type: "component",
        dependencies: ["react", "clsx"],
        devDependencies: ["typescript"],
        registryDependencies: ["lib-cn"],
        files: [{ source: resolve(sourcesRoot, "button.tsx"), target: "components/primitives/button.tsx" }]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "packs/dashboard-foundation.json"),
    JSON.stringify(
      {
        name: "dashboard-foundation",
        type: "pack",
        category: "dashboard",
        scenarios: ["analytics"],
        complexity: "medium",
        stability: "beta",
        dependencies: [],
        devDependencies: [],
        registryDependencies: ["button"],
        files: []
      },
      null,
      2
    ),
    "utf8"
  );

  return { root, registryRoot };
}

async function createProjectFixture(options: {
  packageManager?: "pnpm" | "yarn" | "npm" | "bun" | "unknown";
}) {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-install-project-"));

  await writeFile(
    resolve(root, "package.json"),
    JSON.stringify(
      {
        name: "fixture-app",
        private: true,
        dependencies: {
          react: "^19.0.0"
        }
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(root, "formaui.json"),
    JSON.stringify({
      aliases: {
        components: "components",
        lib: "lib",
        styles: "styles"
      }
    }),
    "utf8"
  );

  const packageManager = options.packageManager ?? "unknown";
  if (packageManager === "pnpm") {
    await writeFile(resolve(root, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n", "utf8");
  } else if (packageManager === "yarn") {
    await writeFile(resolve(root, "yarn.lock"), "", "utf8");
  } else if (packageManager === "npm") {
    await writeFile(resolve(root, "package-lock.json"), "{}", "utf8");
  } else if (packageManager === "bun") {
    await writeFile(resolve(root, "bun.lockb"), "", "utf8");
  }

  return root;
}

describe("formaui add install reliability", () => {
  it.each([
    {
      packageManager: "pnpm",
      expected: [
        { command: "pnpm", args: ["add", "clsx"] },
        { command: "pnpm", args: ["add", "-D", "typescript"] }
      ]
    },
    {
      packageManager: "yarn",
      expected: [
        { command: "yarn", args: ["add", "clsx"] },
        { command: "yarn", args: ["add", "-D", "typescript"] }
      ]
    },
    {
      packageManager: "npm",
      expected: [
        { command: "npm", args: ["install", "clsx"] },
        { command: "npm", args: ["install", "-D", "typescript"] }
      ]
    },
    {
      packageManager: "bun",
      expected: [
        { command: "bun", args: ["add", "clsx"] },
        { command: "bun", args: ["add", "-d", "typescript"] }
      ]
    }
  ])("runs package-manager install commands for $packageManager", async ({ packageManager, expected }) => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture({
      packageManager: packageManager as "pnpm" | "yarn" | "npm" | "bun"
    });
    const calls: InstallCall[] = [];

    try {
      await runAddCommand({
        name: "button",
        kind: "component",
        cwd: projectRoot,
        yes: true,
        registryRoot,
        installCommandRunner: async (command, args) => {
          calls.push({ command, args });
        }
      });

      expect(calls).toEqual(expected);
      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(true);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("does not write files when dependency install fails", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture({ packageManager: "pnpm" });

    try {
      await expect(
        runAddCommand({
          name: "button",
          kind: "component",
          cwd: projectRoot,
          yes: true,
          registryRoot,
          installCommandRunner: async () => {
            throw new Error("install command failed");
          }
        })
      ).rejects.toThrow(/No files were written/);

      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(false);
      expect(await exists(resolve(projectRoot, "components/lib/cn.ts"))).toBe(false);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("installs component graph when adding a pack", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture({ packageManager: "unknown" });

    try {
      await runAddCommand({
        name: "dashboard-foundation",
        kind: "pack",
        cwd: projectRoot,
        yes: true,
        registryRoot,
        installCommandRunner: async () => {}
      });

      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(true);
      expect(await exists(resolve(projectRoot, "components/lib/cn.ts"))).toBe(true);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("rolls back files when write transaction fails", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture({ packageManager: "unknown" });

    try {
      await mkdir(resolve(projectRoot, "components"), { recursive: true });
      await writeFile(resolve(projectRoot, "components/primitives"), "not-a-directory", "utf8");

      await expect(
        runAddCommand({
          name: "button",
          kind: "component",
          cwd: projectRoot,
          yes: true,
          registryRoot,
          installCommandRunner: async () => {}
        })
      ).rejects.toThrow(/rolled back/i);

      expect(await exists(resolve(projectRoot, "components/lib/cn.ts"))).toBe(false);
      expect(await exists(resolve(projectRoot, "components/primitives"))).toBe(true);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

});
