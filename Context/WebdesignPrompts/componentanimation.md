# ROLE

Act as a Senior Frontend Developer, UI/UX Designer, Motion Designer, and Creative Web Experience Engineer.

Your task is to develop a premium, modern, responsive, multi-page women's fashion website using the existing project structure, reusable UI components, modern design systems, and sophisticated scroll-based animations.

The website should feel like a premium fashion brand with editorial photography, immersive storytelling, smooth transitions, elegant typography, interactive components, and carefully designed responsive layouts.

# 1. REFERENCE DOCUMENTATION

Study these official documentation websites before implementing the project:

1. shadcn/ui — https://ui.shadcn.com/
2. HeroUI — https://heroui.com/
3. GSAP — https://gsap.com/
4. Ant Design — https://ant.design/
5. Material UI — https://mui.com/material-ui/

Use these websites as technical references for component selection, installation, API usage, styling, accessibility, and animation integration.

Do not blindly copy the reference websites' layouts. Build an original fashion-brand experience using their component capabilities.

# 2. FIRST — INSPECT THE EXISTING PROJECT

Before writing or modifying code:

- Inspect the existing project structure and package.json.
- Identify the framework, React version, TypeScript configuration, routing system, styling system, and installed dependencies.
- Check whether shadcn/ui, HeroUI, Ant Design, Material UI, and GSAP are already installed.
- Identify existing pages, shared layouts, components, assets, and animations.
- Preserve existing functionality and reusable components.
- Avoid replacing the existing architecture unnecessarily.
- Check compatibility between the installed React version and every UI library.
- Use the package manager already configured in the project.

If a required dependency is missing, install only the compatible packages.

Do not begin implementation until the existing project structure has been understood.

# 3. TECHNOLOGY STACK

Use the following technologies where compatible with the existing project:

- Next.js and React
- TypeScript
- Tailwind CSS
- shadcn/ui
- HeroUI
- Ant Design
- Material UI
- GSAP
- GSAP ScrollTrigger
- React Icons or the project's existing icon library

Use the existing routing system. If the project uses Next.js App Router, implement the pages using the App Router architecture.

Use reusable components and clean, maintainable TypeScript.

# 4. UI LIBRARY STRATEGY

Use all four UI libraries selectively instead of combining them indiscriminately.

## A. shadcn/ui — Primary UI Foundation

Use shadcn/ui for reusable interface elements such as:

- Buttons
- Navigation menus
- Dropdown menus
- Dialogs
- Sheet components
- Accordions
- Tabs
- Tooltips
- Form controls
- Input fields
- Select components
- Cards
- Skeleton loaders
- Toast notifications

Use Tailwind CSS to maintain a consistent visual language across the website.

## B. HeroUI — Interactive and Visually Refined Components

Use HeroUI selectively for components such as:

- Interactive cards
- Modern buttons
- Navigation elements
- Tabs
- User-friendly form components
- Modal dialogs
- Image cards
- Loading indicators
- Badges and chips

Choose components that improve the fashion website's visual quality and usability.

## C. Ant Design — Functional Interface Components

Use Ant Design where its functionality is particularly useful:

- Form validation
- Date selection
- Select dropdowns
- Notifications
- Progress indicators
- Steps
- Advanced form controls
- Feedback components

Avoid displaying enterprise-style dashboards or overly technical components on the public-facing fashion pages.

## D. Material UI — Structured Layout and Advanced Interface Elements

Use Material UI selectively for:

- Responsive layout components
- Breadcrumbs
- Rating components
- Accordions
- Tooltips
- Form controls
- Dialogs
- Progress indicators
- Selected navigation components

Do not introduce Material UI components when an existing component already solves the problem cleanly.

## Library Integration Rules

- Do not create multiple competing versions of the same component without a clear reason.
- Avoid mixing different button, input, card, or modal styles in the same section.
- Define shared design tokens for colors, typography, spacing, borders, radii, and shadows.
- Standardize focus states, hover states, disabled states, and error states.
- Keep typography and component sizing consistent across every page.
- Use CSS scoping where required to prevent Ant Design or Material UI styles from conflicting with Tailwind.
- Avoid unnecessary duplicate dependencies.
- Verify that all selected components work correctly with the installed framework and React version.

The final website must look like one professionally designed product, not four different UI libraries combined together.

# 5. GLOBAL WEBSITE DESIGN

Create a premium women's fashion e-commerce and editorial website.

## Visual Direction

Use a sophisticated combination of:

- Premium fashion editorial design
- Large campaign photography
- Bold oversized headlines
- Clean whitespace
- Elegant typography
- Refined product cards
- Smooth image transitions
- Subtle motion effects
- Asymmetrical editorial layouts
- Rounded image containers where appropriate
- Layered visual elements
- Carefully positioned floating information cards
- High-quality responsive navigation

Use an elegant color palette such as:

- Warm off-white
- Soft cream
- Deep charcoal
- Black
- Muted beige
- Brand-specific accent colors

Use an orange or warm-toned campaign accent only where it supports the existing visual references.

Avoid excessive gradients, random colors, unnecessary glassmorphism, and generic template styling.

The website should feel visually distinctive, premium, and fashion-focused.

# 6. REQUIRED PAGES

Implement all four pages with a consistent global design system.

## PAGE 1 — LANDING PAGE

Create a visually impressive landing page containing the following sections.

### Section 1: Global Navigation

Include:

- Fashion brand logo
- Home
- About
- Collections or Products
- Pricing or Membership
- Contact
- Search
- Account icon if relevant
- Shopping bag icon if relevant
- Responsive mobile navigation

Interactions:

- Transparent or minimal navigation over the hero where appropriate.
- Smooth background transition when scrolling.
- Active navigation states.
- Accessible mobile navigation drawer.
- Subtle hover animations.
- Smooth navigation between pages.

### Section 2: Hero Campaign

Create a full-width, editorial-style fashion hero.

Include:

- Large campaign headline, such as "OWN YOUR SUMMER."
- Short supporting text.
- Primary CTA: "Explore Collection"
- Secondary CTA: "Discover Our Story"
- High-quality fashion photography.
- Layered visual composition.
- Optional floating campaign cards.
- Small campaign labels or collection information.

If the previously supplied transparent fashion-model image exists in the project assets, inspect and reuse it where appropriate.

Preserve its aspect ratio, avoid stretching, and position it according to its actual transparent image bounds.

Animation requirements:

- Headline entrance animation.
- Supporting text reveal.
- Staggered CTA entrance.
- Smooth image reveal.
- Subtle image scale or parallax.
- Floating-card entrance.
- Scroll-linked hero transformation.
- Controlled transition into the next section.

### Section 3: Featured Collections

Create a premium collection grid with categories such as:

- Swimwear
- Beachwear
- Resort Wear
- Lingerie and Nightwear
- Partywear
- Summer Essentials

Use large images, elegant labels, and clear navigation.

Animations:

- Staggered card entrance.
- Image reveal on scroll.
- Subtle image zoom on hover.
- Text overlay transitions.
- Optional alternating image movement.

### Section 4: Brand Introduction

Create an editorial brand-story section containing:

- Large typography.
- Brand introduction.
- Fashion photography.
- A short statement about style, confidence, quality, or craftsmanship.
- A CTA linking to the About page.

Animations:

- Text reveal.
- Image entrance.
- Staggered content.
- Subtle scroll-linked movement.

### Section 5: Featured Products

Include:

- Product image
- Product name
- Price
- Optional original price
- Available color or size information
- Product badges
- Wishlist button where appropriate
- Quick-view interaction where appropriate
- Add-to-cart button if commerce functionality exists

Use consistent product cards and avoid adding fake backend functionality.

If product data or commerce functionality is unavailable, use clearly defined sample data and keep the components ready for integration.

### Section 6: Campaign Banner

Create a large editorial campaign section with:

- Full-width image
- Large headline
- Short description
- CTA
- Layered visual composition

Use a refined image reveal and a subtle scroll-linked effect.

### Section 7: Customer Benefits or Brand Features

Include appropriate benefits such as:

- Premium materials
- Thoughtful design
- Secure checkout, if supported
- Shipping information, if verified
- Customer support

Use compact icons and carefully spaced content.

### Section 8: Newsletter

Include:

- Short heading
- Supporting text
- Email input
- Subscribe button
- Validation and success/error feedback

Connect to an existing backend if available. Otherwise, create a clean integration point and clearly identify what remains unconnected.

### Section 9: Footer

Include:

- Brand logo or wordmark
- Navigation links
- Customer support links
- Social media links
- Newsletter access
- Copyright information
- Legal and privacy links

Use large editorial typography where appropriate.

Add a subtle footer reveal and a refined hover interaction for links.

# 7. PAGE 2 — ABOUT PAGE

Create a premium brand-story experience.

### Section 1: About Hero

Include:

- Large headline such as "MORE THAN A STYLE."
- Supporting statement
- Editorial fashion image
- Small brand label

Animations:

- Headline reveal.
- Image mask reveal.
- Supporting content entrance.
- Controlled scroll-linked image movement.

### Section 2: Brand Story

Include:

- Brand background
- Brand philosophy
- Design inspiration
- Audience and identity
- Fashion approach

Use a combination of typography, images, and alternating layouts.

### Section 3: Mission and Vision

Create two visually distinct content blocks.

Include:

- Mission
- Vision
- Short supporting copy
- Relevant imagery or decorative graphics

Use staggered scroll-triggered animations.

### Section 4: Design Philosophy

Present the brand's approach to:

- Materials
- Design
- Fit
- Comfort
- Individual expression

Only make claims that are supported by the actual brand information.

### Section 5: Brand Values

Create elegant cards with icons, headings, and concise descriptions.

Use hover transitions and staggered scroll reveals.

### Section 6: Editorial Image Gallery

Create a responsive editorial gallery with varied image sizes and balanced spacing.

Use lightweight image transitions and avoid excessive animation.

### Section 7: About CTA

Add a final CTA linking to the collections or contact page.

Use a clean transition into the global footer.

# 8. PAGE 3 — CONTACT PAGE

Create an elegant and user-friendly contact experience.

### Section 1: Contact Hero

Include:

- Heading: "LET'S TALK."
- Short introductory copy
- Contact-related editorial visual
- Clear contact CTA or section navigation

Use a subtle text reveal and image entrance.

### Section 2: Contact Information

Create clear contact cards for available information:

- Email
- Phone, if provided
- Business address, if provided
- Business hours, if provided
- Social media links

Do not invent real contact details.

### Section 3: Contact Form

Build a polished form containing:

- Full name
- Email address
- Subject or inquiry type
- Message
- Privacy consent where appropriate
- Submit button

Use appropriate components from the selected UI libraries.

Requirements:

- Required-field validation.
- Email validation.
- Clear error messages.
- Loading state during submission.
- Success and failure feedback.
- Keyboard accessibility.
- Responsive layout.

If a backend endpoint exists, integrate with it.

Otherwise, create a clearly documented submission handler and mark the backend integration point. Do not display a fake success message for an unsuccessful request.

### Section 4: FAQ

Use an accessible accordion component.

Include relevant topics such as:

- Product inquiries
- Sizing questions
- Order support
- Shipping questions
- Returns and exchanges

Use only verified policy information. If the policies are not available, provide editable placeholder content rather than inventing official policies.

### Section 5: Final Contact CTA

Create a clean closing section with a relevant CTA and global footer.

# 9. PAGE 4 — PRICING PAGE

Design a premium pricing or membership page that matches the fashion brand.

Important: First inspect the business model and existing project requirements.

If the website sells fashion products, do not automatically introduce software subscription pricing. Interpret this page as a suitable fashion membership, styling service, or pricing-information page only when supported by the business model.

### Section 1: Pricing Hero

Include:

- Clear heading
- Short explanation
- Optional billing or membership information
- Appropriate CTA

### Section 2: Pricing or Membership Cards

If the business has a membership model, create suitable cards such as:

- Essential
- Premium
- Exclusive

Use real pricing if supplied. Otherwise, keep pricing configurable and clearly mark example values as placeholders.

Each card may include:

- Plan name
- Price
- Description
- Included benefits
- CTA
- Optional featured-plan badge

Avoid presenting invented plans as actual business offerings.

If no membership model exists, create a product pricing or service pricing page that reflects the actual business.

### Section 3: Feature Comparison

Use a responsive comparison layout where appropriate.

Make the information easy to understand on desktop and mobile.

### Section 4: Pricing FAQ

Include an accessible accordion with relevant pricing questions.

### Section 5: Final CTA

Add a CTA leading to the appropriate product, service, membership, or contact flow.

Animations:

- Staggered pricing-card entrance.
- Subtle featured-card emphasis.
- Button hover transitions.
- Comparison-section reveal.
- FAQ accordion transitions.
- Final CTA reveal.

Do not animate pricing values in a misleading way or hide essential pricing information behind animations.

# 10. GSAP ANIMATION SYSTEM

Use GSAP and ScrollTrigger as the primary scroll-animation system.

Official documentation:

- GSAP: https://gsap.com/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

Create a reusable animation architecture.

Suggested reusable utilities:

- revealOnScroll()
- staggerReveal()
- imageReveal()
- parallaxImage()
- sectionEntrance()
- createPageTransition(), if suitable for the routing system

Use these utilities to maintain consistency across pages.

## Scroll Animations

Implement suitable animations for:

- Section headings
- Paragraphs
- Image containers
- Collection cards
- Product cards
- Brand-story blocks
- Pricing cards
- Contact information cards
- FAQ sections
- CTA blocks
- Footer elements

Use ScrollTrigger settings such as:

- trigger
- start
- end
- scrub
- once
- stagger
- markers during development only

Do not add every animation to every element automatically.

Choose animation styles based on each component's role and visual importance.

## Recommended Animation Styles

Use a combination of:

- Fade and vertical reveal
- Staggered text entrances
- Image mask reveals
- Subtle image scaling
- Scroll-linked parallax
- Horizontal movement for selected editorial sections
- Pinned sections only when they improve the experience
- Refined hover animations
- Small decorative motion

Use horizontal scrolling or pinned storytelling selectively. Do not make normal page navigation difficult.

## React and GSAP Requirements

- Use GSAP context or the appropriate React integration for scoped animations.
- Clean up ScrollTriggers and animations when components unmount.
- Avoid duplicate animation initialization.
- Avoid hydration mismatches.
- Do not manipulate the same element with multiple animation systems simultaneously.
- Use transforms and opacity for most motion.
- Avoid excessive layout-triggering animations.
- Do not create unnecessary React state updates on every scroll frame.
- Prevent nested ScrollTriggers from conflicting.
- Test animations after route navigation and browser resizing.

# 11. ACCESSIBILITY AND REDUCED MOTION

Accessibility is mandatory.

- Respect prefers-reduced-motion.
- Provide a reduced-animation experience.
- Keep navigation usable without animation.
- Maintain keyboard navigation.
- Use semantic HTML.
- Provide meaningful image alt text.
- Maintain adequate color contrast.
- Use accessible form labels.
- Make focus indicators visible.
- Ensure dialogs, dropdowns, menus, and accordions are keyboard accessible.

Never make essential content dependent on animation completion.

# 12. RESPONSIVE DESIGN

Support:

- Desktop
- Laptop
- Tablet
- Mobile

Requirements:

- Use responsive layouts and fluid typography.
- Prevent horizontal overflow.
- Adjust image composition for narrow screens.
- Simplify complex animation on mobile.
- Disable or reduce expensive parallax effects on small devices.
- Ensure forms and pricing cards remain readable.
- Provide a responsive navigation menu.
- Keep buttons touch-friendly.
- Verify layouts at multiple viewport sizes.

# 13. PERFORMANCE OPTIMIZATION

- Optimize large fashion images.
- Use Next.js Image where compatible with the project.
- Lazy-load below-the-fold imagery.
- Avoid loading every animation or large library on the initial page if it can be deferred.
- Dynamically load heavy animation or 3D components where appropriate.
- Keep animation workloads reasonable.
- Avoid unnecessary re-renders.
- Reduce motion on lower-powered devices when necessary.
- Avoid layout shifts caused by images or animated content.
- Check browser console warnings and errors.

Do not introduce Three.js or another heavy rendering library unless the existing design requires it.

# 14. COMPONENT ARCHITECTURE

Create reusable components wherever appropriate.

Suggested structure:

components/
  layout/
    SiteHeader.tsx
    MobileNavigation.tsx
    SiteFooter.tsx
    PageContainer.tsx

  sections/
    FashionHero.tsx
    FeaturedCollections.tsx
    BrandIntroduction.tsx
    FeaturedProducts.tsx
    CampaignBanner.tsx
    NewsletterSection.tsx
    AboutHero.tsx
    BrandStory.tsx
    MissionVision.tsx
    ContactHero.tsx
    ContactForm.tsx
    ContactInformation.tsx
    PricingHero.tsx
    PricingCards.tsx
    PricingComparison.tsx
    FAQSection.tsx

  ui/
    AnimatedButton.tsx
    Reveal.tsx
    ImageReveal.tsx
    SectionHeading.tsx
    EditorialCard.tsx
    ProductCard.tsx

  animation/
    gsap-context.ts
    scroll-reveal.ts
    animation-config.ts

Adapt this structure to the existing project rather than forcing it into an incompatible architecture.

Do not create empty components merely to match this list.

# 15. DEVELOPMENT WORKFLOW

Follow these phases in order.

PHASE 1 — AUDIT
Inspect the repository, current pages, assets, routing, dependencies, and design system.

PHASE 2 — DESIGN SYSTEM
Define the typography, color tokens, spacing, responsive breakpoints, buttons, cards, form styles, and animation principles.

PHASE 3 — SHARED LAYOUT
Build the global navigation, footer, reusable UI components, and animation utilities.

PHASE 4 — LANDING PAGE
Complete the hero, collections, editorial storytelling, featured products, campaign, newsletter, and footer.

PHASE 5 — ABOUT PAGE
Implement the brand story, mission, vision, values, gallery, and CTA.

PHASE 6 — CONTACT PAGE
Implement the contact information, accessible form, validation, feedback states, and FAQ.

PHASE 7 — PRICING PAGE
Implement the appropriate pricing or membership experience based on the actual business model.

PHASE 8 — ANIMATIONS
Add GSAP ScrollTrigger animations section by section. Verify cleanup, responsive behavior, and reduced-motion support.

PHASE 9 — QUALITY CHECKS
Run the available lint, type-check, build, and test commands.

Fix implementation errors instead of hiding them.

PHASE 10 — FINAL REVIEW
Check every page on desktop and mobile. Verify all navigation links, CTA buttons, forms, accordions, dialogs, and scroll animations.

# 16. ACCEPTANCE CRITERIA

The project is complete only when:

- All four pages are implemented.
- Every page shares a consistent design system.
- shadcn/ui, HeroUI, Ant Design, and Material UI are used selectively where appropriate.
- GSAP ScrollTrigger animations work correctly.
- Components animate when they enter the viewport where appropriate.
- Animation cleanup is implemented.
- Responsive layouts work on desktop, tablet, and mobile.
- Reduced-motion preferences are respected.
- Navigation links work.
- Interactive components work.
- Forms provide correct validation and feedback.
- No fake backend success states are introduced.
- Existing project functionality is preserved.
- No unnecessary UI library duplication is introduced.
- No avoidable React hydration errors occur.
- No avoidable TypeScript or build errors remain.

# FINAL INSTRUCTION

Work directly inside the existing project.

First inspect the codebase and determine the safest implementation approach.

Then implement the pages and reusable components in logical stages.

Do not stop after producing a plan or static mockup. Continue with the actual implementation, test the result, fix issues, and provide a concise summary of the completed work.

Prioritize design consistency, usability, accessibility, performance, and premium fashion-brand presentation over unnecessary animation complexity.