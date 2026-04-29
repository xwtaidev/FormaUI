import * as React from "react";
import { Check, ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface CascaderOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: CascaderOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const pathToLabel = (options: CascaderOption[], valuePath: string[]) => {
  const labels: string[] = [];
  let current = options;
  for (const value of valuePath) {
    const match = current.find((option) => option.value === value);
    if (!match) {
      break;
    }
    labels.push(match.label);
    current = match.children ?? [];
  }
  return labels;
};

const collectColumns = (options: CascaderOption[], valuePath: string[]) => {
  const columns: CascaderOption[][] = [options];
  let current = options;
  for (const value of valuePath) {
    const match = current.find((option) => option.value === value);
    if (!match?.children?.length) {
      break;
    }
    columns.push(match.children);
    current = match.children;
  }
  return columns;
};

export const Cascader = React.forwardRef<HTMLDivElement, CascaderProps>(
  ({ className, options, value, defaultValue, onValueChange, placeholder = "Select path", disabled = false, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
    const [open, setOpen] = React.useState(false);
    const selectedPath = isControlled ? value ?? [] : internalValue;

    const selectedLabels = React.useMemo(() => pathToLabel(options, selectedPath), [options, selectedPath]);
    const columns = React.useMemo(() => collectColumns(options, selectedPath), [options, selectedPath]);

    const commit = (nextPath: string[]) => {
      if (!isControlled) {
        setInternalValue(nextPath);
      }
      onValueChange?.(nextPath);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between text-left font-normal", !selectedLabels.length && "text-muted-foreground")}
            >
              <span className="truncate">{selectedLabels.length ? selectedLabels.join(" / ") : placeholder}</span>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[min(36rem,90vw)] p-2" align="start">
            <div className="flex gap-2 overflow-x-auto">
              {columns.map((column, columnIndex) => (
                <div key={`column-${columnIndex}`} className="min-w-44 space-y-1 border-r border-border pr-2 last:border-r-0 last:pr-0">
                  {column.map((option) => {
                    const isSelected = selectedPath[columnIndex] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={option.disabled}
                        className={cn(
                          "inline-flex h-9 w-full items-center justify-between rounded-md px-2 text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
                          isSelected && "bg-muted"
                        )}
                        onClick={() => {
                          const nextPath = [...selectedPath.slice(0, columnIndex), option.value];
                          if (option.children?.length) {
                            commit(nextPath);
                            return;
                          }
                          commit(nextPath);
                          setOpen(false);
                        }}
                      >
                        <span className="truncate">{option.label}</span>
                        {option.children?.length ? (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Check className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

Cascader.displayName = "Cascader";
