"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * Slow rotating sunburst accent. anime.js owns this decorative loop (GSAP owns
 * scroll, Three.js owns 3D), so no two engines fight over the same transform.
 */
export default function Sunburst({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = animate(node, {
      rotate: 360,
      duration: 28000,
      loop: true,
      ease: "linear",
    });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <line
          key={index}
          x1="50"
          y1="50"
          x2="50"
          y2={index % 2 === 0 ? "6" : "20"}
          transform={`rotate(${index * 22.5} 50 50)`}
          strokeLinecap="round"
        />
      ))}
      <circle cx="50" cy="50" r="4" />
    </svg>
  );
}
