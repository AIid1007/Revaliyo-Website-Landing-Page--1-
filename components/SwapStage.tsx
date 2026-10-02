"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Bicycle,
  Books,
  Guitar,
  Headphones,
  Lamp,
  Plant,
  type Icon,
} from "@phosphor-icons/react";

type Item = { id: string; name: string; Icon: Icon; tone: string };

/** Even slots (0, 2, 4) are "yours", odd slots (1, 3, 5) are "nearby". */
const INITIAL: Item[] = [
  { id: "lamp", name: "Desk lamp", Icon: Lamp, tone: "bg-lime text-on-lime" },
  { id: "guitar", name: "Acoustic guitar", Icon: Guitar, tone: "bg-panel text-on-panel" },
  { id: "bike", name: "Kids\u2019 bike", Icon: Bicycle, tone: "bg-panel text-on-panel" },
  { id: "plants", name: "Herb planters", Icon: Plant, tone: "bg-lime text-on-lime" },
  { id: "books", name: "Paperbacks", Icon: Books, tone: "bg-paper-2 text-ink" },
  { id: "headphones", name: "Headphones", Icon: Headphones, tone: "bg-paper-2 text-ink" },
];

const spring = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } as const;

/**
 * A small, playable version of the product idea: pick something of yours,
 * pick something nearby, and the two trade places. Until the visitor
 * interacts it plays itself so the idea reads without instructions.
 */
export default function SwapStage() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState(INITIAL);
  const [picked, setPicked] = useState<string | null>(null);
  const [swaps, setSwaps] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const swap = (a: string, b: string) => {
    setItems((prev) => {
      const next = [...prev];
      const ia = next.findIndex((i) => i.id === a);
      const ib = next.findIndex((i) => i.id === b);
      [next[ia], next[ib]] = [next[ib], next[ia]];
      return next;
    });
    setSwaps((n) => n + 1);
  };

  // Self-playing demo until the first touch. Paused when the tab is hidden.
  useEffect(() => {
    if (reduce || interacted) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setItems((prev) => {
        const mine = [0, 2, 4][Math.floor(Math.random() * 3)];
        const theirs = [1, 3, 5][Math.floor(Math.random() * 3)];
        const next = [...prev];
        [next[mine], next[theirs]] = [next[theirs], next[mine]];
        return next;
      });
      setSwaps((n) => n + 1);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce, interacted]);

  const onPick = (item: Item, index: number) => {
    setInteracted(true);
    const side = index % 2; // 0 = yours, 1 = nearby
    if (!picked) {
      setPicked(item.id);
      return;
    }
    const pickedIndex = items.findIndex((i) => i.id === picked);
    if (pickedIndex % 2 === side) {
      setPicked(item.id === picked ? null : item.id);
      return;
    }
    swap(picked, item.id);
    setPicked(null);
  };

  return (
    <div className="w-full">
      <div className="mb-3 grid grid-cols-2 gap-3 px-1 text-sm font-semibold">
        <span>Yours</span>
        <span>Nearby</span>
      </div>

      <ul className="grid grid-cols-2 gap-3" aria-label="Swap demo. Choose one of yours, then one nearby.">
        {items.map((item, index) => {
          const selected = picked === item.id;
          return (
            <motion.li
              key={item.id}
              layout={!reduce}
              transition={spring}
              className="list-none"
            >
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onPick(item, index)}
                className={`relative flex aspect-[1/0.92] w-full flex-col justify-between rounded-[var(--radius-panel)] p-4 text-left transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] active:scale-[0.97] md:p-5 ${item.tone} ${
                  selected ? "scale-[1.03] shadow-[0_0_0_3px_var(--ink)]" : ""
                }`}
              >
                <item.Icon size={40} weight="regular" aria-hidden className="md:h-12 md:w-12" />
                <span className="display text-[clamp(1.1rem,2.2vw,1.55rem)] leading-[1] tracking-[-0.02em]">
                  {item.name}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <p className="mt-4 min-h-6 px-1 text-sm text-muted" aria-live="polite">
        {swaps === 0
          ? "Tap one of yours, then one nearby."
          : interacted
            ? "Swapped. That is the whole idea."
            : "Swapping happens nearby."}
      </p>
    </div>
  );
}
