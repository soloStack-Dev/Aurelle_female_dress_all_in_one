"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiArrowDown } from "react-icons/fi";
import HeroVisual from "@/components/hero/HeroVisual";
import PillButton from "@/components/ui/PillButton";
import Sunburst from "@/components/ui/Sunburst";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Opening scene: editorial type on the left, a masked campaign image with a
 * live 3D sculpture bleeding out behind it on the right.
 *
 * Animation ownership is deliberately split:
 * - GSAP: load-in timeline, image clip reveal, scroll parallax
 * - Three.js: the floating sculpture and champagne dust
 * - anime.js: the rotating sunburst badge
 * Reduced-motion visitors get the final composed layout with no tweens.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero='eyebrow']", { y: 18, autoAlpha: 0, duration: 0.8 }, 0.1)
        .from(
          "[data-hero-line]",
          { yPercent: 118, duration: 1.15, stagger: 0.1, ease: "power4.out" },
          0.18,
        )
        .fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.4, ease: "power4.inOut" },
          0.25,
        )
        .from("[data-hero='copy']", { y: 24, autoAlpha: 0, duration: 0.9 }, 0.7)
        .from("[data-hero='actions']", { y: 20, autoAlpha: 0, duration: 0.8 }, 0.82)
        .from("[data-hero='stats']", { y: 18, autoAlpha: 0, duration: 0.8 }, 0.92)
        .from(cardRef.current, { y: 26, autoAlpha: 0, scale: 0.94, duration: 0.9 }, 1.15)
        .from(badgeRef.current, { scale: 0.6, autoAlpha: 0, duration: 1, ease: "back.out(1.6)" }, 1.25);

      // Gentle parallax: the image and decorative blobs drift at different rates.
      gsap.to(imageRef.current, {
        y: -48,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-blob]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-24 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      {/* Ambient colour fields */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-blob
          className="absolute -right-24 top-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(212,85,45,0.16),transparent_65%)] blur-2xl"
        />
        <div
          data-blob
          className="absolute -left-32 bottom-0 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(108,27,43,0.14),transparent_65%)] blur-2xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_70%,rgba(234,220,201,0.45))]" />
      </div>

      <div className="shell grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        {/* Copy ----------------------------------------------------------- */}
        <div className="relative z-10 max-w-2xl">
          <p data-hero="eyebrow" className="eyebrow">
            Summer 2026 · The resort edit
          </p>

          <h1 id="hero-heading" className="display-xl mt-6 text-balance">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Own
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                your
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero-line className="block italic text-ember">summer.</span>
            </span>
          </h1>

          <p data-hero="copy" className="body-lg mt-7 max-w-lg">
            Dresses, swim and after-dark pieces cut for real bodies and long, unhurried
            days. Designed in Paris, made in limited runs, kept for years.
          </p>

          <div data-hero="actions" className="mt-9 flex flex-wrap items-center gap-4">
            <PillButton href="/collection">Shop the collection</PillButton>
            <PillButton href="/about" variant="outline" arrow={false}>
              Our philosophy
            </PillButton>
          </div>

          <dl
            data-hero="stats"
            className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-6"
          >
            {[
              { value: "24k", label: "Clients styled" },
              { value: "38", label: "Countries shipped" },
              { value: "4.9", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual --------------------------------------------------------- */}
        <div className="relative mx-auto w-full max-w-[31rem] lg:max-w-[35rem]">
          {/* 3D sculpture bleeds past the photo edges */}
          <div aria-hidden="true" className="absolute -inset-10 z-0 sm:-inset-16">
            <HeroVisual />
          </div>

          <div
            ref={imageRef}
            className="relative z-10 arch-mask aspect-[3/4] bg-sand shadow-soft"
          >
            <Image
              src="/images/hero/hero-model.jpg"
              alt="Aurelle summer campaign look"
              fill
              preload
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-cream">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cream/70">
                Campaign 01 — Positano
              </p>
              <p className="font-display text-lg italic">La dolce vita</p>
            </div>
          </div>

          {/* Floating product note */}
          <div
            ref={cardRef}
            className="absolute -left-3 top-10 z-20 w-40 rounded-2xl border border-cream/40 bg-cream/85 p-4 shadow-card backdrop-blur-xl sm:-left-8 sm:w-48"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ember">
              The Solene
            </p>
            <p className="mt-1.5 font-display text-lg leading-tight">Bias-cut silk slip</p>
            <p className="mt-2 text-[11px] text-muted">$248 · 3 colourways</p>
          </div>

          {/* Rotating season badge */}
          <div
            ref={badgeRef}
            className="absolute -bottom-5 -right-2 z-20 grid size-24 place-items-center rounded-full border border-ink/10 bg-cream/90 text-ink shadow-card backdrop-blur-md sm:-right-6 sm:size-28"
          >
            <Sunburst className="absolute inset-2 size-[calc(100%-1rem)] text-ember/50" />
            <div className="relative text-center">
              <p className="font-display text-xl leading-none">SS</p>
              <p className="mt-0.5 text-[9px] font-semibold tracking-[0.18em]">2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="shell mt-16 hidden lg:block">
        <a
          href="#signature"
          className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-ember"
        >
          <span className="grid size-9 place-items-center rounded-full border border-ink/15 transition-transform duration-300 group-hover:translate-y-1">
            <FiArrowDown className="size-4" />
          </span>
          Scroll to discover
        </a>
      </div>
    </section>
  );
}
