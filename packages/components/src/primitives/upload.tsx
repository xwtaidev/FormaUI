import * as React from "react";

import { cn } from "../lib/cn";

export interface UploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "multiple" | "value" | "defaultValue" | "onChange" | "className"
  > {
  value?: File | null;
  defaultValue?: File | null;
  onValueChange?: (file: File | null) => void;
  onValidationError?: (message: string | null) => void;
  maxSizeInBytes?: number;
  allowedTypes?: string[];
  helperText?: string;
  clearLabel?: string;
  className?: string;
  inputClassName?: string;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  (
    {
      className,
      inputClassName,
      value,
      defaultValue = null,
      onValueChange,
      onValidationError,
      maxSizeInBytes,
      allowedTypes,
      helperText = "Single file upload. Validation runs locally.",
      clearLabel = "Clear file",
      disabled,
      "aria-label": ariaLabel = "Upload file",
      ...inputProps
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalFile, setInternalFile] = React.useState<File | null>(defaultValue);
    const [error, setError] = React.useState<string | null>(null);
    const currentFile = isControlled ? value ?? null : internalFile;

    const commitFile = React.useCallback(
      (nextFile: File | null) => {
        if (!isControlled) {
          setInternalFile(nextFile);
        }
        onValueChange?.(nextFile);
      },
      [isControlled, onValueChange]
    );

    const emitError = React.useCallback(
      (message: string | null) => {
        setError(message);
        onValidationError?.(message);
      },
      [onValidationError]
    );

    const validateAndCommit = (file: File | null) => {
      if (!file) {
        emitError(null);
        commitFile(null);
        return;
      }

      if (allowedTypes?.length && !allowedTypes.includes(file.type)) {
        emitError(`File type must be one of: ${allowedTypes.join(", ")}.`);
        return;
      }

      if (typeof maxSizeInBytes === "number" && file.size > maxSizeInBytes) {
        emitError(`File is too large. Max size is ${formatFileSize(maxSizeInBytes)}.`);
        return;
      }

      emitError(null);
      commitFile(file);
    };

    return (
      <div className={cn("space-y-2", className)}>
        <input
          ref={ref}
          type="file"
          multiple={false}
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(
            "flex h-10 w-full cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            validateAndCommit(file);
          }}
          {...inputProps}
        />
        <p className="text-xs text-muted-foreground">{helperText}</p>
        {error ? (
          <p role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        ) : null}
        {currentFile ? (
          <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2">
            <p className="truncate text-xs text-foreground">
              {currentFile.name} ({formatFileSize(currentFile.size)})
            </p>
            <button
              type="button"
              className="inline-flex h-7 items-center rounded-md border border-border px-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              aria-label={clearLabel}
              onClick={() => validateAndCommit(null)}
              disabled={disabled}
            >
              Remove
            </button>
          </div>
        ) : null}
      </div>
    );
  }
);

Upload.displayName = "Upload";
