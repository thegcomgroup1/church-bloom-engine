## Goal
Close the Plan a Visit loop end-to-end: visitor submits → DB → instant warm auto-reply to visitor → instant notification to staff (`church@onehopeaz.com`). Emails sent from `onehopeaz.com` via Lovable Emails.

## Steps

**1. Set up sender domain (`onehopeaz.com`)**
Open the email setup dialog so a delegated subdomain (e.g. `notify.onehopeaz.com`) can be provisioned. Scaffolding and code can proceed before DNS verifies; sends activate the moment DNS is in.

**2. Provision shared email infrastructure**
Creates the pgmq queues, RPC wrappers, send log, suppression list, unsubscribe tokens, and the cron-driven queue processor used by all app emails.

**3. Scaffold app email infra**
Generates the send/preview/suppression/unsubscribe routes and template registry under `src/lib/email-templates/`.

**4. Add two branded React Email templates**
- `visit-confirmation.tsx` — to the guest. Warm, short, brand-matched: "We can't wait to meet you Sunday." Includes service time (10:30 AM), address (Lawrence Primary), parking note, what to wear, kids welcome, contact info, signed from the team.
- `visit-staff-notification.tsx` — to staff. Plain, scannable: name, email, phone, party size, planned Sunday, how they heard, note, submitted timestamp. `reply-to` set to the guest's email so the pastor can reply directly from their inbox.

**5. Wire `submitVisitPlan` to fire both emails**
After the successful `visit_plans` insert, enqueue both sends via the internal send path using the row id as the `idempotencyKey` (so retries never double-send). Email failures are logged but do NOT fail the submission — the row is already saved and the visitor still sees the success state.

**6. Parameterize staff recipient**
Add `siteConfig.contact.notificationEmail = "church@onehopeaz.com"` and read from it in the server function. One place to change later.

**7. Out of scope**
No ChMS sync, no SMS, no kids fields, no admin dashboard, no follow-up drip — Timbo greets them Sunday; that's the human half of the loop.

## Technical notes
- Server-only: `submitVisitPlan` already runs as `createServerFn`; the send call happens inside its handler after the insert succeeds. Visitor never waits on the email round-trip beyond the existing submit.
- Auth on send route: the internal `/lovable/email/transactional/send` route requires a Supabase JWT. Because this form is anonymous (no login), the server function will call the send helper using the service-role path the scaffolder provides for server-internal triggers — no public auth removed.
- Templates use existing brand tokens from `src/styles.css` (inline-styled per React Email rules); `Body` background stays `#ffffff`.
- DNS: I'll tell you which 2 NS records to add at your registrar after the setup dialog runs. Sends activate automatically on verification; nothing to redeploy.
