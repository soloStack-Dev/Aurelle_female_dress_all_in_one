export default function BrandMark({
  className = "size-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6.5c3-3 6 3 9 0s5-1 7 0" />
      <path d="M4 12c3-3 6 3 9 0s5-1 7 0" />
      <path d="M4 17.5c3-3 6 3 9 0s5-1 7 0" />
    </svg>
  );
}
