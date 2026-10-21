import { describe, expect, it } from "vitest";
import { createRateLimiter, summarize, validateFeedback } from "../src/lib/feedback";

describe("validateFeedback", () => {
  it("accepts a valid face and defaults the name", () => {
    const r = validateFeedback({ face: "wow", note: "  Great   site  " });
    expect(r).toEqual({ ok: true, value: { face: "wow", note: "Great site", name: "Anonymous" } });
  });

  it("rejects unknown faces and non-objects", () => {
    expect(validateFeedback({ face: "angry" }).ok).toBe(false);
    expect(validateFeedback(null).ok).toBe(false);
    expect(validateFeedback("wow").ok).toBe(false);
  });

  it("rejects over-long notes and names", () => {
    expect(validateFeedback({ face: "sad", note: "x".repeat(281) }).ok).toBe(false);
    expect(validateFeedback({ face: "sad", name: "n".repeat(41) }).ok).toBe(false);
  });

  it("strips control characters", () => {
    const r = validateFeedback({ face: "happy", note: "a\u0000b\nc" });
    expect(r.ok && r.value.note).toBe("a b c");
  });
});

describe("summarize", () => {
  it("counts faces and keeps only entries with notes as recent", () => {
    const base = { name: "A", createdAt: "2026-01-01T00:00:00Z" };
    const s = summarize(
      [
        { id: "1", face: "wow", note: "hi", ...base },
        { id: "2", face: "wow", note: "", ...base },
        { id: "3", face: "sad", note: "", ...base },
      ],
      "memory",
    );
    expect(s.total).toBe(3);
    expect(s.counts).toEqual({ wow: 2, happy: 0, medium: 0, sad: 1 });
    expect(s.recent).toHaveLength(1);
  });
});

describe("createRateLimiter", () => {
  it("blocks after the limit and resets after the window", () => {
    const allow = createRateLimiter(2, 1000);
    expect(allow("ip", 0)).toBe(true);
    expect(allow("ip", 1)).toBe(true);
    expect(allow("ip", 2)).toBe(false);
    expect(allow("ip", 1001)).toBe(true);
  });
});
