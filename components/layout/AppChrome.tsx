"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isProtectedPath } from "@/lib/auth-navigation";
import { useAuth } from "@/lib/store/auth";

const bareRoutes = ["/signup", "/create-account", "/login", "/terms", "/privacy"];

function SessionGate({ redirecting }: { redirecting: boolean }) {
  return (
    <main
      id="main"
      className="grid min-h-dvh place-items-center bg-cream px-6 text-center"
    >
      <div className="flex flex-col items-center">
        <p className="font-display text-2xl tracking-[0.22em]">
          AURELLE
        </p>
        <span
          className="mt-7 size-6 animate-spin rounded-full border border-ink/15 border-t-ember"
          aria-hidden="true"
        />
        <p role="status" aria-live="polite" className="mt-4 text-xs text-muted">
          {redirecting ? "Taking you to sign in..." : "Checking your session..."}
        </p>
      </div>
    </main>
  );
}

export default function AppChrome({
  children,
  header,
  progress,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  progress: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuth((state) => state.user);
  const hydrated = useAuth((state) => state.hydrated);
  const loggingOut = useAuth((state) => state.loggingOut);

  const bare = bareRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const protectedRoute = isProtectedPath(pathname);

  useEffect(() => {
    if (!useAuth.getState().hydrated) {
      void useAuth.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    if (!protectedRoute || !hydrated || user || loggingOut) return;

    const next = `${pathname}${window.location.search}`;
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [hydrated, loggingOut, pathname, protectedRoute, router, user]);

  if (bare) {
    return (
      <main id="main" className="min-h-dvh">
        {children}
      </main>
    );
  }

  if (protectedRoute && (!hydrated || !user)) {
    return <SessionGate redirecting={hydrated} />;
  }

  return (
    <>
      {progress}
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
