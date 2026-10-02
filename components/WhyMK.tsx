"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function WhyMK() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mkX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-18%"]);

  return (
    <section
      id="milton-keynes"
      ref={ref}
      aria-labelledby="mk-heading"
      className="on-lime relative overflow-hidden bg-lime px-5 py-24 text-on-lime md:px-10 md:py-40"
    >
      {/* Oversized outline "MK" drifts sideways with scroll: place gets the scale it deserves. */}
      <motion.div
        aria-hidden
        style={{ x: mkX, WebkitTextStroke: "2px currentColor" }}
        className="display pointer-events-none absolute -bottom-[0.14em] left-0 select-none whitespace-nowrap text-[clamp(14rem,48vw,46rem)] text-transparent opacity-30"
      >
        MK MK MK
      </motion.div>

      <div className="relative mx-auto max-w-[1400px]">
        <h2 id="mk-heading" className="display text-[clamp(3rem,10vw,9rem)]">
          Why Milton Keynes
        </h2>
        <p className="mt-8 max-w-[38rem] text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-[1.2] md:ml-[22%]">
          We&rsquo;re starting local and starting small, so every swap actually happens nearby,
          and every voucher is real. Milton Keynes is where Revaliyo begins.
        </p>
      </div>
    </section>
  );
}
