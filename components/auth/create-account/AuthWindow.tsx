"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import WireTerrain from "@/components/three/WireTerrain";
import SignupForm from "./SignupForm";
import TestimonialPanel from "./TestimonialPanel";

export default function AuthWindow() {
  const windowRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from("[data-auth-window]", {
          opacity: 0,
          y: 22,
          scale: 0.97,
          duration: 0.7,
        })
        .from(
          "[data-auth-bar]",
          {
            opacity: 0,
            y: -8,
            duration: 0.45,
          },
          "-=0.42",
        )
        .from(
          "[data-auth-reveal]",
          {
            opacity: 0,
            y: 14,
            duration: 0.55,
            stagger: 0.07,
          },
          "-=0.3",
        );
    },
    { scope: windowRef },
  );

  return (
    <div className="auth-create relative min-h-dvh overflow-hidden">
      <div
        className="auth-page-mesh pointer-events-none absolute -bottom-[12%] -right-[8%] h-[66%] w-[88%] opacity-90"
        aria-hidden="true"
      >
        <WireTerrain
          className="absolute inset-0"
          color="#ffffff"
          opacity={0.8}
        />
      </div>

      <div className="relative z-10 flex min-h-dvh items-center justify-center px-3 pb-28 pt-3 sm:px-5 sm:pt-5 md:py-5 lg:px-8">
        <section
          ref={windowRef}
          data-auth-window
          className="auth-create-window flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[24px] border border-white/60 bg-[#f7f5f2] md:h-[min(86vh,720px)] md:min-h-[560px] md:rounded-[28px]"
        >
          <div
            data-auth-bar
            className="hidden h-[42px] shrink-0 grid-cols-[86px_1fr_86px] items-center border-b border-[#e7e2dc] px-4 sm:grid-cols-[130px_1fr_130px] sm:px-5 md:grid md:h-[46px]"
          >
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-[9px] rounded-full bg-[#ee6a5f]" />
              <span className="size-[9px] rounded-full bg-[#f3bf4f]" />
              <span className="size-[9px] rounded-full bg-[#61c454]" />
            </div>
            <div
              className="mx-auto h-[22px] w-full max-w-[300px] rounded-[5px] border border-[#e8e3dd] bg-white/60"
              aria-hidden="true"
            />
            <div aria-hidden="true" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <div className="min-h-0 flex-1 overflow-y-auto md:w-[40%] md:flex-none lg:w-[36%]">
              <SignupForm />
            </div>
            <TestimonialPanel className="m-3 mt-2.5 h-[230px] md:m-4 md:ml-0 md:h-auto md:min-h-0 md:flex-1" />
          </div>
        </section>
      </div>
    </div>
  );
}


