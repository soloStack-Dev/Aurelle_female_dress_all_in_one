"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

/**
 * The Three.js canvas is browser-only, so it is loaded with `ssr: false` from
 * a Client Component. A WebGL capability check means unsupported devices get
 * a static gradient instead of a broken canvas.
 */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

let cachedSupport: boolean | null = null;

function supportsWebGL() {
  if (cachedSupport !== null) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    cachedSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

// No external events to subscribe to: capability is stable for the session.
function subscribe() {
  return () => undefined;
}

export default function HeroVisual() {
  // useSyncExternalStore reads the capability without a setState-in-effect,
  // and the server snapshot (false) keeps hydration deterministic.
  const supported = useSyncExternalStore(subscribe, supportsWebGL, () => false);

  if (!supported) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(60%_60%_at_30%_30%,rgba(108,27,43,0.55),transparent_70%),radial-gradient(50%_50%_at_80%_70%,rgba(212,85,45,0.45),transparent_70%)]"
      />
    );
  }

  return (
    <div className="absolute inset-0">
      <HeroScene />
    </div>
  );
}
