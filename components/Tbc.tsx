/** Visible marker for copy that still needs a decision from the team. */
export default function Tbc({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline rounded-md bg-blue px-1.5 py-0.5 font-mono text-[0.8em] font-medium text-on-blue">
      [TBC: {children}]
    </span>
  );
}
