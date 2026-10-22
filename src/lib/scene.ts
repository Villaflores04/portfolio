/**
 * Deterministic generators for the parallax landscape.
 * Everything is seeded, so server and client always agree and builds are reproducible.
 */

export const VIEW_W = 1440;
export const VIEW_H = 600;

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** Sharp alpine ridge: alternating peaks and saddles. `base` and `amp` are fractions of VIEW_H. */
export function peaks(seed: number, base: number, amp: number, count: number): string {
  const r = rng(seed);
  const pts: [number, number][] = [[-40, VIEW_H * (base + 0.05)]];
  const step = (VIEW_W + 80) / count;
  let x = -40;
  for (let i = 0; i < count; i++) {
    x += step * (0.7 + r() * 0.6);
    const peak = i % 2 === 0;
    const h = peak ? 0.45 + r() * 0.55 : r() * 0.3;
    pts.push([x, VIEW_H * (base - amp * h)]);
  }
  pts.push([VIEW_W + 60, VIEW_H * (base - amp * 0.2)]);
  const line = pts.map(([px, py]) => `L${f(px)},${f(py)}`).join("");
  return `M-40,${VIEW_H + 10}${line}L${VIEW_W + 60},${VIEW_H + 10}Z`;
}

/** Soft rolling hills built from layered sines. */
export function hills(seed: number, base: number, amp: number): string {
  const r = rng(seed);
  const p1 = r() * Math.PI * 2;
  const p2 = r() * Math.PI * 2;
  const p3 = r() * Math.PI * 2;
  const pts: string[] = [];
  for (let x = -40; x <= VIEW_W + 60; x += 12) {
    const t = x / VIEW_W;
    const v =
      0.55 * Math.sin(t * 5.2 + p1) + 0.3 * Math.sin(t * 11.3 + p2) + 0.15 * Math.sin(t * 23 + p3);
    pts.push(`L${x},${f(VIEW_H * (base - amp * (v * 0.5 + 0.5)))}`);
  }
  return `M-40,${VIEW_H + 10}${pts.join("")}L${VIEW_W + 60},${VIEW_H + 10}Z`;
}

/** Pine-tree silhouettes planted along a baseline. */
export function pines(seed: number, base: number, count: number, minH: number, maxH: number): string {
  const r = rng(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const cx = -20 + r() * (VIEW_W + 40);
    const h = minH + r() * (maxH - minH);
    const w = h * (0.32 + r() * 0.12);
    const y = VIEW_H * base + r() * 26;
    const tiers = 3;
    d += `M${f(cx)},${f(y - h)}`;
    for (let t = 1; t <= tiers; t++) {
      const ty = y - h + (h * t) / tiers;
      const tw = (w * t) / tiers;
      d += `L${f(cx + tw)},${f(ty)}L${f(cx + tw * 0.45)},${f(ty)}`;
    }
    d += `L${f(cx + w * 0.12)},${f(y + 8)}L${f(cx - w * 0.12)},${f(y + 8)}L${f(cx - w * 0.45)},${f(y - h / tiers)}`;
    for (let t = tiers - 1; t >= 1; t--) {
      const ty = y - h + (h * t) / tiers;
      const tw = (w * t) / tiers;
      d += `L${f(cx - tw * 0.45)},${f(ty)}L${f(cx - tw)},${f(ty)}`;
    }
    d += "Z";
  }
  return d;
}

/**
 * Stars as box-shadow lists. One tiny element paints dozens of dots, so the whole sky costs
 * three compositor layers instead of one element (and one animation) per star.
 * x uses vw and y uses svh so the field scales with the viewport without any JS.
 */
export function starShadows(seed: number, count: number, color: string, ySpan = 150): string {
  const r = rng(seed);
  return Array.from({ length: count }, () => `${f(r() * 100)}vw ${f(r() * ySpan)}svh 0 0 ${color}`).join(",");
}
