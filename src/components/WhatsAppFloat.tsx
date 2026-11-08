"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./ui/icons";

/** Floating booking button — appears after the hero to keep the first frame clean. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book via WhatsApp"
      className={clsx(
        "group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-bone/15 bg-ink/80 py-2 pl-2 pr-2 text-bone shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-700 ease-[var(--ease-cinematic)] hover:border-volt sm:bottom-8 sm:right-8 sm:pr-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
      tabIndex={visible ? 0 : -1}
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-volt text-ink">
        <span className="absolute inset-0 animate-ping rounded-full bg-volt/40 [animation-duration:2.5s]" />
        <WhatsAppIcon className="relative h-5 w-5" />
      </span>
      <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.2em] sm:inline">Book now</span>
    </a>
  );
}
