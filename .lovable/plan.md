## Goal
When users click the "Plan Your Visit" button in the sticky header, take them straight to the form (not the top of the page).

## Change
`src/components/PlanYourVisitButton.tsx` — update the `<Link>` so it navigates to `/plan-a-visit` and includes hash `#plan-your-visit` (the existing `id` on the form section). After navigation, the browser scrolls to the form. Native anchor scrolling handles this; the TanStack router `Link` supports a `hash` prop.

```tsx
<Link to="/plan-a-visit" hash="plan-your-visit" ...>
```

If the user is already on `/plan-a-visit`, the link will still scroll to the form anchor.

## Out of scope
No changes to the form, page content, or other CTAs (the homepage hero CTAs continue to land on the full Plan a Visit page so visitors see the context first).
