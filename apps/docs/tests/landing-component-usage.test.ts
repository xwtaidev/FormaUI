import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const testDir = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(testDir, "..");
const checkScriptPath = resolve(docsRoot, "scripts/check-landing-component-usage.mjs");

function runComplianceCheck(targetDir: string) {
  return execFileSync("node", [checkScriptPath], {
    cwd: docsRoot,
    env: {
      ...process.env,
      LANDING_COMPONENT_CHECK_DIR: targetDir
    },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

describe("landing component usage compliance", () => {
  it("passes when imports are local or from approved packages", () => {
    const fixtureRoot = mkdtempSync(resolve(tmpdir(), "landing-usage-ok-"));

    try {
      writeFileSync(
        resolve(fixtureRoot, "content.tsx"),
        'export const title = "ok";\n',
        "utf8"
      );
      writeFileSync(
        resolve(fixtureRoot, "page.tsx"),
        [
          'import React from "react";',
          'import Link from "next/link";',
          'import { HeroCta } from "@formaui/blocks";',
          'import { title } from "./content";',
          "",
          "export default function Page() {",
          '  return <section aria-label={title}><HeroCta eyebrow="e" title="t" description="d" primaryCtaLabel="a" primaryCtaHref="/quick-start" secondaryCtaLabel="b" secondaryCtaHref="/introduction" /><Link href="/landing">Landing</Link></section>;',
          "}"
        ].join("\n"),
        "utf8"
      );

      const output = runComplianceCheck(fixtureRoot);
      expect(output).toContain("Landing component compliance check passed");
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });

  it("fails when landing source imports disallowed third-party ui packages", () => {
    const fixtureRoot = mkdtempSync(resolve(tmpdir(), "landing-usage-fail-"));

    try {
      mkdirSync(resolve(fixtureRoot, "nested"), { recursive: true });
      writeFileSync(
        resolve(fixtureRoot, "nested/page.tsx"),
        [
          'import React from "react";',
          'import * as Dialog from "@radix-ui/react-dialog";',
          "",
          "export default function Page() {",
          '  return <Dialog.Root />;',
          "}"
        ].join("\n"),
        "utf8"
      );

      let stderr = "";
      let threw = false;

      try {
        runComplianceCheck(fixtureRoot);
      } catch (error) {
        threw = true;
        stderr = String((error as { stderr?: string }).stderr ?? "");
      }

      expect(threw).toBe(true);
      expect(stderr).toContain("Landing component compliance check failed");
      expect(stderr).toContain("@radix-ui/react-dialog");
      expect(stderr).toContain("nested/page.tsx");
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true });
    }
  });
});
