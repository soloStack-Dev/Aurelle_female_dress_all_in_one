"use client";

import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

type Status = "idle" | "error" | "success";

/**
 * Newsletter form with real client-side validation.
 *
 * There is no email provider wired up yet, so the success message explicitly
 * says the sign-up is not stored — the UI never fakes a backend request.
 */
export default function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!valid) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? "" : "w-full max-w-md"}>
      <label htmlFor={compact ? "footer-email" : "newsletter-email"} className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-pill border border-ink/20 bg-cream/70 p-1.5 pl-5 focus-within:border-ember">
        <input
          id={compact ? "footer-email" : "newsletter-email"}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted/70"
        />
        <button
          type="submit"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-cream transition-colors hover:bg-ember"
          aria-label="Subscribe to the newsletter"
        >
          {status === "success" ? <FiCheck className="size-4" /> : <FiArrowRight className="size-4" />}
        </button>
      </div>

      <p aria-live="polite" className="mt-2 min-h-5 px-2 text-xs">
        {status === "error" ? (
          <span id="newsletter-error" className="text-burgundy">
            Please enter a valid email address.
          </span>
        ) : null}
        {status === "success" ? (
          <span className="text-muted">
            Thank you — this demo doesn&apos;t send or store emails yet.
          </span>
        ) : null}
      </p>
    </form>
  );
}
