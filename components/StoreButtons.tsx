import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { STORE_LINKS } from "@/lib/config";
import Magnetic from "./Magnetic";

type Tone = "gold" | "blue" | "paper";

const tones: Record<Tone, string> = {
  gold: "bg-gold text-on-gold",
  blue: "bg-blue text-on-blue",
  paper: "bg-paper text-ink",
};

function Btn({
  href,
  icon,
  small,
  big,
  tone,
}: {
  href: string;
  icon: React.ReactNode;
  small: string;
  big: string;
  tone: Tone;
}) {
  return (
    <Magnetic>
      <a
        href={href}
        className={`group inline-flex min-h-14 items-center gap-3 rounded-full px-6 py-3 whitespace-nowrap transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] ${tones[tone]}`}
      >
        <span className="text-[1.65rem] leading-none" aria-hidden>
          {icon}
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[0.7rem] font-medium opacity-80">{small}</span>
          <span className="text-[1.05rem] font-semibold tracking-tight">{big}</span>
        </span>
      </a>
    </Magnetic>
  );
}

/** Same two actions everywhere they appear: hero and footer. */
export default function StoreButtons({ tone = "gold" }: { tone?: Tone }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Btn
        href={STORE_LINKS.appStore}
        icon={<AppleLogo weight="fill" />}
        small="Download on the"
        big="App Store"
        tone={tone}
      />
      <Btn
        href={STORE_LINKS.googlePlay}
        icon={<GooglePlayLogo weight="fill" />}
        small="Get it on"
        big="Google Play"
        tone={tone}
      />
    </div>
  );
}
