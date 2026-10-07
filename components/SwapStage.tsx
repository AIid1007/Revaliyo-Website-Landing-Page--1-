"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef, useState } from "react";
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
  { id: "lamp", name: "Desk lamp", Icon: Lamp, tone: "bg-blue text-on-blue" },
  { id: "guitar", name: "Acoustic guitar", Icon: Guitar, tone: "bg-gold text-on-gold" },
  { id: "bike", name: "Kids\u2019 bike", Icon: Bicycle, tone: "bg-gold text-on-gold" },
  { id: "plants", name: "Herb planters", Icon: Plant, tone: "bg-blue text-on-blue" },
  { id: "books", name: "Paperbacks", Icon: Books, tone: "bg-paper-2 text-ink" },
  { id: "headphones", name: "Headphones", Icon: Headphones, tone: "bg-paper-2 text-ink" },
];

const spring = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } as const;

type Hint = { type: "wiggle" } | { type: "giveaway"; id: string } | null;

const DEFAULT_NOTE = "Tap one of yours, then one nearby.";

/**
 * A small, playable version of the product idea: pick something of yours,
 * pick something nearby, and the two trade places. Until the visitor
 * interacts it demonstrates itself: tiles wiggle to show they move, one pair
 * is highlighted and swaps, and now and then a tile is given away.
 */
export default function SwapStage() {
  const reduce = useReducedMotion();
  const [items, setItems] = useState(INITIAL);
  const [picked, setPicked] = useState<string | null>(null);
  const [interacted, setInteracted] = useState(false);
  const [userSwapped, setUserSwapped] = useState(false);
  const [hint, setHint] = useState<Hint>(null);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [note, setNote] = useState(DEFAULT_NOTE);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const swap = (a: string, b: string) => {
    setItems((prev) => {
      const next = [...prev];
      const ia = next.findIndex((i) => i.id === a);
      const ib = next.findIndex((i) => i.id === b);
      [next[ia], next[ib]] = [next[ib], next[ia]];
      return next;
    });
  };

  // Self-guided demo until the first touch. Pauses while the tab is hidden.
  useEffect(() => {
    if (reduce || interacted) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    (async () => {
      await wait(1800);
      let n = 0;
      while (!cancelled) {
        if (document.hidden) {
          await wait(1000);
          continue;
        }
        // 1. Wiggle: the tiles are movable.
        setNote("These tiles move.");
        setHint({ type: "wiggle" });
        await wait(900);
        if (cancelled) return;
        setHint(null);

        // 2. One highlighted pair trades places.
        const cur = itemsRef.current;
        const mine = cur[[0, 2, 4][n % 3]];
        const theirs = cur[[1, 3, 5][(n + 1) % 3]];
        setHighlight([mine.id, theirs.id]);
        setNote(`Your ${mine.name.toLowerCase()} for their ${theirs.name.toLowerCase()}`);
        await wait(1100);
        if (cancelled) return;
        swap(mine.id, theirs.id);
        setHighlight([]);
        setNote("Swapped.");
        await wait(1500);
        if (cancelled) return;

        // 3. Every other round: a tile is simply given away.
        if (n % 2 === 1) {
          const gift = itemsRef.current[[0, 2, 4][(n + 2) % 3]];
          setHighlight([gift.id]);
          setHint({ type: "giveaway", id: gift.id });
          setNote("Or give it away.");
          await wait(2000);
          if (cancelled) return;
          setHint(null);
          setHighlight([]);
        }
        setNote(DEFAULT_NOTE);
        await wait(1600);
        n += 1;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce, interacted]);

  const onPick = (item: Item, index: number) => {
    if (!interacted) {
      setInteracted(true);
      setHint(null);
      setHighlight([]);
    }
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
    setUserSwapped(true);
    setPicked(null);
  };

  const tileMotion = (id: string) => {
    if (hint?.type === "wiggle") {
      return { rotate: [0, -2.5, 2.5, -1.5, 1, 0], x: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" as const } };
    }
    if (hint?.type === "giveaway" && hint.id === id) {
      return { rotate: 0, x: [0, 56, 56, 0], scale: [1, 0.9, 0.9, 1], opacity: [1, 0.2, 0.2, 1], transition: { duration: 1.8, times: [0, 0.3, 0.7, 1], ease: "easeInOut" as const } };
    }
    return { rotate: 0, x: 0, scale: 1, opacity: 1, transition: spring };
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
          const hl = highlight.includes(item.id);
          return (
            <motion.li
              key={item.id}
              layout={!reduce}
              transition={spring}
              animate={reduce ? undefined : tileMotion(item.id)}
              className="list-none"
            >
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onPick(item, index)}
                className={`relative flex aspect-[1/0.92] w-full flex-col justify-between rounded-[var(--radius-panel)] p-4 text-left transition-[transform,box-shadow] duration-150 ease-[var(--ease-out)] active:scale-[0.97] md:p-5 ${item.tone} ${
                  selected ? "scale-[1.03] shadow-[0_0_0_3px_var(--ink)]" : hl ? "shadow-[0_0_0_3px_var(--ink)]" : ""
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

      <p className="mt-4 min-h-6 px-1 text-sm text-muted" aria-live={interacted ? "polite" : "off"}>
        {interacted ? (userSwapped ? "Swapped. That is the whole idea." : DEFAULT_NOTE) : note}
      </p>
    </div>
  );
}
