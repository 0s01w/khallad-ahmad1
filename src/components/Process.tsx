import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, PenTool, Clapperboard, PackageCheck } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    desc: "Understanding your brand, audience, and goals.",
    detail: "A focused conversation about what you sell, who you serve, and what success looks like.",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Strategize",
    desc: "Developing the visual direction and creative concept.",
    detail: "Mood, references and a clear concept — agreed before anything is designed or cut.",
  },
  {
    n: "03",
    icon: Clapperboard,
    title: "Create",
    desc: "Designing, editing, and refining the visuals.",
    detail: "Design and edit with structured rounds of refinement until every frame feels right.",
  },
  {
    n: "04",
    icon: PackageCheck,
    title: "Deliver",
    desc: "Providing polished, professional, ready-to-publish content.",
    detail: "Organized, correctly sized exports for every placement — ready to publish day one.",
  },
];

export function Process() {
  const reduce = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // GSAP + ScrollTrigger: restrained scroll-driven progress hairline.
  // Genuinely useful here for a scrubbed, performant transform-only sequence.
  useEffect(() => {
    if (reduce) return;
    const bar = progressRef.current;
    const trigger = lineRef.current;
    if (!bar || !trigger) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    }, lineRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="process" aria-label="Creative process" className="relative bg-[#151513] py-24 md:py-36">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8B99A]/40 to-transparent" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          index="04"
          eyebrow="Process"
          align="center"
          title={
            <>
              FROM IDEA
              <span className="font-display italic font-light text-[#C8B99A]"> to impact</span>
            </>
          }
          intro="A simple, reassuring path from first message to ready-to-publish. You always know what happens next."
        />

        <div ref={lineRef} className="relative mt-16">
          {/* connecting line (desktop) — scrubbed by GSAP ScrollTrigger */}
          <div aria-hidden="true" className="absolute top-[26px] right-[6%] left-[6%] hidden h-px bg-white/10 lg:block">
            <div ref={progressRef} className="h-full origin-left bg-[#C8B99A]/70" style={reduce ? { transform: "scaleX(1)" } : undefined} />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="group relative">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="relative z-10 inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-[#C8B99A]/30 bg-[#0B0B0A] text-[#C8B99A] transition-all duration-500 group-hover:border-[#C8B99A] group-hover:bg-[#C8B99A] group-hover:text-[#0B0B0A]" aria-hidden="true">
                      <s.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-5xl font-light text-white/[0.09] transition-colors duration-500 group-hover:text-[#C8B99A]/25 lg:mt-5" aria-hidden="true">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[12px] font-bold tracking-[0.26em] uppercase text-[#F3F0E8]">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed font-medium text-[#c9c5b9]">{s.desc}</p>
                  <p className="mt-2 text-[13px] leading-relaxed font-light text-[#A6A39A]">{s.detail}</p>
                  {/* mobile connector */}
                  {i !== STEPS.length - 1 && (
                    <span aria-hidden="true" className="absolute top-[52px] bottom-[-40px] left-[26px] w-px bg-white/10 sm:hidden" />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1} className="mt-14 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.26em] uppercase text-[#C8B99A]"
          >
            <span className="u-sweep">Start with step 01 — Discover</span>
            <span aria-hidden="true" className="inline-block h-px w-10 bg-[#C8B99A]/60 transition-all duration-400 group-hover:w-14" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
