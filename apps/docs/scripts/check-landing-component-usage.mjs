import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, resolve } from "node:path";

const allowedPackagePrefixes = ["@formaui/components", "@formaui/blocks"];
const allowedCoreImports = ["react", "next"];

function isAllowedImport(source) {
  if (source.startsWith("./") || source.startsWith("../") || source.startsWith("@/")) {
    return true;
  }

  if (source.startsWith("node:")) {
    return true;
  }

  if (allowedPackagePrefixes.some((prefix) => source === prefix || source.startsWith(`${prefix}/`))) {
    return true;
  }

  return allowedCoreImports.some((item) => source === item || source.startsWith(`${item}/`));
}

function listTsxFiles(rootDir) {
  const results = [];

  function walk(currentDir) {
    const entries = readdirSync(currentDir);

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.endsWith(".tsx")) {
        results.push(fullPath);
      }
    }
  }

  walk(rootDir);
  return results.sort();
}

function readImports(sourceText) {
  const importSources = [];
  const importRegex = /^\s*import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["'];?/gm;
  let match;

  while ((match = importRegex.exec(sourceText)) !== null) {
    importSources.push(match[1]);
  }

  return importSources;
}

function run() {
  const scriptDir = fileURLToPath(new URL(".", import.meta.url));
  const docsRoot = resolve(scriptDir, "..");
  const landingDir = resolve(process.env.LANDING_COMPONENT_CHECK_DIR ?? join(docsRoot, "app", "landing"));
  const files = listTsxFiles(landingDir);
  const violations = [];

  for (const filePath of files) {
    const source = readFileSync(filePath, "utf8");
    const imports = readImports(source);
    const disallowed = imports.filter((entry) => !isAllowedImport(entry));

    if (disallowed.length > 0) {
      violations.push({
        filePath: relative(docsRoot, filePath),
        disallowed
      });
    }
  }

  if (violations.length === 0) {
    console.log(
      `Landing component compliance check passed (${files.length} TSX files scanned in ${relative(docsRoot, landingDir)}).`
    );
    return;
  }

  console.error("Landing component compliance check failed.");

  for (const violation of violations) {
    console.error(`- ${violation.filePath}`);
    for (const source of violation.disallowed) {
      console.error(`  - disallowed import: ${source}`);
    }
  }

  process.exitCode = 1;
}

run();
