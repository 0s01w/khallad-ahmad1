import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from "lucide-react";
import { Magnetic, Reveal, SectionHead } from "./ui";

const EMAIL = "khallad925@gmail.com";
const WHATSAPP = "+923085825168";
const WHATSAPP_LINK = "https://wa.me/923085825168";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "ok" | "err">("idle");

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopyState("ok");
    } catch {
      setCopyState("err");
    }
    window.setTimeout(() => setCopyState("idle"), 2600);
  };

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden bg-[#151513] py-24 md:py-36">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8B99A]/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#C8B99A]/[0.06] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <SectionHead
          index="06"
          eyebrow="Contact"
          align="center"
          title={
            <>
              LET’S CREATE
              <br />
              <span className="font-display italic font-light text-[#C8B99A]">something amazing.</span>
            </>
          }
          intro="Have a project in mind? Let’s turn your vision into something extraordinary."
        />

        <div className="mt-12 grid gap-5 text-left sm:grid-cols-2">
          {/* WhatsApp — prominent */}
          <Reveal>
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[5px] border border-[#C8B99A]/30 bg-[#0B0B0A] p-7 transition-colors duration-500 hover:border-[#C8B99A]/60 md:p-9">
              <div aria-hidden="true" className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#C8B99A]/10 blur-[80px] transition-opacity duration-500 opacity-70 group-hover:opacity-100" />
              <div>
                <p className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.28em] uppercase text-[#C8B99A]">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Preferred — WhatsApp
                </p>
                <p className="font-display mt-5 text-3xl font-light tracking-tight text-[#F3F0E8] tabular-nums md:text-[2rem]">
                  {WHATSAPP}
                </p>
                <p className="mt-3 text-sm leading-relaxed font-light text-[#A6A39A]">
                  Fastest response. Share your product, timeline and goal — I’ll reply personally.
                </p>
              </div>
              <Magnetic strength={0.14} className="mt-8 block">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#F3F0E8] px-6 py-4 text-[12px] font-bold tracking-[0.18em] uppercase text-[#0B0B0A] transition-colors duration-300 hover:bg-[#C8B99A]"
                  aria-label="Chat on WhatsApp (opens in a new tab)"
                >
                  Chat on WhatsApp
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnetic>
            </article>
          </Reveal>

          {/* Email */}
          <Reveal delay={0.12}>
            <article className="flex h-full flex-col justify-between rounded-[5px] border border-white/12 bg-white/[0.02] p-7 md:p-9">
              <div>
                <p className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.28em] uppercase text-[#A6A39A]">
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="u-sweep font-display mt-5 inline-block max-w-full text-[clamp(1.25rem,3vw,1.7rem)] font-light break-all text-[#F3F0E8]"
                >
                  {EMAIL}
                </a>
                <p className="mt-3 text-sm leading-relaxed font-light text-[#A6A39A]">
                  Prefer writing? Send references, links or a brief — attachments welcome.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry — ")}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[12px] font-bold tracking-[0.18em] uppercase text-[#F3F0E8] transition-all duration-300 hover:border-[#C8B99A] hover:text-[#C8B99A]"
                >
                  Write email <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button
                  onClick={copyEmail}
                  aria-live="polite"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[12px] font-bold tracking-[0.18em] uppercase text-[#F3F0E8] transition-all duration-300 hover:border-[#C8B99A] hover:text-[#C8B99A]"
                >
                  {copyState === "ok" ? (
                    <>
                      <Check className="h-4 w-4 text-[#C8B99A]" aria-hidden="true" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" /> Copy
                    </>
                  )}
                </button>
              </div>
              <div aria-live="polite" className="min-h-[22px]">
                {copyState === "ok" && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[12px] tracking-wide text-[#C8B99A]">
                    Email copied — looking forward to your message.
                  </motion.p>
                )}
                {copyState === "err" && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[12px] tracking-wide text-[#e0a49a]">
                    Copy didn’t work — please select the address manually.
                  </motion.p>
                )}
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <p className="mt-10 text-[11px] leading-loose tracking-[0.22em] uppercase text-[#A6A39A]">
            Currently accepting projects in <span className="text-[#F3F0E8]">skincare · beauty · fashion</span>
            <br className="hidden sm:block" />
            <span className="sm:ml-2">Replies personally — no agencies, no bots.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
