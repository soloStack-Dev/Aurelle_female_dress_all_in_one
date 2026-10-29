export type AuthSlide = {
  src: string;
  alt: string;
};

export type AuthTestimonial = AuthSlide & {
  quote: string;
  name: string;
  role: string;
};

export const signupSlides: AuthSlide[] = [
  {
    src: "/Asserts/login-page-img.jpg",
    alt: "AURELLE sign-in page editorial artwork",
  },
  {
    src: "/images/hero/hero-model.jpg",
    alt: "Aurelle campaign portrait in warm evening light",
  },
  {
    src: "/images/editorial/editorial-01.jpg",
    alt: "Editorial portrait in soft neutral tones",
  },
  {
    src: "/images/editorial/editorial-02.jpg",
    alt: "Sunlit fashion portrait against a warm backdrop",
  },
];

export const authTestimonials: AuthTestimonial[] = [
  {
    src: "/images/about/about-hero.jpg",
    alt: "Portrait of Camille Rousseau",
    quote:
      "The pieces feel like they were made for me — considered, quiet, and impossible to stop wearing.",
    name: "Camille Rousseau",
    role: "Creative director, Atelier Lune",
  },
  {
    src: "/images/products/product-03.jpg",
    alt: "Portrait of Elena Marchetti",
    quote:
      "My membership changed the way I dress. Fewer pieces, better ones, and a wardrobe that finally feels like mine.",
    name: "Elena Marchetti",
    role: "Founder, Casa Verde",
  },
  {
    src: "/images/editorial/editorial-02.jpg",
    alt: "Portrait of Noor Haddad",
    quote:
      "Every delivery feels like a letter from Paris. The fit, the fabric, the details — all of it is worth slowing down for.",
    name: "Noor Haddad",
    role: "Architect, Studio N",
  },
];
