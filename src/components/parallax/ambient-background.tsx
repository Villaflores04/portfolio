/**
 * Page-wide depth: three soft colour fields fixed behind every section, each drifting at its own rate as
 * you scroll. Pure CSS (compositor-driven scroll animation, see globals.css), so it costs no JavaScript.
 */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="ambient ambient-a left-[-12%] top-[18%] h-[46vmax] w-[46vmax]" />
      <div className="ambient ambient-b right-[-14%] top-[48%] h-[40vmax] w-[40vmax]" />
      <div className="ambient ambient-c left-[18%] top-[88%] h-[34vmax] w-[34vmax]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
