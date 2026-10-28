const phrases = [
  "The resort edit is live",
  "Small-batch production",
  "Designed in Paris",
  "Free size exchanges",
  "New pieces every Thursday",
];

/**
 * CSS-only editorial ticker. The second track is a duplicate for the seamless
 * loop and is hidden from assistive tech to avoid repeated announcements.
 */
export default function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-cream/10 bg-ink py-4 text-cream">
      <div className="marquee-track flex w-max">
        {[0, 1].map((track) => (
          <div
            key={track}
            aria-hidden={track === 1}
            className="flex shrink-0 items-center gap-10 pr-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/75"
          >
            {phrases.map((phrase) => (
              <span key={`${track}-${phrase}`} className="flex items-center gap-10">
                {phrase}
                <span className="size-1.5 rotate-45 bg-ember" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
