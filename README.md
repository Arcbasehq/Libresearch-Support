# LibreSearch Support

The help center for [LibreSearch](https://libresearch.ca), served at
**support.libresearch.ca**.

It answers common questions about the private search engine — getting started,
search operators, privacy and security, and settings — through a searchable
home page and a set of help articles. Like LibreSearch itself, it's static and
private: no backend, no tracking, and search runs entirely in your browser.

## Content

Articles and the home-page category cards are managed in **Sanity** and fetched
at build time, then prerendered to static HTML — so editing stays out of the
codebase while the site stays fully static. The Studio lives in [`studio/`](./studio).

Configure the site with a Sanity project (see [`.env.example`](./.env.example)):

```
PUBLIC_SANITY_PROJECT_ID="<project id>"
PUBLIC_SANITY_DATASET="production"
```

New or edited content goes live on the next build. See
[`studio/README.md`](./studio/README.md) for Studio setup and the one-time
content seed.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static production build
```
