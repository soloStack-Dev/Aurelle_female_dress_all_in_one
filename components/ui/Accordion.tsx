"use client";

import { useId, useState } from "react";
import { FiPlus } from "react-icons/fi";
import type { Faq } from "@/lib/data/site";

/**
 * Accessible single-open accordion.
 * Uses real buttons + aria-expanded/aria-controls and an animated grid row
 * (0fr → 1fr) so height animates without measuring the DOM.
 */
export default function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-ember"
              >
                <span className="text-sm font-semibold tracking-tight md:text-base">
                  {item.question}
                </span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 transition-transform duration-300 ${
                    isOpen ? "rotate-45 bg-ember text-cream" : ""
                  }`}
                >
                  <FiPlus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
