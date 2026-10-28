import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for has moved or no longer exists.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pb-20 pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_20%,rgba(212,85,45,0.14),transparent_70%)]"
      />

      <div className="shell">
        <p className="eyebrow">404 — off the rail</p>
        <h1 className="display-xl mt-5 max-w-3xl text-balance">
          This page has left the <span className="italic text-ember">atelier</span>.
        </h1>
        <p className="body-lg mt-6 max-w-lg">
          The link may be old, or the piece may have sold out and moved on. The collection is
          still right where you left it.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
          >
            <FiArrowLeft className="size-3.5" /> Back home
          </Link>
          <Link
            href="/collection"
            className="link-underline text-[11px] font-semibold uppercase tracking-[0.14em]"
          >
            Browse the collection <FiArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
