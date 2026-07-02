import { LegalDoc, LegalSection } from "@/components/marketing/LegalDoc";
import { SHOP } from "@/lib/content/contact";

export const metadata = {
  title: "Privacy Policy — Maple Auto Studio",
  description:
    "How Maple Auto Studio collects, uses, and protects your personal information, in line with PIPEDA and CASL.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Maple Auto Studio",
    description:
      "How Maple Auto Studio collects, uses, and protects your personal information, in line with PIPEDA and CASL.",
    url: "https://mapleautostudio.ca/privacy",
    siteName: "Maple Auto Studio",
    locale: "en_CA",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="July 1, 2026"
      intro="Maple Auto Studio (“we,” “us,” or “our”), an independent detailing and accessories studio located at 331 60 St E, Saskatoon, Saskatchewan, respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what we collect, how we use it, and the choices you have. It is intended to comply with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and Canada’s Anti-Spam Legislation (CASL)."
    >
      <LegalSection index={1} title="Information We Collect">
        <p>
          We collect information you provide directly to us when you contact us,
          request a quote, book a service, or interact with our website chat,
          including:
        </p>
        <ul>
          <li>Your name</li>
          <li>Your phone number</li>
          <li>Your email address</li>
          <li>
            Vehicle details (make, model, condition, and the service you’re
            interested in)
          </li>
          <li>Any message or information you choose to share with us</li>
        </ul>
      </LegalSection>

      <LegalSection index={2} title="How We Use Your Information">
        <p>We use the information you provide to:</p>
        <ul>
          <li>Respond to your inquiries and provide quotes</li>
          <li>Schedule, confirm, and follow up on appointments</li>
          <li>Send you service-related updates about your vehicle</li>
          <li>
            Send you promotional offers, but only where you have consented to
            receive them
          </li>
          <li>Improve our services and customer experience</li>
        </ul>
      </LegalSection>

      <LegalSection index={3} title="Text Message (SMS) Communications">
        <p>
          When you provide your phone number through our website chat widget,
          booking form, or by contacting us, you may consent to receive text
          messages from Maple Auto Studio related to your inquiry, appointments,
          and (where you opt in) promotional offers.
        </p>
        <ul>
          <li>Message frequency varies.</li>
          <li>Message and data rates may apply.</li>
          <li>
            You can opt out at any time by replying <strong>STOP</strong>.
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
            Text messaging originator opt-in data and consent are never shared
            with third parties for marketing.
          </p>
        </div>
      </LegalSection>

      <LegalSection index={4} title="Service Providers">
        <p>
          We use trusted third-party platforms to help us operate our business
          and communicate with you. These providers process your information
          only on our behalf and are not permitted to use it for their own
          purposes:
        </p>
        <ul>
          <li>
            <strong>GoHighLevel / LeadConnector</strong> — our customer
            relationship and messaging platform, used to manage inquiries,
            appointments, and SMS/email communications.
          </li>
          <li>
            <strong>AppointWise</strong> — our automated appointment assistant,
            used to respond to inquiries and help schedule bookings.
          </li>
        </ul>
      </LegalSection>

      <LegalSection index={5} title="How We Protect Your Information">
        <p>
          We take reasonable administrative, technical, and physical measures to
          safeguard your personal information against unauthorized access, use,
          or disclosure.
        </p>
      </LegalSection>

      <LegalSection index={6} title="Retention">
        <p>
          We keep your personal information only as long as necessary to fulfil
          the purposes described in this policy or as required by law.
        </p>
      </LegalSection>

      <LegalSection index={7} title="Your Rights">
        <p>
          Under PIPEDA, you have the right to access the personal information we
          hold about you and to request corrections. You may also withdraw your
          consent to marketing communications at any time. To make a request,
          contact us using the details below.
        </p>
      </LegalSection>

      <LegalSection index={8} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The “Effective
          date” above reflects the most recent revision.
        </p>
      </LegalSection>

      <LegalSection index={9} title="Contact Us">
        <p>
          If you have questions about this Privacy Policy or your personal
          information, contact us at:
        </p>
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
