"use client";

import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  error?: string;
};

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ id, error, className = "", ...props }, ref) {
    const [show, setShow] = useState(false);

    return (
      <div>
        <label htmlFor={id} className="sr-only">
          Password
        </label>
        <div className="relative">
          <LuLock
            className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#5e4f44]"
            aria-hidden="true"
          />
          <input
            {...props}
            ref={ref}
            id={id}
            type={show ? "text" : "password"}
            placeholder="Password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`h-[52px] w-full rounded-xl border bg-white/28 pl-11 pr-11 text-sm text-[#111111] placeholder:text-[#5e4f44] focus:outline-none focus:ring-2 focus:ring-black/20 ${
              error ? "border-[#d9534f]" : "border-white/55"
            } ${className}`}
          />
          <button
            type="button"
            onClick={() => setShow((current) => !current)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute right-2.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-[#5e4f44] transition-colors hover:bg-black/5 hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            {show ? <LuEye className="size-[18px]" /> : <LuEyeOff className="size-[18px]" />}
          </button>
        </div>
        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-[11px] leading-snug text-[#7c1d16]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

export default PasswordField;
