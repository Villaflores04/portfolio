"use client";

import { Loader2, Send } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { FACES, NAME_MAX, NOTE_MAX, type FaceId, type FeedbackSummary } from "@/lib/feedback";

type Status = "idle" | "loading" | "sending" | "sent" | "error";

export function FeedbackDemo() {
  const noteId = useId();
  const nameId = useId();
  const [face, setFace] = useState<FaceId | null>(null);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [summary, setSummary] = useState<FeedbackSummary | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/feedback", { cache: "no-store" });
      if (!res.ok) throw new Error();
      setSummary((await res.json()) as FeedbackSummary);
      setStatus((s) => (s === "loading" ? "idle" : s));
    } catch {
      setStatus((s) => (s === "loading" ? "error" : s));
      setMessage("Live results are unavailable right now.");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!face) {
      setStatus("error");
      setMessage("Pick a face first.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ face, note, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Something went wrong.");
      setSummary(data as FeedbackSummary);
      setStatus("sent");
      setMessage("Thank you! Your feedback was saved.");
      setFace(null);
      setNote("");
      setName("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const total = summary?.total ?? 0;

  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-5 p-6 sm:p-8" noValidate>
          <div>
            <h3 className="text-xl font-semibold">Try it: how does this portfolio feel?</h3>
            <p className="mt-1.5 text-sm text-muted">
              A live slice of the DAET Pulse idea — one tap, an optional note, results update instantly.
            </p>
          </div>

          <fieldset>
            <legend className="sr-only">Choose a face</legend>
            <div role="radiogroup" aria-label="Choose a face" className="grid grid-cols-4 gap-2 sm:gap-3">
              {FACES.map((f) => {
                const active = face === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setFace(f.id)}
                    className={`flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-3 transition ${
                      active
                        ? "border-accent bg-accent/10 shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
                        : "border-line bg-surface-2 hover:border-accent/60"
                    }`}
                  >
                    <span className={`text-3xl sm:text-4xl ${active ? "pop" : ""}`} aria-hidden>
                      {f.glyph}
                    </span>
                    <span className="text-xs text-muted">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor={noteId} className="text-sm font-medium">
              Note <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id={noteId}
              value={note}
              maxLength={NOTE_MAX}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="What stood out?"
              className="mt-1.5 w-full resize-none rounded-xl border border-line bg-surface-2 px-4 py-3 text-base outline-none transition focus:border-accent"
            />
            <p className="mt-1 text-right text-xs text-muted">
              {note.length}/{NOTE_MAX}
            </p>
          </div>

          <div>
            <label htmlFor={nameId} className="text-sm font-medium">
              Name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={nameId}
              value={name}
              maxLength={NAME_MAX}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anonymous"
              autoComplete="given-name"
              className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-base outline-none transition focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
            {status === "sending" ? "Sending…" : "Send feedback"}
          </button>

          <p
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`min-h-5 text-sm ${status === "error" ? "text-red-500" : "text-emerald-500"}`}
          >
            {message}
          </p>
        </form>

        <div className="border-t border-line bg-surface-2/50 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="flex items-baseline justify-between">
            <h4 className="font-medium">Live results</h4>
            <span className="font-mono text-xs text-muted">
              {status === "loading" ? "loading…" : `${total} ${total === 1 ? "vote" : "votes"}`}
            </span>
          </div>

          <ul className="mt-5 space-y-3">
            {FACES.map((f) => {
              const count = summary?.counts[f.id] ?? 0;
              const pct = total ? Math.round((count / total) * 100) : 0;
              return (
                <li key={f.id} className="flex items-center gap-3">
                  <span className="w-8 text-2xl" aria-hidden>
                    {f.glyph}
                  </span>
                  <div className="flex-1">
                    <div
                      className="h-2.5 overflow-hidden rounded-full bg-line"
                      role="progressbar"
                      aria-label={`${f.label} share`}
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-16 text-right font-mono text-xs text-muted">
                    {count} · {pct}%
                  </span>
                </li>
              );
            })}
          </ul>

          <h4 className="mt-8 font-medium">Recent notes</h4>
          {summary && summary.recent.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {summary.recent.map((r) => (
                <li key={r.id} className="rounded-xl border border-line bg-surface p-3.5 text-sm">
                  <p className="break-words">{r.note}</p>
                  <p className="mt-1.5 text-xs text-muted">
                    {FACES.find((f) => f.id === r.face)?.glyph} {r.name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">No notes yet — be the first.</p>
          )}

          {summary?.storage === "memory" && (
            <p className="mt-6 text-xs text-muted">
              Demo store: results are kept in server memory and may reset. Connect Supabase for permanent storage.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
