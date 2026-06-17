import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import fs from "fs";
import path from "path";

describe("Sitemap", () => {
  const entries = sitemap();

  it("returns an array of sitemap entries", () => {
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("all entries have a valid URL starting with https://footquest.fr", () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/footquest\.fr/);
    }
  });

  it("homepage is present with priority 1", () => {
    const home = entries.find((e) => e.url === "https://footquest.fr");
    expect(home).toBeDefined();
    expect(home!.priority).toBe(1);
  });

  it("all entries have lastModified as Date", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });

  it("all entries have a valid changeFrequency", () => {
    const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
    for (const entry of entries) {
      if (entry.changeFrequency) {
        expect(validFreqs).toContain(entry.changeFrequency);
      }
    }
  });

  it("all entries have priority between 0 and 1", () => {
    for (const entry of entries) {
      if (entry.priority !== undefined) {
        expect(entry.priority).toBeGreaterThanOrEqual(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      }
    }
  });

  it("includes key public pages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://footquest.fr/a-propos");
    expect(urls).toContain("https://footquest.fr/contact");
    expect(urls).toContain("https://footquest.fr/guide/comment-jouer");
    expect(urls).toContain("https://footquest.fr/guide/systeme-de-points");
  });

  it("includes legal pages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://footquest.fr/mentions-legales");
    expect(urls).toContain("https://footquest.fr/politique-confidentialite");
    expect(urls).toContain("https://footquest.fr/cgu");
  });

  it("does NOT include private dashboard pages", () => {
    const urls = entries.map((e) => e.url);
    const dashboardPaths = ["/hub", "/games/", "/leaderboard", "/shop", "/profile"];
    for (const p of dashboardPaths) {
      const found = urls.some((url) => url.includes(p));
      expect(found).toBe(false);
    }
  });

  it("uses fixed dates (not dynamic new Date())", () => {
    // All lastModified dates should be at midnight (no time component)
    for (const entry of entries) {
      const date = entry.lastModified as Date;
      expect(date.getUTCHours()).toBe(0);
      expect(date.getUTCMinutes()).toBe(0);
    }
  });
});

describe("robots.txt", () => {
  const robotsPath = path.join(
    process.cwd(),
    "public",
    "robots.txt"
  );

  it("file exists", () => {
    expect(fs.existsSync(robotsPath)).toBe(true);
  });

  it("references the sitemap URL", () => {
    const content = fs.readFileSync(robotsPath, "utf-8");
    expect(content).toContain("Sitemap: https://footquest.fr/sitemap.xml");
  });

  it("allows all crawlers", () => {
    const content = fs.readFileSync(robotsPath, "utf-8");
    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
  });

  it("does NOT contain Disallow rules (we use meta noindex instead)", () => {
    const content = fs.readFileSync(robotsPath, "utf-8");
    expect(content).not.toContain("Disallow:");
  });
});

describe("Public assets", () => {
  it("favicon.ico exists", () => {
    expect(fs.existsSync(path.join(process.cwd(), "public", "favicon.ico"))).toBe(true);
  });

  it("manifest.json exists and is valid JSON", () => {
    const manifestPath = path.join(process.cwd(), "public", "manifest.json");
    expect(fs.existsSync(manifestPath)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(manifest.name).toBe("FootQuest");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons.length).toBeGreaterThan(0);
  });

  it("ads.txt exists with Google publisher ID", () => {
    const adsPath = path.join(process.cwd(), "public", "ads.txt");
    expect(fs.existsSync(adsPath)).toBe(true);
    const content = fs.readFileSync(adsPath, "utf-8");
    expect(content).toContain("google.com");
    expect(content).toContain("pub-");
  });

  it("Google verification file exists", () => {
    expect(
      fs.existsSync(path.join(process.cwd(), "public", "google31ad35b3c46d6e07.html"))
    ).toBe(true);
  });
});
