## Plan: Wire One Hope YouTube Video

### What we're doing
Swap out the gray placeholder `[Sermon video embed]` box for a real, playable YouTube sermon video, and update the YouTube social link in the footer.

### Changes

1. **`src/config/site.ts`**
   - Update `sermon.embedUrl` → `https://www.youtube.com/embed/P_VkF72Wwiw`
   - Update `sermon.watchUrl` → `https://www.youtube.com/watch?v=P_VkF72Wwiw`
   - Update `contact.socials[0].url` (YouTube) → `https://www.youtube.com/@onehopeaz`
   - Clean up placeholder sermon title/series/date fields

2. **`src/components/sections/Sermons.tsx`**
   - Replace the static `[Sermon video embed]` placeholder div with a conditional `<iframe>`
   - If `sermon.embedUrl` is set → render the actual YouTube embed
   - If not set → keep the existing placeholder (fallback)

### Verify
- Sermons section shows the real video player (not a gray box)
- "Watch the latest" button links to the actual YouTube video
- Footer YouTube link points to `@onehopeaz` channel