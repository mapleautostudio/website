import type { BookingStatus } from "@maple/core/supabase/types";
import { colors } from "../theme/tokens";

export const STATUS_STYLES: Record<BookingStatus, { text: string; bg: string }> = {
  new:       { text: colors.accent, bg: "rgba(212,165,116,0.12)" },
  confirmed: { text: colors.sage,   bg: "rgba(154,169,160,0.12)" },
  declined:  { text: colors.fg2,    bg: "rgba(245,242,236,0.06)" },
  no_show:   { text: colors.fg2,    bg: "rgba(245,242,236,0.06)" },
  completed: { text: colors.fg2,    bg: "rgba(245,242,236,0.06)" },
};

export function formatStatus(status: BookingStatus): string {
  return status.replace(/_/g, " ").toUpperCase();
}
