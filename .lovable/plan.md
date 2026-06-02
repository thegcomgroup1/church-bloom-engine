
# HLPR Master Ministry Base — Build Plan

A reusable, token-driven church homepage. Build once, re-skin per church by swapping brand tokens, copy placeholders, images, and one signature touch. No methodology language ever appears on the page.

## Scope (this chat only)

- One page. The Master Base itself, generic placeholders only.
- No Mark / Odessa First content yet — that's the next chat (remix).
- No inner pages, no backend, no auth, no CMS.
- All 11 sections built (free-mockup sections 1–6 + 11 get the most polish; paid-build sections 7–10 are built into the base so future paid work is fast).

## Design tokens (single source of truth in `src/styles.css`)

Defined as CSS custom properties in `:root` using `oklch`, registered in `@theme inline` so Tailwind utilities resolve to them:

- `--color-primary` — buttons / primary action ONLY
- `--color-secondary` — headings / secondary text
- `--color-background` — light neutral page bg
- `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-border`, `--color-card`
- `--font-display` — headlines only (default: a warm serif via Google Fonts)
- `--font-body` — everything else (default: a clean humanist sans)
- Spacing scale stays Tailwind's default (multiples of 4/8) — rhythm enforced in components
- One radius token; restrained shadow tokens

Per-church re-skin = edit `:root` tokens + a small `siteConfig` object. No structural edits.

## Content config (single source of truth in `src/config/site.ts`)

A typed `siteConfig` object holding every swappable string and asset path:

```
{
  church: { name, shortName, city, mission, story, foundedLine },
  brand:  { logoSrc, heroImageSrc, accent },
  service:{ days, times, address, mapEmbedUrl, parking, dress, length },
  expect: [ {icon, title, body} x 4 ],
  life:   [ imageSrc x 6-8 ],
  ministries: [ {name, line} x 4-6 ],
  events: [ {date, title, blurb} x 3 ],
  sermon: { title, embedUrl, link },
  give:   { embedUrl, line },
  contact:{ phone, email, socials[] },
}
```

Per-church mockup = duplicate project, edit tokens + this one file + drop in real photos.

## Page architecture

Single route `/` (TanStack Start `src/routes/index.tsx`) renders sections in this fixed order. Each section is its own component under `src/components/sections/`:

1. `StickyHeader` — logo left, nav right (New Here, About, Times & Location, Give), prominent "Plan Your Visit" button. Mobile: logo + always-visible Plan Your Visit (NOT inside the hamburger).
2. `Hero` — full-width real-photo slot, warm H1 naming the church + welcome, one-line subhead, primary "Plan Your Visit", service time + city visible.
3. `TimesLocation` — service day/time, address, embedded Google Map iframe, quick practical notes (parking, dress, length) as scannable icon rows.
4. `WhatToExpect` — 4 short reassurance blocks with lucide icons (service feel, length, come as you are, kids). Ends with "Plan Your Visit" button.
5. `MissionStory` — short mission + brief origin story + photo. Generous spacing, short paragraphs.
6. `LifeOfChurch` — responsive open grid of photo slots (no carousel). Optional spot for a real number or short testimonial.
7. `Ministries` — scannable cards (name + one warm line).
8. `Events` — 3 upcoming events (date, blurb, learn-more).
9. `Sermons` — featured latest message with embed/link slot.
10. `Give` — clean band with embed/link slot and plain-language line.
11. `PlanYourVisit` (final band) — short form (name, email, "when are you thinking of coming?") + service time, address, map, phone, socials. Page ends on the action.
12. `Footer` — logo, contact, socials, copyright.

Primary action ("Plan Your Visit") appears at top, middle (sections 2 & 4), and end (section 11) — three chances, per the spec.

## Copy rules baked in

- All placeholder text written warm/plain/human, addressed to a nervous first-timer.
- Every section leads with visitor benefit, not a label.
- Bracketed placeholders for swap targets: `[CHURCH NAME]`, `[MISSION LINE]`, `[SERVICE TIME]`, `[ADDRESS]`, etc.
- ZERO methodology / framework / strategy language on the rendered page.

## Accessibility & responsiveness

- Mobile-first; every section tested at 360 / 768 / 1280.
- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), single H1 (hero), logical heading order.
- Alt text on every image slot; form labels associated; focus rings visible; color contrast meets AA against tokens.

## SEO

- `head()` on `/` with generic Master Base title/description and og tags (will be swapped per church).
- One H1, semantic HTML, lazy-loaded images, responsive viewport already in `__root.tsx`.

## File-level changes

- `src/styles.css` — extend `:root` with brand + font tokens; register `--font-display`/`--font-body` in `@theme inline`; import Google Fonts via `<link>` in `__root.tsx` head.
- `src/config/site.ts` — new `siteConfig` (the swap layer).
- `src/components/sections/*.tsx` — 12 section components.
- `src/components/ui/PlanYourVisitButton.tsx` — single reusable primary CTA so wording/styling stays consistent across 3 placements.
- `src/routes/index.tsx` — replace placeholder; assemble sections in order; per-page `head()` SEO.
- `src/assets/placeholders/` — neutral, clearly-marked placeholder images (generated) so the base reads cleanly before per-church swap.

## Technical details

- Stack: existing TanStack Start + Tailwind v4 + shadcn primitives already in the project.
- Use existing shadcn `button`, `card`, `input`, `label`, `textarea`. No new deps required.
- Icons: `lucide-react` (already standard with shadcn).
- Form on section 11: client-side only for the base (no submit handler wired) — paid build hooks it to GHL/email later. Show success state on submit so the mockup feels complete.
- Map: plain `<iframe>` embed slot pointing at a generic placeholder URL in config.
- No Lovable Cloud / no DB this round — pure presentation, as the spec demands.

## Out of scope (explicitly)

- Mark / Odessa First content and signature touch (next chat).
- Inner pages (About, Ministries detail, etc.).
- Form backend, analytics, CMS, auth.
- Multiple themes / theme switcher — re-skin is a code edit, not a runtime toggle.

## Deliverable

A published-preview-ready single page that, when you change ~6 token values and one config file, becomes a believably custom homepage for any church.
