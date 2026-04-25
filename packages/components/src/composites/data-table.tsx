"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export type DataTableAlign = "left" | "center" | "right";

export interface DataTableColumn<TData extends object = Record<string, unknown>> {
  key: Extract<keyof TData, string>;
  header: string;
  sortable?: boolean;
  align?: DataTableAlign;
  className?: string;
  render?: (value: unknown, row: TData, rowIndex: number) => ReactNode;
}

export interface DataTableProps<TData extends object = Record<string, unknown>> {
  columns: Array<DataTableColumn<TData>>;
  rows: TData[];
  caption?: string;
  className?: string;
  emptyMessage?: string;
}

type SortDirection = "asc" | "desc";

interface SortState {
  key: string;
  direction: SortDirection;
}

function toComparableValue(value: unknown): string | number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase();
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).toLowerCase();
}

function alignClassName(align: DataTableAlign | undefined) {
  if (align === "right") {
    return "text-right";
  }
  if (align === "center") {
    return "text-center";
  }
  return "text-left";
}

export function DataTable<TData extends object>({
  columns,
  rows,
  caption,
  className,
  emptyMessage = "No records found."
}: DataTableProps<TData>) {
  const [sortState, setSortState] = useState<SortState | null>(null);

  const sortedRows = useMemo(() => {
    if (!sortState) {
      return rows;
    }

    const activeColumn = columns.find((column) => column.key === sortState.key);
    if (!activeColumn?.sortable) {
      return rows;
    }

    const direction = sortState.direction === "asc" ? 1 : -1;
    return [...rows].sort((left, right) => {
      const leftValue = toComparableValue((left as Record<string, unknown>)[sortState.key]);
      const rightValue = toComparableValue((right as Record<string, unknown>)[sortState.key]);

      if (leftValue > rightValue) {
        return direction;
      }
      if (leftValue < rightValue) {
        return -direction;
      }
      return 0;
    });
  }, [columns, rows, sortState]);

  const handleSort = (column: DataTableColumn<TData>) => {
    if (!column.sortable) {
      return;
    }

    setSortState((previous) => {
      if (!previous || previous.key !== column.key) {
        return { key: column.key, direction: "asc" };
      }

      return {
        key: column.key,
        direction: previous.direction === "asc" ? "desc" : "asc"
      };
    });
  };

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}>
      <table className="w-full border-collapse">
        {caption ? <caption className="px-4 py-3 text-left text-sm text-muted-foreground">{caption}</caption> : null}
        <thead className="bg-muted/50">
          <tr>
            {columns.map((column) => {
              const isActiveSort = sortState?.key === column.key;
              const sortIcon = !column.sortable
                ? null
                : isActiveSort
                  ? sortState.direction === "asc"
                    ? "↑"
                    : "↓"
                  : "↕";

              return (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    alignClassName(column.align),
                    column.className
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-sm px-1 py-0.5 transition-colors hover:bg-muted",
                        alignClassName(column.align)
                      )}
                      aria-label={`Sort by ${column.header}`}
                      onClick={() => handleSort(column)}
                    >
                      <span>{column.header}</span>
                      <span aria-hidden>{sortIcon}</span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length > 0 ? (
            sortedRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border">
                {columns.map((column) => {
                  const value = (row as Record<string, unknown>)[column.key];
                  return (
                    <td
                      key={`${column.key}-${rowIndex}`}
                      className={cn(
                        "px-4 py-3 text-sm text-foreground",
                        alignClassName(column.align),
                        column.className
                      )}
                    >
                      {column.render ? column.render(value, row, rowIndex) : (value as ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr className="border-t border-border">
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
