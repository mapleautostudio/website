import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

Deno.serve(async (req) => {
  const payload = await req.json();
  const booking = payload.record;

  if (!booking) {
    return new Response("No record in payload", { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: tokens } = await supabase
    .from("push_tokens")
    .select("token");

  if (!tokens || tokens.length === 0) {
    return new Response("No push tokens registered", { status: 200 });
  }

  const messages = tokens.map(({ token }) => ({
    to: token,
    sound: "default",
    title: `New booking — ${booking.contact_name}`,
    body: `${booking.service} · ${new Date(booking.preferred_date).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}`,
    data: { bookingId: booking.id },
  }));

  const response = await fetch(EXPO_PUSH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messages),
  });

  const result = await response.json();
  return new Response(JSON.stringify(result), { status: 200 });
});
