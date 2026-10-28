import Link from "next/link";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { PiPinterestLogo } from "react-icons/pi";
import { collections, navigation, site } from "@/lib/data/site";

const socialIcons = {
  Instagram: FiInstagram,
  Pinterest: PiPinterestLogo,
  TikTok: FaTiktok,
} as const;

const columns = [
  {
    title: "Shop",
    links: collections.slice(0, 5).map((collection) => ({
      label: collection.name,
      href: `/collection?category=${encodeURIComponent(collection.name)}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Membership", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Client care",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Shipping", href: "/contact" },
      { label: "Returns", href: "/contact" },
    ],
  },
];

/**
 * `Date` is unstable output under Cache Components, so the copyright year is
 * computed inside a cached function instead of during the prerender pass.
 */
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

/**
 * Editorial footer. The oversized wordmark is decorative and intentionally
 * clipped by the page edge; the accessible brand link lives above it.
 */
export default async function SiteFooter() {
  const year = await copyrightYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="shell pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Link href="/" className="font-display text-3xl tracking-[0.18em]" aria-label={`${site.name} home`}>
              {site.name}
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Modern heirlooms for the woman who dresses for herself. Designed in Paris,
              made in small batches.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cream/80"
            >
              <FiMail className="size-3.5" /> {site.email}
            </a>

            <div className="mt-8 flex gap-2">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-ember hover:bg-ember hover:text-cream"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/40">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/70 transition-colors hover:text-ember"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 py-6 text-[11px] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-cream">
                {item.label}
              </Link>
            ))}
            <a href="#main" className="inline-flex items-center gap-1 transition-colors hover:text-cream">
              Back to top <FiArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="shell -mb-[0.18em] translate-y-[0.08em] font-display text-[clamp(5rem,21vw,19rem)] leading-[0.72] tracking-[0.02em] text-cream/[0.07]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
