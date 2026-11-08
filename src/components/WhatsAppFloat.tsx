"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./ui/icons";

/** Botón flotante de WhatsApp — aparece después del hero. */
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
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={clsx(
        "group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[var(--ease-cinematic)] hover:scale-110 sm:bottom-8 sm:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="relative h-6 w-6" />
    </a>
  );
}
