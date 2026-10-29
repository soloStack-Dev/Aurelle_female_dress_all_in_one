"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import signInPreview from "@/Asserts/create-account-page-img.jpg";
import signUpPreview from "@/Asserts/login-page-img.jpg";
import AccountMenu from "@/components/layout/AccountMenu";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { authHref, isProtectedPath } from "@/lib/auth-navigation";
import { navigation, products, site } from "@/lib/data/site";
import { useAuth } from "@/lib/store/auth";
import { useCart } from "@/lib/store/cart";

/**
 * Global header:
 * - fixed + transparent at the top of the page, frosted once scrolled
 * - accessible full-screen mobile navigation
 * - a real, shared bag drawer powered by the Zustand store
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Overlays remember which route opened them. A navigation changes `pathname`,
  // which derives the overlay closed without a setState-in-effect.
  const [overlay, setOverlay] = useState<{ kind: "menu" | "bag"; path: string } | null>(null);
  const { stop, start } = useSmoothScroll();

  const activeOverlay = overlay?.path === pathname ? overlay.kind : null;
  const menuOpen = activeOverlay === "menu";
  const bagOpen = activeOverlay === "bag";
  const openMenu = () => setOverlay({ kind: "menu", path: pathname });
  const openBag = () => setOverlay({ kind: "bag", path: pathname });
  const closeOverlay = () => setOverlay(null);

  const bag = useCart((state) => state.bag);
  const removeFromBag = useCart((state) => state.removeFromBag);
  const bagItems = Object.entries(bag);
  const bagCount = bagItems.reduce((total, [, qty]) => total + qty, 0);
  const user = useAuth((state) => state.user);
  const authHydrated = useAuth((state) => state.hydrated);

  // Add a frosted background after a small scroll threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pause Lenis + native scroll while an overlay is open.
  const overlayOpen = activeOverlay !== null;
  useEffect(() => {
    if (overlayOpen) {
      stop();
      document.body.style.overflow = "hidden";
    } else {
      start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen, stop, start]);

  // Escape closes whichever overlay is open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOverlay(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navHref = (href: string) =>
    !authHydrated || user || !isProtectedPath(href)
      ? href
      : authHref("login", href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-60 transition-all duration-500 ${
          scrolled || overlayOpen
            ? "border-b border-ink/10 bg-cream/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-18 items-center justify-between gap-6">
          <Link href="/" className="relative z-10 flex items-baseline gap-2" aria-label={`${site.name} home`}>
            <span className="font-display text-2xl tracking-[0.18em]">AURELLE</span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.3em] text-muted sm:inline">
              Atelier
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={navHref(item.href)}
                className={`relative text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-ember ${
                  isActive(item.href) ? "text-ember" : "text-ink/70"
                }`}
              >
                {item.label}
                {isActive(item.href) ? (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-ember" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-0.5 sm:gap-1.5">
            {!authHydrated ? (
              <div
                className="h-9 w-32 animate-pulse rounded-full bg-ink/5 sm:h-10 sm:w-[208px]"
                aria-hidden="true"
              />
            ) : user ? (
              <>
                <Link
                  href="/collection"
                  aria-label="Search the collection"
                  className="grid size-8 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink sm:size-10"
                >
                  <FiSearch className="size-4.5" />
                </Link>
                <Link
                  href="/collection"
                  aria-label="Favorites"
                  className="grid size-8 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink sm:size-10"
                >
                  <FiHeart className="size-4.5" />
                </Link>
                <AccountMenu />
                <button
                  type="button"
                  onClick={openBag}
                  aria-label={`Open cart, ${bagCount} items`}
                  className="relative grid size-8 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink sm:size-10"
                >
                  <FiShoppingBag className="size-4.5" />
                  {bagCount > 0 ? (
                    <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-ember text-[9px] font-bold text-cream">
                      {bagCount}
                    </span>
                  ) : null}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={authHref("login")}
                  className="group flex h-9 items-center rounded-full border border-ink/15 bg-cream/40 px-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/75 transition-colors hover:border-ink/30 hover:text-ink sm:h-10 sm:gap-2 sm:pl-1 sm:pr-3 sm:text-[10px]"
                >
                  <span className="relative hidden size-8 shrink-0 overflow-hidden rounded-full bg-sand sm:block">
                    <Image
                      src={signInPreview}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  Sign In
                </Link>
                <Link
                  href={authHref("signup")}
                  className="group flex h-9 items-center rounded-full bg-ink px-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-ember sm:h-10 sm:gap-2 sm:pl-1 sm:pr-3.5 sm:text-[10px]"
                >
                  <span className="relative hidden size-8 shrink-0 overflow-hidden rounded-full bg-ember/30 sm:block">
                    <Image
                      src={signUpPreview}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  Sign Up
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-8 place-items-center rounded-full text-ink sm:size-10 lg:hidden"
            >
              <FiMenu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation ------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-80 overflow-y-auto bg-cream pb-10 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="shell flex h-18 items-center justify-between">
              <span className="font-display text-2xl tracking-[0.18em]">AURELLE</span>
              <button
                type="button"
                onClick={closeOverlay}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-ink/15"
              >
                <FiX className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell mt-10 flex flex-col">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * index + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={navHref(item.href)}
                    className="flex items-baseline justify-between border-b border-ink/10 py-4"
                  >
                    <span className="font-display text-4xl">{item.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell mt-10 flex flex-wrap gap-4 text-xs text-muted">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Shopping bag ------------------------------------------------------ */}
      <AnimatePresence>
        {bagOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close shopping bag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeOverlay}
              className="fixed inset-0 z-80 bg-ink/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 right-0 z-90 flex w-full max-w-md flex-col bg-cream shadow-soft"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping bag"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <h2 className="font-display text-2xl">
                  Your bag <span className="text-sm text-muted">({bagCount})</span>
                </h2>
                <button
                  type="button"
                  onClick={closeOverlay}
                  aria-label="Close shopping bag"
                  className="grid size-9 place-items-center rounded-full border border-ink/15"
                >
                  <FiX className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6" data-lenis-prevent>
                {bagItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <FiShoppingBag className="size-8 text-muted" />
                    <p className="text-sm text-muted">Your bag is empty.</p>
                    <Link
                      href="/collection"
                      onClick={closeOverlay}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-ember"
                    >
                      Explore the collection
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-5">
                    {bagItems.map(([id, qty]) => {
                      const product = products.find((item) => item.id === id);
                      if (!product) return null;
                      return (
                        <li key={id} className="flex gap-4">
                          <Image
                            src={product.image}
                            alt=""
                            width={80}
                            height={80}
                            className="size-20 rounded-xl object-cover"
                          />
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">{product.name}</p>
                                <p className="text-xs text-muted">Qty {qty}</p>
                              </div>
                              <p className="text-sm tabular-nums">${product.price * qty}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromBag(id)}
                              className="flex w-fit items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-burgundy"
                            >
                              <FiTrash2 className="size-3" /> Remove
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {bagItems.length > 0 ? (
                <div className="border-t border-ink/10 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-semibold tabular-nums">
                      $
                      {bagItems.reduce((total, [id, qty]) => {
                        const product = products.find((item) => item.id === id);
                        return total + (product ? product.price * qty : 0);
                      }, 0)}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-pill bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-ember"
                  >
                    Enquire to order
                  </Link>
                  <p className="mt-3 text-center text-[10px] text-muted">
                    Demo storefront — checkout is not connected.
                  </p>
                </div>
              ) : null}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
