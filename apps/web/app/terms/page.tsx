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
      updated="June 30, 2026"
      intro="These Terms of Service (“Terms”) govern your use of Maple Auto Studio’s services, website, and communications, including our on-site chat. By booking an appointment, requesting a quote, or otherwise using our services, you agree to these Terms."
    >
      <LegalSection index={1} title="Our Services">
        <p>
          Maple Auto Studio provides automotive detailing and appearance services
          including, but not limited to, detailing packages, ceramic coating, paint
          correction, window tint, boat and trailer detailing, and accessory
          installation. Mechanical repair is handled by our partner, Akaal Auto
          Hub. Specific services and availability are subject to change without
          notice.
        </p>
      </LegalSection>

      <LegalSection index={2} title="Quotes &amp; Pricing">
        <ul>
          <li>
            Quotes provided over the phone, by text, through our on-site chat, or
            in person are <strong>estimates only</strong> and may change once your
            vehicle has been inspected in person.
          </li>
          <li>We provide quotes directly — pricing is not published on this website.</li>
          <li>
            Final pricing is confirmed with you before any work begins, and we will
            not carry out additional work beyond what was quoted without your
            approval.
          </li>
          <li>For larger jobs, a deposit may be required before work begins.</li>
        </ul>
      </LegalSection>

      <LegalSection index={3} title="Appointments &amp; Scheduling">
        <p>
          Maple Auto Studio operates by appointment. Please arrive at your
          scheduled time; late arrivals may need to be rescheduled. After-hours
          drop-off may be available — ask our team for details. We make reasonable
          efforts to complete work within the estimated timeframe, but some
          services (such as multi-stage paint correction or ceramic coating) can
          span one or more days, and completion times vary with the scope of work
          and product cure times.
        </p>
      </LegalSection>

      <LegalSection index={4} title="Cancellations &amp; No-Shows">
        <p>
          Please let us know as early as possible if you need to cancel or
          reschedule an appointment. Repeated no-shows or last-minute cancellations
          may affect your ability to book future appointments.
        </p>
      </LegalSection>

      <LegalSection index={5} title="Payment">
        <p>
          Payment is due upon completion of services unless other arrangements have
          been made in advance. We accept the payment methods listed in-store or
          communicated to you at the time of booking. Payment is handled in person;
          we do not process payments through this website. Deposits collected on
          larger jobs are applied toward the final invoice.
        </p>
      </LegalSection>

      <LegalSection index={6} title="Vehicle Condition &amp; Liability">
        <ul>
          <li>
            Please remove personal belongings and valuables from your vehicle
            before drop-off. Maple Auto Studio is not responsible for items left
            inside the vehicle.
          </li>
          <li>
            We are not responsible for pre-existing damage, mechanical issues, or
            wear not directly related to the service performed.
          </li>
          <li>
            While we take care to protect your vehicle during service, Maple Auto
            Studio’s liability for any damage arising from our work is limited to
            the cost of the service provided.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index={7} title="Service Guarantee">
        <p>
          We stand behind the quality of our work. Coatings and films we install
          may carry manufacturer or workmanship warranties, which vary by product
          and are explained at the time of service. If you notice an issue directly
          related to work we performed, contact us promptly so we can make it right.
        </p>
      </LegalSection>

      <LegalSection index={8} title="Communications &amp; On-Site Chat">
        <p>
          By providing your phone number or using our website and on-site chat, you
          consent to receive communications from Maple Auto Studio about
          appointments, quotes, and service updates, as described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>. Message and data rates may
          apply to text messages. You may opt out of texts at any time by replying
          STOP.
        </p>
        <p>
          Our on-site chat may use automated or AI-assisted replies to answer common
          questions and help schedule appointments. Automated replies assist our
          team and do not replace a final review by our staff for quotes,
          diagnostics, or service decisions.
        </p>
      </LegalSection>

      <LegalSection index={9} title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Maple Auto Studio is not liable
          for any indirect, incidental, or consequential damages arising from the
          use of our services or communications. Nothing in these Terms limits any
          rights you may have that cannot be excluded under applicable Saskatchewan
          or Canadian law.
        </p>
      </LegalSection>

      <LegalSection index={10} title="Governing Law">
        <p>
          These Terms are governed by the laws of the Province of Saskatchewan and
          the federal laws of Canada applicable therein.
        </p>
      </LegalSection>

      <LegalSection index={11} title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of our services
          after changes are posted means you accept the revised Terms. The “Last
          updated” date above reflects the most recent revision.
        </p>
      </LegalSection>

      <LegalSection index={12} title="Contact Us">
        <div className="legal-callout">
          <p>
            <strong>{SHOP.brand.full}</strong>
          </p>
          <p>
            {SHOP.location.line1}, {SHOP.location.city}
            <br />
            Phone: <a href={`tel:${SHOP.phoneTel}`}>{SHOP.phone}</a>
            <br />
            Email: <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
          </p>
        </div>
      </LegalSection>
    </LegalDoc>
  );
}
