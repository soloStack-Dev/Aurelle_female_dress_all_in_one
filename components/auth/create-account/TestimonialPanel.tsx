"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { authTestimonials } from "@/lib/data/auth";
import WireTerrain from "@/components/three/WireTerrain";
import BrandMark from "./BrandMark";

export default function TestimonialPanel({
  className = "",
}: {
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  useEffect(() => {
    const onVisibilityChange = () => setPageHidden(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (hovered || pageHidden) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % authTestimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [active, hovered, pageHidden]);

  const next = () =>
    setActive((current) => (current + 1) % authTestimonials.length);
  const previous = () =>
    setActive(
      (current) =>
        (current - 1 + authTestimonials.length) % authTestimonials.length,
    );

  const testimonial = authTestimonials[active];

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] rounded-br-[30px] bg-[#b39c8a] md:rounded-[22px] md:rounded-br-[36px] ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={testimonial.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={testimonial.src}
            alt={testimonial.alt}
            fill
            sizes="(max-width: 767px) 100vw, 48vw"
            priority={active === 0}
            className="auth-testimonial-photo object-cover object-[58%_32%]"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,13,11,0.82)_0%,rgba(16,13,11,0.34)_48%,rgba(16,13,11,0.08)_100%)]"
        aria-hidden="true"
      />

      <WireTerrain
        className="auth-testimonial-mesh pointer-events-none absolute inset-x-0 bottom-0 h-[56%]"
        color="#ffffff"
        opacity={0.72}
      />

      <BrandMark className="absolute left-5 top-5 size-7 text-white sm:left-6 sm:top-6" />

      <figure className="absolute inset-x-0 bottom-0 p-5 pb-5 sm:p-6 sm:pb-6 md:p-7 lg:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <span
              className="hidden font-serif text-[54px] leading-[0.6] text-white/55 sm:block"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="auth-create-quote mt-1 max-w-[620px] text-[15px] font-medium leading-[1.4] tracking-[-0.01em] text-white sm:text-[18px] md:text-[24px] lg:text-[27px]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-end justify-between gap-4 sm:mt-5">
              <figcaption>
                <p className="text-[12px] font-semibold text-white sm:text-[13px]">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 text-[10px] text-white/68 sm:text-[11px]">
                  {testimonial.role}
                </p>
              </figcaption>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-6 sm:right-6 md:bottom-7 md:right-7 lg:bottom-8 lg:right-8">
          <motion.button
            type="button"
            onClick={previous}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Previous testimonial"
            className="grid size-8 place-items-center rounded-full border border-white/40 bg-black/10 text-white backdrop-blur-sm transition-colors hover:bg-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <FiArrowLeft className="size-3.5" aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            onClick={next}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Next testimonial"
            className="grid size-8 place-items-center rounded-full border border-white/40 bg-black/10 text-white backdrop-blur-sm transition-colors hover:bg-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <FiArrowRight className="size-3.5" aria-hidden="true" />
          </motion.button>
        </div>
      </figure>
    </div>
  );
}
