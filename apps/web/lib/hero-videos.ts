import fs from "node:fs";
import path from "node:path";

export function getHeroVideos(): string[] {
  const dir = path.join(process.cwd(), "public", "videos", "hero");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(mp4|webm|mov)$/i.test(f))
      .sort()
      .map((f) => `/videos/hero/${f}`);
  } catch {
    return [];
  }
}
