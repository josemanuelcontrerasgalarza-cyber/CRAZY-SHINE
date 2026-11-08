"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { navLinks, whatsappLink } from "@/config/site";
import { Logo } from "./ui/Logo";
import { WhatsAppIcon } from "./ui/icons";
import { getLenis } from "./SmoothScroll";
import { AnnouncementBar } from "./AnnouncementBar";

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-cinematic)]",
        scrolled && !open ? "-translate-y-8" : "translate-y-0",
      )}
    >
      <AnnouncementBar />
      <div
        className={clsx(
          "transition-[background-color,backdrop-filter,border-color,padding] duration-700 ease-[var(--ease-cinematic)]",
          scrolled && !open ? "border-b border-bone/[0.06] bg-ink/75 py-3 backdrop-blur-xl" : "border-b border-transparent py-4 sm:py-5",
        )}
      >
      <nav className="container-x flex items-center justify-between" aria-label="Principal">
        <a href="#inicio" className="relative z-10 text-bone" aria-label="Crazy Shine — inicio" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[0.72rem] font-medium uppercase tracking-[0.22em] text-bone/75 transition-colors hover:text-bone"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-crazy transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shine hidden items-center gap-2.5 bg-crazy px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-bone sm:inline-flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Reservar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center border border-bone/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="relative block h-3 w-5">
              <span className={clsx("absolute left-0 h-px w-5 bg-bone transition-all duration-500", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={clsx("absolute left-0 h-px bg-bone transition-all duration-500", open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3")} />
            </span>
          </button>
        </div>
      </nav>
      </div>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="container-x flex flex-1 flex-col justify-center pt-24">
              <p className="label mb-8 text-metal">Menú</p>
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 py-1 text-[clamp(3rem,13vw,5.5rem)] text-bone transition-colors hover:text-crazy"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.06 }}
                    >
                      <span className="font-mono text-xs tracking-normal text-crazy">0{i + 1}</span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              className="container-x flex items-center justify-between border-t border-bone/10 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <span className="label text-metal">Detailing automotriz</span>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-crazy px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" /> Reservar
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
