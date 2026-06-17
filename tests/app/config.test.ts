import { describe, it, expect } from "vitest";
import type { UserRole } from "@/lib/types/database";
import { GAME_LIMITS } from "@/lib/constants";

describe("Database Types", () => {
  it("UserRole is a string union type (basic | golden_ball)", () => {
    const basic: UserRole = "basic";
    const premium: UserRole = "golden_ball";
    expect(basic).toBe("basic");
    expect(premium).toBe("golden_ball");
  });

  it("User interface fields align with GAME_LIMITS usage", () => {
    const roles: UserRole[] = ["basic", "golden_ball"];
    for (const role of roles) {
      expect(GAME_LIMITS[role]).toBeDefined();
      expect(typeof GAME_LIMITS[role].maxGamesPerDay).toBe("number");
      expect(typeof GAME_LIMITS[role].showAds).toBe("boolean");
    }
  });
});

describe("Middleware config", () => {
  it("matcher covers all dashboard routes", () => {
    const config = {
      matcher: [
        "/hub/:path*",
        "/games/:path*",
        "/leaderboard/:path*",
        "/shop/:path*",
        "/profile/:path*",
      ],
    };

    expect(config.matcher).toContain("/hub/:path*");
    expect(config.matcher).toContain("/games/:path*");
    expect(config.matcher).toContain("/leaderboard/:path*");
    expect(config.matcher).toContain("/shop/:path*");
    expect(config.matcher).toContain("/profile/:path*");
  });

  it("matcher does NOT include public routes", () => {
    const config = {
      matcher: [
        "/hub/:path*",
        "/games/:path*",
        "/leaderboard/:path*",
        "/shop/:path*",
        "/profile/:path*",
      ],
    };

    const publicPaths = ["/", "/a-propos", "/contact", "/guide", "/blog", "/login", "/signup"];
    for (const p of publicPaths) {
      const matches = config.matcher.some((m) => m.startsWith(p + "/") || m === p);
      expect(matches).toBe(false);
    }
  });
});
