export type { BookingRow, BookingStatus, BookingTimeWindow } from "@maple/core/supabase/types";
import type { BookingRow } from "@maple/core/supabase/types";

export type BookingInsert = Omit<
  BookingRow,
  "id" | "status" | "email_sent_at" | "created_at" | "updated_at"
> & {
  status?: import("@maple/core/supabase/types").BookingStatus;
};
