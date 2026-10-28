import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import SignaturePieces from "@/components/home/SignaturePieces";
import CollectionsShowcase from "@/components/home/CollectionsShowcase";
import EditorialStory from "@/components/home/EditorialStory";
import Benefits from "@/components/home/Benefits";
import JournalPreview from "@/components/home/JournalPreview";
import NewsletterCta from "@/components/home/NewsletterCta";
import { createMetadata } from "@/lib/seo";
import { products, site } from "@/lib/data/site";

export const metadata: Metadata = createMetadata({
  // The home page sits in the same segment as the root layout, so its title
  // template does not apply — include the brand explicitly, only once.
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

/**
 * Home page composition. Each section is a separate component so content,
 * animation and layout can evolve independently.
 */
export default function HomePage() {
  // Product structured data helps the signature edit surface as rich results.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aurelle signature pieces",
    itemListElement: products.slice(0, 4).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: `${site.url}${product.image}`,
        description: product.description,
        brand: { "@type": "Brand", name: site.name },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${site.url}/collection?piece=${product.id}`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Hero />
      <Marquee />
      <SignaturePieces />
      <CollectionsShowcase />
      <EditorialStory />
      <Benefits />
      <JournalPreview />
      <NewsletterCta />
    </>
  );
}
