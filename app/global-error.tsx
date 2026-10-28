"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

/**
 * Last-resort boundary. It replaces the root layout, so it renders its own
 * <html>/<body> and cannot rely on the design system's CSS being present.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError({ ...error, digest: error.digest }, "global-error");
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f7f2ea",
          color: "#161310",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <p
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b625a",
            }}
          >
            Aurelle — application error
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              lineHeight: 1.05,
              fontWeight: 400,
              margin: "1rem 0 0",
            }}
          >
            The atelier is temporarily closed.
          </h1>
          <p style={{ marginTop: "1rem", color: "#6b625a", lineHeight: 1.7 }}>
            Something failed before the page could load. Please try again. If it keeps happening,
            email hello@aurelle.studio and we will fix it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.75rem",
              border: 0,
              borderRadius: 999,
              background: "#161310",
              color: "#f7f2ea",
              padding: "0.85rem 1.5rem",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Reload the page
          </button>
        </main>
      </body>
    </html>
  );
}
