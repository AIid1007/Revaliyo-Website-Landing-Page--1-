"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@phosphor-icons/react";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Revaliyo free?",
    a: <>Yes. Revaliyo is free to download and free to swap &amp; giveaway.</>,
  },
  {
    q: "How does the AI value my items?",
    a: (
      <>
        It looks at your photos and details such as brand, type and condition, then compares
        similar items to suggest a fair value. It&rsquo;s a guide to help both people agree a
        swap or giveaway.
      </>
    ),
  },
  {
    q: "Where do handovers happen?",
    a: <>You agree a time and place in the app chat.</>,
  },
  {
    q: "What can’t I list?",
    a: (
      <>
        Weapons, counterfeit goods, food, medicines, recalled or unsafe items, and anything
        illegal to sell in the UK.
      </>
    ),
  },
  {
    q: "How do I claim the voucher?",
    a: <>List 3 items that pass review. Your voucher arrives by email within 3 days.</>,
  },
];

function Item({ q, a, defaultOpen = false }: { q: string; a: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <li className="border-t border-line first:border-t-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
        >
          <span className="display text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.02] tracking-[-0.02em]">
            {q}
          </span>
          <span
            aria-hidden
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-on-gold transition-transform duration-300 ease-[var(--ease-out)] group-active:scale-90 ${
              open ? "rotate-45" : ""
            }`}
          >
            <Plus size={20} weight="bold" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[44rem] pb-8 text-[1.075rem] text-muted md:text-lg">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-[1400px] px-5 pb-24 pt-8 md:px-10 md:pb-40"
    >
      <h2 id="faq-heading" className="display text-[clamp(2.6rem,8vw,7rem)]">
        FAQ
      </h2>
      <ul className="mt-10 md:mt-16 md:ml-[8%]">
        {FAQS.map((f, i) => (
          <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
        ))}
      </ul>
    </section>
  );
}
