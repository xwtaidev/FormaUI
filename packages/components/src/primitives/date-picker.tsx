import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});

export interface DatePickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange"> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (value: Date | undefined) => void;
  placeholder?: string;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, value, defaultValue, onChange, placeholder = "Pick a date", disabled, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
    const [open, setOpen] = React.useState(false);
    const selectedDate = isControlled ? value : internalValue;

    const commit = (nextDate: Date | undefined) => {
      if (!isControlled) {
        setInternalValue(nextDate);
      }
      onChange?.(nextDate);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn("w-full justify-start gap-2 text-left font-normal", !selectedDate && "text-muted-foreground", className)}
            {...props}
          >
            <CalendarIcon className="h-4 w-4 shrink-0" />
            {selectedDate ? dateFormatter.format(selectedDate) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <Calendar
            value={selectedDate}
            onSelect={(nextDate) => {
              commit(nextDate);
              setOpen(false);
            }}
          />
          {selectedDate ? (
            <button
              type="button"
              className="mt-3 inline-flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
              onClick={() => {
                commit(undefined);
                setOpen(false);
              }}
            >
              Clear date
            </button>
          ) : null}
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";
