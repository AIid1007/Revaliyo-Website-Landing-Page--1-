import Film from "@/components/Film";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Nav from "@/components/Nav";
import OfferStrip from "@/components/OfferStrip";
import Safety from "@/components/Safety";
import SmoothScroll from "@/components/SmoothScroll";
import WhySwap from "@/components/WhySwap";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <OfferStrip />
        <HowItWorks />
        <Safety />
        <WhySwap />
        <Film />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
