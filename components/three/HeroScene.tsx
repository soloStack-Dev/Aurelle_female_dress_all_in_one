"use client";

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Timer,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";

type DistortShader = {
  uniforms: { uTime: { value: number } };
};

type FloatingMesh = {
  mesh: Mesh;
  baseY: number;
  baseRotationX: number;
  phase: number;
  speed: number;
  wobble: number;
};

/**
 * Decorative Three.js layer for the hero.
 *
 * The scene is intentionally framework-free: three.js owns the canvas, the
 * render loop and its own `Timer`. This keeps the animation deterministic and
 * avoids the deprecated `THREE.Clock` that React Three Fiber still creates
 * internally on three r183+.
 */
export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(new Color(0x000000), 0);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.className = "block h-full w-full";
    container.appendChild(renderer.domElement);

    // Lighting mirrors the warm editorial palette used across the site.
    scene.add(new AmbientLight(0xffffff, 0.7));

    const keyLight = new DirectionalLight(0xf7f2ea, 2.1);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const emberLight = new PointLight(0xd4552d, 22, 12);
    emberLight.position.set(-4, -2, 3);
    scene.add(emberLight);

    const wineLight = new PointLight(0x6c1b2b, 12, 12);
    wineLight.position.set(4, 2, -2);
    scene.add(wineLight);

    const group = new Group();
    scene.add(group);

    const floating: FloatingMesh[] = [];

    // Burgundy distorted sphere: onBeforeCompile adds a subtle organic ripple.
    let distortShader: DistortShader | null = null;
    const sphereMaterial = new MeshStandardMaterial({
      color: 0x6c1b2b,
      roughness: 0.28,
      metalness: 0.35,
    });
    sphereMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        float ripple = sin(position.x * 2.8 + uTime * 1.05)
          * cos(position.y * 2.3 + uTime * 0.85)
          * sin(position.z * 2.6 - uTime * 0.7);
        transformed += normal * ripple * 0.16;`,
      );
      distortShader = shader as unknown as DistortShader;
    };

    const sphere = new Mesh(new SphereGeometry(1, 64, 64), sphereMaterial);
    sphere.position.set(-1.55, 0.65, -1.6);
    sphere.scale.setScalar(1.45);
    group.add(sphere);
    floating.push({
      mesh: sphere,
      baseY: sphere.position.y,
      baseRotationX: sphere.rotation.x,
      phase: 0,
      speed: 1.1,
      wobble: 0.35,
    });

    const emberRing = new Mesh(
      new TorusGeometry(0.95, 0.06, 24, 120),
      new MeshStandardMaterial({ color: 0xd4552d, roughness: 0.2, metalness: 0.65 }),
    );
    emberRing.position.set(1.7, -1.15, -0.6);
    emberRing.rotation.set(0.9, 0.2, 0.4);
    group.add(emberRing);
    floating.push({
      mesh: emberRing,
      baseY: emberRing.position.y,
      baseRotationX: emberRing.rotation.x,
      phase: 1.4,
      speed: 1.4,
      wobble: 0.6,
    });

    const champagneRing = new Mesh(
      new TorusGeometry(1.35, 0.018, 16, 140),
      new MeshStandardMaterial({ color: 0xeadcc9, roughness: 0.4, metalness: 0.3 }),
    );
    champagneRing.position.set(-0.35, -1.5, 0.4);
    champagneRing.rotation.set(1.2, 0.4, -0.3);
    group.add(champagneRing);
    floating.push({
      mesh: champagneRing,
      baseY: champagneRing.position.y,
      baseRotationX: champagneRing.rotation.x,
      phase: 2.8,
      speed: 0.9,
      wobble: 0.4,
    });

    const pearl = new Mesh(
      new SphereGeometry(1, 32, 32),
      new MeshStandardMaterial({ color: 0xf7f2ea, roughness: 0.15, metalness: 0.15 }),
    );
    pearl.position.set(1.25, 1.35, -0.2);
    pearl.scale.setScalar(0.28);
    group.add(pearl);
    floating.push({
      mesh: pearl,
      baseY: pearl.position.y,
      baseRotationX: pearl.rotation.x,
      phase: 4.1,
      speed: 1.6,
      wobble: 0.2,
    });

    const knot = new Mesh(
      new TorusKnotGeometry(0.62, 0.17, 160, 24),
      new MeshStandardMaterial({ color: 0x3d0c16, roughness: 0.35, metalness: 0.5 }),
    );
    knot.position.set(0.55, 1.6, -2.4);
    knot.scale.setScalar(0.9);
    group.add(knot);
    floating.push({
      mesh: knot,
      baseY: knot.position.y,
      baseRotationX: knot.rotation.x,
      phase: 5.3,
      speed: 0.8,
      wobble: 0.3,
    });

    // Champagne dust behind the photograph.
    const dustGeometry = new BufferGeometry();
    const positions = new Float32Array(34 * 3);
    for (let index = 0; index < 34; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 8;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    dustGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    const dustMaterial = new PointsMaterial({
      color: 0xeadcc9,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const dust = new Points(dustGeometry, dustMaterial);
    group.add(dust);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const timer = new Timer();
    timer.connect(document);

    const render = () => renderer.render(scene, camera);
    let frame = 0;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      if (reduceMotion) render();
    };

    const loop = (timestamp: number) => {
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();

      if (distortShader) distortShader.uniforms.uTime.value = elapsed;

      group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.03;
      group.rotation.x += (-pointer.y * 0.2 - group.rotation.x) * 0.03;

      for (const item of floating) {
        const wave = elapsed * item.speed + item.phase;
        item.mesh.position.y = item.baseY + Math.sin(wave) * 0.1;
        item.mesh.rotation.x = item.baseRotationX + Math.sin(wave * 0.6) * 0.08 * item.wobble;
      }

      emberRing.rotation.z += delta * 0.18;
      knot.rotation.y += delta * 0.12;
      dust.rotation.y = elapsed * 0.02;
      dustMaterial.opacity = 0.42 + Math.sin(elapsed * 0.8) * 0.12;

      render();
      frame = window.requestAnimationFrame(loop);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    if (!reduceMotion) frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      timer.dispose();

      scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      dustGeometry.dispose();
      dustMaterial.dispose();

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
