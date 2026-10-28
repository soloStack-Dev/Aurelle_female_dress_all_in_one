"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiHeart, FiShoppingBag, FiX } from "react-icons/fi";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { useCart } from "@/lib/store/cart";
import { products } from "@/lib/data/site";

/**
 * URL-driven product quick view.
 *
 * Kept separate from the filter grid so `useSearchParams` only suspends this
 * small dialog, while the product grid itself stays server-rendered for SEO.
 */
export default function ProductQuickView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { stop, start } = useSmoothScroll();

  const wishlist = useCart((state) => state.wishlist);
  const addToBag = useCart((state) => state.addToBag);
  const toggleWishlist = useCart((state) => state.toggleWishlist);

  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  const pieceId = searchParams.get("piece");
  const product = products.find((entry) => entry.id === pieceId) ?? null;

  const close = useCallback(() => {
    // Preserve the active filter while removing only the quick-view param.
    const params = new URLSearchParams(window.location.search);
    params.delete("piece");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router]);

  // Lock page scroll while the dialog is open.
  useEffect(() => {
    if (!product) return;
    stop();
    document.body.style.overflow = "hidden";
    return () => {
      start();
      document.body.style.overflow = "";
    };
  }, [product, stop, start]);

  // Escape closes the dialog.
  useEffect(() => {
    if (!product) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [product, close]);

  function handleAdd() {
    if (!product) return;
    addToBag(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <AnimatePresence>
      {product ? (
        <>
          <motion.button
            type="button"
            aria-label="Close quick view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-80 bg-ink/45 backdrop-blur-sm"
          />
          <div className="pointer-events-none fixed inset-0 z-90 grid place-items-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={product.name}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-frame bg-cream shadow-soft md:grid-cols-2"
              data-lenis-prevent
            >
              <div className="relative aspect-[4/5] bg-sand md:aspect-auto md:min-h-[32rem]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
                {product.badge ? (
                  <span className="absolute left-4 top-4 rounded-pill bg-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <div className="relative flex flex-col p-6 sm:p-8">
                <button
                  type="button"
                  onClick={close}
                  autoFocus
                  aria-label="Close quick view"
                  className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-cream"
                >
                  <FiX className="size-4" />
                </button>

                <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  {product.category}
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{product.name}</h2>
                <p className="mt-2 text-lg font-semibold tabular-nums">${product.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Colour
                  </p>
                  <div className="mt-2 flex gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="size-6 rounded-full border border-ink/15 ring-offset-2 ring-offset-cream"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Size
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSize(option)}
                        aria-pressed={size === option}
                        className={`size-9 rounded-full border text-[11px] font-semibold transition-colors ${
                          size === option
                            ? "border-ink bg-ink text-cream"
                            : "border-ink/20 text-ink/70 hover:border-ink"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-7">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
                  >
                    {added ? <FiCheck className="size-3.5" /> : <FiShoppingBag className="size-3.5" />}
                    {added ? "Added to bag" : "Add to bag"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-pressed={wishlist.includes(product.id)}
                    aria-label="Save to wishlist"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ember hover:text-ember"
                  >
                    <FiHeart
                      className={
                        wishlist.includes(product.id) ? "size-4 fill-ember text-ember" : "size-4"
                      }
                    />
                  </button>
                </div>

                <p className="mt-4 text-[10px] leading-relaxed text-muted">
                  Demo storefront — bag contents stay on this device and checkout is not
                  connected. Size selected: {size}.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
