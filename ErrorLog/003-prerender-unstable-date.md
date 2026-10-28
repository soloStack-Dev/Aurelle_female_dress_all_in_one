# 003 — Cache Components rejected `new Date()` during prerender

**When:** `bun run build`, while generating static pages (the footer is shared by
`/_not-found`, so it failed there first).

## Error

```
Error: Route "/_not-found": Next.js encountered the unstable value `new Date()`
while prerendering.
    at SiteFooter (components/layout/SiteFooter.tsx:110:16)
```

## Why it happened

`next.config.ts` enables `cacheComponents`. In that mode Next.js refuses to
prerender output that can change between renders. `new Date().getFullYear()` in
the footer's copyright line is exactly that kind of value: the build cannot
prove the HTML will be the same on every render, so it errors instead of
silently producing stale markup.

## Thought process

- Hard-coding the year would remove the error but would rot the site every
  January.
- Moving the year to a client component would work, but it would add a client
  boundary and a hydration edge case around New Year for a single number.
- The framework's own guidance offers a `"use cache"` escape hatch for values
  that are stable for a known period. The copyright year is stable for a year,
  so caching it is the semantically correct fix.

## Fix

Added an async `copyrightYear()` helper in `components/layout/SiteFooter.tsx`
with the `"use cache"` directive, made the footer an async Server Component and
awaited the value. The date now resolves once inside the cache instead of
during the unstable prerender pass.

## Verification

- Re-ran `bun run build`; the `/_not-found` prerender completed and the build
  continued to route generation.
