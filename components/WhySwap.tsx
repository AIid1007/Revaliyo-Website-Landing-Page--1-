import { ArrowsLeftRight, ChatCircleDots, Tag } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";

const STRIP: { Icon: Icon; text: string }[] = [
  { Icon: Tag, text: "No pricing." },
  { Icon: ChatCircleDots, text: "No haggling." },
  { Icon: ArrowsLeftRight, text: "Just swapping with neighbours." },
];

export default function WhySwap() {
  return (
    <section
      id="why-swap"
      aria-labelledby="why-heading"
      className="on-blue bg-blue px-5 py-24 text-on-blue md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 id="why-heading" className="display text-[clamp(2.8rem,9vw,8rem)]">
            Why swap or give away is better?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[40rem] text-[clamp(1.2rem,2.1vw,1.9rem)] font-medium leading-[1.25] md:ml-[22%]">
            Selling means setting a price, answering &ldquo;is this still available?&rdquo;.
            Revaliyo is built for swapping &amp; giving away. List it once, let our AI suggest a
            fair value, and trade it for something you actually want, close to home.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-4">
          {STRIP.map((s, i) => (
            <Reveal
              as="li"
              key={s.text}
              delay={0.1 + i * 0.12}
              className="list-none"
            >
              <div className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-panel)] border border-on-blue/40 p-6 md:min-h-[14rem] md:p-8">
                <s.Icon size={40} weight="regular" aria-hidden />
                <p className="display text-[clamp(1.7rem,3vw,2.7rem)] leading-[1] tracking-[-0.025em]">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
