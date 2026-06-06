## Plan: Replace logo & favicon with new uploaded artwork

Both uploaded images are identical (the new distressed orange "ONE HOPE" stamp logo with cactus). I'll use it everywhere the current logo appears.

### 1. Upload new logo as a CDN asset
- Run `lovable-assets create --file /mnt/user-uploads/196.png --filename one-hope-logo.png` and write the pointer to `src/assets/onehope/logo.png.asset.json` (overwriting the existing pointer so all current `siteConfig.brand.logoImageSrc` references update automatically — header, footer, anywhere the logo is shown).

### 2. Regenerate favicon files from the new logo
Using Python/Pillow, convert the new logo to:
- `public/favicon.ico` (16, 32, 48)
- `public/apple-touch-icon.png` (180×180)
- `public/icon-192.png` (192×192)
- `public/icon-512.png` (512×512)

Since the logo is mostly transparent around an orange stamp, I'll render it on a **white background** at small sizes so it stays legible as a browser tab icon (vs. invisible on light tab bars). Square-pad to avoid distortion.

### 3. Verify
- Confirm header logo updated in preview.
- Confirm favicon refreshes (hard reload).
- No code changes needed in `__root.tsx` or `StickyHeader.tsx` — they already point at the asset JSON / `/favicon.ico` paths.

### Notes
- Both uploads are the same file, so I'll just use one.
- Old logo asset can stay on CDN (harmless); not deleting to avoid breaking any historical preview.
