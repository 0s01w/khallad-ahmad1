import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead, staggerParent, staggerChild } from "./ui";

const STRENGTHS = [
  { t: "Brand-focused creative thinking", d: "Every visual choice serves positioning — never decoration for its own sake." },
  { t: "Professional visual quality", d: "Clean type, considered color and cinematic pacing across formats." },
  { t: "Attention to detail", d: "Kerning, cuts, captions and crops — checked before anything leaves the studio." },
  { t: "Modern design aesthetics", d: "Contemporary without chasing trends; work that still feels right next year." },
  { t: "Engaging video content", d: "Openings that hold, pacing that breathes, endings that convert." },
  { t: "Dedicated project communication", d: "Direct contact, clear timelines and honest updates throughout." },
];

export function WhyMe() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Why work with me" className="relative overflow-hidden bg-[#0B0B0A] py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8B99A]/[0.045] blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            index="05"
            eyebrow="Why me"
            title={
              <>
                CREATIVITY THAT
                <br />
                MAKES YOUR BRAND
                <br />
                <span className="font-display italic font-light text-[#C8B99A]">stand out.</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="body-comfort mt-7 max-w-md text-[15px] text-[#A6A39A]">
              No inflated claims, no borrowed logos — just the working standards I bring to every
              skincare, beauty and clothing project I take on.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-[#C8B99A]/40 px-8 py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-[#F3F0E8] transition-all duration-300 hover:bg-[#C8B99A] hover:text-[#0B0B0A]"
            >
              Discuss your brand
            </a>
          </Reveal>
        </div>

        <motion.dl
          variants={reduce ? undefined : staggerParent}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-10% 0px" }}
          className="border-t border-white/10"
        >
          {STRENGTHS.map((s, i) => (
            <motion.div
              key={s.t}
              variants={reduce ? undefined : staggerChild}
              className="group grid grid-cols-[44px_1fr] gap-4 border-b border-white/10 py-7 transition-colors duration-400 hover:bg-white/[0.02] md:py-8"
            >
              <span className="font-display pt-0.5 text-sm italic text-[#C8B99A]/80 tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <dt className="font-display text-[clamp(1.25rem,2.4vw,1.7rem)] leading-snug font-light text-[#F3F0E8]">
                  {s.t}
                </dt>
                <dd className="mt-2 max-w-lg text-sm leading-[1.8] font-light text-[#A6A39A]">{s.d}</dd>
              </div>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* Marquee divider */}
      <div aria-hidden="true" className="mt-20 overflow-hidden border-y border-white/10 py-5 select-none md:mt-28">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-10">
              {["Video Advertising", "Social Design", "Product Visuals", "Brand Identity", "Skincare", "Beauty", "Fashion"].map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center gap-10">
                  <span className="font-display text-2xl font-light tracking-tight text-[#F3F0E8]/70 italic md:text-3xl">{w}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8B99A]/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
