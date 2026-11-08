import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "ghost";

interface Props {
  children: ReactNode;
  href?: string;
  /** Si se define, el botón abre WhatsApp con este mensaje. */
  whatsapp?: string | true;
  variant?: Variant;
  className?: string;
  icon?: "arrow" | "whatsapp";
}

const styles: Record<Variant, string> = {
  primary: "bg-chrome text-ink hover:bg-bone [&_.cta-icon]:bg-ink [&_.cta-icon]:text-chrome",
  ghost:
    "border border-bone/25 text-bone hover:border-bone hover:bg-bone hover:text-ink [&_.cta-icon]:border [&_.cta-icon]:border-current",
};

/** Botón editorial entre corchetes. */
export function Cta({ children, href, whatsapp, variant = "primary", className, icon }: Props) {
  const target = whatsapp ? whatsappLink(typeof whatsapp === "string" ? whatsapp : undefined) : href ?? "#";
  const external = target.startsWith("http");
  const Icon = (icon ?? (whatsapp ? "whatsapp" : "arrow")) === "whatsapp" ? WhatsAppIcon : ArrowUpRight;

  return (
    <a
      href={target}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={clsx(
        "shine group inline-flex items-center gap-4 py-2 pl-6 pr-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-[var(--ease-cinematic)]",
        styles[variant],
        className,
      )}
    >
      <span>
        <span aria-hidden="true" className="opacity-40">[ </span>
        {children}
        <span aria-hidden="true" className="opacity-40"> ]</span>
        {external && <span className="sr-only"> (abre WhatsApp)</span>}
      </span>
      <span className="cta-icon grid h-10 w-10 place-items-center transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:rotate-45">
        <Icon className={clsx("h-4 w-4", Icon === WhatsAppIcon && "transition-transform duration-500 group-hover:-rotate-45")} />
      </span>
    </a>
  );
}
