"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { createBooking, type BookingState } from "@/app/actions";
import { services } from "@/content/services";
import { MaskedHeadline, Reveal } from "../ui/Reveal";
import { WhatsAppIcon } from "../ui/icons";

const initial: BookingState = { status: "idle" };

const field =
  "peer w-full border-0 border-b border-bone/20 bg-transparent px-0 pb-3 pt-2 text-lg text-bone placeholder:text-bone/25 transition-colors focus:border-crazy focus:outline-none focus:ring-0";

export function Booking() {
  const [state, action, pending] = useActionState(createBooking, initial);

  useEffect(() => {
    if (state.status === "success") window.open(state.whatsapp, "_blank", "noopener,noreferrer");
  }, [state]);

  const err = state.status === "error" ? state.fields ?? {} : {};
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="reserva" className="relative border-t border-bone/[0.07] bg-ink py-28 sm:py-40" aria-labelledby="booking-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label mb-8 text-metal"><span className="text-crazy">(06)</span> — Reserva</p>
          <MaskedHeadline
            id="booking-title"
            className="display text-[clamp(3.4rem,8vw,7.5rem)] text-bone"
            lines={[
              "Reserva tu",
              <span key="o" className="text-outline">
                servicio.
              </span>,
            ]}
          />
          <Reveal>
            <p className="mt-8 max-w-sm leading-relaxed text-metal">
              Déjanos tus datos y el vehículo. Guardamos tu solicitud y seguimos la conversación por WhatsApp para confirmar
              fecha y cotización.
            </p>
            <ul className="mt-10 space-y-4 border-t border-bone/10 pt-8 text-sm text-bone/70">
              {["Respuesta por WhatsApp", "Cotización según tu vehículo", "Sin pagos en línea"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center bg-crazy text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          {state.status === "success" ? (
            <div className="flex h-full flex-col justify-center border border-bone/10 bg-graphite p-8 sm:p-12" role="status">
              <span className="label text-crazy">Solicitud {state.saved ? "registrada" : "lista"}</span>
              <p className="display mt-6 text-5xl text-bone sm:text-6xl">
                Gracias.
                <br />
                <span className="text-outline">Nos vemos pronto.</span>
              </p>
              <p className="mt-6 text-metal">Abrimos WhatsApp con tu solicitud. Si no se abrió, usa el botón.</p>
              <a
                href={state.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="shine mt-8 inline-flex w-fit items-center gap-3 bg-crazy px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                <WhatsAppIcon className="h-4 w-4" /> Continuar en WhatsApp
              </a>
            </div>
          ) : (
            <form action={action} noValidate className="grid gap-x-8 gap-y-10 border border-bone/10 bg-graphite p-6 sm:grid-cols-2 sm:p-10">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <Field label="Nombre" error={err.name} htmlFor="b-name">
                <input id="b-name" name="name" autoComplete="name" required className={field} placeholder="Tu nombre" aria-invalid={!!err.name} />
              </Field>
              <Field label="WhatsApp / Teléfono" error={err.phone} htmlFor="b-phone">
                <input id="b-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} placeholder="+57 300 000 0000" aria-invalid={!!err.phone} />
              </Field>
              <Field label="Vehículo" htmlFor="b-vehicle">
                <input id="b-vehicle" name="vehicle" className={field} placeholder="Ej.: Mustang GT 2021" />
              </Field>
              <Field label="Fecha preferida" htmlFor="b-date">
                <input id="b-date" name="date" type="date" min={today} className={clsx(field, "[color-scheme:dark]")} />
              </Field>
              <Field label="Servicio" htmlFor="b-service" className="sm:col-span-2">
                <select id="b-service" name="service" defaultValue="" className={clsx(field, "appearance-none [&>option]:bg-ink")}>
                  <option value="">Aún no lo sé — asesórenme</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.number} — {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Mensaje (opcional)" htmlFor="b-msg" className="sm:col-span-2">
                <textarea id="b-msg" name="message" rows={3} maxLength={1000} className={clsx(field, "resize-none")} placeholder="Estado del vehículo, dudas…" />
              </Field>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-bone/60">
                  <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[#ff5b14]" aria-invalid={!!err.consent} />
                  <span>
                    Autorizo el tratamiento de mis datos personales de acuerdo con la{" "}
                    <Link href="/privacidad" className="underline underline-offset-4 hover:text-silver">
                      Política de privacidad
                    </Link>{" "}
                    para gestionar mi solicitud.
                  </span>
                </label>
                {err.consent && <p className="mt-2 text-xs text-silver">{err.consent}</p>}
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-metal" aria-live="polite">
                  {state.status === "error" ? state.message : "Tus datos no se comparten con terceros."}
                </p>
                <button
                  type="submit"
                  disabled={pending}
                  className="shine group inline-flex items-center justify-center gap-4 bg-crazy py-2 pl-6 pr-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-bone disabled:opacity-60"
                >
                  <span>
                    <span className="opacity-50">[ </span>Enviar solicitud<span className="opacity-50"> ]</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center bg-ink text-crazy transition-transform duration-500 group-hover:rotate-45">
                    {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
                  </span>
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, error, htmlFor, className, children }: { label: string; error?: string; htmlFor: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label block text-metal">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-silver">{error}</p>}
    </div>
  );
}
