import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import PageHeader from "@/components/layout/PageHeader";
import Benefits from "@/components/home/Benefits";
import PillButton from "@/components/ui/PillButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/data/site";

export const metadata: Metadata = createMetadata({
  title: "Our Story",
  description:
    "Aurelle is a Paris-based fashion house designing considered swimwear, dresses and evening pieces in small batches. Meet the atelier behind the clothes.",
  path: "/about",
  image: "/images/asserts/about/about-subnext-section.jpg",
});

const principles = [
  {
    number: "01",
    title: "The body comes first",
    body: "We fit on real bodies across five sizes before a style is signed off. If it needs shapewear to work, it is not finished.",
  },
  {
    number: "02",
    title: "Fewer, better pieces",
    body: "Small runs, long seasons. A dress should still feel relevant three summers after you bought it.",
  },
  {
    number: "03",
    title: "Made to be worn",
    body: "Delicate does not mean precious. Every piece is tested for movement, heat, salt water and a long dinner.",
  },
];

const timeline = [
  { year: "2019", title: "A kitchen-table beginning", body: "Elise Marchand begins cutting silk samples in a shared Paris studio, selling to friends and a single boutique in Le Marais." },
  { year: "2021", title: "The first swim edit", body: "A recycled-knit swim capsule sells out in nine days and sets the direction: sculpting, minimal, made to move." },
  { year: "2023", title: "Atelier no. 18", body: "The studio moves to Rue des Ateliers, bringing pattern, sampling and hand-finishing under one roof." },
  { year: "2026", title: "A global wardrobe", body: "Aurelle ships to 38 countries, still producing in limited runs with the same mills and the same standards." },
];

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="Our story"
        title={
          <>
            Quietly <span className="italic text-ember">bold</span>.
          </>
        }
        description="Aurelle is a Paris fashion house built on a simple idea: clothes should make you feel more like yourself, not less."
        image="/images/asserts/about/about-subnext-section.jpg"
        imageAlt="Aurelle campaign image"
        meta="Atelier no. 18 — Paris"
      />

      {/* Story ------------------------------------------------------------ */}
      <section className="shell pb-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-frame bg-sand">
                <Image
                  src="/images/asserts/about/about-subsection-01.jpg"
                  alt="Aurelle editorial campaign image"
                  fill
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-card border border-ink/10 bg-card p-5">
                  <p className="font-display text-3xl">38</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                    Countries shipped
                  </p>
                </div>
                <div className="rounded-card border border-ink/10 bg-card p-5">
                  <p className="font-display text-3xl">6</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                    Edits each year
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <span className="eyebrow">Why we exist</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg mt-5 text-balance">
                Designed for the woman who dresses for{" "}
                <span className="italic text-ember">herself</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                <p>
                  Aurelle began in 2019 with a frustration familiar to most women: the clothes
                  that looked best on a hanger rarely felt best on a body. Occasion wear demanded
                  a costume change. Swimwear demanded confidence before it gave any.
                </p>
                <p>
                  We started with one bias-cut silk slip and a rule — if it does not move well,
                  it does not leave the atelier. That rule still governs every collection. Each
                  shape is developed over three toiles, fitted across five sizes and tested in
                  real heat, real water and real evenings.
                </p>
                <p>
                  Today the studio is still small by choice. We produce in limited runs with
                  mills we know by name, because the opposite of fast fashion is not slow fashion
                  — it is considered fashion.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 border-l-2 border-ember pl-6">
                <p className="font-display text-2xl italic leading-snug">
                  “We are not trying to dress a trend. We are trying to dress a life.”
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Elise Marchand — Founder & Creative Director
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <PillButton href="/collection">Shop the collection</PillButton>
                <Link
                  href="/blog/behind-the-atelier"
                  className="link-underline text-[11px] font-semibold uppercase tracking-[0.14em]"
                >
                  Inside the atelier <FiArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles ------------------------------------------------------- */}
      <section className="bg-ink py-24 text-cream">
        <div className="shell">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/45">
                How we work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg mt-4 text-balance">
                Three rules. <span className="italic text-sand">No exceptions.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px border-t border-cream/10 md:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal
                key={principle.number}
                delay={index * 0.08}
                className="border-b border-cream/10 py-8 md:border-b-0 md:border-r md:pr-8 md:last:border-r-0 md:pl-8 md:first:pl-0"
              >
                <p className="font-display text-sm text-ember">{principle.number}</p>
                <h3 className="mt-4 font-display text-2xl">{principle.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline --------------------------------------------------------- */}
      <section className="shell py-24">
        <SectionHeading
          eyebrow="The long version"
          title="Seven years, one"
          accent="standard"
          description="A short history of a studio that has deliberately stayed small."
        />

        <ol className="mt-12 border-t border-ink/10">
          {timeline.map((entry, index) => (
            <Reveal
              key={entry.year}
              delay={index * 0.05}
              className="grid gap-4 border-b border-ink/10 py-7 sm:grid-cols-[7rem_1fr_1.2fr] sm:items-baseline sm:gap-8"
            >
              <p className="font-display text-2xl text-ember">{entry.year}</p>
              <h3 className="text-sm font-semibold tracking-tight">{entry.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{entry.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Campaign break --------------------------------------------------- */}
      <section className="shell pb-24">
        <Reveal y={40}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-sand sm:aspect-[2.1/1]">
            <Image
              src="/images/asserts/about/about-main-section.jpg"
              alt="Aurelle campaign image"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Image break ------------------------------------------------------ */}
      <section className="shell pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              src: "/images/asserts/about/about-subsection-02.jpg",
              alt: "Aurelle editorial image",
            },
            {
              src: "/images/asserts/about/about-subsection-03.jpg",
              alt: "Aurelle atelier campaign image",
            },
            {
              src: "/images/asserts/about/about-sub-next-section.jpg",
              alt: "Aurelle campaign image",
            },
          ].map((image, index) => (
            <Reveal key={image.src} delay={index * 0.07} y={36}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-sand">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Benefits />

      {/* CTA -------------------------------------------------------------- */}
      <section className="shell py-24 text-center">
        <Reveal>
          <p className="eyebrow justify-center">Ready when you are</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-lg mx-auto mt-5 max-w-2xl text-balance">
            Find the piece you will still wear in <span className="italic text-ember">2029</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PillButton href="/collection">Shop the collection</PillButton>
            <PillButton href="/contact" variant="outline" arrow={false}>
              Talk to a stylist
            </PillButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
