import * as React from "react";

import { cn } from "../lib/cn";

export interface InputOtpProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  length?: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
  inputClassName?: string;
}

function normalizeValue(value: string, length: number) {
  return value.slice(0, length);
}

export const InputOtp = React.forwardRef<HTMLDivElement, InputOtpProps>(
  (
    { className, inputClassName, value, defaultValue = "", length = 6, disabled = false, onChange, ...props },
    ref
  ) => {
    const isControlled = typeof value === "string";
    const [internalValue, setInternalValue] = React.useState(() => normalizeValue(defaultValue, length));
    const currentValue = normalizeValue(isControlled ? value : internalValue, length);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const commit = React.useCallback(
      (nextValue: string) => {
        const normalized = normalizeValue(nextValue, length);
        if (!isControlled) {
          setInternalValue(normalized);
        }
        onChange?.(normalized);
      },
      [isControlled, length, onChange]
    );

    const chars = Array.from({ length }, (_, index) => currentValue[index] ?? "");

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={char}
            disabled={disabled}
            aria-label={`Digit ${index + 1}`}
            className={cn(
              "h-10 w-10 rounded-md border border-border bg-background text-center text-sm font-medium text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
              inputClassName
            )}
            onChange={(event) => {
              const nextChar = event.target.value.slice(-1);
              const nextChars = [...chars];
              nextChars[index] = nextChar;
              commit(nextChars.join(""));
              if (nextChar && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                if (!chars[index] && index > 0) {
                  const nextChars = [...chars];
                  nextChars[index - 1] = "";
                  commit(nextChars.join(""));
                  inputRefs.current[index - 1]?.focus();
                  event.preventDefault();
                }
              } else if (event.key === "ArrowLeft" && index > 0) {
                inputRefs.current[index - 1]?.focus();
                event.preventDefault();
              } else if (event.key === "ArrowRight" && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
                event.preventDefault();
              }
            }}
            onPaste={(event) => {
              const pasted = normalizeValue(event.clipboardData.getData("text"), length).split("");
              if (pasted.length === 0) {
                return;
              }
              const nextChars = [...chars];
              for (let offset = 0; offset < pasted.length && index + offset < length; offset += 1) {
                nextChars[index + offset] = pasted[offset] ?? "";
              }
              commit(nextChars.join(""));
              const focusIndex = Math.min(index + pasted.length, length - 1);
              inputRefs.current[focusIndex]?.focus();
              event.preventDefault();
            }}
          />
        ))}
      </div>
    );
  }
);

InputOtp.displayName = "InputOtp";
