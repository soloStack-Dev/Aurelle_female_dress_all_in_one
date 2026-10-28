import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import CollectionCard from "@/components/ui/CollectionCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { collections } from "@/lib/data/site";

export default function CollectionsShowcase() {
  return (
    <section className="relative overflow-hidden bg-sand/45 py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Six ways to wear"
            title="Every version of"
            accent="you"
            description="From shoreline to soirée. Six edits, one point of view: clothes that let you move."
          />
          <Reveal delay={0.15}>
            <Link
              href="/collection"
              className="link-underline pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Explore all collections <FiArrowUpRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Reveal
              key={collection.slug}
              delay={(index % 3) * 0.07}
              y={44}
              className={index % 2 === 1 ? "lg:translate-y-10" : ""}
            >
              <CollectionCard collection={collection} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
