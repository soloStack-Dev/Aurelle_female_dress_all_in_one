import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/lib/data/site";

export default function SignaturePieces() {
  return (
    <section id="signature" className="shell scroll-mt-28 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Signature pieces"
          title="The ones you"
          accent="reach for"
          description="A tight edit of the silhouettes our clients return to, season after season."
        />
        <Reveal delay={0.15}>
          <Link
            href="/collection"
            className="link-underline pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            View all pieces <FiArrowRight className="size-3.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {products.slice(0, 4).map((product, index) => (
          <Reveal key={product.id} delay={index * 0.06} y={40}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
