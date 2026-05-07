"use client";

import { useActionState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 48,
  padding: "0 14px",
  background: "var(--color-surface-deep)",
  border: "1px solid var(--color-hairline)",
  borderRadius: 4,
  color: "var(--color-fg-1)",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  letterSpacing: "-0.005em",
  outline: "none",
  transition: "border-color 200ms var(--ease-precise)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--color-fg-3)",
};

export function LoginForm({ initialError }: { initialError?: string }) {
  const [state, formAction, pending] = useActionState(
    login,
    initialError ? { error: initialError } : initialState,
  );

  return (
    <form action={formAction} className="flex flex-col" style={{ gap: 24 }}>
      <div className="flex flex-col" style={{ gap: 8 }}>
        <label htmlFor="email" style={labelStyle}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col" style={{ gap: 8 }}>
        <label htmlFor="password" style={labelStyle}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          style={inputStyle}
        />
      </div>

      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-3"
          style={{
            padding: 14,
            border: "1px solid var(--color-danger)",
            borderRadius: 6,
            background: "rgba(201, 127, 127, 0.08)",
          }}
        >
          <AlertCircle
            size={16}
            strokeWidth={1.5}
            style={{ color: "var(--color-danger)", marginTop: 2 }}
          />
          <span
            style={{
              fontSize: 13,
              color: "var(--color-fg-1)",
              lineHeight: 1.5,
            }}
          >
            {state.error}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn btn--primary btn--lg"
        style={{
          justifyContent: "center",
          width: "100%",
          opacity: pending ? 0.6 : 1,
          cursor: pending ? "wait" : "pointer",
        }}
      >
        {pending ? "Signing in…" : "Sign in"}
        {!pending && <ArrowRight size={16} strokeWidth={1.5} />}
      </button>
    </form>
  );
}
