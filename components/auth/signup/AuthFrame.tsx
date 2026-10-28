"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { signupSlides } from "@/lib/data/auth";
import PhotoIndicator from "./PhotoIndicator";
import PhotoPanel from "./PhotoPanel";
import SeamNotch from "./SeamNotch";
import SignupForm from "./SignupForm";

export default function AuthFrame() {
  const frameRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .from("[data-auth-frame]", {
          opacity: 0,
          scale: 0.96,
          duration: 0.7,
        })
        .from(
          "[data-auth-photo]",
          {
            clipPath: "inset(0 100% 0 0)",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "-=0.35",
        )
        .from(
          "[data-auth-form]",
          {
            opacity: 0,
            y: 18,
            duration: 0.65,
          },
          "-=0.5",
        )
        .from(
          "[data-auth-item]",
          {
            opacity: 0,
            y: 16,
            duration: 0.55,
            stagger: 0.07,
          },
          "-=0.42",
        )
        .from(
          "[data-auth-notch]",
          {
            opacity: 0,
            x: -40,
            duration: 0.55,
          },
          "-=0.24",
        );
    },
    { scope: frameRef },
  );

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
      setActive((current) => (current + 1) % signupSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [active, hovered, pageHidden]);

  return (
    <div className="auth-signup flex min-h-dvh items-center justify-center p-3 sm:p-6 lg:p-8">
      <section
        ref={frameRef}
        data-auth-frame
        className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-2 rounded-[24px] bg-[#0e0e0e] p-2 shadow-[0_30px_80px_-34px_rgba(20,30,60,0.55)] sm:gap-2 sm:p-2 sm:rounded-[24px] md:h-[min(88vh,900px)] md:flex-row md:gap-3 md:rounded-[30px] md:p-3 lg:rounded-[36px]"
      >
        <div
          data-auth-photo
          className="relative shrink-0 md:h-full md:w-[49%]"
        >
          <div className="overflow-hidden rounded-[18px] md:h-full md:rounded-[28px]">
            <PhotoPanel
              slides={signupSlides}
              active={active}
              className="h-[28vh] min-h-[190px] max-h-[290px] w-full md:h-full md:max-h-none"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          </div>
          <div className="mt-2 flex justify-center md:hidden">
            <PhotoIndicator
              active={active}
              total={signupSlides.length}
              onSelect={setActive}
            />
          </div>
        </div>

        <div
          data-auth-form
          className="auth-signup-gradient flex min-h-0 flex-1 overflow-hidden rounded-[18px] md:h-full md:rounded-[28px]"
        >
          <SignupForm />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex lg:hidden">
          <div className="pointer-events-auto rounded-full bg-[#0e0e0e] px-3 py-2">
            <PhotoIndicator
              active={active}
              total={signupSlides.length}
              onSelect={setActive}
            />
          </div>
        </div>

        <SeamNotch
          active={active}
          total={signupSlides.length}
          onSelect={setActive}
        />
      </section>
    </div>
  );
}

