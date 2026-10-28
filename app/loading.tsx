export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center pt-28" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className="size-8 animate-spin rounded-full border-2 border-ink/15 border-t-ember" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          Loading
        </span>
      </div>
    </div>
  );
}
