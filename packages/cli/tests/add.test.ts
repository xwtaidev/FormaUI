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

  await writeFile(
    resolve(root, "sources/cn.ts"),
    "export function cn(...x: string[]) { return x.join(' '); }\n",
    "utf8"
  );
  await writeFile(
    resolve(root, "sources/button.tsx"),
    "import { cn } from '../lib/cn';\nexport function Button() { return <button className={cn('x')} />; }\n",
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
        files: [{ source: resolve(root, "sources/button.tsx"), target: "components/primitives/button.tsx" }]
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
