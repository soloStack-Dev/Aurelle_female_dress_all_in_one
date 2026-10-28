"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollControls = {
  stop: () => void;
  start: () => void;
  scrollToTop: () => void;
};

const SmoothScrollContext = createContext<ScrollControls>({
  stop: () => undefined,
  start: () => undefined,
  scrollToTop: () => undefined,
});

/** Lets overlays (mobile menu, modals) pause the smooth-scroll engine. */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reduced-motion users get native scrolling: no Lenis, no animation loop.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Lenis must update ScrollTrigger, and GSAP must drive Lenis' frame loop.
    // This is the single integration pattern recommended by both libraries.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start every new route at the top (also resets native scroll).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
    // Wait for layout (and late-loading images) before re-measuring triggers.
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);
  const scrollToTop = useCallback(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ stop, start, scrollToTop }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
