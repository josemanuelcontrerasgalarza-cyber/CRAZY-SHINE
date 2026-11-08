import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="2026">
      <section>
        <h2>Services</h2>
        <p>
          Crazy Shine provides professional car wash and automotive detailing services. The scope of each service is
          agreed with the client before work begins.
        </p>
      </section>
      <section>
        <h2>Quotes & pricing</h2>
        <p>
          Prices depend on the vehicle&apos;s size, condition and the selected service. Quotes are provided through WhatsApp
          and confirmed before the appointment.
        </p>
      </section>
      <section>
        <h2>Appointments</h2>
        <p>
          Bookings are confirmed via WhatsApp. Please let us know in advance if you need to reschedule or cancel.
        </p>
      </section>
      <section>
        <h2>Vehicle condition</h2>
        <p>
          Results depend on the original condition of the paint and materials. Deep scratches, chips or existing damage
          may not be fully correctable; we will inform you of any limitations before starting.
        </p>
      </section>
      <section>
        <h2>Imagery</h2>
        <p>
          Some images on this website are illustrative studio renders and do not depict specific jobs performed by Crazy
          Shine unless stated otherwise.
        </p>
      </section>
      <p className="text-sm text-metal">This document is a general template and should be reviewed by the business owner.</p>
    </LegalPage>
  );
}
