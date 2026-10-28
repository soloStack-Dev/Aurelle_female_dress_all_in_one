"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiRefreshCw } from "react-icons/fi";
import { reportError } from "@/lib/report-error";

/**
 * Route-level error boundary. Logs the failure once, then gives the visitor a
 * retry that re-renders the segment.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError({ ...error, digest: error.digest }, "route-error");
  }, [error]);

  return (
    <section className="flex min-h-[75svh] items-center pb-20 pt-32">
      <div className="shell">
        <p className="eyebrow">Something slipped</p>
        <h1 className="display-lg mt-5 max-w-2xl text-balance">
          A stitch came loose on this page.
        </h1>
        <p className="body-lg mt-5 max-w-lg">
          The page failed to render. You can try again, or head back to the collection while we
          look into it.
        </p>
        {error.digest ? (
          <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
          >
            <FiRefreshCw className="size-3.5" /> Try again
          </button>
          <Link
            href="/collection"
            className="link-underline text-[11px] font-semibold uppercase tracking-[0.14em]"
          >
            Back to the collection
          </Link>
        </div>
      </div>
    </section>
  );
}
