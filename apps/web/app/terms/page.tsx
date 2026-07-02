import Link from "next/link";
import { LegalDoc, LegalSection } from "@/components/marketing/LegalDoc";
import { SHOP } from "@/lib/content/contact";

export const metadata = {
  title: "Terms of Service — Maple Auto Studio",
  description:
    "The terms that govern your use of Maple Auto Studio’s services, website, and communications.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — Maple Auto Studio",
    description:
      "The terms that govern your use of Maple Auto Studio’s services, website, and communications.",
    url: "https://mapleautostudio.ca/terms",
    siteName: "Maple Auto Studio",
    locale: "en_CA",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      updated="July 1, 2026"
      intro="These Terms of Service (“Terms”) govern your use of the services provided by Maple Auto Studio (“we,” “us,” or “our”), located at 331 60 St E, Saskatoon, Saskatchewan. By booking a service, contacting us, or using our website, you agree to these Terms."
    >
      <LegalSection index={1} title="Our Services">
        <p>
          Maple Auto Studio provides automotive detailing, window tinting,
          ceramic coating, paint correction, boat detailing (trailerable units
          only), and related accessories and installation. Services are provided
          by appointment.
        </p>
      </LegalSection>

      <LegalSection index={2} title="Quotes and Pricing">
        <p>
          Coatings, correction, tint, and detailing are priced by vehicle and
          condition. We provide a transparent quote before any product is
          applied. If a job runs longer than estimated, the quoted price stands
          unless the scope of work changes. Any change in scope will be
          communicated to you before we proceed.
        </p>
      </LegalSection>

      <LegalSection index={3} title="Booking and Appointments">
        <p>
          Appointments can be requested through our website, by phone, or by
          text. We confirm bookings directly with you. Please arrive with your
          vehicle reasonably clear of personal belongings so our technician can
          work efficiently.
        </p>
      </LegalSection>

      <LegalSection index={4} title="Cancellations and Rescheduling">
        <p>
          If you need to cancel or reschedule, please contact us as far in
          advance as possible so we can offer your slot to another customer.
          Deposit and cancellation terms, where they apply, will be communicated
          to you at the time of booking.
        </p>
      </LegalSection>

      <LegalSection index={5} title="Payment">
        <p>
          Payment is due upon completion of the service unless otherwise agreed
          in writing. Accepted payment methods will be confirmed at the time of
          booking.
        </p>
      </LegalSection>

      <LegalSection index={6} title="Text Message (SMS) Program Terms">
        <p>
          By providing your phone number, you consent to receive text messages
          from Maple Auto Studio regarding your inquiry, appointments, and —
          where you have separately opted in — promotional offers.
        </p>
        <ul>
          <li>Message frequency varies.</li>
          <li>Message and data rates may apply.</li>
          <li>
            Reply <strong>STOP</strong> at any time to unsubscribe.
          </li>
          <li>
            Reply <strong>HELP</strong> for assistance.
          </li>
          <li>
            Consent to receive text messages is not a condition of purchasing
            any service.
          </li>
        </ul>
        <div className="legal-callout">
          <p>
            <strong>
              We do not sell, rent, or share your phone number or your SMS
              consent with any third parties or affiliates for their marketing
              purposes.
            </strong>{" "}
            For full details on how we handle your information, see our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </LegalSection>

      <LegalSection index={7} title="Results and Limitations">
        <p>
          We take care to deliver professional results, and we document work
          with before/after photos. However, results can vary depending on the
          age, condition, and prior treatment of your vehicle’s paint, glass,
          and surfaces. Pre-existing damage, defects, or wear that cannot be
          fully corrected will be discussed with you. Detailing and coating
          services do not guarantee removal of all defects, stains, or
          imperfections.
        </p>
      </LegalSection>

      <LegalSection index={8} title="Liability">
        <p>
          To the fullest extent permitted by law, Maple Auto Studio is not
          liable for pre-existing damage, damage arising from prior repairs or
          aftermarket modifications, or normal wear revealed during the
          detailing process. Please remove all valuables and personal items from
          your vehicle before service; we are not responsible for items left
          behind.
        </p>
      </LegalSection>

      <LegalSection index={9} title="Warranties">
        <p>
          Where a manufacturer or product warranty applies (for example, ceramic
          coatings or window film), the terms of that warranty govern. We will
          provide warranty details for applicable services at the time of
          service.
        </p>
      </LegalSection>

      <LegalSection index={10} title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. The “Effective date”
          above reflects the most recent revision.
        </p>
      </LegalSection>

      <LegalSection index={11} title="Governing Law">
        <p>
          These Terms are governed by the laws of the Province of Saskatchewan
          and the applicable laws of Canada.
        </p>
      </LegalSection>

      <LegalSection index={12} title="Contact Us">
        <p>Questions about these Terms? Reach us at:</p>
        <div className="legal-callout">
          <p>
            <strong>{SHOP.brand.full}</strong>
          </p>
          <p>
            {SHOP.location.line1}, {SHOP.location.city}
            <br />
            Email: <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
            <br />
            Phone: <a href={`tel:${SHOP.phoneTel}`}>{SHOP.phone}</a>
          </p>
        </div>
      </LegalSection>
    </LegalDoc>
  );
}
