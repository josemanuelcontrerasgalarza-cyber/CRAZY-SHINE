import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de privacidad", alternates: { canonical: "/privacidad" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" updated="2026">
      <section>
        <h2>Responsable</h2>
        <p>Crazy Shine es responsable del tratamiento de los datos personales recibidos a través de este sitio web y de WhatsApp.</p>
      </section>
      <section>
        <h2>Datos que recopilamos</h2>
        <p>
          Cuando solicitas un servicio a través del formulario o de WhatsApp, recibimos los datos que decides compartir: nombre,
          teléfono, vehículo, servicio de interés, fecha preferida y mensaje.
        </p>
      </section>
      <section>
        <h2>Finalidad</h2>
        <p>
          Usamos tus datos únicamente para responder tu solicitud, enviarte la cotización, agendar y prestar el servicio. No
          vendemos ni compartimos tu información con terceros con fines comerciales.
        </p>
      </section>
      <section>
        <h2>Almacenamiento</h2>
        <p>
          Las solicitudes del formulario se guardan en una base de datos segura del proveedor de infraestructura del sitio. Las
          conversaciones por WhatsApp se rigen por la política de privacidad de WhatsApp.
        </p>
      </section>
      <section>
        <h2>Tus derechos</h2>
        <p>
          Puedes conocer, actualizar, rectificar o solicitar la eliminación de tus datos en cualquier momento escribiéndonos por
          WhatsApp, conforme a la Ley 1581 de 2012 y sus decretos reglamentarios.
        </p>
      </section>
      <p className="text-sm text-metal">Este documento es una plantilla general y debe ser revisado por el responsable del negocio.</p>
    </LegalPage>
  );
}
