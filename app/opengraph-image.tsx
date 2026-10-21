import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Armaan Gupta | University of Waterloo Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "rgb(212, 175, 55)";

// A still frame of the binary globe: fibonacci points on a sphere,
// projected orthographically, fading toward the back
function globeChars(radius: number) {
  const count = 420;
  const tilt = 0.35;
  const chars = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    const ty = y * Math.cos(tilt) - z * Math.sin(tilt);
    const tz = y * Math.sin(tilt) + z * Math.cos(tilt);
    if (tz < -0.15) continue;
    chars.push({
      left: radius + x * radius,
      top: radius + ty * radius,
      opacity: 0.15 + ((tz + 0.15) / 1.15) * 0.75,
      size: 12 + tz * 6,
      char: (i * 7919) % 3 === 0 ? "1" : "0",
    });
  }
  return chars;
}

export default async function Image() {
  const [spaceGrotesk, dmSans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/space-grotesk-latin-700-normal.woff")),
    readFile(join(process.cwd(), "assets/fonts/dm-sans-latin-400-normal.woff")),
  ]);

  const radius = 190;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 22,
              letterSpacing: "0.08em",
              paddingBottom: 6,
              borderBottom: `2px solid ${GOLD}`,
              alignSelf: "flex-start",
            }}
          >
            ARMAAN&apos;S WORLD
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Space Grotesk",
                fontSize: 112,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              <span>ARMAAN</span>
              <span>GUPTA</span>
            </div>
            <div style={{ width: 360, height: 6, background: GOLD, marginTop: 18 }} />
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "DM Sans",
              fontSize: 26,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            cs + ai @ uwaterloo · swe @ shopify
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 110,
            top: 125,
            width: radius * 2,
            height: radius * 2,
            display: "flex",
          }}
        >
          {globeChars(radius).map((c, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: c.left,
                top: c.top,
                fontFamily: "DM Sans",
                fontSize: c.size,
                color: `rgba(255,255,255,${c.opacity.toFixed(2)})`,
              }}
            >
              {c.char}
            </span>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: 88,
            bottom: 72,
            display: "flex",
            fontFamily: "DM Sans",
            fontSize: 22,
            color: GOLD,
          }}
        >
          armaan.world
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGrotesk, weight: 700, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 400, style: "normal" },
      ],
    },
  );
}
