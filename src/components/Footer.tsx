import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { navLinks, serviceMessage, siteConfig, whatsappLink } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "./ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "./ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  const { instagram, location, hours } = siteConfig;

  return (
    <footer className="relative bg-black pt-24 sm:pt-32" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Crazy Shine — contact and information
      </h2>
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-bone" />
            <p className="mt-8 max-w-sm text-lg leading-relaxed text-bone/70">
              Automotive detailing & premium car care. Precision in every detail.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 bg-volt px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-bone"
            >
              <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="label mb-6 text-metal">Explore</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-bone/80 transition-colors hover:text-volt">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="label mb-6 text-metal">Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={whatsappLink(serviceMessage(s.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone/80 transition-colors hover:text-volt"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="label mb-6 text-metal">Contact</p>
            <ul className="space-y-5 text-bone/80">
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-volt">
                  WhatsApp — book & quotes
                </a>
              </li>
              <li className="flex gap-3">
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                {instagram.url ? (
                  <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-volt">
                    Instagram {instagram.handle ? `— ${instagram.handle}` : ""}
                  </a>
                ) : (
                  <span>Instagram</span>
                )}
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                {location.label ? (
                  location.mapsUrl ? (
                    <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-volt">
                      {location.label}
                    </a>
                  ) : (
                    <span>{location.label}</span>
                  )
                ) : (
                  <span>Location — ask us on WhatsApp</span>
                )}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
                <span>{hours ?? "Hours — by appointment"}</span>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="display mt-24 select-none whitespace-nowrap text-center text-[17.5vw] leading-[0.8] text-bone/[0.06] sm:mt-32"
        >
          Crazy Shine
        </p>

        <div className="flex flex-col gap-4 border-t border-bone/10 pb-28 pt-8 text-xs sm:py-8 text-metal sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Crazy Shine. Automotive Detailing. All rights reserved.
          </p>
          <p className="label hidden text-bone/40 md:block">Make every reflection count</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-bone">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-bone">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
