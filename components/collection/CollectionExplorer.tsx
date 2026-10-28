"use client";

import { usePathname } from "next/navigation";
import { useDeferredValue, useState, useSyncExternalStore } from "react";
import { FiHeart, FiSearch } from "react-icons/fi";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/lib/store/cart";
import { productCategories, products } from "@/lib/data/site";

const collectionToCategory: Record<string, string> = {
  swimwear: "Swimwear",
  bikinis: "Swimwear",
  dresses: "Dresses",
  beachwear: "Beachwear",
  lingerie: "Lingerie",
  partywear: "Night & Party",
  "lingerie & intimates": "Lingerie",
  "bold dresses": "Dresses",
  "night & party": "Night & Party",
};

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type Sort = (typeof sorts)[number]["value"];

const URL_CHANGE = "aurelle:urlchange";

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE, onChange);
  };
}

/**
 * Reads the query string without `useSearchParams`.
 *
 * `useSearchParams` forces the surrounding Suspense boundary to render its
 * fallback during prerender, which would keep the product grid out of the HTML.
 * This store uses an empty server snapshot, so the full grid is server-rendered
 * and the URL filter is applied after hydration.
 */
function useSearchString() {
  return useSyncExternalStore(
    subscribeToUrl,
    () => window.location.search,
    () => "",
  );
}

/** Maps a collection link (e.g. "Bold Dresses") to a product category. */
function resolveCategory(raw: string | null) {
  if (!raw) return "All";
  const key = raw.trim().toLowerCase();
  const mapped = collectionToCategory[key];
  if (mapped) return mapped;
  return productCategories.find((category) => category.toLowerCase() === key) ?? "All";
}

/**
 * Client-side collection browser.
 *
 * Category and quick-view state live in the URL so filters are shareable and
 * the back button behaves as users expect. Search is local and deferred so
 * typing stays smooth on low-end devices.
 */
export default function CollectionExplorer() {
  const pathname = usePathname();
  const urlSearch = useSearchString();
  const searchParams = new URLSearchParams(urlSearch);

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [sort, setSort] = useState<Sort>("featured");
  const [wishlistOnly, setWishlistOnly] = useState(false);

  const wishlist = useCart((state) => state.wishlist);

  const activeCategory = resolveCategory(searchParams.get("category"));

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "All") params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    // Query-only UI state: replace the history entry and notify the URL store.
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    window.dispatchEvent(new Event(URL_CHANGE));
  };

  const filtered = products
    .filter((product) => (activeCategory === "All" ? true : product.category === activeCategory))
    .filter((product) =>
      wishlistOnly ? wishlist.includes(product.id) : true,
    )
    .filter((product) => {
      const term = deferredSearch.trim().toLowerCase();
      if (!term) return true;
      return `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(term);
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <section className="shell pb-24">
      {/* Controls ------------------------------------------------------- */}
      <div className="sticky top-16 z-30 -mx-1 mb-10 border-y border-ink/10 bg-cream/90 px-1 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {productCategories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateParam("category", category)}
                  aria-pressed={active}
                  className={`rounded-pill border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setWishlistOnly((value) => !value)}
              aria-pressed={wishlistOnly}
              className={`inline-flex items-center gap-1.5 rounded-pill border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                wishlistOnly
                  ? "border-ember bg-ember text-cream"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              }`}
            >
              <FiHeart className={`size-3 ${wishlistOnly ? "fill-cream" : ""}`} />
              Saved {wishlist.length > 0 ? `(${wishlist.length})` : ""}
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 rounded-pill border border-ink/15 bg-cream px-4 py-2">
              <FiSearch className="size-3.5 text-muted" aria-hidden="true" />
              <span className="sr-only">Search pieces</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pieces"
                className="w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-muted/70 sm:w-40"
              />
            </label>

            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className="rounded-pill border border-ink/15 bg-cream px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink outline-none"
              >
                {sorts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-muted">
        <p aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
        </p>
        {activeCategory !== "All" || wishlistOnly ? (
          <button
            type="button"
            onClick={() => {
              updateParam("category", null);
              setWishlistOnly(false);
            }}
            className="link-underline text-ember"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Grid ----------------------------------------------------------- */}
      {filtered.length === 0 ? (
        <div className="rounded-frame border border-dashed border-ink/20 py-24 text-center">
          <p className="font-display text-3xl">Nothing here yet.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            {wishlistOnly
              ? "Save a piece with the heart icon and it will appear here."
              : "Try a different search or browse the full collection."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setWishlistOnly(false);
              updateParam("category", null);
            }}
            className="mt-6 rounded-pill bg-ink px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
          >
            Reset the view
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

   </section>
  );
}
