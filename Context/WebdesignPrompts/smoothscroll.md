# TASK: Build an Immersive Scroll-Driven 3D Fashion Landing Page

## 1. Your Role

Act as a senior frontend engineer, Three.js developer, creative developer, motion designer, and UI/UX designer.

Build a premium, modern women's fashion e-commerce landing page featuring cinematic scroll-driven animations, an image-based fashion hero, interactive 3D objects, smooth scrolling, and responsive layouts.

Do not create a generic ecommerce template. The result should feel like an award-winning fashion campaign website with refined art direction and fluid interactions.

## 2. Reference Image

Use the user-provided transparent PNG containing three adult fashion models wearing contemporary summer outfits.

Important requirements:
- Use the supplied image as the primary fashion subject.
- Preserve the original image and its transparency.
- Do not recreate, replace, or regenerate the models.
- Do not stretch or distort the image.
- Preserve the natural proportions and the visible clothing details.
- Use `object-fit: contain` when displaying the transparent image.
- Position the image based on its actual visible content, not just its full transparent canvas.
- Add subtle depth through layered HTML/CSS and Three.js elements.

Before implementation, inspect the image dimensions, transparency, visible content boundaries, and available negative space.

If the image is stored in the project's public directory, use its existing path. Otherwise, ask for the image to be placed in the appropriate public asset directory.

Suggested asset location:
`public/images/hero/fashion-models.png`

## 3. Technical Stack

Use the project's existing compatible dependencies where possible.

- Next.js App Router
- React
- TypeScript
- Three.js
- @react-three/fiber
- @react-three/drei
- Lenis for smooth scrolling
- Anime.js for selected DOM and SVG animations
- Tailwind CSS or the project's existing styling system
- React icons or the existing icon library, if required

Do not introduce additional animation libraries without a clear technical reason.

Before installing packages:
1. Inspect `package.json`.
2. Identify the React and Next.js versions.
3. Check the compatible React Three Fiber major version.
4. Inspect existing components and styling conventions.
5. Reuse existing utilities wherever possible.
6. Avoid unnecessary dependency duplication.

Use current stable, compatible APIs rather than copying outdated examples.

## 4. Visual Direction

Create a premium editorial fashion experience with:

- Warm off-white backgrounds.
- Deep charcoal typography.
- Orange and coral campaign gradients.
- Restrained burgundy accents.
- Large, bold editorial headlines.
- Generous whitespace.
- Rounded campaign frames.
- Minimal floating information cards.
- High-quality fashion imagery.
- Abstract 3D shapes and subtle atmospheric lighting.

Keep the composition clean and sophisticated.

The models must remain the primary visual focus. Three-dimensional elements should enhance the image rather than obscure it.

## 5. Hero Section Composition

Build a large, visually striking hero section.

### Desktop layout

- A compact header with a fashion brand wordmark.
- Navigation links: New In, Swimwear, Dresses, Beachwear, Editorial.
- Search, wishlist, and shopping bag actions.
- Large headline on the left.
- Transparent fashion-model image on the center/right.
- Abstract 3D elements behind and around the image.
- Two CTA buttons.
- Small floating editorial cards.
- A subtle scroll indicator.

Suggested headline:

"OWN YOUR
SUMMER."

Supporting text:

"Discover confident silhouettes, expressive styles, and statement pieces for every moment."

Primary CTA: "Explore Collection"

Secondary CTA: "Discover the Edit"

The headline and text must remain readable at all screen sizes.

### Image positioning

Create a dedicated image wrapper.

Use responsive positioning rather than fixed pixel coordinates for every viewport.

The image should:
- Enter with a subtle upward reveal.
- Scale in slightly without distorting.
- Have a gentle horizontal parallax effect on desktop.
- Respond subtly to scroll progress.
- Maintain a stable composition on mobile.
- Avoid covering the headline or CTA.

Do not animate the image with excessive rotation or aggressive scaling.

## 6. Main Scroll-Driven Animation Sequence

Create a coordinated scroll experience in which the fashion image and surrounding environment evolve as the user moves through the page.

Use a long, carefully structured hero section with a scroll-progress timeline.

### Scene 1 — Campaign entrance

At the initial viewport:

- Display the hero background.
- Fade in the brand wordmark.
- Reveal the headline in staggered lines.
- Reveal the supporting text and buttons.
- Bring the fashion image into view using a smooth clip-path or opacity-and-translation reveal.
- Fade in the abstract 3D environment.
- Introduce small floating cards with subtle movement.

The animation must feel smooth and intentional.

### Scene 2 — Image depth

As scrolling begins:

- Gradually move the fashion image upward.
- Apply a small scale transformation.
- Shift selected background shapes at different speeds.
- Introduce depth between the image, background, and foreground elements.
- Animate decorative rings or geometric objects around the subject.
- Keep the headline readable until its intended exit.

Use layered parallax rather than moving every element at the same speed.

### Scene 3 — Cinematic transition

As the user continues scrolling:

- Allow the hero image to move toward the center of the composition.
- Transition the background gradient into a new color state.
- Move abstract 3D objects along controlled paths.
- Reveal a short editorial statement.
- Gradually transition from the hero campaign to the collection section.

The transition should feel like one continuous art-directed experience.

Avoid abrupt jumps, flashing backgrounds, or disorienting camera movements.

### Scene 4 — Collection reveal

As the hero ends:

- Introduce the collection heading.
- Reveal fashion category cards using a staggered entrance.
- Apply subtle image scale effects on hover.
- Animate arrows and small interface details.
- Transition to normal document flow for the rest of the page.

Do not keep the entire website trapped inside one oversized pinned animation.

## 7. Three.js and React Three Fiber Implementation

Use Three.js through React Three Fiber.

Use Drei helpers where they simplify implementation.

Create a dedicated component such as:

`HeroScene.tsx`

The scene may contain:
- Abstract translucent geometric forms.
- Floating rings.
- Softly illuminated spheres.
- Small decorative particles.
- Gradient-like atmospheric elements.
- Subtle depth layers.
- Optional fabric-inspired ribbon geometry.

Use restrained lighting and materials.

The 3D scene should complement the fashion photography.

### Animation behavior

Use React Three Fiber's `useFrame` for continuous frame-based animation where appropriate.

Use references to update Three.js object properties without triggering unnecessary React renders.

Connect scroll progress to selected 3D transforms, including:
- Position.
- Rotation.
- Scale.
- Camera movement.
- Object visibility.

Keep scroll progress in a suitable shared animation state or ref.

Avoid updating React state on every animation frame.

### Important constraint

The supplied PNG is a flat image, not a 3D human model.

Do not pretend the image contains real 3D geometry.

Create depth through:
- Transparent image layers.
- Controlled parallax.
- 3D objects behind the subject.
- Foreground decorative elements.
- Carefully composed lighting and shadows.

If a true 3D fashion model is later required, request a suitable licensed 3D asset separately.

## 8. Lenis Smooth Scrolling

Integrate Lenis using its current official setup.

Requirements:
- Smooth, natural scrolling.
- Compatible behavior with the existing Next.js App Router.
- Proper lifecycle cleanup.
- No duplicate animation loops.
- No conflicting scroll handlers.
- Normal browser navigation and anchor links must remain functional.

Use the current recommended integration pattern for Lenis.

If a manual animation frame loop is required, ensure only one appropriate loop controls the Lenis instance.

Do not add a second smooth-scroll implementation.

The page must remain usable if smooth scrolling is disabled.

## 9. Anime.js Animation Responsibilities

Use Anime.js for selected animation details, such as:

- SVG line drawing.
- Decorative icon movement.
- Small floating-card entrances.
- Staggered text reveals where suitable.
- Decorative shape transformations.
- Short timeline-based visual sequences.

Use the current Anime.js API.

Keep Anime.js animations separate from Three.js frame updates.

Do not allow Anime.js, CSS transitions, and another animation engine to compete for the same transform properties.

For complex scroll-linked movement, use a single clearly defined source of scroll progress and coordinate the relevant animation system around it.

If an effect is already handled well by CSS or the existing animation setup, do not duplicate it with Anime.js.

## 10. Scroll Progress Architecture

Implement a reusable scroll-progress system.

Conceptually:

`scroll progress → animation state → DOM transforms + 3D transforms`

The system should:
- Calculate progress for the relevant section.
- Map progress into controlled animation ranges.
- Avoid excessive event listeners.
- Avoid repeated layout measurements.
- Use `requestAnimationFrame` or the animation library's appropriate update mechanism.
- Clean up listeners on unmount.
- Support responsive layout changes.
- Handle page resizing.
- Avoid hydration errors.

Do not assume every section needs a pinned scroll timeline.

Use pinning only for the main cinematic hero if the effect genuinely benefits from it.

## 11. Landing Page Sections

After the hero, create the following sections:

### Section A — Featured Collections
Image-led cards:
- Swimwear.
- Bikinis.
- Dresses.
- Beachwear.
- Nightwear.
- Partywear.

Use subtle reveal animations and consistent image ratios.

### Section B — Editorial Story
A large image-and-text composition.

Headline: "A little more you."

Use elegant typography, spacious layout, and subtle scroll-triggered movement.

### Section C — Featured Products
Include product cards with:
- Product image.
- Product name.
- Price.
- Available variants where applicable.
- Wishlist action.
- Product detail link.

Use clearly labelled demo data until real product data is available.

### Section D — Fashion Campaign
Build an editorial campaign area with layered images and restrained parallax.

### Section E — Footer
Include navigation, customer-support links, social links, and the brand wordmark.

Keep all sections responsive and functional.

## 12. Responsive Design

### Desktop

- Full cinematic composition.
- Large image and headline.
- Layered 3D objects.
- Subtle pointer-based parallax.

### Tablet

- Reduce the number of decorative objects.
- Adjust image position and headline scale.
- Simplify scroll transitions.
- Prevent overlapping content.

### Mobile

- Use a mobile-specific image crop or composition when necessary.
- Stack the headline and CTA when appropriate.
- Reduce or disable heavy 3D effects.
- Avoid long pinned scroll sections.
- Disable pointer-only interactions.
- Prefer lightweight CSS transitions when they provide a better experience.
- Maintain readable text and touch-friendly controls.

The design must not depend on hover interactions to expose essential information.

## 13. Accessibility and Reduced Motion

Respect `prefers-reduced-motion`.

When reduced motion is enabled:
- Disable unnecessary parallax.
- Avoid pinned cinematic sequences.
- Replace complex reveals with simple transitions.
- Stop nonessential continuous animation.
- Keep the image, text, and CTAs immediately accessible.

Ensure sufficient contrast, semantic headings, keyboard navigation, visible focus states, and meaningful image alt text.

## 14. Performance Requirements

- Optimize the PNG and use a suitable modern image format where transparency is preserved.
- Preserve the original asset.
- Use Next.js image optimization where appropriate.
- Lazy-load below-the-fold images.
- Avoid loading large 3D assets before they are needed.
- Limit unnecessary transparent layers.
- Cap device pixel ratio appropriately.
- Avoid excessive post-processing.
- Clean up animation instances and event listeners.
- Test WebGL fallback behavior.
- Avoid layout shifts during image loading.
- Test on mobile devices and integrated-GPU laptops.

The first screen should become readable and interactive without waiting for every 3D effect to initialize.

## 15. Suggested Component Structure

Organize the implementation into reusable components:

- `SiteHeader.tsx`
- `HeroSection.tsx`
- `HeroFashionImage.tsx`
- `HeroScene.tsx`
- `HeroScrollController.tsx`
- `FloatingCampaignCard.tsx`
- `CollectionGrid.tsx`
- `EditorialSection.tsx`
- `FeaturedProducts.tsx`
- `CampaignSection.tsx`
- `SiteFooter.tsx`
- `LenisProvider.tsx`

Adjust this structure to fit the existing project rather than creating unnecessary files.

Keep browser-dependent animation code inside appropriate Client Components.

Do not turn the entire page into a Client Component unless genuinely necessary.

## 16. Implementation Process

Before coding:

1. Inspect the current repository.
2. Identify the existing landing-page component and styling system.
3. Locate the supplied transparent image.
4. Inspect package versions.
5. Identify conflicting animation implementations.
6. Plan the hero image positioning and scroll sequence.

Then implement in this order:

1. Establish the static responsive layout.
2. Integrate the supplied image.
3. Implement the hero composition.
4. Add Lenis smooth scrolling.
5. Implement the scroll-progress architecture.
6. Add the Three.js scene.
7. Add selected Anime.js timelines.
8. Add collection and editorial sections.
9. Optimize responsive behavior.
10. Test accessibility and performance.

After each major step, verify that the existing application still runs.

Do not replace the entire application or delete unrelated code.

## 17. Acceptance Criteria

The implementation is complete only when:

- The supplied transparent image is used correctly.
- The hero composition matches the intended premium editorial direction.
- Scroll progress visibly drives the intended image and 3D movements.
- The transition between the hero and collection sections feels coherent.
- Lenis works without conflicting scroll systems.
- Three.js objects animate smoothly.
- Anime.js is used only where it provides a distinct benefit.
- Mobile layouts remain readable and usable.
- Reduced-motion behavior works.
- There are no major console errors, hydration errors, or animation lifecycle leaks.
- The page remains functional when WebGL is unavailable.
- Existing project functionality is preserved.

First inspect the repository and report the implementation plan briefly. Then proceed with the implementation using the existing project conventions.