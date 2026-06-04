# LibreSearch Support — Sanity Studio

Content source for the help center at `support.libresearch.ca`. The SvelteKit
site fetches this content **at build time** and bakes it into static HTML, so
publishing changes means re-running the site build (e.g. via a deploy webhook).

## Content types

- **Article** — a help article. Fields: title, slug, category, excerpt,
  keywords, last-updated date, and a Portable Text body. Renders at
  `/articles/<slug>`.
- **Home Category Card** — one of the four cards under the home-page hero.
  Links to a featured article and shows an icon.

## First-time setup

1. Create a project at https://www.sanity.io/manage (note the **project ID**;
   the default dataset is `production`).
2. Copy env and fill it in:
   ```bash
   cp .env.example .env
   # set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET
   ```
3. Install and run the Studio locally:
   ```bash
   npm install
   npm run dev      # http://localhost:3333
   ```

## Seed the original content (one-time)

Migrates the help articles that used to live in `src/lib/articles.ts` (HTML is
converted to Portable Text automatically). The script writes a `seed.ndjson`
file; import it with the CLI using your own logged-in account:

```bash
SANITY_STUDIO_PROJECT_ID=52bsppei npm run seed
npx sanity login                                   # if not already logged in
npx sanity dataset import seed.ndjson production --replace
```

Safe to re-run — documents use stable IDs and are upserted (`--replace`).

> The CLI uses your account (Administrator), which has content-write access.
> Project API tokens here were observed to carry only project-management
> grants, not document write — hence the CLI import rather than a token push.
> (If you have a write-capable token, `SANITY_AUTH_TOKEN=<token> npm run seed`
> will also push directly.)

## Deploy the Studio

```bash
npm run deploy   # hosts at https://<name>.sanity.studio
```

## Point the website at this project

In the SvelteKit app (repo root), set the public env vars (see its
`.env.example`):

```
PUBLIC_SANITY_PROJECT_ID="<same project id>"
PUBLIC_SANITY_DATASET="production"
```

Then rebuild the site. New/edited content appears after each build.
