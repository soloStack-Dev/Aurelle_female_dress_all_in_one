# 009 - Browser-local auth gate and header session states

- **Date:** 2026-10-28
- **Phase:** Header authentication entry and protected storefront routes
- **Severity:** Medium (session state, redirects and responsive header layout)
- **Status:** Fixed

## What was detected

The storefront needed a lightweight demo session without a backend. Adding it
introduced four integration risks:

1. Reading `localStorage` during the first client render can disagree with the
   server-rendered header, causing a hydration mismatch or a visible flash of the
   wrong controls.
2. A protected page rendered normally for a moment before the client redirected
   an unauthenticated visitor to login.
3. Signing out from a protected page triggered two competing navigations: the
   account menu pushed `/` while the route guard pushed `/login`, so the guard
   usually won.
4. The pre-hydration header skeleton was wide enough to overflow a 320px header,
   and the authenticated four-icon row was tight at the same width.

The return path in `?next=` also needed validation so a crafted query string
could not navigate off-site or loop back to an auth route.

## Thought process

- The session is browser-only, so the server cannot know the user. The safest
  approach is a stable server shell plus an explicit client hydration phase:
  `persist` uses `skipHydration`, and the chrome rehydrates once on mount.
- Protected content should not be server-rendered into the page shell for a
  signed-out visitor. A client `SessionGate` replaces the route body until the
  session is known, then either redirects or renders the page.
- The header should preserve its geometry while hydration is pending. A compact
  skeleton avoids both a control flash and layout shift.
- Sign-out must leave the protected route before the guard can react. A
  transient `loggingOut` flag suppresses the guard, and
  `window.location.replace("/")` unmounts the gate so the user lands on the
  public home page with the Sign In and Sign Up controls restored.
- `next` must be resolved against the current origin rather than trusted as a
  string. This rejects protocol-relative, absolute and backslash-normalized
  external URLs while preserving query strings and hashes.
- The preview images should only appear from `sm` upward so the two auth buttons
  and menu button still fit a 320px viewport. Authenticated icons use 32px
  targets on narrow screens and 40px from `sm` upward.

## Fix

- Added `lib/store/auth.ts` with a persisted `user`, `hydrated` and transient
  `loggingOut` flags, `signIn`, `signOut`, `markHydrated` and `skipHydration`.
  The protected-route guard ignores the transient sign-out state.
- Added `lib/auth-navigation.ts` with the protected-route list, auth links and
  same-origin `next` validation.
- Added a `SessionGate` and rehydration/redirect effects to
  `components/layout/AppChrome.tsx`.
- Added `components/layout/AccountMenu.tsx` with profile details, membership,
  favorites and a pre-navigation sign-out.
- Updated `components/layout/SiteHeader.tsx` to show a hydration skeleton,
  Sign In and Sign Up buttons with the supplied reference images on desktop, or
  search, favorites, profile and cart controls after authentication.
- Updated the login and both signup forms to create the local session and
  redirect to the validated return path.
- Added responsive skeleton and icon sizing to keep the header within 320px.

## Verification

- `bunx tsc --noEmit` - clean.
- `bun run lint` - clean.
- `bun run build` - all 21 routes generated, including the new auth-gated pages.
- Headless Chrome at 1440x1000, 390x844 and 320x780 reports no horizontal
  overflow in signed-out or authenticated states.
- Signed-out home shows Sign In/Sign Up with both preview images loaded and no
  post-auth icons.
- Direct visits to `/pricing` and `/contact` redirect to
  `/login?next=%2Fpricing` and `/login?next=%2Fcontact`; successful login returns
  to the requested page.
- Login from the header returns to `/collection`; signup with
  `?next=%2Fabout` returns to `/about`; create-account with `?next=%2Fpricing`
  returns to `/pricing`; refresh preserves the session.
- A login URL with an external `next` value falls back to `/collection` instead
  of leaving the app.
- The authenticated header shows search, favorites, profile and cart in order.
  The profile menu displays the account email, and sign-out returns to `/` with
  the Sign In/Sign Up controls restored.
- No console errors, runtime exceptions or failed resource logs were reported by
  the Chrome CDP run.
