/**
 * Client-side error reporter.
 *
 * Sends the error to the local `/api/log-error` route, which appends it to
 * `ErrorLog/runtime-errors.log`. Failures to report are swallowed: logging must
 * never break the error boundary itself.
 */
export function reportError(error: unknown, context: string) {
  if (typeof window === "undefined") return;

  const normalised =
    error instanceof Error
      ? { message: error.message, stack: error.stack }
      : { message: String(error) };

  const payload = {
    ...normalised,
    context,
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  fetch("/api/log-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => undefined);
}
