# [BRAND] — 3D Fashion E-Commerce Landing Page Spec

> **Working brand name:** `[BRAND]` (replace everywhere once finalised)
> **Store:** Women's fashion — Swimwear, Bold Dresses, Beachwear, Lingerie & Intimates, Nightwear, Partywear
> **Direction:** Dark Luxury + Sensual Editorial + Cinematic 3D
> **Reference 1 (`landingpage.jpg`)** → overall landing page *structure* (section order, glass cards, marquee, list, giant footer logo)
> **Reference 2 (`hero-section.jpg`)** → *hero section* (framed gradient container, light-weight giant heading, floating white cards)

---

## 0. How to use this file

1. Read sections 1–4 (what to build and how it should look).
2. Collect images using the checklist in section 5.
3. Build in the order of section 10 (roadmap).
4. This file can be pasted directly into Claude Code / Cursor as the project brief.

> Colours are **approximate** (estimated visually from the two screenshots). Verify with an eyedropper on the original images before finalising.

---

## 1. Tech stack (verified against current docs)

| Purpose | Package | Notes |
|---|---|---|
| Framework | `next` (16.x, App Router), `react` 19 | Next.js 16.2.x is the current stable line; Node 20+ required |
| 3D | `three` (r171+), `@react-three/fiber` **v9**, `@react-three/drei` | R3F v9 pairs with React 19. v8 does **not** work with React 19. Never mix version lines |
| Scroll animation | `gsap`, `@gsap/react` | ScrollTrigger for pinned and scrubbed sections |
| Smooth scroll | `lenis` | Must be driven by GSAP's ticker (see 1.2) |
| Component animation | `motion` (formerly Framer Motion) | `import { motion } from "motion/react"`. This is what "react-motion" usually means today |
| Micro animation | `animejs` | Sunburst rotation, counters, SVG strokes, stagger loops |
| Icons | `react-icons` | Use one set only (recommend `Lucide`/`Feather` via `react-icons/lu`, plus `Fa6` for social) |
| UI (storefront) | **HeroUI** + Tailwind CSS v4 | Tailwind v4 native, no CSS-in-JS runtime. Check docs: HeroUI v3 is out; v2 needs 2.8+ for Tailwind v4 |
| UI (admin only) | **MUI** *or* **Ant Design** | Pick **one** for the admin dashboard, in its own route group |

### 1.1 Rules for using so many libraries

- **One UI library on the storefront (HeroUI).** MUI and Ant Design both inject their own global styles and CSS-in-JS. Mixing all three on the same pages causes style conflicts and a large bundle.
- **Use MUI / Ant Design only under `app/(admin)/`** (data grids, forms, tables, order management). Each needs its own Next.js App Router registry package (`@mui/material-nextjs` for MUI, `@ant-design/nextjs-registry` for Ant Design). Check their docs for current setup.
- **Never animate the same property with two libraries.** Ownership:

| Library | Owns |
|---|---|
| **GSAP + ScrollTrigger** | Anything tied to scroll position: pinning, scrub, parallax, section reveals, marquee speed |
| **Motion** | React component lifecycle: enter/exit, hover/tap, layout changes, page transitions, product gallery |
| **anime.js** | Small decorative loops: sunburst spin, number counters, SVG line draw |
| **Three.js (R3F)** | Hero 3D scene, product 3D viewer |
| **Lenis** | Scroll physics only |

### 1.2 Lenis + GSAP (must be wired exactly like this)

When using ScrollTrigger, Lenis must run through GSAP's ticker, otherwise scroll positions desync.

```tsx
// components/providers/SmoothScroll.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // accessibility: no smooth scroll

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

Known gotchas: add `"use client"` to the provider; add `.lenis.lenis-smooth { scroll-behavior: auto !important; }` in global CSS; call `lenis.stop()` when a modal/cart drawer opens and `lenis.start()` on close; consider disabling Lenis on touch devices (native momentum feels better).

### 1.3 Install

```bash
npx create-next-app@latest brand-store --ts --tailwind --app
cd brand-store
npm i three @react-three/fiber @react-three/drei gsap @gsap/react lenis motion animejs react-icons
npm i -D @types/three
npm i @heroui/react   # follow current HeroUI + Tailwind v4 setup docs
```

`next.config.ts` — transpile three:

```ts
const nextConfig = { transpilePackages: ["three"] };
export default nextConfig;
```

---

## 2. Design tokens

### 2.1 What the references actually use (extracted)

**Reference 1 — landing page (fitup)**

| Token | Approx. value | Where |
|---|---|---|
| Backdrop gradient | `#BDB6B0` → `#E6E5E5` → `#F1F1F2` (warm taupe to silver, diagonal, soft radial swirls) | page background |
| Ink | `#0F1830` (deep navy-black) | headings, pill buttons |
| Accent | `#2140D6` (electric blue, from the model's outfit) | highlights, chart, glow |
| Glass card | `rgba(255,255,255,0.35–0.55)` + `backdrop-filter: blur(20px)` + 1px white border at 60% | every card |
| Muted text | `#6B7280` | paragraphs |
| Decoration | Radial "sunburst/asterisk" line icon, dark navy, repeated | hero, section corners, marquee, footer |

**Reference 2 — hero**

| Token | Approx. value | Where |
|---|---|---|
| Hero gradient | `#F59A1B` (amber) → `#E8730C` (orange) → `#B84A0B` (burnt, top-left corner) | frame background |
| Frame | Rounded rectangle ~28px radius with thick gradient border, inner photo bleeds into it | hero container |
| White card | `#FFFFFF`, radius ~24px | right panel, stat cards, testimonial |
| Accent text | `#B9693F` (terracotta) | highlighted phrase in greeting |
| Primary pill | white bg, black text, fully rounded | CTA |

### 2.2 Brand mapping (use this in code)

Keep the **pattern** of both references (gradient frame + glass cards + dark ink) but swap hues to the dark-luxury palette.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Dark luxury (primary) */
  --color-ink:        #0B0B0D;   /* page background */
  --color-graphite:   #16161A;   /* section alt background */
  --color-wine:       #3A0814;
  --color-burgundy:   #6D0F22;
  --color-crimson:    #A3172F;   /* replaces Ref-2 orange (hero glow) */
  --color-ember:      #E0623A;   /* warm highlight, nods to Ref-2 amber */
  --color-champagne:  #C9A66B;   /* accent / thin lines */
  --color-bone:       #F3EEEA;   /* text on dark, white cards */
  --color-mute:       #9A949A;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #3A0814 0%, #A3172F 45%, #E0623A 100%);
  --gradient-page: linear-gradient(160deg, #0B0B0D 0%, #1A0A10 55%, #0B0B0D 100%);

  /* Glass */
  --glass-bg:     rgba(255,255,255,0.06);
  --glass-border: rgba(255,255,255,0.14);
  --glass-blur:   20px;

  /* Shape */
  --radius-frame: 32px;
  --radius-card:  24px;
  --radius-pill:  999px;

  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-light:   "Inter Tight", sans-serif;
  --font-script:  "Mrs Saint Delafield", cursive;
}

.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--radius-card);
}
```

> **Optional light mode** (exact Ref-1 look): swap `ink` → `#EDEDEE`, text → `#0F1830`, glass → white 45%. Build with CSS variables so a toggle is cheap later.

### 2.3 Typography

| Role | Reference look | Closest Google Font | Settings |
|---|---|---|---|
| Section headings (Ref 1) | Heavy geometric sans, tight tracking, **one italic word** per heading | **Plus Jakarta Sans** | 700–800, `letter-spacing: -0.03em`, `line-height: 1.02`, italic on the accent word |
| Hero H1 (Ref 2) | Very large, **light weight**, airy, tall | **Inter Tight** (alt: Manrope Light) | 300, `clamp(3.5rem, 8vw, 7.5rem)`, `line-height: 1` |
| Body / labels | Small, clean sans | Plus Jakarta Sans | 400–500, 14–16px, muted colour |
| Nav / tags | Small caps feel | Plus Jakarta Sans | 11–12px, uppercase, `letter-spacing: 0.08em` |
| Signature | Handwritten script | **Mrs Saint Delafield** | ~32px |
| Marquee | Giant semi-bold word | Plus Jakarta Sans | 700, ~96px, one word per repeat |

Pattern to copy from Ref 1: every heading has **one emphasised word in italic + lighter/blue-gray colour** (e.g. "Find Your Perfect *Style*"). Here: italic + `champagne` or `crimson`.

---

## 3. Page structure (follows Reference 1, hero from Reference 2)

```
┌ 0  Navbar (sticky, glass)
├ 1  HERO  ← Reference 2 layout + Reference 1 stat counters/floating widgets
├ 2  WHY [BRAND] (big glass panel + 3 fabric thumbnails)
├ 3  FIND YOUR FIT (headline + toggle cards + framed image with floating widget)
├ 4  SHOP BY STYLE (6 category glass tiles, 3×2)  → "CHECK ALL"
├ 5  FEATURED PIECES (product grid)               ← added for e-commerce
├ 6  MARQUEE ("new drop ✺ new drop ✺ …")
├ 7  DROPS & EVENTS (numbered list, 4 rows)
├ 8  TESTIMONIALS + trust bar + newsletter        ← added for e-commerce
└ 9  FOOTER (links + giant clipped logo)
```

### 3.0 Navbar
- Left: logo (wordmark + small monogram). Centre: 4–5 links, tiny uppercase (`SHOP · COLLECTIONS · LOOKBOOK · FIT GUIDE · FAQ`). Right: glass pill button with user icon "ACCOUNT", plus cart and wishlist icon buttons with count badge.
- Sticky; becomes glass-blurred after 40px scroll (GSAP ScrollTrigger class toggle).
- Mobile: hamburger → full-screen drawer (Motion `AnimatePresence`), `lenis.stop()` while open.

### 3.1 HERO (Reference 2 as base)

Layout copied from Ref 2:

```
┌──────────────────────────────────────────────────────────┐ ← gradient frame, 32px radius
│ [logo]                                  ┌───────────────┐│
│ [tag pill: "Collection 2026"]           │ nav links     ││ ← white card, top-right
│                                         │ greeting text ││   (accent phrase in terracotta→crimson)
│ Own the                                 │ ┌───────────┐ ││
│ Night, Own the                          │ │testimonial│ ││
│ Sun.                                    │ └───────────┘ ││
│ (CTA pill: Shop the Collection)         └───────────────┘│
│ ┌────┐ ┌────┐        [portrait cutout, centre]           │
│ │stat│ │stat│              ( ◎ ◎ ◎ socials )            │
└──────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Frame | `--gradient-hero`, radius 32px, ~6px inner padding showing a lighter border band like Ref 2 |
| H1 | Inter Tight 300, left aligned, 3 lines. Suggested copy: **"Own the Night, Own the *Sun*."** (italic accent word) |
| Tag pill | Tiny outlined pill above H1: `Collection 2026 — The Muse Edit` |
| CTA | White pill, black text, `Shop the Collection →`; hover: fill crimson, arrow slides |
| Stat cards (bottom-left) | Two small white cards: `10k+ Happy Customers`, `48h Express Delivery` (Ref 2 has "100% / 200%" style mini cards). Counters animate with anime.js |
| Portrait | Transparent cutout, centre, overlapping the frame edge (breaks out of the container like Ref 2). Warm rim light |
| Right white card | Mini nav (`About · Looks · Offers · Account`), greeting line (e.g. "Good evening. You have **3 new arrivals** in your size. Ready to shop?"), then a testimonial card with avatar + quote |
| Social row | 3 small circle outline buttons (Instagram / Pinterest / TikTok) bottom-centre |
| From Ref 1 | Floating glass widgets (e.g. "Members joined" avatar stack pill, sunburst icons rotating behind the portrait) |

**3D layer (R3F)** sits behind the portrait, inside the frame:
- Flowing burgundy silk ribbons (shader or distorted plane) + soft particles
- Reacts to mouse (desktop) and gyroscope/scroll (mobile)
- Portrait image gets slight parallax (Motion `useMotionValue` / GSAP `quickTo`)

```tsx
// components/hero/HeroScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import { Suspense } from "react";

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#E0623A" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh rotation={[0.4, 0.2, 0]}>
            <torusKnotGeometry args={[1.2, 0.35, 220, 32]} />
            <MeshDistortMaterial color="#6D0F22" roughness={0.25} metalness={0.6} distort={0.35} speed={1.5} />
          </mesh>
        </Float>
        <Sparkles count={40} scale={8} size={2} color="#C9A66B" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
// Load with next/dynamic({ ssr: false }). The torus knot is a placeholder: replace with silk ribbon shader or a GLB.
```

Entrance timeline (GSAP): frame scales 0.96→1 and fades, H1 lines slide up masked (stagger 0.08), cards pop in (`back.out`), portrait rises, 3D fades last.

### 3.2 WHY [BRAND] (Reference 1, section 2)
- Large rounded glass panel (radius 40px) spanning the container.
- **Left:** tall transparent cutout (model in swimwear/bodysuit, body crop) bleeding off the panel with a thin dotted line + 2 glowing dots over it (like Ref 1's leg graphic: annotation points such as "Soft-touch satin", "Hidden support").
- **Right:** small grey pill label `WHY [BRAND]`, short paragraph (muted), then **3 square glass thumbnails** (satin / lace / mesh macro). Active thumbnail shows label + small round arrow button (dark). Hover/click switches the left annotation + text.
- Animation: panel pinned briefly; thumbnails stagger in; annotation line draws (anime.js SVG `stroke-dashoffset`).

### 3.3 FIND YOUR FIT (Reference 1, section 3 — was "balanced meals")
- Left: heading **"Find your fit with *confident* sizing"** (2 lines, italic accent word), paragraph, then **two toggle cards**: dark active card `Swim & Beach` + `Start fitting →` mini-pill, light inactive card `Lingerie & Night`. Click toggles content and image. Below: script signature "— Designer of [BRAND]".
- Right: rounded glass frame with image (flat-lay or hands holding fabric), floating glass widget over top edge: `Size match   92% — Based on your measurements` with a progress bar (replaces the "Calories 2091" widget), sunburst icon top-left of the frame.
- Opens the Size Finder modal (HeroUI `Modal`).

### 3.4 SHOP BY STYLE (Reference 1, section 4 — was "yoga style")
- Heading left **"Find Your Perfect *Style*"**, short paragraph right, aligned to baseline.
- **3×2 grid of tall glass tiles** (radius 32px). Each tile: giant faded ghost word behind (white 60% opacity, like "YOGA" in Ref 1) — the word is the category (`SWIM`, `DRESS`, `BEACH`, `LUXE`, `NIGHT`, `PARTY`) — a transparent cutout model overlapping it, and a **bottom glass pill** with label + arrow.
- The 6 tiles = the 6 categories:

| Tile | Label | Ghost word |
|---|---|---|
| 1 | Bikinis & Swimwear | SWIM |
| 2 | Bold Dresses | BOLD |
| 3 | Beachwear | BEACH |
| 4 | Lingerie & Intimates | LUXE |
| 5 | Nightwear | NIGHT |
| 6 | Partywear | PARTY |

- Hover: tile lifts, cutout scales 1.05, 3D tilt (Motion `useMotionValue` + `rotateX/Y`), pill arrow rotates.
- Below grid: centred dark pill button `CHECK ALL`.
- Scroll: tiles reveal in row stagger (GSAP `batch`).

### 3.5 FEATURED PIECES (added)
- 4-column grid (2 on mobile). Product card = glass card, image with **hover swap to second image**, wishlist heart, quick-add pill (`+ Add`), colour swatches, price.
- Optional: "View in 3D" chip opens R3F viewer in a HeroUI `Modal`/drawer.
- Section header uses same heading style with italic word.

### 3.6 MARQUEE (Reference 1)
- Full-width ticker: `new drop ✺ new drop ✺ new drop` — giant 700 weight text in muted ink/bone, with the sunburst glyph between words (rotating via anime.js).
- GSAP infinite `x` tween; **speed/direction reacts to Lenis scroll velocity**.

### 3.7 DROPS & EVENTS (Reference 1)
Numbered rows, thin divider lines (1px, white 12%):

```
01   Midnight Silk Drop          Launch · 01.12.2026          [ Notify Me ]
02   Resort Escape Edit          Launch · 15.12.2026          [ Notify Me ]
03   Party Season Capsule        Launch · 28.12.2026          [ Notify Me ]
04   Bridal Night Collection     Launch · 14.01.2027          [ Notify Me ]
```
- Number small muted; title in **italic medium weight** (large); date/venue in muted small 2 lines; outlined pill CTA on the right.
- Hover: row background lightens, title shifts 12px right, a floating image preview follows the cursor (GSAP `quickTo`).

### 3.8 TESTIMONIALS, TRUST, NEWSLETTER (added)
- Trust bar (4 glass chips with icons): `Discreet packaging · Easy size exchange · Secure payments · Fast delivery`.
- Testimonial carousel reusing Ref 2's white testimonial card style.
- Newsletter: one glass card with email input + pill button.

### 3.9 FOOTER (Reference 1)
- Right-aligned small copyright line.
- Link columns (Shop, Help, Company, Social) in muted small text.
- **Giant `[BRAND]` wordmark** (≈ 28vw), navy→here `bone` at 90% opacity, **cut off at the bottom edge** of the page, sunburst watermark faded behind it.
- Reveal: wordmark slides up from 40% hidden as the footer enters (ScrollTrigger scrub).

---

## 4. Interaction + motion cheat sheet

| Where | Effect | Library |
|---|---|---|
| Page load | Preloader (logo draw) → hero timeline | GSAP + anime.js |
| Global | Inertial smooth scroll | Lenis (ticker-driven) |
| Hero | Mouse parallax on portrait + 3D | Motion / R3F |
| Hero stats | Count up | anime.js |
| Sunburst icons | Slow infinite rotation (20s) | anime.js (or CSS) |
| Section headings | Line-by-line mask reveal | GSAP SplitText-style (manual spans or GSAP plugin) |
| Category tiles | Stagger reveal + tilt hover | GSAP batch + Motion |
| Product cards | Hover image swap, add-to-cart micro-bounce | Motion |
| Cart | Slide-in drawer, `lenis.stop()` | Motion + HeroUI |
| Marquee | Scroll-velocity linked speed | GSAP + Lenis |
| Page transitions | Fade/clip between routes | Motion |
| Reduced motion | Disable Lenis, 3D idle, parallax | `prefers-reduced-motion` |

---

## 5. Image checklist (what you need to collect)

**Total: 16 required for the landing page · +16 for the product grid · +4 optional**

> Style for ALL photos: editorial, tasteful, studio or beach lighting, warm rim light, dark or neutral backdrops. Cutouts must be **transparent PNG/WebP**. Keep content non-explicit: required for ad accounts and payment gateway approval. Always confirm licence and **model release** for commercial use on fashion/intimates.

### 5.1 Required (16)

| ID | Used in | Count | Type | Size | Notes |
|---|---|---|---|---|---|
| H-01 | Hero portrait | 1 | Transparent cutout, waist-up or 3/4, looking off-camera, warm side light (copy Ref 2 mood) | 2400×3000 | Hero star image |
| H-02…H-04 | "Members joined" avatar stack | 3 | Square face crops | 96×96 | Can be same models |
| H-05 | Hero testimonial card | 1 | Square face crop | 128×128 | |
| W-01 | Why section | 1 | Transparent cutout, full/ 3/4 body, swimwear or bodysuit | 1600×2400 | Leaves room for annotation dots |
| W-02…W-04 | Why thumbnails | 3 | Macro texture: satin, lace, mesh | 800×800 | |
| F-01 | Find-your-fit frame | 1 | Flat-lay or hands holding fabric (matches Ref 1 bowl shot composition) | 1200×1200 | |
| C-01…C-06 | Category tiles | 6 | Transparent cutouts, one per category, upper body or full, similar framing | 900×1200 | Keep same camera distance for a clean grid |

### 5.2 Product grid (16)

| ID | Count | Notes |
|---|---|---|
| P-01…P-16 | 16 | 8 products × 2 images (front + alternate), 1200×1600, plain background |

### 5.3 Optional (4)
| ID | Count | Notes |
|---|---|---|
| E-01…E-04 | 4 | Hover previews for the drops list, 800×1000 |

### 5.4 Other assets

| Asset | Count | Notes |
|---|---|---|
| 3D models (`.glb`) | 1–3 | Silk drape / mannequin / garment, Draco-compressed, under 2 MB each |
| HDRI | 1 | 1k resolution, `.hdr` or `.exr`, warm studio |
| Fabric normal map | 1 | Optional, for silk shader |
| SVG | 2 | Sunburst glyph, logo wordmark |
| Fonts | 3 | Plus Jakarta Sans, Inter Tight, Mrs Saint Delafield (via `next/font/google`) |

### 5.5 Where to get them
- Licensed stock: Unsplash / Pexels (free, check licence and model release), Freepik, Envato Elements, Adobe Stock (paid).
- Best option: your own shoot (or a freelance photographer) for brand consistency.
- Cutouts: remove.bg, Photoshop "Remove Background", or Photopea.
- 3D: Sketchfab (check licence), Poly Haven (HDRIs, CC0), or custom model in Blender.
- Convert images to **WebP/AVIF**, serve through `next/image` or Cloudinary.

---

## 6. Folder structure

```
app/
  (store)/
    layout.tsx            # fonts, HeroUIProvider, SmoothScroll
    page.tsx              # landing page
    shop/[category]/page.tsx
    product/[slug]/page.tsx
    cart/ checkout/ wishlist/ account/
  (admin)/                # MUI or Ant Design lives ONLY here
    layout.tsx
    dashboard/ products/ orders/
components/
  layout/    Navbar.tsx Footer.tsx
  hero/      Hero.tsx HeroScene.tsx StatCard.tsx FloatingWidget.tsx
  sections/  Why.tsx FindYourFit.tsx ShopByStyle.tsx Featured.tsx Marquee.tsx Drops.tsx Trust.tsx
  ui/        GlassCard.tsx PillButton.tsx Sunburst.tsx ProductCard.tsx
  providers/ SmoothScroll.tsx
lib/         gsap.ts  motion-variants.ts  products.ts
public/
  images/{hero,why,fit,categories,products}/
  models/ hdri/ icons/
```

---

## 7. Responsive rules

| Breakpoint | Behaviour |
|---|---|
| ≥1280 | Full layout as above |
| 768–1279 | Hero right white card moves under H1; category grid 3×2 → 2×3 |
| <768 | Single column, hero portrait first, stat cards in a horizontal scroll row, category tiles 2 columns, marquee smaller, 3D → static image/video fallback, Lenis off on touch |

Performance budget: LCP under 2.5s, hero image priority-loaded, R3F `Canvas` lazy-loaded below the fold and `dpr` capped at 1.5, GLB lazy-loaded and Draco-compressed, pause the 3D loop when off-screen.

---

## 8. Accessibility and compliance
- Respect `prefers-reduced-motion` (disable Lenis, parallax, marquee).
- Contrast: body text on glass ≥ 4.5:1 (test on the gradient).
- All images with meaningful `alt`; decorative sunbursts `aria-hidden`.
- Keyboard-reachable cart drawer and modals with focus trap.
- Store policies required before launch: Size guide, Return policy (hygiene rules for intimates), Privacy, Terms, Shipping (needed by Razorpay and ad platforms).

---

## 9. Build prompt (paste into Claude Code / Cursor)

```
Build the landing page described in LANDING_PAGE_SPEC.md using Next.js (App Router),
React 19, TypeScript, Tailwind v4, HeroUI, GSAP + ScrollTrigger, Lenis (ticker-driven),
Motion, anime.js, react-icons and React Three Fiber v9.
Start with: global tokens, fonts, SmoothScroll provider, Navbar, Hero (with R3F background),
then sections 3.2 to 3.9 in order. Use placeholder images from /public/images with the IDs in section 5.
Keep animation ownership as defined in section 1.1. Make it fully responsive and
respect prefers-reduced-motion.
```

---

## 10. Roadmap

| Phase | Output |
|---|---|
| 1 | Tokens, fonts, providers (Lenis+GSAP), Navbar, Footer, glass components |
| 2 | Hero (frame, text, cards, 3D scene, entrance timeline) |
| 3 | Sections 3.2–3.4 (Why, Fit, Shop by Style) |
| 4 | Featured grid, Marquee, Drops list, Trust/Newsletter |
| 5 | Polish: cursor effects, page transitions, mobile fallbacks, performance pass |
| 6 | Inner pages: category, product (gallery + 3D viewer), cart, checkout |
| 7 | Backend, auth, Razorpay, admin panel (MUI **or** Ant Design) |

---

## 11. Open decisions (need your input)

1. **Brand name** (replaces `[BRAND]`).
2. Dark only, or **dark + light toggle** (light = exact Ref 1 silver look)?
3. Admin UI library: **MUI** or **Ant Design**?
4. Photography: own shoot, licensed stock, or placeholders for now?
5. Hero 3D: abstract silk ribbons (lighter) or a real GLB garment/mannequin (heavier)?
