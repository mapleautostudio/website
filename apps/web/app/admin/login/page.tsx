import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { getSupabaseSessionClient } from "@/lib/supabase/auth";
import { isAdminEmail } from "@/lib/admin/guard";

export const metadata = {
  title: "Admin · Sign in — Maple Auto Studio",
  robots: { index: false, follow: false },
};

const ERROR_MESSAGES: Record<string, string> = {
  not_authorized: "That account isn't authorized for admin access.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  // If already signed in as an admin, jump straight to the dashboard.
  const supabase = await getSupabaseSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user && isAdminEmail(user.email)) {
    redirect("/admin");
  }

  const initialError = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-surface-deep)" }}
    >
      <div className="container-x" style={{ paddingTop: 48 }}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors"
          style={{ fontSize: 13 }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to site
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center" style={{ padding: "48px 0" }}>
        <div className="container-x" style={{ width: "100%" }}>
          <div
            className="mx-auto"
            style={{
              maxWidth: 440,
              padding: "clamp(28px, 5vw, 48px)",
              background: "var(--color-elevated)",
              border: "1px solid var(--color-hairline)",
              borderRadius: 8,
            }}
          >
            <div className="flex flex-col gap-2 mb-8">
              <span className="eyebrow">MAPLE · ADMIN</span>
              <h1
                className="m-0 font-display"
                style={{
                  fontSize: 32,
                  fontWeight: 300,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                <span className="text-fg-1">Owner sign in.</span>
              </h1>
              <p
                className="m-0 text-fg-2"
                style={{ fontSize: 14, lineHeight: 1.5 }}
              >
                Restricted to authorized accounts.
              </p>
            </div>

            <LoginForm initialError={initialError} />
          </div>
        </div>
      </div>
    </main>
  );
}
