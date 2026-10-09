"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const TEXT =
  "Revaliyo was built on a simple idea: most of what we throw away still has life left in it, and someone nearby actually wants it. We’re here to make swapping as easy as buying new, and a lot better for the planet.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  );
}

/** Words light up in reading order as the section scrolls: the pace of the page is the pace of the sentence. */
export default function Founder() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const words = TEXT.split(" ");

  return (
    <section
      ref={ref}
      id="founder"
      aria-label="From the founder"
      className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-44"
    >
      <p className="sr-only">{TEXT}</p>
      <p
        aria-hidden
        className="display max-w-[22ch] text-[clamp(2.1rem,6.2vw,5.6rem)] leading-[1] tracking-[-0.035em] md:max-w-[26ch]"
      >
        {words.map((w, i) =>
          reduce ? (
            <span key={i} className="mr-[0.22em] inline-block">
              {w}
            </span>
          ) : (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[(i / words.length) * 0.9, ((i + 1) / words.length) * 0.9]}
            >
              {w}
            </Word>
          ),
        )}
      </p>
    </section>
  );
}
