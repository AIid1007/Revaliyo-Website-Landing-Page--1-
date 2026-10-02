export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden>
        <circle cx="32" cy="32" r="32" fill="var(--lime)" />
        <path
          d="M21 47V17h13a9.5 9.5 0 0 1 3 18.5L45 47h-7l-7-10h-3v10z M28 31h6a4 4 0 0 0 0-8h-6z"
          fill="var(--on-lime)"
          fillRule="evenodd"
        />
      </svg>
      <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.04em]">
        Revaliyo
      </span>
    </span>
  );
}
