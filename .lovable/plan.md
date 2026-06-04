## Goal
Replace `src/config/site.ts` with the One Hope Church (Tucson, AZ) configuration from the uploaded `OneHope_site.ts`, preserving all field shapes consumed by existing components.

## Changes

**1. Overwrite `src/config/site.ts`** with uploaded content, with one addition:
- Add `logoText: "One Hope"` to the `brand` block. The uploaded file omits it, but `StickyHeader.tsx` reads `siteConfig.brand.logoText`. Without it the header logo would be undefined.

All other fields (church, service, expect, life, ministries, events, sermon, give, welcomeVideo, contact) drop in as-is — shape matches the current config exactly.

**2. Update `src/routes/index.tsx`** `<title>` and meta description to reflect One Hope Church, Tucson AZ (currently set to the previous church). Keep route structure unchanged.

## Not in scope (deferred until user confirms / provides assets)
- Replacing the 8 placeholder images in `src/assets/placeholders/` with real One Hope photos (especially the multicultural family shots — the signature visual)
- Brand color tweaks in `src/styles.css` (current warm palette is acceptable; can iterate after preview)
- Filling in the three real URLs Timbo still owes: YouTube channel link, Tithely giving link, social handles
- Filling in latest sermon title/series/date
- Confirming Miller Elementary is still the correct Sunday location post-move

## Verification
After the edit, load `/` in preview and confirm:
- Header logo reads "One Hope"
- Hero shows One Hope tagline + "Plan a Visit" CTA
- Service block shows 10:30 AM at Miller Elementary with the Google Maps embed of that address
- "What to expect" shows the 4 ramp items with Heart/BookOpen/Users/Clock icons (verify `BookOpen` and `Users` are wired in the icon map; if not, add them)
- Ministries section shows the 4 restraint-edition items
- Welcome video section stays hidden (`enabled: false`)

## Technical note
Need to check the icon-name mapping in the Expect section. The base config used `Heart/Clock/Shirt/Baby`; the One Hope config introduces `BookOpen` and `Users`. If the Expect component has a hardcoded icon map, those two icons must be added there before the new config will render. Will verify and patch in the same edit batch.
