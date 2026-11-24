# Deploying thedigitalmarketing.services

## How the site runs

The site is a Next.js app that runs on Node.js (`next start`). It is no longer a static
export: blog posts and case studies are read from Supabase, so there is no `out/` folder
to upload.

```bash
npm install
npm run build
npm start        # listens on $PORT, 3000 by default
```

Node.js 20.9 or newer is required.

## Environment variables

Set these on the host **before building** — `NEXT_PUBLIC_` values are compiled into the
build, so changing one means rebuilding.

| Variable | What it is for |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (blog posts, case studies, admin). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key. See `supabase/README.md`. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Contact form (free at https://web3forms.com). Until set, the form shows an error directing users to email instead. |

`SUPABASE_SERVICE_ROLE_KEY` is only for `scripts/seed-content.mjs` on your own machine.
It does not belong on the host.

## Option A — Hostinger (Node.js web app)

Needs a plan with Node.js web apps (Business or Cloud).

1. In hPanel → Websites → Add Website, choose **Node.js Apps** and import the GitHub
   repository `tdmservices/TDM-Services`, branch `main`.
2. Framework: **Next.js**. Build command `npm run build`, start command `npm start`,
   Node.js 20 or newer.
3. Add the environment variables above, then deploy.
4. Point `thedigitalmarketing.services` at the app in hPanel → Domains. If the old
   WordPress site is on the same account, back up its files and database first.

Every push to `main` redeploys the site.

## Option B — Vercel

Import the repository in Vercel (framework: Next.js), add the environment variables
above, and deploy.

## Redirects and headers

The redirects from the old WordPress URLs and the response headers are listed in
`vercel.json`. `next.config.ts` applies the same list, so they work on any Node.js
host, not only on Vercel. Edit them in `vercel.json`.

## After go-live (either option)

1. Verify a few old URLs redirect correctly, e.g.
   `/search-engine-optimization-services/` → `/marketing/seo/`.
2. In Google Search Console, submit `https://thedigitalmarketing.services/sitemap.xml`.
3. Keep the old WordPress database backup for 30 days in case content needs recovering.

## Content still pending (safe to launch without, better with)

- Client approval list (`E:\TDM\build\client-approval-list.md`) — case studies are
  anonymized by default; flip `anonymous: false` in
  `src/content/en/case-studies.ts` (+ fr/ar files) per approved client.
- Team photos (`src/content/en/team.ts` + `/public/team/`), media showreel links
  (`videos` arrays in `src/content/en/services/media.ts`), WhatsApp + social links
  (`src/lib/site.ts`), France/Bulgaria office addresses
  (`src/content/en/locations.ts`).
