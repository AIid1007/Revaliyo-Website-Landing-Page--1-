import { LINKS } from "@/lib/config";
import EmailForm from "./EmailForm";
import Logo from "./Logo";
import StoreButtons from "./StoreButtons";

export default function Footer() {
  return (
    <footer id="get-the-app" className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="on-gold mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-gold px-6 pb-8 pt-16 text-on-gold md:px-12 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div>
            <h2 className="display text-[clamp(2.2rem,5.2vw,4.75rem)]">
              Swap or give away things you don&rsquo;t use.
            </h2>
            <div className="mt-8">
              <StoreButtons tone="blue" />
            </div>
          </div>
          <div className="lg:justify-self-end">
            <EmailForm />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-on-gold/20 pt-6 text-sm text-on-gold/80 md:mt-28 md:flex-row md:items-center md:justify-between">
          <Logo className="text-on-gold" />
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={LINKS.privacy} className="underline-offset-4 hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href={LINKS.terms} className="underline-offset-4 hover:underline">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
          <p>&copy; {new Date().getFullYear()} Revaliyo</p>
        </div>
      </div>
    </footer>
  );
}
