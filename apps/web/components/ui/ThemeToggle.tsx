"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

export function ThemeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "row";
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage may be blocked (private mode); ignore
    }
  };

  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const Icon = theme === "dark" ? Sun : Moon;

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-pressed={theme === "light"}
        className="flex items-center justify-between py-4 text-fg-1 hover:text-chrome transition-colors w-full text-left"
        style={{
          borderBottom: "1px solid var(--color-hairline)",
          fontSize: 22,
          fontWeight: 300,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.015em",
          opacity: mounted ? 1 : 0,
        }}
      >
        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        <Icon size={18} strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "light"}
      className="inline-flex items-center justify-center text-fg-2 hover:text-chrome transition-colors"
      style={{
        width: 36,
        height: 36,
        opacity: mounted ? 1 : 0,
      }}
    >
      <Icon size={16} strokeWidth={1.5} />
    </button>
  );
}
