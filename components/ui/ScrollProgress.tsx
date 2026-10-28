"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Thin reading-progress bar pinned to the top of the viewport.
 * Scrubbed by ScrollTrigger, so it stays in sync with Lenis.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return;

    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.4,
        },
      },
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left scale-x-0 bg-ember"
      ref={ref}
    />
  );
}
