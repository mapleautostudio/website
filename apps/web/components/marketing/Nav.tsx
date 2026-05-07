"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SHOP, BOOKING_HREF } from "@/lib/content/contact";
import { NAV_MAIN_SERVICES, NAV_MORE_SERVICES } from "@/lib/content/services";

const NAV_LINKS = [
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Visit", href: "/#visit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setServicesOpen(true);
  };
  const closeDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          height: scrolled || mobileOpen ? 56 : 72,
          background:
            scrolled || mobileOpen ? "var(--color-nav-bg)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter:
            scrolled || mobileOpen ? "blur(16px)" : "none",
          borderBottom:
            scrolled || mobileOpen
              ? "1px solid var(--color-hairline)"
              : "1px solid transparent",
          transition: "all 400ms var(--ease-precise)",
        }}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Logo size="sm" />

          <nav className="hidden md:flex items-center gap-9 text-[13px] font-medium">
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-fg-1 hover:text-chrome transition-colors"
                onClick={() => setServicesOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "none" }}
                />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full pt-3" role="menu">
                  <div
                    className="min-w-70 py-2 shadow-lg"
                    style={{
                      borderRadius: 8,
                      background: "var(--color-cream)",
                      border: "1px solid var(--color-cream-edge)",
                      color: "#1a2027",
                    }}
                  >
                    {NAV_MAIN_SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="dropdown-item flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors"
                        role="menuitem"
                      >
                        <span>{s.shortTitle}</span>
                        <span
                          className="meta"
                          style={{ fontSize: 11, color: "#8b8478" }}
                        >
                          {s.num}
                        </span>
                      </Link>
                    ))}
                    <div
                      className="my-2 h-px mx-4"
                      style={{ background: "var(--color-cream-edge)" }}
                      aria-hidden="true"
                    />
                    {NAV_MORE_SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={
                          s.slug === "photos"
                            ? "/photos"
                            : `/services/${s.slug}`
                        }
                        className="dropdown-item flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors"
                        role="menuitem"
                      >
                        <span>{s.shortTitle}</span>
                        <span
                          className="meta"
                          style={{ fontSize: 11, color: "#8b8478" }}
                        >
                          {s.num}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-fg-1 hover:text-chrome transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`tel:${SHOP.phoneTel}`}
              className="inline-flex items-center gap-2 text-[13px] text-fg-2 hover:text-chrome transition-colors whitespace-nowrap"
            >
              <Phone size={14} strokeWidth={1.5} />
              <span>{SHOP.phone}</span>
            </a>
            <Link href={BOOKING_HREF} className="btn btn--primary">
              Book service
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center text-fg-1 hover:text-chrome transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{ width: 44, height: 44, marginRight: -10 }}
            >
              {mobileOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col"
          style={{
            background: "var(--color-surface)",
            paddingTop: 56,
            animation: "drawerFade 200ms var(--ease-precise) forwards",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div
            className="flex-1 overflow-y-auto"
            style={{ paddingInline: "var(--gutter)", paddingBlock: 32 }}
          >
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between py-4 text-fg-1"
                style={{
                  borderBottom: "1px solid var(--color-hairline)",
                  fontSize: 22,
                  fontWeight: 300,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.015em",
                }}
                aria-expanded={mobileServicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  style={{
                    transform: mobileServicesOpen ? "rotate(180deg)" : "none",
                    transition: "transform 200ms var(--ease-precise)",
                  }}
                />
              </button>

              {mobileServicesOpen && (
                <div className="flex flex-col" style={{ paddingBlock: 8 }}>
                  {NAV_MAIN_SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3 text-fg-2 hover:text-chrome transition-colors"
                      style={{ fontSize: 15 }}
                    >
                      <span>{s.shortTitle}</span>
                      <span className="meta text-fg-3" style={{ fontSize: 11 }}>
                        {s.num}
                      </span>
                    </Link>
                  ))}
                  <div
                    className="h-px bg-hairline"
                    style={{ marginBlock: 8 }}
                    aria-hidden="true"
                  />
                  {NAV_MORE_SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={
                        s.slug === "photos"
                          ? "/photos"
                          : `/services/${s.slug}`
                      }
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3 text-fg-2 hover:text-chrome transition-colors"
                      style={{ fontSize: 15 }}
                    >
                      <span>{s.shortTitle}</span>
                      <span className="meta text-fg-3" style={{ fontSize: 11 }}>
                        {s.num}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 text-fg-1 hover:text-chrome transition-colors"
                  style={{
                    borderBottom: "1px solid var(--color-hairline)",
                    fontSize: 22,
                    fontWeight: 300,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <ThemeToggle variant="row" />
            </div>

            <div className="flex flex-col gap-4" style={{ marginTop: 48 }}>
              <a
                href={`tel:${SHOP.phoneTel}`}
                className="inline-flex items-center gap-3 text-fg-1 hover:text-chrome transition-colors"
                style={{ fontSize: 15 }}
              >
                <Phone size={16} strokeWidth={1.5} />
                <span>{SHOP.phone}</span>
              </a>
              <Link
                href={BOOKING_HREF}
                className="btn btn--primary btn--lg"
                onClick={() => setMobileOpen(false)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book service
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes drawerFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
