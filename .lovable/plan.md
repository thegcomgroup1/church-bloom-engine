## Updates from the Facebook "Contact info" screenshot

Phone and email already match (`(520) 940-8464`, `church@onehopeaz.com`). The only gaps are the placeholder `#` Facebook/Instagram links and a missing LinkedIn entry.

### Change `src/config/site.ts` — `contact.socials`

Replace the current array with real URLs and add LinkedIn:

- Facebook → `https://www.facebook.com/onehopeaz`
- Instagram → `https://www.instagram.com/onehopeaz`
- YouTube → `https://www.youtube.com/@onehopeaz` (unchanged)
- LinkedIn → `https://www.linkedin.com/company/one-hope-az/` (new)

### Propagation

`contact.socials` already feeds the Footer and Contact page automatically, so no component edits are needed. I'll spot-check `Footer.tsx` to confirm it renders any label generically (LinkedIn icon may need a small mapping addition); if it uses a hard-coded icon map, I'll add a LinkedIn icon from `lucide-react`.

No other files touched.
