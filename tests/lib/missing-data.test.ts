import { describe, it, expect } from "vitest";
import {
  MISSING_PIECE_TEAMS,
  getAllPlayerNames,
  getRandomMissingPieceLevels,
} from "@/lib/missing-data";

describe("Missing Piece Data — MISSING_PIECE_TEAMS", () => {
  it("contains teams from base + expansions", () => {
    expect(MISSING_PIECE_TEAMS.length).toBeGreaterThanOrEqual(10);
  });

  it("each team has 11 players", () => {
    for (const team of MISSING_PIECE_TEAMS) {
      expect(team.joueurs).toHaveLength(11);
    }
  });

  it("each team has required properties", () => {
    for (const team of MISSING_PIECE_TEAMS) {
      expect(team.pays).toBeTruthy();
      expect(team.drapeau).toBeTruthy();
      expect(team.formation).toMatch(/^\d+-\d+-\d+/);
      expect(team.joueurManquantIndex).toBeGreaterThanOrEqual(0);
      expect(team.joueurManquantIndex).toBeLessThan(11);
    }
  });

  it("each player has valid position, name and jersey number", () => {
    for (const team of MISSING_PIECE_TEAMS) {
      for (const player of team.joueurs) {
        expect(player.nom).toBeTruthy();
        expect(["GK", "DEF", "MID", "FWD"]).toContain(player.poste);
        expect(player.numero).toBeGreaterThan(0);
        expect(player.posX).toBeGreaterThanOrEqual(0);
        expect(player.posX).toBeLessThanOrEqual(100);
        expect(player.posY).toBeGreaterThanOrEqual(0);
        expect(player.posY).toBeLessThanOrEqual(100);
      }
    }
  });

  it("each team has exactly one goalkeeper", () => {
    for (const team of MISSING_PIECE_TEAMS) {
      const gks = team.joueurs.filter((j) => j.poste === "GK");
      expect(gks).toHaveLength(1);
    }
  });
});

describe("getAllPlayerNames", () => {
  it("returns unique player names", () => {
    const names = getAllPlayerNames();
    expect(names.length).toBeGreaterThan(0);
    // Check unique
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it("includes well-known players", () => {
    const names = getAllPlayerNames();
    expect(names).toContain("Mbappé");
    expect(names).toContain("Messi");
    expect(names).toContain("Ronaldo");
  });
});

describe("getRandomMissingPieceLevels", () => {
  it("returns the requested number of levels", () => {
    const levels = getRandomMissingPieceLevels(5);
    expect(levels).toHaveLength(5);
  });

  it("each level has a joueurManquantIndex within bounds", () => {
    const levels = getRandomMissingPieceLevels(5);
    for (const level of levels) {
      expect(level.joueurManquantIndex).toBeGreaterThanOrEqual(0);
      expect(level.joueurManquantIndex).toBeLessThan(level.joueurs.length);
    }
  });

  it("adds a difficulty field to returned teams", () => {
    const levels = getRandomMissingPieceLevels(5);
    for (const level of levels) {
      expect(["facile", "moyen", "difficile"]).toContain(level.difficulty);
    }
  });

  it("filters by difficulty when specified", () => {
    const easy = getRandomMissingPieceLevels(3, "facile");
    expect(easy).toHaveLength(3);
    for (const level of easy) {
      expect(level.joueurs).toHaveLength(11);
    }
  });
});
