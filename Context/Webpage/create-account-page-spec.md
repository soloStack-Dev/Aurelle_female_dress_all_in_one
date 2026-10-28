# "Create an account" Page – Build Spec (from reference image)

Reference: `Jordan_Hughes_.jpg` (split-layout signup page: minimal form on the left, testimonial photo card on the right, inside a browser-window mockup on a taupe background with a wireframe terrain).
All colors and sizes are **estimated from a 700×525 screenshot**. Confirm with an eyedropper / DevTools overlay before final polish.

---

## 1. Overall concept

- Page background: warm taupe-grey with a **white wireframe "terrain" grid** along the bottom and a wavy mesh poking up on the right.
- On it sits a **cream browser-window card** with three traffic-light dots (decoration only).
- **Left (~35%)**: clean form with *underline-style* inputs.
- **Right (~65%)**: rounded photo card with a portrait, a white logo at top-left, a big testimonial quote at the bottom-left and two circular arrow buttons at the bottom-right.
- The wireframe mesh also appears **inside** the photo card, *behind* the model and in front of the backdrop. This depth effect is the signature detail of the design.
- Mood: editorial, calm, neutral, monochrome with warm taupe.

Proportions from the screenshot (window ≈ 624 × 414, ratio ≈ 1.5:1):

| Part | Approx. size | Desktop target |
|------|--------------|----------------|
| Window | 624 × 414 | `max-w-[1200px]`, `aspect-[1.5]` or `h-[min(80vh,800px)]` |
| Window radius | ~6px (top), **~28px bottom-right** | 12px, bottom-right 44px |
| Left form column | ~218 wide (35%) | `grid-cols-[35%_65%]` |
| Form inner width | ~156 (≈71% of column) | `max-w-[360px]` |
| Photo card inset | ~7px top/right, ~5px bottom | 12px / 12px / 8px |
| Photo card radius | ~16px, bottom-right larger | 24px, bottom-right 36px |

---

## 2. Assets you need to get online

| # | Asset | Count | Where to get it | Notes |
|---|-------|-------|-----------------|-------|
| 1 | Portrait photos (fashion/beauty look, person looking away or at camera, **plain beige/taupe backdrop**) | **3** (1 minimum) | Unsplash, Pexels (free licenses) | 3 testimonials = 3 slides for the arrow buttons. Search: `fashion portrait beige background`, `editorial portrait studio taupe`, `woman portrait neutral backdrop`. Crop ~4:5, export WebP ~1400×1750. |
| 2 | **Background-removed (transparent PNG/WebP) version** of each portrait | 3 | Make yourself with any background-remover tool | Needed for the exact "mesh behind the person" effect (section 7.4). Optional: skip it and use the simple overlay version. |
| 3 | Brand logo (dark version for the form, white version for the photo card) | 1 SVG (2 colors) | Your own brand / placeholder (code below) | The reference shows the "Untitled UI" logo. **Do not copy it**; use your own name and mark. |
| 4 | Icons: Google, Twitter/X, arrows, quote mark | – | `react-icons` | No download. |
| 5 | Wireframe terrain | – | **Code (three.js)** or CSS fallback | No download. |

**Total downloads: 3 portrait photos** (+ their 3 cutouts if you want the exact depth effect). Use photos whose backdrop tone is taupe/beige/brown so they blend with the page.
Licensing: do not reuse the model photo from the Dribbble shot; it belongs to someone else.

---

## 3. Tech stack for this page

| Tool | Role | Install |
|------|------|---------|
| **Next.js (App Router) + TypeScript** | Framework, `next/font`, `next/image` | `npx create-next-app@latest` |
| **Tailwind CSS v4** | Layout + tokens | included |
| **three.js + @react-three/fiber** | The animated wireframe terrain (page bottom + inside the photo card) | `npm i three @react-three/fiber` |
| **GSAP + `@gsap/react`** | Intro timeline, quote text reveal (SplitText), mesh/photo parallax | `npm i gsap @gsap/react` |
| **Motion** (`motion/react`) | Slider transitions, input underline animation, button hover/tap | `npm i motion` |
| **react-icons** | Icons | `npm i react-icons` |
| **react-hook-form + zod** | Validation | `npm i react-hook-form zod @hookform/resolvers` |
| **HeroUI** (optional) | `Input variant="underlined"`, `Button` (check heroui.com for the current recommended major version at install time) | per docs |
| **Lenis** | **Not needed.** Single non-scrolling screen. | – |
| **anime.js** | Skip (duplicates GSAP/Motion). | – |
| **Material UI / Ant Design** | **Skip.** Boxed default inputs would fight the underline style. | – |

Recommended combo: **Tailwind + react-hook-form + Motion + GSAP + three.js + react-icons**.

---

## 4. Folder structure

```
app/
  layout.tsx
  page.tsx                    # background + <AuthWindow/>
  globals.css                 # tokens
components/auth/
  AuthWindow.tsx              # cream window + traffic lights + grid
  SignupForm.tsx
  UnderlineField.tsx
  SocialButtons.tsx
  TestimonialPanel.tsx        # photo card, slider, arrows
  BrandMark.tsx               # SVG logo (dark/white via currentColor)
components/three/
  WireTerrain.tsx             # animated wireframe grid
data/testimonials.ts
public/photos/                # t1.webp, t1-cutout.webp, ...
```

---

## 5. Design tokens

### Colors (estimated)

| Token | Hex | Used for |
|-------|-----|----------|
| `--color-page` | `#C9C3BE` | Page background (warm taupe grey) |
| `--color-window` | `#F8F6F3` | Window / form side background (cream) |
| `--color-ink` | `#121214` | Headings, text, primary button |
| `--color-muted` | `#5F5B57` | Sub text, labels, footer text |
| `--color-line` | `#D9D5D0` | Input underlines |
| `--color-btn-border` | `#E4E0DB` | Social button border |
| `--color-panel` | `#B39C8A` | Photo card backdrop (taupe brown) |
| `--color-grid` | `rgba(255,255,255,0.65)` | Wireframe lines |
| Traffic lights | `#EF5B4C`, `#F4BF3A`, `#5BC45A` | Decorative dots |
| Overlay | `linear-gradient(to top, rgba(0,0,0,.55), transparent 55%)` | Behind the testimonial text |

```css
/* globals.css (Tailwind v4) */
@import "tailwindcss";
@theme {
  --color-page: #c9c3be;
  --color-window: #f8f6f3;
  --color-ink: #121214;
  --color-muted: #5f5b57;
  --color-line: #d9d5d0;
  --color-panel: #b39c8a;
  --font-sans: var(--font-grotesk), system-ui, sans-serif;
}
```

### Typography (best visual guess; verify with WhatFont)

A neo-grotesque with tight tracking, close to **Inter / Inter Tight** (the "Untitled UI" system font is Inter). The big quote looks like a heavier grotesque such as **Hanken Grotesk** or **Instrument Sans**. Load one with `next/font/google` and use it everywhere.

| Use | Weight | Size (desktop) |
|-----|--------|----------------|
| H1 "Create an account" | 700 | 32–36px, tracking `-0.02em` |
| Sub text | 400 | 14–15px, `--color-muted` |
| Field labels / placeholders | 400 | 13px, `--color-muted` |
| Buttons | 600 | 13–14px |
| "Already have an account? **Log in**" | 400 / 600 | 12px ("Log in" underlined, dark) |
| Testimonial quote | 600–700 | 28–32px, line-height 1.25, tracking `-0.01em`, max-w ~560px |
| Quote author name | 700 | 18px |
| Author role | 600 | 14px, white at ~85% |

---

## 6. Layout structure

### 6.1 Window chrome
- Cream window, thin top bar space with **3 dots** (6px, spacing 10px) at the top-left (decorative, `aria-hidden`; hide on mobile).

### 6.2 Left column (top → bottom, vertically centered, left-aligned)
1. **Logo + name** (icon 18px + "Brand" bold 14px).
2. **H1:** `Create an account`
3. **Sub:** "Let's get started with your 30 day free trial."
4. **Fields (underline style, no box):** `Name`, `Email`, `Password`. Each ~48px tall, label as the placeholder, 1px bottom border `--color-line`.
5. **Primary button:** `Create account` (full width, h 44px, radius 6px, near-black, white text).
6. **Social buttons (stacked, full width, h 40px, white, 1px border, radius 6px, centered icon + bold label):**
   - Google icon + `Sign up with Google`
   - Twitter bird (blue) + `Sign in with Twitter`
   - Note: the reference says "Sign **in** with Twitter" (inconsistent). Use **"Sign up with X"** / "Sign up with Twitter" for consistency.
7. **Footer line (centered):** "Already have an account? **Log in**".

Vertical gaps (desktop): logo → H1 56px, H1 → sub 8px, sub → fields 32px, field → field 0 (each field has its own padding), fields → button 28px, button → social 12px, social → social 12px, social → footer 28px.

### 6.3 Right photo card
- Full-bleed photo card (backdrop `--color-panel`).
- **Top-left:** white logo mark (~36px), 20px inset.
- **Center/right:** the model, positioned right of center, head in the upper third, body cropped at the bottom edge.
- **Wireframe mesh** across the lower ~45%, behind the model.
- **Bottom-left block (24–32px inset):** small quote glyph `"` (white, ~20px), the quote text, then name and role.
- **Bottom-right:** two **circular outline buttons** (40px, 1px white border, translucent white fill on hover) with left/right arrows.

### 6.4 Page background mesh
- A perspective grid "floor" along the bottom edge of the page (lines converge toward the horizon), plus a wavy terrain peeking above the floor on the right side, partly hidden behind the window. Lines are white at ~60% opacity on the taupe background.

---

## 7. Key components (starter code)

### 7.1 Page + window

```tsx
// app/page.tsx
import WireTerrain from "@/components/three/WireTerrain";
import AuthWindow from "@/components/auth/AuthWindow";

export default function Page() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-page p-4 md:p-10">
      <WireTerrain className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]" />
      <AuthWindow />
    </main>
  );
}
```

```tsx
// components/auth/AuthWindow.tsx
export default function AuthWindow() {
  return (
    <section className="relative grid h-[min(80vh,800px)] w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-[12px] rounded-br-[44px] bg-window shadow-[0_20px_60px_rgba(0,0,0,.08)] lg:grid-cols-[35%_65%]">
      <div aria-hidden className="absolute left-4 top-3 hidden gap-2 lg:flex">
        <i className="size-1.5 rounded-full bg-[#ef5b4c]" />
        <i className="size-1.5 rounded-full bg-[#f4bf3a]" />
        <i className="size-1.5 rounded-full bg-[#5bc45a]" />
      </div>
      <SignupForm />
      <TestimonialPanel className="hidden lg:block" />
    </section>
  );
}
```

### 7.2 BrandMark (placeholder logo, stacked slanted strokes)

```tsx
export default function BrandMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
         strokeWidth="2.6" strokeLinecap="round" aria-hidden>
      <path d="M4 6.5c3-3 6 3 9 0s5-1 7 0" />
      <path d="M4 12c3-3 6 3 9 0s5-1 7 0" />
      <path d="M4 17.5c3-3 6 3 9 0s5-1 7 0" />
    </svg>
  );
}
```
Use `text-ink` in the form and `text-white` on the photo card. Replace with your real logo.

### 7.3 UnderlineField (animated focus underline)

```tsx
"use client";
import { motion } from "motion/react";
import { useState } from "react";

export function UnderlineField({ label, type = "text", ...rest }: Props) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="relative block border-b border-line pb-2 pt-5">
      <input {...rest} type={type} placeholder={label}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        className="w-full bg-transparent text-[13px] text-ink placeholder:text-muted focus:outline-none" />
      <motion.span aria-hidden className="absolute -bottom-px left-0 h-px w-full origin-left bg-ink"
        initial={false} animate={{ scaleX: focus ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }} />
    </label>
  );
}
```
Always keep a real accessible label (`aria-label={label}` on the input, or an `sr-only` span).

### 7.4 TestimonialPanel (mesh behind the model, slider, arrows)

Layer order inside the panel (bottom → top):
1. Backdrop color `--color-panel`
2. `<WireTerrain/>` canvas (lower half)
3. **Model cutout** (transparent PNG/WebP) – this is what makes the mesh appear *behind* the person
4. Bottom dark gradient overlay
5. Logo, quote block, arrows

```tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import BrandMark from "./BrandMark";
import WireTerrain from "../three/WireTerrain";
import { testimonials } from "@/data/testimonials";

export default function TestimonialPanel({ className = "" }) {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((i + d + testimonials.length) % testimonials.length);

  return (
    <div className={`relative m-3 mb-2 overflow-hidden rounded-[24px] rounded-br-[36px] bg-panel ${className}`}>
      <WireTerrain className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]" />

      <AnimatePresence mode="wait">
        <motion.div key={i} className="absolute inset-0"
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <Image src={t.cutout} alt={t.alt} fill priority sizes="60vw" className="object-contain object-bottom" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <BrandMark className="absolute left-5 top-5 size-9 text-white" />

      <figure className="absolute bottom-8 left-8 max-w-[560px] text-white">
        <span className="block text-2xl leading-none">“</span>
        <blockquote className="mt-2 text-[28px] font-semibold leading-tight tracking-tight">{t.quote}</blockquote>
        <figcaption className="mt-5">
          <p className="text-lg font-bold">{t.name}</p>
          <p className="text-sm font-semibold text-white/85">{t.role}</p>
        </figcaption>
      </figure>

      <div className="absolute bottom-8 right-8 flex gap-3">
        <button onClick={() => go(-1)} aria-label="Previous testimonial"
          className="grid size-10 place-items-center rounded-full border border-white/70 text-white transition hover:bg-white/20"><LuArrowLeft /></button>
        <button onClick={() => go(1)} aria-label="Next testimonial"
          className="grid size-10 place-items-center rounded-full border border-white/70 text-white transition hover:bg-white/20"><LuArrowRight /></button>
      </div>
    </div>
  );
}
```

**Simple version (no cutouts):** drop the cutout layer, render the full photo as the background (`object-cover`), and overlay the `WireTerrain` canvas with `mix-blend-mode: soft-light` and a mask that fades the lines out near the model. Easier, but the mesh will cross over the person.

```ts
// data/testimonials.ts
export const testimonials = [
  { quote: "Your Company were a breeze to work alongside, we can’t recommend them enough. We launched 6 months earlier than expected and are growing 30% MoM.",
    name: "Amélie Laurent", role: "Founder, Sisyphus", cutout: "/photos/t1-cutout.webp", alt: "Portrait of Amélie Laurent" },
  // add 2 more
];
```
Use your own (or clearly fictional) testimonials. Do not publish made-up quotes attributed to real people or companies.

### 7.5 WireTerrain (three.js wave grid)

A **square-cell grid** (not triangle diagonals) displaced by sine waves, slowly animated, viewed in perspective.

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

const COLS = 44, ROWS = 26, W = 16, H = 9;

function Grid() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array((COLS + 1) * (ROWS + 1) * 3);
    for (let r = 0; r <= ROWS; r++)
      for (let c = 0; c <= COLS; c++) {
        const k = (r * (COLS + 1) + c) * 3;
        pos[k] = (c / COLS - 0.5) * W;
        pos[k + 1] = (r / ROWS - 0.5) * H;
      }
    const idx: number[] = [];
    for (let r = 0; r <= ROWS; r++)
      for (let c = 0; c <= COLS; c++) {
        const a = r * (COLS + 1) + c;
        if (c < COLS) idx.push(a, a + 1);
        if (r < ROWS) idx.push(a, a + COLS + 1);
      }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setIndex(idx);
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.35;
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setZ(i, Math.sin(x * 0.55 + t) * 0.45 + Math.cos(y * 0.9 + t * 0.8) * 0.3);
    }
    p.needsUpdate = true;
  });

  return (
    <lineSegments geometry={geo} rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.4, 0]}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </lineSegments>
  );
}

export default function WireTerrain({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas camera={{ position: [0, 2.4, 6], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Grid />
      </Canvas>
    </div>
  );
}
```

Notes:
- Import it with `next/dynamic` (`ssr: false`) from a client component if you see SSR warnings.
- Tune `camera.position`, `rotation` and `position` by eye against the screenshot; the key look is a flat-ish floor with gentle swells that gets denser toward the horizon.
- Reduce `COLS/ROWS` on mobile; stop `useFrame` updates when `prefers-reduced-motion` is on.
- **CSS fallback** (no WebGL): a `repeating-linear-gradient` grid (white 1px lines every 36px, both directions) on a div with `transform: perspective(500px) rotateX(62deg)` and a mask-image fading to transparent at the top.

### 7.6 Buttons

```tsx
// Primary
<motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
  className="h-11 w-full rounded-md bg-ink text-[13px] font-semibold text-white">
  Create account
</motion.button>

// Social
<button className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#e4e0db] bg-white text-[13px] font-semibold text-ink transition hover:bg-[#faf9f7]">
  <FcGoogle className="size-4" /> Sign up with Google
</button>
<button className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#e4e0db] bg-white text-[13px] font-semibold text-ink transition hover:bg-[#faf9f7]">
  <FaTwitter className="size-4 text-[#1d9bf0]" /> Sign up with Twitter
</button>
```

---

## 8. Form behavior

- Validation (zod): name required, email format, password min 8 chars. Show errors after blur or submit only; error = red underline (`#D9534F`) + 12px message below.
- States: default, focus (underline animates in), error (small shake), loading (spinner replaces label), success (checkmark, then redirect).
- Password field: add a show/hide toggle (eye icon) inside the underline field even though the reference omits it.
- OAuth buttons are placeholders until you connect an auth provider.
- Tab order: name → email → password → Create account → Google → Twitter → Log in link. Enter submits.

---

## 9. Animation plan

Register once: `gsap.registerPlugin(useGSAP, SplitText)`.

| Moment | Library | Effect |
|--------|---------|--------|
| Page load | GSAP timeline | Window: `y 30 → 0`, `opacity 0 → 1` (0.7s, `power3.out`); page mesh fades in at the same time |
| Form items | GSAP | Logo, H1, sub, fields, buttons, footer: stagger 0.06, `y: 14 → 0` |
| Photo card | GSAP | `clipPath: inset(0 0 0 100%) → inset(0)` reveal from the right; model cutout rises `y: 40 → 0` |
| Quote text | GSAP `SplitText` (lines) | Lines slide up from a mask (`yPercent: 100 → 0`, stagger 0.08); replay on each slide change |
| Slider | Motion | Cutout cross-slide (7.4), arrow buttons scale 1.05 on hover |
| Mesh (3D) | three.js | Continuous slow wave (7.5). Parallax: shift the photo-card mesh ±10px with the mouse |
| Inputs | Motion | Underline grows from left on focus (7.3) |
| Buttons | Motion | Hover lift 1px, tap scale .98 |

Autoplay for the slider is optional (every 6–7s, pause on hover/focus).
Respect `prefers-reduced-motion` via `gsap.matchMedia()`: skip the intro, freeze the mesh, disable autoplay.

---

## 10. Responsive behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Split layout 35% / 65%, window with traffic lights, mesh inside the photo card. |
| 768–1023px | 40% / 60% split, quote 22–24px, smaller mesh. |
| <768px | Single column: the window becomes a full-width cream card, the photo card is **removed** (or shown as a 220px banner with a short quote); page mesh stays at the bottom with reduced density; traffic lights hidden. |

Use `min-h-dvh` instead of `100vh`.

---

## 11. Accessibility

- Underline inputs still need real labels (visible or `sr-only`); placeholder-only labels disappear when typing.
- Contrast: `--color-muted` (`#5F5B57`) on cream passes; white quote text on the photo needs the dark gradient overlay to stay readable. Test with real photos.
- Slider: arrow buttons have `aria-label`s; announce slide changes with `aria-live="polite"` on the quote.
- Canvas and traffic lights are `aria-hidden`; give photos meaningful `alt`.
- Visible focus ring on every control (`focus-visible:ring-2 ring-ink/40`).

---

## 12. Build order (checklist)

1. Create the project, add the font, tokens and page background.
2. Build the static window, grid columns, radii (big bottom-right corner) and traffic lights.
3. Build the form with exact spacing (use the screenshot as a 50% opacity overlay).
4. Build the photo card statically: backdrop, cutout, gradient, quote, arrows.
5. Add `WireTerrain` to the page bottom, then inside the photo card behind the cutout.
6. Wire the slider and testimonials data.
7. Add validation and form states.
8. Add the GSAP intro + SplitText quote reveal, then Motion interactions.
9. Responsive pass, reduced-motion handling.
10. Accessibility, performance (lazy-load the canvas, `dpr` cap), Lighthouse.

---

## 13. Quick facts to match the screenshot

- Inputs are **underline only**; there is no box around Name / Email / Password.
- Only **Create account** is solid black; both social buttons are white with a thin border.
- The window's **bottom-right corner is much rounder** than the other corners.
- The wireframe appears on **both** the page background and the photo card; inside the card it sits **behind the model**.
- The quote is large, bold, white, left-aligned at the bottom-left; arrows are **outline circles** at the bottom-right.
- The logo appears twice: dark in the form column, white on the photo card.
- Footer line has "Log in" underlined and bold.
