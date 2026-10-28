/**
 * Central content + navigation source.
 *
 * Keeping copy/data out of components makes the pages easy to edit and keeps
 * the React tree focused on presentation. Swap these demo records for a CMS
 * or database response later without touching the UI components.
 */

export const site = {
  name: "AURELLE",
  legalName: "Aurelle Studio",
  tagline: "Own your summer.",
  description:
    "Aurelle is a modern women's fashion house creating confident swimwear, dresses, beachwear and evening pieces for every version of you.",
  url: "https://aurelle.studio",
  email: "hello@aurelle.studio",
  phone: "+1 (212) 555-0148",
  address: "18 Rue des Ateliers, 75011 Paris, France",
  coordinates: { lat: 48.8591, lng: 2.3801 },
  hours: "Mon – Fri · 09:00 – 18:00 CET",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collection" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Membership", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export type Collection = {
  slug: string;
  name: string;
  ghost: string;
  description: string;
  image: string;
  accent: string;
};

export const collections: Collection[] = [
  {
    slug: "swimwear",
    name: "Swimwear",
    ghost: "SWIM",
    description: "Sculpting silhouettes built for long, sunlit days.",
    image: "/images/collections/swimwear.jpg",
    accent: "from-ember/70 via-coral/20 to-transparent",
  },
  {
    slug: "bikinis",
    name: "Bikinis",
    ghost: "SUN",
    description: "Minimal lines, bold confidence, made to move.",
    image: "/images/collections/bikinis.jpg",
    accent: "from-burgundy/70 via-wine/20 to-transparent",
  },
  {
    slug: "dresses",
    name: "Bold Dresses",
    ghost: "BOLD",
    description: "Statement pieces for the hours worth remembering.",
    image: "/images/collections/dresses.jpg",
    accent: "from-wine/70 via-burgundy/25 to-transparent",
  },
  {
    slug: "beachwear",
    name: "Beachwear",
    ghost: "BEACH",
    description: "Weightless layers that travel from shore to supper.",
    image: "/images/collections/beachwear.jpg",
    accent: "from-coral/70 via-sand/30 to-transparent",
  },
  {
    slug: "lingerie",
    name: "Lingerie & Intimates",
    ghost: "LUXE",
    description: "Considered support, soft-touch fabrics, quiet luxury.",
    image: "/images/collections/lingerie.jpg",
    accent: "from-burgundy/60 via-coral/20 to-transparent",
  },
  {
    slug: "partywear",
    name: "Night & Party",
    ghost: "NIGHT",
    description: "After-dark dressing with a precisely modern edge.",
    image: "/images/collections/partywear.jpg",
    accent: "from-wine/75 via-burgundy/25 to-transparent",
  },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  badge?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "aurelle-01",
    name: "Solene Silk Slip Dress",
    price: 248,
    image: "/images/products/product-01.jpg",
    category: "Dresses",
    colors: ["#c6a27a", "#161310", "#6c1b2b"],
    badge: "New",
    description: "Bias-cut silk with a fluid drape and adjustable straps.",
  },
  {
    id: "aurelle-02",
    name: "Mirabel Linen Set",
    price: 186,
    image: "/images/products/product-02.jpg",
    category: "Beachwear",
    colors: ["#eadcc9", "#c7b29a", "#6b625a"],
    description: "Breathable linen co-ord designed for warm, slow days.",
  },
  {
    id: "aurelle-03",
    name: "Noa Sculpt Swim One-Piece",
    price: 142,
    image: "/images/products/product-03.jpg",
    category: "Swimwear",
    colors: ["#161310", "#d4552d", "#6c1b2b"],
    badge: "Best seller",
    description: "Compression-lined swim with a clean, square neckline.",
  },
  {
    id: "aurelle-04",
    name: "Lune Satin Midi",
    price: 214,
    image: "/images/products/product-04.jpg",
    category: "Dresses",
    colors: ["#3d0c16", "#c6a27a", "#f7f2ea"],
    description: "Liquid satin with a gathered waist and side split.",
  },
  {
    id: "aurelle-05",
    name: "Isla Crochet Cover-Up",
    price: 128,
    image: "/images/products/product-05.jpg",
    category: "Beachwear",
    colors: ["#eadcc9", "#d4552d"],
    description: "Hand-finished crochet that layers over everything.",
  },
  {
    id: "aurelle-06",
    name: "Vela Evening Corset",
    price: 264,
    image: "/images/products/product-06.jpg",
    category: "Night & Party",
    colors: ["#161310", "#6c1b2b"],
    badge: "Limited",
    description: "Structured bodice, soft boning, midnight-ready.",
  },
  {
    id: "aurelle-07",
    name: "Serein Silk Nightdress",
    price: 158,
    image: "/images/collections/nightwear.jpg",
    category: "Lingerie",
    colors: ["#f7f2ea", "#c6a27a"],
    description: "Featherweight silk with a delicate lace trim.",
  },
  {
    id: "aurelle-08",
    name: "Ciela Bikini Set",
    price: 134,
    image: "/images/collections/bikinis.jpg",
    category: "Swimwear",
    colors: ["#d4552d", "#e8734b", "#161310"],
    description: "High-cut bottoms and a soft triangle top.",
  },
];

export const productCategories = [
  "All",
  "Swimwear",
  "Dresses",
  "Beachwear",
  "Lingerie",
  "Night & Party",
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Style" | "Behind the Seams" | "Travel";
  cover: string;
  date: string;
  readTime: string;
  content: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "the-summer-edit",
    title: "The Summer Edit: Dressing for Heat and Confidence",
    excerpt:
      "A short guide to building a holiday wardrobe that works as hard as you do — fewer pieces, better lines, more presence.",
    category: "Style",
    cover: "/images/asserts/blog/blog-main-section.jpg",
    date: "2026-06-12",
    readTime: "5 min read",
    content: [
      "Summer dressing is an exercise in subtraction. The best holiday wardrobes are not the fullest ones; they are the ones where every piece earns its place. Start with a silhouette you trust, then let fabric and colour do the talking.",
      "Our approach is built around three anchors: one sculpting swim piece, one fluid dress that moves between day and night, and one weightless layer. Everything else is an accent.",
      "The result is a suitcase that feels intentional, and a wardrobe that keeps working long after the tan fades.",
    ],
  },
  {
    slug: "behind-the-atelier",
    title: "Behind the Atelier: How a Dress Becomes a Dress",
    excerpt:
      "From the first pencil sketch to the final hand-finished hem, a look at the people and processes behind an Aurelle piece.",
    category: "Behind the Seams",
    cover: "/images/asserts/blog/blog-subsection-next.jpg",
    date: "2026-05-28",
    readTime: "7 min read",
    content: [
      "Every Aurelle piece begins with a single question: how should this make someone feel? Before fabric, before colour, there is a posture — a way of moving through a room.",
      "Our atelier in Paris develops each shape through three toiles, refining the shoulder, the waist and the hem until the garment feels inevitable. Nothing is rushed; a dress can take six weeks before it reaches production.",
      "The final touches are done by hand: the press of a seam, the weight of a lining, the quiet detail you only notice when you wear it.",
    ],
  },
  {
    slug: "postcard-from-positano",
    title: "Postcard from Positano",
    excerpt:
      "Sun-bleached stone, long lunches and the colours that shaped our resort collection.",
    category: "Travel",
    cover: "/images/asserts/blog/blog-subsection-01.jpg",
    date: "2026-04-19",
    readTime: "4 min read",
    content: [
      "There is a particular light on the Amalfi Coast in late spring — warm, hazy, almost cinematic. We travelled south to shoot the resort collection and came back with a palette rather than a moodboard.",
      "Terracotta, faded rose, sun-bleached cream. The collection borrows these tones and layers them over silhouettes designed to move in heat.",
      "Some places stay with you. Positano stayed with us in the clothes.",
    ],
  },
];

export type Plan = {
  name: string;
  price: number;
  cadence: string;
  description: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    name: "Essential",
    price: 0,
    cadence: "free forever",
    description: "For the curious. Early access to new drops and our seasonal edit.",
    features: [
      "Early access to new collections",
      "Seasonal style edit newsletter",
      "Standard shipping",
      "30-day returns",
    ],
    cta: "Join free",
  },
  {
    name: "Premium",
    price: 24,
    cadence: "per month",
    description: "For the wardrobe builder. Priority access, styling support and member pricing.",
    featured: true,
    features: [
      "Everything in Essential",
      "48-hour early access to drops",
      "10% member pricing site-wide",
      "Personal styling consultation",
      "Complimentary express shipping",
      "Free size exchanges",
    ],
    cta: "Become a member",
  },
  {
    name: "Exclusive",
    price: 64,
    cadence: "per month",
    description: "For the collector. Made-to-measure moments and private atelier access.",
    features: [
      "Everything in Premium",
      "Made-to-measure fittings",
      "Private atelier appointments",
      "Limited edition first refusal",
      "Dedicated client concierge",
      "Complimentary alterations",
    ],
    cta: "Request an invite",
  },
];

export type Faq = { question: string; answer: string };

export const pricingFaqs: Faq[] = [
  {
    question: "Can I cancel my membership at any time?",
    answer:
      "Yes. Memberships are month-to-month and can be cancelled from your account before the next billing date. You keep access until the end of the current period.",
  },
  {
    question: "Do members receive free shipping?",
    answer:
      "Premium and Exclusive members receive complimentary express shipping on every order. Essential members receive standard shipping on orders over $150.",
  },
  {
    question: "How do made-to-measure fittings work?",
    answer:
      "Exclusive members are invited to a private fitting, in person at our Paris atelier or over video. Measurements are kept on file for future pieces.",
  },
  {
    question: "Is the member discount valid on sale items?",
    answer:
      "The 10% member discount applies to full-price pieces. Limited-edition drops and archive pieces are excluded.",
  },
];

export const contactFaqs: Faq[] = [
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery is 3–5 business days. Express is 1–2 business days. International delivery times are shown at checkout.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Unworn pieces with tags attached can be returned within 30 days. For hygiene reasons, swimwear and intimates must have the protective seal intact.",
  },
  {
    question: "Can you help me choose a size?",
    answer:
      "Yes. Send us your measurements and the piece you are considering; our team will recommend the best fit. Premium members can book a styling consultation.",
  },
  {
    question: "Do you offer alterations?",
    answer:
      "Exclusive members receive complimentary alterations on full-price pieces. Other clients can request alterations at a fixed rate.",
  },
];

export const benefits = [
  {
    title: "Considered materials",
    description: "Responsibly sourced silk, linen and recycled swim knits.",
    icon: "leaf",
  },
  {
    title: "Designed to last",
    description: "Small-batch production with a focus on timeless lines.",
    icon: "spark",
  },
  {
    title: "Easy exchanges",
    description: "Free size exchanges on every full-price order.",
    icon: "swap",
  },
  {
    title: "Discreet delivery",
    description: "Plastic-free packaging, delivered with care.",
    icon: "box",
  },
] as const;
