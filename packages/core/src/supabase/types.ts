export type BookingStatus =
  | "new"
  | "confirmed"
  | "declined"
  | "completed"
  | "no_show";

export type BookingTimeWindow =
  | "morning"
  | "afternoon"
  | "evening"
  | "flexible";

export type BookingRow = {
  id: string;
  reference: string;
  idempotency_key: string;
  status: BookingStatus;

  vehicle_year: number;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_notes: string | null;

  service: string;
  preferred_date: string;
  preferred_time_window: BookingTimeWindow;

  contact_name: string;
  contact_phone: string;
  contact_email: string;

  notes: string | null;

  email_sent_at: string | null;

  created_at: string;
  updated_at: string;
};
