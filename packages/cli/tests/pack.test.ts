import { constants } from "node:fs";
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { runCli } from "../src/index";
import type { Logger } from "../src/utils/logger";

interface CapturedLogs {
  info: string[];
  warn: string[];
  success: string[];
  error: string[];
}

function createLogBucket(): CapturedLogs {
  return {
    info: [],
    warn: [],
    success: [],
    error: []
  };
}

function createCapturedLogger(logs: CapturedLogs): Logger {
  return {
    info(message: string) {
      logs.info.push(message);
    },
    warn(message: string) {
      logs.warn.push(message);
    },
    success(message: string) {
      logs.success.push(message);
    },
    error(message: string) {
      logs.error.push(message);
    }
  };
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
  const root = await mkdtemp(resolve(tmpdir(), "formaui-pack-registry-"));
  const registryRoot = resolve(root, "registry");
  const sourcesRoot = resolve(root, "sources");

  await mkdir(resolve(registryRoot, "components"), { recursive: true });
  await mkdir(resolve(registryRoot, "packs"), { recursive: true });
  await mkdir(sourcesRoot, { recursive: true });

  await writeFile(resolve(sourcesRoot, "cn.ts"), "export const cn = (...x: string[]) => x.join(' ');\n", "utf8");
  await writeFile(resolve(sourcesRoot, "button.tsx"), "export const Button = () => <button>Save</button>;\n", "utf8");
  await writeFile(
    resolve(sourcesRoot, "pagination-bar.tsx"),
    "export const PaginationBar = () => <nav>Pagination</nav>;\n",
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "components/lib-cn.json"),
    JSON.stringify(
      {
        name: "lib-cn",
        type: "lib",
        dependencies: [],
        devDependencies: [],
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
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: ["lib-cn"],
        files: [{ source: resolve(sourcesRoot, "button.tsx"), target: "components/primitives/button.tsx" }]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "components/pagination-bar.json"),
    JSON.stringify(
      {
        name: "pagination-bar",
        type: "component",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: ["lib-cn", "button"],
        files: [
          {
            source: resolve(sourcesRoot, "pagination-bar.tsx"),
            target: "components/composites/pagination-bar.tsx"
          }
        ]
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
        scenarios: ["analytics", "operations"],
        complexity: "medium",
        stability: "beta",
        dependencies: [],
        devDependencies: [],
        registryDependencies: ["lib-cn", "button", "pagination-bar"],
        files: []
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "packs/feedback-loading.json"),
    JSON.stringify(
      {
        name: "feedback-loading",
        type: "pack",
        category: "feedback",
        scenarios: ["loading"],
        complexity: "low",
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

async function createProjectFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-pack-project-"));

  await writeFile(
    resolve(root, "package.json"),
    JSON.stringify(
      {
        name: "fixture-pack-app",
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
    JSON.stringify(
      {
        aliases: {
          components: "components",
          lib: "lib",
          styles: "styles"
        }
      },
      null,
      2
    ),
    "utf8"
  );

  return root;
}

describe("formaui pack command", () => {
  it("supports pack list/info with metadata filters", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const logs = createLogBucket();
    const logger = createCapturedLogger(logs);

    try {
      await runCli(["pack", "list", "--registry", registryRoot, "--scenario", "analytics"], { logger });
      expect(logs.info.some((line) => line.includes("pack/dashboard-foundation"))).toBe(true);
      expect(logs.info.some((line) => line.includes("pack/feedback-loading"))).toBe(false);

      logs.info.length = 0;
      await runCli(["pack", "info", "dashboard-foundation", "--registry", registryRoot], { logger });
      expect(logs.info.some((line) => line.includes("Kind: pack"))).toBe(true);
      expect(logs.info.some((line) => line.includes("Registry dependencies: lib-cn, button, pagination-bar"))).toBe(
        true
      );
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("installs all registry dependencies for pack add", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();

    try {
      await runCli(["pack", "add", "dashboard-foundation", "--cwd", projectRoot, "--registry", registryRoot], {
        installCommandRunner: async () => {}
      });

      expect(await exists(resolve(projectRoot, "components/lib/cn.ts"))).toBe(true);
      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(true);
      expect(await exists(resolve(projectRoot, "components/composites/pagination-bar.tsx"))).toBe(true);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("supports --dry-run for pack add without writing files", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();
    const logs = createLogBucket();
    const logger = createCapturedLogger(logs);

    try {
      await runCli(
        ["pack", "add", "dashboard-foundation", "--cwd", projectRoot, "--registry", registryRoot, "--dry-run"],
        { logger }
      );
      expect(await exists(resolve(projectRoot, "components/lib/cn.ts"))).toBe(false);
      expect(logs.info.some((line) => line.toLowerCase().includes("dry-run"))).toBe(true);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("rolls back pack add files when write transaction fails", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();

    try {
      await mkdir(resolve(projectRoot, "components"), { recursive: true });
      await writeFile(resolve(projectRoot, "components/composites"), "not-a-directory", "utf8");

      await expect(
        runCli(["pack", "add", "dashboard-foundation", "--cwd", projectRoot, "--registry", registryRoot], {
          installCommandRunner: async () => {}
        })
      ).rejects.toThrow(/rolled back/i);

      expect(await exists(resolve(projectRoot, "components/lib/cn.ts"))).toBe(false);
      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(false);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });
});
