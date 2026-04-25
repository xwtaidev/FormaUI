import { existsSync } from "node:fs";
import { resolve } from "node:path";

import {
  REGISTRY_ITEM_TYPES,
  type RegistryFile,
  type RegistryItem,
  type RegistryItemType
} from "./schema.js";

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface ValidateOptions {
  checkFiles?: boolean;
  repoRoot?: string;
}

function isItemType(value: unknown): value is RegistryItemType {
  return typeof value === "string" && REGISTRY_ITEM_TYPES.includes(value as RegistryItemType);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string" && entry.trim().length > 0);
}

function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || isStringArray(value);
}

function isOptionalNonEmptyString(value: unknown): value is string | undefined {
  return value === undefined || (typeof value === "string" && value.trim().length > 0);
}

function isSemverVersion(value: string) {
  return /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u.test(value);
}

function isSha256Checksum(value: string) {
  return /^[a-fA-F0-9]{64}$/u.test(value);
}

function isRegistryFile(value: unknown): value is RegistryFile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<RegistryFile>;
  return (
    typeof candidate.source === "string" &&
    candidate.source.trim().length > 0 &&
    typeof candidate.target === "string" &&
    candidate.target.trim().length > 0
  );
}

export function validateRegistryItem(item: unknown, options: ValidateOptions = {}): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!item || typeof item !== "object") {
    issues.push({ field: "item", message: "Registry item must be an object." });
    return { valid: false, issues };
  }

  const candidate = item as Partial<RegistryItem>;

  if (!candidate.name || typeof candidate.name !== "string") {
    issues.push({ field: "name", message: "name must be a non-empty string." });
  }

  if (!isItemType(candidate.type)) {
    issues.push({
      field: "type",
      message: `type must be one of: ${REGISTRY_ITEM_TYPES.join(", ")}.`
    });
  }

  if (!isOptionalNonEmptyString(candidate.version)) {
    issues.push({ field: "version", message: "version must be a non-empty string when provided." });
  } else if (candidate.version && !isSemverVersion(candidate.version)) {
    issues.push({ field: "version", message: "version must follow semver format (for example 1.2.3)." });
  }

  if (!isOptionalNonEmptyString(candidate.description)) {
    issues.push({
      field: "description",
      message: "description must be a non-empty string when provided."
    });
  }

  if (!isOptionalStringArray(candidate.tags)) {
    issues.push({
      field: "tags",
      message: "tags must be an array of non-empty strings when provided."
    });
  }

  if (!isOptionalStringArray(candidate.frameworks)) {
    issues.push({
      field: "frameworks",
      message: "frameworks must be an array of non-empty strings when provided."
    });
  }

  if (!isOptionalStringArray(candidate.sources)) {
    issues.push({
      field: "sources",
      message: "sources must be an array of non-empty strings when provided."
    });
  }

  if (!isOptionalNonEmptyString(candidate.checksum)) {
    issues.push({
      field: "checksum",
      message: "checksum must be a non-empty string when provided."
    });
  } else if (candidate.checksum && !isSha256Checksum(candidate.checksum)) {
    issues.push({
      field: "checksum",
      message: "checksum must be a 64-character SHA256 hex digest."
    });
  }

  if (!isStringArray(candidate.dependencies)) {
    issues.push({
      field: "dependencies",
      message: "dependencies must be an array of non-empty strings."
    });
  }

  if (!isStringArray(candidate.devDependencies)) {
    issues.push({
      field: "devDependencies",
      message: "devDependencies must be an array of non-empty strings."
    });
  }

  if (!isStringArray(candidate.registryDependencies)) {
    issues.push({
      field: "registryDependencies",
      message: "registryDependencies must be an array of non-empty strings."
    });
  }

  if (!Array.isArray(candidate.files) || candidate.files.length === 0) {
    issues.push({ field: "files", message: "files must be a non-empty array." });
  } else {
    candidate.files.forEach((entry, index) => {
      if (!isRegistryFile(entry)) {
        issues.push({
          field: `files[${index}]`,
          message: "Each file entry must include non-empty source and target fields."
        });
        return;
      }

      if (options.checkFiles) {
        const sourcePath = resolve(options.repoRoot ?? process.cwd(), entry.source);
        if (!existsSync(sourcePath)) {
          issues.push({
            field: `files[${index}].source`,
            message: `Source file does not exist: ${entry.source}`
          });
        }
      }
    });
  }

  return { valid: issues.length === 0, issues };
}

export function validateRegistryItems(items: RegistryItem[], options: ValidateOptions = {}): ValidationResult {
  const issues: ValidationIssue[] = [];
  const knownNames = new Set<string>();

  items.forEach((item, index) => {
    const result = validateRegistryItem(item, options);
    for (const issue of result.issues) {
      issues.push({
        field: `items[${index}].${issue.field}`,
        message: issue.message
      });
    }

    if (knownNames.has(item.name)) {
      issues.push({
        field: `items[${index}].name`,
        message: `Duplicate registry item name: ${item.name}`
      });
    }
    knownNames.add(item.name);
  });

  items.forEach((item, index) => {
    item.registryDependencies.forEach((dependency) => {
      if (!knownNames.has(dependency)) {
        issues.push({
          field: `items[${index}].registryDependencies`,
          message: `Unknown registry dependency: ${dependency}`
        });
      }
    });
  });

  return { valid: issues.length === 0, issues };
}
