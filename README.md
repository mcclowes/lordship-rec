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
  about/              # The Friends, history of the Friends, constitution, policies
  park/               # About the park, getting there, booking, management, local communities
  facilities/         # Playground, woodland, lake, BMX, hub/cafe, weather station, orchard, outdoor gym, river Moselle, model traffic area, active play
  wildlife/           # Wildlife in the park
  history/            # Chronology, wartime, walks
  regeneration/       # Active and past park projects
  festival/           # Festival & events, calendar
  get-involved/       # Volunteering, mailing list, user groups (sports, wildlife, walking, etc.)
  links.mdx           # External links page
blog/                 # News posts (served at /news), with authors.yml and tags.yml
src/
  components/
    Bulletin/         # Homepage components (Masthead, LeadSpread, ThisWeek, ParkMap, FieldNotes, Seasons, Help, News)
    FacilitiesGrid/   # Facilities landing-page grid
  pages/index.tsx     # Custom bulletin-style homepage
  css/custom.css      # Global Infima overrides
  css/bulletin.css    # Homepage bulletin styles
static/
  img/                # Logo, favicon, social card, photos
  downloads/          # PDFs (e.g. volunteering map)
docusaurus.config.ts  # Site config (nav, footer, plugins)
sidebars.ts           # One sidebar per section
```

Docs are served at the site root (`routeBasePath: '/'`), so e.g. `docs/facilities/lake.mdx` lives at `/facilities/lake`. The blog plugin is mounted at `/news`.

## Adding content

- **News post:** drop a new `.mdx` file in `blog/` named `YYYY-MM-DD-slug.mdx` with frontmatter `title`, `authors: [friends]`, and tags from `blog/tags.yml`.
- **Static page in a section:** add an `.mdx` file under the relevant `docs/<section>/` folder. `sidebar_position` controls ordering.
- **New top-level section:** create `docs/<section>/`, add an `index.mdx` with `slug: /<section>`, add a `_category_.json`, add a sidebar entry in `sidebars.ts`, and add a navbar item in `docusaurus.config.ts`.

## To do before launch

- [ ] Replace `static/img/logo.svg` with the Friends logo (still the default Docusaurus logo)
- [ ] Replace `static/img/favicon.ico` with a park-themed favicon
- [ ] Replace `static/img/docusaurus-social-card.jpg` with a 1200×630 park photo (see TODO in `docusaurus.config.ts`)
- [ ] Replace WordPress shortcode in `docs/get-involved/mailing-list.mdx` with a working signup form
- [ ] Set `editUrl` in `docusaurus.config.ts` (repo is at github.com/mcclowes/lordship-rec)
- [ ] Configure deployment (Vercel, Netlify or GitHub Pages)

## Deployment

The build output is a fully static site in `./build` — drop it on any static host. Recommended: Vercel or Netlify (git-connected, deploys per push).
