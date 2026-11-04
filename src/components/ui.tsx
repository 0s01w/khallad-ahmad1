import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ---------------------------------- Reveal --------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Line reveal ------------------------------- */

export function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={`block ${className}`}>{children}</span>;
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Reveal>
        <p className="eyebrow flex items-center gap-4 text-[#C8B99A] data-[center]:justify-center" data-center={align === "center" ? "" : undefined} style={align === "center" ? { justifyContent: "center" } : undefined}>
          <span className="inline-block h-px w-10 bg-[#C8B99A]/60" aria-hidden="true" />
          <span>
            {index} — {eyebrow}
          </span>
          {align === "center" && <span className="inline-block h-px w-10 bg-[#C8B99A]/60" aria-hidden="true" />}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`headline-lg mt-6 ${light ? "text-[#F3F0E8]" : "text-[#F3F0E8]"} max-w-5xl ${align === "center" ? "mx-auto" : ""}`}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className={`body-comfort mt-6 max-w-xl text-[15px] md:text-base text-[#A6A39A] ${align === "center" ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------- Magnetic wrap ------------------------------ */

export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "translate(0px,0px)";
      window.setTimeout(() => {
        if (el) el.style.transition = "";
      }, 600);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, reduce]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* --------------------------------- Variants -------------------------------- */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};
