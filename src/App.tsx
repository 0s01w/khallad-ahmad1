import { useState } from "react";
import { Cursor, Navigation, Preloader, ScrollProgress } from "./components/chrome";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Process } from "./components/Process";
import { WhyMe } from "./components/WhyMe";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="grain min-h-screen bg-[#0B0B0A] text-[#F3F0E8] antialiased">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:rounded-full focus:bg-[#C8B99A] focus:px-5 focus:py-2.5 focus:text-[12px] focus:font-bold focus:text-[#0B0B0A]"
      >
        Skip to content
      </a>

      {!ready && <Preloader onDone={() => setReady(true)} />}
      <ScrollProgress />
      <Cursor />
      <Navigation ready={ready} />

      <main>
        <Hero ready={ready} />
        {/* Editorial divider */}
        <div aria-hidden="true" className="bg-[#0B0B0A]">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          </div>
        </div>
        <About />
        <Services />
        <Portfolio />
        <Process />
        <WhyMe />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
