import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type Variant = "solid" | "outline" | "outlineLight" | "light";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-cream hover:bg-ember",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  outlineLight:
    "border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  light: "bg-cream text-ink hover:bg-ember hover:text-cream",
};

/**
 * Shared call-to-action pill. The arrow circle is decorative, so it is
 * `aria-hidden`; the link text carries the accessible name.
 */
export default function PillButton({
  href,
  children,
  variant = "solid",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-pill px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-full border border-current/30 transition-transform duration-300 group-hover:rotate-45"
        >
          <FiArrowUpRight className="size-3.5" />
        </span>
      ) : null}
    </Link>
  );
}
