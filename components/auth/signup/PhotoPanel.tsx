"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { LuLeaf } from "react-icons/lu";
import type { AuthSlide } from "@/lib/data/auth";

export default function PhotoPanel({
  slides,
  active,
  className = "",
  onMouseEnter,
  onMouseLeave,
}: {
  slides: AuthSlide[];
  active: number;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const slide = slides[active] ?? slides[0];

  return (
    <div
      className={`relative overflow-hidden bg-[#2a201b] ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={active === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_34%]"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-2xl bg-black/45 px-3.5 py-3 text-xs leading-snug text-white backdrop-blur-md sm:bottom-4 sm:left-4">
        <span className="grid size-8 place-items-center rounded-full border border-white/40">
          <LuLeaf className="size-4" aria-hidden="true" />
        </span>
        <p>
          Stay focused.
          <br />
          Grow every day.
        </p>
      </div>
    </div>
  );
}
