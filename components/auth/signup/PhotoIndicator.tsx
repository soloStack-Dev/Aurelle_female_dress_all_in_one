"use client";

import { motion } from "motion/react";

export default function PhotoIndicator({
  active,
  total,
  onSelect,
  className = "",
}: {
  active: number;
  total: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="tablist"
      aria-label="Photo slides"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === active}
          aria-label={`Show photo ${index + 1}`}
          onClick={() => onSelect(index)}
          className="grid size-5 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <motion.span
            className="block h-1.5 rounded-full"
            animate={{
              width: index === active ? 18 : 6,
              backgroundColor: index === active ? "#ffffff" : "#6b6b6b",
            }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          />
        </button>
      ))}
    </div>
  );
}
