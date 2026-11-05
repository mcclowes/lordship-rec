# Code review: Lordship Rec homepage

_Reviewer: incoming principal engineer. Brownfield onboarding pass._
_Scope: the custom React layer (`src/`) and site config. The MDX content under `docs/` and `blog/` is mostly out of scope except where the homepage duplicates it._

## Bottom line

The Docusaurus setup is fine. The sidebars, routing, and section structure are textbook, the build is green, and `tsc` passes clean. If this were only a docs site I'd have little to say.

The problem is the homepage. It's a beautiful, hand-built "weekly bulletin" that is almost entirely **hardcoded fake data pretending to be live**. It tells the reader the weather, this week's events, the latest wildlife sightings, the subscriber count, and the news — and almost none of it is real or will ever update. Worse, the real versions of that data already exist in this repo (`blog/`, `docs/facilities/`) and the homepage reinvents them as frozen TypeScript arrays that are already drifting out of date.

This is the kind of thing that demos great and then quietly lies to users for two years. For a volunteer-run community park, where the whole point is "what's on this week," shipping a homepage that can't be updated without a developer and a redeploy is the wrong call. Let me show you why, then how I'd fix it.

I've graded findings by severity. The teaching notes (`Why this matters`) are there for the more junior folks on the team — the point isn't "this code is bad," it's "here's the principle you reach for next time."

---

## Critical: the homepage lies, and it's designed to

### 1. "Live" content that is frozen in a `.tsx` file

The masthead ticks a real clock:

```tsx
// Masthead.tsx
const [now, setNow] = useState<Date | null>(null);
useEffect(() => {
  setNow(new Date());
  const id = setInterval(() => setNow(new Date()), 60_000);
  return () => clearInterval(id);
}, []);
```

So the date in the header is genuinely today. Today (per the project context) is **8 June 2026**. Directly below that live date sits this:

```tsx
// ThisWeek.tsx
<span className="col">Week 22 · May 2026</span>
// ...schedule rows: Tue 27 May ... Sun 01 Jun
```

The header says June. "This week in the park" says late May. The site contradicts itself the moment you look at it, and it'll keep getting worse every day no one edits the array. A "weekly bulletin" (the masthead's own words, and "New each week" in `LeadSpread`) that nobody can update weekly isn't a feature — it's a built-in decay clock.

**Why this matters:** if you render a live timestamp next to static content, you've made a promise the content can't keep. Either both are live or neither is. Pick one.

### 2. The weather is invented and attributed to a real instrument

```tsx
// Masthead.tsx
<span className="right">14°C · light cloud · wind WSW 8mph</span>
```

```tsx
// ThisWeek.tsx — WEATHER array, then:
<footer>Sourced from the park's weather station, named for the
meteorologist Luke Howard...</footer>
```

This is the one that would make me stop the launch. You've hardcoded six days of fictional weather and then printed "Sourced from the park's weather station." That's not a stylistic flourish, it's a false claim of provenance on a real, named, physical instrument that the Friends actually run. When it says "Bring wellies" on a sunny day, you've burned trust for a community that trades on it.

The same fiction repeats in the (dead) `FacilitiesGrid`: _"Weather station — Live readings from the park, updated continuously."_ They're not live, and they don't update.

**Why this matters:** never attribute fabricated data to a real source. If you don't have the live feed yet, say "weather station — coming soon" or omit it. Honest absence beats confident fiction every time.

### 3. News is a hand-copied snapshot of the blog that already exists

`News.tsx` hardcodes seven `Story` objects: "Friends' May 2026 meeting minutes," "Haringey friends groups demand fair funding," and so on. Every one of these corresponds to a **real MDX post already in `blog/`** (`2026-05-06-…`, `2026-04-19-…`, `2026-04-10-…`). You have one source of truth and you've copied it by hand into a second place that will immediately drift.

And the affordance is a lie too:

```tsx
// News.tsx
<div className="story__more">Read in full →</div>
```

That's a `<div>`. It looks like a link, it isn't one, it goes nowhere, and a keyboard or screen-reader user can't even focus it. Seven "Read in full" prompts that read in full precisely nothing.

**Why this matters:** this is the DRY principle with real stakes. Docusaurus exposes blog metadata to plugins and theme components. The homepage's "latest news" should be _derived_ from `blog/`, not retyped. Two copies of the truth means one of them is always wrong, and here the copy is the one users land on first.

### 4. The newsletter signup is theatre

```tsx
// Help.tsx
setTimeout(() => {
  setSubmitting(false);
  setMsg(`✓ Subscribed. Welcome aboard, ${email.split('@')[0]}.`);
  setEmail('');
}, 600);
```

It validates with a throwaway regex, waits 600ms to look busy, then tells the user **"✓ Subscribed"** — and does nothing. No request, no list, no record. The user believes they'll get the monthly email. They won't.

Meanwhile `docs/get-involved/mailing-list.mdx` is honest about the same feature: _"we'll add a working signup form to this site soon."_ So the site both admits it has no signup and fakes a working one, on different pages. At minimum these should agree. A fake success message is worse than an honest "not ready yet" — it loses you subscribers who think they're already in.

**Why this matters:** a form that claims success without doing the thing is a correctness bug, not a placeholder. If there's no backend, the honest UI is a `mailto:` link or a link to wherever signups actually happen, not a simulated 200.

### 5. Three different, contradictory membership numbers — all hardcoded

Within `Help.tsx` alone:

- section label: **"Friends · 1,400 strong"**
- body copy: **"1,400-and-counting"**
- stat block: **"1,412 Subscribers"**

Plus `LeadSpread` says "around fourteen hundred neighbours." So which is it — 1,400 or 1,412? They're hardcoded in four places, they already disagree, and "1,412" will be a lie the day after someone joins. Membership and subscriber counts are also two different things being used interchangeably.

**Why this matters:** any number that changes over time should live in exactly one place, ideally derived from a real source. Duplicated magic numbers don't just go stale, they contradict each other, and contradiction reads as carelessness to the visitor.

---

## High: architecture and the cost of every future edit

### 6. The most time-sensitive content is the hardest to edit

Look at who has to do what to change something:

- Add a blog post → drop a markdown file in `blog/`. A non-technical volunteer can be taught this.
- Fix this week's events, the wildlife log, the seasonal calendar, the park map facts → **edit TypeScript, run a build, redeploy.**

You've inverted the difficulty. The content that changes _weekly_ (events, sightings, weather) is locked in React, while the content that changes rarely (history, constitution) is in friendly markdown. For a volunteer org with, presumably, no full-time developer, this guarantees the homepage freezes solid the moment you walk away.

**The fix isn't "rewrite everything."** It's to move the volatile data out of the components and into something editable: front-matter-driven data files, a Docusaurus plugin that reads `blog/`, or a tiny headless source. The components stay; they just stop being the database.

### 7. Same facts, two sources, guaranteed to drift

The park's facilities are described in `ParkMap.tsx` (`SPOTS`), in `FacilitiesGrid`, _and_ in `docs/facilities/*.mdx`. The lake is "2.4 ha" in one place and prose in another. The orchard is "80+ heritage trees" in `ParkMap`, "eighty heritage trees" in `LeadSpread`, "80 heritage" in the map stats. Every one of these is a fact maintained in multiple hand-edited copies.

**Why this matters:** pick one home for each fact. If the facility docs are canonical, the map should pull from them (or from a shared data module both import). Otherwise you're signing up to update the orchard tree count in five files and you'll miss one.

### 8. `FacilitiesGrid` is dead code — and it's better than the code that's live

`FacilitiesGrid/index.tsx` is fully built, imports `@docusaurus/Link`, uses CSS modules properly... and is imported by nothing (`grep` confirms zero references). It's the only component in the repo that does navigation _correctly_, and it's orphaned.

Either wire it into the facilities landing page or delete it. Dead code that's higher-quality than the live code is a special kind of confusing for the next person — they can't tell which pattern is the one you actually endorse.

### 9. Raw `<a>` and fake links break the SPA

```tsx
// Help.tsx
<a className="more" href="/get-involved">Join →</a>
```

A raw anchor inside a Docusaurus app triggers a **full page reload** instead of client-side navigation, throwing away the SPA. Every "Join →" button is a hard refresh. `FacilitiesGrid` already shows the right way (`<Link to=…>`); the Bulletin components just didn't follow it.

This also matters if `baseUrl` ever stops being `/` (GitHub Pages project sites, staging under a path). Hardcoded `/get-involved` and `/img/lake-summer.webp` will 404. Use `<Link>` and `useBaseUrl()` for anything that isn't an external URL.

---

## Medium: correctness, accessibility, and the things that bite later

### 10. No tests, anywhere

There's no test runner in `package.json`, no Vitest, no single test. That's against the team's own stated TDD standard, and there's genuinely low-hanging fruit here — these are pure functions begging to be pinned down:

- `editionNumber()` and `formatDate()` (Masthead)
- `seasonForMonth()` (Seasons) — exactly the kind of off-by-one boundary logic (is month 11 winter? is `< 5` spring?) that a three-line test makes safe forever
- the email validation in `Help`

You don't need to test the JSX. You need to test the logic, and right now none of it is.

### 11. Toggle buttons don't tell assistive tech they're toggles

The map picker, the season bar, and the news filter are all sets of buttons where one is "active," styled with a class:

```tsx
className={t === tag ? 'active' : ''}
```

Visually clear, invisible to a screen reader. These need `aria-pressed` (or `aria-current`) so non-sighted users know which filter/season/place is selected.

And when you click a map pin, the info panel below swaps its entire contents (`<h3>`, description, stats) with **no `aria-live` region** — a screen reader user hears nothing change. The interaction works for the mouse and is silent for everyone else.

**Why this matters:** "it works when I click it" is the sighted-mouse-user path. State that's only conveyed by color/class is state that a chunk of your audience can't perceive. ARIA is how you say it out loud.

### 12. The SVG map is geometrically a lie

```tsx
<svg viewBox="0 0 100 80" preserveAspectRatio="none" ... />
```

`preserveAspectRatio="none"` stretches the map to fill its box, so the "1 : 5000 scale" label sits on a plan that distorts to whatever the container's aspect ratio happens to be. The pin coordinates (`x`, `y` percentages) are positioned over a separately-distorting layer, so on narrow screens the pins and the drawn features drift apart. For a decorative plan this is survivable, but don't print a scale on a map that has no fixed scale.

### 13. Hydration flashes and a needless interval

`Seasons` renders spring on the server then corrects to the real season on the client (the comment is honest about it) — so a winter visitor sees a flash of spring. `Masthead` renders no date server-side, then pops it in. Both are defensible SSR dodges, but they're flashes, and the masthead's `setInterval(…, 60_000)` re-renders the whole header every minute to update a string that changes once a day. Cheap, but it's work for nothing; an interval that fires at the next midnight would be correct and quiet.

### 14. Styling is split between a CSS file and inline magic numbers

The project convention (per `CLAUDE.md`) is that the homepage is styled by `bulletin.css`. Yet there are seven inline `style={{…}}` blocks scattered through the components, including a meaty one in `FieldNotes`:

```tsx
style={{fontFamily: 'var(--bulletin-mono)', fontSize: 10.5, letterSpacing: '0.1em', ...}}
```

`style={{marginTop: 14}}`, `style={{marginTop: 18}}`, `fontSize: 10.5` — these are un-themeable, un-reusable magic numbers that dodge the design system you already built (the `data-palette` / `data-density` attributes are a genuinely nice idea). Either it's in `bulletin.css` or it isn't. Right now it's both, and the inline ones win the specificity fight in ways the next editor won't expect.

### 15. Two ~1,000-line global CSS files

`custom.css` (992 lines) and `bulletin.css` (977 lines) are a lot of un-scoped, un-tested global CSS. `FacilitiesGrid` shows the team knows CSS Modules; the homepage abandons them for global class names (`.section`, `.head`, `.row`, `.story`, `.group`) that are highly likely to collide with Docusaurus/Infima internals or future components. `.row` and `.head` as global selectors are accidents waiting to happen.

---

## Low: polish, but the kind a principal notices

- **Invented numbering that contradicts itself.** The masthead computes an edition "No. ~2500" from a 2001 epoch; `News` says "No. 312 — 318"; `FieldNotes` says "Vol. XXV"; the map says "plan no. III." Four unrelated numbering schemes, one of them live-computed against static content. Charming individually, incoherent together.
- **`new Date().getFullYear()` in `docusaurus.config.ts`** (footer + RSS copyright) is evaluated at _build_ time. Fine as long as you rebuild yearly; worth a comment so nobody thinks it's dynamic.
- **`key={n.title}`** in `News` will collide if two posts ever share a title. Prefer a stable id or slug.
- **`email.split('@')[0]`** as a greeting means `jane+parks@gmail.com` gets welcomed as "jane+parks." Minor, but it's user input rendered back uncritically.
- **Blog filename typos** that become permanent URLs: `2026-01-25-financial-appea-for-the-friends.mdx` ("appea") and `2026-05-06-friends-may-2026update.mdx` (missing hyphen). Fix before launch; redirects are annoying after.
- **`docusaurus-social-card.jpg`** is still the default Docusaurus card (the README's own TODO list flags this and four other pre-launch swaps that aren't done).
- **No width/height on the homepage images** → layout shift (CLS) as they load. `loading="eager"` on the hero is right for LCP; pair it with intrinsic dimensions.

---

## Edge cases not yet handled

These are the "what happens when reality doesn't match the array" cases. None are hypothetical — they're all reachable.

1. **The calendar runs out.** Every `SCHEDULE` and `WEATHER` date is in the past as of today. There's no "no upcoming events" state because the code assumes the array is always current. The day after the last event, the site shows a past week as "this week" with zero indication anything's wrong.
2. **Empty news filter.** `News` filters by tag; if a future tag has its last post removed, the list renders empty with no "nothing here" message. Low odds, zero handling.
3. **Time-zone / midnight boundary.** `new Date()` is the client's clock. A visitor just past midnight in a different zone can see yesterday's or tomorrow's date and edition number. Negligible for a London park, but it's the kind of assumption worth knowing you've made.
4. **Season boundary correctness is untested.** `seasonForMonth` hinges on `month < 2 || month === 11` etc. (0-indexed). It looks right. "Looks right" on date math is how you ship a bug that only appears in March. Pin it with a test.
5. **Duplicate React keys.** `News` keys on title, `FieldNotes`/`ThisWeek` key on composite strings that could repeat (two sightings "23 May / Kingfisher" would collide). Reachable with real data entry.
6. **Map on small screens.** Eight absolutely-positioned hotspots over a `preserveAspectRatio="none"` SVG: at phone widths the pins and the features they point at separate, and pins can overlap each other. No test, no min-size handling.
7. **Subscriber count going stale mid-sentence.** "1,412" is rendered as fact. The moment it's wrong (immediately), it's a visible, dated inaccuracy with no mechanism to ever be right.

---

## What's actually good (credit where due)

I've been hard on this because the bones are good and the gap between the polish and the substance is the problem. Genuinely well done:

- The Docusaurus structure is clean — autogenerated sidebars, one-sidebar-per-section, sensible navbar/footer. The section-creation checklist in `CLAUDE.md` is exactly the kind of doc that saves the next person an afternoon.
- `@docusaurus/faster` is on, the hero image is `.webp` and eager-loaded, `tsc` is strict and green.
- The `data-palette` / `data-density` / `data-dropcap` theming hooks on the bulletin wrapper are a clean, declarative way to drive a design system. That's a nice pattern — it just deserves real CSS-module scoping and real data behind it.
- `FacilitiesGrid` (orphaned though it is) is the model the rest of the homepage should copy: typed data, `<Link>`, CSS Modules, `aria-hidden` on decorative emoji.
- The writing is lovely. The copy is the best thing here. Which is exactly why it's a shame so much of it is fiction.

---

## What I'd do, in order

1. **Stop the false-provenance claims before launch.** Remove "Sourced from the park's weather station" and "Live readings... updated continuously," or wire real data. This is a trust issue, not a code-quality issue.
2. **Make the newsletter form honest.** Either connect it to a real list, or replace it with a `mailto:`/link and a "coming soon," matching what `mailing-list.mdx` already admits.
3. **Derive News from `blog/`** instead of hand-copying it, and make the cards real `<Link>`s to the posts.
4. **Move the volatile data (events, sightings, weather, counts) out of components** into editable data files, so a non-developer can keep the "weekly bulletin" weekly. This is the structural fix that makes the whole conceit viable.
5. **De-duplicate the facts** — one home per number, the facility docs or a shared data module as the source.
6. **Add the accessibility basics** — `aria-pressed` on toggle groups, an `aria-live` region on the map info panel, real focusable links instead of `<div>` affordances.
7. **Add a test runner and pin the pure functions** (`seasonForMonth`, `editionNumber`, email validation). Small, fast, and it's the team's own standard.
8. **Decide on `FacilitiesGrid`** — wire it in or delete it — and pull the inline styles back into the stylesheet.

The first four are about whether the site tells the truth. The rest is craft. Do the first four before this goes near the public.
