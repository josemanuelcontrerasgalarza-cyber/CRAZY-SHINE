import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "ghost" | "line";

interface Props {
  children: ReactNode;
  href?: string;
  /** If set, the button opens WhatsApp with this message. */
  whatsapp?: string | true;
  variant?: Variant;
  className?: string;
  icon?: "arrow" | "whatsapp" | "none";
  ariaLabel?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-volt text-ink hover:bg-bone [&_.cta-icon]:bg-ink [&_.cta-icon]:text-volt hover:[&_.cta-icon]:text-bone",
  ghost:
    "border border-bone/25 text-bone backdrop-blur-sm hover:border-bone hover:bg-bone hover:text-ink [&_.cta-icon]:border [&_.cta-icon]:border-current",
  line: "px-0 text-bone [&_.cta-text]:border-b [&_.cta-text]:border-bone/30 hover:text-volt hover:[&_.cta-text]:border-volt",
};

/** Bracketed, editorial call-to-action. Opens WhatsApp when `whatsapp` is set. */
export function Cta({ children, href, whatsapp, variant = "primary", className, icon = "arrow", ariaLabel }: Props) {
  const target = whatsapp ? whatsappLink(typeof whatsapp === "string" ? whatsapp : undefined) : href ?? "#";
  const external = target.startsWith("http");
  const Icon = icon === "whatsapp" || (whatsapp && icon === "arrow") ? WhatsAppIcon : ArrowUpRight;

  return (
    <a
      href={target}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel ?? (external ? `${typeof children === "string" ? children : "Book"} (opens WhatsApp)` : undefined)}
      className={clsx(
        "group inline-flex items-center gap-4 py-2 pl-6 pr-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-[var(--ease-cinematic)]",
        variant === "line" && "!p-0",
        styles[variant],
        className,
      )}
    >
      <span className="cta-text">
        <span aria-hidden="true" className="opacity-50">[ </span>
        {children}
        <span aria-hidden="true" className="opacity-50"> ]</span>
      </span>
      {icon !== "none" && variant !== "line" && (
        <span className="cta-icon grid h-10 w-10 place-items-center transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:rotate-45">
          <Icon className={clsx("h-4 w-4", Icon === WhatsAppIcon && "group-hover:-rotate-45 transition-transform duration-500")} />
        </span>
      )}
    </a>
  );
}
