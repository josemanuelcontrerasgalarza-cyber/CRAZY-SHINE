"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { garage, type GarageEntry } from "@/content/garage";
import { Media } from "../ui/Media";
import { MaskedHeadline } from "../ui/Reveal";

const allPhotos = garage.every((g) => g.visual.src);

export function Garage() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop: pin the section and translate the rail horizontally with the vertical scroll.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Inner parallax on every frame, driven by the horizontal movement.
      el.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="work" className="relative overflow-hidden bg-ink" aria-labelledby="work-title">
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-28 sm:gap-6 sm:px-8 lg:h-screen lg:snap-none lg:items-center lg:overflow-visible lg:px-14 lg:py-0"
      >
        {/* Intro panel */}
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-between sm:w-[60vw] lg:h-[78vh] lg:w-[38vw]">
          <div>
            <p className="label mb-8 text-metal">
              <span className="text-volt">(03)</span> The garage / Our work
            </p>
            <MaskedHeadline
              className="display text-[clamp(3.4rem,8.5vw,9rem)] text-bone"
              lines={[
                "Every car",
                <span key="h" className="text-outline">
                  has a
                </span>,
                <>
                  story<span className="text-volt">.</span>
                </>,
              ]}
            />
            <span id="work-title" className="sr-only">
              Every car has a story
            </span>
          </div>
          <div className="mt-10 max-w-sm space-y-4">
            <p className="leading-relaxed text-metal">
              Muscle, classics, sports cars and the car you drive every day. We don&apos;t only work on supercars — every
              vehicle gets the same obsession.
            </p>
            <p className="label hidden items-center gap-3 text-bone/50 lg:flex">
              <span className="h-px w-10 bg-volt" /> Keep scrolling
            </p>
            <p className="label flex items-center gap-3 text-bone/50 lg:hidden">
              <span className="h-px w-10 bg-volt" /> Swipe
            </p>
          </div>
        </div>

        {garage.map((car, i) => (
          <GarageCard key={car.id} car={car} index={i} />
        ))}

        <div className="flex w-[70vw] shrink-0 snap-start flex-col justify-center sm:w-[40vw] lg:h-[78vh] lg:w-[28vw]">
          <p className="display text-5xl text-bone sm:text-6xl">
            Your car
            <br />
            is <span className="text-volt">next.</span>
          </p>
          {!allPhotos && (
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-metal">
              Vehicles are shown as studio reference renders. Authentic photography of Crazy Shine jobs is published here as
              it is produced.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function GarageCard({ car, index }: { car: GarageEntry; index: number }) {
  const wide = index % 3 === 0;
  return (
    <article
      className={`group relative shrink-0 snap-center overflow-hidden bg-graphite ${
        wide ? "w-[85vw] sm:w-[70vw] lg:w-[58vw]" : "w-[85vw] sm:w-[55vw] lg:w-[40vw]"
      } h-[68vh] min-h-[420px] lg:h-[78vh]`}
      aria-label={`${car.make} ${car.model}${car.year ? ` ${car.year}` : ""} — ${car.service}`}
    >
      <div data-parallax className="absolute inset-y-0 -left-[10%] -right-[10%]">
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cinematic)] group-hover:scale-[1.04]">
          <Media visual={car.visual} sizes="(min-width: 1024px) 58vw, 85vw" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      <div className="absolute left-5 right-5 top-5 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7">
        <span className="bg-volt px-3 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">
          {car.service}
        </span>
        <span className="font-mono text-xs text-bone/60">
          {String(index + 1).padStart(2, "0")} / {car.category}
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
        <p className="label text-bone/60">
          {car.make}
          {car.year ? ` · ${car.year}` : ""}
        </p>
        <h3 className="display mt-2 text-[clamp(2.6rem,6vw,6rem)] text-bone">{car.model}</h3>

        {/* Hover reveal (always visible on touch) */}
        <div className="grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-cinematic)] [grid-template-rows:1fr] lg:opacity-0 lg:[grid-template-rows:0fr] lg:group-hover:opacity-100 lg:group-hover:[grid-template-rows:1fr] lg:group-focus-within:opacity-100 lg:group-focus-within:[grid-template-rows:1fr]">
          <div className="overflow-hidden">
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/80">{car.story}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {car.details.map((d) => (
                <li key={d} className="border border-bone/20 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-bone/70">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
