"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Interactive Leaflet map for the atelier.
 *
 * Leaflet touches `window` on import, so the library is loaded inside an effect
 * (client-only). Wheel zoom is disabled to avoid trapping the page scroll;
 * the visible +/- controls, dragging and keyboard still work.
 */
export default function AtelierMap({
  latitude,
  longitude,
  label,
  address,
}: {
  latitude: number;
  longitude: number;
  label: string;
  address: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: LeafletMap | null = null;
    let observer: ResizeObserver | null = null;
    let cancelled = false;

    import("leaflet")
      .then(({ default: L }) => {
        if (cancelled) return;

        map = L.map(container, {
          center: [latitude, longitude],
          zoom: 15,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const icon = L.divIcon({
          className: "atelier-marker",
          html: '<span class="atelier-marker__pulse"></span><span class="atelier-marker__dot"></span>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });

        L.marker([latitude, longitude], {
          icon,
          title: label,
          alt: `${label} — ${address}`,
        })
          .addTo(map)
          .bindPopup(`<strong>${label} Atelier</strong><br>${address}`)
          .openPopup();

        // Keep tiles aligned when the responsive layout changes.
        observer = new ResizeObserver(() => map?.invalidateSize());
        observer.observe(container);
      })
      .catch(() => {
        // A blocked tile/library request leaves the styled fallback background.
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      map?.remove();
      map = null;
    };
  }, [latitude, longitude, label, address]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Map showing ${label} atelier in Paris`}
      className="atelier-map relative isolate z-0 h-64 w-full bg-sand sm:h-72"
    />
  );
}
