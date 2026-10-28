# Collection Page — Build Spec (REFLECT FASHION e-commerce)

Reference: `collectionpage.jpg` (clean fashion store landing / collection page).
Sections in order: **Navbar → Hero → Marquee band → Category banner grid → Our Collection (tabs + product grid) → Cloth & Footwear heading → Dark "Clothing Collection" section**.

Goal: recreate layout, typography, colours and motion as closely as possible.

---

## 1. Tech Stack

| Purpose | Package |
|---|---|
| Framework | `next` (App Router) + `react` + TypeScript |
| Smooth scroll | `lenis` (same `SmoothScroll` provider as the About page spec: Lenis driven by `gsap.ticker`) |
| Scroll, text reveal, marquee, filter animation | `gsap` + `@gsap/react` (ScrollTrigger, SplitText, **Flip**; all free) |
| Hover / tap / cart micro-interactions | `motion` (new name of Framer Motion, import from `motion/react`) |
| Number / badge / sparkle animation | `animejs` |
| 3D (optional, low priority) | `three` + `@react-three/fiber` |
| Icons | `react-icons` (search, user, cart, star/sparkle) |
| UI components (use sparingly, pick ONE lib) | `@heroui/react` OR `@mui/material` OR `antd` |

```bash
npm i gsap @gsap/react lenis motion animejs react-icons
npm i @heroui/react          # optional: cart Drawer, Badge, Skeleton
```

---

## 2. Design Tokens

```css
:root {
  --page-bg:   #E6E6E6;  /* outer area around the white frame */
  --bg:        #FFFFFF;  /* main page */
  --ink:       #111111;  /* text, buttons, borders */
  --card:      #F1F1F1;  /* light-grey cards (banner + product image bg) */
  --hero-img:  #E8EBF0;  /* cool light grey behind hero couple photo */
  --dark:      #141414;  /* bottom "Clothing Collection" section */
  --on-dark:   #FFFFFF;
  --muted:     #555555;  /* small paragraphs */
  --line:      #111111;  /* 1px outlines on tabs / outline buttons */
  --overlay:   rgba(20,20,20,.55);  /* product-card hover overlay */
  --radius-card: 14px;
  --radius-btn:  3px;     /* buttons/tabs are almost square */
}
```

Palette is **strictly monochrome** (black / white / greys). All colour comes from the photos.

### Typography

| Role | Font | Notes |
|---|---|---|
| Display headings, logo, marquee | **Anton** (closest free match). Alternatives: **Bebas Neue**, **League Gothic** | ultra-condensed, heavy, ALL CAPS, line-height ≈ 0.9, no letter-spacing |
| Body, nav, buttons, product names, prices | **Roboto** (also works: Inter) | nav = uppercase 12px; product names = 600 weight |

```tsx
// app/layout.tsx
import { Anton, Roboto } from "next/font/google";
const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Roboto({ weight: ["400","500","700"], subsets: ["latin"], variable: "--font-body" });
```

Type scale (approx., convert from the screenshot frame width to `vw` + `clamp()`; tune by eye):

| Element | Size | Style |
|---|---|---|
| Hero "REFLECT / FASHION" | ~15vw | display, uppercase, lh 0.9 |
| "OUR COLLECTION" | ~5.5vw | display, uppercase |
| "CLOTH AND FOOTWEAR COLLECTION" | ~6.6vw, right aligned | display, uppercase |
| "CLOTHING COLLECTION" (dark section) | ~5vw | display, white |
| Marquee text | ~3vw | display, white |
| Banner card title ("Stylish Winter T-Shirt for Woman") | ~1.6–1.8vw | body 700 (bold), lh 1.2 |
| Nav links | 12px | body 500, uppercase |
| Small paragraphs | 13–15px | body 400, `--muted` |
| Buttons / tabs | 12–14px | body 500 |
| Product name / price | 14–16px | body 700 |

---

## 3. Layout System

- Page content width: full viewport; horizontal padding ≈ **3.4vw** (≈ 48px at 1440).
- Vertical rhythm: sections separated by ≈ **6–7vw** of whitespace; no divider lines.
- Cards: radius `--radius-card`, background `--card`, no border, no shadow.
- Buttons/tabs: 1px outline, tiny radius (`--radius-btn`), padding ≈ 8px 18px.
- Grids use an 8px (≈ 0.6vw) gap between cards.

---

## 4. Section Specs

### 4.1 Navbar
- 3-column layout: left links `HOME  SHOP  SALE  ABOUT US` (uppercase, 12px, gap ≈ 28px) · center logo `REFLECT` (display font, ~24px) · right icons: search, user, cart (`FiSearch`, `FiUser`, `FiShoppingCart` from `react-icons/fi`).
- Cart icon has a tiny red/black count badge (optional but recommended).
- Sticky/fixed with `mix-blend-mode: difference` OR hide on scroll-down / show on scroll-up (GSAP + ScrollTrigger `onUpdate` direction).

### 4.2 Hero
Layout: left text block, right big rounded photo. The **text block overlaps the photo** with a notch (white block with a rounded corner cut into the image).

```tsx
<section className="hero">
  <div className="hero-img">           {/* absolute, top:0 right:0, width≈54%, height≈100%, radius 20px, bg --hero-img */}
    <Image src="/images/hero-couple.jpg" fill priority alt="" />
  </div>

  <h1 className="hero-title">
    <span>REFLECT</span>
    <span className="indent">FASHION</span>   {/* 2nd line indented ≈ 8% */}
  </h1>

  <div className="hero-notch">          {/* white block bottom-left; border-top-right-radius:24px; sits over the photo */}
    <p>Discover a fashion experience that not only mirrors your unique personality …</p>
    <div className="hero-cta">
      <button className="btn btn-fill">Buy Product</button>
      <button className="btn btn-outline">Explore Product</button>
    </div>
  </div>
</section>
```

- "FASHION" line must overlap the photo's left edge (z-index above image).
- Buttons: `Buy Product` = black fill + white text; `Explore Product` = white fill + 1px black border.
- Paragraph: 3 lines, max-width ≈ 380px, 13px, `--muted`.
- Text copy: *"Discover a fashion experience that not only mirrors your unique personality but amplifies it. At Reflect, every piece is crafted to elevate your confidence, celebrate your individuality, and empower you to stand out effortlessly in any setting."*

### 4.3 Marquee band
- Full-bleed black band (`--ink`), height ≈ 60–70px, white display text, **infinite horizontal scroll**.
- Content repeats: `FASHION ✦ REFLECT FASHION ✦ REFLECT FASHION ✦ …` with a 4-point sparkle star icon (SVG, white) between each phrase.
- Implementation: duplicate the track twice, tween `xPercent: -50` forever.

```tsx
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tween = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 20, repeat: -1 });
    // speeds up + reverses with scroll direction
    ScrollTrigger.create({
      onUpdate: (self) => {
        gsap.to(tween, { timeScale: self.direction * (1 + Math.abs(self.getVelocity()) / 800), duration: 0.3, overwrite: true });
        gsap.to(tween, { timeScale: self.direction, duration: 0.6, delay: 0.3 });
      },
    });
  }, []);
  return (
    <div className="marquee">
      <div ref={track} className="marquee-track">{/* render the phrase list twice */}</div>
    </div>
  );
}
```
```css
.marquee { background: var(--ink); color:#fff; overflow:hidden; white-space:nowrap; }
.marquee-track { display:inline-flex; gap: 2.5vw; font-family: var(--font-display); font-size:3vw; text-transform:uppercase; padding-block:.6vw; will-change: transform; }
```

### 4.4 Category banner grid (4 cards)
Grid: `grid-template-columns: 1fr 1fr 1.45fr; gap: 8px;` height ≈ 38vw (cards stretch).

| Card | Content |
|---|---|
| A (tall) | Woman in beige coat + brown hat holding black bag. White button **"Explore Now"** at bottom-center |
| B (tall) | Woman in black hat + black halter top. White button **"Explore Now"** at bottom-center |
| C (wide, top right) | Small label "Woman Collection", title **"Stylish Winter T-Shirt for Woman"**, outline button **"Check Now"**; model (brown sweater) cut-out on the right side |
| D (wide, bottom right) | Small label "Men Collection", title **"Stylish Winter Shirt for Man"**, outline button **"Check Now"**; man (green plaid shirt, grey beanie) cut-out on the right |

- Cards A & B: model photo fills card (`object-fit: cover`, `object-position: bottom`); "Explore Now" button is white, radius 3px, 12px text.
- C & D: two stacked rows spanning column 3; text left (padding ≈ 20px), image right aligned to card bottom.
- All four card backgrounds `--card`.

### 4.5 Our Collection (heading + tabs + products)
Header row: `OUR COLLECTION` (left, display font) and a small right-aligned paragraph (max-width ≈ 330px, 11–12px): *"Step into the world of Reflect, where each collection tells its own story. From essentials to bold statement pieces, our curated collections are designed to suit every occasion and style."*

Tabs (below heading, left-aligned, gap ≈ 12px): **Hoodie · Caps & Bags · Trending · Out Wear · Accessories**
- Inactive: white bg, 1px `--ink` border, `--ink` text.
- Active: `--ink` bg, white text. (Hoodie active by default.)

Product grid: **4 columns**, gap ≈ 12px. Each card:
- Image box: bg `--card`, radius `--radius-card`, aspect ratio **4/5**, hoodie photo centred (cut-out or studio photo on grey).
- Under the image: product name (left, bold 14px) and price (right, bold).
- **Hover state (see 2nd card in reference):** image darkens with `--overlay`, and two buttons appear centered, stacked: `Add to Cart` (translucent/outlined, white text) and `Buy Now` (solid white, black text).

Sample data (from the screenshot):

```ts
export const products = [
  { id: 1, name: "Men BLVCK Grey Hoodie",       price: 180, cat: "Hoodie", img: "/images/products/hoodie-1.jpg" },
  { id: 2, name: "LHR London England Hoodie",    price: 250, cat: "Hoodie", img: "/images/products/hoodie-2.jpg" },
  { id: 3, name: "Retro Rapper Tupez Hoodie",    price: 100, cat: "Hoodie", img: "/images/products/hoodie-3.jpg" },
  { id: 4, name: "Hip Hop Street Wear Hoodie",   price: 120, cat: "Hoodie", img: "/images/products/hoodie-4.jpg" },
  // add 4 more for each: "Caps & Bags", "Trending", "Out Wear", "Accessories"
];
```

### 4.6 "Cloth and Footwear Collection" heading block
- Right-aligned giant 2-line heading: `CLOTH AND FOOTWEAR` / `COLLECTION` (display font, black).
- Small paragraph on the left, vertically near the bottom of the heading (max-width ≈ 260px, 11px): *"Reflect, we offer more than just clothing and footwear — we provide a canvas for your individuality. Our thoughtfully designed apparel and footwear collections blend style and comfort, allowing you to make a statement with every step."*

### 4.7 Dark "Clothing Collection" section
- Full-width `--dark` background, padding-block ≈ 5vw, padding-x same as page.
- Two columns: **left** rounded image card (≈ 36% width, radius 14px, bg `--card`) with a couple holding shopping bags (man in brown jacket, woman in patterned scarf); **right** white heading `CLOTHING COLLECTION` (2 lines, display) and a small white/grey paragraph: *"Our clothing collection at Reflect is a celebration of style, versatility, and craftsmanship. Each piece is thoughtfully designed to …"* (continue; the reference is cropped here, add your own copy + a CTA button).
- This section is the page's "contrast moment": consider a clip-path / background reveal on enter.

---

## 5. Folder Structure

```
app/
  layout.tsx
  page.tsx                 // or app/collection/page.tsx
  globals.css
components/
  SmoothScroll.tsx         // Lenis + GSAP ticker
  collection/
    Navbar.tsx
    Hero.tsx
    Marquee.tsx
    CategoryBanners.tsx
    OurCollection.tsx
    CategoryTabs.tsx
    ProductCard.tsx
    ProductGrid.tsx
    FootwearHeading.tsx
    ClothingSection.tsx
    CartDrawer.tsx         // optional (HeroUI/MUI/antd Drawer)
data/products.ts
store/cart.ts              // zustand (optional)
public/images/...
```

---

## 6. Animations

### 6.1 Foundation
Use the same `SmoothScroll` (Lenis with `autoRaf:false`, driven by `gsap.ticker.add`, `lagSmoothing(0)`, `ScrollTrigger.update` on Lenis scroll). Add `.lenis.lenis-smooth { scroll-behavior:auto !important; }`. Disable for `prefers-reduced-motion`. Use `useGSAP` for automatic cleanup.

### 6.2 Hero
- `SplitText` the title into lines/chars, wrap in `overflow:hidden` mask; `yPercent: 110 → 0`, stagger 0.05, ease `power4.out`.
- Hero photo: `clip-path: inset(0 0 100% 0 round 20px)` → `inset(0 round 20px)` + inner image `scale 1.15 → 1`.
- Notch block (paragraph + buttons) fades/slides up after the title.
- Mouse-parallax: image moves ±10px, title ±5px (use `motion` `useMotionValue` + `useSpring`).

### 6.3 Marquee
Infinite GSAP loop (code in 4.3), speed + direction react to scroll velocity.

### 6.4 Banner grid
- Cards: `ScrollTrigger` batch → `y: 60 → 0`, opacity, stagger 0.12.
- Inner images: slow parallax (`yPercent: -8 → 8`, scrub).
- "Explore Now" / "Check Now" buttons: motion `whileHover={{ scale: 1.05 }}`, bg fill slide.

### 6.5 Tabs filter (GSAP **Flip**)
Pattern: get Flip state **before** the DOM change, change the data, then call `Flip.from` after React renders (in `useLayoutEffect`).

```tsx
"use client";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const [cat, setCat] = useState("Hoodie");
const flipState = useRef<Flip.FlipState | null>(null);

const onTab = (next: string) => {
  flipState.current = Flip.getState(".product-card");   // 1. record BEFORE change
  setCat(next);                                          // 2. change DOM via React
};

useLayoutEffect(() => {                                  // 3. animate difference
  if (!flipState.current) return;
  Flip.from(flipState.current, {
    duration: 0.6, ease: "power2.inOut", stagger: 0.05, absolute: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1 }),
    onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85 }),
  });
  flipState.current = null;
}, [cat]);
```
Give each card a stable `data-flip-id={product.id}` and `key={product.id}`. Avoid combining Flip with scrubbed ScrollTrigger on the same elements (fiddly); call `ScrollTrigger.refresh()` after the filter finishes.

### 6.6 Product card hover
- motion: `whileHover` on the card → overlay `opacity 0 → 1`, buttons `y: 12 → 0` stagger 0.05, image `scale 1 → 1.06`.
- `Add to Cart` click: cart icon in navbar "bumps" (anime.js `scale [1, 1.3, 1]`) and the badge number counts up.
- Touch devices: show buttons on tap or always show a small "+" button.

### 6.7 Headings
- `OUR COLLECTION`, `CLOTH AND FOOTWEAR COLLECTION`, `CLOTHING COLLECTION`: SplitText lines mask reveal on enter (`start: "top 85%"`).
- Cloth & Footwear heading: slight horizontal parallax (`xPercent: 5 → 0`, scrub).

### 6.8 Dark section
- On enter, background expands with `clip-path: inset(8% 4% round 24px)` → `inset(0)` (scrub) so it feels like the page "opens".
- Left image card: sticky/parallax (`y` scrub); text lines stagger in.

### 6.9 Three.js (optional)
Not required for this design. If you want it: subtle 3D tilt of the hero photo (plane with mouse-follow rotation), or a hoodie 3D viewer in a quick-view modal. Lazy-load with `next/dynamic` (`ssr:false`) and keep a 2D `<Image>` fallback.

### 6.10 Performance / a11y
Animate only `transform` / `opacity` / `clip-path`; use `next/image` with `sizes`; `priority` on hero; reduced-motion fallback; keyboard-focus styles on tabs and buttons; alt text for every product image.

---

## 7. UI Library Usage (choose ONE)

| Library | Good for here | Avoid |
|---|---|---|
| **HeroUI** (best fit, Tailwind-based) | Cart `Drawer`, `Badge` on cart icon, `Skeleton` loading, quick-view `Modal` | Tabs/Buttons shown in the design (they are custom square outlines) |
| **MUI** | `Badge`, `Drawer`, `Snackbar` ("Added to cart") | Default Roboto/ripple styling clashes; override theme (radius 3px, no elevation, monochrome) |
| **Ant Design** | `InputNumber` (quantity), `Rate`, `Drawer`; best if you later build checkout/admin | Whole-page styling; large bundle |

Style tabs, product cards, banners and heading manually with CSS/Tailwind. Do not use three libraries together.

---

## 8. Responsive

- **≥1024px:** as the reference.
- **768–1023px:** hero stacks (title on top, photo below with the notch removed); banner grid becomes 2×2; products 3 columns.
- **<768px:** nav collapses to hamburger + logo + cart; hero title ~22vw; marquee smaller (6vw); banner grid 1 column (tall cards first, then the wide ones); tabs become horizontally scrollable (`overflow-x:auto; scroll-snap`); product grid 2 columns; "Cloth and Footwear" heading left-aligned; dark section stacks (image on top).

---

## 9. Images Required

### Essential to match the screenshot: **10 images**

| # | Image | Where | Suggested size / ratio | Notes |
|---|---|---|---|---|
| 1 | Man + woman in black wool coats, close pose, light-grey studio background | Hero | ~1600×1360 (≈ 1.18 : 1) | Light cool-grey background (`#E8EBF0`), serious editorial look |
| 2 | Woman in beige coat, brown wide-brim hat, holding black handbag | Banner A | 1000×1450 (≈ 0.69 : 1) | Standing, full/three-quarter body, grey bg |
| 3 | Woman in black hat + black ribbed halter top | Banner B | 1000×1450 | Same lighting as #2 |
| 4 | Woman in brown knit sweater / t-shirt, hands near hair | Banner C | 800×1000 (cut-out PNG/WebP preferred) | Transparent background |
| 5 | Man in green plaid shirt, grey beanie, beard | Banner D | 800×1000 (cut-out preferred) | Transparent background |
| 6 | Grey "BLVCK" hoodie, back view on model | Product 1 | 800×1000 (4:5) | Light-grey bg |
| 7 | Olive/green hoodie with graphic, back view | Product 2 | 800×1000 | |
| 8 | Grey hoodie with white graphic print, back view | Product 3 | 800×1000 | |
| 9 | Black hoodie with print, model with blue cap | Product 4 | 800×1000 | |
| 10 | Couple with shopping bags (brown jacket / patterned scarf) | Dark section | 1200×1300 | Light bg |

### For the tab filter to work (recommended extra)
Each extra tab needs its own products: **Caps & Bags, Trending, Out Wear, Accessories** → ~4 product images each = **16 more images** (same style: 4:5, light grey background). For a quick demo you can reuse the 4 hoodie images and only change the names.

### Where to get them
- Unsplash, Pexels, Pixabay: search `fashion model studio grey background`, `couple black coat fashion`, `woman beige coat hat`, `man plaid shirt beanie`, `hoodie back view`, `streetwear hoodie model`, `shopping bags couple fashion`.
- For product shots without a studio background: remove the background (remove.bg / Photoshop / Photopea) and let the card colour `--card` show through.
- Match lighting and background tone across all images (light grey, soft light) so the grid looks consistent.
- Check licences for commercial use; do not use random brand logos or copyrighted prints in real products.

### Not images (code only)
Logo text, sparkle stars in the marquee, icons, tabs, buttons, dark section background.

---

## 10. Build Checklist

- [ ] `next/font`: Anton + Roboto, tokens in `globals.css`
- [ ] `SmoothScroll` wrapper (Lenis + GSAP ticker)
- [ ] Navbar (sticky/hide-on-scroll) + cart badge
- [ ] Hero with notch block + overlapping "FASHION" line
- [ ] Marquee (GSAP infinite, scroll-velocity)
- [ ] Banner grid (2 tall + 2 wide cards)
- [ ] Tabs + product grid + Flip filter animation
- [ ] Product hover overlay (Add to Cart / Buy Now)
- [ ] Cloth & Footwear heading + dark section
- [ ] Cart state + drawer (HeroUI/MUI/antd, pick one)
- [ ] Responsive + reduced-motion + Lighthouse pass

---

## 11. References Used

- GSAP Flip plugin (getState → DOM change → `Flip.from`, `absolute`, `onEnter/onLeave`, filter/sort use case): jsDelivr `gsap-animation-helper` Flip doc; ui-skills.com "gsap-web"
- GSAP forum: Flip + ScrollTrigger + React caveats (capture state before the state change; scrub + Flip is fiddly): gsap.com community thread "Weird flip animation when using with scrollTrigger"
- GSAP infinite marquee loops and scroll-direction marquee patterns: gsap.com community "infiniteloop" tag
- GSAP plugins (ScrollTrigger, SplitText, Flip) are free; `useGSAP` / `gsap.context` cleanup in React: ui-skills.com "gsap-web", skills.cat "elite-gsap"
- Lenis + GSAP ticker setup: see the About page spec (hontran.dev guide)
