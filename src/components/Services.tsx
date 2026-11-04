import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clapperboard, Film, Sparkles, LayoutGrid, Fingerprint } from "lucide-react";
import { Reveal, SectionHead, staggerParent, staggerChild } from "./ui";

const SERVICES = [
  {
    n: "01",
    icon: Clapperboard,
    title: "Video Ads Creation",
    desc: "Professional Reels, TikTok videos, and Facebook advertisements designed to capture attention and promote products.",
    meta: "Reels · TikTok · Paid Social",
  },
  {
    n: "02",
    icon: Film,
    title: "Video Editing",
    desc: "High-quality video editing with cinematic transitions, motion graphics, sound design, and professional pacing.",
    meta: "Cut · Grade · Sound · Motion",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Product Photo Editing",
    desc: "Professional product image enhancement, retouching, color correction, and advertising-ready visuals.",
    meta: "Retouch · Color · E-commerce",
  },
  {
    n: "04",
    icon: LayoutGrid,
    title: "Poster & Social Media Design",
    desc: "Creative posters, Instagram posts, promotional graphics, and social media content.",
    meta: "Feeds · Carousels · Campaigns",
  },
  {
    n: "05",
    icon: Fingerprint,
    title: "Logo & Branding",
    desc: "Unique logo concepts and consistent visual identities that help businesses establish a recognizable brand.",
    meta: "Marks · Systems · Guidelines",
  },
];

export function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="services" aria-label="Services" className="relative bg-[#151513] py-24 md:py-36">
      {/* top hairline + ambient */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8B99A]/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-[#C8B99A]/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="02"
            eyebrow="Capabilities"
            title={
              <>
                WHAT I BRING
                <br />
                <span className="font-display italic font-light text-[#C8B99A]">to your brand</span>
              </>
            }
          />
          <Reveal delay={0.2} className="max-w-sm lg:pb-2 lg:text-right">
            <p className="body-comfort text-sm text-[#A6A39A]">
              Five focused disciplines — one standard: calm, premium visuals that respect your brand
              and reward attention.
            </p>
          </Reveal>
        </div>

        <motion.ol
          variants={reduce ? undefined : staggerParent}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-14 border-t border-white/10"
        >
          {SERVICES.map((s) => (
            <motion.li key={s.n} variants={reduce ? undefined : staggerChild}>
              <article
                tabIndex={0}
                data-cursor
                className="group relative grid cursor-default grid-cols-[auto_1fr] items-start gap-5 rounded-[2px] border-b border-white/10 px-2 py-8 transition-colors duration-500 hover:bg-white/[0.025] focus-visible:bg-white/[0.04] sm:grid-cols-[72px_1fr_auto] sm:items-center sm:gap-8 sm:px-6 md:py-9"
              >
                <span className="font-display text-sm tracking-[0.2em] text-[#C8B99A]/80 tabular-nums sm:text-base">
                  {s.n}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C8B99A]/25 text-[#C8B99A] transition-all duration-500 group-hover:border-[#C8B99A]/60 group-hover:bg-[#C8B99A]/10" aria-hidden="true">
                      <s.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    </span>
                    <h3 className="font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-tight font-light text-[#F3F0E8] transition-transform duration-500 group-hover:translate-x-1">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-[1.8] font-light text-[#A6A39A] sm:pl-[54px]">
                    {s.desc}
                  </p>
                  <p className="mt-3 text-[10px] font-semibold tracking-[0.26em] uppercase text-[#A6A39A]/80 sm:pl-[54px]">
                    {s.meta}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="col-span-2 mt-1 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#A6A39A] transition-colors duration-300 group-hover:text-[#C8B99A] sm:col-span-1 sm:mt-0 sm:h-12 sm:w-12 sm:justify-center sm:rounded-full sm:border sm:border-white/12 sm:group-hover:border-[#C8B99A]/60"
                >
                  <span className="sm:hidden">Discuss project</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                {/* hover hairline */}
                <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-0 bg-[#C8B99A] transition-all duration-700 ease-out group-hover:w-full group-focus-within:w-full" />
              </article>
            </motion.li>
          ))}
        </motion.ol>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-[11px] tracking-[0.24em] uppercase text-[#A6A39A]">
            Not sure what you need? <a href="#contact" className="u-sweep text-[#F3F0E8] underline-offset-4">Describe your goal</a> — I’ll recommend the format.
          </p>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase text-[#C8B99A]"
          >
            See featured work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
