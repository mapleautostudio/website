import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

Deno.serve(async (req) => {
  let payload: { record?: Record<string, unknown> };
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON payload", { status: 400 });
  }

  const booking = payload.record;
  if (!booking) {
    return new Response("No record in payload", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: tokens, error: dbError } = await supabase
    .from("push_tokens")
    .select("token");

  if (dbError) {
    console.error("push_tokens query failed:", dbError.message);
    return new Response("Database error", { status: 500 });
  }

  if (!tokens || tokens.length === 0) {
    return new Response("No push tokens registered", { status: 200 });
  }

  const messages = tokens.map(({ token }: { token: string }) => ({
    to: token,
    sound: "default",
    title: `New booking — ${booking.contact_name ?? "Unknown"}`,
    body: `${booking.service ?? "Service"} · ${
      booking.preferred_date
        ? new Date(booking.preferred_date as string).toLocaleDateString("en-CA", {
            month: "short",
            day: "numeric",
          })
        : ""
    }`,
    data: { bookingId: booking.id },
  }));

  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Expo push API error:", response.status, text);
      return new Response("Expo push API error", { status: 502 });
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Network error calling Expo push API:", err);
    return new Response("Network error", { status: 502 });
  }
});
