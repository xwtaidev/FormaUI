"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "../lib/cn";
import { Button } from "../primitives/button";

export interface PaginationBarProps {
  totalItems: number;
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), totalPages);
}

function toPositiveInt(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return fallback;
  }
  return Math.floor(value);
}

export function PaginationBar({
  totalItems,
  page,
  defaultPage = 1,
  pageSize,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  className
}: PaginationBarProps) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  useEffect(() => {
    if (typeof page === "number") {
      setInternalPage(page);
    }
  }, [page]);

  useEffect(() => {
    if (typeof pageSize === "number") {
      setInternalPageSize(pageSize);
    }
  }, [pageSize]);

  const resolvedPageSize = toPositiveInt(pageSize ?? internalPageSize, defaultPageSize);
  const totalPages = useMemo(() => {
    if (totalItems <= 0) {
      return 1;
    }
    return Math.max(1, Math.ceil(totalItems / resolvedPageSize));
  }, [resolvedPageSize, totalItems]);
  const resolvedPage = clampPage(page ?? internalPage, totalPages);

  const normalizedOptions = useMemo(() => {
    const unique = new Set(pageSizeOptions.map((value) => toPositiveInt(value, 10)));
    unique.add(resolvedPageSize);
    return Array.from(unique).sort((left, right) => left - right);
  }, [pageSizeOptions, resolvedPageSize]);

  const commitPage = (nextPage: number) => {
    const safePage = clampPage(nextPage, totalPages);
    if (page === undefined) {
      setInternalPage(safePage);
    }
    onPageChange?.(safePage);
  };

  const commitPageSize = (nextPageSize: number) => {
    const safePageSize = toPositiveInt(nextPageSize, resolvedPageSize);
    if (pageSize === undefined) {
      setInternalPageSize(safePageSize);
    }
    onPageSizeChange?.(safePageSize);
    commitPage(1);
  };

  return (
    <nav
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      aria-label="Pagination controls"
    >
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Page {resolvedPage} of {totalPages} ({Math.max(totalItems, 0)} items)
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          Rows per page
          <select
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
            value={String(resolvedPageSize)}
            onChange={(event) => commitPageSize(Number(event.target.value))}
            aria-label="Rows per page"
          >
            {normalizedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => commitPage(resolvedPage - 1)}
          disabled={resolvedPage <= 1}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => commitPage(resolvedPage + 1)}
          disabled={resolvedPage >= totalPages}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
