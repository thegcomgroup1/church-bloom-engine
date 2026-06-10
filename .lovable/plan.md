
# Build out the full One Hope Church website

Expand from a single-page site to a 6-page site with a shared header, shared footer, flat top navigation, and unique SEO metadata on every route.

## New routes

```text
src/routes/
  index.tsx            → /              (home — keep as-is)
  plan-a-visit.tsx     → /plan-a-visit
  about.tsx            → /about
  leadership.tsx       → /leadership
  sermons.tsx          → /sermons
  give.tsx             → /give
  contact.tsx          → /contact
```

Each page gets its own `head()` with unique `title`, `description`, `og:title`, `og:description`, `og:url`, and a leaf `<link rel="canonical">`.

## Page contents

- **Plan a Visit** — Hero ("Your first Sunday, made easy"), what to expect, service times + Lawrence Primary address with embedded map and directions, kids/parking/what-to-wear cards, the existing visit form, FAQ ("Is it kid-friendly?", "How long is service?", "What should I wear?").
- **About** — Mission, the story paragraphs from `siteConfig`, the multi-cultural family note, beliefs (short statement of faith — 5–7 plain-language points), Life of Church photo grid, CTA to Plan a Visit.
- **Leadership** — Intro paragraph + grid of leader cards. Dr. Timothy Fowler card filled in (lead pastor); 3–5 placeholder cards with neutral avatar, name placeholder, role placeholder, short bio placeholder, all clearly marked so you can swap content in later. Easy-to-edit array at the top of the file.
- **Sermons** — Featured latest message (embedded YouTube from `siteConfig.sermon`), "Watch on YouTube" CTA, link to the YouTube channel, short note about subscribing. No archive grid yet (pulls from channel via link).
- **Give** — Why we give (1 short paragraph from `siteConfig.give.line`), big primary CTA to Tithely, "other ways to give" card (in person Sunday, mail a check — placeholder note), trust line ("Secure giving via Tithely").
- **Contact** — Phone, email, address, embedded map, socials, simple contact form (same client-side submit pattern as the visit form — no backend), service times sidebar.

## Shared chrome

- **StickyHeader** — Replace home-anchor links with flat route links: Home, Plan a Visit, About, Leadership, Sermons, Give, Contact. Active state via `activeProps`. Mobile menu mirrors the same links. "Plan Your Visit" stays as the primary CTA button.
- **Footer** — Add a sitemap column listing all 6 new pages; keep contact info and socials.
- **AnnouncementBar** — Keep as-is across all pages.
- **PlanYourVisitButton** — Update to link to `/plan-a-visit` instead of the home hash.

## SEO & structure

- Per-route `head()` with unique title/description/og tags and canonical on the leaf only (root keeps no canonical to avoid the TanStack links-dedup issue).
- Update `public/robots.txt` and `src/routes/sitemap[.]xml.ts` to include all 6 new URLs.
- JSON-LD: keep Organization/WebSite at root; add `Person` JSON-LD on Leadership for Dr. Fowler, and `BreadcrumbList` on each interior page.

## Out of scope (ask before adding)

- Events page, Ministries page (cut per "Core 6" scope — Home page still surfaces these as sections).
- Real leadership bios/photos beyond Dr. Fowler — placeholders only until you provide.
- Backend wiring for contact/visit forms (still client-only).
- Online sermon archive grid (link out to YouTube channel for now).

## Technical notes

- Flat-file routing: each route file uses `createFileRoute("/<path>")` matching its filename.
- All content sourced from `src/config/site.ts` where possible; new page-specific content (beliefs, FAQ, leadership array) lives at the top of its route file for easy editing.
- No new dependencies. No backend changes. No changes to `__root.tsx` beyond what `HeadContent` already handles per-route.
