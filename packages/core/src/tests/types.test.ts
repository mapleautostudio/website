import { describe, it, expectTypeOf } from "vitest";
import type { BookingRow, BookingStatus, BookingTimeWindow } from "../supabase/types";

describe("BookingStatus", () => {
  it("covers all five states", () => {
    const statuses: BookingStatus[] = [
      "new", "confirmed", "declined", "completed", "no_show",
    ];
    expectTypeOf(statuses).toMatchTypeOf<BookingStatus[]>();
  });
});

describe("BookingRow", () => {
  it("has required fields", () => {
    expectTypeOf<BookingRow>().toHaveProperty("id");
    expectTypeOf<BookingRow>().toHaveProperty("status");
    expectTypeOf<BookingRow>().toHaveProperty("contact_name");
    expectTypeOf<BookingRow>().toHaveProperty("contact_phone");
    expectTypeOf<BookingRow>().toHaveProperty("service");
    expectTypeOf<BookingRow>().toHaveProperty("preferred_date");
  });
});

describe("BookingTimeWindow", () => {
  it("covers all four windows", () => {
    const windows: BookingTimeWindow[] = [
      "morning", "afternoon", "evening", "flexible",
    ];
    expectTypeOf(windows).toMatchTypeOf<BookingTimeWindow[]>();
  });
});
