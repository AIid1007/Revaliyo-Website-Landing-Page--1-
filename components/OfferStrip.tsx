import { Gift } from "@phosphor-icons/react/dist/ssr";

const MESSAGE = "List 3 items and get a £10 Amazon voucher, on us.";

function Run({ dup = false }: { dup?: boolean }) {
  return (
    <div className={`marquee-run flex shrink-0 items-center ${dup ? "marquee-dup" : ""}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center">
          <span className="display px-8 text-[clamp(2.2rem,6vw,5rem)] whitespace-nowrap">
            {MESSAGE}
          </span>
          <Gift size={44} weight="fill" className="shrink-0 opacity-90" aria-hidden />
        </span>
      ))}
    </div>
  );
}

/** The one marquee on the page: it carries the offer so it is seen on every pass. */
export default function OfferStrip() {
  return (
    <section
      aria-label="Offer"
      className="on-lime marquee overflow-hidden bg-lime py-6 text-on-lime md:py-8"
    >
      <p className="sr-only">{MESSAGE}</p>
      <div className="marquee-track">
        <Run />
        <Run dup />
      </div>
    </section>
  );
}
