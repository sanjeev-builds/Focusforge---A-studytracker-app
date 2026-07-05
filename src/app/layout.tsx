import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StudyTrackerProvider } from "@/components/StudyTrackerProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FocusForge — 60-Day Study Tracker",
  description:
    "Track your 60-day Python + DSA placement prep roadmap: daily sessions, streaks, calendar consistency, and analytics.",
  keywords: ["study tracker", "placement prep", "DSA", "LeetCode", "streak tracker", "60 day challenge", "Next.js"],
  authors: [{ name: "Sanjeev", url: "https://github.com/sanjeev-builds" }],
  openGraph: {
    title: "FocusForge — 60-Day Study Tracker",
    description: "Track daily sessions, streaks, and analytics for your placement prep. Built with Next.js, Framer Motion & Recharts.",
    type: "website",
    locale: "en_US",
    siteName: "FocusForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusForge — 60-Day Study Tracker",
    description: "Track daily sessions, streaks, and analytics for your placement prep.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell-bg min-h-screen antialiased">
        <StudyTrackerProvider>
          <Navbar />
          <main className="container py-6 sm:py-8">{children}</main>
          <Footer />
        </StudyTrackerProvider>
      </body>
    </html>
  );
}
