import { useState } from "react";
import { ArrowUpRight, Clapperboard, Loader2, Play } from "lucide-react";
import { Magnetic, Reveal } from "./ui";

/**
 * THE ONLY VIDEO ON THIS WEBSITE.
 * One YouTube embed, one video — do not add, duplicate or substitute.
 */
const YOUTUBE_EMBED = "https://www.youtube.com/embed/xLs05JFiX-A?rel=0";
const YOUTUBE_WATCH = "https://youtube.com/watch?v=xLs05JFiX-A";

const WHATSAPP_LINK = "https://wa.me/923085825168";

export function Portfolio() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="portfolio" aria-label="My creative showreel" className="relative bg-[#0B0B0A] py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-4 text-[#C8B99A]">
            <span className="inline-block h-px w-10 bg-[#C8B99A]/60" aria-hidden="true" />
            <span>03 — Showreel</span>
            <span className="inline-block h-px w-10 bg-[#C8B99A]/60" aria-hidden="true" />
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="headline-lg mx-auto mt-6 max-w-4xl text-[#F3F0E8]">
            MY CREATIVE{" "}
            <span className="font-display italic font-light text-[#C8B99A]">showreel</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="body-comfort mx-auto mt-6 max-w-xl text-[15px] text-[#A6A39A] md:text-base">
            A glimpse into my creative world — bringing ideas to life through professional video
            editing and visual storytelling.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mt-12 text-left">
            <div className="relative overflow-hidden rounded-[10px] border border-white/12 bg-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
              {/* frame header */}
              <div aria-hidden="true" className="flex items-center justify-between border-b border-white/10 bg-[#151513] px-5 py-3.5">
                <p className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.28em] uppercase text-[#C8B99A]">
                  <Clapperboard className="h-4 w-4" aria-hidden="true" />
                  Showreel — Khallad Ahmad
                </p>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8B99A]/70" />
                </span>
              </div>

              {/* responsive 16:9 player */}
              <div className="relative aspect-video w-full bg-black">
                {!loaded && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    role="status"
                    aria-label="Loading showreel video"
                  >
                    <Loader2 className="h-8 w-8 animate-spin text-[#C8B99A]" aria-hidden="true" />
                    <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#A6A39A]">
                      Loading showreel…
                    </p>
                  </div>
                )}
                {/* THE SINGLE VIDEO PLAYER */}
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={YOUTUBE_EMBED}
                  title="My creative showreel — video by Khallad Ahmad"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={() => setLoaded(true)}
                />
              </div>
            </div>

            <figcaption className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#C8B99A]">
                  Editing · Pacing · Sound · Story
                </p>
                <a
                  href={YOUTUBE_WATCH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-sweep mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#c9c5b9] transition-colors hover:text-[#F3F0E8]"
                >
                  <Play className="h-4 w-4 text-[#C8B99A]" aria-hidden="true" />
                  Watch on YouTube
                </a>
              </div>
              <Magnetic strength={0.14} className="shrink-0">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#F3F0E8] px-7 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0B0B0A] transition-colors duration-300 hover:bg-[#C8B99A]"
                  aria-label="Start your project on WhatsApp (opens in a new tab)"
                >
                  Start your project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
