import { z } from "zod";
import { SERVICES } from "@/lib/content/services";
import { SERVICE_SLUGS } from "@maple/core/content/service-slugs";

export const SERVICE_OPTIONS = SERVICES.filter((s) => s.slug !== "photos").map(
  (s) => ({ value: s.slug, label: s.shortTitle }),
);

export const TIME_WINDOWS = [
  { value: "morning", label: "Morning (8 – 12)" },
  { value: "afternoon", label: "Afternoon (12 – 16)" },
  { value: "evening", label: "Evening (16 – 18)" },
  { value: "flexible", label: "I'm flexible" },
] as const;

const currentYear = new Date().getFullYear();

export const bookingSchema = z.object({
  idempotencyKey: z.string().uuid(),

  vehicleYear: z
    .number({ error: "Year is required" })
    .int("Year must be a whole number")
    .min(1950, "Year must be 1950 or later")
    .max(currentYear + 2, `Year can't be later than ${currentYear + 2}`),
  vehicleMake: z
    .string()
    .trim()
    .min(1, "Make is required")
    .max(40, "Make is too long"),
  vehicleModel: z
    .string()
    .trim()
    .min(1, "Model is required")
    .max(60, "Model is too long"),
  vehicleNotes: z
    .string()
    .trim()
    .max(200, "Keep vehicle notes under 200 characters")
    .optional()
    .or(z.literal("")),

  service: z.enum([...SERVICE_SLUGS] as [string, ...string[]], {
    error: "Pick a service",
  }),
  preferredDate: z
    .string()
    .min(1, "Preferred date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date")
    .refine((v) => {
      // Parse the YYYY-MM-DD value as local midnight; `new Date("YYYY-MM-DD")`
      // parses as UTC, which wrongly rejects today's date in negative-offset
      // timezones (e.g. Saskatoon, UTC-6).
      const d = new Date(`${v}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today;
    }, "Date can't be in the past"),
  preferredTimeWindow: z.enum(["morning", "afternoon", "evening", "flexible"]),

  contactName: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(80, "Name is too long"),
  contactPhone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[0-9 +()\-.]+$/, "Enter a valid phone number")
    .min(7, "Phone is too short")
    .max(30, "Phone is too long"),
  contactEmail: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(120, "Email is too long"),

  notes: z
    .string()
    .trim()
    .max(800, "Keep notes under 800 characters")
    .optional()
    .or(z.literal("")),

  // Honeypot — must stay empty. Bots tend to fill every field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
