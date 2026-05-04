import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

function readEnv() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase auth env not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env.local.",
    );
  }
  return { url, key };
}

export async function getSupabaseSessionClient() {
  const { url, key } = readEnv();
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — middleware refreshes the
          // session cookie on the next request.
        }
      },
    },
  });
}
