import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";

export interface TreeNode {
  key: string;
  title: React.ReactNode;
  disabled?: boolean;
  children?: TreeNode[];
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: TreeNode[];
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onExpandedChange?: (expandedKeys: string[]) => void;
  onSelectedChange?: (selectedKeys: string[]) => void;
  multiple?: boolean;
}

const toSet = (value: string[]) => new Set(value);

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      className,
      data,
      expandedKeys,
      defaultExpandedKeys,
      selectedKeys,
      defaultSelectedKeys,
      onExpandedChange,
      onSelectedChange,
      multiple = false,
      ...props
    },
    ref
  ) => {
    const expandedControlled = expandedKeys !== undefined;
    const selectedControlled = selectedKeys !== undefined;

    const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<string[]>(defaultExpandedKeys ?? []);
    const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<string[]>(defaultSelectedKeys ?? []);

    const currentExpanded = expandedControlled ? expandedKeys ?? [] : internalExpandedKeys;
    const currentSelected = selectedControlled ? selectedKeys ?? [] : internalSelectedKeys;

    const expandedSet = React.useMemo(() => toSet(currentExpanded), [currentExpanded]);
    const selectedSet = React.useMemo(() => toSet(currentSelected), [currentSelected]);

    const commitExpanded = (next: string[]) => {
      if (!expandedControlled) {
        setInternalExpandedKeys(next);
      }
      onExpandedChange?.(next);
    };

    const commitSelected = (next: string[]) => {
      if (!selectedControlled) {
        setInternalSelectedKeys(next);
      }
      onSelectedChange?.(next);
    };

    const toggleExpanded = (key: string) => {
      const next = new Set(expandedSet);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      commitExpanded([...next]);
    };

    const toggleSelected = (key: string) => {
      if (multiple) {
        const next = new Set(selectedSet);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        commitSelected([...next]);
        return;
      }
      commitSelected(selectedSet.has(key) ? [] : [key]);
    };

    const renderNodes = (nodes: TreeNode[], level: number) => {
      return (
        <ul role={level === 0 ? "tree" : "group"} className={cn("space-y-1", level > 0 && "ml-4 border-l border-border pl-3")}>
          {nodes.map((node) => {
            const hasChildren = Boolean(node.children?.length);
            const expanded = expandedSet.has(node.key);
            const selected = selectedSet.has(node.key);

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
                    onClick={() => toggleSelected(node.key)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight" && hasChildren && !expanded) {
                        event.preventDefault();
                        toggleExpanded(node.key);
                      } else if (event.key === "ArrowLeft" && hasChildren && expanded) {
                        event.preventDefault();
                        toggleExpanded(node.key);
                      } else if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleSelected(node.key);
                      }
                    }}
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
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {renderNodes(data, 0)}
      </div>
    );
  }
);

Tree.displayName = "Tree";
