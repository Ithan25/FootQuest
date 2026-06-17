import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn — class name merger", () => {
  it("merges multiple class strings", () => {
    expect(cn("text-white", "bg-black")).toBe("text-white bg-black");
  });

  it("handles conditional classes (falsy values)", () => {
    expect(cn("base", false && "hidden", undefined, null, "end")).toBe(
      "base end"
    );
  });

  it("deduplicates conflicting Tailwind classes", () => {
    // tailwind-merge should keep the last one
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles arrays of classes (clsx feature)", () => {
    expect(cn(["text-sm", "font-bold"])).toBe("text-sm font-bold");
  });
});
