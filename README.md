# Lordship Rec

Website for [Friends of Lordship Rec](https://lordshiprec.org.uk), built with [Docusaurus](https://docusaurus.io).

## Local development

```bash
npm install
npm start            # dev server with hot reload
npm run build        # static production build into ./build
npm run serve        # serve the production build locally
npm run typecheck    # tsc --noEmit
```

Node ≥ 20 required.

## Structure

```
docs/
  about/              # About the Friends, get involved, constitution, contact
  facilities/         # Playground, woodland, lake, BMX, hub, weather station
  history/            # Chronology, wartime, walks
  regeneration/       # Active and past park projects
blog/                 # News posts (served at /news)
src/
  components/         # FacilitiesGrid and any future custom components
  pages/index.tsx     # Custom homepage (overrides docs root)
  css/custom.css      # Global Infima overrides
static/img/           # Logo, favicon, social card, photos
docusaurus.config.ts  # Site config (nav, footer, plugins)
sidebars.ts           # One sidebar per section (about/facilities/history/regeneration)
```

Docs are served at the site root (`routeBasePath: '/'`), so e.g. `docs/facilities/lake.mdx` lives at `/facilities/lake`. The blog plugin is mounted at `/news`.

## Adding content

- **News post:** drop a new `.mdx` file in `blog/` named `YYYY-MM-DD-slug.mdx` with frontmatter `title`, `authors: [friends]`, and tags from `blog/tags.yml`.
- **Static page in a section:** add an `.mdx` file under the relevant `docs/<section>/` folder. `sidebar_position` controls ordering.
- **New top-level section:** create `docs/<section>/`, add an `index.mdx` with `slug: /<section>`, add a `_category_.json`, add a sidebar entry in `sidebars.ts`, and add a navbar item in `docusaurus.config.ts`.

## To do before launch

- [ ] Replace `static/img/logo.svg` with the Friends logo
- [ ] Replace `static/img/favicon.ico` with a park-themed favicon
- [ ] Add `static/img/social-card.jpg` (Open Graph / Twitter share image, 1200×630)
- [ ] Fill in placeholders across `docs/` (search for `_Placeholder` in MDX files)
- [ ] Set up the mailing list signup on `/about/get-involved`
- [ ] Migrate news posts from the existing WordPress site
- [ ] Push to GitHub and set `editUrl` in `docusaurus.config.ts`
- [ ] Configure deployment (Vercel, Netlify or GitHub Pages)

## Deployment

The build output is a fully static site in `./build` — drop it on any static host. Recommended: Vercel or Netlify (git-connected, deploys per push).
