"use client";

import { forwardRef, useId, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

type UnderlineFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  trailing?: ReactNode;
};

const UnderlineField = forwardRef<HTMLInputElement, UnderlineFieldProps>(
  function UnderlineField(
    { label, error, trailing, id, onFocus, onBlur, className = "", ...props },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const [focused, setFocused] = useState(false);

    return (
      <div>
        <label htmlFor={fieldId} className="sr-only">
          {label}
        </label>
        <div
          className={`relative border-b pb-2 pt-4 ${
            error ? "border-[#d9534f]" : "border-[#d9d5d0]"
          }`}
        >
          <input
            {...props}
            ref={ref}
            id={fieldId}
            placeholder={label}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className={`h-8 w-full bg-transparent pr-8 text-[13px] text-[#121214] placeholder:text-[#5f5b57] focus:outline-none ${className}`}
          />
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-px left-0 h-px w-full origin-left"
            initial={false}
            animate={{
              scaleX: focused || error ? 1 : 0,
              backgroundColor: error ? "#d9534f" : "#121214",
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
          {trailing ? (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">{trailing}</div>
          ) : null}
        </div>
        {error ? (
          <p id={`${fieldId}-error`} className="mt-1.5 text-[11px] text-[#b3261e]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

export default UnderlineField;
