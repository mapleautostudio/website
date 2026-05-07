import { describe, it, expect } from "vitest";
import { SHOP } from "../content/contact";
import { SERVICE_SLUGS } from "../content/service-slugs";

describe("SHOP", () => {
  it("has required contact fields", () => {
    expect(SHOP.brand.full).toBe("Maple Auto Studio");
    expect(SHOP.phone).toBeTruthy();
    expect(SHOP.phoneTel).toMatch(/^\+1/);
    expect(SHOP.location.city).toContain("Saskatoon");
  });
});

describe("SERVICE_SLUGS", () => {
  it("is a non-empty array of strings", () => {
    expect(Array.isArray(SERVICE_SLUGS)).toBe(true);
    expect(SERVICE_SLUGS.length).toBeGreaterThan(0);
    for (const slug of SERVICE_SLUGS) {
      expect(typeof slug).toBe("string");
    }
  });

  it("does not include the photos slug", () => {
    expect(SERVICE_SLUGS).not.toContain("photos");
  });

  it("includes the expected detailing slug", () => {
    expect(SERVICE_SLUGS).toContain("detailing-packages");
  });
});
