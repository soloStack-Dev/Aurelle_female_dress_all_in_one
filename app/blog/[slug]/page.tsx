import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import NewsletterCta from "@/components/home/NewsletterCta";
import { createMetadata } from "@/lib/seo";
import { posts, site } from "@/lib/data/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) return { title: "Story not found" };

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const related = posts.filter((entry) => entry.slug !== post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Elise Marchand" },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="pb-24 pt-28 sm:pt-32">
        <div className="shell">
          <Link
            href="/blog"
            className="link-underline text-[10px] font-semibold uppercase tracking-[0.16em] text-muted"
          >
            <FiArrowLeft className="size-3.5" /> The journal
          </Link>

          <header className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ember">
              {post.category}
            </p>
            <h1 className="display-lg mt-5 text-balance">{post.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted">
              <span>By Elise Marchand</span>
              <span className="size-1 rounded-full bg-ink/20" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="size-1 rounded-full bg-ink/20" />
              <span>{post.readTime}</span>
            </div>
          </header>
        </div>

        <Reveal y={40}>
          <div className="shell mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-frame bg-sand">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                preload
                sizes="(max-width: 1200px) 100vw, 1120px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="shell mt-14">
          <div className="mx-auto max-w-2xl">
            {post.content.map((paragraph, index) => (
              <Reveal key={index} delay={0.03 * index}>
                <p
                  className={
                    index === 0
                      ? "text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-ember"
                      : "mt-6 text-base leading-relaxed text-muted"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-6">
                <p className="max-w-xs text-xs leading-relaxed text-muted">
                  Written in the Paris atelier. Pieces mentioned are part of the current
                  collection.
                </p>
                <Link
                  href="/collection"
                  className="link-underline text-[11px] font-semibold uppercase tracking-[0.14em]"
                >
                  Shop the edit <FiArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="shell pb-24">
        <div className="border-t border-ink/10 pt-12">
          <h2 className="font-display text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {related.map((entry) => (
              <Link key={entry.slug} href={`/blog/${entry.slug}`} className="group flex gap-5">
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-card bg-sand sm:w-36">
                  <Image
                    src={entry.cover}
                    alt={entry.title}
                    fill
                    sizes="144px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ember">
                    {entry.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight transition-colors group-hover:text-ember">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted">{entry.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </>
  );
}
