import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Collection } from "@/lib/data/site";

/**
 * Image-led collection tile. The oversized "ghost" word is decorative, so it
 * is hidden from assistive tech while the link text remains descriptive.
 */
export default function CollectionCard({
  collection,
  priority = false,
}: {
  collection: Collection;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/collection?category=${encodeURIComponent(collection.name)}`}
      className="group relative block overflow-hidden rounded-card bg-sand"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={collection.image}
          alt={`${collection.name} collection`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          preload={priority}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${collection.accent} opacity-80 mix-blend-multiply`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-6 select-none font-display text-[5.5rem] leading-none text-cream/25 md:text-[7rem]"
        >
          {collection.ghost}
        </span>

        <div className="absolute inset-x-5 bottom-5 text-cream">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl leading-none">{collection.name}</h3>
              <p className="mt-2 max-w-[22ch] text-xs leading-relaxed text-cream/75">
                {collection.description}
              </p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/30 transition-all duration-300 group-hover:rotate-45 group-hover:bg-cream group-hover:text-ink">
              <FiArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
