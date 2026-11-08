import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks, serviceMessage, siteConfig, whatsappLink } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "./ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "./ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  const { instagram } = siteConfig;

  return (
    <footer className="relative bg-black pt-24 sm:pt-32">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-bone" size="xl" />
            <p className="mt-8 max-w-sm leading-relaxed text-bone/70">
              No es solo limpiar. Es hacerlo brillar. Detailing profesional y cuidado automotriz premium.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="shine group mt-10 inline-flex items-center gap-3 bg-chrome px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-bone"
            >
              <WhatsAppIcon className="h-4 w-4" /> Agenda por WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>

          <nav className="lg:col-span-2" aria-label="Pie de página">
            <p className="label mb-6 text-metal">Explorar</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-bone/80 transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label mb-6 text-metal">Servicios</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={whatsappLink(serviceMessage(s.name))} target="_blank" rel="noopener noreferrer" className="text-bone/80 transition-colors hover:text-bone">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label mb-6 text-metal">Legal</p>
            <ul className="space-y-3">
              <li>
                <Link href="/privacidad" className="text-bone/80 hover:text-bone">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-bone/80 hover:text-bone">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="display mt-24 select-none text-[clamp(4.5rem,19vw,18rem)] leading-[0.82] sm:mt-32">
          <span className="block text-fade">Siempre</span>
          <span className="block text-outline">Crazy Shine.</span>
        </p>

        <div className="flex flex-col gap-4 border-t border-bone/10 pb-28 pt-8 text-xs text-metal sm:flex-row sm:items-center sm:justify-between sm:pb-8 sm:pr-24">
          <div className="space-y-1">
            <p>© {year} Crazy Shine. Detailing automotriz. Todos los derechos reservados.</p>
            <p className="text-bone/40">Fotografías de referencia: Unsplash y Wikimedia Commons.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center border border-bone/15 text-bone/80 hover:border-bone hover:text-bone">
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            {instagram.url && (
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center border border-bone/15 text-bone/80 hover:border-bone hover:text-bone">
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
