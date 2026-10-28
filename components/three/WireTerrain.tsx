"use client";

import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  Timer,
  WebGLRenderer,
} from "three";

const COLS = 44;
const ROWS = 26;
const WIDTH = 16;
const HEIGHT = 9;

export default function WireTerrain({
  className = "",
  color = "#ffffff",
  opacity = 0.6,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    if (fallbackRef.current) fallbackRef.current.style.display = "none";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 2.4, 6);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(new Color(0x000000), 0);
    renderer.domElement.className = "relative block h-full w-full";
    container.appendChild(renderer.domElement);

    const count = (COLS + 1) * (ROWS + 1);
    const positions = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const baseY = new Float32Array(count);
    const indices: number[] = [];

    for (let row = 0; row <= ROWS; row += 1) {
      for (let col = 0; col <= COLS; col += 1) {
        const index = row * (COLS + 1) + col;
        const x = (col / COLS - 0.5) * WIDTH;
        const y = (row / ROWS - 0.5) * HEIGHT;
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = 0;
        baseX[index] = x;
        baseY[index] = y;

        if (col < COLS) indices.push(index, index + 1);
        if (row < ROWS) indices.push(index, index + COLS + 1);
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    const positionAttribute = geometry.getAttribute("position") as BufferAttribute;

    const material = new LineBasicMaterial({
      color: new Color(color),
      transparent: true,
      opacity,
      depthWrite: false,
    });

    const mesh = new LineSegments(geometry, material);
    mesh.rotation.set(-Math.PI / 2.35, 0, 0);
    mesh.position.set(0, -1.4, 0);
    scene.add(mesh);

    const update = (elapsed: number) => {
      const time = elapsed * 0.35;
      for (let index = 0; index < count; index += 1) {
        const x = baseX[index];
        const y = baseY[index];
        const z =
          Math.sin(x * 0.55 + time) * 0.45 +
          Math.cos(y * 0.9 + time * 0.8) * 0.3;
        positionAttribute.setZ(index, z);
      }
      positionAttribute.needsUpdate = true;
    };

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    update(0);
    resize();

    if (reduceMotion) {
      return () => {
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    const timer = new Timer();
    timer.connect(document);
    let frame = 0;

    const loop = (timestamp: number) => {
      timer.update(timestamp);
      update(timer.getElapsed());
      render();
      frame = window.requestAnimationFrame(loop);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!frame) frame = window.requestAnimationFrame(loop);
        } else if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "160px" },
    );
    intersectionObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(frame);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      timer.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [color, opacity]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        ref={fallbackRef}
        className="auth-create-grid absolute inset-0 opacity-50"
      />
    </div>
  );
}
