# 008 - Auth layouts broke at intermediate breakpoints

- **Date:** 2026-10-28
- **Phase:** Signup and create-account implementation
- **Severity:** Medium (visual alignment and responsive fidelity)
- **Status:** Fixed

## What was detected

The first headless pass through the new auth pages exposed four layout defects:

1. The signup seam notch was absolutely positioned against the initial
   containing block because the black frame was not itself `position: relative`.
   The indicator therefore drifted away from the photo/form seam.
2. The signup photo and form only switched to a split layout at `lg`. Between
   768px and 1023px the design stacked vertically, even though the specification
   calls for the split layout with a straight seam and centered indicator.
3. The create-account browser card kept the traffic lights on mobile and used a
   `36/64` split at tablet widths. The specification asks for the lights to be
   hidden below `md` and a `40/60` split between 768px and 1023px.
4. At desktop size the signup H1 had an intrinsic width of about 404px inside a
   390px content column, so "Build Your Flow" wrapped onto two lines.

The same pass also showed the signup mobile frame still used 12px padding and a
larger radius at 640-767px, rather than the specified 8px padding and 24px
radius for the mobile frame.

## Thought process

- The notch belongs to the frame, not the viewport. Making the frame the
  positioning context is the smallest correct fix and keeps the SVG anchored to
  the seam at every frame width.
- The tablet split is structural, not cosmetic. Switching the signup layout to
  `md:flex-row` and rendering a centered indicator for the `md` to `lg` range
  restores the intended composition while leaving the SVG notch for full
  desktop sizes.
- The create-account form column must stay wide enough for the testimonial
  card. A `40/60` split at tablet and `35/65`-equivalent `36/64` at desktop
  matches the reference proportions without squeezing the image panel.
- Widening the signup form content column from 390px to 430px lets the 60px H1
  sit on one line while preserving the spec's narrower sub-copy measure.

## Fix

- Added `relative` to the signup frame and moved the desktop indicator into the
  notch flow; added a separate seam-centered indicator for tablet widths.
- Changed signup responsive layout from `lg:flex-row` to `md:flex-row`, kept the
  mobile banner and moved its indicator below the banner, and normalized mobile
  frame padding and radius.
- Hid the create-account browser bar below `md` and set the form column to
  `40%` at tablet and `36%` at desktop.
- Increased the signup form content width to `430px`; reduced create-account
  horizontal padding so the title remains readable at tablet widths.
- Verified the `WireTerrain` WebGL fallback remains hidden when WebGL is active,
  and both canvases mount with non-zero sizes.

## Verification

- `bunx tsc --noEmit` - clean.
- `bun run lint` - clean.
- `bun run build` - all 21 static routes generated, including `/signup`,
  `/create-account`, `/login`, `/terms` and `/privacy`.
- Headless Chrome at 1440x1000, 900x800 and 390x844 reports no horizontal
  overflow on any auth route.
- Form smoke tests pass at desktop and mobile:
  - empty submissions show field errors;
  - valid submissions show the demo success state;
  - password visibility toggles;
  - testimonial arrows advance the quote;
  - Google/X demo buttons show notices.
- No console errors, runtime exceptions or failed resource logs were reported
  by the Chrome CDP run. Edge headless emitted identical pre-existing
  `Uncaught (in promise)` entries on every route, including `/` and `/about`;
  the same routes are clean in Chrome, so the Edge messages were treated as a
  headless-browser artifact rather than an application defect.
