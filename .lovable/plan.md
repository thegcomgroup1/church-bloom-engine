## Plan: New Location + Announcement Bar

Great news from the client! Here's what I'll update:

### 1. Update location everywhere — `src/config/site.ts`
Swap Miller Elementary → Lawrence Primary School (4850 W Jeffrey Rd, Tucson, AZ 85746).
- `service.address`
- `service.mapEmbedUrl` and `service.mapLinkUrl` (new Google Maps query)
- `service.practical[0]` ("Where" line) — update copy to reference Lawrence Primary
- `events[0]` ("Join Us at Miller Elementary") → "Join Us at Lawrence Primary"
- Any other Miller mentions (e.g. in homepage SEO meta in `src/routes/index.tsx`)

### 2. New announcement bar — `src/components/sections/AnnouncementBar.tsx`
A slim, dismissible bar that sits ABOVE the sticky header announcing the new location. Mounted in `src/routes/index.tsx` before `<StickyHeader />`.

- Copy: **"We've moved! Join us Sundays at our new home — Lawrence Primary School."** with a "Get directions" link to the new map URL.
- Style: dark/primary background, white text, small icon (MapPin), close (X) button on the right.
- Dismiss state stored in `localStorage` so returning visitors don't keep seeing it.
- Mobile-friendly: text truncates / wraps; close button always visible.
- Pulled from `siteConfig.announcement` (new field) so the client can edit text/link in one place. Includes an `enabled` flag to hide it later without removing the component.

### 3. SEO meta
Update the home route description in `src/routes/index.tsx` so it says "Lawrence Primary School" instead of "Miller Elementary".

### Verify
- Address, map embed, directions link, "Where" card, and Events card all show Lawrence Primary.
- Announcement bar renders at the top, dismisses on click, stays dismissed on reload.
- Sticky header still sticks correctly underneath the bar on scroll.
