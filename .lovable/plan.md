## Goal
Swap in the real One Hope logo, real congregation photos from onehopeaz.com, and shift the palette to their orange (#ff6d01).

## 1. Logo
Upload the attached One Hope logo as a Lovable Asset, then render it in the sticky header (replacing the `logoText` word-mark) and in the footer.
- `lovable-assets create --file /mnt/user-uploads/image.png --filename one-hope-logo.png > src/assets/one-hope-logo.png.asset.json`
- `src/components/sections/StickyHeader.tsx`: replace the `<span>{logoText}</span>` with an `<img>` using the asset URL (~h-10), keep alt = church name.
- `src/components/sections/Footer.tsx`: add the logo above the church name line.

## 2. Real photos from onehopeaz.com
Use the 8 photo URLs pulled from their live homepage slideshow + "Who we are" image. Pipe them through Lovable Assets so they're CDN-served from our project (avoids hot-linking + CORS).

Source URLs:
- Hero/life pool: `IMG_4336-scaled.jpg`, `IMG_0278-scaled.jpg`, `15456.jpg`, `IMG_0076-scaled.jpg`, `IMG_0124-scaled.jpg`, `15612.jpeg`, `11213.jpg` (all under `https://onehopeaz.com/wp-content/uploads/2025/07/`)
- Story image: `16366.jpg` (same path)

For each: `curl -o /tmp/x.jpg <url>` → `lovable-assets create --file /tmp/x.jpg --filename <name>.jpg > src/assets/onehope/<name>.jpg.asset.json`.

Then in `src/config/site.ts`:
- `brand.heroMedia.imageSrc` → the strongest wide congregation shot (IMG_4336)
- `brand.storyImageSrc` → 16366.jpg (the multicultural family shot featured on their "Who we are")
- `life[]` (6 entries) → the remaining 6 photos with descriptive alt text

Update imports in `site.ts` from the asset JSON pointers; remove the placeholder imports.

## 3. Orange palette (#ff6d01)
In `src/styles.css`, replace the current blue `--primary` and `--ring` with the One Hope orange. Keep secondary (deep heading color) but warm it slightly so it harmonizes with orange.
- `--primary: oklch(0.68 0.19 45)` (≈ #ff6d01)
- `--primary-foreground: oklch(0.99 0 0)`
- `--ring: oklch(0.68 0.19 45)`
- `--secondary: oklch(0.28 0.04 50)` (warm near-black for headings)
- Dark-mode `--primary` lightened equivalent.

Background and surfaces stay on the existing warm cream — already on-brand with the logo's tan card.

## 4. Verify
Reload `/` and confirm: header shows logo image, hero shows real congregation photo with orange "Plan a Visit" button, Mission/Story section shows 16366 multicultural shot, Life grid shows the 6 remaining real photos, footer shows logo. Check the orange has enough contrast on the cream background.

## Out of scope (ask separately)
- Replacing copy (their site uses "Love God, Love People, Transform Tucson" / "Southwest Tucson" — I'll keep Timbo's restraint-edition copy unless you want me to pull theirs verbatim)
- Real YouTube channel / Tithely / social URLs
- Confirming Miller Elementary is still the Sunday spot post-move