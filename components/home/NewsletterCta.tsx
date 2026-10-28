import { FiCheck } from "react-icons/fi";
import Newsletter from "@/components/ui/Newsletter";
import Reveal from "@/components/ui/Reveal";

const perks = ["Early access to drops", "Styling notes, once a month", "No noise, ever"];

export default function NewsletterCta() {
  return (
    <section className="relative overflow-hidden bg-burgundy text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(55%_80%_at_85%_20%,rgba(212,85,45,0.35),transparent_70%),radial-gradient(45%_60%_at_10%_90%,rgba(61,12,22,0.7),transparent_70%)]"
      />
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="shell relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/55">
              The Aurelle list
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg mt-5 max-w-xl text-balance">
              First look. <span className="italic text-sand">Every</span> time.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
              Join the list for private previews, atelier stories and the occasional note on what
              to wear when the weather refuses to behave.
            </p>
          </Reveal>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-xs text-cream/65">
                <FiCheck className="size-3.5 text-ember" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-frame border border-cream/15 bg-cream p-7 text-ink shadow-soft sm:p-9">
            <p className="font-display text-2xl">A note, once a month.</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Enter your email to join. You can leave whenever you like.
            </p>
            <div className="mt-5">
              <Newsletter />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
