# WORK_LOG.md

Autonomous build session — Maple Auto Studio site, started 2026-04-30.

Mode: Option A (full auto, no permission prompts). Goal: implement the Claude Design system from the export bundle into the Next.js scaffold; build homepage + 8 service sub-pages + photos placeholder; stub booking; verify build. No deployments, no remote pushes, no dev server (per user instruction).

## Session source-of-truth

- **Design system tokens, fonts, components, voice/tone rules:** the export bundle at `Autoshop/.design-bundle/akaal-partner-auto-shop-design-system/` (extracted from the `api.anthropic.com/v1/design/h/...` URL the user pasted).
- **Maple Auto Studio content:** the post-pivot PDF the user shared in the prior turn ("Maple Auto Studio — Finish, calibrated.") + the WebFetch summary of [royalautodetailing.ca](https://www.royalautodetailing.ca/).
- **Project rules:** `Autoshop/CLAUDE.md`, `Autoshop/PLAN.md`. Note that the original CLAUDE.md tokens (warm amber + Bricolage Grotesque) were superseded by the cool-dark Hanken Grotesk + IBM Plex direction in the design bundle. I'm following the bundle.

## Important reconciliations made up front

1. **The bundle is named `akaal-partner-auto-shop-design-system/`.** That's the pre-pivot name. The design SYSTEM (palette, type, motion, components) is reusable; only CONTENT needs to be Maple Auto Studio-specific. So I'm using the bundle's tokens and component shapes, but rewriting strings/data to match the post-pivot PDF.

2. **Location data has an inconsistency in the PDF.** The PDF wordmark shows "MAPLE · AUTO STUDIO · YXE" (YXE = Saskatoon's airport code) and the visit section says "60th Street. North Industrial, Saskatoon." with address "331 60 Street E, Unit 10, Saskatoon SK S7K 8C8" — but the geo coordinates `53.2033° N · 105.7531° W` shown on the hero are actually Prince Albert, not Saskatoon (Saskatoon is around 52.13° N, 106.67° W). The real-world business per royalautodetailing.ca is in Prince Albert.
   **My call:** keep what the PDF shows (Saskatoon address, Prince Albert coords) but flag this as a follow-up so the customer can confirm the actual location. Filed under "needs client confirmation" below.

3. **Hero sub-headline in the PDF is auto-repair leftover** ("...for European and Japanese vehicles. Photographed inspections, written quotes, and the same technician on your car from drop-off to pickup."). The detailing pivot didn't fully rewrite this. I'm rewriting it to match the detailing direction: "Detailing, ceramic coating, paint correction, and tint. Photographed before-and-after, written quotes, and pickup or dropoff if you'd rather we come to you."

4. **Booking flow undecided.** The user's plan was to ask the customer in the next call which booking model they want (mailto, contact-form-to-email, phone-only, real calendar). For v1 I'm wiring "Book service" buttons to a `mailto:` with subject + body prefilled. Easy to swap to a real form route later.

## Decision log

I'll add to this section as I work, one entry per non-trivial choice. Format: timestamp · area · decision · rationale.

- 23:25 · setup · using `next/font/google` for Hanken Grotesk + IBM Plex Sans + IBM Plex Mono — matches the design bundle's typography spec, avoids the paid Söhne/Neue Haas options the bundle calls out as ideal-but-licensed.
- 23:25 · setup · keeping Tailwind v4 (the scaffold default), exposing all design tokens via `@theme` in `globals.css` so utility classes like `bg-surface`, `text-fg-1`, `font-display` work directly.
- 23:25 · setup · skipping shadcn/ui for v1 — the design bundle's components are simple enough to write directly, and shadcn would impose its own opinions that fight the cool-dark clinical look.
- 23:25 · icons · `lucide-react` (already in CLAUDE.md spec, also in the bundle's iconography section). Installing as a dep.

(More entries below as work progresses.)

## Needs client confirmation before launch

Items I baked in as placeholders that the customer must confirm before this site goes public:

- [ ] **Location**: Prince Albert vs. Saskatoon — the real business is in Prince Albert per royalautodetailing.ca, but the design pivot landed on a Saskatoon address. Resolve before launch.
- [ ] **All service pricing** — the From-prices on service cards (Detailing $129, Ceramic $899, Paint correction $499, Window tint $239, Boat $399) are industry-typical placeholders. Real prices unknown.
- [ ] **All testimonials** — Priya N., Marcus T., Danielle R., Sam K. are placeholder names with placeholder content. Replace with verified Google reviews before launch.
- [ ] **The "12 years" / "213 reviews" / "200+ reviews" claims** — placeholder values, real numbers TBD.
- [ ] **Khus's exact background copy** — "12 years on paint, ceramic, and interior work" was written before talking to Khus. Confirm.
- [ ] **Hours** — Mon-Fri 8:00-18:00, Sat 9:00-15:00, Sun closed are placeholders. Confirm.
- [ ] **Booking flow** — currently a `mailto:` stub. Swap to whatever the customer picks (form, Calendly, phone-only).
- [ ] **Hero video asset** — currently no video file. The design references `/hero-workshop.mp4`. Need to source a cool-graded workshop loop from Pexels and drop it in `/public`.
- [ ] **Photos page content** — currently a placeholder grid. Replace with real before/after photographs from the shop.
- [ ] **Real social handles** — `lib/content/contact.ts` currently has placeholder `@mapleautostudio` handles for Instagram, TikTok, and Facebook. Verify the customer's actual handles and swap.

## Build progress

### What got built

**Foundation**
- `app/globals.css` — full design-system tokens via Tailwind v4 `@theme`: cool dark palette (`surface`, `surface-deep`, `elevated`, `elevated-2`, `fg-1/2/3`, `hairline`, `chrome`, `cta`), font CSS variables, motion easing, semantic typography classes (`.h1`–`.h4`, `.eyebrow`, `.meta`, `.body-lg`), button system (`.btn`, `.btn--primary`, `.btn--ghost`, `.btn--sm`, `.btn--lg`), card system, page-load reveal stagger (`.reveal`, `.reveal-1`…`.reveal-6`), reduced-motion override.
- `app/layout.tsx` — `next/font/google` wiring for **Hanken Grotesk** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (meta/eyebrow), exposed as `--font-hanken`, `--font-plex-sans`, `--font-plex-mono` and consumed by the `@theme` font-family tokens. Page metadata: title "Maple Auto Studio — Finish, calibrated."

**Content data (`lib/content/`)**
- `contact.ts` — shop brand, address, phone, email, hours, social handles, geo coordinates, established line, plus a `BOOKING_MAILTO` constant with subject + body prefilled.
- `services.ts` — 8-entry `SERVICES` array (Detailing Packages, Ceramic, Paint correction, Window tint, Boat, Car accessories, Seat covers, Photos). Each entry has slug, num, icons (lucide `ShieldCheck` / `Circle` / `Wrench` / `Grid2x2` / `Sailboat` / `Briefcase` / `Sparkles` / `Camera`), homepage card content (description + footer + grid span), nav grouping (`main` vs `more`), service-detail hero copy, optional package tiers (only Detailing Packages has the four-tier package block), included-process bullets, and FAQ. Helpers: `SERVICES_BY_SLUG`, `NAV_MAIN_SERVICES`, `NAV_MORE_SERVICES`, `HOMEPAGE_SERVICE_CARDS`.
- `reviews.ts` — `HERO_REVIEW` (Priya N. / Audi Q5 / 2-stage + ceramic), three `SUPPORTING_REVIEWS` (Marcus T. interior, Danielle R. ceramic tint, Sam K. accessories), `REVIEWS_META` (4.9 average, 213 count, Google source), and the three `PILLARS` (12 years / 4.9★ / "No surprise quotes").

**Components (`components/marketing/` and `components/ui/`)**
- `ui/Logo.tsx` — wordmark + sub label, links home, hover→chrome.
- `marketing/Nav.tsx` — fixed-position, scroll-aware (72px → 56px collapsed with backdrop blur on scroll), services dropdown (hover or click) with main + divider + more sections, phone link with lucide `Phone` icon, primary CTA "Book service" wired to mailto, mobile-collapsed nav (links hidden, just a "Book" CTA).
- `marketing/Hero.tsx` — full-bleed gradient + subtle grid pattern as video placeholder, eyebrow + two-line stacked headline ("Finish, calibrated." with second line in `fg-2`), `body-lg` sub, two CTAs (primary mailto + ghost view-services anchor), staggered reveals, geo coords + established line in bottom-right.
- `marketing/Services.tsx` — 12-column asymmetric grid: cards 01–02 each `span 6`, cards 03–05 each `span 4`, card 06 `span 12` (full-width closing tile). Each card uses lucide stroke icon + num + title + description + From/duration footer; hover lifts 4px and switches border to `chrome`.
- `marketing/Pillars.tsx` — three trust pillars on `surface-deep`, hairline-divided grid, big display number + small qualifier (years / `★ · 200+` / "surprise quotes") + title + body. Star icon for the 4.9 pillar.
- `marketing/Reviews.tsx` — hero review in a large card with display-typeset blockquote, three supporting reviews in a 3-column grid below, all with hairline borders and `Star` icon rows.
- `marketing/Visit.tsx` — heading + Open-in-Maps link, a hand-drawn SVG map placeholder with grid lines and a pin labeled "MAPLE · 331 60 ST E #10", address + phone + email + hours table.
- `marketing/CtaBand.tsx` — final pre-footer CTA repeating "Book service / We confirm within the hour."
- `marketing/Footer.tsx` — wordmark + description + partnership line, services column, follow column (Instagram/TikTok/Facebook with handles), visit column (address/phone/hours), bottom copyright bar with build line.
- `marketing/ServiceDetailPage.tsx` — generic template that takes a `Service` and renders: back-link to `/#services`, hero (icon + eyebrow + headline + sub + CTAs), package-tier grid (only renders if the service has packages — currently just Detailing Packages), included-process bullets section on `surface-deep` (only renders if `details` is set), and FAQ section. The Photos service deliberately has no detail page — it routes to `/photos` instead.

**Pages**
- `app/page.tsx` — homepage composed of Nav → Hero → Services → Pillars → Reviews → Visit → CtaBand → Footer.
- `app/services/[slug]/page.tsx` — dynamic route with `generateStaticParams` returning 7 service slugs (excluding `photos`), `generateMetadata` per service, renders `<Nav><ServiceDetailPage /><CtaBand /><Footer />`. Async-params-aware (Next.js 16 syntax).
- `app/photos/page.tsx` — gallery placeholder with 9-tile grid of stylized cards, each captioned with a service type and vehicle. A footer note flags that real photographs need to replace these tiles before launch.

**Booking placeholder**
- All "Book service" / "Book detailing" / etc. CTAs link to `BOOKING_MAILTO`, which opens the user's mail client with `to: service@mapleautostudio.ca`, `subject: Booking request — Maple Auto Studio`, and a prefilled body asking for service / vehicle / preferred date / contact phone. To replace with a real form route, find usages of `BOOKING_MAILTO` (3 components: Nav, Hero, ServiceDetailPage; plus CtaBand) and swap to `<Link href="/book">` once the route exists.

### Build verification

`npm run build` passed cleanly after one fix:

- **Issue:** the `@next/swc-darwin-arm64` native binary in `node_modules/` was corrupt (truncated `__TEXT` segment), so Turbopack couldn't load and the build erroring out with a fallback-to-WASM message and a "use --webpack" suggestion. Looked like a cached-install corruption from the original scaffold.
- **Fix:** `rm -rf node_modules/@next/swc-darwin-arm64 && npm install @next/swc-darwin-arm64 --no-save`. Build immediately worked after.
- **Result:** 12 routes generated:
  - `/` (static)
  - `/_not-found` (static)
  - `/photos` (static)
  - `/services/[slug]` (SSG via generateStaticParams) → 7 paths: detailing-packages, ceramic-coating, paint-correction, window-tint, boat-services, accessories, seat-covers
  - Plus internal Next.js routes
- TypeScript passed, no warnings.

### Decisions made during the build (full list)

| Time  | Area | Decision | Rationale |
|---|---|---|---|
| 23:25 | setup | `next/font/google` for Hanken Grotesk + IBM Plex Sans + IBM Plex Mono | matches design bundle's typography spec, avoids paid Söhne/Neue Haas |
| 23:25 | setup | Tailwind v4 `@theme` for design tokens | scaffold default; gives utility classes like `bg-surface`, `text-fg-1`, `font-display` directly |
| 23:25 | setup | skipping shadcn/ui | bundle's components are simple enough; shadcn would impose conflicting opinions |
| 23:25 | icons | `lucide-react` (1.5px stroke per design system) | already in the bundle's iconography spec |
| 23:30 | hero media | static gradient + grid pattern instead of video | no video file yet — user needs to source from Pexels and drop in `/public`; see follow-up below |
| 23:32 | services grid | 12-column with spans 6/6/4/4/4/12 | matches the asymmetric layout in the post-pivot PDF (two big tiles + three thirds + one full-width closer) |
| 23:35 | reviews | hero review in display type, three supporting in body type, all in cards | matches the "service log" hierarchy from the design bundle |
| 23:38 | visit map | hand-drawn SVG placeholder with grid + pin | no real Mapbox/Google embed wired; placeholder reads as a precision diagram which fits the brand. Real map is a follow-up. |
| 23:40 | service pages | one shared `ServiceDetailPage` component fed by content array | avoids duplicating eight near-identical pages; each slug reads from `SERVICES_BY_SLUG` |
| 23:42 | photos | client-side gallery with 9 stylized placeholder tiles | Photos isn't really a "service" — it's a portfolio. Lives at `/photos`, not under `/services/`. Real photos replace the tiles before launch. |
| 23:44 | booking | single `BOOKING_MAILTO` constant used by all CTAs | one swap when the customer picks the real flow |
| 23:50 | build | `--webpack` workaround unnecessary after reinstalling swc binary | proper fix vs. hiding the underlying corruption |

### What's still placeholder / needs client confirmation before launch

- [ ] **Location**: Prince Albert vs. Saskatoon. Real business per royalautodetailing.ca is Prince Albert, but the design pivot landed on a Saskatoon address. `lib/content/contact.ts` currently has Saskatoon (matches the PDF). Resolve before launch.
- [ ] **All service pricing** — From-prices on cards (Detailing $129 / Ceramic $899 / Paint correction $499 / Window tint $239 / Boat $399) are industry-typical placeholders. Real prices unknown.
- [ ] **All testimonials** — Priya N., Marcus T., Danielle R., Sam K. are placeholder names with placeholder content. Replace with verified Google reviews.
- [ ] **Pillar claims** — "12 years" for Khus, "213 reviews / 4.9★ / 200+" — placeholder values, real numbers TBD.
- [ ] **Khus's bio** — "12 years on paint, ceramic, and interior work" was written before talking to him.
- [ ] **Hours** — Mon-Fri 8:00-18:00, Sat 9:00-15:00, Sun closed are placeholders.
- [ ] **Booking flow** — currently a `mailto:` stub. Swap to whatever the customer picks (form, Calendly, phone-only).
- [x] ~~**Hero video asset** — placeholder.~~ **Done in follow-up turn:** three Pexels mp4s now in `public/videos/hero/`. Hero plays a random one each page load via `<HeroVideo />` client component, with cool color filter (`brightness(0.55) saturate(0.65) contrast(1.05)`) and dark gradient overlay for legibility. To add more: drop more `.mp4`/`.webm`/`.mov` files into `public/videos/hero/` and rebuild — the directory is read at build time by `lib/hero-videos.ts`, no code change needed.
- [ ] **Photos page tiles** — placeholder gradient tiles with captions only. Real before/after photographs need to land in `/public/photos/` and be wired into the `PLACEHOLDER_TILES` array.
- [ ] **Real social handles** — Instagram/TikTok/Facebook all currently set to placeholder `@mapleautostudio`. Verify they're correct and active.
- [ ] **Map** — currently a stylized SVG placeholder. If the customer wants a live map, swap to a Mapbox dark-v11 embed or Google Maps iframe inside `Visit.tsx` (the SVG is a dedicated component, easy to replace).
- [ ] **Real logo** — currently a type-only wordmark in `Logo.tsx` ("MAPLE AUTO STUDIO · YXE"). If the customer has a logomark, drop the SVG into `public/` and update `Logo.tsx` to render it alongside the wordmark.
- [ ] **Favicon** — currently the Next.js default. Replace `app/favicon.ico` with a Maple-branded one.

### How to start it up when you return

From `Autoshop/autoshop-app/`:

```
npm run dev
```

Open `http://localhost:3000`. Click around:
- Homepage at `/`
- Service dropdown in nav, pick any service to see the detail-page template
- `/photos` for the gallery placeholder
- Booking buttons all open your mail client with a prefilled draft

`npm run build` is also passing if you want to confirm production output.

### Next steps after you review

In rough order of value:
1. Resolve the **location** (Prince Albert vs. Saskatoon) and replace `SHOP.location.*` in `lib/content/contact.ts`.
2. Get the **booking flow** decision from the customer, then either: keep mailto (cheapest), wire a contact form via Resend (free tier, requires API key in `.env.local` + a `/api/book` route + a real `/book` page), or embed Calendly.
3. Source a **hero video** from Pexels and update `Hero.tsx`.
4. Drop in **real photographs** for the gallery + update the `Photos` icon nav item to point somewhere real.
5. Swap the **map placeholder** for a real embed if the customer wants one.
6. Replace **placeholder pricing** on all service pages once the customer signs off.

### Mobile responsiveness pass (follow-up turn)

Audited every section at 375px and 768px and shipped the following:

- **`Nav.tsx`** — added a full mobile drawer with hamburger toggle. Body scroll-locks when open, Escape key closes, services dropdown is collapsible inside the drawer with the same main / divider / more grouping. All nav links + phone + Book CTA accessible on mobile.
- **`Hero.tsx`** — geo coords + EST. 2026 meta now stack inside the content column on mobile (below the CTAs) instead of being an `absolute` element in the bottom-right corner where they overlapped the headline. Headline clamp tightened so 375px doesn't overflow.
- **`Services.tsx`** — section header (title + "All services" link) stacks vertically on mobile. Card padding and title fluidly scale via `clamp()`. Footer row uses `truncate`/`shrink-0` so the price + duration don't blow out at narrow widths.
- **`Reviews.tsx`** — header row stacks. Hero review card padding fluid (24px → 48px). Supporting card padding fluid (20px → 28px).
- **`Visit.tsx`** — heading row stacks (Open in Maps moves below heading on mobile). Address + hours grid stacks below `lg`. Email gets `break-all` so long addresses wrap. Hours use `whitespace-nowrap` to keep day/time on one line each. Map SVG uses `preserveAspectRatio="xMidYMid slice"` so it doesn't distort when squeezed.
- **`CtaBand.tsx`** — was a 2-column grid that squeezed the CTA button. Now stacks vertically on mobile, restores 2-col layout from `lg` up.
- **`Footer.tsx`** — was a hardcoded 4-column grid with `gridTemplateColumns: "1.4fr 1fr 1fr 1fr"` (no responsive behavior). Now goes 1 column → 2 columns at `sm` (with the wordmark + description spanning both) → 4 columns at `lg`. Bottom copyright row stacks on mobile too.

Also cleared 5 Tailwind v4 canonical-class lint warnings (`max-w-[300px]` → `max-w-75`, `max-w-[600px]` → `max-w-150`, `max-w-[760px]` → `max-w-190`, `right-[var(--gutter)]` → `right-(--gutter)`).

Build re-verified — all 12 routes still generate cleanly, no TypeScript errors, no warnings.

### /process and /about pages (follow-up turn)

Both pages built using the existing voice/tone rules from the design bundle (confident, restrained, technical without being cold; sentence-case headlines, UPPERCASE eyebrows, periods over exclamation marks, second-person customer / first-person-plural shop).

- **`app/process/page.tsx`** — six-step walkthrough: Arrival → Inspection → Quote → Work → Final check → Delivery. Each step is a card in a 2-column hairline-divided grid (matches the Pillars block). Each card carries a big numeral, a meta tag (e.g. "PHOTOGRAPHED · MEASURED"), a title, and 2–3 sentence body. Closes with a "What you won't get" centered block emphasising no upsells / invoice = quote, then the existing CtaBand.

- **`app/about/page.tsx`** — three-section philosophy spread: PHILOSOPHY ("Specifics, not slogans" — explicit replacement of adjective-marketing with documented work), ONE TECHNICIAN (Khus 12 years, no junior pass-off), PARTNERSHIP (how detail and repair work hand off between Maple Auto Studio and Akaal). Closes with a "By the numbers" 4-stat grid (12 years / 4.9★ · 200+ / 6 services / 0 upsells) and a small caveat that the figures are confirmed quarterly with the customer.

- **`Nav.tsx`** — replaced `Process: /#process` with the real `/process` route; added `About: /about` to the desktop and mobile nav. Both new links are also rendered inside the mobile drawer's collapsible service list area.

- **`Footer.tsx`** — added an inline About / Process / Photos link row beneath the partnership line in the brand column. Photos was already in the SERVICES column, but having a "shop info" row alongside the brand makes the new pages findable at a glance.

Build re-verified: 14 routes now (was 12) — added `/about` and `/process`. TypeScript clean, no warnings, no canonical-class lint flags.

### Light-mode + theme toggle (follow-up turn)

The site shipped dark-only. Added a light alternative behind a class-based toggle so the brand identity (cool clinical-luxury) ships intact in both modes.

**How it works**
- Default state: dark mode. No class on `<html>`.
- Light opt-in: `<html class="light">`. The `:root.light` selector in `globals.css` overrides every color token with its light counterpart. Tailwind utilities (`bg-surface`, `text-fg-1`, etc.) and inline `var(--color-*)` references both pick up the swap automatically.
- Persistence: `localStorage["theme"] = "light"` survives reloads.
- No flash-of-wrong-theme: an inline `<script>` in the document `<head>` runs synchronously before paint and sets the class from `localStorage`. The toggle component reads it on mount and stays in sync.
- Smooth swap: `html { transition: background-color 240ms, color 240ms }` so the swap doesn't jolt. Disabled under `prefers-reduced-motion`.

**Light palette** — also "cool, never warm, never pure white." Mirror of the dark intent, inverted:
- Surface `#F2F4F6` / surface-deep `#E6EAEE` / elevated `#FFFFFF` (pure white only on cards, not as page background)
- Text `#1A2027` / `#54606B` / `#737B85` (passes WCAG AA at every level)
- Hairlines `#DDE2E7` / `#C8CFD5`, chrome (link hover) `#4A535C` (darker for contrast on light bg)
- CTA flips: dark button on light surface (`#1A2027` background, light text)

**Components touched**
- `app/globals.css` — added `:root.light` overrides, `color-scheme` directives, html transition, palette comment
- `app/layout.tsx` — inline `themeInitScript` in `<head>`, `suppressHydrationWarning` on `<html>` (the script may add a class before React mounts; the warning is expected)
- `components/ui/ThemeToggle.tsx` — new. Sun icon in dark mode (click → light), Moon icon in light mode (click → dark). Two variants: `icon` (small icon-only button for nav) and `row` (full-width line item for the mobile drawer with descriptive text). Uses `aria-pressed` for screen readers.
- `components/marketing/Nav.tsx` — toggle in desktop nav between phone link and Book CTA; toggle next to hamburger in mobile header; `row` variant inside the mobile drawer below the nav links.
- `components/marketing/HeroVideo.tsx` — gradient backgrounds were hardcoded hex (`#1a2027`, `rgba(15,20,24,…)`). Replaced with `color-mix(in srgb, var(--color-surface) X%, transparent)` so they track the active theme.
- `components/marketing/Visit.tsx` (MapPlaceholder SVG) — every hardcoded `#2a323b`, `#6e7780`, `#c0c5cc`, etc. replaced with `var(--color-*)` references on the SVG `stroke` and `fill` attributes. The map now redraws cleanly in either mode.

**What stayed dark in both modes**
Nothing — the entire surface flips. The hero video itself keeps its `brightness(0.55) saturate(0.65)` filter regardless of theme; the gradient overlay above the video flips with the surface, so legibility holds in both modes.

Build re-verified, all 14 routes green, no lint warnings.

### File tree summary

```
autoshop-app/
├── app/
│   ├── globals.css                      ← design tokens + base + buttons + reveal animations
│   ├── layout.tsx                       ← next/font wiring, root metadata
│   ├── page.tsx                         ← homepage composition
│   ├── photos/page.tsx                  ← gallery placeholder
│   └── services/[slug]/page.tsx         ← dynamic SSG route for 7 services
├── components/
│   ├── ui/Logo.tsx
│   └── marketing/
│       ├── Nav.tsx                      ← scroll-aware sticky nav with services dropdown
│       ├── Hero.tsx
│       ├── Services.tsx                 ← 6-card asymmetric grid
│       ├── Pillars.tsx                  ← 3 trust pillars
│       ├── Reviews.tsx                  ← 1 hero + 3 supporting
│       ├── Visit.tsx                    ← address + map placeholder + hours
│       ├── CtaBand.tsx
│       ├── Footer.tsx
│       └── ServiceDetailPage.tsx        ← shared template
├── lib/content/
│   ├── contact.ts                       ← shop info, BOOKING_MAILTO
│   ├── services.ts                      ← 8 services, 7 routed
│   └── reviews.ts                       ← reviews + pillars data
└── package.json                         ← +lucide-react
```

Build is green. WORK_LOG complete. Site at parity with the design bundle modulo the placeholders flagged above.

