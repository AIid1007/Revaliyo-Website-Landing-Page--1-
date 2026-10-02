"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/config";
import { scrollToHash } from "@/lib/lenis";
import Logo from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();

  // Hide on scroll down, return on scroll up (so it never covers the content
  // being read). Flips a boolean only when the direction changes.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const down = y > prev && y > 120;
    setHidden((h) => (h === down ? h : down));
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-10"
        >
          <a href="#top" onClick={(e) => go(e, "#top")} aria-label="Revaliyo, back to top">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-150 hover:bg-ink hover:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-150 active:scale-95 md:hidden"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { clipPath: "circle(0% at calc(100% - 2.25rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.25rem) 2rem)" }}
            exit={reduce ? undefined : { clipPath: "circle(0% at calc(100% - 2.25rem) 2rem)" }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="on-lime fixed inset-0 z-30 flex flex-col justify-end bg-lime px-5 pb-12 text-on-lime md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="display block py-1 text-[clamp(2.6rem,13vw,4.5rem)]"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
