import { describe, it, expect } from "vitest";
import { codeToFlag, countryToFlag, getCountryNames } from "@/lib/flag-emoji";

describe("codeToFlag", () => {
  it("converts standard ISO alpha-2 codes to flag emoji", () => {
    expect(codeToFlag("FR")).toBe("🇫🇷");
    expect(codeToFlag("BR")).toBe("🇧🇷");
    expect(codeToFlag("US")).toBe("🇺🇸");
    expect(codeToFlag("JP")).toBe("🇯🇵");
  });

  it("handles case-insensitive input", () => {
    expect(codeToFlag("fr")).toBe("🇫🇷");
    expect(codeToFlag("Fr")).toBe("🇫🇷");
  });

  it("returns England flag for GB-ENG", () => {
    expect(codeToFlag("GB-ENG")).toBe("🏴󠁧󠁢󠁥󠁮󠁧󠁿");
  });

  it("returns Scotland flag for GB-SCT", () => {
    expect(codeToFlag("GB-SCT")).toBe("🏴󠁧󠁢󠁳󠁣󠁴󠁿");
  });

  it("returns Wales flag for GB-WLS", () => {
    expect(codeToFlag("GB-WLS")).toBe("🏴󠁧󠁢󠁷󠁬󠁳󠁿");
  });
});

describe("countryToFlag", () => {
  it("converts French country names to flags", () => {
    expect(countryToFlag("France")).toBe("🇫🇷");
    expect(countryToFlag("Brésil")).toBe("🇧🇷");
    expect(countryToFlag("Angleterre")).toBe("🏴󠁧󠁢󠁥󠁮󠁧󠁿");
  });

  it("handles special country names", () => {
    expect(countryToFlag("Pays-Bas")).toBe("🇳🇱");
    expect(countryToFlag("États-Unis")).toBe("🇺🇸");
    expect(countryToFlag("Corée du Sud")).toBe("🇰🇷");
  });

  it("falls back to 🏳️ for unknown countries", () => {
    expect(countryToFlag("Narnia")).toBe("🏳️");
    expect(countryToFlag("")).toBe("🏳️");
  });
});

describe("getCountryNames", () => {
  it("returns an array of strings", () => {
    const names = getCountryNames();
    expect(Array.isArray(names)).toBe(true);
    expect(names.length).toBeGreaterThan(0);
    names.forEach((name) => expect(typeof name).toBe("string"));
  });

  it("includes major football nations", () => {
    const names = getCountryNames();
    expect(names).toContain("France");
    expect(names).toContain("Brésil");
    expect(names).toContain("Argentine");
  });
});
