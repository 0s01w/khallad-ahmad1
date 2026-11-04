import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./ui";

const PROFILE = "https://plain-eeur-prod-public.komododecks.com/202611/04/uxVJsU8zVSDu4bJgI1kA/image.jpg";

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // GSAP-style parallax fallback handled by framer; subtle grain handled globally.

  useEffect(() => {
    // Preload profile image early
    const img = new Image();
    img.src = PROFILE;
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="home" ref={sectionRef} aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0B0B0A]">
      {/* Atmospheric background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 editorial-grid-bg opacity-70" />
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#C8B99A]/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[480px] w-[480px] rounded-full bg-[#3a3428]/40 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-12 px-5 pt-[120px] pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-12 lg:pt-[110px]">
        {/* Copy */}
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="relative z-10 max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#C8B99A]/25 bg-white/[0.02] py-2 pr-5 pl-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C8B99A] animate-soft-ping" aria-hidden="true" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C8B99A]" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.26em] uppercase text-[#C8B99A] sm:text-[11px]">
              Available for select brand projects
            </span>
          </motion.div>

          <h1 className="headline-xl text-[#F3F0E8]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "108%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={{ duration: 1.05, ease, delay: 0.25 }}
              >
                CRAFTING
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "108%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={{ duration: 1.05, ease, delay: 0.36 }}
              >
                VISUALS<span className="text-[#C8B99A]">.</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block font-display italic font-light text-[#A6A39A]"
                initial={reduce ? false : { y: "108%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={{ duration: 1.05, ease, delay: 0.47 }}
              >
                Creating Impact.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.62 }}
            className="body-comfort mt-7 max-w-xl text-[15px] text-[#c9c5b9] sm:text-base md:text-[17px]"
          >
            I’m <span className="font-medium text-[#F3F0E8]">Khallad Ahmad</span> — a Graphic Designer &amp;
            Video Editor helping brands transform ideas into powerful visual experiences.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.74 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#F3F0E8] px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase text-[#0B0B0A] transition-colors duration-300 hover:bg-[#C8B99A]"
              >
                Explore My Work
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase text-[#F3F0E8] transition-all duration-300 hover:border-[#C8B99A] hover:text-[#C8B99A]"
              >
                Let’s Work Together
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6"
          >
            {[
              ["Focus", "Skincare · Beauty · Fashion"],
              ["Craft", "Video Ads · Social · Branding"],
              ["Base", "Working Worldwide, Remotely"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#A6A39A]">{k}</dt>
                <dd className="mt-1.5 text-[13px] font-medium tracking-wide text-[#F3F0E8]">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Portrait — editorial frame */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.5 }}
          className="relative z-10 mx-auto w-full max-w-[420px] lg:max-w-none"
        >
          <div className="relative">
            <p className="eyebrow mb-4 flex items-center gap-3 text-[#A6A39A]">
              <span className="h-px w-8 bg-[#C8B99A]/60" aria-hidden="true" />
              The Designer — Khallad Ahmad
            </p>
            <motion.figure
              style={reduce ? undefined : { y: imgY }}
              className="cinematic-tone zoom-frame relative aspect-[3/4] overflow-hidden rounded-[2px] border border-white/10 bg-[#151513]"
            >
              {!imgError ? (
                <img
                  src={PROFILE}
                  alt="Portrait of Khallad Ahmad, freelance graphic designer and video editor"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#151513] p-8 text-center" role="img" aria-label="Portrait placeholder for Khallad Ahmad">
                  <span className="font-display text-7xl font-light text-[#C8B99A]">K.</span>
                  <span className="text-[11px] tracking-[0.28em] uppercase text-[#A6A39A]">Khallad Ahmad</span>
                </div>
              )}
              {/* Frame corners */}
              <span aria-hidden="true" className="absolute top-3 left-3 h-5 w-5 border-t border-l border-[#C8B99A]/70" />
              <span aria-hidden="true" className="absolute top-3 right-3 h-5 w-5 border-t border-r border-[#C8B99A]/70" />
              <span aria-hidden="true" className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C8B99A]/70" />
              <span aria-hidden="true" className="absolute right-3 bottom-3 h-5 w-5 border-r border-b border-[#C8B99A]/70" />
            </motion.figure>

            {/* Caption bar */}
            <div className="mt-4 flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#F3F0E8]">
                Graphic Designer <span className="text-[#C8B99A]">&</span> Video Editor
              </p>
              <p className="font-display text-sm italic text-[#A6A39A]">est. craft — detail</p>
            </div>

            {/* Floating badge */}
            <div aria-hidden="true" className="absolute -left-4 top-16 hidden rounded-full border border-[#C8B99A]/30 bg-[#0B0B0A]/80 px-4 py-2 backdrop-blur-md md:block lg:-left-10">
              <span className="text-[10px] font-semibold tracking-[0.26em] uppercase text-[#C8B99A]">Editorial · Cinematic</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 pb-8 sm:px-8 lg:px-12"
        aria-hidden="true"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-px overflow-hidden bg-white/10">
            <div className="h-full w-full bg-[#C8B99A] animate-scroll-line" />
          </div>
          <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-[#A6A39A]">Scroll to explore</span>
        </div>
        <span className="v-text hidden text-[10px] tracking-[0.4em] uppercase text-[#A6A39A]/70 sm:block">Nº 01 — Opening Frame</span>
      </motion.div>
    </section>
  );
}
