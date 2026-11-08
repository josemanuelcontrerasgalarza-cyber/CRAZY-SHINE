const items = [
  "Agenda tu servicio por WhatsApp",
  "Detailing profesional",
  "Corrección de pintura",
  "Cotización según tu vehículo",
  "Cuidado automotriz premium",
];

/** Ticker fino sobre la navegación. */
export function AnnouncementBar() {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="relative h-8 overflow-hidden border-b border-bone/[0.06] bg-ink" aria-label="Anuncios">
      <ul className="flex h-full w-max animate-[marquee_60s_linear_infinite] items-center">
        {row.map((t, i) => (
          <li key={i} className="label flex items-center gap-8 pr-8 text-[0.62rem] text-bone/70" aria-hidden={i >= items.length}>
            {t}
            <span className="h-1 w-1 rotate-45 bg-silver" />
          </li>
        ))}
      </ul>
    </div>
  );
}
