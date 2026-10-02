"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowsLeftRight, Camera, HandHeart, type Icon } from "@phosphor-icons/react";
import { LINKS } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

const STEPS: { title: string; body: string; Icon: Icon; tone: string }[] = [
  {
    title: "List.",
    body: "Add photos of things you no longer need, in a couple of minutes with our AI giving your items a value.",
    Icon: Camera,
    tone: "bg-lime text-on-lime on-lime",
  },
  {
    title: "Swap.",
    body: "Browse what’s nearby and request the things you actually want from other members.",
    Icon: ArrowsLeftRight,
    tone: "bg-panel text-on-panel on-dark",
  },
  {
    title: "Collect.",
    body: "Arrange a handover with someone local, and give your things a second life.",
    Icon: HandHeart,
    tone: "bg-paper-2 text-ink",
  },
];

/**
 * Sticky stack: each step pins, and the one underneath recedes as the next
 * slides over it. The scroll order is the product order (list, swap, collect).
 */
export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".step-card", root.current);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        // The card underneath recedes (scale + shade) but stays opaque, so
        // nothing ghosts through the card sliding over it.
        const trigger = {
          trigger: next,
          start: "top bottom",
          end: "top top",
          scrub: true,
        };
        gsap.to(card, { scale: 0.92, ease: "none", scrollTrigger: trigger });
        gsap.to(card.querySelector(".step-shade"), {
          opacity: 1,
          ease: "none",
          scrollTrigger: trigger,
        });
      });
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 md:px-10 md:pt-32">
        <h2 id="how-heading" className="display text-[clamp(2.6rem,8vw,7rem)]">
          How it works
        </h2>
      </div>

      <div ref={root} className="relative px-3 md:px-6">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="step-card sticky top-0 flex h-[100dvh] items-center py-4 will-change-transform md:py-6"
            style={{ zIndex: i + 1 }}
          >
            <article
              className={`mx-auto relative flex h-[calc(100dvh-2rem)] max-h-[760px] w-full max-w-[1400px] flex-col justify-between rounded-[28px] p-6 md:h-[calc(100dvh-3rem)] md:p-12 ${s.tone}`}
            >
              <div
                aria-hidden
                className="step-shade pointer-events-none absolute inset-0 rounded-[28px] bg-[rgb(8_12_9/0.55)] opacity-0"
              />
              <s.Icon size={64} weight="regular" aria-hidden className="md:h-24 md:w-24" />
              <div>
                <h3 className="display text-[clamp(4.5rem,20vw,17rem)]">{s.title}</h3>
                <p className="mt-4 max-w-[34rem] text-[clamp(1.1rem,1.8vw,1.5rem)] leading-snug opacity-90">
                  {s.body}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 pb-20 pt-10 md:flex-row md:items-center md:justify-between md:px-10 md:pb-32">
        <a
          href={LINKS.fullBreakdown}
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-ink px-6 py-3.5 font-semibold transition-colors duration-150 hover:bg-ink hover:text-paper active:scale-[0.97]"
        >
          See the full breakdown
          <ArrowRight
            size={20}
            weight="bold"
            aria-hidden
            className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1"
          />
        </a>
        <p className="text-muted">You can also give things away in the app.</p>
      </div>
    </section>
  );
}
