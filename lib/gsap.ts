"use client";

/**
 * Single GSAP entry point.
 *
 * Registering plugins in one module prevents the "plugin already registered"
 * warnings that appear when several components import GSAP directly.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // A single lag threshold keeps Lenis + ScrollTrigger in sync on heavy frames.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, useGSAP };

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
