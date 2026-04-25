import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";

export interface PatchCssEntryOptions {
  cwd: string;
  cssEntryPath: string;
  formauiStylesPath: string;
}

function toPosixPath(pathValue: string) {
  return pathValue.split(sep).join("/");
}

function toImportPath(fromFile: string, toFile: string) {
  const fromDir = dirname(fromFile);
  const relativePath = toPosixPath(relative(fromDir, toFile));
  if (relativePath.startsWith(".")) {
    return relativePath;
  }
  return `./${relativePath}`;
}

function hasFormaUIImport(content: string) {
  return /@import\s+["'][^"']*formaui\.css["'];?/m.test(content);
}

export async function patchCssEntry(options: PatchCssEntryOptions) {
  const entryPath = resolve(options.cwd, options.cssEntryPath);
  const variablesPath = resolve(options.cwd, options.formauiStylesPath);
  const importPath = toImportPath(entryPath, variablesPath);
  const importStatement = `@import "${importPath}";`;

  let existingContent = "";
  try {
    existingContent = await readFile(entryPath, "utf8");
  } catch {
    existingContent = "";
  }

  if (hasFormaUIImport(existingContent)) {
    return {
      entryPath: options.cssEntryPath,
      importStatement,
      patched: false
    };
  }

  const nextContent =
    existingContent.length > 0 ? `${importStatement}\n${existingContent}` : `${importStatement}\n`;

  await mkdir(dirname(entryPath), { recursive: true });
  await writeFile(entryPath, nextContent, "utf8");

  return {
    entryPath: options.cssEntryPath,
    importStatement,
    patched: true
  };
}
