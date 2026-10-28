import type { Metadata } from "next";
import { site } from "@/lib/data/site";

/**
 * Builds consistent per-page metadata so every route ships a unique title,
 * description, canonical URL and social card. Next.js merges this with the
 * root layout defaults.
 */
export function createMetadata({
  title,
  description,
  path = "/",
  image = "/images/hero/hero-model.jpg",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  // The home title already contains the brand; avoid "AURELLE — … · AURELLE".
  const socialTitle = title.startsWith(site.name) ? title : `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

/** Organization + WebSite structured data for rich search results. */
export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "FR",
    },
    sameAs: site.socials.map((social) => social.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/collection?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
