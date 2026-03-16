import type { Metadata } from "next";
import ResumeView from "./resume-view";

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
  return <ResumeView />;
}
