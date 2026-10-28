# 007 - `THREE.Clock` deprecation warning from React Three Fiber

- **Date:** 2026-10-28
- **Phase:** Runtime polish after the Leaflet and image-asset work
- **Severity:** Medium (console noise + deprecated API in the hero bundle)
- **Status:** Fixed

## What was detected

The browser console reported:

```
THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
```

The application code did not import `Clock` directly. The hero used
`useFrame((state, delta) => ...)`, reading `state.clock.elapsedTime` and the
frame delta supplied by React Three Fiber.

## Why this is an error

- `three@0.186.1` deprecates `Clock` since r183 and logs that warning from the
  `Clock` constructor.
- `@react-three/fiber@9.8.2` (the latest published version at the time) still
  creates the render-loop clock with `new THREE.Clock()` inside its root store.
  The warning therefore fires even when our components never construct a clock.
- Reading `state.clock` kept the deprecated object on the critical animation
  path, so suppressing the message would have hidden a real dependency problem
  rather than fixing it.

## Thought process

- Upgrading `@react-three/fiber` was the first option, but `9.8.2` was already
  the newest release and it hard-codes `new THREE.Clock()`.
- Patching the dependency with Bun's patch mechanism would remove the warning
  but leave the project maintaining a private fork of the renderer for a purely
  decorative scene.
- Filtering the warning in the console would hide the signal without changing
  the deprecated runtime path.
- The hero is atmospheric decoration: the fashion photograph is the real
  subject. It does not use R3F controls, loaders, or physics. A framework-free
  Three.js scene can preserve the composition while owning its own
  `THREE.Timer`, render loop, resize handling and cleanup. That also removes
  `@react-three/fiber` and `@react-three/drei` from the client bundle.

## Fix

- Rewrote `components/three/HeroScene.tsx` as a plain Three.js client
  component:
  - `WebGLRenderer`, `PerspectiveCamera`, warm key/ember/wine lights.
  - Burgundy sphere with an `onBeforeCompile` vertex ripple, ember and
    champagne tori, pearl, sculptural knot, and champagne dust points.
  - Pointer parallax, per-mesh float/wobble, `ResizeObserver`, WebGL fallback,
    full geometry/material/renderer cleanup, and a static
    `prefers-reduced-motion` branch.
  - `THREE.Timer` connected to `document`; each frame calls
    `timer.update(timestamp)` and reads `getDelta()` / `getElapsed()`. The Page
    Visibility API prevents large deltas after tab switches.
- Kept the equivalent dpr cap (`1.5`), antialiasing, transparent canvas and
  ACES tone mapping from the previous renderer.
- Removed `@react-three/fiber` and `@react-three/drei`; retained `three` and
  `@types/three`.
- Updated the hero comments so they describe the actual Three.js ownership.

## Verification

- `bunx tsc --noEmit` - clean.
- `bun run lint` - clean.
- `bun run build` - compiled and prerendered all 16 routes.
- Client-chunk scan finds no `THREE.Clock`/React Three Fiber/`useFrame`
  strings; the Timer implementation is present.
- Production CDP check confirms the hero canvas mounts (`624 x 789` in the
  headless viewport), WebGL is available, and the page reports no console,
  shader, Clock or runtime warnings.
- The WebGL capability fallback in `HeroVisual` and the reduced-motion branch
  in `HeroScene` were reviewed as part of the rewrite; runtime smoke tests for
  `/`, `/collection?piece=aurelle-01`, `/contact?plan=Premium`, `/about` and
  `/blog` all pass.
