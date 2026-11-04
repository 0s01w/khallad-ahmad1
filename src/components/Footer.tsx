import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const reduce = useReducedMotion();
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative bg-[#0B0B0A] pt-20 pb-10" aria-label="Footer">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8B99A]/30 to-transparent" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_auto] lg:items-start">
          <div>
            <p className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-none font-light tracking-tight text-[#F3F0E8]">
              KHALLAD AHMAD<span className="text-[#C8B99A]">.</span>
            </p>
            <p className="mt-4 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#A6A39A]">
              Independent Creative Designer & Video Editor
            </p>
            <p className="font-display mt-5 max-w-md text-xl leading-relaxed font-light italic text-[#c9c5b9]">
              Crafting visuals that leave a lasting impression.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A6A39A]">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="u-sweep text-sm font-medium tracking-wide text-[#c9c5b9] transition-colors hover:text-[#F3F0E8]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <button
              onClick={toTop}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-[11px] font-bold tracking-[0.24em] uppercase text-[#F3F0E8] transition-all duration-300 hover:border-[#C8B99A] hover:text-[#C8B99A]"
              aria-label="Back to top"
            >
              Back to top
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/8 transition-colors duration-300 group-hover:bg-[#C8B99A] group-hover:text-[#0B0B0A]" aria-hidden="true">
                <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </button>
            <div className="text-sm text-[#A6A39A]">
              <a href="https://wa.me/923085825168" target="_blank" rel="noopener noreferrer" className="u-sweep block">
                +923085825168
              </a>
              <a href="mailto:khallad925@gmail.com" className="u-sweep mt-2 block">
                khallad925@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-[12px] tracking-wide text-[#A6A39A]">© 2026 Khallad Ahmad. All Rights Reserved.</p>
          <p className="text-[11px] tracking-[0.26em] uppercase text-[#A6A39A]/70">
            Designed with restraint <span className="text-[#C8B99A]" aria-hidden="true">·</span> Built with intent
          </p>
        </div>
      </div>
    </footer>
  );
}
