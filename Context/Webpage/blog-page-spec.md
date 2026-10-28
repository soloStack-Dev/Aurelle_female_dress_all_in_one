# Blog Page — Build Spec (Folioblox style, orange-on-black editorial)

Reference: `blogpage.jpg` (dark portfolio landing with a vivid orange hero gradient).
Sections in order: **Nav → Hero (gradient + portrait) → Trusted-by logo strip → "Behind the Designs" intro → 3 image cards**.

> Note: the screenshot is a portfolio-style home layout. Sections 1–6 reproduce it exactly. Section 7 shows how to turn the same layout into a real **blog** (the 3 image cards become post cards, plus `/blog` and `/blog/[slug]` routes).

---

## 1. Tech Stack

| Purpose | Package |
|---|---|
| Framework | `next` (App Router) + `react` + TypeScript |
| Smooth scroll | `lenis` (same `SmoothScroll` provider as the earlier specs: Lenis driven by `gsap.ticker`) |
| Scroll / text reveal / marquee / parallax | `gsap` + `@gsap/react` (ScrollTrigger, SplitText; free) |
| Hover, magnetic buttons, cursor follower | `motion` (new name of Framer Motion, import from `motion/react`) |
| Number / small UI effects | `animejs` |
| 3D (optional hero background) | `three` + `@react-three/fiber` |
| Icons | `react-icons` (`FiArrowRight`, `FiArrowUpRight`) |
| UI components (pick ONE if needed) | `@heroui/react` OR `@mui/material` OR `antd` |

```bash
npm i gsap @gsap/react lenis motion animejs react-icons
npm i @heroui/react   # optional: mobile menu Drawer, Chip, Pagination, Input (for blog)
```

---

## 2. Design Tokens

```css
:root {
  --bg:         #0F0F0F;  /* page background */
  --surface:    #161616;  /* logo-strip card (slightly lighter than page) */
  --text:       #FFFFFF;
  --muted:      rgba(255,255,255,.55);  /* small paragraphs */
  --accent:     #FF5F10;  /* "Behind the Designs", "#" in numbers, CTA, arrow circles */
  --hero-1:     #FF6A1F;  /* bright orange (top-left of hero) */
  --hero-2:     #EE3B1B;  /* red-orange (middle) */
  --hero-3:     #8A1F12;  /* burgundy */
  --hero-4:     #160807;  /* near black (bottom-right) */
  --radius-hero: 56px;    /* bottom corners of hero + logo strip */
  --radius-card: 22px;    /* image cards */
  --radius-pill: 999px;
}

.hero-bg {
  background:
    radial-gradient(60% 70% at 20% 10%, var(--hero-1) 0%, transparent 70%),
    linear-gradient(135deg, var(--hero-1) 0%, var(--hero-2) 35%, var(--hero-3) 68%, var(--hero-4) 100%);
}
```

Palette logic: **one hot orange + black + white**, and the three content photos are **black & white** so the orange is the only colour.

### Typography

| Role | Font | Notes |
|---|---|---|
| Everything | **Plus Jakarta Sans** (free, Google Fonts, variable weight 100–900), closest match to the geometric sans in the image | Display = weight 700, tight tracking (≈ -0.03em, tighter than the usual -0.01/-0.02em), line-height ≈ 0.95–1.1 |

```tsx
// app/layout.tsx
import { Plus_Jakarta_Sans } from "next/font/google";
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" }); // variable font, no weight list needed
```

Type scale (approximate; tune by eye against the screenshot, use `clamp()`):

| Element | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Hero "Creative Director" | ~10vw (max ≈ 9rem) | 700 | -0.03em | 0.95 |
| "Hey, I'm a" | ~1.6vw (min 16px) | 500 | 0 | 1.2 |
| Hero tagline "Great design should feel invisible." | ~2.4vw | 700 | -0.01em | 1.2 |
| Section heading "Shaping Experiences That Make Life Simpler" | ~5.2vw | 700 | -0.03em | 1.1 |
| Intro paragraph (right column) | ~2.2vw | 600 | -0.01em | 1.35 |
| "Behind the Designs" eyebrow | ~2.2vw | 600 | 0 | 1.2 (accent colour) |
| Nav links, buttons, small text | 12–14px | 500/600 | 0 | 1.5 |
| Muted paragraphs | 12–14px | 400 | 0 | 1.5 |

---

## 3. Layout System

- Content width: full viewport; horizontal padding ≈ **3.2vw** (≈ 46px at 1440). Max container ≈ 1440px.
- **Layered cards:** the hero is a card with rounded *bottom* corners (`--radius-hero`) and the logo strip is a second, slightly lighter dark card behind/below it, also with rounded bottom corners, so the page looks like stacked sheets.
- 4-column grid for hero numbered list; 2-column grid for the intro section (≈ 50/50); 3-column grid (gap ≈ 1vw) for image cards.
- Whitespace between sections ≈ 7–8vw.

---

## 4. Section Specs

### 4.1 Nav (overlays hero, transparent)
- Left: logo text **Folioblox** (white, 600, ~16px).
- Right: links `Home`, `About`, `Projects` (white, 13px, gap ≈ 28px) + pill CTA **"Get in touch"**:
  - White pill, black bold text (12px), with an **orange circle** (`--accent`) on the right holding a white arrow (`FiArrowRight`).
- Pill height ≈ 38px, padding-left 20px, circle 28px at the right with 4px inset.

### 4.2 Hero (card with gradient + portrait)
Layout (desktop): height ≈ 67vw max 100svh, `border-radius: 0 0 var(--radius-hero) var(--radius-hero)`, overflow hidden, `.hero-bg` background.

```tsx
<section className="hero hero-bg">
  <Nav />
  <div className="hero-copy">             {/* left, vertically ~40% from top */}
    <p>Hey, I'm a</p>
    <h1>Creative<br/>Director</h1>
  </div>

  <Image className="hero-portrait" src="/images/hero-portrait.png" alt="" priority fill />
  {/* portrait: right of centre (≈ 45%–85% width), bottom-aligned, cropped at hero bottom, silhouette look */}

  <div className="hero-side">             {/* right column at ~69% width, vertically ~55% */}
    <h2>Great design should feel invisible.</h2>
    <p>From logo to language, I build brands that connect and convert.</p>
  </div>

  <ol className="hero-services">          {/* 4-col grid pinned to hero bottom (padding-bottom ≈ 3vw) */}
    <li><span><i>#</i>01</span>Brand Strategy</li>
    <li><span><i>#</i>02</span>Brand Identity Design</li>
    <li><span><i>#</i>03</span>Packaging Design</li>
    <li><span><i>#</i>04</span>Creative Direction</li>
  </ol>
</section>
```
- In `.hero-services`, `i` (the `#`) uses `--accent`; the digits and label are white (digits ~11px bold, label 12px regular).
- Portrait look: dark/black silhouette of a person in **profile looking up**, curly hair, red-tinted sunglasses, orange rim light/backlight. Achieve it with a **cut-out PNG** + `filter: brightness(.45) contrast(1.2)`; add a subtle orange `mix-blend-mode: screen` rim glow (radial-gradient) behind it. Alternatively use a photo already shot with orange backlight.
- Add a gentle bottom fade (`linear-gradient(to top, rgba(0,0,0,.6), transparent 40%)`) so the numbered list stays readable.
- Optional film grain overlay (`opacity .08`, tiled noise PNG) for the premium look.

### 4.3 Trusted-by logo strip
- Dark `--surface` container sitting **under** the hero, extending ≈ 120px (≈ 8vw) below it, rounded bottom corners (`--radius-hero`). Use `margin-top: -56px; padding-top: 56px` so the hero overlaps it.
- Left: label **"Trusted by Brands I've Helped Shape"** (2 lines, 12px, 600, max-width ≈ 140px).
- Right: logo carousel, white wordmarks with simple icons: **Supa Blox** (ring), **Hype Blox** (hourglass shape), **Frame Blox** (half-filled circle), **Ultra Blox** (two overlapping circles). The last logo **fades out at the right edge**: `mask-image: linear-gradient(to right, #000 80%, transparent)`.
- These are fake placeholder brands: draw icons as inline SVG, wordmark in Plus Jakarta Sans 600 ~ 16–18px.
- Motion: infinite marquee (GSAP) that pauses on hover.

### 4.4 "Behind the Designs" intro
Two columns:

| Left | Right |
|---|---|
| Eyebrow **Behind the Designs** (accent) + heading **"Shaping Experiences That Make Life Simpler"** (3 lines, white bold) | Paragraph: *"I'm a product designer focused on building clean, intuitive interfaces that solve real-world problems."* (white, 600) and below: muted small text *"Let's Build Something Meaningful Together"* (2 lines, left) + **orange pill CTA "Get in touch"** (right) |

- Orange CTA: `--accent` bg, white bold text 12px, with a **white circle** on the right holding an orange arrow (inverse of the nav CTA).
- Right column starts at ≈ 50% of container width.

### 4.5 Image trio
- 3 equal cards in a row, gap ≈ 1vw, aspect ≈ **3 : 4.2** (≈ 177×246), `border-radius: var(--radius-card)`, `overflow:hidden`.
- All images **black & white, high-key, light grey backgrounds**:
  1. Puffer jacket hanging on a metal rod/hanger
  2. Person with short bleached hair wearing headphones, profile view, dark button-up shirt
  3. Black pump bottle with a blank white label balanced on a rock
- `object-fit: cover`. No captions in the reference (add them in the blog version, section 7).
- Page ends with ≈ 5vw bottom padding on `--bg`.

---

## 5. Folder Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  SmoothScroll.tsx
  folioblox/
    Nav.tsx
    Hero.tsx
    HeroServices.tsx
    LogoStrip.tsx         // marquee
    PillCTA.tsx           // white/orange variants with arrow circle
    Intro.tsx
    ImageTrio.tsx
data/
  services.ts  logos.tsx
public/images/
  hero-portrait.png
  card-jacket.jpg  card-headphones.jpg  card-bottle.jpg
  noise.png (optional)
```

---

## 6. Animations

### 6.1 Foundation
Same `SmoothScroll` (Lenis with `autoRaf:false` driven by `gsap.ticker.add`, `lagSmoothing(0)`, `lenis.on("scroll", ScrollTrigger.update)`). Add `.lenis.lenis-smooth{scroll-behavior:auto!important}`. Disable on `prefers-reduced-motion`. Use `useGSAP` for cleanup.

### 6.2 Hero (on load, one GSAP timeline)
1. Gradient background: `opacity 0 → 1` + slight `scale 1.1 → 1`.
2. Nav: `y: -20 → 0`, opacity.
3. `SplitText` "Creative Director" (lines) inside `overflow:hidden` masks: `yPercent: 110 → 0`, stagger 0.1, ease `power4.out`.
4. "Hey, I'm a": fade/slide up.
5. Portrait: `opacity 0 → 1`, `scale 1.08 → 1`, `y: 40 → 0`, duration 1.4.
6. Tagline + paragraph: fade up; four `#0X` items: stagger 0.08 with a thin line drawing above each (optional).
- **Scroll:** headline `yPercent: -15`, portrait `yPercent: 8`, background gradient `backgroundPosition` shifts (scrub). The hero can `scale(.96)` and gain extra radius as the logo strip slides over (ScrollTrigger scrub).
- **Mouse:** portrait/glow follows the cursor ±15px (`useSpring` from `motion`) for a depth effect.

### 6.3 CTA pills (motion)
- Hover: the arrow circle **expands to fill the pill** (`scale` / `width` animation), text colour inverts, arrow translates `x: 0 → 4px`.
- Magnetic effect: pill follows cursor within ~12px (`useMotionValue` + `useSpring`).

### 6.4 Logo marquee
```tsx
useGSAP(() => {
  const tl = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 25, repeat: -1 });
  const el = wrap.current!;
  el.addEventListener("mouseenter", () => gsap.to(tl, { timeScale: 0, duration: .4 }));
  el.addEventListener("mouseleave", () => gsap.to(tl, { timeScale: 1, duration: .4 }));
}, []);
```
Render the logo list twice so the loop is seamless; keep the right-edge fade mask.

### 6.5 Intro section
- Eyebrow + heading: `SplitText` lines mask reveal on enter (`start: "top 80%"`).
- Right paragraph: split by words; opacity `.2 → 1` scrubbed with scroll (like the About spec).
- Muted text + CTA: fade up.

### 6.6 Image trio
- On enter: `clip-path: inset(100% 0 0 0 round 22px)` → `inset(0 round 22px)`, stagger 0.15; inner image `scale 1.25 → 1`.
- Parallax: each image `yPercent: -6 → 6` scrub, middle card with a different speed (stagger feel).
- Hover: image `scale 1.05`, custom cursor bubble labelled "View" (motion `useMouse` follower).

### 6.6 Three.js (optional)
Good fit here: replace the CSS hero gradient with an **animated shader gradient** (R3F fullscreen plane, noise-based orange→black blend moving slowly, mouse-reactive). Lazy-load with `next/dynamic` (`ssr:false`), keep the CSS gradient as fallback / reduced-motion / mobile.

### 6.7 Performance / a11y
Animate only `transform`, `opacity`, `clip-path`; `priority` + `sizes` on hero image; marquee `will-change: transform`; text contrast on orange must stay ≥ 4.5:1 (use the bottom fade); alt text on all images; focus ring on pills.

---

## 7. Turning It Into a Real Blog

Keep the visual language; change content:

**`/blog` (index)**
- Hero: smaller (`min-height: 55svh`) with `Journal` or `Blog` as the big heading + tagline ("Notes on design, brands and building things").
- Replace the logo strip with a **category filter row** (chips: All, Branding, Packaging, Product, Process) styled as outlined pills; active = orange. Animate the filter with GSAP **Flip** (same pattern as the collection spec).
- Replace the image trio with a **post grid** (3 columns desktop / 2 tablet / 1 mobile). Post card = image (rounded 22px, B&W with hover to colour), category tag in `--accent`, title (white 700, 2 lines), excerpt (muted), date + read time.
- Pagination or "Load more" pill (orange).

**`/blog/[slug]` (post)**
- Header: category (accent), title (display, tight), author + date + read time, cover image (full width, radius 22px, parallax).
- Body: max-width ≈ 720px, 18px/1.7 body in `rgba(255,255,255,.85)`, headings 700 white, pull-quotes with an orange left border, images full-bleed with radius, code blocks on `--surface`.
- Reading progress bar (2px `--accent` at top, GSAP ScrollTrigger scrub).
- "Next post" card + CTA pill at the end.

```ts
// data/posts.ts (or MDX frontmatter)
export type Post = {
  slug: string; title: string; excerpt: string;
  category: "Branding" | "Packaging" | "Product" | "Process";
  cover: string; date: string; readTime: string;
};
```
Content source options: local **MDX** (`@next/mdx` or `next-mdx-remote`), or a headless CMS (Sanity, Contentful, Notion). Generate static pages with `generateStaticParams`.

UI lib (pick one): **HeroUI** → `Chip` (categories), `Pagination`, `Input` (search), `Skeleton`, `Drawer` (mobile menu). MUI/Ant Design are not needed for this look; if used, theme to black/orange with radius 999px and no shadows.

---

## 8. Responsive

- **≥1024px:** as the reference.
- **768–1023px:** hero copy and portrait overlap more (portrait right 50%), tagline moves under the title, numbered list becomes 2×2; intro columns stack with the CTA below.
- **<768px:** nav collapses to a menu button (+ small CTA); H1 ≈ 15vw; portrait centred behind text, lower opacity; tagline + paragraph below; numbered list 2×2; logo strip label sits above the marquee; intro stacks; image trio becomes a horizontal scroll-snap row or 1-column stack; reduce parallax and disable the cursor follower on touch.

---

## 9. Images Required

### Essential to match the screenshot: **4 images**

| # | Image | Where | Size / ratio | Notes |
|---|---|---|---|---|
| 1 | Portrait of a person in **profile, head tilted up**, curly hair, sunglasses (red/orange tint), dark clothes, dramatic orange rim light | Hero | ≈ 1600×2000, **transparent PNG/WebP cut-out** preferred | Should read as a dark silhouette on the orange gradient. If you use a photo with its own background, shoot/choose one with orange/red light |
| 2 | Puffer jacket hanging on a hanger/rod, light grey bg, **black & white** | Card 1 | 1000×1400 (≈ 3 : 4.2) | High-key, soft shadow |
| 3 | Person with short bleached hair + headphones, profile, dark shirt, **black & white** | Card 2 | 1000×1400 | Same grey tone as the other cards |
| 4 | Black pump/dropper bottle with blank white label on a rock, **black & white** | Card 3 | 1000×1400 | Product-style shot, light bg |

### Optional extras
- `noise.png` tile (200×200) for film grain on the hero.
- Logo strip: 4 fake brand logos are **SVG in code** (no images needed).
- **Blog version:** one cover image per post (≈ 1200×1500, same B&W style), recommended 6–9 images + 1 OG image (1200×630) per post.

### Where to get them
- Unsplash, Pexels, Pixabay. Search: `profile portrait sunglasses curly hair orange light`, `silhouette portrait orange background`, `puffer jacket hanging black and white`, `headphones portrait bleached hair black and white`, `cosmetic bottle rock black and white`, `minimal product photography monochrome`.
- Convert to B&W + add contrast in Photoshop/Photopea/Lightroom (or CSS `filter: grayscale(1) contrast(1.1)` if you want to keep colour originals).
- Remove the background for the hero portrait with remove.bg / Photoshop / Photopea.
- Keep the 3 cards **the same tone, contrast and aspect ratio**, and check licences for commercial use.

---

## 10. Build Checklist

- [ ] `next/font` Plus Jakarta Sans + tokens in `globals.css`
- [ ] `SmoothScroll` wrapper (Lenis + GSAP ticker)
- [ ] Nav with white pill CTA (orange arrow circle)
- [ ] Hero gradient + portrait + 4 numbered services
- [ ] Logo strip with rounded layered card + marquee + edge fade
- [ ] Intro two-column + orange CTA pill
- [ ] Image trio with reveal + parallax + hover cursor
- [ ] (Blog) `/blog` grid + filter (Flip) + `/blog/[slug]` template + progress bar
- [ ] Responsive, reduced-motion, Lighthouse pass

---

## 11. References Used

- Plus Jakarta Sans: free Google Font, variable weights 100–900, geometric sans (fontalternatives.com comparisons); heading hierarchy uses heavy weights with negative letter-spacing (co.vet typography guidelines; this spec goes slightly tighter to match the image)
- Next.js `next/font/google`: variable fonts need no weight list; use the `variable` option for a CSS variable (nextjs.org Font Module docs)
- GSAP SplitText / ScrollTrigger / Flip are free; `useGSAP` for React cleanup; Lenis + GSAP ticker setup (see the About page spec, hontran.dev guide)
