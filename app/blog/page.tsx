import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "@/components/layout/PageHeader";
import NewsletterCta from "@/components/home/NewsletterCta";
import Reveal from "@/components/ui/Reveal";
import { createMetadata } from "@/lib/seo";
import { posts, site } from "@/lib/data/site";

export const metadata: Metadata = createMetadata({
  title: "The Journal",
  description:
    "Style notes, atelier stories and travel diaries from Aurelle — a slower look at how the clothes are made and worn.",
  path: "/blog",
  image: "/images/asserts/blog/blog-main-section.jpg",
});

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="The journal"
        title={
          <>
            Notes from the <span className="italic text-ember">atelier</span>.
          </>
        }
        description="Style, process and the places that shape each collection. Written slowly, published occasionally."
      />

      <section className="shell pb-24">
        {/* Featured story */}
        <Reveal y={40}>
          <article className="group grid gap-8 border-y border-ink/10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Link
              href={`/blog/${featured.slug}`}
              className="relative block aspect-[16/10] overflow-hidden rounded-frame bg-sand"
            >
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute left-5 top-5 rounded-pill bg-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
                Featured · {featured.category}
              </span>
            </Link>

            <div className="lg:pl-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span className="size-1 rounded-full bg-ink/20" />
                <span>{featured.readTime}</span>
              </div>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] text-balance transition-colors group-hover:text-ember lg:text-5xl">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="link-underline mt-6 text-[11px] font-semibold uppercase tracking-[0.14em]"
              >
                Read the story <FiArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </article>
        </Reveal>

        {/* Remaining stories */}
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08} y={40}>
              <article className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-sand">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-pill bg-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="size-1 rounded-full bg-ink/20" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl leading-tight transition-colors group-hover:text-ember">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journal gallery -------------------------------------------------- */}
      <section className="shell pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              src: "/images/asserts/blog/blog-subsection-02.jpg",
              alt: "Aurelle journal image",
            },
            {
              src: "/images/asserts/blog/blog-subsection-03.jpg",
              alt: "Aurelle journal image",
            },
          ].map((image, index) => (
            <Reveal key={image.src} delay={index * 0.08} y={36}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-frame bg-sand">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <NewsletterCta />
    </>
  );
}
