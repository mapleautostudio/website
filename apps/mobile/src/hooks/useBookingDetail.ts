import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { BookingRow, BookingStatus } from "@maple/core/supabase/types";

export function useBookingDetail(id: string) {
  const [booking, setBooking] = useState<BookingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    if (err) setError(err.message);
    else setBooking(data);
    setLoading(false);
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = useCallback(async (status: BookingStatus) => {
    if (!booking) return;
    setUpdating(true);
    const { error: err } = await supabase
      .from("bookings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (err) setError(err.message);
    else setBooking((b) => b ? { ...b, status } : b);
    setUpdating(false);
  }, [booking, id]);

  return { booking, loading, updating, error, updateStatus, refetch: fetch };
}
