import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

/**
 * Serves the resume PDF with headers that trigger a download prompt on iOS Safari.
 * iOS Safari ignores the HTML `download` attribute and opens PDFs inline. Using
 * Content-Type: application/octet-stream forces Safari to show the download
 * prompt instead of opening the file in the viewer.
 */
export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition":
          'attachment; filename="Armaan_Gupta_Resume.pdf"',
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to serve resume:", error);
    return new NextResponse("Resume not found", { status: 404 });
  }
}
