import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { BookingRow } from "@maple/core/supabase/types";

export function useCustomerHistory(phone: string) {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("bookings")
        .select("*")
        .eq("contact_phone", phone)
        .order("created_at", { ascending: false });
      if (err) setError(err.message);
      else setBookings(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [phone]);

  return { bookings, loading, error };
}
