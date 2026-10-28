"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/lib/store/cart";
import type { Product } from "@/lib/data/site";

/**
 * Product card with real shared state (bag + wishlist).
 * Hover actions are revealed with CSS so the card stays cheap to render.
 */
export default function ProductCard({ product }: { product: Product }) {
  const addToBag = useCart((state) => state.addToBag);
  const wishlist = useCart((state) => state.wishlist);
  const toggleWishlist = useCart((state) => state.toggleWishlist);
  const [added, setAdded] = useState(false);

  const wished = wishlist.includes(product.id);

  function handleAdd() {
    addToBag(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-card bg-sand">
        <Link
          href={`/collection?piece=${product.id}`}
          scroll={false}
          className="relative block aspect-[4/5]"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-pill bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-cream/90 text-ink backdrop-blur transition-colors hover:bg-ember hover:text-cream"
        >
          <FiHeart className={wished ? "size-4 fill-ember text-ember" : "size-4"} />
        </button>

        <div className="absolute inset-x-4 bottom-4 flex translate-y-3 gap-2 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-cream px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            {added ? <FiCheck className="size-3.5" /> : <FiShoppingBag className="size-3.5" />}
            {added ? "Added" : "Add to bag"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{product.name}</h3>
          <p className="mt-1 text-xs text-muted">{product.category}</p>
        </div>
        <p className="text-sm font-semibold tabular-nums">${product.price}</p>
      </div>

      <div className="mt-3 flex items-center gap-1.5" aria-label="Available colours">
        {product.colors.map((color) => (
          <span
            key={color}
            className="size-3 rounded-full border border-ink/10"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </article>
  );
}
