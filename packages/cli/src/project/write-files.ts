import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
  dryRun?: boolean;
  confirmOverwrite?: (conflicts: string[]) => Promise<boolean>;
}

interface FileSnapshot {
  existed: boolean;
  content?: string;
}

export class WriteFilesTransactionError extends Error {
  constructor(
    public readonly originalError: unknown,
    public readonly rollbackErrors: string[]
  ) {
    const reason = originalError instanceof Error ? originalError.message : String(originalError);
    super(`Write transaction failed: ${reason}`);
    this.name = "WriteFilesTransactionError";
  }

  get rolledBack() {
    return this.rollbackErrors.length === 0;
  }
}

async function pathExists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function findFileConflicts(options: Pick<WriteFilesOptions, "cwd" | "files">) {
  const conflicts: string[] = [];

  for (const file of options.files) {
    const outputPath = resolve(options.cwd, file.targetPath);
    if (await pathExists(outputPath)) {
      conflicts.push(file.targetPath);
    }
  }

  return conflicts;
}

export async function writeFiles(options: WriteFilesOptions) {
  const overwrite = options.overwrite ?? false;
  const dryRun = options.dryRun ?? false;
  const conflicts = await findFileConflicts(options);

  if (conflicts.length > 0 && !overwrite && !dryRun) {
    const confirmed = options.confirmOverwrite
      ? await options.confirmOverwrite(conflicts)
      : false;

    if (!confirmed) {
      throw new FileConflictError(conflicts);
    }
  }

  if (dryRun) {
    return options.files.map((file) => file.targetPath);
  }

  const snapshots = new Map<string, FileSnapshot>();
  const touchedPaths: string[] = [];

  try {
    for (const file of options.files) {
      const outputPath = resolve(options.cwd, file.targetPath);

      if (!snapshots.has(outputPath)) {
        const existed = await pathExists(outputPath);
        if (existed) {
          snapshots.set(outputPath, {
            existed: true,
            content: await readFile(outputPath, "utf8")
          });
        } else {
          snapshots.set(outputPath, { existed: false });
        }
      }

      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, file.content, "utf8");
      touchedPaths.push(outputPath);
    }
  } catch (error) {
    const rollbackErrors: string[] = [];
    const rollbackTargets = Array.from(new Set(touchedPaths)).reverse();

    for (const outputPath of rollbackTargets) {
      const snapshot = snapshots.get(outputPath);
      if (!snapshot) {
        continue;
      }

      try {
        if (snapshot.existed) {
          await writeFile(outputPath, snapshot.content ?? "", "utf8");
        } else {
          await rm(outputPath, { force: true });
        }
      } catch (rollbackError) {
        const reason = rollbackError instanceof Error ? rollbackError.message : String(rollbackError);
        rollbackErrors.push(`${outputPath}: ${reason}`);
      }
    }

    throw new WriteFilesTransactionError(error, rollbackErrors);
  }

  return options.files.map((file) => file.targetPath);
}
