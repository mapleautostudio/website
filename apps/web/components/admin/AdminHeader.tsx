import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";

export function AdminHeader({ email }: { email?: string }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(15,20,24,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div
        className="container-x flex items-center justify-between"
        style={{ height: 56 }}
      >
        <Link
          href="/admin"
          className="flex items-baseline gap-2 text-fg-1 hover:text-chrome transition-colors"
        >
          <span
            className="font-display"
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            MAPLE
          </span>
          <span
            className="meta"
            style={{ color: "var(--color-accent)", fontSize: 11 }}
          >
            ADMIN
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href="/admin"
            className="text-fg-2 hover:text-chrome transition-colors"
            style={{ fontSize: 13 }}
          >
            Bookings
          </Link>
          <Link
            href="/admin/pricing"
            className="text-fg-2 hover:text-chrome transition-colors"
            style={{ fontSize: 13 }}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {email && (
            <span
              className="meta hidden sm:inline"
              style={{ fontSize: 11, color: "var(--color-fg-2)" }}
            >
              {email.toUpperCase()}
            </span>
          )}
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors"
              style={{ fontSize: 13 }}
            >
              <LogOut size={14} strokeWidth={1.5} />
              <span>Log out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
