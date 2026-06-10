
## 1. Fix interior page heroes (visual)

Replace the flat brown `bg-secondary` block on `/plan-a-visit`, `/about`, `/leadership`, `/give`, `/contact` with the homepage's media-aware hero pattern: full-bleed photo + dark gradient overlay + white headline/eyebrow/body.

- Extract a small `PageHero` component (`src/components/sections/PageHero.tsx`) that takes `imageSrc`, `imageAlt`, `eyebrow`, `title`, `children?` and renders the same gradient stack used in `Hero.tsx` (image as `-z-10` cover, `bg-gradient-to-b from-black/55 via-black/45 to-black/65` overlay, white text).
- Use existing onehope photos already in `src/assets/onehope/`:
  - `/plan-a-visit` → `IMG_4336-scaled` (congregation, same as homepage hero — strong "this is what you're walking into" cue)
  - `/about` → `16366` (the story image)
  - `/leadership` → `IMG_0076-scaled` (teaching shot)
  - `/give` → `IMG_0124-scaled` (community/serving)
  - `/contact` → `15456` (welcoming a guest)
- Add the image URLs to `siteConfig.brand` (e.g. `pageHeroes: { planAVisit, about, leadership, give, contact }`) so swaps stay in one place.
- Keep existing copy. Add OG image meta on each route pointing to its hero photo (better social shares — leaf-only, per route architecture rules).

## 2. Make Plan a Visit actually work (backend)

Today the form sets a local `submitted` state and discards data. We'll make it a real funnel.

### Data model
New table `public.visit_plans`:

```text
id              uuid pk
created_at      timestamptz default now()
name            text not null
email           text not null
phone           text
party_size      int
planned_date    text   -- free text ("This Sunday", "Nov 16", etc.)
note            text
how_heard       text
status          text default 'new'  -- new | contacted | visited | archived
user_agent      text
```

- RLS enabled. Anon `INSERT` allowed (public form). No public `SELECT`. `SELECT/UPDATE` only for users with `admin` role via `has_role()` (standard user-roles pattern — add `app_role` enum + `user_roles` + `has_role` if not already present).
- Grants per the public-schema rule: `INSERT TO anon`, `SELECT/UPDATE TO authenticated`, `ALL TO service_role`.

### Server function
`src/lib/visit-plans.functions.ts`:
- `submitVisitPlan` — `createServerFn({ method: "POST" })`, Zod-validated input (trim, length caps, email format), inserts via `supabaseAdmin` (loaded inside the handler), then fires the confirmation email. Returns `{ ok: true }`.

### Auto-confirmation email
Use Lovable's built-in email infrastructure (no third-party tool needed):
1. Check email domain status; if none, show the email-setup dialog first.
2. Run `setup_email_infra` then `scaffold_transactional_email`.
3. Add a branded React Email template `visit-confirmation` in `src/lib/email-templates/` — warm note from Pastor Tim, address, parking, service time, what to expect, reply-to `church@onehopeaz.com`.
4. From `submitVisitPlan` server-side, POST internally to `/lovable/email/transactional/send` with `templateName: "visit-confirmation"`, `recipientEmail`, `templateData: { name, plannedDate }`, and `idempotencyKey` = inserted row id. (Single recipient, event-triggered → fits app-email rules.)
5. Also send an internal alert email to `church@onehopeaz.com` ("Heads up — guest planning to visit") so the welcome team sees it in real time.

### Form UX upgrades (best-practice fields, still short)
Update `PlanYourVisit` (used on `/plan-a-visit` and reusable):
- Fields: name*, email*, phone, party size (select 1/2/3/4/5+), planned Sunday (date or "not sure"), how did you hear about us (select), anything we should know.
- Submit calls `useServerFn(submitVisitPlan)`. On success, keep current "We've got you" confirmation state and add "Check your inbox — confirmation just landed."
- Honeypot field + minimal client-side Zod validation to mirror server-side.

### Where the funnel ends
- "I'm planning to visit" CTAs across the site keep pointing to `/plan-a-visit` (already wired).
- `Contact` form stays for general inquiries — distinct intent. We'll add a copy line on `/contact` clarifying: "Planning your first visit? → Plan a Visit" so the two flows don't blur.

## 3. Out of scope (explicit)
- No ChMS integration (Planning Center / Breeze / Subsplash) — user chose "None yet". Schema is designed so adding a webhook/sync later is one server function away.
- No kids fields (user chose No).
- No SMS alerts (email only for now).
- No admin dashboard UI for viewing submissions in this pass — data is in the DB; viewable via Backend. Can add a `/admin/visits` page in a follow-up.

## Technical notes
- Hero refactor is pure presentation; no behavior change.
- `submitVisitPlan` uses `supabaseAdmin` (handler-local import) because the form is public/unauthenticated — no `requireSupabaseAuth` middleware.
- Email send happens after DB insert succeeds; email failure is logged but does not fail the user submission (they still get the on-screen confirmation).
- All new content/images sourced from existing `src/assets/onehope/*` assets — no new uploads needed.
- Adds dependencies only if scaffold tools require them; otherwise zero new packages.

## File touch list
- new: `src/components/sections/PageHero.tsx`
- new: `src/lib/visit-plans.functions.ts`
- new: `src/lib/email-templates/visit-confirmation.tsx` (+ registry update)
- edit: `src/config/site.ts` (pageHeroes block)
- edit: `src/routes/plan-a-visit.tsx`, `about.tsx`, `leadership.tsx`, `give.tsx`, `contact.tsx` (swap hero + og:image)
- edit: `src/components/sections/PlanYourVisit.tsx` (real submit + new fields)
- migration: create `visit_plans` (+ roles scaffolding if not already present)
