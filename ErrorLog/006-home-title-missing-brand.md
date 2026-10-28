# 006 — Home page title lost the AURELLE brand

**When:** production smoke test of `/` after the metadata refactor.

## Error

The rendered document title was:

```
<title>Own your summer.</title>
```

instead of the intended `AURELLE — Own your summer.`, while every inner page
correctly received the root template suffix.

## Why it happened

`app/layout.tsx` defines a root metadata title template (`%s — AURELLE`). Next.js
applies a segment's title template to child route segments, not to metadata
defined in the same segment. `app/page.tsx` lives in the same segment as
`app/layout.tsx`, so its `title: site.tagline` was emitted verbatim. The earlier
comment in `app/page.tsx` assumed the template would apply, which was wrong.

## Thought process

- Removing the root template would fix the home page but lose the brand suffix
  on every inner page.
- Adding a nested layout just to host the home page would add structure for a
  single string.
- The page already owns its metadata through `createMetadata`, so the simplest
  correct fix is to include the brand in the home title explicitly and document
  why the template does not apply here.

## Fix

Changed the home metadata title to `` `${site.name} — ${site.tagline}` `` and
updated the comment in `app/page.tsx` to explain the same-segment template
behaviour.

## Verification

- `bun run build` and `bun run lint` pass.
- Production smoke test now finds `<title>AURELLE — Own your summer.</title>`
  and no duplicated brand suffix.
