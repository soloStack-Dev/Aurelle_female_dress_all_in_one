import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import CollectionExplorer from "@/components/collection/CollectionExplorer";
import ProductQuickView from "@/components/collection/ProductQuickView";
import { createMetadata } from "@/lib/seo";
import { products, site } from "@/lib/data/site";

export const metadata: Metadata = createMetadata({
  title: "The Collection",
  description:
    "Shop Aurelle swimwear, dresses, beachwear, lingerie and after-dark pieces. Filter by category, search the edit and save favourites.",
  path: "/collection",
  image: "/images/collections/dresses.jpg",
});

export default function CollectionPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collection",
        item: `${site.url}/collection`,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Aurelle Collection",
    description:
      "Swimwear, dresses, beachwear, lingerie and evening pieces from the Aurelle SS26 collection.",
    url: `${site.url}/collection`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: `${site.url}${product.image}`,
          description: product.description,
          category: product.category,
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
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <PageHeader
        eyebrow="The collection · SS26"
        title={
          <>
            Pieces for <span className="italic text-ember">every</span> version.
          </>
        }
        description="Six edits, one point of view. Filter the full range, search for a silhouette, or save the pieces you want to come back to."
        image="/images/collections/dresses.jpg"
        imageAlt="Model in an Aurelle evening dress"
        meta="Campaign 01 — Positano"
      />

      <CollectionExplorer />

      <Suspense fallback={null}>
        <ProductQuickView />
      </Suspense>
    </>
  );
}
