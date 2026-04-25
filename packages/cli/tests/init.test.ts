import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { runInitCommand } from "../src/commands/init";

async function createReactProjectFixture() {
  const root = await mkdtemp(resolve(tmpdir(), "formaui-init-"));

  await mkdir(resolve(root, "src/styles"), { recursive: true });
  await writeFile(
    resolve(root, "package.json"),
    JSON.stringify({
      name: "fixture-app",
      private: true,
      dependencies: {
        react: "^19.0.0"
      }
    }),
    "utf8"
  );

  await writeFile(resolve(root, "src/styles/globals.css"), "", "utf8");

  return root;
}

describe("formaui init", () => {
  it("creates formaui config, component dir, utils and css variables", async () => {
    const projectRoot = await createReactProjectFixture();

    try {
      await runInitCommand({ cwd: projectRoot, yes: true });

      const config = JSON.parse(await readFile(resolve(projectRoot, "formaui.json"), "utf8"));
      const utilsFile = await readFile(resolve(projectRoot, "lib/utils.ts"), "utf8");
      const cssVariables = await readFile(resolve(projectRoot, "styles/formaui.css"), "utf8");

      expect(config.aliases.components).toBe("components");
      expect(utilsFile).toContain("export function cn");
      expect(cssVariables).toContain(":root");
      expect(cssVariables).toContain("--background");
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
    }
  });

  it("fails for non-react projects", async () => {
    const projectRoot = await mkdtemp(resolve(tmpdir(), "formaui-init-non-react-"));

    try {
      await writeFile(
        resolve(projectRoot, "package.json"),
        JSON.stringify({ name: "fixture-app", private: true }),
        "utf8"
      );

      await expect(runInitCommand({ cwd: projectRoot })).rejects.toThrow(/React project/);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
    }
  });
});
