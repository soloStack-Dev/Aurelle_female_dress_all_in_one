# "Build Your Flow" Signup Page – Build Spec (from reference image)

Reference: `Growth_Mindset_Manager_Signup_Page_by_Alex_Pavlov.jpg` (single-screen, split-layout signup page inside a black rounded frame).
All colors and sizes are **estimated from a 736×552 screenshot**. Confirm with an eyedropper / DevTools overlay before final polish.

---

## 1. Overall concept

- A **single viewport screen** (no scrolling) with a centered black rounded "device" frame.
- Inside the frame: **left = photo panel**, **right = form panel** on a warm peach-to-gold gradient.
- The two panels are separated by a thin black seam. On the seam there is a **smooth concave notch with a pointed tip** that bites into the right panel, and a **3-dot carousel indicator** sits on it.
- Mood: warm, calm, premium, sunset tones. The photo's orange hair and golden light match the form gradient.

Proportions from the screenshot (frame ≈ 644 × 460, ratio ≈ 1.4:1):

| Part | Approx. size | Desktop @ 1280px frame |
|------|--------------|------------------------|
| Black frame | 644 × 460 | `max-w-[1280px]`, `aspect-[1.4]` or `h-[min(88vh,900px)]` |
| Frame padding | ~6px | 10–12px |
| Frame radius | ~22px | 36px |
| Left photo panel | 312 wide | ~49% |
| Seam gap | ~7px | 12–14px |
| Right form panel | 313 wide | ~49% |
| Panel radius | ~16px | 28px |

Page background outside the frame: very light cool grey `#E9ECF2`, with a soft shadow under the frame (`0 30px 60px rgba(20,30,60,.12)`).

---

## 2. Assets you need to get online

| # | Asset | Count | Where to get it | Notes |
|---|-------|-------|-----------------|-------|
| 1 | Portrait photos (warm / golden-hour, person looking at camera, shallow depth of field) | **3** (1 minimum) | Unsplash, Pexels (free licenses) | Search: `red hair freckles portrait golden hour`, `woman portrait sunset warm light`. 3 photos = the 3 carousel dots. Crop to portrait ~ 3:4 and export WebP ~1200×1600. |
| 2 | Brand/leaf icon in the bottom-left badge | 1 | `react-icons` (`LuLeaf`) | No download. |
| 3 | Social logos (Google, Apple, Telegram) | 3 | `react-icons` (`FcGoogle`, `FaApple`, `FaTelegramPlane`) | No download. |
| 4 | UI icons: mail, lock, eye / eye-off, arrow-right | 4 | `react-icons` (`LuMail`, `LuLock`, `LuEye`, `LuEyeOff`, `LuArrowRight`) | No download. |

**Total downloads: 3 photos** (or 1 if you skip the carousel).
Do **not** reuse the model photo from the Dribbble shot; it is someone else's work. Use photos with a license that allows commercial use. Pick photos whose dominant tone is orange/amber so they harmonize with the form gradient.

---

## 3. Tech stack for this page

| Tool | Role | Install |
|------|------|---------|
| **Next.js (App Router) + TypeScript** | Framework, `next/font`, `next/image` | `npx create-next-app@latest` |
| **Tailwind CSS v4** | Layout and tokens | included |
| **HeroUI** (optional) | `Input`, `Button` with custom styling | follow heroui.com docs (check whether v3 is recommended at install time) |
| **GSAP + `@gsap/react`** | Page intro timeline, text/stagger reveals | `npm i gsap @gsap/react` |
| **Motion** (`motion/react`) | Carousel cross-fade, indicator pill morph, button hover/tap, error shake | `npm i motion` |
| **react-icons** | All icons | `npm i react-icons` |
| **react-hook-form + zod** | Validation (email, password rules) | `npm i react-hook-form zod @hookform/resolvers` |
| **three.js / @react-three/fiber** (optional) | Animated shader/mesh-gradient background for the right panel | `npm i three @react-three/fiber` |
| **Lenis** | **Not needed.** The page is one non-scrolling screen. Add it only if you later turn this into a long page. | – |
| **anime.js** | Optional duplicate of GSAP/Motion. Skip. | – |
| **Material UI / Ant Design** | **Skip.** Their default look fights this custom design, and the page needs only 2 input fields and some buttons. | – |

Recommended combo: **Tailwind + (HeroUI or plain components) + Motion + GSAP + react-icons**.

---

## 4. Folder structure

```
app/
  layout.tsx
  page.tsx                  # centers <AuthFrame/>
  globals.css               # tokens + gradient
components/auth/
  AuthFrame.tsx             # black frame, two panels, seam
  PhotoPanel.tsx            # carousel + badge
  PhotoIndicator.tsx        # 3-dot pill indicator
  SeamNotch.tsx             # SVG concave notch
  SignupForm.tsx
  PasswordField.tsx
  SocialButtons.tsx
data/slides.ts              # 3 photos + alt text
public/photos/              # slide-1.webp … slide-3.webp
```

---

## 5. Design tokens

### Colors (estimated)

| Token | Hex / value | Used for |
|-------|-------------|----------|
| `--color-frame` | `#0E0E0E` | Outer frame, seam, notch, Sign Up button |
| `--color-page` | `#E9ECF2` | Page background |
| `--color-ink` | `#111111` | Heading, "Log In", button text on light |
| `--color-muted` | `#7A6A5E` | Sub-text, placeholders, "Already have an account?", legal text |
| `--color-field` | `rgba(255,255,255,0.28)` | Input and social button background |
| `--color-field-border` | `rgba(255,255,255,0.55)` | Input and social button 1px border |
| `--color-divider` | `rgba(120,90,60,0.25)` | Lines beside "or continue with" |
| `--color-glass` | `rgba(0,0,0,0.45)` + `backdrop-blur(10px)` | Bottom-left photo badge |
| Dot inactive | `#6B6B6B` | Carousel dots on black |
| Dot active | `#FFFFFF` | Elongated active pill |

### Right panel gradient (layered radial gradients, top-left → bottom-right)

Approx. color zones from the image:
- top-left: dusty beige `#E3CDB4`
- top-right: orange `#EFA56F`
- center / lower-middle: golden yellow `#FAD38F`
- bottom-left: peach `#F4B67E`
- bottom-right: greyish sand `#D8C8B6`

```css
.auth-gradient {
  background:
    radial-gradient(60% 50% at 100% 0%,   #efa56f 0%, transparent 70%),
    radial-gradient(55% 45% at 0% 0%,     #e3cdb4 0%, transparent 70%),
    radial-gradient(70% 60% at 50% 70%,   #fad38f 0%, transparent 75%),
    radial-gradient(50% 45% at 100% 100%, #d8c8b6 0%, transparent 70%),
    #f4b67e;
}
```

### Typography (best visual guess; verify with WhatFont)

The heading is a clean geometric sans with slightly tight tracking, similar to **Onest**, **Manrope** or **Outfit**. Pick one from Google Fonts via `next/font` and use it for everything.

| Use | Weight | Size (desktop) |
|-----|--------|----------------|
| "Build Your Flow" (H1) | 500 | 56–64px, tracking `-0.03em`, line-height 1.05 |
| Sub text | 400 | 16px, `--color-muted`, 2 lines, max-w ~300px |
| Input text / placeholder | 400 | 14px |
| Button "Sign Up" | 500 | 15px |
| "or continue with", legal text, "Already have an account?" | 400 | 12–13px |
| "Log In", "Terms of Service", "Privacy Policy" | 500–600 | same size, dark `--color-ink` |
| Photo badge | 400 | 12px, 2 lines |

### Shapes
- Inputs: height 52px, radius 12px, 1px border `--color-field-border`, icon 18px at left, padding-left 44px.
- Primary button: full width, height 52px, radius 12px, black; label centered; arrow icon pinned at the right end (16px from the edge).
- Social buttons: 3 equal columns, gap 12px, height 52px, radius 12px, icon 16px + label 13px.
- Vertical rhythm in the form: logo-free, content block vertically centered; gap H1 → sub 14px, sub → fields 32px, field → field 14px, field → button 18px, button → divider 36px, divider → socials 24px, socials → legal 40px.

---

## 6. Layout structure (top to bottom, right panel)

1. **Top-right text:** "Already have an account? **Log In**" (right aligned, 12–13px, ~28px from top/right edge).
2. **Heading:** `Build Your Flow`.
3. **Sub text:** "Create your account and get started with a clear mind".
4. **Email field:** mail icon at left, placeholder `Email Address`.
5. **Password field:** lock icon at left, placeholder `Password`, eye-off toggle at right.
6. **Primary button:** `Sign Up` + arrow-right icon (black).
7. **Divider:** line – `or continue with` – line.
8. **Social row:** `Google`, `Apple`, `Telegram` (each with its logo, Telegram icon in light blue).
9. **Legal text (centered, 2 lines):** "By signing up, you agree to our **Terms of Service** and **Privacy Policy**".

Left panel:
- Full-bleed photo (`object-cover`, face in upper-middle; keep faces away from the bottom-left badge).
- **Badge** at bottom-left (16px inset): glass dark pill/rounded box, leaf icon in a thin-outlined circle, text "Stay focused. / Grow every day."

Seam:
- Black strip between panels.
- A **concave notch** pokes out from the seam into the right panel around **60% down** the height and ends in a soft pointed tip. In the screenshot it starts curving in at about y = 270, tip at y ≈ 334, and flattens back at y ≈ 400 (of the 552 image height).
- The **carousel indicator** (1 white elongated pill + 2 small grey dots) is centered on the seam at the tip's height.

---

## 7. Key components (starter code)

### 7.1 AuthFrame

```tsx
export default function AuthFrame() {
  return (
    <main className="grid min-h-dvh place-items-center bg-page p-4 md:p-8">
      <section className="relative flex h-[min(88vh,900px)] w-full max-w-[1280px] gap-3 rounded-[36px] bg-frame p-3 shadow-[0_30px_60px_rgba(20,30,60,.12)]">
        <PhotoPanel className="hidden w-1/2 lg:block" />
        <div className="auth-gradient relative w-full overflow-hidden rounded-[28px] lg:w-1/2">
          <SignupForm />
        </div>
        <SeamNotch /> {/* absolutely positioned at the center seam */}
      </section>
    </main>
  );
}
```

### 7.2 SeamNotch (concave notch + indicator)

The notch is a black SVG shape that overlaps the left edge of the right panel. Tune the control points by eye against the screenshot.

```tsx
export function SeamNotch({ active, total, onSelect }: Props) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[60%] hidden -translate-x-[7px] -translate-y-1/2 lg:block">
      <svg width="120" height="180" viewBox="0 0 120 180" className="fill-frame" aria-hidden>
        {/* seam at x=0, tip at x=116,y=90 */}
        <path d="M0 0 C0 44 34 62 66 72 C94 80 118 82 118 90 C118 98 94 100 66 108 C34 118 0 136 0 180 Z" />
      </svg>
      <PhotoIndicator active={active} total={total} onSelect={onSelect}
        className="pointer-events-auto absolute left-[-18px] top-1/2 -translate-y-1/2" />
    </div>
  );
}
```

Alternative if you want the right panel itself to be cut: apply a `mask-image` (SVG) to the right panel with the same curve, so the black frame shows through.

### 7.3 PhotoIndicator (pill morph with Motion)

```tsx
"use client";
import { motion } from "motion/react";

export function PhotoIndicator({ active, total, onSelect, className }: Props) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} role="tablist" aria-label="Photo slides">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Slide ${i + 1}`}
          onClick={() => onSelect(i)}
          animate={{ width: i === active ? 18 : 6, backgroundColor: i === active ? "#fff" : "#6b6b6b" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  );
}
```

### 7.4 PhotoPanel (cross-fade carousel, autoplay)

```tsx
"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { LuLeaf } from "react-icons/lu";

export default function PhotoPanel({ slides, active, className }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div key={active} className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <Image src={slides[active].src} alt={slides[active].alt} fill priority sizes="50vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-black/45 px-3.5 py-3 text-xs leading-snug text-white backdrop-blur-md">
        <span className="grid size-8 place-items-center rounded-full border border-white/40"><LuLeaf /></span>
        <p>Stay focused.<br />Grow every day.</p>
      </div>
    </div>
  );
}
```

Autoplay: `setInterval` every 5s in the parent (`useEffect`), pause on hover or when the tab is hidden; clicking a dot resets the timer.

### 7.5 PasswordField

```tsx
"use client";
import { useState } from "react";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";

export function PasswordField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <label className="relative block">
      <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input {...props} type={show ? "text" : "password"} placeholder="Password"
        className="h-[52px] w-full rounded-xl border border-white/55 bg-white/30 pl-11 pr-11 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-black/20" />
      <button type="button" onClick={() => setShow(s => !s)} aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
        {show ? <LuEye /> : <LuEyeOff />}
      </button>
    </label>
  );
}
```

### 7.6 Primary button

```tsx
<motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
  className="group relative flex h-[52px] w-full items-center justify-center rounded-xl bg-frame text-[15px] font-medium text-white">
  Sign Up
  <LuArrowRight className="absolute right-4 transition-transform group-hover:translate-x-1" />
</motion.button>
```

---

## 8. Form behavior

- Validation with zod: email format, password min 8 characters (show rules only after first blur or submit).
- States: default, focus (2px dark ring at 20% opacity), error (border `#D9534F`, small message under the field, field shakes via Motion `x: [0,-6,6,-4,4,0]`), loading (button text replaced by a small spinner), success (button turns lime/green check briefly, then redirect).
- Social buttons: placeholder handlers for OAuth (Google, Apple, Telegram). Telegram login typically uses its own widget/bot flow, so plan it separately.
- "Log In" link goes to `/login`. Terms and Privacy open in new tabs.
- Keyboard: tab order email → password → toggle → Sign Up → social buttons; Enter submits.

---

## 9. Animation plan

Register once: `gsap.registerPlugin(useGSAP)` (and `SplitText` if you want the heading split).

| Moment | Library | Effect |
|--------|---------|--------|
| Page load | GSAP timeline | Frame: `scale .96 → 1`, `opacity 0 → 1` (0.7s, `power3.out`) |
| Panels | GSAP | Photo panel clips in from the left (`clipPath: inset(0 100% 0 0) → inset(0)`), form panel fades up |
| Heading | GSAP `SplitText` (words) | `y: 30 → 0`, `opacity 0 → 1`, stagger 0.06 |
| Form items | GSAP | Sub text, inputs, button, divider, socials: stagger 0.07, `y: 16 → 0` |
| Seam notch | GSAP | Notch slides from the seam into position (`x: -40 → 0`) after panels appear; indicator fades in |
| Photo carousel | Motion | Cross-fade + slight zoom out (7.4); indicator pill morphs (7.3) |
| Gradient background | CSS (or three.js optional) | Slowly move `background-position` / blob positions over 20s, infinite alternate |
| Hover/tap | Motion | Buttons scale, arrow nudges right, social buttons lift 2px |
| Mouse parallax (optional) | Motion `useMotionValue` | Photo shifts ±8px opposite to the cursor |

Respect `prefers-reduced-motion`: use `gsap.matchMedia()` to skip the intro and stop autoplay.

### Optional: animated gradient with three.js
Replace the CSS gradient on the right panel with a fragment-shader "mesh gradient" (4 color uniforms = the 5 zones in section 5 and a slow noise-driven warp). Render it in a `Canvas` positioned behind the form (`absolute inset-0 -z-10`), loaded with `next/dynamic` and `ssr: false`. Keep a CSS gradient fallback for low-power devices. Only do this after the static page matches the screenshot.

---

## 10. Responsive behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Full split layout with notch and indicator. |
| 768–1023px | Same split but narrower; reduce H1 to 44px; hide the notch tip and keep a straight seam with the indicator centered. |
| <768px | Hide the side photo. Show the photo as a short rounded **banner (~28vh)** on top of the form panel with the badge inside it; indicator dots below the banner; the frame becomes full-width with 8px padding and 24px radius. |

Use `min-h-dvh` (not `100vh`) so mobile browser bars do not cut the form.

---

## 11. Accessibility

- Every input has a visible or `sr-only` label; placeholders are not the only label.
- Contrast: `--color-muted` on the gradient can be low. Test and darken to about `#5E4F44` if it fails 4.5:1.
- Carousel is decorative: photos have meaningful `alt` text, dots are real buttons with `aria-label`, autoplay pauses on focus/hover.
- Password toggle announces state via `aria-label`.
- Focus rings must remain visible on the gradient and on the black button (white ring).

---

## 12. Build order (checklist)

1. Create project, add the font, tokens, and gradient to `globals.css`.
2. Build the static frame: black container, two panels, seam gap.
3. Place the form content with exact spacing (use the screenshot as a 50% opacity overlay at the same width).
4. Add the SVG notch and indicator; match the curve and tip position.
5. Add the photo panel and glass badge.
6. Wire the carousel (3 photos, autoplay, dots).
7. Add validation and form states.
8. Add the GSAP intro timeline, then Motion hover/tap effects.
9. Responsive pass (banner layout on mobile).
10. Accessibility + Lighthouse pass. Optional: three.js gradient, parallax.

---

## 13. Quick facts to match the screenshot

- The frame is **black**, the page behind it is **cool light grey**; that contrast makes the warm panels pop.
- The form panel gradient is **not flat**: beige top-left, orange top-right, golden middle, greyish sand bottom-right.
- Only the **Sign Up** button is solid black; inputs and social buttons are **translucent white with a thin light border**.
- Eye icon in the password field is the **crossed-out** version by default.
- The indicator is a **long white pill + two short grey dots**, sitting on the black seam, not inside the photo.
- Photo badge text is exactly two lines: "Stay focused." / "Grow every day."
