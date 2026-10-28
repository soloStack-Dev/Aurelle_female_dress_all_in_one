"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PillButton from "@/components/ui/PillButton";
import Reveal from "@/components/ui/Reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Brand story block. The smaller, overlapping photograph drifts against the
 * scroll direction for a subtle editorial parallax.
 */
export default function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !driftRef.current || prefersReducedMotion()) return;

      gsap.fromTo(
        driftRef.current,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="shell py-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="relative mr-6 sm:mr-16 lg:mr-10">
          <Reveal y={40}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-frame bg-sand">
              <Image
                src="/images/editorial/editorial-01.jpg"
                alt="Aurelle editorial campaign image"
                fill
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
            </div>
          </Reveal>

          <div
            ref={driftRef}
            className="absolute -bottom-12 right-0 w-36 overflow-hidden rounded-card border-[6px] border-cream shadow-card sm:-right-10 sm:w-52"
          >
            <div className="relative aspect-[3/4] bg-sand">
              <Image
                src="/images/editorial/editorial-02.jpg"
                alt="Model in an Aurelle evening look"
                fill
                sizes="(max-width: 640px) 40vw, 220px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -left-3 top-8 hidden rounded-full border border-ink/10 bg-cream/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur sm:block">
            Atelier no. 18
          </div>
        </div>

        <div className="lg:pl-6">
          <Reveal>
            <span className="eyebrow">Our philosophy</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-5 text-balance">
              Clothes for the life you actually{" "}
              <span className="italic text-ember">live</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg mt-6">
              Aurelle began with a simple frustration: occasion wear that only works for one
              occasion, and swimwear that asks you to be someone else. We design the opposite —
              pieces that move from a morning swim to a late dinner without a costume change.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Every shape is developed in our Paris atelier over three toiles, then produced in
              limited runs with mills we have worked with for years. Nothing is designed to be
              disposable.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="mt-8 border-l-2 border-ember pl-6">
              <p className="font-display text-2xl leading-snug italic text-ink">
                “Elegance is not being noticed. It is being remembered.”
              </p>
              <footer className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                — Elise Marchand, Creative Director
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <PillButton href="/about" variant="outline">
                Read our story
              </PillButton>
              <Link
                href="/blog/behind-the-atelier"
                className="link-underline text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Inside the atelier <FiArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
