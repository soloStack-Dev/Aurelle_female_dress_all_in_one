"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type SplitHeadingProps = {
  /** Plain text, split into words for the mask reveal. */
  text: string;
  /** Optional word rendered in italic accent styling. */
  accent?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Use a scrub-free entrance (default) or a scroll-scrubbed reveal. */
  once?: boolean;
  delay?: number;
};

/**
 * Editorial heading with a word-by-word mask reveal.
 *
 * Splitting in React (instead of a DOM plugin) keeps SSR output complete for
 * SEO and avoids layout shift: the text is always in the HTML, only the inner
 * spans move.
 */
export default function SplitHeading({
  text,
  accent,
  as: Tag = "h2",
  className,
  once = true,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      gsap.fromTo(
        ref.current.querySelectorAll("[data-word]"),
        { yPercent: 120, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.045,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => {
        const isAccent = accent?.toLowerCase() === word.replace(/[^\p{L}]/gu, "").toLowerCase();
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <span
              data-word
              className={isAccent ? "inline-block italic text-ember" : "inline-block"}
            >
              {word}
            </span>
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
