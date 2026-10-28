import type { Metadata } from "next";
import { FiCheck, FiMinus } from "react-icons/fi";
import PageHeader from "@/components/layout/PageHeader";
import Accordion from "@/components/ui/Accordion";
import PillButton from "@/components/ui/PillButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";
import { plans, pricingFaqs, site } from "@/lib/data/site";

export const metadata: Metadata = createMetadata({
  title: "Membership",
  description:
    "Join the Aurelle membership for early access, member pricing, personal styling and made-to-measure fittings. Compare Essential, Premium and Exclusive.",
  path: "/pricing",
  image: "/images/editorial/editorial-01.jpg",
});

const comparison = [
  { label: "Early access to new collections", tiers: [true, true, true] },
  { label: "Seasonal style edit", tiers: [true, true, true] },
  { label: "48-hour priority access", tiers: [false, true, true] },
  { label: "10% member pricing", tiers: [false, true, true] },
  { label: "Personal styling consultation", tiers: [false, true, true] },
  { label: "Complimentary express shipping", tiers: [false, true, true] },
  { label: "Made-to-measure fittings", tiers: [false, false, true] },
  { label: "Private atelier appointments", tiers: [false, false, true] },
  { label: "Dedicated client concierge", tiers: [false, false, true] },
];

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Membership", item: `${site.url}/pricing` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        eyebrow="Membership"
        title={
          <>
            More access. <span className="italic text-ember">Less</span> noise.
          </>
        }
        description="Three ways to stay close to the atelier. Start free, upgrade when the wardrobe (or the calendar) calls for it."
      />

      <section className="shell pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const featured = Boolean(plan.featured);
            return (
              <Reveal key={plan.name} delay={index * 0.07} y={40}>
                <div
                  className={`flex h-full flex-col rounded-frame border p-7 sm:p-8 ${
                    featured
                      ? "border-ink bg-ink text-cream shadow-soft lg:-translate-y-3"
                      : "border-ink/15 bg-card text-ink"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl">{plan.name}</h2>
                    {featured ? (
                      <span className="rounded-pill bg-ember px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-cream">
                        Most chosen
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      featured ? "text-cream/65" : "text-muted"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-7 flex items-baseline gap-1.5">
                    <span className="font-display text-5xl">${plan.price}</span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.14em] ${
                        featured ? "text-cream/50" : "text-muted"
                      }`}
                    >
                      {plan.cadence}
                    </span>
                  </div>

                  <div
                    className={`my-7 h-px w-full ${featured ? "bg-cream/15" : "bg-ink/10"}`}
                  />

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <FiCheck
                          className={`mt-0.5 size-3.5 shrink-0 ${
                            featured ? "text-ember" : "text-ember"
                          }`}
                          aria-hidden="true"
                        />
                        <span className={featured ? "text-cream/75" : "text-ink/75"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <PillButton
                      href={`/contact?plan=${plan.name}`}
                      variant={featured ? "light" : plan.price === 0 ? "outline" : "solid"}
                      className="w-full justify-between"
                    >
                      {plan.cta}
                    </PillButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[10px] text-muted">
          Demo memberships — no payment is taken and no subscription is created.
        </p>
      </section>

      {/* Comparison ------------------------------------------------------- */}
      <section className="shell pb-24">
        <SectionHeading
          eyebrow="Compare"
          title="The details, side by"
          accent="side"
          description="Every tier includes the seasonal edit and early access. The rest is about how close you want to be to the atelier."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <caption className="sr-only">Membership tier comparison</caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="py-4 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Benefit
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className="px-4 py-4 text-center font-display text-lg"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-ink/10">
                    <th scope="row" className="py-4 pr-4 text-xs font-medium text-ink/80">
                      {row.label}
                    </th>
                    {row.tiers.map((included, index) => (
                      <td key={`${row.label}-${index}`} className="px-4 py-4 text-center">
                        {included ? (
                          <>
                            <FiCheck className="mx-auto size-4 text-ember" aria-hidden="true" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : (
                          <>
                            <FiMinus className="mx-auto size-4 text-ink/20" aria-hidden="true" />
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section className="shell pb-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Everything you might"
            accent="ask"
            description="Still unsure? Write to us and a real person will answer."
          />
          <Reveal delay={0.1}>
            <Accordion items={pricingFaqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA -------------------------------------------------------------- */}
      <section className="bg-ink py-20 text-cream">
        <div className="shell flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="display-md max-w-2xl text-balance">
              Start with the free list. Upgrade only if it earns it.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-wrap justify-center gap-4">
              <PillButton href="/contact" variant="light">
                Join the list
              </PillButton>
              <PillButton href="/collection" variant="outlineLight">
                Browse first
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
