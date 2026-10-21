import { readFile } from "fs/promises";
import { join } from "path";

export const OG_SIZE = { width: 1200, height: 630 };
export const GOLD = "rgb(212, 175, 55)";

// next/og can't read woff2, so link previews use the .woff copies
export async function loadOgFonts() {
  const [spaceGrotesk, dmSans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/space-grotesk-latin-700-normal.woff")),
    readFile(join(process.cwd(), "assets/fonts/dm-sans-latin-400-normal.woff")),
  ]);
  return [
    { name: "Space Grotesk", data: spaceGrotesk, weight: 700 as const, style: "normal" as const },
    { name: "DM Sans", data: dmSans, weight: 400 as const, style: "normal" as const },
  ];
}
