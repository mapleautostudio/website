import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Copy .env.local.example to .env.local and add the key.",
    );
  }
  if (!cached) cached = new Resend(key);
  return cached;
}

export const EMAIL_CONFIG = {
  from:
    process.env.BOOKING_NOTIFY_FROM ??
    "Maple Auto Studio <onboarding@resend.dev>",
  notifyTo: process.env.BOOKING_NOTIFY_TO ?? "khushdeep899@gmail.com",
};
