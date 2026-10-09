import {
  ChatsCircle,
  Flag,
  MapPin,
  Star,
  UserCircleCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";

type Card = {
  Icon: Icon;
  title: string;
  body: string;
  tone: string;
  span: string;
};

const CARDS: Card[] = [
  {
    Icon: UserCircleCheck,
    title: "Verified profiles",
    body: "Every member has a profile verified by phone number, so you know who you’re meeting.",
    tone: "bg-gold text-on-gold",
    span: "md:col-span-7",
  },
  {
    Icon: Star,
    title: "Ratings after every swap",
    body: "See how other members rate someone before you agree a handover.",
    tone: "bg-blue text-on-blue",
    span: "md:col-span-5",
  },
  {
    Icon: ChatsCircle,
    title: "Chat in the app",
    body: "Arrange everything inside Revaliyo. No need to share your number.",
    tone: "bg-paper-2 text-ink",
    span: "md:col-span-5",
  },
  {
    Icon: MapPin,
    title: "Public meeting spots",
    body: "We suggest well-lit public places nearby for every handover.",
    tone: "bg-blue text-on-blue",
    span: "md:col-span-7",
  },
  {
    Icon: Flag,
    title: "Report and block",
    body: "Something not right? Report it in the app and our team will look into it instantly.",
    tone: "bg-gold text-on-gold",
    span: "md:col-span-12",
  },
];

export default function Safety() {
  return (
    <section
      id="safety"
      aria-labelledby="safety-heading"
      className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32"
    >
      <Reveal>
        <h2
          id="safety-heading"
          className="display max-w-[16ch] text-[clamp(2.6rem,7.4vw,6.5rem)]"
        >
          Meet your neighbours with confidence
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-3 md:mt-16 md:grid-cols-12 md:gap-4">
        {CARDS.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 2) * 0.08} className={`list-none ${c.span}`}>
            <div
              className={`group flex h-full min-h-[15rem] flex-col justify-between gap-10 rounded-[var(--radius-panel)] p-6 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1 md:p-9 ${c.tone}`}
            >
              <c.Icon
                size={48}
                weight="regular"
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:rotate-[-8deg] group-hover:scale-110"
              />
              <div>
                <h3 className="display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1] tracking-[-0.025em]">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-[34rem] text-[clamp(1rem,1.3vw,1.2rem)] leading-snug opacity-90">
                  {c.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
