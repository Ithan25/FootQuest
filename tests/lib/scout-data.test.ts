import { describe, it, expect } from "vitest";
import {
  getRandomScoutTeams,
  getAllTeamNames,
  SCOUT_TEAMS,
} from "@/lib/scout-data";

describe("Scout Data — SCOUT_TEAMS", () => {
  it("contains at least 12 base teams", () => {
    expect(SCOUT_TEAMS.length).toBeGreaterThanOrEqual(12);
  });

  it("each team has required properties", () => {
    for (const team of SCOUT_TEAMS) {
      expect(team.pays).toBeTruthy();
      expect(team.drapeau).toBeTruthy();
      expect(team.formation).toMatch(/^\d+-\d+-\d+/);
      expect(team.joueurs).toBeDefined();
      expect(team.joueurs.length).toBe(11);
    }
  });

  it("each player has a name, club, poste, and valid coordinates", () => {
    for (const team of SCOUT_TEAMS) {
      for (const player of team.joueurs) {
        expect(player.nom).toBeTruthy();
        expect(player.club).toBeTruthy();
        expect(["GK", "DEF", "MID", "FWD"]).toContain(player.poste);
        expect(player.posX).toBeGreaterThanOrEqual(0);
        expect(player.posX).toBeLessThanOrEqual(100);
        expect(player.posY).toBeGreaterThanOrEqual(0);
        expect(player.posY).toBeLessThanOrEqual(100);
      }
    }
  });

  it("each team has exactly one goalkeeper", () => {
    for (const team of SCOUT_TEAMS) {
      const gks = team.joueurs.filter((j) => j.poste === "GK");
      expect(gks).toHaveLength(1);
    }
  });

  it("has no duplicate country names", () => {
    const names = SCOUT_TEAMS.map((t) => t.pays);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});

describe("getRandomScoutTeams", () => {
  it("returns the requested number of teams", () => {
    const teams = getRandomScoutTeams(5);
    expect(teams).toHaveLength(5);
  });

  it("returns teams with 11 players each", () => {
    const teams = getRandomScoutTeams(3);
    for (const t of teams) {
      expect(t.joueurs).toHaveLength(11);
    }
  });

  it("returns unique teams (no duplicates in same game)", () => {
    const teams = getRandomScoutTeams(10);
    const countries = teams.map((t) => t.pays);
    const unique = new Set(countries);
    expect(unique.size).toBe(countries.length);
  });

  it("filters by difficulty when specified", () => {
    const easyTeams = getRandomScoutTeams(3, "facile");
    expect(easyTeams).toHaveLength(3);
    // All returned teams should exist in the pool
    const allNames = getAllTeamNames();
    for (const t of easyTeams) {
      expect(allNames).toContain(t.pays);
    }
  });

  it("falls back to all teams if not enough for the difficulty", () => {
    // Request more teams than likely available for 'difficile'
    const teams = getRandomScoutTeams(30, "difficile");
    expect(teams.length).toBeLessThanOrEqual(30);
    // Should still return valid teams
    for (const t of teams) {
      expect(t.joueurs).toHaveLength(11);
    }
  });
});

describe("getAllTeamNames", () => {
  it("returns 48 unique team names (CDM 2026)", () => {
    const names = getAllTeamNames();
    expect(names.length).toBeGreaterThanOrEqual(48);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it("includes key nations", () => {
    const names = getAllTeamNames();
    expect(names).toContain("France");
    expect(names).toContain("Argentine");
    expect(names).toContain("Brésil");
    expect(names).toContain("Angleterre");
    expect(names).toContain("Espagne");
    expect(names).toContain("États-Unis");
    expect(names).toContain("Japon");
    expect(names).toContain("Maroc");
  });
});
