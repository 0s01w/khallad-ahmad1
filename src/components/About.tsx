import { motion, useReducedMotion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { LineReveal, Reveal, SectionHead } from "./ui";

const PILLARS = [
  { k: "Visual Advertising", v: "Reels, TikTok & paid-social films built to hold attention." },
  { k: "Social Design", v: "Feeds, carousels & promos with a calm, premium rhythm." },
  { k: "Brand Identity", v: "Logos & systems that stay recognizable everywhere." },
];

export function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" aria-label="About Khallad Ahmad" className="relative bg-[#0B0B0A] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          index="01"
          eyebrow="Profile"
          title={
            <>
              <LineReveal>DESIGNING WITH PURPOSE.</LineReveal>
              <LineReveal delay={0.1}>
                <span className="font-display italic font-light text-[#C8B99A]">Creating with passion.</span>
              </LineReveal>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main copy — asymmetric, offset */}
          <div className="lg:col-span-7 lg:pl-[8%]">
            <Reveal>
              <p className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.45] font-light text-[#F3F0E8]">
                My name is <em className="text-[#C8B99A] not-italic font-normal">Khallad Ahmad</em>. I am a
                freelance graphic designer and video editor specializing in professional video
                advertisements and social media designs.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="body-comfort mt-7 max-w-xl text-[15px] text-[#A6A39A] md:text-base">
                I work with skincare, beauty, and clothing brands to create visually engaging content
                that strengthens their digital presence — from cinematic product films to considered,
                scroll-stopping feed design. Every project is handled personally, from first idea to
                final export.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-2.5" aria-label="Ideal clients">
                {["Skincare", "Beauty", "Cosmetics", "Fashion", "E-commerce", "Social-first brands"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/12 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#c9c5b9] transition-colors hover:border-[#C8B99A]/50 hover:text-[#F3F0E8]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Side rail */}
          <div className="lg:col-span-5">
            <motion.aside
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#C8B99A]/25 bg-[#151513]/60 lg:mt-2"
              aria-label="Areas of focus"
            >
              {PILLARS.map((p, i) => (
                <div key={p.k} className={`flex gap-5 px-6 py-6 md:px-8 ${i !== PILLARS.length - 1 ? "border-b border-white/8" : ""}`}>
                  <span className="mt-1 text-[#C8B99A]" aria-hidden="true">
                    <Asterisk className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-[12px] font-bold tracking-[0.22em] uppercase text-[#F3F0E8]">{p.k}</h3>
                    <p className="mt-2 text-sm leading-relaxed font-light text-[#A6A39A]">{p.v}</p>
                  </div>
                  <span className="ml-auto font-display text-sm italic text-[#A6A39A]/60" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
              ))}
              <div className="bg-[#0B0B0A] px-6 py-5 md:px-8">
                <p className="font-display text-lg font-light italic text-[#c9c5b9]">
                  “Every detail has been considered.”
                </p>
                <p className="mt-1 text-[10px] tracking-[0.28em] uppercase text-[#A6A39A]">— Working principle</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
