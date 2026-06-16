# Maple Auto Studio

Marketing and booking site for **Maple Auto Studio** — an independent auto
detailing studio in Saskatoon (in partnership with Akaal Auto Hub). Customers
browse services and request bookings; the shop reviews and manages those
requests from a password-gated admin dashboard.

## Monorepo layout

npm workspaces driven by [Turborepo](https://turbo.build/):

| Path             | What it is                                                        |
| ---------------- | ----------------------------------------------------------------- |
| `apps/web`       | Next.js 16 (App Router) marketing site, booking flow, and admin   |
| `apps/mobile`    | Expo / React Native staff app (booking notifications)             |
| `packages/core`  | Shared content and logic consumed by both apps (`@maple/core`)    |

## Stack

- **Next.js 16** / App Router / TypeScript
- **Tailwind CSS v4** + **Framer Motion**
- **Supabase** — Postgres, auth, and row-level security for booking data
- **Resend** — transactional email for booking notifications
- **Vercel** — hosting for the web app
- **Expo 54 / React Native 0.81** — staff mobile app

## Getting started

```bash
npm install            # install all workspaces

cp apps/web/.env.local.example apps/web/.env.local   # then fill in values

npm run dev            # runs the web app (turbo dev --filter=web)
```

Open [http://localhost:3000](http://localhost:3000).

### Mobile app

```bash
npm run start --workspace=mobile   # Expo dev server
```

## Environment

`apps/web` reads its configuration from `apps/web/.env.local`. See
`apps/web/.env.local.example` for the full list — Resend (`RESEND_API_KEY`,
`BOOKING_NOTIFY_TO`, `BOOKING_NOTIFY_FROM`) and Supabase (`SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `ADMIN_EMAILS`).

> The Supabase service-role key bypasses RLS and is server-only — never expose
> it to the client.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the web app in development     |
| `npm run build` | Build all workspaces via Turbo       |
| `npm run lint`  | Lint all workspaces via Turbo        |

## Deployment

The web app deploys to Vercel. Configure the same environment variables from
`.env.local.example` in the Vercel project settings before deploying.

## Maintenance

Free-tier Supabase projects pause after ~7 days of inactivity, which takes the
booking form and admin view offline. The **Supabase keep-alive** GitHub Action
(`.github/workflows/supabase-keepalive.yml`) pings the database every Monday so
the project never sleeps — no more manual weekly inserts.

It needs two repository secrets (**Settings → Secrets and variables → Actions**):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

You can also trigger it on demand from the **Actions** tab.
