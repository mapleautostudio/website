import { describe, it, expect } from "vitest";
import {
  createSupabaseAdminClient,
  createSupabaseAnonClient,
} from "../supabase/client";

describe("createSupabaseAdminClient", () => {
  it("returns a client with a from() method", () => {
    const client = createSupabaseAdminClient(
      "https://example.supabase.co",
      "fake-service-key",
    );
    expect(typeof client.from).toBe("function");
  });
});

describe("createSupabaseAnonClient", () => {
  it("returns a client with an auth property", () => {
    const client = createSupabaseAnonClient(
      "https://example.supabase.co",
      "fake-anon-key",
    );
    expect(client.auth).toBeDefined();
  });
});
