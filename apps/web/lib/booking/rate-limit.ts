import "server-only";
import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

// Fixed-window tiers applied per client IP. A request must clear every tier.
// Tuned for a small shop's booking form: a short burst guard plus an hourly cap.
const BOOKING_RATE_LIMIT_TIERS = [
  { limit: 3, windowSeconds: 60 }, // burst: 3 per minute
  { limit: 8, windowSeconds: 60 * 60 }, // sustained: 8 per hour
] as const;

// Pull the client IP from the proxy headers Vercel/Next set. x-forwarded-for
// is a comma list "client, proxy1, proxy2" — the first entry is the client.
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

// Store only a salted hash of the IP, never the raw address.
function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "maple-auto-studio";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

// Best-effort abuse control. On ANY limiter error we fail OPEN — a real booking
// must never be lost to a limiter hiccup; the honeypot is the second layer.
export async function checkBookingRateLimit(
  supabase: SupabaseClient,
  ip: string,
): Promise<RateLimitResult> {
  const keyBase = `book:${hashIp(ip)}`;
  try {
    const results = await Promise.all(
      BOOKING_RATE_LIMIT_TIERS.map((tier) =>
        supabase.rpc("register_rate_hit", {
          p_key: `${keyBase}:${tier.windowSeconds}`,
          p_limit: tier.limit,
          p_window_seconds: tier.windowSeconds,
        }),
      ),
    );

    for (let i = 0; i < results.length; i++) {
      const { data, error } = results[i];
      if (error) {
        console.error("[booking] rate-limit rpc error", { error });
        return { allowed: true, retryAfterSeconds: 0 }; // fail open
      }
      if (data === false) {
        return {
          allowed: false,
          retryAfterSeconds: BOOKING_RATE_LIMIT_TIERS[i].windowSeconds,
        };
      }
    }
    return { allowed: true, retryAfterSeconds: 0 };
  } catch (err) {
    console.error("[booking] rate-limit threw", { err });
    return { allowed: true, retryAfterSeconds: 0 }; // fail open
  }
}
