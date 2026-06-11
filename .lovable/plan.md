## Finish Plan a Visit end-to-end

1. **Scaffold transactional email infra** — creates `/lovable/email/transactional/send`, preview route, `/email/unsubscribe` validation route, suppression handler, template registry under `src/lib/email-templates/`, and the branded unsubscribe page path.

2. **Add `siteConfig.contact.notificationEmail = "church@onehopeaz.com"`** in `src/config/site.ts`.

3. **Build two React Email templates** in `src/lib/email-templates/`, registered in `registry.ts`:
   - `visit-confirmation.tsx` — to the guest. Warm, brand-matched: "We can't wait to meet you Sunday." Service time (10:30 AM), address (Lawrence Primary), parking note, what to wear, kids welcome, contact info, signed from the team.
   - `visit-staff-notification.tsx` — to staff. Plain and scannable: name, email, phone, party size, planned Sunday, how they heard, note, submitted timestamp. `reply-to` set to the guest's email so the pastor can reply from inbox.

4. **Wire `submitVisitPlan`** (`src/lib/visit-plans.functions.ts`): after the successful insert, enqueue both sends through the internal send path using the row id as `idempotencyKey`. Email failures are caught and logged — they never fail the submission, so the visitor still sees the success state.

5. **Build the branded unsubscribe page** at the path the scaffolder reports, styled to match the site.

6. **Out of scope** — no admin dashboard, no SMS, no drip, no ChMS sync.

## Technical notes
- Server-only: `submitVisitPlan` is already a `createServerFn`. Both sends happen inside its handler after insert, using the service-role internal-send path (form is anonymous, so the public send route's JWT requirement is preserved).
- Templates use existing brand tokens inline per React Email rules; `Body` background stays `#ffffff`.
- Domain `notify.onehopeaz.com` is already set up. If DNS is still verifying when this ships, sends queue and start delivering the moment it goes active — no redeploy needed.
- Staff recipient lives in one place (`siteConfig.contact.notificationEmail`) so it's trivial to change later.
