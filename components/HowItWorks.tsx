"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";
import { scrollToHash } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Photos are placeholders (see README). Swap the files in /public/images and
 * update the alt text to match.
 */
const STEPS = [
  {
    n: "1",
    title: "List.",
    body: "Add photos of things you no longer need. In a couple of minutes, our AI gives each item a value.",
    img: "/images/hiw-list.jpg",
    alt: "Hands holding a phone over a small table lamp, scanning it for a value",
  },
  {
    n: "2",
    title: "Swap or give away.",
    body: "Browse what’s nearby and request the things you actually want from other members, or give your things to someone who’ll use them.",
    img: "/images/hiw-swap.jpg",
    alt: "Someone on a sofa browsing items on their phone, a guitar leaning on the wall behind them",
  },
  {
    n: "3",
    title: "Collect.",
    body: "Arrange a handover with someone local, and give your things a second life.",
    img: "/images/hiw-collect.jpg",
    alt: "Two neighbours passing a small wrapped object from hand to hand in daylight",
  },
] as const;

/**
 * Mobile and reduced motion: three stacked beats.
 * Desktop with motion: the section pins and the three beats slide sideways as
 * you scroll, with a three-part progress line and a Skip link. The sideways
 * travel mirrors the sequence itself (list, then swap, then collect).
 */
export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!root.current || !track.current) return;
    const el = root.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      el.dataset.mode = "pin";

      const tween = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            fills.current.forEach((f, i) => {
              if (!f) return;
              const v = Math.min(1, Math.max(0, self.progress * STEPS.length - i));
              f.style.transform = `scaleX(${v})`;
            });
          },
        },
      });

      return () => {
        tween.kill();
        delete el.dataset.mode;
        fills.current.forEach((f) => f && (f.style.transform = "scaleX(0)"));
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="how-it-works"
      aria-labelledby="how-heading"
      className="hiw relative"
    >
      <div className="hiw-head mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 pb-8 pt-20 md:px-10 md:pt-32">
        <h2 id="how-heading" className="display text-[clamp(2.6rem,8vw,7rem)]">
          How it works
        </h2>

        <div className="hiw-pin-only hidden flex-1 items-center justify-end gap-6 pb-2">
          <div className="flex w-full max-w-md gap-2" aria-hidden>
            {STEPS.map((s, i) => (
              <span key={s.n} className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
                <span
                  ref={(node) => {
                    fills.current[i] = node;
                  }}
                  className="absolute inset-0 origin-left rounded-full bg-ink"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            ))}
          </div>
          <a
            href="#milton-keynes"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#milton-keynes");
            }}
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ink px-5 py-2.5 text-sm font-semibold transition-colors duration-150 hover:bg-ink hover:text-paper active:scale-[0.97]"
          >
            Skip
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden
              className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      <div className="hiw-viewport">
        <ol ref={track} role="list" className="hiw-track list-none">
          {STEPS.map((s) => (
            <li key={s.n} className="hiw-panel pb-16 lg:pb-0">
              <div className="mx-auto grid h-full max-w-[1400px] items-center gap-8 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                  <span
                    aria-hidden
                    className="display block text-[clamp(7rem,30vw,10rem)] text-lime [-webkit-text-stroke:2px_var(--ink)] lg:text-[clamp(8rem,18vw,17rem)]"
                  >
                    {s.n}
                  </span>
                  <h3 className="display mt-2 text-[clamp(2.4rem,7vw,5.5rem)]">{s.title}</h3>
                  <p className="mt-4 max-w-[30rem] text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug text-muted">
                    {s.body}
                  </p>
                </div>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-panel)] lg:col-span-6 lg:h-[min(calc(100dvh-13rem),680px)] lg:w-auto lg:justify-self-end">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
