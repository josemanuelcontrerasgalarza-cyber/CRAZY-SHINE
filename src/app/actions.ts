"use server";

import { db } from "@/lib/db";
import { whatsappLink } from "@/config/site";
import { services } from "@/content/services";

export type BookingState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "phone" | "consent", string>> }
  | { status: "success"; whatsapp: string; saved: boolean };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/**
 * Stores a booking request in Neon (when DATABASE_URL is set) and returns a WhatsApp link
 * with the request pre-written, so the conversation continues where the business answers.
 */
export async function createBooking(_prev: BookingState, form: FormData): Promise<BookingState> {
  // Honeypot: bots fill every field.
  if (clean(form.get("company"), 100)) return { status: "success", whatsapp: whatsappLink(), saved: false };

  const name = clean(form.get("name"), 120);
  const phone = clean(form.get("phone"), 20);
  const vehicle = clean(form.get("vehicle"), 120);
  const serviceInput = clean(form.get("service"), 80);
  const service = services.some((s) => s.name === serviceInput) ? serviceInput : "";
  const dateInput = clean(form.get("date"), 10);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateInput) ? dateInput : null;
  const message = String(form.get("message") ?? "").trim().slice(0, 1000);
  const consent = form.get("consent") === "on";

  const fields: Partial<Record<"name" | "phone" | "consent", string>> = {};
  if (name.length < 2) fields.name = "Escribe tu nombre.";
  if (phone.replace(/\D/g, "").length < 7) fields.phone = "Escribe un número de contacto válido.";
  if (!consent) fields.consent = "Necesitamos tu autorización para contactarte.";
  if (Object.keys(fields).length) return { status: "error", message: "Revisa los campos marcados.", fields };

  let saved = false;
  const sql = db();
  if (sql) {
    try {
      await sql`
        insert into bookings (name, phone, vehicle, service, preferred_date, message, consent)
        values (${name}, ${phone}, ${vehicle || null}, ${service || null}, ${date}, ${message || null}, ${consent})
      `;
      saved = true;
    } catch (error) {
      // Never lose the lead: log and continue to WhatsApp.
      console.error("[booking] Neon insert failed", error);
    }
  }

  const lines = [
    "Hola Crazy Shine, quiero reservar un servicio.",
    `• Nombre: ${name}`,
    `• Teléfono: ${phone}`,
    vehicle && `• Vehículo: ${vehicle}`,
    service && `• Servicio: ${service}`,
    date && `• Fecha preferida: ${date}`,
    message && `• Mensaje: ${message}`,
  ].filter(Boolean);

  return { status: "success", whatsapp: whatsappLink(lines.join("\n")), saved };
}
