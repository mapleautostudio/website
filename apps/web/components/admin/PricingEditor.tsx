"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Star,
  Trash2,
  Plus,
  Check,
  X,
} from "lucide-react";
import {
  cardPrice,
  cardSizes,
  cardFeatures,
  cellState,
  ACCENTS,
  type PricingConfig,
  type ServiceRow,
  type PriceRow,
} from "@/lib/content/pricing-schema";
import {
  savePricingDraft,
  publishPricing,
  discardDraft,
} from "@/app/admin/pricing/actions";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}`;

const clone = (c: PricingConfig): PricingConfig =>
  JSON.parse(JSON.stringify(c)) as PricingConfig;

const sameConfig = (a: PricingConfig, b: PricingConfig) =>
  JSON.stringify(a) === JSON.stringify(b);

export function PricingEditor({
  initialDraft,
  initialPublished,
}: {
  initialDraft: PricingConfig;
  initialPublished: PricingConfig;
}) {
  const [config, setConfig] = useState<PricingConfig>(initialDraft);
  const [published, setPublished] = useState<PricingConfig>(initialPublished);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [busy, setBusy] = useState<null | "publish" | "discard">(null);
  const [message, setMessage] = useState<string | null>(null);

  const nCols = config.packages.length;
  const hasUnpublished = !sameConfig(config, published);

  // ---- autosave (debounced) --------------------------------------------------
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSaveStatus("saving");
    const t = setTimeout(async () => {
      const res = await savePricingDraft(config);
      setSaveStatus(res.ok ? "saved" : "error");
      if (!res.ok) setMessage(res.error);
    }, 700);
    return () => clearTimeout(t);
  }, [config]);

  const edit = useCallback((fn: (c: PricingConfig) => void) => {
    setConfig((prev) => {
      const next = clone(prev);
      fn(next);
      return next;
    });
    setMessage(null);
  }, []);

  // ---- column (package) ops ---------------------------------------------------
  const addColumn = () =>
    edit((c) => {
      c.packages.push({
        id: uid(),
        name: "New package",
        tier: "Tier",
        accent: ACCENTS[0],
        mostPopular: false,
        tagline: "Short description of this package.",
        priceNote: "/ from",
        idealLabel: "Ideal for",
        ideal: "who this package suits.",
      });
      c.services.forEach((r) => r.values.push("no"));
      c.prices.forEach((r) => r.values.push(""));
    });

  const moveColumn = (col: number, dir: -1 | 1) =>
    edit((c) => {
      const to = col + dir;
      if (to < 0 || to >= c.packages.length) return;
      const swap = <T,>(arr: T[]) => {
        const [x] = arr.splice(col, 1);
        arr.splice(to, 0, x);
      };
      swap(c.packages);
      c.services.forEach((r) => swap(r.values));
      c.prices.forEach((r) => swap(r.values));
    });

  const deleteColumn = (col: number) => {
    if (nCols <= 1) return;
    if (!confirm(`Delete the "${config.packages[col].name}" package column?`))
      return;
    edit((c) => {
      c.packages.splice(col, 1);
      c.services.forEach((r) => r.values.splice(col, 1));
      c.prices.forEach((r) => r.values.splice(col, 1));
    });
  };

  const toggleMostPopular = (col: number) =>
    edit((c) => {
      const on = c.packages[col].mostPopular;
      c.packages.forEach((p, i) => (p.mostPopular = !on && i === col));
    });

  // ---- row ops ---------------------------------------------------------------
  const moveRow = (kind: "services" | "prices", idx: number, dir: -1 | 1) =>
    edit((c) => {
      const arr = c[kind];
      const to = idx + dir;
      if (to < 0 || to >= arr.length) return;
      const [x] = arr.splice(idx, 1);
      arr.splice(to, 0, x);
    });

  const deleteRow = (kind: "services" | "prices", idx: number) => {
    const label = config[kind][idx].label || "this row";
    if (!confirm(`Delete "${label}"?`)) return;
    edit((c) => {
      c[kind].splice(idx, 1);
      // Keep at least one headline price row flagged.
      if (kind === "prices" && !c.prices.some((p) => p.headline) && c.prices[0])
        c.prices[0].headline = true;
    });
  };

  const addServiceRow = () =>
    edit((c) =>
      c.services.push({
        id: uid(),
        label: "New service",
        values: Array.from({ length: c.packages.length }, () => "no"),
      }),
    );

  const addPriceRow = () =>
    edit((c) =>
      c.prices.push({
        id: uid(),
        label: "New vehicle size",
        shortLabel: "",
        values: Array.from({ length: c.packages.length }, () => "—"),
        headline: false,
      }),
    );

  const toggleTick = (idx: number, col: number) =>
    edit((c) => {
      const cur = c.services[idx].values[col];
      c.services[idx].values[col] =
        cellState(cur) === "yes" ? "no" : "yes";
    });

  const customTick = (idx: number, col: number) => {
    const cur = config.services[idx].values[col];
    const v = prompt(
      'Custom label (e.g. "Quick", "Wipe"). Leave blank for a plain ✓, type "no" to clear:',
      cellState(cur) === "custom" ? cur : "",
    );
    if (v === null) return;
    const t = v.trim();
    edit((c) => {
      c.services[idx].values[col] = t === "" ? "yes" : t;
    });
  };

  const setHeadline = (idx: number) =>
    edit((c) => c.prices.forEach((p, i) => (p.headline = i === idx)));

  // ---- addons ----------------------------------------------------------------
  const addAddon = () =>
    edit((c) =>
      c.addons.push({
        id: uid(),
        name: "New add-on",
        desc: "What it includes.",
        price: "Ask for pricing",
      }),
    );
  const deleteAddon = (id: string) => {
    if (!confirm("Delete this add-on?")) return;
    edit((c) => (c.addons = c.addons.filter((a) => a.id !== id)));
  };

  // ---- publish / discard -----------------------------------------------------
  const doPublish = async () => {
    setBusy("publish");
    setMessage(null);
    const saved = await savePricingDraft(config);
    if (!saved.ok) {
      setBusy(null);
      setMessage(saved.error);
      return;
    }
    const res = await publishPricing();
    setBusy(null);
    if (res.ok) {
      setPublished(clone(config));
      setSaveStatus("saved");
      setMessage("Published — the live page is updating now.");
    } else {
      setMessage(res.error);
    }
  };

  const doDiscard = async () => {
    if (!confirm("Discard all unpublished edits and revert to the live version?"))
      return;
    setBusy("discard");
    setMessage(null);
    const res = await discardDraft();
    setBusy(null);
    if (res.ok) {
      setConfig(clone(published));
      setMessage("Draft reverted to the live version.");
    } else {
      setMessage(res.error);
    }
  };

  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      {/* toolbar */}
      <div
        className="flex flex-wrap items-center gap-3 justify-between sticky top-14 z-20"
        style={{
          background: "var(--color-surface)",
          paddingBlock: 12,
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="meta" style={{ fontSize: 11 }}>
            {saveStatus === "saving"
              ? "Saving…"
              : saveStatus === "error"
                ? "Save failed"
                : saveStatus === "saved"
                  ? "Draft saved"
                  : "Draft"}
          </span>
          {hasUnpublished && (
            <span
              style={{
                fontSize: 11,
                color: "var(--color-accent)",
                background: "var(--color-accent-soft)",
                padding: "3px 8px",
                borderRadius: 4,
              }}
            >
              Unpublished changes
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn--ghost btn--sm"
            onClick={doDiscard}
            disabled={busy !== null || !hasUnpublished}
          >
            {busy === "discard" ? "Discarding…" : "Discard"}
          </button>
          <button
            className="btn btn--primary btn--sm"
            onClick={doPublish}
            disabled={busy !== null || !hasUnpublished}
          >
            {busy === "publish" ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            fontSize: 13,
            color: "var(--color-fg-1)",
            background: "var(--color-elevated)",
            border: "1px solid var(--color-hairline)",
            borderLeft: "3px solid var(--color-accent)",
            borderRadius: 4,
            padding: "10px 14px",
          }}
        >
          {message}
        </div>
      )}

      {/* meta */}
      <div className="flex flex-col gap-3" style={{ maxWidth: 640 }}>
        <label className="flex flex-col gap-1">
          <span className="eyebrow">Page heading</span>
          <input
            className="pe-input"
            style={{ fontSize: 16 }}
            value={config.meta.title}
            onChange={(e) => edit((c) => (c.meta.title = e.target.value))}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="eyebrow">Sub-heading</span>
          <textarea
            className="pe-input"
            rows={2}
            value={config.meta.subtitle}
            onChange={(e) => edit((c) => (c.meta.subtitle = e.target.value))}
          />
        </label>
      </div>

      {/* the grid */}
      <div className="pe-scroll">
        <table className="pe-table">
          <thead>
            <tr>
              <th className="pe-svc-h">
                <span className="eyebrow">Service</span>
              </th>
              {config.packages.map((p, col) => (
                <th key={p.id} className={p.mostPopular ? "pe-col-hl" : ""}>
                  <input
                    className="pe-input pe-input--name"
                    value={p.name}
                    aria-label={`Package ${col + 1} name`}
                    onChange={(e) =>
                      edit((c) => (c.packages[col].name = e.target.value))
                    }
                  />
                  <input
                    className="pe-input pe-input--tier"
                    value={p.tier}
                    aria-label={`Package ${col + 1} tier`}
                    onChange={(e) =>
                      edit((c) => (c.packages[col].tier = e.target.value))
                    }
                  />
                  {p.mostPopular && (
                    <span className="pe-pop-badge">★ Most popular</span>
                  )}
                  <div className="pe-colctrls">
                    <button
                      className="pe-mini"
                      title="Move left"
                      disabled={col === 0}
                      onClick={() => moveColumn(col, -1)}
                    >
                      <ArrowLeft size={12} />
                    </button>
                    <button
                      className={`pe-mini ${p.mostPopular ? "pe-mini--on" : ""}`}
                      title="Mark most popular"
                      onClick={() => toggleMostPopular(col)}
                    >
                      <Star size={12} />
                    </button>
                    <button
                      className="pe-mini pe-mini--danger"
                      title="Delete column"
                      disabled={nCols <= 1}
                      onClick={() => deleteColumn(col)}
                    >
                      <Trash2 size={12} />
                    </button>
                    <button
                      className="pe-mini"
                      title="Move right"
                      disabled={col === nCols - 1}
                      onClick={() => moveColumn(col, 1)}
                    >
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="pe-section-label">
              <td colSpan={nCols + 1}>What&apos;s included</td>
            </tr>
            {config.services.map((row: ServiceRow, idx) => (
              <tr key={row.id}>
                <td className="pe-rowlabel">
                  <div className="flex items-center gap-1">
                    <input
                      className="pe-input"
                      value={row.label}
                      onChange={(e) =>
                        edit((c) => (c.services[idx].label = e.target.value))
                      }
                    />
                    <RowControls
                      onUp={() => moveRow("services", idx, -1)}
                      onDown={() => moveRow("services", idx, 1)}
                      onDelete={() => deleteRow("services", idx)}
                      isFirst={idx === 0}
                      isLast={idx === config.services.length - 1}
                    />
                  </div>
                </td>
                {row.values.map((v, col) => {
                  const state = cellState(v);
                  return (
                    <td
                      key={col}
                      className={`pe-td-val ${config.packages[col].mostPopular ? "pe-col-hl" : ""}`}
                    >
                      <button
                        className={`pe-tick pe-tick--${state}`}
                        title="Click: ✓/✗ · Double-click: custom label"
                        onClick={() => toggleTick(idx, col)}
                        onDoubleClick={() => customTick(idx, col)}
                      >
                        {state === "yes" ? "✓" : state === "no" ? "✗" : v}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr className="pe-section-label">
              <td colSpan={nCols + 1}>Price by vehicle size</td>
            </tr>
            {config.prices.map((row: PriceRow, idx) => (
              <tr key={row.id}>
                <td className="pe-rowlabel">
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col gap-1 flex-1">
                      <input
                        className="pe-input"
                        value={row.label}
                        placeholder="Vehicle size label"
                        onChange={(e) =>
                          edit((c) => (c.prices[idx].label = e.target.value))
                        }
                      />
                      <input
                        className="pe-input"
                        style={{ fontSize: 11, color: "var(--color-fg-3)" }}
                        value={row.shortLabel ?? ""}
                        placeholder="Short label (for card, e.g. Trucks)"
                        onChange={(e) =>
                          edit(
                            (c) => (c.prices[idx].shortLabel = e.target.value),
                          )
                        }
                      />
                    </div>
                    <button
                      className={`pe-mini ${row.headline ? "pe-mini--on" : ""}`}
                      title="Use this row as the big card price"
                      onClick={() => setHeadline(idx)}
                    >
                      {row.headline ? "★ Card price" : "Set card price"}
                    </button>
                    <RowControls
                      onUp={() => moveRow("prices", idx, -1)}
                      onDown={() => moveRow("prices", idx, 1)}
                      onDelete={() => deleteRow("prices", idx)}
                      isFirst={idx === 0}
                      isLast={idx === config.prices.length - 1}
                    />
                  </div>
                </td>
                {row.values.map((v, col) => (
                  <td
                    key={col}
                    className={`pe-td-val ${config.packages[col].mostPopular ? "pe-col-hl" : ""}`}
                  >
                    <input
                      className="pe-input pe-input--center"
                      style={{ fontWeight: 700 }}
                      value={v}
                      aria-label={`${row.label} price for ${config.packages[col].name}`}
                      onChange={(e) =>
                        edit((c) => (c.prices[idx].values[col] = e.target.value))
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn--ghost btn--sm" onClick={addServiceRow}>
          <Plus size={14} /> Service row
        </button>
        <button className="btn btn--ghost btn--sm" onClick={addPriceRow}>
          <Plus size={14} /> Price row
        </button>
        <button className="btn btn--ghost btn--sm" onClick={addColumn}>
          <Plus size={14} /> Package column
        </button>
      </div>

      {/* per-package card copy */}
      <div className="flex flex-col gap-2">
        <span className="eyebrow">Card copy</span>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {config.packages.map((p, col) => (
            <div key={p.id} className="card" style={{ padding: 16 }}>
              <div
                className="font-display"
                style={{ fontSize: 15, marginBottom: 8 }}
              >
                {p.name}
              </div>
              <Field
                label="Tagline"
                value={p.tagline}
                onChange={(val) =>
                  edit((c) => (c.packages[col].tagline = val))
                }
              />
              <Field
                label="Price note"
                value={p.priceNote}
                onChange={(val) =>
                  edit((c) => (c.packages[col].priceNote = val))
                }
              />
              <Field
                label="Ideal label"
                value={p.idealLabel}
                onChange={(val) =>
                  edit((c) => (c.packages[col].idealLabel = val))
                }
              />
              <Field
                label="Ideal text"
                value={p.ideal}
                onChange={(val) => edit((c) => (c.packages[col].ideal = val))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* live card preview */}
      <div className="flex flex-col gap-2">
        <span className="eyebrow">How the cards will read</span>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {config.packages.map((p, col) => {
            const feats = cardFeatures(config, col);
            return (
              <div
                key={p.id}
                className="card"
                style={{
                  padding: 16,
                  borderColor: p.mostPopular
                    ? "var(--color-accent)"
                    : undefined,
                }}
              >
                <div className="meta" style={{ fontSize: 10 }}>
                  {p.tier}
                </div>
                <div
                  className="font-display"
                  style={{ fontSize: 16, marginTop: 2 }}
                >
                  {p.name}
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 700 }}>
                    {cardPrice(config, col)}
                  </span>{" "}
                  <span
                    className="meta"
                    style={{ fontSize: 11 }}
                  >
                    {p.priceNote}
                  </span>
                </div>
                <div
                  className="meta"
                  style={{ fontSize: 11, marginTop: 4 }}
                >
                  {cardSizes(config, col)}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--color-fg-3)",
                    marginTop: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {feats.heading}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "6px 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {feats.items.map((f, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 12,
                        color: "var(--color-fg-2)",
                        display: "flex",
                        gap: 6,
                      }}
                    >
                      <Check
                        size={11}
                        strokeWidth={3}
                        style={{
                          color: "var(--color-accent)",
                          marginTop: 3,
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* add-ons */}
      <div className="flex flex-col gap-2">
        <span className="eyebrow">Optional add-ons</span>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          }}
        >
          {config.addons.map((a) => {
            const i = config.addons.findIndex((x) => x.id === a.id);
            return (
              <div key={a.id} className="pe-addon">
                <button
                  className="pe-mini pe-mini--del pe-mini--danger"
                  title="Delete add-on"
                  onClick={() => deleteAddon(a.id)}
                >
                  <X size={12} />
                </button>
                <input
                  className="pe-input"
                  style={{ fontWeight: 600 }}
                  value={a.name}
                  onChange={(e) =>
                    edit((c) => (c.addons[i].name = e.target.value))
                  }
                />
                <textarea
                  className="pe-input"
                  rows={2}
                  style={{ marginTop: 6, fontSize: 12.5 }}
                  value={a.desc}
                  onChange={(e) =>
                    edit((c) => (c.addons[i].desc = e.target.value))
                  }
                />
                <input
                  className="pe-input"
                  style={{
                    marginTop: 6,
                    fontWeight: 700,
                    color: "var(--color-accent)",
                  }}
                  value={a.price}
                  onChange={(e) =>
                    edit((c) => (c.addons[i].price = e.target.value))
                  }
                />
              </div>
            );
          })}
        </div>
        <div>
          <button className="btn btn--ghost btn--sm" onClick={addAddon}>
            <Plus size={14} /> Add-on
          </button>
        </div>
      </div>

      {/* how to */}
      <div className="pe-help">
        <b>How to use this editor</b>
        <ul>
          <li>
            <b>Prices, names, and text:</b> click any field and type. Changes
            save automatically as a draft.
          </li>
          <li>
            <b>The ✓ / ✗ grid:</b> <b>click</b> a cell to switch it between ✓ and
            ✗. <b>Double-click</b> to type a short custom label like{" "}
            <kbd>Quick</kbd> or <kbd>Wipe</kbd>.
          </li>
          <li>
            <b>Card price:</b> each price row is one vehicle size. The row marked{" "}
            <b>★ Card price</b> is the big number shown on the card; the others
            become the small &ldquo;Trucks $269 · Vans $299&rdquo; line. Use{" "}
            <kbd>—</kbd> when a size isn&apos;t offered.
          </li>
          <li>
            <b>Card bullet points</b> are filled automatically from the ✓ grid —
            each card lists what it adds over the cheaper one. (Custom wording is
            a quick dev change if ever needed.)
          </li>
          <li>
            <b>Rows &amp; columns:</b> hover a row for move/delete; each package
            header has move, ★ most-popular, and delete. Add more with the
            buttons under the grid.
          </li>
          <li>
            <b>Nothing is live until you press Publish.</b> Edit freely — the
            public page only changes when you click <b>Publish</b>. <b>Discard</b>{" "}
            throws away unpublished edits.
          </li>
        </ul>
      </div>
    </div>
  );
}

// Small labelled text field used in the card-copy section.
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1" style={{ marginTop: 8 }}>
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-fg-3)",
        }}
      >
        {label}
      </span>
      <input
        className="pe-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function RowControls({
  onUp,
  onDown,
  onDelete,
  isFirst,
  isLast,
}: {
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <span className="pe-ctrls">
      <button
        className="pe-mini"
        title="Move up"
        onClick={onUp}
        disabled={isFirst}
      >
        <ArrowUp size={12} />
      </button>
      <button
        className="pe-mini"
        title="Move down"
        onClick={onDown}
        disabled={isLast}
      >
        <ArrowDown size={12} />
      </button>
      <button
        className="pe-mini pe-mini--danger"
        title="Delete row"
        onClick={onDelete}
      >
        <Trash2 size={12} />
      </button>
    </span>
  );
}
