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
      updated="June 30, 2026"
      intro="Maple Auto Studio (“we,” “us,” “our”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information, in accordance with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and Canada’s Anti-Spam Legislation (CASL)."
    >
      <LegalSection index={1} title="Information We Collect">
        <p>When you contact us, request a quote, or book a service, we may collect:</p>
        <ul>
          <li>Your name, phone number, and email address</li>
          <li>Vehicle information (make, model, year, and the service you’re interested in)</li>
          <li>
            Messages and details you provide through our website booking form,
            on-site chat, phone, text, or in person at the shop
          </li>
          <li>Appointment and service history</li>
          <li>
            Basic technical data (such as pages visited) collected by our website
            host to keep the site secure and running
          </li>
        </ul>
        <p>
          We do not collect or store payment card details through this website —
          payment is handled in person at the shop.
        </p>
      </LegalSection>

      <LegalSection index={2} title="How We Use Your Information">
        <p>We use the information you provide to:</p>
        <ul>
          <li>Schedule, confirm, and manage your appointments</li>
          <li>Prepare quotes and estimates and discuss them with you by phone or in person</li>
          <li>Send appointment confirmations, reminders, and follow-up messages</li>
          <li>Respond to inquiries submitted by phone, text, on-site chat, or our website</li>
          <li>Improve our services and customer experience</li>
          <li>Meet our legal, accounting, and tax obligations</li>
        </ul>
      </LegalSection>

      <LegalSection index={3} title="Communications &amp; Consent">
        <div className="legal-callout">
          <p>
            By giving us your contact details through our website, booking form,
            on-site chat, or in person, you consent to receive service-related
            communications from Maple Auto Studio — appointment confirmations,
            reminders, quotes, and updates about the work on your vehicle.
          </p>
          <ul>
            <li>
              <strong>We communicate primarily by email.</strong> If you provide a
              phone number, we may also contact you by phone or text about your
              specific booking.
            </li>
            <li>
              <strong>Message and data rates may apply</strong> to any text
              messages, depending on your mobile carrier and plan.
            </li>
            <li>
              You can <strong>opt out of text messages at any time</strong> by
              replying STOP, or ask us to stop by email or phone. Reply HELP for
              assistance.
            </li>
            <li>
              <strong>
                We do not sell, rent, or share your phone number or contact
                information
              </strong>{" "}
              with third parties for their own marketing. Your details are used
              only to communicate with you about your service with Maple Auto
              Studio.
            </li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection index={4} title="Third-Party Service Providers">
        <p>
          We use trusted third-party platforms to run our website and communicate
          with customers, including:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> — website hosting and delivery.
          </li>
          <li>
            <strong>Supabase</strong> — secure database for booking and customer
            records.
          </li>
          <li>
            <strong>Resend</strong> — email delivery for booking confirmations and
            follow-ups.
          </li>
          <li>
            <strong>LeadConnector / GoHighLevel</strong> — our on-site chat widget
            and messaging, used to receive and respond to customer inquiries.
          </li>
        </ul>
        <p>
          These providers process information on our behalf and are required to
          protect your data and use it only for the purposes we’ve authorized.
          They do not use your information for their own marketing purposes.
        </p>
      </LegalSection>

      <LegalSection index={5} title="How We Protect Your Information">
        <p>
          We use reasonable administrative, technical, and physical safeguards to
          protect your personal information from unauthorized access, disclosure,
          alteration, or destruction. Access to customer information is limited to
          staff who need it to do their job.
        </p>
      </LegalSection>

      <LegalSection index={6} title="Data Retention">
        <p>
          We keep customer information for as long as necessary to provide our
          services, maintain accurate business and tax records, and comply with
          legal obligations. You may request deletion of your information at any
          time, subject to our legal and recordkeeping requirements.
        </p>
      </LegalSection>

      <LegalSection index={7} title="Your Rights">
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request corrections to inaccurate information</li>
          <li>Withdraw consent to receive marketing communications at any time</li>
          <li>Request deletion of your information, subject to legal retention requirements</li>
        </ul>
        <p>To exercise any of these rights, contact us using the details below.</p>
      </LegalSection>

      <LegalSection index={8} title="Children’s Privacy">
        <p>
          Our services are not directed to individuals under the age of 18, and we
          do not knowingly collect personal information from minors.
        </p>
      </LegalSection>

      <LegalSection index={9} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in
          our practices or for legal reasons. The “Last updated” date at the top of
          this page shows when it was last revised.
        </p>
      </LegalSection>

      <LegalSection index={10} title="Contact Us">
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
