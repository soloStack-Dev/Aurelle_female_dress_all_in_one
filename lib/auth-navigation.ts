export const protectedRoutes = [
  "/collection",
  "/about",
  "/blog",
  "/pricing",
  "/contact",
] as const;

export const authEntryPath = "/collection";

export function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function authHref(mode: "login" | "signup", next = authEntryPath) {
  return `/${mode}?next=${encodeURIComponent(next)}`;
}

export function getAuthNextPath(fallback = authEntryPath) {
  if (typeof window === "undefined") return fallback;

  const next = new URLSearchParams(window.location.search).get("next");
  if (!next) return fallback;

  const resolved = new URL(next, window.location.origin);
  if (resolved.origin !== window.location.origin) return fallback;
  const authRoutes = ["/login", "/signup", "/create-account"];
  if (
    authRoutes.some(
      (route) =>
        resolved.pathname === route || resolved.pathname.startsWith(`${route}/`),
    )
  ) {
    return fallback;
  }

  return `${resolved.pathname}${resolved.search}${resolved.hash}`;
}
