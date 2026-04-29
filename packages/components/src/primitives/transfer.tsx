import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";

export interface TransferItem {
  key: string;
  title: string;
  disabled?: boolean;
}

export interface TransferProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  data: TransferItem[];
  targetKeys: string[];
  selectedKeys?: string[];
  onChange: (targetKeys: string[]) => void;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  disabled?: boolean;
}

function partitionByTarget(data: TransferItem[], targetKeys: string[]) {
  const targetSet = new Set(targetKeys);
  const source: TransferItem[] = [];
  const target: TransferItem[] = [];
  for (const item of data) {
    if (targetSet.has(item.key)) {
      target.push(item);
    } else {
      source.push(item);
    }
  }
  return { source, target };
}

export const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  ({ className, data, targetKeys, selectedKeys, onChange, onSelectChange, disabled = false, ...props }, ref) => {
    const isControlledSelected = selectedKeys !== undefined;
    const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<string[]>([]);
    const activeSelectedKeys = isControlledSelected ? selectedKeys ?? [] : internalSelectedKeys;

    const sourceSelected = activeSelectedKeys.filter((key) => !targetKeys.includes(key));
    const targetSelected = activeSelectedKeys.filter((key) => targetKeys.includes(key));
    const { source, target } = React.useMemo(() => partitionByTarget(data, targetKeys), [data, targetKeys]);

    const updateSelected = (nextSelected: string[]) => {
      if (!isControlledSelected) {
        setInternalSelectedKeys(nextSelected);
      }
      onSelectChange?.(
        nextSelected.filter((key) => !targetKeys.includes(key)),
        nextSelected.filter((key) => targetKeys.includes(key))
      );
    };

    const toggleItem = (key: string) => {
      if (activeSelectedKeys.includes(key)) {
        updateSelected(activeSelectedKeys.filter((item) => item !== key));
        return;
      }
      updateSelected([...activeSelectedKeys, key]);
    };

    const moveRight = () => {
      const additions = sourceSelected.filter((key) => !targetKeys.includes(key));
      if (!additions.length) {
        return;
      }
      const nextTargetKeys = [...targetKeys, ...additions];
      onChange(nextTargetKeys);
      updateSelected(activeSelectedKeys.filter((key) => !additions.includes(key)));
    };

    const moveLeft = () => {
      if (!targetSelected.length) {
        return;
      }
      const targetSelectedSet = new Set(targetSelected);
      const nextTargetKeys = targetKeys.filter((key) => !targetSelectedSet.has(key));
      onChange(nextTargetKeys);
      updateSelected(activeSelectedKeys.filter((key) => !targetSelectedSet.has(key)));
    };

    const renderList = (items: TransferItem[], listSelectedKeys: string[], title: string) => (
      <div className="flex min-h-56 flex-1 flex-col rounded-md border border-border">
        <div className="border-b border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </div>
        <div className="space-y-1 p-2">
          {items.length ? (
            items.map((item) => {
              const checked = listSelectedKeys.includes(item.key);
              return (
                <label
                  key={item.key}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                    item.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled || item.disabled}
                    onChange={() => toggleItem(item.key)}
                  />
                  <span className="truncate">{item.title}</span>
                </label>
              );
            })
          ) : (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No items</p>
          )}
        </div>
      </div>
    );

    return (
      <div ref={ref} className={cn("flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center", className)} {...props}>
        {renderList(source, sourceSelected, "Available")}
        <div className="flex shrink-0 flex-row justify-center gap-2 md:flex-col">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Move selected to target"
            disabled={disabled || !sourceSelected.length}
            onClick={moveRight}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Move selected to source"
            disabled={disabled || !targetSelected.length}
            onClick={moveLeft}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        {renderList(target, targetSelected, "Selected")}
      </div>
    );
  }
);

Transfer.displayName = "Transfer";
