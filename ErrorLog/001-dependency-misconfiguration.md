# Error 001 — Wrong icon/animation packages installed

- **Date:** 2026-10-28
- **Phase:** Dependency audit (before coding)
- **Severity:** High (would break every component that imports icons or motion)
- **Status:** Fixed

## What was detected

`package.json` contained:

```json
"react-icon": "^1.0.0",
"react-motion": "^0.5.2"
```

The design briefs (`Context/WebdesignPrompts/*.md`) ask for **React Icons** and
**Motion** (the successor of Framer Motion, imported from `motion/react`).

## Why this is an error

1. `react-icon` (singular) is an unrelated, effectively abandoned package. The
   real library is **`react-icons`** (plural, v5.x) with the `react-icons/fi`,
   `react-icons/fa6`, etc. entry points used in the specs.
2. `react-motion` is the old 2015-era animation library (`React 0.14` era). It
   is not Framer Motion and does not support React 19. The current package is
   **`motion`**, imported as `motion/react`.
3. `three` and `@react-three/fiber` were present in `node_modules` only as
   transitive dependencies of `@react-three/drei` but were not declared in
   `package.json`. R3F code would work locally by accident and break on a clean
   install / CI.

## What I thought when fixing it

> The prompt says "don't trust package names, inspect them". Installing the
> wrong icon package is silent until runtime, so I should correct it before
> writing any component. I also need `three` + `@react-three/fiber` as explicit
> direct dependencies because the hero scene imports them directly — relying on
> drei's transitive copy is fragile.

## Fix applied

```bash
bun remove react-icon react-motion
bun add react-icons motion @gsap/react three @react-three/fiber
```

Result:

- installed `react-icons@5.7.0`
- installed `motion@14.7.1`
- installed `@gsap/react@2.1.2`
- installed `three@0.186.1`
- installed `@react-three/fiber@9.8.2`

## Verification

`node_modules` now resolves `react-icons`, `motion`, `@gsap/react`, `three` and
`@react-three/fiber`. The project builds against R3F v9, which is the version
line compatible with React 19.
