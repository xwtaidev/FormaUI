import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it, vi } from "vitest";

import { runCli } from "../src/index";
import type { Logger } from "../src/utils/logger";

interface CapturedLogs {
  info: string[];
  warn: string[];
  success: string[];
  error: string[];
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

function createLogBucket(): CapturedLogs {
  return {
    info: [],
    warn: [],
    success: [],
    error: []
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
  const root = await mkdtemp(resolve(tmpdir(), "formaui-discover-registry-"));
  const registryRoot = resolve(root, "registry");
  const sourcesRoot = resolve(root, "sources");

  await mkdir(resolve(registryRoot, "components"), { recursive: true });
  await mkdir(resolve(registryRoot, "blocks"), { recursive: true });
  await mkdir(resolve(registryRoot, "templates"), { recursive: true });
  await mkdir(resolve(registryRoot, "themes"), { recursive: true });
  await mkdir(sourcesRoot, { recursive: true });

  await writeFile(resolve(sourcesRoot, "button.tsx"), "export const Button = () => null;\n", "utf8");
  await writeFile(
    resolve(sourcesRoot, "dashboard-shell.tsx"),
    "export const DashboardShell = () => null;\n",
    "utf8"
  );
  await writeFile(
    resolve(sourcesRoot, "console-page.tsx"),
    "export default function ConsolePage() { return null; }\n",
    "utf8"
  );
  await writeFile(resolve(sourcesRoot, "default.css"), ":root { --background: #fff; }\n", "utf8");

  await writeFile(
    resolve(registryRoot, "components/button.json"),
    JSON.stringify(
      {
        name: "button",
        type: "component",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(sourcesRoot, "button.tsx"),
            target: "components/primitives/button.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "blocks/dashboard-shell.json"),
    JSON.stringify(
      {
        name: "dashboard-shell",
        type: "block",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: ["button"],
        files: [
          {
            source: resolve(sourcesRoot, "dashboard-shell.tsx"),
            target: "components/dashboard-shell.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "templates/ai-console-lite.json"),
    JSON.stringify(
      {
        name: "ai-console-lite",
        type: "template",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: ["dashboard-shell"],
        files: [
          {
            source: resolve(sourcesRoot, "console-page.tsx"),
            target: "app/ai-console-lite/page.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "themes/default.json"),
    JSON.stringify(
      {
        name: "default",
        type: "theme",
        dependencies: [],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(sourcesRoot, "default.css"),
            target: "styles/formaui/default.css"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "index.json"),
    JSON.stringify(
      {
        generatedAt: "2026-04-25T00:00:00.000Z",
        total: 4,
        items: [
          {
            kind: "component",
            name: "button",
            type: "component",
            version: "0.2.2",
            path: "components/button.json"
          },
          {
            kind: "block",
            name: "dashboard-shell",
            type: "block",
            version: "0.2.2",
            path: "blocks/dashboard-shell.json"
          },
          {
            kind: "template",
            name: "ai-console-lite",
            type: "template",
            version: "0.2.2",
            path: "templates/ai-console-lite.json"
          },
          {
            kind: "theme",
            name: "default",
            type: "theme",
            version: "0.2.2",
            path: "themes/default.json"
          }
        ],
        byKind: {
          component: {
            button: {
              latest: "0.2.2",
              versions: ["0.2.2"],
              entries: {
                "0.2.2": {
                  path: "components/button.json"
                }
              }
            }
          },
          block: {
            "dashboard-shell": {
              latest: "0.2.2",
              versions: ["0.2.2"],
              entries: {
                "0.2.2": {
                  path: "blocks/dashboard-shell.json"
                }
              }
            }
          },
          template: {
            "ai-console-lite": {
              latest: "0.2.2",
              versions: ["0.2.2"],
              entries: {
                "0.2.2": {
                  path: "templates/ai-console-lite.json"
                }
              }
            }
          },
          theme: {
            default: {
              latest: "0.2.2",
              versions: ["0.2.2"],
              entries: {
                "0.2.2": {
                  path: "themes/default.json"
                }
              }
            }
          }
        }
      },
      null,
      2
    ),
    "utf8"
  );

  return { root, registryRoot };
}

async function createProjectFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-discover-project-"));
  await mkdir(resolve(root, "src/styles"), { recursive: true });
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
  await writeFile(resolve(root, "formaui.json"), JSON.stringify({ aliases: {} }, null, 2), "utf8");
  await writeFile(resolve(root, "src/styles/globals.css"), "", "utf8");
  return root;
}

describe("formaui discoverability commands", () => {
  it("routes list/search/info using registry data", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const logs = createLogBucket();
    const logger = createCapturedLogger(logs);

    try {
      await runCli(["list", "--registry", registryRoot], { logger });
      expect(logs.info.some((line) => line.includes("component/button"))).toBe(true);

      logs.info.length = 0;
      await runCli(["search", "dashboard", "--registry", registryRoot], { logger });
      expect(logs.info.some((line) => line.includes("block/dashboard-shell"))).toBe(true);

      logs.info.length = 0;
      await runCli(["info", "button", "--registry", registryRoot], { logger });
      expect(logs.info.some((line) => line.includes("Name: button"))).toBe(true);
      expect(logs.info.some((line) => line.includes("Kind: component"))).toBe(true);
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("prints doctor report with missing checks", async () => {
    const projectRoot = await mkdtemp(resolve(tmpdir(), "formaui-doctor-project-"));
    const logs = createLogBucket();
    const logger = createCapturedLogger(logs);

    try {
      await writeFile(
        resolve(projectRoot, "package.json"),
        JSON.stringify(
          {
            name: "doctor-project",
            dependencies: {
              react: "^19.0.0"
            }
          },
          null,
          2
        ),
        "utf8"
      );

      await runCli(["doctor", "--cwd", projectRoot], { logger });
      expect(logs.info.some((line) => line.includes("[OK] React dependency"))).toBe(true);
      expect(logs.info.some((line) => line.includes("[MISSING] Tailwind config"))).toBe(true);
      expect(logs.warn.length).toBeGreaterThan(0);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
    }
  });

  it("supports --dry-run for add/block/template/theme without writing files", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();
    const logs = createLogBucket();
    const logger = createCapturedLogger(logs);

    try {
      await runCli(["add", "button", "--cwd", projectRoot, "--registry", registryRoot, "--dry-run"], {
        logger
      });
      await runCli(
        ["block", "add", "dashboard-shell", "--cwd", projectRoot, "--registry", registryRoot, "--dry-run"],
        { logger }
      );
      await runCli(
        ["template", "add", "ai-console-lite", "--cwd", projectRoot, "--registry", registryRoot, "--dry-run"],
        { logger }
      );
      await runCli(["theme", "add", "default", "--cwd", projectRoot, "--registry", registryRoot, "--dry-run"], {
        logger
      });

      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(false);
      expect(await exists(resolve(projectRoot, "components/dashboard-shell.tsx"))).toBe(false);
      expect(await exists(resolve(projectRoot, "app/ai-console-lite/page.tsx"))).toBe(false);
      expect(await exists(resolve(projectRoot, "styles/formaui/default.css"))).toBe(false);
      expect(logs.info.some((line) => line.toLowerCase().includes("dry-run"))).toBe(true);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("supports remote --registry URL and local fallback order for add", async () => {
    const { root: fixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();
    const logs = createLogBucket();
    const logger = createCapturedLogger(logs);
    const remoteRoot = "https://registry.example.test";
    const remoteButton = JSON.parse(await readFile(resolve(registryRoot, "components/button.json"), "utf8"));
    const originalFetch = globalThis.fetch;

    try {
      globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
        const requestUrl = String(input);
        if (requestUrl === `${remoteRoot}/index.json`) {
          return new Response(
            JSON.stringify({
              byKind: {
                component: {
                  button: {
                    latest: "0.2.2",
                    entries: {
                      "0.2.2": {
                        path: "components/button.json"
                      }
                    }
                  }
                }
              }
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          );
        }
        if (requestUrl === `${remoteRoot}/components/button.json`) {
          return new Response(JSON.stringify(remoteButton), {
            status: 200,
            headers: { "content-type": "application/json" }
          });
        }
        return new Response("not found", { status: 404, statusText: "Not Found" });
      }) as typeof fetch;

      await runCli(["add", "button", "--cwd", projectRoot, "--registry", remoteRoot], {
        logger,
        installCommandRunner: async () => {}
      });
      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(true);

      await rm(resolve(projectRoot, "components"), { recursive: true, force: true });
      globalThis.fetch = vi.fn(async () => {
        throw new Error("Network unavailable");
      }) as typeof fetch;

      await runCli(["add", "button", "--cwd", projectRoot, "--registry", remoteRoot], {
        logger,
        installCommandRunner: async () => {}
      });
      expect(await exists(resolve(projectRoot, "components/primitives/button.tsx"))).toBe(true);
    } finally {
      globalThis.fetch = originalFetch;
      await rm(projectRoot, { recursive: true, force: true });
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });
});
