import { ImageResponse } from "next/og";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { GOLD, OG_SIZE, loadOgFonts } from "@/lib/og";

export const alt = "Armaan Gupta experience";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const fonts = await loadOgFonts();
  const title = (project?.shortTitle ?? project?.title ?? "Armaan's World").toUpperCase();
  const titleSize = title.length > 26 ? 64 : title.length > 16 ? 80 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "72px 88px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 22,
              letterSpacing: "0.08em",
              paddingBottom: 6,
              borderBottom: `2px solid ${GOLD}`,
            }}
          >
            ARMAAN&apos;S WORLD
          </div>
          {project && (
            <div style={{ display: "flex", fontFamily: "DM Sans", fontSize: 22, letterSpacing: "0.14em" }}>
              <span style={{ color: GOLD }}>{project.year}</span>
              <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 14 }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 14 }}>{project.type.toUpperCase()}</span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: titleSize,
              lineHeight: 1.05,
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </div>
          {project && (
            <div
              style={{
                display: "flex",
                fontFamily: "DM Sans",
                fontSize: 30,
                color: "rgba(255,255,255,0.7)",
                marginTop: 20,
              }}
            >
              {project.subtitle}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "DM Sans", fontSize: 26 }}>
            {project?.stat && (
              <>
                <div style={{ width: 28, height: 2, background: GOLD, marginRight: 16, marginTop: 8 }} />
                {project.stat}
              </>
            )}
          </div>
          <div style={{ display: "flex", fontFamily: "DM Sans", fontSize: 22, color: "rgba(255,255,255,0.5)" }}>
            armaan gupta · armaan.world
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
