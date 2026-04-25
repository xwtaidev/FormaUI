import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

export class FileConflictError extends Error {
  constructor(public readonly conflicts: string[]) {
    super(`Conflicting files: ${conflicts.join(", ")}`);
    this.name = "FileConflictError";
  }
}

export interface WritableFile {
  targetPath: string;
  content: string;
}

export interface WriteFilesOptions {
  cwd: string;
  files: WritableFile[];
  overwrite?: boolean;
  confirmOverwrite?: (conflicts: string[]) => Promise<boolean>;
}

async function pathExists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function writeFiles(options: WriteFilesOptions) {
  const overwrite = options.overwrite ?? false;
  const conflicts: string[] = [];

  for (const file of options.files) {
    const outputPath = resolve(options.cwd, file.targetPath);
    if (await pathExists(outputPath)) {
      conflicts.push(file.targetPath);
    }
  }

  if (conflicts.length > 0 && !overwrite) {
    const confirmed = options.confirmOverwrite
      ? await options.confirmOverwrite(conflicts)
      : false;

    if (!confirmed) {
      throw new FileConflictError(conflicts);
    }
  }

  for (const file of options.files) {
    const outputPath = resolve(options.cwd, file.targetPath);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, file.content, "utf8");
  }

  return options.files.map((file) => file.targetPath);
}
