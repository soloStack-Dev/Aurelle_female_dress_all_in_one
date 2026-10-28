"use client";

import { usePathname } from "next/navigation";

const bareRoutes = ["/signup", "/create-account", "/login", "/terms", "/privacy"];

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
  const bare = bareRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (bare) {
    return (
      <main id="main" className="min-h-dvh">
        {children}
      </main>
    );
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
