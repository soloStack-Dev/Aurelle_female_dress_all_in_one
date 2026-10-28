import type { Metadata } from "next";
import Image from "next/image";
import { FiClock, FiMail, FiPhone } from "react-icons/fi";
import PageHeader from "@/components/layout/PageHeader";
import AtelierMap from "@/components/contact/AtelierMap";
import ContactForm from "@/components/contact/ContactForm";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";
import { contactFaqs, site } from "@/lib/data/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Questions about sizing, an order or a membership? Contact the Aurelle atelier in Paris by email, phone or the enquiry form.",
  path: "/contact",
  image: "/images/asserts/contact/contact-main-section.jpg",
});

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${site.coordinates.lat},${site.coordinates.lng}`;

export default function ContactPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: site.legalName,
      email: site.email,
      telephone: site.phone,
      address: site.address,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="italic text-ember">talk</span>.
          </>
        }
        description="Sizing, an order, a membership or a press request — a real person in the atelier reads every note."
        image="/images/asserts/contact/contact-main-section.jpg"
        imageAlt="Aurelle atelier in Paris"
        meta="Atelier no. 18 — Paris"
      />

      <section className="shell pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Details */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="grid gap-5 rounded-frame border border-ink/10 bg-card p-7">
                <div className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-cream">
                    <FiMail className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline mt-1 text-sm font-semibold"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-cream">
                    <FiPhone className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Phone
                    </p>
                    <a
                      href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                      className="link-underline mt-1 text-sm font-semibold"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-cream">
                    <FiClock className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Studio hours
                    </p>
                    <p className="mt-1 text-sm">{site.hours}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-frame border border-ink/10 bg-card">
                <AtelierMap
                  latitude={site.coordinates.lat}
                  longitude={site.coordinates.lng}
                  label={site.name}
                  address={site.address}
                />
                <div className="flex flex-wrap items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      The atelier
                    </p>
                    <p className="mt-1.5 max-w-xs text-sm leading-relaxed">{site.address}</p>
                  </div>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-[10px] font-semibold uppercase tracking-[0.14em] text-ember"
                  >
                    Open in maps
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-frame border border-ink/10 bg-sand/40 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Follow along
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {site.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline text-sm text-ink/75"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={40}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ -------------------------------------------------------------- */}
      <section id="faq" className="shell pb-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Client care"
            title="Answers, before you"
            accent="ask"
            description="Shipping, returns, sizing and alterations — the questions we answer most."
          />
          <Reveal delay={0.1}>
            <Accordion items={contactFaqs} />
          </Reveal>
        </div>
      </section>

      {/* Inside the atelier ----------------------------------------------- */}
      <section className="shell pb-24">
        <Reveal>
          <p className="eyebrow">Inside the atelier</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-md mt-4 max-w-xl text-balance">
            A quiet corner of the <span className="italic text-ember">11th</span>.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <Reveal y={36}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-frame bg-sand">
              <Image
                src="/images/asserts/contact/contact-sub-section.jpg"
                alt="Aurelle atelier portrait"
                fill
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} y={36}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-frame bg-sand">
              <Image
                src="/images/asserts/contact/contact-next-sub-section.jpg"
                alt="Aurelle studio detail"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
