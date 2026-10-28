# About Page — Build Spec (Alex Graham / Designer Portfolio)

Reference: `aboutpage.jpg` (dark editorial portfolio, 3 sections: **Hero → Intro → Services**).
Goal: recreate the layout, typography, colours and motion as closely as possible.

---

## 1. Tech Stack

| Purpose | Package |
|---|---|
| Framework | `next` (App Router) + `react` + TypeScript |
| Smooth scroll | `lenis` |
| Scroll / timeline / text animation | `gsap` + `@gsap/react` (ScrollTrigger, SplitText — all plugins are free now) |
| Micro-interactions / hover / page transitions | `motion` (the new name of Framer Motion, import from `motion/react`) |
| Number / stroke / counter animation | `animejs` |
| 3D (optional hero effect) | `three` + `@react-three/fiber` + `@react-three/drei` |
| Icons | `react-icons` |
| UI components (use sparingly) | `@heroui/react` OR `@mui/material` OR `antd` — pick ONE |

```bash
npm i gsap @gsap/react lenis motion animejs react-icons three @react-three/fiber @react-three/drei
npm i @heroui/react   # optional, only if you need Button/Tooltip/Drawer
```

> **Important design note:** This design is 95% custom typography + layout. Do NOT mix MUI + HeroUI + Ant Design together. They bring their own themes and fight the editorial look. See section 9.

---

## 2. Design Tokens

### Colours (sampled by eye from the reference)

```css
:root {
  --bg-light:   #DCDCDC;  /* hero background (light grey) */
  --ink:        #151515;  /* hero text on light */
  --bg-dark:    #131313;  /* intro + services background */
  --text:       #F5F5F5;  /* main text on dark */
  --muted:      #7C7C7C;  /* small descriptions on dark */
  --accent:     #E5412D;  /* red: "// labels" + highlighted words */
  --line:       #2A2A2A;  /* 1px dividers, list borders, button border */
  --outline:    #CFCFCF;  /* stroke colour for big "01" */
}
```

### Typography

| Role | Font | Notes |
|---|---|---|
| Display + body | **Inter** or **Inter Tight** (closest free match to the Neue Haas / Helvetica look in the image) | weight 500, very tight tracking |
| Numbers / list index / big "01" | **JetBrains Mono** or **IBM Plex Mono** | use `font-feature-settings: "zero"` to get the slashed zero (Ø) seen in the image |

```tsx
// app/layout.tsx
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
```

Type scale (as a **percentage of the frame width** in the reference — convert with `vw` + `clamp()`):

| Element | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero name "Alex Graham" | ~19vw (must span edge to edge) | 500 | -0.06em | 0.8 |
| Hero role "// Web Designer / Art Director" | ~5.5vw | 500 | -0.04em | 1 |
| Intro statement | ~5vw | 500 | -0.04em | 1.05 |
| "Branding & Marketing" | ~5vw | 500 | -0.03em | 1.1 |
| Big outlined "01" | ~24vw (mono) | 300 | 0 | 1 |
| Small text (nav, socials, descriptions, list rows, button) | 12–14px | 400/500 | 0 | 1.5 |
| Section labels "// Intro" | 12px | 600 | 0 | 1 |

> Tune the numbers by eye against the screenshot. The look comes from **very large + very tight tracking**.

---

## 3. Layout System

- Outer page background: near-black `#141414`. The page itself sits in a frame with a 1px border `--line`.
- 12-column grid, padding-x ≈ 6% (`px-[6vw]`).
- Sections are separated by a **1px full-width line** (`border-top: 1px solid var(--line)`).
- Repeating pattern: **`// Label`** in red at the top-left of every section.
  - The `//` and the word are both red, word is semi-bold, 12px.
- Asymmetric offsets: content starts at different x positions per section (intro paragraph at ~50% width, services right column at ~37% width). Don't centre things.

---

## 4. Section 1 — Hero

**Background:** `--bg-light`. Height: `100svh` (reference looks ~65% of a screen; use `min-height: 90svh`).

### Structure (z-index order, back to front)

1. `<nav>` (top, z-30)
2. Name text **back layer** — dark `--ink` (z-10)
3. **Portrait cutout PNG** (z-20)
4. Name text **front layer** — white with `mix-blend-mode: difference` (z-25)
5. Role text bottom-right, social links bottom-left (z-30)

### Nav
- Left: small circle icon + `Alex Design & Strategy`
- Then `Projects` (≈ 40% from left), `About` (≈ 65%), `Contact` (right aligned).
- 12–13px, `--ink`, no underline. Hover: slight opacity + underline slide.

### The overlap effect (key visual)
In the reference, the huge name is **behind the head** but letters turn **white** where they cross the dark hair/jacket. Reproduce it like this:

```tsx
<section className="hero">
  <Nav />
  <h1 className="name name-back">Alex Graham</h1>

  <Image src="/images/portrait.png" alt="Alex Graham" className="portrait" priority width={1400} height={1800} />

  {/* duplicate text ABOVE the image: difference blend inverts over dark pixels */}
  <div className="name name-front" aria-hidden>Alex Graham</div>

  <ul className="socials">…</ul>
  <p className="role"><span>//</span> Web Designer<br/>Art Director</p>
</section>
```

```css
.name { position:absolute; left:0; right:0; top:28%; font-size:19vw; line-height:.8;
        letter-spacing:-.06em; font-weight:500; white-space:nowrap; text-align:center; }
.name-back  { color: var(--ink); z-index:10; }
.name-front { color:#fff; mix-blend-mode:difference; z-index:25; pointer-events:none; }
.portrait   { position:absolute; bottom:0; left:50%; transform:translateX(-35%);
              height:105%; width:auto; z-index:20; object-fit:contain; }
```

Over the light-grey background the white + `difference` result is dark (matches `--ink`); over the dark photo pixels it becomes light. That reproduces the "G" turning white.

> Alternative if blend mode misbehaves: render the front name in white and clip it with the portrait's alpha mask (`mask-image: url(portrait.png)`).

### Bottom-left socials
Vertical list, 12px, icon + label: **Linkedin, Twitter, Instagram**
Icons: `FaLinkedin` / `FiLinkedin`, `FaTwitter` / `FiTwitter`, `FaInstagram` / `FiInstagram` from `react-icons`. Row gap ≈ 10px.

### Bottom-right role
`// Web Designer` / `Art Director` — second line is aligned under "Web", not under "//". Use a hanging indent: `//` is a separate inline-block with fixed width.

---

## 5. Section 2 — Intro

**Background:** `--bg-dark`. Padding-block ≈ 10vw. Border-top line.

- Label: `// Intro` (red, top-left).
- Statement (white, 500, tracking -0.04em, max-width ≈ 85%):
  - First line is **indented** (`text-indent: 20%`) to create the stepped look.
  - Text: *"I'm a versatile* **designer who partners with founders to turn ideas into real products.** *I focus on clear interfaces, sharp decisions, and fast execution."*
  - Bold-looking part = `--accent` red (same weight, only colour changes).
- Small paragraph (≈ 50% from left, max-width 260px, `--muted`, 12px):
  *"Bringing your vision to life quickly and efficiently—whether it's branding, apps, or websites—I've got it covered, delivering smooth and effective solutions from start to finish."*
- Button: **"See my Work"** — pill, transparent, `1px solid var(--line)`, padding 10px 24px, 12px text, `--muted` colour. Hover: border → `--text`, fill slides in.

---

## 6. Section 3 — Services

**Background:** `--bg-dark`, border-top line, label `// Services` (red).

Two-column layout:

| Left (≈ 0–35%) | Right (starts ≈ 37%) |
|---|---|
| Big outlined **01** | Title, description, list |

- **Big number:** mono font, `color: transparent; -webkit-text-stroke: 1px var(--outline);` ≈ 24vw, slashed zero.
- **Title:** `Branding & Marketing` (white, 500).
- **Description:** *"Branding that builds trust and drives loyalty through clear visuals and messaging, into an unforgettable online experience."* (`--muted`, 12px, max-width 240px)
- **List** (full width of right column): each row = `border-top: 1px solid var(--line)`, height ≈ 52px, flex space-between, name (white, 12px, 500) on left and index `01`–`06` (mono, `--muted`) on right. Last row also has bottom border.

```ts
export const services = [
  {
    index: "01",
    title: "Branding & Marketing",
    desc: "Branding that builds trust and drives loyalty through clear visuals and messaging, into an unforgettable online experience.",
    items: [
      "Brand Strategy and Messaging",
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines & Frameworks",
      "Marketing materials",
      "Motion Design",
    ],
  },
  // 02 Web Design, 03 Product / UI-UX, 04 Art Direction … (add your own)
];
```

Bottom of page: extra empty dark space (≈ 12vh) after the list; the frame ends with the 1px border.

---

## 7. Folder Structure

```
app/
  layout.tsx
  page.tsx                 // or app/about/page.tsx
  globals.css
components/
  SmoothScroll.tsx         // Lenis + GSAP ticker
  about/
    Nav.tsx
    Hero.tsx
    Intro.tsx
    Services.tsx
    SectionLabel.tsx       // "// Label"
    MagneticButton.tsx
  three/
    PortraitPlane.tsx      // optional R3F hover distortion
data/services.ts
public/images/portrait.png
```

---

## 8. Animations

### 8.1 Lenis + GSAP (foundation)
Lenis must be driven by GSAP's ticker, otherwise ScrollTrigger desyncs (`autoRaf: false`).

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

Add to CSS: `.lenis.lenis-smooth { scroll-behavior: auto !important; }`
The provider is a client component (`"use client"`) wrapped around `children` in `layout.tsx`.
Use `lenis.stop()` / `lenis.start()` when a modal/drawer is open.

### 8.2 Hero (GSAP + `useGSAP`)
- On load: `SplitText` the name into chars → `yPercent: 100 → 0`, stagger 0.03, ease `power4.out`, duration 1.1, inside an overflow-hidden mask.
- Portrait: `opacity 0 → 1`, `scale 1.08 → 1`, duration 1.4.
- Role text + socials: fade/slide up, delay 0.6.
- Scroll: name moves slower than the page (`y: "-15%"`, scrub) → parallax; portrait `y: "8%"` scrub.
- Both name layers (back + front) must receive the **same** timeline so they stay aligned.

### 8.3 Intro
- `SplitText` by words; set words to `opacity: .15`, then scrub to `1` as the section scrolls (`start: "top 80%"`, `end: "bottom 50%"`, `scrub: true`). Red words animate the same way.
- Small paragraph + button: fade up once (`toggleActions: "play none none reverse"`).
- Button: magnetic hover (motion `useMotionValue` + `useSpring`) and a fill-from-bottom hover.

### 8.4 Services
- Big `01` stroke: animate `-webkit-text-stroke-color` / opacity on enter, or draw it with an SVG path using `anime.js` (`stroke-dashoffset`).
- If you have multiple services (01, 02, 03…): pin the left number with ScrollTrigger `pin: true` and swap the number/title/list as you scroll (counter roll from `01` → `02`).
- List rows: stagger in (`y: 20 → 0`, opacity, 0.08). Row border lines scale in from the left (`scaleX: 0 → 1`).
- Row hover (motion): name shifts `x: 8px`, index turns `--accent`.

### 8.5 Three.js (optional, only if you want extra polish)
- Render the portrait as a textured plane in R3F with a subtle mouse-follow displacement / RGB-shift shader on hover.
- Keep the DOM `<Image>` as fallback (and for SEO / reduced-motion / mobile) and lazy-load the canvas with `next/dynamic` (`ssr: false`).
- Warning: the overlapping text effect in 4 is easier with plain CSS; only use Three.js if you are OK with testing the blend order carefully.

### 8.6 Accessibility / performance
- Respect `prefers-reduced-motion`: disable Lenis and skip scrub animations.
- Use `useGSAP` (auto cleanup) in React / Next.js; call `ScrollTrigger.refresh()` after fonts/images load.
- Always `ScrollTrigger.kill()` on route change.
- Use `next/image` with `priority` for the portrait. Only animate `transform` and `opacity`.

---

## 9. Where to use MUI / HeroUI / Ant Design

Recommendation: **use none, or only HeroUI.**

| Library | Use it for | Avoid for |
|---|---|---|
| **HeroUI** (Tailwind-based, easiest to restyle) | Mobile menu `Drawer`/`Modal`, `Tooltip`, `Link`, a plain `Button` if you do not want a custom one | Headings, layout |
| **MUI** | `Drawer` / `IconButton` / `Tooltip` for the mobile nav | Everything visible in the design (its default Roboto + elevation style clashes) |
| **Ant Design** | Nothing in this page. Useful later for a contact form (`Form`, `Input`) or admin | Anything on this page; heavy bundle |

If you still want one UI lib for the **Contact page form**, pick one and theme it with the tokens from section 2 (dark bg, 1px borders, no shadows, radius 999px for buttons).

---

## 10. Responsive Behaviour

- **≥1024px:** as in the reference.
- **768–1023px:** name stays full-width (vw based), role text moves below the portrait, services columns stay 2-col but number shrinks to ~18vw.
- **<768px:** nav collapses to a menu button; name wraps to two lines ("Alex" / "Graham") at ~28vw; portrait centred behind; intro statement ~8vw with no indent; services stack (number on top, list full width); Lenis stays on, but reduce parallax.

---

## 11. Images Required

### Essential: **1 image**

**Hero portrait (`portrait.png` / `.webp`)**
- Black & white, high-contrast studio photo of a person in **side profile facing right**, head + shoulders (collar/jacket visible), cropped around chest.
- **Background removed (transparent PNG/WebP)** — this is mandatory for the text-behind-head effect.
- Size: at least **2000 px tall** (ideally 1600×2000), export WebP < 400 KB.
- Style: textured braids/hair, soft rim light, grain; dark clothing (so the white text inversion shows up).

Where to get it (free / licensed):
- Unsplash, Pexels, Pixabay — search: `black and white portrait side profile man`, `monochrome profile portrait studio`, `braids side profile portrait`.
- Remove background: remove.bg, Photoshop "Remove Background", Photopea, or Adobe Express.
- Convert to B&W + add contrast / film grain in Photoshop, Photopea or Lightroom.
- Always check the licence if it's a client / commercial project, and don't use a real person's photo as "Alex Graham" without permission (use your own photo or a licensed model).

### Optional (not in reference, nice to have)
- A subtle **noise/grain overlay** (PNG, 200×200 tile) for the dark sections.
- Favicon / OG image (1200×630) of the hero.

Everything else (icons, big "01", lines, button) is code — **no other images needed.**

---

## 12. Build Checklist

- [ ] Fonts loaded via `next/font` (Inter Tight + JetBrains Mono)
- [ ] CSS variables from section 2 in `globals.css`
- [ ] `SmoothScroll` wrapper in `layout.tsx`
- [ ] Hero with 2-layer name + portrait cutout + blend effect
- [ ] Red `// Label` component reused in every section
- [ ] Intro statement with indent + red highlight + word-scrub animation
- [ ] Services: outlined slashed-zero number, list rows with mono indices
- [ ] Hover + magnetic button, row hover
- [ ] Reduced-motion + responsive pass
- [ ] Lighthouse check (images, fonts, JS size)

---

## 13. References Used

- Lenis + GSAP ScrollTrigger in Next.js (ticker integration, `autoRaf: false`, `lagSmoothing(0)`, reduced motion): hontran.dev — "Smooth Scroll in Next.js with GSAP & Lenis"
- Lenis React skill (ReactLenis provider, `'use client'`, scroll jump fixes, `.lenis-smooth` CSS): skillsmp.com — Lenis React integration
- GSAP plugins (ScrollTrigger, SplitText, Flip) are now free, including commercial use; `useGSAP` from `@gsap/react`: ui-skills.com "gsap-web" and Codrops "From SplitText to MorphSVG"
