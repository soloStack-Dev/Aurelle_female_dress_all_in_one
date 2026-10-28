import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

/**
 * Consistent section header: eyebrow label + split heading + optional copy.
 * Server component so the copy is fully present in the HTML for crawlers.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-5 ${alignment} ${className}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitHeading
        as="h2"
        text={title}
        accent={accent}
        className="display-lg max-w-3xl text-balance"
      />
      {description ? (
        <Reveal delay={0.1}>
          <p className={`body-lg max-w-xl ${align === "center" ? "mx-auto" : ""}`}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
