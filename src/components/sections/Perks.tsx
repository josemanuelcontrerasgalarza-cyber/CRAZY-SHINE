import { CalendarCheck, Car, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

const perks: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: CalendarCheck, title: "Agenda por WhatsApp", text: "Reserva directo con nosotros, sin intermediarios." },
  { Icon: Sparkles, title: "Cotización a tu medida", text: "Según el tamaño y el estado de tu vehículo." },
  { Icon: ShieldCheck, title: "Cuidado profesional", text: "Técnicas seguras que respetan tu pintura." },
  { Icon: Car, title: "Todo tipo de vehículos", text: "Clásicos, deportivos y tu carro de diario." },
];

export function Perks() {
  return (
    <section className="border-y border-bone/[0.07] bg-graphite" aria-label="Por qué reservar con Crazy Shine">
      <ul className="container-x grid sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ Icon, title, text }) => (
          <li
            key={title}
            className="group flex gap-4 border-bone/[0.07] py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-silver transition-transform duration-700 group-hover:-rotate-12" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bone">{title}</p>
              <p className="mt-1.5 text-sm text-metal">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
