/**
 * Oversized outlined numeral behind a section heading. It drifts as its section crosses the viewport
 * using a CSS view timeline (see .ghost-word in globals.css): no JavaScript, no scroll listeners.
 */
export function ParallaxWord({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="ghost-word pointer-events-none absolute right-0 top-8 select-none sm:top-4">
      {children}
    </span>
  );
}
