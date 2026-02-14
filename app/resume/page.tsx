import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Armaan Gupta - Resume",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ResumePage() {
  return (
    <div className="w-full h-[calc(100vh-8rem)] min-h-[600px] rounded-lg overflow-hidden bg-white/5">
      <iframe
        src="/resume.pdf"
        title="Armaan Gupta - Resume"
        className="w-full h-full border-0"
      />
    </div>
  );
}
