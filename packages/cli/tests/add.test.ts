import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { runAddCommand } from "../src/commands/add";

async function createRegistryFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-registry-"));
  const registryRoot = resolve(root, "registry");

  await mkdir(resolve(root, "sources"), { recursive: true });
  await mkdir(resolve(registryRoot, "components"), { recursive: true });
  await mkdir(resolve(registryRoot, "blocks"), { recursive: true });
  await mkdir(resolve(registryRoot, "templates"), { recursive: true });

  await writeFile(
    resolve(root, "sources/cn.ts"),
    "export function cn(...x: string[]) { return x.join(' '); }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/button.tsx"),
    "export function Button() { return <button>Action</button>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/page-header.tsx"),
    "export function PageHeader() { return <header>Header</header>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/metric-card.tsx"),
    "export function MetricCard() { return <div>Metric</div>; }\n",
    "utf8"
  );

  await writeFile(
    resolve(root, "sources/dashboard-shell.tsx"),
    "import { Button } from './primitives/button';\nexport function DashboardShell() { return <section><h2>Overview</h2><Button /></section>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/token-usage-chart.tsx"),
    "export function TokenUsageChart() { return <section>Token usage</section>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/agent-run-timeline.tsx"),
    "export function AgentRunTimeline() { return <section>Agent runs</section>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/api-key-manager.tsx"),
    "export function ApiKeyManager() { return <section>API keys</section>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/settings-layout.tsx"),
    "export function SettingsLayout() { return <section>Settings</section>; }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/ai-console-lite-page.tsx"),
    "export default function AiConsoleLite() { return <main>AI Console Lite</main>; }\n",
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
        files: [{ source: resolve(root, "sources/cn.ts"), target: "components/lib/cn.ts" }]
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
        files: [
          { source: resolve(root, "sources/button.tsx"), target: "components/primitives/button.tsx" }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "components/page-header.json"),
    JSON.stringify(
      {
        name: "page-header",
        type: "component",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(root, "sources/page-header.tsx"),
            target: "components/composites/page-header.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "components/metric-card.json"),
    JSON.stringify(
      {
        name: "metric-card",
        type: "component",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(root, "sources/metric-card.tsx"),
            target: "components/composites/metric-card.tsx"
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
            source: resolve(root, "sources/dashboard-shell.tsx"),
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
    resolve(registryRoot, "blocks/token-usage-chart.json"),
    JSON.stringify(
      {
        name: "token-usage-chart",
        type: "block",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(root, "sources/token-usage-chart.tsx"),
            target: "components/token-usage-chart.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "blocks/agent-run-timeline.json"),
    JSON.stringify(
      {
        name: "agent-run-timeline",
        type: "block",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(root, "sources/agent-run-timeline.tsx"),
            target: "components/agent-run-timeline.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "blocks/api-key-manager.json"),
    JSON.stringify(
      {
        name: "api-key-manager",
        type: "block",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(root, "sources/api-key-manager.tsx"),
            target: "components/api-key-manager.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  await writeFile(
    resolve(registryRoot, "blocks/settings-layout.json"),
    JSON.stringify(
      {
        name: "settings-layout",
        type: "block",
        dependencies: ["react"],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            source: resolve(root, "sources/settings-layout.tsx"),
            target: "components/settings-layout.tsx"
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
        registryDependencies: [
          "dashboard-shell",
          "token-usage-chart",
          "agent-run-timeline",
          "api-key-manager",
          "settings-layout",
          "page-header",
          "metric-card"
        ],
        files: [
          {
            source: resolve(root, "sources/ai-console-lite-page.tsx"),
            target: "app/ai-console-lite/page.tsx"
          }
        ]
      },
      null,
      2
    ),
    "utf8"
  );

  return { root, registryRoot };
}

async function createProjectFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-add-project-"));

  await writeFile(
    resolve(root, "package.json"),
    JSON.stringify({
      name: "fixture-app",
      private: true,
      dependencies: { react: "^19.0.0" }
    }),
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

  return root;
}

describe("formaui add", () => {
  it("copies files for item and registry dependencies", async () => {
    const { root: registryFixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();

    try {
      await runAddCommand({
        name: "button",
        kind: "component",
        cwd: projectRoot,
        yes: true,
        registryRoot
      });

      const buttonFile = await readFile(resolve(projectRoot, "components/primitives/button.tsx"), "utf8");
      const cnFile = await readFile(resolve(projectRoot, "components/lib/cn.ts"), "utf8");

      expect(buttonFile).toContain("export function Button");
      expect(cnFile).toContain("export function cn");
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(registryFixtureRoot, { recursive: true, force: true });
    }
  });

  it("copies block files through block add", async () => {
    const { root: registryFixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();

    try {
      await runAddCommand({
        name: "dashboard-shell",
        kind: "block",
        cwd: projectRoot,
        yes: true,
        registryRoot
      });

      const blockFile = await readFile(resolve(projectRoot, "components/dashboard-shell.tsx"), "utf8");
      const buttonFile = await readFile(resolve(projectRoot, "components/primitives/button.tsx"), "utf8");

      expect(blockFile).toContain("Overview");
      expect(buttonFile).toContain("export function Button");
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(registryFixtureRoot, { recursive: true, force: true });
    }
  });

  it("copies template and required block/component dependencies", async () => {
    const { root: registryFixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();

    try {
      await runAddCommand({
        name: "ai-console-lite",
        kind: "template",
        cwd: projectRoot,
        yes: true,
        registryRoot
      });

      const templatePage = await readFile(resolve(projectRoot, "app/ai-console-lite/page.tsx"), "utf8");
      const dashboardBlock = await readFile(resolve(projectRoot, "components/dashboard-shell.tsx"), "utf8");
      const tokenBlock = await readFile(resolve(projectRoot, "components/token-usage-chart.tsx"), "utf8");
      const timelineBlock = await readFile(resolve(projectRoot, "components/agent-run-timeline.tsx"), "utf8");
      const keyBlock = await readFile(resolve(projectRoot, "components/api-key-manager.tsx"), "utf8");
      const settingsBlock = await readFile(resolve(projectRoot, "components/settings-layout.tsx"), "utf8");
      const pageHeader = await readFile(
        resolve(projectRoot, "components/composites/page-header.tsx"),
        "utf8"
      );
      const metricCard = await readFile(
        resolve(projectRoot, "components/composites/metric-card.tsx"),
        "utf8"
      );

      expect(templatePage).toContain("AI Console Lite");
      expect(dashboardBlock).toContain("Overview");
      expect(tokenBlock).toContain("Token usage");
      expect(timelineBlock).toContain("Agent runs");
      expect(keyBlock).toContain("API keys");
      expect(settingsBlock).toContain("Settings");
      expect(pageHeader).toContain("Header");
      expect(metricCard).toContain("Metric");
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(registryFixtureRoot, { recursive: true, force: true });
    }
  });

  it("does not overwrite files without explicit confirmation", async () => {
    const { root: registryFixtureRoot, registryRoot } = await createRegistryFixture();
    const projectRoot = await createProjectFixture();

    try {
      await mkdir(resolve(projectRoot, "components/primitives"), { recursive: true });
      await writeFile(resolve(projectRoot, "components/primitives/button.tsx"), "// existing\n", "utf8");

      await expect(
        runAddCommand({
          name: "button",
          kind: "component",
          cwd: projectRoot,
          yes: false,
          registryRoot,
          confirmOverwrite: async () => false
        })
      ).rejects.toThrow(/Conflicting files/);

      const existingFile = await readFile(resolve(projectRoot, "components/primitives/button.tsx"), "utf8");
      expect(existingFile).toBe("// existing\n");
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
      await rm(registryFixtureRoot, { recursive: true, force: true });
    }
  });
});
