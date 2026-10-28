# 004 — `runtime` route config is incompatible with Cache Components

**When:** `bun run build` after adding the error-logging API route.

## Error

```
./app/api/log-error/route.ts:4:14
Error: Route segment config "runtime" is not compatible with
`nextConfig.cacheComponents`. Please remove it.
```

## Why it happened

The route writes to `ErrorLog/runtime-errors.log` with `node:fs`, so
`export const runtime = "nodejs"` looked like the explicit, safe choice. But
`cacheComponents: true` is enabled in `next.config.ts`, and that mode rejects
route segment config because it manages caching and execution boundaries
itself. The Node.js runtime is already the default for Route Handlers here, so
the export was both redundant and illegal.

## Thought process

- Removing Cache Components would undo the intended Next 16 architecture just
  to keep one config line.
- Rewriting the route to run on the Edge runtime would break `node:fs`
  entirely.
- The correct fix is the smallest one: drop the redundant segment export and
  rely on the framework default. The route still runs on Node and can write the
  log file.

## Fix

Removed `export const runtime = "nodejs";` from
`app/api/log-error/route.ts`. The `node:fs/promises` import remains, which
keeps the route on the Node runtime without segment config.

## Verification

- Re-ran `bun run build`; the route compiled and the build continued to static
  page generation.
