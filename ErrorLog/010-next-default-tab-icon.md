# 010 - Next.js default tab icon

- **Date:** 2026-10-29
- **Phase:** Browser tab, installable app and iOS icon metadata
- **Severity:** Low (branding and caching fallback)
- **Status:** Fixed

## What was detected

The browser tab still showed the Next.js icon even though the root metadata
pointed at `/icon.svg`. The app directory had no `favicon.ico`, `icon.svg` or
Apple touch icon, and the web manifest only advertised the SVG file.

Some browsers and operating systems request `/favicon.ico` directly instead of
following the linked SVG. Others cache that fallback aggressively, so an
SVG-only setup can leave the starter icon visible.

## Thought process

- Use the framework file conventions in the root `app/` segment so Next.js
  emits the correct links automatically.
- Add `favicon.ico` as the direct `/favicon.ico` fallback and `icon.svg` as the
  scalable tab icon.
- Generate a full-bleed Apple touch icon and manifest PNGs so iOS and installed
  app surfaces do not depend on SVG support.
- Use the AURELLE palette: cream background, ink monogram and ember accent.
- Provide a separate maskable asset with the monogram inside Android's safe
  zone.
- Remove the duplicate public SVG reference so every icon resolves through one
  source of truth.

## Verification

- `app/favicon.ico` contains 16, 32 and 48 pixel entries.
- `app/icon.svg`, `app/apple-icon.png`, `public/icons/icon-192.png`,
  `public/icons/icon-512.png` and the maskable icon are generated.
- Production build emits the favicon, SVG icon and Apple touch icon links.
- `/manifest.webmanifest` advertises the 192, 512 and maskable PNG icons.
