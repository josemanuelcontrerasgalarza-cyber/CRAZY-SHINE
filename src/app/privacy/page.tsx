import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="2026">
      <section>
        <h2>Information we collect</h2>
        <p>
          This website does not use contact forms or store personal data. When you book through WhatsApp, the information
          you choose to share (name, phone number, vehicle details) is received through WhatsApp and used only to answer
          your request and schedule your service.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>
          We use your details exclusively to provide quotes, confirm appointments and deliver the detailing service. We do
          not sell or share your information with third parties.
        </p>
      </section>
      <section>
        <h2>Third-party services</h2>
        <p>
          Bookings are handled through WhatsApp, which is subject to its own privacy policy. Hosting providers may process
          technical data (such as IP addresses) to deliver this website securely.
        </p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us at any time to access, correct or delete the information you have shared with us by contacting us
          on WhatsApp.
        </p>
      </section>
      <p className="text-sm text-metal">
        This document is a general template and should be reviewed to comply with the data-protection law applicable to
        the business (e.g. Ley 1581 de 2012 in Colombia).
      </p>
    </LegalPage>
  );
}
