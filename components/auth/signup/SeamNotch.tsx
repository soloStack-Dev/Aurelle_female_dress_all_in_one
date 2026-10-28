"use client";

import PhotoIndicator from "./PhotoIndicator";

export default function SeamNotch({
  active,
  total,
  onSelect,
}: {
  active: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      data-auth-notch
      className="pointer-events-none absolute left-1/2 top-[59%] z-20 hidden -translate-x-[5px] -translate-y-1/2 lg:block"
    >
      <svg
        width="120"
        height="180"
        viewBox="0 0 120 180"
        className="fill-[#0e0e0e]"
        aria-hidden="true"
      >
        <path d="M0 0 C0 44 34 62 66 72 C94 80 118 82 118 90 C118 98 94 100 66 108 C34 118 0 136 0 180 Z" />
      </svg>
      <div className="pointer-events-auto absolute left-[-20px] top-1/2 -translate-y-1/2">
        <PhotoIndicator active={active} total={total} onSelect={onSelect} />
      </div>
    </div>
  );
}
