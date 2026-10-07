"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "motion/react";
import StoreButtons from "./StoreButtons";
import SwapStage from "./SwapStage";

const EASE = [0.23, 1, 0.32, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-24 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-20"
    >
      <div className="lg:col-span-8">
        <h1 className="display text-[clamp(3.1rem,11.5vw,8rem)] lg:text-[min(7.9vw,7.25rem)]">
          <Line delay={0.1}>Is your home</Line>
          <Line delay={0.2}>
            full of <span className="mark">clutter?</span>
          </Line>
        </h1>

        <motion.p
          {...rise(0.5)}
          className="mt-7 max-w-[34rem] text-[clamp(1.05rem,1.5vw,1.25rem)] text-muted"
        >
          Revaliyo is a new local app. Swap the things you don&rsquo;t use for things you
          actually want, and reduce landfill at the same time.
        </motion.p>

        <motion.div {...rise(0.65)} className="mt-8">
          <StoreButtons tone="gold" />
        </motion.div>
      </div>

      <motion.div {...rise(0.45)} className="lg:col-span-4">
        <SwapStage />
      </motion.div>
    </section>
  );
}
