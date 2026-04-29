import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface TreeNode {
  key: string;
  title: React.ReactNode;
  disabled?: boolean;
  children?: TreeNode[];
}

export interface TreeSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  data: TreeNode[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

const flattenNodes = (nodes: TreeNode[]): Record<string, string> => {
  return nodes.reduce<Record<string, string>>((acc, node) => {
    acc[node.key] = typeof node.title === "string" ? node.title : node.key;
    if (node.children?.length) {
      Object.assign(acc, flattenNodes(node.children));
    }
    return acc;
  }, {});
};

export const TreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    { className, data, value, defaultValue, onValueChange, placeholder = "Select from tree", disabled = false, multiple = false, ...props },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue ?? (multiple ? [] : ""));
    const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(false);
    const labels = React.useMemo(() => flattenNodes(data), [data]);

    const selectedValue = isControlled ? value : internalValue;
    const selectedKeys = React.useMemo(
      () => (Array.isArray(selectedValue) ? selectedValue : selectedValue ? [selectedValue] : []),
      [selectedValue]
    );

    const selectedLabel = selectedKeys.map((item) => labels[item] ?? item).join(", ");

    const commit = (nextKeys: string[]) => {
      const nextValue: string | string[] = multiple ? nextKeys : nextKeys[0] ?? "";
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
      if (!multiple) {
        setOpen(false);
      }
    };

    const selectedKeySet = React.useMemo(() => new Set(selectedKeys), [selectedKeys]);
    const expandedKeySet = React.useMemo(() => new Set(expandedKeys), [expandedKeys]);

    const toggleExpanded = (key: string) => {
      const next = new Set(expandedKeySet);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      setExpandedKeys([...next]);
    };

    const toggleSelect = (key: string) => {
      if (multiple) {
        const next = new Set(selectedKeySet);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        commit([...next]);
        return;
      }
      commit([key]);
    };

    const renderNodes = (nodes: TreeNode[], level: number) => (
      <ul role={level === 0 ? "tree" : "group"} className={cn("space-y-1", level > 0 && "ml-4 border-l border-border pl-3")}>
        {nodes.map((node) => {
          const hasChildren = Boolean(node.children?.length);
          const expanded = expandedKeySet.has(node.key);
          const selected = selectedKeySet.has(node.key);
          return (
            <li key={node.key} className="space-y-1">
              <div className="flex items-center gap-1">
                {hasChildren ? (
                  <button
                    type="button"
                    aria-label={expanded ? "Collapse node" : "Expand node"}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                    onClick={() => toggleExpanded(node.key)}
                  >
                    {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                ) : (
                  <span className="inline-block h-7 w-7" />
                )}
                <button
                  type="button"
                  role="treeitem"
                  aria-expanded={hasChildren ? expanded : undefined}
                  aria-selected={selected}
                  disabled={node.disabled}
                  className={cn(
                    "inline-flex h-8 flex-1 items-center rounded-md px-2 text-left text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
                    selected && "bg-muted font-medium"
                  )}
                  onClick={() => toggleSelect(node.key)}
                >
                  {node.title}
                </button>
              </div>
              {hasChildren && expanded ? renderNodes(node.children ?? [], level + 1) : null}
            </li>
          );
        })}
      </ul>
    );

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn("w-full justify-between text-left font-normal", !selectedLabel && "text-muted-foreground")}
            >
              <span className="truncate">{selectedLabel || placeholder}</span>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[min(28rem,90vw)] p-3">
            {renderNodes(data, 0)}
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

TreeSelect.displayName = "TreeSelect";
