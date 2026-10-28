# SPRKL Pricing Page – Build Spec (from reference image)

Reference: `pricingpage.jpg` (single long landing page: Pricing → Logos → FAQ → CTA → Footer).
All colors / sizes below are **estimated from the screenshot**. Confirm with an eyedropper (e.g. the Figma/Chrome DevTools color picker) before final polish.

---

## 1. Assets you need to download (online)

The design has **no photos**. Only these assets are needed:

| # | Asset | Count | Where to get it | Notes |
|---|-------|-------|-----------------|-------|
| 1 | Placeholder partner logos ("Logoipsum") | **5** SVGs | logoipsum.com (free placeholder logos) | Save as `public/logos/logo-1.svg … logo-5.svg`. Render grey (`opacity-60`, `grayscale`). |
| 2 | Brand logo "The Sprkl" (footer, bottom-left) | **1** SVG | Your own / make a simple wordmark | Replace with your real brand logo. |
| 3 | Hand-drawn lime underline (under "business", "the product", "one place") | **1** SVG (reusable) | Draw in code (path in section 9) | No download needed. |
| 4 | Icons: check-circle, plus, social icons | – | `react-icons` | No download needed. |

**Total downloads: 6 SVG files** (5 partner logos + 1 brand logo). Everything else is code.

---

## 2. Tech stack (what each tool is for)

Use **one tool per job** so the page stays fast and the styles do not fight each other.

| Tool | Role in this page | Install |
|------|-------------------|---------|
| **Next.js 16 (App Router)** + React + TypeScript | Framework, routing, fonts | `npx create-next-app@latest` |
| **Tailwind CSS v4** | Layout + tokens (HeroUI is built on it) | included in create-next-app |
| **HeroUI** | Accordion (FAQ), Button, Input, Chip (badges) | see section 3 |
| **GSAP + ScrollTrigger + SplitText** | Scroll reveals, headline split, stagger of cards/lists | `npm i gsap @gsap/react` |
| **Lenis** | Smooth scroll, synced to GSAP | `npm i lenis` |
| **Motion** (`motion/react`, successor of Framer Motion / "react-motion") | Hover, tap, accordion height, layout animation | `npm i motion` |
| **react-icons** | Check circles, plus/minus, social icons | `npm i react-icons` |
| **anime.js** (optional) | Only if you want the underline "draw" effect outside GSAP | `npm i animejs` |
| **three.js / @react-three/fiber** (optional) | NOT in the reference. Only for an optional soft lime 3D blob behind the hero | `npm i three @react-three/fiber` |
| **Material UI / Ant Design** | **Skip for this page.** | – |

**Recommendation:** HeroUI + Tailwind for UI, GSAP for scroll, Motion for micro-interactions, Lenis for scroll feel. Mixing MUI + Ant Design + HeroUI on one page adds three styling systems and a heavy bundle; the design is simple enough that HeroUI/Tailwind covers every component. Anime.js duplicates GSAP, so skip it unless you have a reason.

### Version notes (checked online)
- Next.js 16.2.x is the current stable line (Next 16 became stable in Oct 2025; Turbopack is default).
- GSAP is now 100% free including SplitText, MorphSVG, DrawSVG and the other former "Club" plugins. Use `@gsap/react` `useGSAP()` in React.
- Lenis: use the `lenis` package (not the old `@studio-freight/lenis`) and `lenis/react`.
- HeroUI: v2 (`@heroui/react`) works with Tailwind v4 from 2.8.x, but the docs now say v3 is recommended for new projects. Check heroui.com for the v3 install steps and component props before you start.

---

## 3. Project setup

```bash
npx create-next-app@latest sprkl-pricing --typescript --tailwind --app
cd sprkl-pricing
npm i gsap @gsap/react lenis motion react-icons
# HeroUI: use the CLI / install steps from heroui.com/docs (v3 recommended)
```

```
app/
  layout.tsx            # fonts, <SmoothScroll>, HeroUI provider
  page.tsx              # composes sections
  globals.css           # design tokens (section 4)
components/
  SmoothScroll.tsx
  SectionBadge.tsx      # lime pill ("Pricing", "FAQ")
  UnderlinedWord.tsx    # word + hand-drawn lime underline
  pricing/PricingSection.tsx
  pricing/PricingCard.tsx
  LogoStrip.tsx
  faq/FaqSection.tsx
  CtaBand.tsx
  Footer.tsx
data/
  plans.ts  faqs.ts  footerLinks.ts
public/logos/
```

---

## 4. Design tokens

### Colors (estimated)

| Token | Hex (approx.) | Used for |
|-------|---------------|----------|
| `--color-ink` / dark green | `#1B2E21` | Headings, dark buttons, CTA band background |
| `--color-lime` | `#B4F53B` | Badges, Business button, underlines, plus icons, CTA button, line above footer |
| `--color-lime-soft` | `#E9FBC9` | Top of Business card gradient |
| `--color-check` | `#8FE02B` | Check-circle fill (white tick inside) |
| `--color-body` | `#4B5563` | Paragraph / list text |
| `--color-muted` | `#9CA3AF` | "Trusted by…" label, footer copyright |
| `--color-surface` | `#FFFFFF` | Cards, FAQ items, input |
| `--color-bg` | `#F8F8F8 → #FFFFFF` | Page background (very soft vertical gradient) |
| `--color-line` | `#EEF0EE` | Card divider / border |

```css
/* globals.css (Tailwind v4) */
@import "tailwindcss";

@theme {
  --color-ink: #1b2e21;
  --color-lime: #b4f53b;
  --color-lime-soft: #e9fbc9;
  --color-check: #8fe02b;
  --color-body: #4b5563;
  --color-muted: #9ca3af;
  --color-line: #eef0ee;
  --font-display: var(--font-red-hat-display), system-ui, sans-serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --shadow-card: 0 8px 30px rgba(0, 0, 0, 0.06);
  --radius-card: 16px;
}
```

### Typography (best visual match, verify with the WhatFont extension)

| Use | Font | Weight | Size (desktop) |
|-----|------|--------|----------------|
| Section headings (H2) | **Red Hat Display** | 700, tight tracking (`-0.02em`) | 56–60px, line-height ~1.05 |
| Plan name, FAQ question | Inter | 500–600 | 16–18px |
| Price numbers ($12/$48/$96) | Red Hat Display | 700 | ~48px, `$` small and raised, `/ mo` ~16px |
| Body, list items | Inter | 400 | 13–14px |
| Badge text | Inter | 500 | 12px |
| "Trusted by best design teams…" | Inter | 600, uppercase, letter-spacing `0.12em` | 10px |

```tsx
// app/layout.tsx
import { Red_Hat_Display, Inter } from "next/font/google";
const display = Red_Hat_Display({ subsets: ["latin"], variable: "--font-red-hat-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

### Spacing & shape
- Container: `max-w-[1200px]` for pricing; `max-w-[800px]` for FAQ; side padding 24px.
- Cards: white, radius 16px, padding 28–32px, shadow `--shadow-card`, gap 24px.
- Buttons: radius 10px, height 44px, full width in cards.
- Pills (badges, email field): fully rounded.
- Section vertical rhythm: ~96–120px between sections.

---

## 5. Page structure (top to bottom)

### 5.1 Pricing section
1. **Badge** – lime pill, text `Pricing`, centered.
2. **H2** – "Plans that works best for your **business**" (centered, 2 lines, dark green). The word *business* has a hand-drawn lime underline.
   - Note: the original copy has a grammar slip ("works"). Keep it for a pixel-exact clone, or fix to "Plans that work best for your business".
3. **3 pricing cards** in a 3-column grid:

| | Starter | Business (featured) | Enterprise |
|---|---|---|---|
| Surface | white | white with lime-soft gradient at the top, slightly taller / raised (`scale-[1.03]`, stronger shadow) | white |
| Price | `$12 / mo` | `$48 / mo` | `$96 / mo` |
| Button | dark green fill, white text, "Get started" | **lime fill**, dark text, "Get started" | dark green fill, white text, "Get started" |
| List title | What included: | Everything in Starter, plus: | Everything in Business, plus: |

Each card order: plan name → 2-line description (placeholder lorem text) → price → button → thin divider → list title → check list.

**Feature lists**
- Starter: Basic features · Basic integrations · 10GB data storage · Limited analytics · 2 Workspaces · Chat support
- Business: Business features · Business integrations · 15GB data storage · Enhanced analytics · 5 workspaces · Priority support
- Enterprise: Advanced features · Enterprise integrations · 50GB data storage · Unlimited analytics · Unlimited workspaces

(The screenshot spells "intergrations"; fixed here.) Each item has a lime check-circle icon on the left, 12px gap.

### 5.2 Logo strip
- Tiny uppercase muted label: `TRUSTED BY BEST DESIGN TEAMS AROUND THE WORLD`
- 5 grey logos in one centered row, gap ~40px. On mobile: horizontal auto-scrolling marquee.

### 5.3 FAQ section
1. Badge `FAQ`.
2. H2 – "Everything you need to know about **the product**" (underline on *the product*).
3. Accordion, 5 items, white rounded rows (radius 12px, soft shadow), lime circle with a dark `+` on the left, question text in Inter 500. Gap between rows 12px. Item 2 is open by default and shows a 2-line answer (muted grey).
   1. How to stay safe on SPRKL
   2. About Temporarily Banned Accounts (open)
   3. About two-step verification
   4. How to restore your history
   5. Received verification code without requesting it
4. Small centered text: "Can't find the answer you're looking for? Please chat to our friendly team." (*friendly team* underlined link)

### 5.4 CTA band
- Full-width dark green (`--color-ink`) block, ~180px tall on desktop, thin lime line at its bottom edge.
- H2 white: "Everything you need in **one place**" (lime underline under *one place*).
- White pill input (placeholder `Enter email address`) with a lime "Get started" button inside the right end; lime outline glow on the button.

### 5.5 Footer
- White background, 4 link columns: **Company** (Blog, Marketplace link, What's new, About, Text Careers) · **Community** (Creator report, Charities, Templates) · **Support** (Help topics, Getting started, How-Tos, FAQs, Report) · **Legal** (Terms & Conditions, Privacy notice, Cookie notice, Trust center).
- Column titles: Inter 600, dark. Links: Inter 400, 12–13px, dark grey.
- Bottom row: logo + "©2022 The Sprkl. All rights reserved." on the left; 5 round dark icon buttons on the right (Twitter/X, Facebook, Discord/Messenger, Instagram, LinkedIn).

### Responsive
- `≥1024px`: 3 cards in a row. `768–1023px`: Business card first, then others in 2 columns. `<768px`: 1 column, Business card first, heading ~36px.
- Footer: 4 columns → 2 columns → 1 column.

---

## 6. Data files

```ts
// data/plans.ts
export const plans = [
  { name: "Starter", price: 12, featured: false, listTitle: "What included:",
    features: ["Basic features","Basic integrations","10GB data storage","Limited analytics","2 Workspaces","Chat support"] },
  { name: "Business", price: 48, featured: true, listTitle: "Everything in Starter, plus:",
    features: ["Business features","Business integrations","15GB data storage","Enhanced analytics","5 workspaces","Priority support"] },
  { name: "Enterprise", price: 96, featured: false, listTitle: "Everything in Business, plus:",
    features: ["Advanced features","Enterprise integrations","50GB data storage","Unlimited analytics","Unlimited workspaces"] },
];
```

---

## 7. Key components

### 7.1 SmoothScroll (Lenis + GSAP in sync)

```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

function SyncScrollTrigger() {
  useLenis(ScrollTrigger.update); // update ScrollTrigger on every Lenis scroll
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);          // drive Lenis from GSAP's ticker
    gsap.ticker.lagSmoothing(0);      // avoid lag compensation jumps
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      <SyncScrollTrigger />
      {children}
    </ReactLenis>
  );
}
```

Add `data-lenis-prevent` to any inner element that must scroll natively (modals, drawers).

### 7.2 PricingCard

```tsx
"use client";
import { motion } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <motion.article
      data-reveal="card"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={[
        "rounded-[16px] p-8 shadow-card",
        plan.featured
          ? "bg-gradient-to-b from-lime-soft to-white scale-[1.03] shadow-[0_20px_50px_rgba(0,0,0,.10)]"
          : "bg-white",
      ].join(" ")}
    >
      <h3 className="font-sans text-lg font-semibold text-ink">{plan.name}</h3>
      <p className="mt-2 text-xs text-body">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>

      <div className="mt-5 flex items-start font-display text-ink">
        <span className="mt-2 text-lg">$</span>
        <span className="text-5xl font-bold">{plan.price}</span>
        <span className="self-end pb-1.5 pl-1 text-base">/ mo</span>
      </div>

      <button className={`mt-5 h-11 w-full rounded-[10px] text-sm font-medium ${
        plan.featured ? "bg-lime text-ink" : "bg-ink text-white"}`}>
        Get started
      </button>

      <hr className="my-6 border-line" />
      <p className="text-xs font-semibold text-ink">{plan.listTitle}</p>
      <ul className="mt-4 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-[13px] text-body">
            <FaCheckCircle className="text-check" /> {f}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
```

(You can swap the `<button>` for HeroUI `Button` and keep the same classes.)

### 7.3 UnderlinedWord (hand-drawn lime underline)

```tsx
export default function UnderlinedWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none"
           className="absolute -bottom-1 left-0 h-3 w-full" aria-hidden>
        <path className="underline-path" d="M2 8 C 50 2, 120 3, 198 6"
              fill="none" stroke="#B4F53B" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
  );
}
```

### 7.4 FAQ accordion
Use the HeroUI **Accordion** (first item opened via `defaultExpandedKeys`), override styles so each item is a white rounded row with a lime circle `+` indicator that rotates 45° when open (use `FiPlus` from `react-icons/fi`). If you prefer full control, build it with Motion: `AnimatePresence` + `motion.div` animating `height: 0 → "auto"`.

### 7.5 CTA email field
White pill container (`rounded-full p-1.5`) with a transparent input inside and a lime `Button` at the right (`rounded-full`, `ring-2 ring-lime/60` for the glow). Controlled with `useState`; no HTML `<form>` is required, but a `<form onSubmit>` is fine in Next.js.

---

## 8. Animation plan

Register once: `gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)`. Always wrap in `useGSAP(() => {...}, { scope: containerRef })` so cleanup is automatic.

| Element | Library | Effect |
|---------|---------|--------|
| Badge | GSAP | Fade + scale in (0.4s) on load |
| H2 headings | GSAP `SplitText` (words) | Words rise `y: 40 → 0`, `opacity 0 → 1`, stagger 0.06, ease `power3.out`, triggered at `top 80%` |
| Underline SVG | GSAP | Animate `strokeDashoffset` (draw-in) after headline reveal. Set `pathLength="1"` on the path, dasharray 1, offset 1 → 0 |
| Pricing cards | GSAP ScrollTrigger | Stagger up (`y: 60 → 0`, stagger 0.12). Business card delays slightly and scales to 1.03 |
| Check list items | GSAP | Stagger 0.05 per item, after card reveal |
| Card hover | Motion | `whileHover={{ y: -6 }}` spring, shadow increases |
| Buttons | Motion | `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.97 }}` |
| Logo strip | CSS / GSAP | Fade in; mobile = infinite marquee (`gsap.to(track, { xPercent: -50, repeat: -1, ease: "none", duration: 25 })`) |
| FAQ rows | GSAP | Stagger fade-up; open/close height by HeroUI/Motion; plus icon rotates 45° |
| CTA band | GSAP | Background fades in from white; text reveal like H2; button gently pulses glow (`repeat: -1, yoyo: true`) |
| Whole page | Lenis | Smooth scroll `lerp: 0.1` (default is fine) |

`prefers-reduced-motion`: wrap animations in `gsap.matchMedia()` and skip them (and disable Lenis) when reduced motion is on.

### Optional 3D / anime.js
- **three.js** – a very subtle blurred lime sphere behind the pricing heading (`@react-three/fiber` `Canvas`, `MeshDistortMaterial` from `@react-three/drei`). This is *not* in the reference; add it only after the page matches the screenshot. Lazy-load it with `next/dynamic` and `ssr: false`.
- **anime.js** – if you prefer it over GSAP for the underline: `import { animate, svg } from "animejs"` and use its SVG draw helper. Check the current v4 docs for exact API names.

---

## 9. Build order (checklist)

1. Create project, add fonts, tokens in `globals.css`.
2. Add `SmoothScroll` to `layout.tsx`.
3. Build static layout with no animation: Pricing → Logos → FAQ → CTA → Footer.
4. Compare with the screenshot at 1440px width (use a 50% opacity overlay of the image in DevTools). Adjust sizes, spacing, colors.
5. Add Motion hover/tap interactions.
6. Add GSAP reveals (headings, cards, lists, underline draw).
7. Add responsive rules and mobile marquee.
8. Accessibility: buttons have visible focus rings (lime outline), accordion uses proper `aria-expanded`, decorative SVGs `aria-hidden`.
9. Performance: `next/image` for logos (or inline SVG), lazy-load any 3D, run Lighthouse.
10. Optional extras: three.js blob, billing toggle (monthly/yearly), real FAQ content.

---

## 10. Quick facts to match the screenshot exactly

- Business card is the only one with a gradient and the lime button.
- Starter and Enterprise buttons are the same dark green as the CTA band.
- Underlines are slightly curved, hand-drawn, lime, and sit just below the baseline of the word.
- CTA band has a 2–3px lime line along the bottom edge before the white footer.
- Lists use the lime check-circle with a dark tick, not a plain tick.
- Footer social icons: dark circles with white icons, ~28px.
