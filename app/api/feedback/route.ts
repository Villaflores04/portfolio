import { NextResponse } from "next/server";
import {
  createRateLimiter,
  summarize,
  validateFeedback,
  type FaceId,
  type FeedbackEntry,
} from "@/lib/feedback";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useSupabase = Boolean(SUPABASE_URL && SERVICE_KEY);

// Fallback store for local dev / previews. Resets when the server restarts.
const g = globalThis as unknown as { __feedbackMemory?: FeedbackEntry[] };
const memory = (g.__feedbackMemory ??= []);

const allow = createRateLimiter(5, 60_000);

function headers() {
  return {
    apikey: SERVICE_KEY as string,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
}

type Row = { id: string; face: FaceId; note: string; name: string; created_at: string };

const toEntry = (r: Row): FeedbackEntry => ({
  id: r.id,
  face: r.face,
  note: r.note,
  name: r.name,
  createdAt: r.created_at,
});

async function load(): Promise<{ entries: FeedbackEntry[]; storage: "supabase" | "memory" }> {
  if (!useSupabase) return { entries: memory, storage: "memory" };
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/portfolio_feedback?select=id,face,note,name,created_at&order=created_at.desc&limit=500`,
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) throw new Error(`Supabase read failed (${res.status})`);
  const rows = (await res.json()) as Row[];
  return { entries: rows.map(toEntry), storage: "supabase" };
}

export async function GET() {
  try {
    const { entries, storage } = await load();
    return NextResponse.json(summarize(entries, storage));
  } catch {
    return NextResponse.json({ error: "Feedback is temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return NextResponse.json({ error: "Too many submissions. Try again in a minute." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validateFeedback(json);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  const entry: FeedbackEntry = {
    id: crypto.randomUUID(),
    ...result.value,
    createdAt: new Date().toISOString(),
  };

  try {
    if (useSupabase) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio_feedback`, {
        method: "POST",
        headers: { ...headers(), Prefer: "return=minimal" },
        body: JSON.stringify({
          id: entry.id,
          face: entry.face,
          note: entry.note,
          name: entry.name,
          created_at: entry.createdAt,
        }),
      });
      if (!res.ok) throw new Error(`Supabase write failed (${res.status})`);
    } else {
      memory.unshift(entry);
      memory.length = Math.min(memory.length, 200);
    }
    const { entries, storage } = await load();
    return NextResponse.json(summarize(entries, storage), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save your feedback. Please try again." }, { status: 503 });
  }
}
