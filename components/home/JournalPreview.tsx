import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { posts } from "@/lib/data/site";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function JournalPreview() {
  return (
    <section className="shell py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="The journal"
          title="Notes from the"
          accent="atelier"
          description="Style, process and the places that shape each collection."
        />
        <Reveal delay={0.15}>
          <Link
            href="/blog"
            className="link-underline pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            All stories <FiArrowUpRight className="size-3.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.08} y={40}>
            <article>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sand">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-pill bg-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-muted">
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
  );
}
