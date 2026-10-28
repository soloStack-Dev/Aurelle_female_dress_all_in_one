# 002 — React hooks, cleanup typing and generated-file lint noise

**When:** During the first `bunx tsc --noEmit` and `bun run lint` run after the
header, footer, hero and home sections were added.

## Errors

1. `components/ui/Sunburst.tsx` — `TS2345`: the `useEffect` callback returned
   `() => JSAnimation` (an arrow function with an expression body). React
   requires the cleanup to return `void` (or a destructor), not the value of
   `animation.pause()`.
2. `components/hero/HeroVisual.tsx` — `react-hooks/set-state-in-effect`:
   `setSupported(supportsWebGL())` was called synchronously in an effect body.
   React 19 linting treats this as a cascading render.
3. `components/layout/SiteHeader.tsx` — same rule for `setMenuOpen(false)` in a
   `pathname` effect that closed overlays after navigation.
4. ESLint also linted `app/.next/types/*` because a stray generated folder lived
   inside `app/`, which the default ignore pattern only covered at the repo root.

## Why it happened

- Arrow-body cleanup is an easy shorthand, but its return value becomes the
  cleanup's return value. TypeScript correctly rejected it.
- The WebGL capability check only exists in the browser, so the first instinct
  was "read it in an effect and store it in state". That is exactly the
  anti-pattern the React compiler lint rule is designed to catch.
- Closing overlays on navigation is derived data, but it was implemented as an
  effect that wrote state on every path change.
- A tool had generated `.next` with `app/` as its working directory, leaving
  `app/.next` outside the root `.next/**` ignore.

## Fix

- Wrapped the Sunburst cleanup in a block body: `return () => { animation.pause(); };`.
- Replaced the WebGL `useState` + effect with `useSyncExternalStore`, using a
  cached module-level capability probe, a no-op subscriber and a server
  snapshot of `false` for deterministic hydration.
- Stored overlay state as `{ kind, path }`; the open overlay is derived by
  comparing its `path` to the current `pathname`. A route change therefore
  closes the overlay without writing state in an effect.
- Deleted the stray `app/.next` folder and added `**/.next/**` to the ESLint
  global ignores.

## Verification

- `bunx tsc --noEmit` → clean.
- `bun run lint` → clean (0 errors, 0 warnings).
