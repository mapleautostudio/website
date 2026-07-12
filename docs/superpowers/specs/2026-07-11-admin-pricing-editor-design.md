# Admin-editable detailing pricing — design

**Date:** 2026-07-11
**Branch:** `feat/admin-pricing-editor`
**Goal:** Let the shop owner edit the `/services/detailing-packages` content (prices, packages, included services, add-ons) from the admin, without a developer. Edits publish to the live page.

## Problem

Detailing prices and package content are hardcoded in `apps/web/lib/content/packages.ts`. Any change requires a code edit + deploy. The owner needs self-serve control. The prices also appear in two visual forms — the package **cards** and (newly) a **comparison table** — and must never disagree.

## Decisions (locked with client)

1. **Frontend shape:** keep the 4 cards **and** add the ✓/✗ comparison matrix (fills the current "comparison table — coming soon" placeholder). Both driven by one dataset.
2. **Publish model:** draft + Publish button. Owner edits a draft freely; Publish pushes it live; Discard resets the draft to what's live.
3. **Card highlight bullets:** auto-derived from the comparison checklist (the ✓ services a package has that the next-cheaper package does not → reproduces the "Everything in X, plus…" framing). No separate bullet editor; bespoke bullets remain a dev tweak.
4. **Price single-source:** each price is entered once (in the price rows); the card headline price, the card "sizes" line, and the matrix price rows all read from it.

## Data model

One JSON config is the source of truth. Validated with Zod (`lib/content/pricing-schema.ts`).

```ts
PricingConfig {
  meta: { title: string; subtitle: string }
  packages: Array<{
    id: string
    name: string
    tier: string
    accent: "entry" | "returning" | "signature" | "gold"
    mostPopular: boolean
    tagline: string        // card sub-line
    priceNote: string      // "/ detail" | "/ from"
    idealLabel: string     // "Ideal for" | "Returning clients only"
    ideal: string          // trailing card copy
  }>
  services: Array<{        // ✓/✗ matrix rows
    id: string
    label: string
    values: string[]       // per package, index-aligned: "yes" | "no" | custom label ("Quick")
  }>
  prices: Array<{          // price rows — the ONE place a price is entered
    id: string
    label: string          // "Cars & small SUVs (2-row)"
    shortLabel?: string    // "Cars" — used in the card sizes line; falls back to label
    values: string[]       // per package: "$159" | "—"
    headline: boolean      // exactly one row true → drives the big card price
  }>
  addons: Array<{ id: string; name: string; desc: string; price: string }>
}
```

`values[]` arrays are always kept the same length as `packages[]` (add/remove column keeps them in sync).

### Derived (not stored)

- **Card headline price** = the `headline` price row's value for that package column.
- **Card sizes line** = non-headline price rows with a real value, joined `"{shortLabel} {value}"` by `" · "` (e.g. `Trucks $269 · Vans $299`).
- **Card feature bullets** = services where this package is ✓ but the previous (index−1) package is not; heading is `"Everything in {prev.name}, plus"` (first package: its own ✓ services, heading `"What's included"`).

## Storage

New Supabase table `pricing_content`, single-row (`id = 1` singleton):

```sql
create table public.pricing_content (
  id smallint primary key default 1,
  draft jsonb not null,
  published jsonb not null,
  updated_at timestamptz not null default now(),
  published_at timestamptz not null default now(),
  constraint pricing_content_singleton check (id = 1)
);
```

- RLS enabled; `revoke all from anon, authenticated`. Web admin reads/writes with the service-role key (bypasses RLS), matching the bookings pattern. No anon/PostgREST access.
- Seeded from the current `packages.ts` content converted to `PricingConfig` (draft = published = seed).

## Fallback / resilience

`lib/content/packages.ts` is converted into the canonical **default config** (`DEFAULT_PRICING`) and kept as a build-time fallback. `getPublishedPricing()`:
1. Try DB `published`; validate with Zod.
2. On missing row, empty, or validation/connection error → return `DEFAULT_PRICING`.

The public page therefore always renders, even if Supabase is down or the table is absent (e.g. migration not yet run). Same for `getDraftPricing()` in admin.

## Components & boundaries

| Unit | Responsibility |
|------|----------------|
| `lib/content/pricing-schema.ts` | Zod schema, `PricingConfig` type, `DEFAULT_PRICING`, plus pure derive helpers (`cardPrice`, `cardSizes`, `cardFeatures`) reused by page + editor preview |
| `lib/content/pricing.ts` (server) | `getPublishedPricing()`, `getDraftPricing()` — DB read + validate + fallback |
| `supabase/migrations/…_pricing_content.sql` | table + RLS + seed |
| `app/admin/pricing/actions.ts` | `savePricingDraft`, `publishPricing`, `discardDraft` — `requireAdmin` + Zod validate + write + `revalidatePath` |
| `app/admin/pricing/page.tsx` | server: guard, load draft + published, render editor |
| `components/admin/PricingEditor.tsx` (client) | inline-edit grid, add/remove/reorder rows & columns, most-popular toggle, add-ons, autosave draft, Publish/Discard, "How to use" help |
| `components/marketing/PackagesPricing.tsx` | refactor to accept `PricingConfig` as a prop; render cards + comparison matrix + add-ons |
| `components/admin/AdminHeader.tsx` | add nav links (Bookings · Pricing) |

Data flow: **editor → `savePricingDraft` → `draft` column**; **Publish → `draft` copied to `published` + `revalidatePath('/services/detailing-packages')`**; **public page → `getPublishedPricing()` → cards + matrix**.

## Error handling

- All three actions call `requireAdmin()` first and validate input with Zod; invalid payloads are rejected without writing.
- Actions return `{ ok, error? }`; the editor surfaces failures inline and keeps the unsaved draft in memory.
- DB read failures degrade to `DEFAULT_PRICING` rather than throwing.

## Verification

No test runner exists in the repo; not adding one mid-project. Verification via:
- `tsc`/`next build` typecheck + `eslint`.
- Zod runtime validation on every save/publish.
- End-to-end drive: run the app, edit a price + add a row/column in `/admin/pricing`, Publish, confirm `/services/detailing-packages` cards **and** matrix reflect it, and confirm the price appears identically in both.

## Out of scope

- Editing pricing for other services (window tint, etc.) — none set for now.
- Per-card bespoke marketing bullets in admin (dev tweak).
- Versioned publish history / rollback beyond the single draft/published pair.

## Commit plan (small commits)

1. Migration + Zod schema + `DEFAULT_PRICING` + `lib/content/pricing.ts` read layer.
2. Server actions (save draft / publish / discard).
3. Admin editor UI + `/admin/pricing` page + admin nav link.
4. Refactor `PackagesPricing` to consume published data + render the comparison matrix.
5. HANDOVER.md update + end-to-end verification pass.
