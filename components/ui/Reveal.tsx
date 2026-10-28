"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Distance (px) the content travels upward. */
  y?: number;
};

/**
 * Scroll-triggered entrance wrapper.
 *
 * `useGSAP` runs in a layout effect, so the "from" state is applied before the
 * browser paints (no flash of un-animated content). Reduced-motion visitors
 * skip the animation entirely and see the content immediately.
 */
export default function Reveal({ children, className, delay = 0, y = 34 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
