export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
        <defs>
          <radialGradient id="ondra-g" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="var(--glow)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#ondra-g)" opacity="0.18" />
        <circle cx="12" cy="12" r="5.5" fill="url(#ondra-g)" />
      </svg>
      <span className="font-serif text-xl tracking-tight">Ondra</span>
    </span>
  );
}
