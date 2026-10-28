import Link from "next/link";
import BrandMark from "./create-account/BrandMark";

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export default function LegalDocument({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="auth-legal min-h-dvh bg-[#f2eee8] px-5 py-8 text-[#121214] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[760px]">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121214]/30"
          >
            <BrandMark className="size-5" />
            <span className="text-sm font-bold tracking-[0.12em]">AURELLE</span>
          </Link>
          <Link
            href="/signup"
            className="text-[11px] font-semibold underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121214]/30"
          >
            Back to sign up
          </Link>
        </div>

        <header className="mt-16 border-b border-[#d9d3cb] pb-8 sm:mt-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6c655d]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-[#6c655d]">
            Last updated {updated}
          </p>
        </header>

        <div className="py-10 sm:py-12">
          <p className="max-w-[620px] text-[15px] leading-7 text-[#4d4842]">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-[#8a8279]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-semibold tracking-[-0.015em]">
                    {section.heading}
                  </h2>
                </div>
                <div className="mt-3 space-y-3 pl-0 sm:pl-8">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-[620px] text-[14px] leading-7 text-[#4d4842]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#d9d3cb] bg-[#f8f5f1] p-5 sm:p-6">
            <p className="text-[12px] leading-6 text-[#5f5850]">
              This is a demonstration document for the AURELLE storefront project. It
              is not legal advice and does not create a binding agreement. Questions can
              be sent to{" "}
              <a
                href="mailto:hello@aurelle.example"
                className="font-semibold text-[#121214] underline underline-offset-2"
              >
                hello@aurelle.example
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
