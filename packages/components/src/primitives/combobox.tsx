import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ComboboxOption {
  value: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

function matchesQuery(option: ComboboxOption, query: string) {
  if (!query) {
    return true;
  }
  const haystack = [option.label, option.value, ...(option.keywords ?? [])].join(" ").toLowerCase();
  return haystack.includes(query);
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Select an option",
      searchPlaceholder = "Search options",
      emptyMessage = "No options found.",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = typeof value === "string";
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const selectedValue = isControlled ? value ?? "" : internalValue;

    const selectedOption = React.useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue]
    );

    const filteredOptions = React.useMemo(
      () => options.filter((option) => matchesQuery(option, query.trim().toLowerCase())),
      [options, query]
    );

    const commitSelection = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (!nextOpen) {
              setQuery("");
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn("w-full justify-between text-left font-normal", !selectedOption && "text-muted-foreground")}
            >
              <span className="truncate">{selectedOption?.label ?? placeholder}</span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[16rem] p-2" align="start">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
            <div role="listbox" className="mt-2 max-h-56 space-y-1 overflow-y-auto">
              {filteredOptions.length ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={option.value === selectedValue}
                    disabled={option.disabled}
                    className={cn(
                      "inline-flex h-9 w-full items-center justify-between rounded-md px-2 text-sm text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
                      option.value === selectedValue && "bg-muted"
                    )}
                    onClick={() => {
                      commitSelection(option.value);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                    <Check className={cn("h-4 w-4", option.value === selectedValue ? "opacity-100" : "opacity-0")} />
                  </button>
                ))
              ) : (
                <p className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">
                  {emptyMessage}
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

Combobox.displayName = "Combobox";
