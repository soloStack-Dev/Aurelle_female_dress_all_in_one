# 005 — `react-hooks/set-state-in-effect` in the contact form

**When:** `bun run lint` after refactoring the contact form to read `?plan=`
without `useSearchParams`.

## Error

```
components/contact/ContactForm.tsx
  32:5  error  Calling setState synchronously within an effect can trigger cascading renders
  react-hooks/set-state-in-effect
```

## Why it happened

The form used `useSearchParams()` to prefill the membership topic and message.
That forced the page to wrap the form in a Suspense boundary, so the static HTML
only contained a skeleton instead of the real form. To restore server-rendered
form markup, I removed `useSearchParams` and copied the `?plan=` value into state
inside a mount effect. The runtime result was correct, but React's lint rules
reject synchronous `setState` in an effect because it causes an extra render
pass and can cascade.

## Thought process

- Keeping `useSearchParams` and a skeleton fallback would keep the form out of
  the initial HTML, which hurts both no-JS users and SEO.
- Initialising state with a `window` read (`useState(() => window...)`) would
  cause a server/client hydration mismatch.
- Suppressing the lint rule would hide a real design smell rather than fix it.
- The correct model: the URL is an external store. Read it with
  `useSyncExternalStore` (server snapshot `null`, client snapshot the plan), then
  key the field component by that value so its state initialises once from a
  prop. No effect, no setState cascade, and the server still renders the form.

## Fix

`ContactForm` now exposes an outer component that reads `?plan=` through
`useSyncExternalStore` and renders `ContactFormFields` with
`key={plan ?? "default"}`. The fields initialise `topic` and `message` from the
`plan` prop. Removed the effect, the `ContactFormSkeleton` export and the
`Suspense` boundary from `app/contact/page.tsx`.

## Verification

- `bun run lint` and `bunx tsc --noEmit` pass.
- `bun run build` still prerenders `/contact` as static.
- Headless DOM check of `/contact?plan=Premium` shows the topic set to
  `Membership` and the message prefilled.
