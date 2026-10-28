import { FiFeather, FiPackage, FiRefreshCw, FiSun } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import { benefits } from "@/lib/data/site";

const icons = {
  leaf: FiFeather,
  spark: FiSun,
  swap: FiRefreshCw,
  box: FiPackage,
} as const;

export default function Benefits() {
  return (
    <section className="border-y border-ink/10 bg-cream">
      <div className="shell grid gap-px py-16 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = icons[benefit.icon];
          return (
            <Reveal
              key={benefit.title}
              delay={index * 0.06}
              className="flex flex-col gap-3 px-0 py-6 sm:px-7 lg:border-l lg:border-ink/10 lg:py-2 lg:first:border-l-0 lg:first:pl-0"
            >
              <Icon className="size-5 text-ember" aria-hidden="true" />
              <h3 className="text-sm font-semibold tracking-tight">{benefit.title}</h3>
              <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                {benefit.description}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
