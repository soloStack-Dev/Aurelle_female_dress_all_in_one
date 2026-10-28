import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * Shared inner-page masthead.
 *
 * Text-only pages get a wide editorial statement; pages with imagery get a
 * two-column masthead with the same arch motif used on the home page.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  meta,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(212,85,45,0.12),transparent_70%)]"
      />

      <div className="shell">
        {image ? (
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <Reveal>
                <span className="eyebrow">{eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display-xl mt-5 max-w-3xl text-balance">{title}</h1>
              </Reveal>
              {description ? (
                <Reveal delay={0.1}>
                  <p className="body-lg mt-6 max-w-xl">{description}</p>
                </Reveal>
              ) : null}
              {children ? <Reveal delay={0.15}>{children}</Reveal> : null}
            </div>

            <Reveal delay={0.12} y={40}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-frame bg-sand shadow-soft lg:max-w-none">
                <Image
                  src={image}
                  alt={imageAlt ?? ""}
                  fill
                  preload
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                {meta ? (
                  <p className="absolute inset-x-5 bottom-5 text-[10px] uppercase tracking-[0.2em] text-cream/80">
                    {meta}
                  </p>
                ) : null}
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <Reveal>
                <span className="eyebrow">{eyebrow}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display-xl mt-5 max-w-4xl text-balance">{title}</h1>
              </Reveal>
            </div>
            <div>
              {description ? (
                <Reveal delay={0.1}>
                  <p className="body-lg max-w-md">{description}</p>
                </Reveal>
              ) : null}
              {children ? (
                <Reveal delay={0.15}>
                  <div className="mt-6">{children}</div>
                </Reveal>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
