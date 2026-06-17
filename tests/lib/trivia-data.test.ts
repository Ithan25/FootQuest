import { describe, it, expect } from "vitest";
import { TRIVIA_QUESTIONS } from "@/lib/trivia-data";

describe("Trivia Data — TRIVIA_QUESTIONS", () => {
  it("contains a large question bank (100+)", () => {
    expect(TRIVIA_QUESTIONS.length).toBeGreaterThanOrEqual(100);
  });

  it("each question has exactly 4 answer choices", () => {
    for (const q of TRIVIA_QUESTIONS) {
      expect(q.reponses).toHaveLength(4);
    }
  });

  it("bonneReponse index is valid (0-3)", () => {
    for (const q of TRIVIA_QUESTIONS) {
      expect(q.bonneReponse).toBeGreaterThanOrEqual(0);
      expect(q.bonneReponse).toBeLessThanOrEqual(3);
    }
  });

  it("each question has valid difficulty", () => {
    const validDifficulties = ["facile", "moyen", "difficile"];
    for (const q of TRIVIA_QUESTIONS) {
      expect(validDifficulties).toContain(q.difficulte);
    }
  });

  it("each question has valid category", () => {
    const validCategories = ["histoire", "records", "finales", "buteurs", "pays_hotes"];
    for (const q of TRIVIA_QUESTIONS) {
      expect(validCategories).toContain(q.categorie);
    }
  });

  it("points scale by difficulty (facile=10, moyen=20, difficile=30)", () => {
    const pointsByDifficulty: Record<string, number> = {
      facile: 10,
      moyen: 20,
      difficile: 30,
    };
    for (const q of TRIVIA_QUESTIONS) {
      expect(q.points).toBe(pointsByDifficulty[q.difficulte]);
    }
  });

  it("has questions of each difficulty level", () => {
    const facile = TRIVIA_QUESTIONS.filter((q) => q.difficulte === "facile");
    const moyen = TRIVIA_QUESTIONS.filter((q) => q.difficulte === "moyen");
    const difficile = TRIVIA_QUESTIONS.filter((q) => q.difficulte === "difficile");

    expect(facile.length).toBeGreaterThan(0);
    expect(moyen.length).toBeGreaterThan(0);
    expect(difficile.length).toBeGreaterThan(0);
  });

  it("has questions of each category", () => {
    const categories = new Set(TRIVIA_QUESTIONS.map((q) => q.categorie));
    expect(categories.has("histoire")).toBe(true);
    expect(categories.has("records")).toBe(true);
    expect(categories.has("finales")).toBe(true);
    expect(categories.has("buteurs")).toBe(true);
    expect(categories.has("pays_hotes")).toBe(true);
  });

  it("no question has empty text", () => {
    for (const q of TRIVIA_QUESTIONS) {
      expect(q.question.trim().length).toBeGreaterThan(0);
      for (const r of q.reponses) {
        expect(r.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("no duplicate questions", () => {
    const questions = TRIVIA_QUESTIONS.map((q) => q.question);
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });
});
