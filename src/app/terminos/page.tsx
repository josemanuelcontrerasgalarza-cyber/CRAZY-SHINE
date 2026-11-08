import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Términos y condiciones", alternates: { canonical: "/terminos" } };

export default function TermsPage() {
  return (
    <LegalPage title="Términos y condiciones" updated="2026">
      <section>
        <h2>Servicios</h2>
        <p>Crazy Shine presta servicios de lavado profesional y detailing automotriz. El alcance de cada servicio se acuerda antes de iniciar.</p>
      </section>
      <section>
        <h2>Cotizaciones y precios</h2>
        <p>
          Los precios dependen del tamaño, el estado del vehículo y el servicio elegido. Las cotizaciones se entregan por WhatsApp
          y se confirman antes de la cita.
        </p>
      </section>
      <section>
        <h2>Agendamiento</h2>
        <p>Las citas se confirman por WhatsApp. Si necesitas reprogramar o cancelar, avísanos con anticipación.</p>
      </section>
      <section>
        <h2>Polarizado</h2>
        <p>
          Instalamos láminas dentro de los niveles de transmisión de luz permitidos por la normativa de tránsito colombiana. Los
          permisos especiales para tonos más oscuros son responsabilidad del propietario del vehículo.
        </p>
      </section>
      <section>
        <h2>Estado del vehículo</h2>
        <p>
          Los resultados dependen del estado original de la pintura y los materiales. Rayones profundos, golpes o daños previos
          pueden no corregirse por completo; te informaremos cualquier limitación antes de empezar.
        </p>
      </section>
      <section>
        <h2>Imágenes del sitio</h2>
        <p>
          Las fotografías de vehículos del sitio son imágenes de referencia de terceros (Unsplash y Wikimedia Commons) y no
          corresponden a trabajos realizados por Crazy Shine, salvo que se indique lo contrario.
        </p>
      </section>
      <p className="text-sm text-metal">Este documento es una plantilla general y debe ser revisado por el responsable del negocio.</p>
    </LegalPage>
  );
}
