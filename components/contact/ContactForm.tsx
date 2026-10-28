"use client";

import { useState, useSyncExternalStore } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { site } from "@/lib/data/site";

const topics = ["Order support", "Styling advice", "Membership", "Press", "Something else"];

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

function subscribeToUrl(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("aurelle:urlchange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("aurelle:urlchange", callback);
  };
}

function getPlanFromUrl() {
  return new URLSearchParams(window.location.search).get("plan");
}

/**
 * Reads the optional `?plan=` value without `useSearchParams`, so the form is
 * present in the server-rendered HTML. The fields remount (keyed) once the
 * client snapshot arrives, applying the prefill without a setState effect.
 */
export default function ContactForm() {
  const plan = useSyncExternalStore(subscribeToUrl, getPlanFromUrl, () => null);
  return <ContactFormFields key={plan ?? "default"} plan={plan} />;
}

function ContactFormFields({ plan }: { plan: string | null }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(plan ? "Membership" : topics[0]);
  const [message, setMessage] = useState(
    plan ? `I'd like to join the ${plan} membership. Please send me the details.` : "",
  );
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};

    if (name.trim().length < 2) nextErrors.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (message.trim().length < 20)
      nextErrors.message = "A little more detail helps us route your note (20+ characters).";
    if (!consent) nextErrors.consent = "Please agree to be contacted about this enquiry.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-frame border border-ink/10 bg-card p-8">
        <span className="grid size-12 place-items-center rounded-full bg-ember text-cream">
          <FiCheck className="size-5" />
        </span>
        <h2 className="mt-6 font-display text-3xl">Thank you, {name.split(" ")[0]}.</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Your message passed validation, but this demo has no mail provider connected — nothing
          was sent. To reach the atelier directly, email{" "}
          <a href={`mailto:${site.email}`} className="text-ember underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
            setConsent(false);
          }}
          className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink underline underline-offset-4"
        >
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-frame border border-ink/10 bg-card p-7 sm:p-9"
    >
      <h2 className="font-display text-3xl">Send a note</h2>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Most enquiries are answered within one business day.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 text-sm outline-none transition-colors focus:border-ember"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-[11px] text-burgundy">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 text-sm outline-none transition-colors focus:border-ember"
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-[11px] text-burgundy">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-topic" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="mt-2 w-full border-b border-ink/20 bg-transparent pb-2.5 text-sm outline-none transition-colors focus:border-ember"
        >
          {topics.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent pb-2.5 text-sm leading-relaxed outline-none transition-colors focus:border-ember"
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-[11px] text-burgundy">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-2.5 text-[11px] leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            className="mt-0.5 size-3.5 accent-ember"
          />
          I agree to be contacted about this enquiry. My details are not stored by this demo.
        </label>
        {errors.consent ? (
          <p id="contact-consent-error" className="mt-1.5 text-[11px] text-burgundy">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ember"
      >
        Send enquiry <FiArrowRight className="size-3.5" />
      </button>
    </form>
  );
}
