## Plan: Wire Tithely Giving Link

### What we're doing
Update the site configuration so the "Give online" button in the Give section links to One Hope's actual Tithely form instead of a placeholder.

### Changes

1. **`src/config/site.ts`**
   - Update `give.onlineUrl` → `https://give.tithe.ly/?formId=8aed056e-6865-11ee-90fc-1260ab546d11`

### Verify
- The "Give online" button in the Give section opens the Tithely form in a new tab.

### Notes
- There is only one Give CTA on the site (in the dedicated Give section). No other buttons or links reference the giving URL.