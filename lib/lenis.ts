import type Lenis from "lenis";

/** Shared handle so nav links can use the smooth scroller when it is running. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -8, duration: 1.2 });
  else el.scrollIntoView({ behavior: "auto", block: "start" });
  history.replaceState(null, "", hash);
}
