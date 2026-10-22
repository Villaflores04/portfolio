import { describe, expect, it } from "vitest";
import { hills, peaks, pines, starShadows } from "../src/lib/scene";
import { education, headlineSkills, profile, project, skills } from "../src/data/profile";

describe("scene generators", () => {
  it("are deterministic, so server and client render identical SVG", () => {
    expect(peaks(11, 0.5, 0.42, 9)).toBe(peaks(11, 0.5, 0.42, 9));
    expect(hills(5, 0.78, 0.2)).toBe(hills(5, 0.78, 0.2));
    expect(pines(31, 0.8, 34, 34, 78)).toBe(pines(31, 0.8, 34, 34, 78));
    expect(starShadows(7, 20, "#fff")).toBe(starShadows(7, 20, "#fff"));
  });

  it("differ between seeds", () => {
    expect(peaks(1, 0.5, 0.4, 9)).not.toBe(peaks(2, 0.5, 0.4, 9));
  });

  it("produce closed SVG paths with finite numbers", () => {
    for (const d of [peaks(11, 0.5, 0.42, 9), hills(5, 0.78, 0.2), pines(31, 0.8, 34, 34, 78)]) {
      expect(d.startsWith("M")).toBe(true);
      expect(d.endsWith("Z")).toBe(true);
      expect(d).not.toMatch(/NaN|Infinity|undefined/);
    }
  });

  it("emits one box-shadow entry per star, inside the viewport horizontally", () => {
    const shadows = starShadows(7, 25, "red").split(",");
    expect(shadows).toHaveLength(25);
    for (const s of shadows) {
      const x = parseFloat(s);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(s.endsWith("red")).toBe(true);
    }
  });
});

describe("profile data", () => {
  it("has a valid contact email and GitHub link", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(profile.github).toBe("https://github.com/Villaflores04");
  });

  it("lists the nine headline skills", () => {
    expect(headlineSkills).toHaveLength(9);
    for (const s of ["Next.js", "React", "TailwindCSS", "Node.js", "TypeScript"]) expect(headlineSkills).toContain(s);
  });

  it("orders education newest first with exactly one current entry", () => {
    expect(education.filter((e) => e.current)).toHaveLength(1);
    expect(education[0].current).toBe(true);
  });

  it("describes the featured project with a source link and API list", () => {
    expect(project.github).toBe("https://github.com/Villaflores04/daet_feedback");
    expect(project.api.length).toBeGreaterThan(0);
    expect(skills.length).toBeGreaterThan(0);
  });
});
