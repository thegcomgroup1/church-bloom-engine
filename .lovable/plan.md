## Apply the two small fixes, then run the live tests

### Code changes (I'll make these)

1. **`src/start.ts`** — add a `/lovable/*` bypass at the top of the request middleware so the email queue cron (`/lovable/email/queue/process`) can't be caught by app-level redirects/auth. One-line guard returning `next()` early when `pathname.startsWith("/lovable/")`.

2. **`src/routes/__root.tsx`** — extend the Organization JSON-LD `sameAs` array to include all four real social URLs (Facebook, Instagram, YouTube, LinkedIn) instead of just YouTube. Pulls from `siteConfig.contact.socials` so it stays in sync with the footer.

No other files touched. No DB / migration changes.

### How to run the three live tests (after publish)

These are manual checks on the published site — they can't be automated from here:

1. **Social links resolve** — on `https://onehopeaz.com`, click each of the four footer icons (FB, IG, YouTube, LinkedIn). Each should open the correct One Hope profile, not 404.

2. **Plan-a-Visit form end-to-end**
   - Go to the published Plan-a-Visit page, fill it out with a real address you control (e.g. your own gmail), submit.
   - Confirm in Cloud → Database that a new row landed in the visits table.
   - Check the visitor inbox for the confirmation email (From: `notify.onehopeaz.com`, reply-to set to whatever the staff address is).
   - Check `church@onehopeaz.com` for the staff notification, and confirm the reply-to on that one is the **visitor's** email so Timbo can reply directly.
   - If anything is missing, check Cloud → Emails → logs for the matching `email_send_log` row (`sent` / `pending` / `dlq` / `suppressed`).

3. **`church@onehopeaz.com` inbox check** — confirm with Timbo:
   - The mailbox exists and he actually monitors it.
   - He whitelists / marks-not-spam the first notification from `notify.onehopeaz.com` so future ones land in inbox.

### Order of operations

1. I apply the two code fixes.
2. You click **Publish** to push them live (frontend changes need a publish to take effect).
3. You run the three checks above.
4. If all three pass → One Hope is done, you can send Timbo the "ready early" note.
