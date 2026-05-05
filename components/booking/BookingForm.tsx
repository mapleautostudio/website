"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, AlertCircle } from "lucide-react";
import {
  bookingSchema,
  SERVICE_OPTIONS,
  TIME_WINDOWS,
  type BookingInput,
} from "@/lib/booking/schema";
import { BookingSuccess } from "./BookingSuccess";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string };

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
  transition: "border-color 200ms var(--ease-precise), box-shadow 200ms var(--ease-precise)",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: "auto",
  minHeight: 120,
  padding: "12px 14px",
  resize: "vertical",
  lineHeight: 1.6,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--color-fg-3)",
};

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "var(--color-danger)",
  marginTop: 6,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span style={errorStyle}>
      <AlertCircle size={12} strokeWidth={1.5} />
      {message}
    </span>
  );
}

function todayIso() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });
  const idempotencyKey = useMemo(() => crypto.randomUUID(), []);

  const initialService = useMemo(() => {
    if (!defaultService) return SERVICE_OPTIONS[0]?.value;
    const match = SERVICE_OPTIONS.find((s) => s.value === defaultService);
    return match?.value ?? SERVICE_OPTIONS[0]?.value;
  }, [defaultService]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      idempotencyKey,
      service: initialService,
      preferredTimeWindow: "flexible",
      vehicleNotes: "",
      notes: "",
      website: "",
    },
  });

  useEffect(() => {
    reset((prev) => ({ ...prev, idempotencyKey }));
  }, [idempotencyKey, reset]);

  const onSubmit = async (values: BookingInput) => {
    setSubmit({ kind: "submitting" });
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as
        | { ok: true; reference: string }
        | { ok: false; error: string };

      if (!res.ok || !("ok" in json) || json.ok !== true) {
        const message =
          "error" in json && json.error
            ? json.error
            : "Something went wrong. Please try again.";
        setSubmit({ kind: "error", message });
        return;
      }
      setSubmit({ kind: "success", reference: json.reference });
    } catch {
      setSubmit({
        kind: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  };

  if (submit.kind === "success") {
    return <BookingSuccess reference={submit.reference} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col"
      style={{ gap: 48 }}
    >
      <fieldset className="flex flex-col" style={{ gap: 20, border: 0, padding: 0, margin: 0 }}>
        <legend className="eyebrow block" style={{ marginBottom: 4 }}>
          01 · Vehicle
        </legend>

        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{ gap: 16 }}
        >
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="vehicleYear" style={labelStyle}>Year</label>
            <input
              id="vehicleYear"
              type="number"
              inputMode="numeric"
              placeholder="2020"
              style={inputStyle}
              {...register("vehicleYear", { valueAsNumber: true })}
            />
            <FieldError message={errors.vehicleYear?.message} />
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="vehicleMake" style={labelStyle}>Make</label>
            <input
              id="vehicleMake"
              type="text"
              placeholder="Toyota"
              style={inputStyle}
              {...register("vehicleMake")}
            />
            <FieldError message={errors.vehicleMake?.message} />
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="vehicleModel" style={labelStyle}>Model</label>
            <input
              id="vehicleModel"
              type="text"
              placeholder="Tacoma"
              style={inputStyle}
              {...register("vehicleModel")}
            />
            <FieldError message={errors.vehicleModel?.message} />
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: 8 }}>
          <label htmlFor="vehicleNotes" style={labelStyle}>
            Trim or notes <span style={{ color: "var(--color-fg-disabled)" }}>(optional)</span>
          </label>
          <input
            id="vehicleNotes"
            type="text"
            placeholder="TRD Pro · matte grey · aftermarket bumper"
            style={inputStyle}
            {...register("vehicleNotes")}
          />
          <FieldError message={errors.vehicleNotes?.message} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col" style={{ gap: 20, border: 0, padding: 0, margin: 0 }}>
        <legend className="eyebrow block" style={{ marginBottom: 4 }}>
          02 · Service & timing
        </legend>

        <div className="flex flex-col" style={{ gap: 8 }}>
          <label htmlFor="service" style={labelStyle}>Service</label>
          <select
            id="service"
            style={inputStyle}
            {...register("service")}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.service?.message} />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: 16 }}
        >
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="preferredDate" style={labelStyle}>Preferred date</label>
            <input
              id="preferredDate"
              type="date"
              min={todayIso()}
              style={inputStyle}
              {...register("preferredDate")}
            />
            <FieldError message={errors.preferredDate?.message} />
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="preferredTimeWindow" style={labelStyle}>Time window</label>
            <select
              id="preferredTimeWindow"
              style={inputStyle}
              {...register("preferredTimeWindow")}
            >
              {TIME_WINDOWS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.preferredTimeWindow?.message} />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col" style={{ gap: 20, border: 0, padding: 0, margin: 0 }}>
        <legend className="eyebrow block" style={{ marginBottom: 4 }}>
          03 · Contact
        </legend>

        <div className="flex flex-col" style={{ gap: 8 }}>
          <label htmlFor="contactName" style={labelStyle}>Name</label>
          <input
            id="contactName"
            type="text"
            autoComplete="name"
            placeholder="First and last"
            style={inputStyle}
            {...register("contactName")}
          />
          <FieldError message={errors.contactName?.message} />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: 16 }}
        >
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="contactPhone" style={labelStyle}>Phone</label>
            <input
              id="contactPhone"
              type="tel"
              autoComplete="tel"
              placeholder="306 555 0199"
              style={inputStyle}
              {...register("contactPhone")}
            />
            <FieldError message={errors.contactPhone?.message} />
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <label htmlFor="contactEmail" style={labelStyle}>Email</label>
            <input
              id="contactEmail"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              style={inputStyle}
              {...register("contactEmail")}
            />
            <FieldError message={errors.contactEmail?.message} />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col" style={{ gap: 12, border: 0, padding: 0, margin: 0 }}>
        <legend className="eyebrow block" style={{ marginBottom: 4 }}>
          04 · Anything else
        </legend>
        <label htmlFor="notes" style={labelStyle}>
          Notes <span style={{ color: "var(--color-fg-disabled)" }}>(optional)</span>
        </label>
        <textarea
          id="notes"
          placeholder="Specific concerns, scratches to look at, prior coatings, dropoff time, etc."
          style={textareaStyle}
          rows={5}
          {...register("notes")}
        />
        <FieldError message={errors.notes?.message} />
      </fieldset>

      {/* Honeypot — visually hidden, real users skip it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {submit.kind === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3"
          style={{
            padding: 16,
            border: "1px solid var(--color-danger)",
            borderRadius: 6,
            background: "rgba(201, 127, 127, 0.08)",
          }}
        >
          <AlertCircle
            size={18}
            strokeWidth={1.5}
            style={{ color: "var(--color-danger)", marginTop: 2 }}
          />
          <span style={{ fontSize: 14, color: "var(--color-fg-1)", lineHeight: 1.5 }}>
            {submit.message}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ gap: 16 }}>
        <span className="meta" style={{ maxWidth: 380 }}>
          NO PAYMENT NOW · WE CONFIRM BY PHONE OR EMAIL WITHIN THE HOUR
        </span>
        <button
          type="submit"
          disabled={submit.kind === "submitting"}
          className="btn btn--primary btn--lg"
          style={{
            justifyContent: "center",
            opacity: submit.kind === "submitting" ? 0.6 : 1,
            cursor: submit.kind === "submitting" ? "wait" : "pointer",
          }}
        >
          {submit.kind === "submitting" ? "Sending…" : "Submit request"}
          {submit.kind !== "submitting" && (
            <ArrowRight size={16} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </form>
  );
}
