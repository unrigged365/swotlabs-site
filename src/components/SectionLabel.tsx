/**
 * Consistent section kicker: an accent hairline + mono uppercase label.
 * Server component — no interactivity. Replaces 5 copy-pasted blocks.
 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="w-12 h-px bg-accent" />
      <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
        {children}
      </span>
    </div>
  );
}
