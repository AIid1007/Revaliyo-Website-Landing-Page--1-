"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "@phosphor-icons/react";
import { FILM } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

/**
 * Explainer film slot. The frame grows from inset to full width as it scrolls
 * into view so the film is the focus of the page at that moment.
 * Set FILM.embedUrl in lib/config.ts to go live.
 */
export default function Film() {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!wrap.current || !frame.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        frame.current,
        { scale: 0.82, borderRadius: 56 },
        {
          scale: 1,
          borderRadius: 28,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 88%",
            end: "top 28%",
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, []);

  const hasFilm = Boolean(FILM.embedUrl);

  return (
    <section aria-label="Explainer film" className="px-3 pb-16 pt-6 md:px-6 md:pb-24">
      <div ref={wrap} className="mx-auto max-w-[1400px]">
        <div
          ref={frame}
          className="on-dark relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-panel text-on-panel will-change-transform sm:aspect-[16/10] lg:aspect-video"
        >
          {playing && hasFilm ? (
            <iframe
              src={`${FILM.embedUrl}${FILM.embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
              title="Revaliyo explainer film"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <>
              {FILM.poster && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={FILM.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex flex-col items-start justify-between p-6 md:p-10">
                <p className="display max-w-[12ch] text-[clamp(2rem,6vw,5.5rem)] text-on-panel">
                  Watch the film
                </p>
                <div className="flex w-full items-end justify-between gap-4">
                  <button
                    type="button"
                    disabled={!hasFilm}
                    onClick={() => setPlaying(true)}
                    aria-label="Play the explainer film"
                    className="group grid h-20 w-20 shrink-0 place-items-center rounded-full bg-lime text-on-lime transition-transform duration-200 ease-[var(--ease-out)] enabled:hover:scale-105 enabled:active:scale-95 disabled:cursor-not-allowed md:h-28 md:w-28"
                  >
                    <Play size={36} weight="fill" aria-hidden />
                  </button>
                  {!hasFilm && (
                    <p className="max-w-[16rem] text-right font-mono text-xs text-on-panel-muted">
                      Explainer film embed goes here. Add the link in lib/config.ts.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
