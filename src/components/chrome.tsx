import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------- Scroll progress ---------------------------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-[#C8B99A]"
      style={{ scaleX }}
    />
  );
}

/* --------------------------------- Preloader -------------------------------- */

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      onDone();
      return;
    }
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onDone, 650);
        }, 180);
      }
    };
    raf = requestAnimationFrame(tick);
    // Safety: never block longer than 2.6s
    const safety = window.setTimeout(() => {
      setVisible(false);
      onDone();
    }, 2600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [onDone, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0A]"
          exit={{ y: "-100%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[13vw] leading-none font-light tracking-tight text-[#F3F0E8] sm:text-7xl"
            >
              KHALLAD<span className="text-[#C8B99A]">.</span>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5 flex w-56 flex-col items-center gap-3"
          >
            <div className="h-px w-full overflow-hidden bg-white/10">
              <div className="h-full bg-[#C8B99A] transition-[width] duration-100" style={{ width: `${count}%` }} />
            </div>
            <div className="flex w-full items-center justify-between text-[10px] tracking-[0.3em] uppercase text-[#A6A39A]">
              <span>Portfolio</span>
              <span className="tabular-nums">{String(count).padStart(3, "0")}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ Custom follower ----------------------------- */

export function Cursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, reduce]);

  const scale = useTransform([rx, ry], () => (hovering ? 2.4 : 1));

  if (!enabled || reduce) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] hidden lg:block"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#C8B99A]" />
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] hidden lg:block"
        style={{ x: rx, y: ry, scale }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className={`h-9 w-9 rounded-full border transition-colors duration-300 ${hovering ? "border-[#C8B99A]/80 bg-[#C8B99A]/10" : "border-white/20"}`} />
        </div>
      </motion.div>
    </>
  );
}

/* -------------------------------- Navigation -------------------------------- */

export function Navigation({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ready]);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      window.setTimeout(() => closeRef.current?.focus(), 60);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const closeOnEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, closeOnEscape]);

  const go = (id: string) => {
    setOpen(false);
    // Allow menu close animation before scrolling on mobile
    window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
      open ? 120 : 0
    );
  };

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -70, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-[#C8B99A]/15 bg-[#0B0B0A]/82 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => go("home")}
            className="font-display text-[22px] font-medium tracking-tight text-[#F3F0E8] transition-colors hover:text-[#C8B99A]"
            aria-label="Khallad Ahmad — back to top"
          >
            KHALLAD<span className="text-[#C8B99A]">.</span>
          </button>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`group relative text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors duration-300 ${
                    active === l.id ? "text-[#F3F0E8]" : "text-[#A6A39A] hover:text-[#F3F0E8]"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px bg-[#C8B99A] transition-all duration-400 ${
                      active === l.id ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button
              onClick={() => go("contact")}
              className="group inline-flex items-center gap-2 rounded-full border border-[#C8B99A]/35 px-6 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F3F0E8] transition-all duration-400 hover:border-[#C8B99A] hover:bg-[#C8B99A] hover:text-[#0B0B0A]"
            >
              Let’s Talk
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F3F0E8] lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[85] flex flex-col bg-[#0B0B0A]/97 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <span className="font-display text-[22px] text-[#F3F0E8]">
                KHALLAD<span className="text-[#C8B99A]">.</span>
              </span>
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F3F0E8]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-2">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={reduce ? false : { opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/8"
                  >
                    <button
                      onClick={() => go(l.id)}
                      className="group flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="font-display text-4xl font-light text-[#F3F0E8] transition-colors group-hover:text-[#C8B99A]">
                        {l.label}
                      </span>
                      <span className="text-[11px] tracking-[0.3em] text-[#A6A39A]">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8"
              >
                <button
                  onClick={() => go("contact")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F3F0E8] px-6 py-4 text-[12px] font-bold tracking-[0.2em] uppercase text-[#0B0B0A]"
                >
                  Let’s Talk <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-5 text-center text-xs tracking-[0.18em] uppercase text-[#A6A39A]">
                  Skincare · Beauty · Fashion
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
