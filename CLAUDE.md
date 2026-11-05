# Project notes for Claude

Static site for Friends of Lordship Rec. **Docusaurus 3.10 + React 19 + TypeScript.** Node ≥ 20. See `README.md` for repo structure and pre-launch TODOs.

## Stack quirks

- `docs` plugin uses `routeBasePath: '/'` — docs live at the site root. The blog plugin is mounted at `/news`.
- Custom homepage at `src/pages/index.tsx` overrides the docs root. It composes the `Bulletin/*` components and is styled by `src/css/bulletin.css` (palette/density/dropcap set via `data-*` attrs on the wrapper).
- `i18n.defaultLocale` is `en-GB`. Keep copy in British English.

## Sections

Eight doc sections, each autogenerates its sidebar from its folder name (`sidebars.ts`). To add a new section, all four of these are required or routing breaks:

1. `docs/<section>/index.mdx` with frontmatter `slug: /<section>`
2. `docs/<section>/_category_.json`
3. A `<section>Sidebar` entry in `sidebars.ts`
4. A navbar item in `docusaurus.config.ts` (either a `docSidebar` ref or a `dropdown`)

## Blog posts

- Filename: `YYYY-MM-DD-slug.mdx`.
- Frontmatter must use authors from `blog/authors.yml` and tags from `blog/tags.yml` — `onInlineTags` and `onInlineAuthors` are set to `warn`.
- Posts render at `/news/<slug>`.

## Don't

- Don't paste WordPress shortcodes (`[mc4wp_form …]`, `[caption …]`, etc.) — they render as literal text. The legacy mailing-list page still has one; replace it with real HTML/JSX, don't propagate the pattern.
- Don't add `editUrl` to the docs plugin config until you've confirmed the GitHub repo path is stable (currently `mcclowes/lordship-rec`).
- Don't reintroduce `_Placeholder` markers — the placeholder sweep is complete.

## Before declaring a change done

- `npm run typecheck` — passes with no errors.
- `npm run build` — completes; treat `onBrokenLinks: 'warn'` / `onBrokenMarkdownLinks: 'warn'` output as something to investigate, not ignore.
- For homepage / Bulletin / CSS changes: run `npm start` and visually confirm — typecheck won't catch layout regressions.

## Task tracking

Per global instructions, work is tracked in GitHub issues (`gh issue …`). The repo is at `github.com/mcclowes/lordship-rec`.
