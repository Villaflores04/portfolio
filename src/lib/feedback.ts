export const FACES = [
  { id: "wow", glyph: "🤩", label: "Wow" },
  { id: "happy", glyph: "😊", label: "Happy" },
  { id: "medium", glyph: "😐", label: "Okay" },
  { id: "sad", glyph: "😢", label: "Sad" },
] as const;

export type FaceId = (typeof FACES)[number]["id"];

export type FeedbackEntry = {
  id: string;
  face: FaceId;
  note: string;
  name: string;
  createdAt: string;
};

export type FeedbackSummary = {
  total: number;
  counts: Record<FaceId, number>;
  recent: FeedbackEntry[];
  storage: "supabase" | "memory";
};

export const NOTE_MAX = 280;
export const NAME_MAX = 40;

const FACE_IDS = new Set<string>(FACES.map((f) => f.id));

export type ValidationResult =
  | { ok: true; value: { face: FaceId; note: string; name: string } }
  | { ok: false; error: string };

/** Strip control characters and collapse whitespace. */
export function clean(text: string): string {
  return text.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

export function validateFeedback(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const body = input as Record<string, unknown>;

  if (typeof body.face !== "string" || !FACE_IDS.has(body.face)) {
    return { ok: false, error: "Pick one of the four faces." };
  }
  const note = typeof body.note === "string" ? clean(body.note) : "";
  const name = typeof body.name === "string" ? clean(body.name) : "";

  if (note.length > NOTE_MAX) return { ok: false, error: `Note must be ${NOTE_MAX} characters or fewer.` };
  if (name.length > NAME_MAX) return { ok: false, error: `Name must be ${NAME_MAX} characters or fewer.` };

  return { ok: true, value: { face: body.face as FaceId, note, name: name || "Anonymous" } };
}

export function emptyCounts(): Record<FaceId, number> {
  return { wow: 0, happy: 0, medium: 0, sad: 0 };
}

export function summarize(entries: FeedbackEntry[], storage: FeedbackSummary["storage"]): FeedbackSummary {
  const counts = emptyCounts();
  for (const e of entries) counts[e.face] += 1;
  return {
    total: entries.length,
    counts,
    recent: entries.filter((e) => e.note).slice(0, 6),
    storage,
  };
}

/** Tiny fixed-window rate limiter (per instance). */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return function allow(key: string, now = Date.now()): boolean {
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      }
      return true;
    }
    if (entry.count >= limit) return false;
    entry.count += 1;
    return true;
  };
}
