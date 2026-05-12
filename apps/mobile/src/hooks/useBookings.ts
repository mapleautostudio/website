import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { BookingRow, BookingStatus } from "@maple/core/supabase/types";

export type BookingFilter = BookingStatus | "all";

export function useBookings(filter: BookingFilter) {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error: err } = await query;
    if (err) {
      setError(err.message);
    } else {
      setBookings(data ?? []);
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { bookings, loading, error, refetch: fetch };
}
