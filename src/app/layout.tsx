import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StudyTrackerProvider } from "@/components/StudyTrackerProvider";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "FocusForge — 60-Day Study Tracker",
  description:
    "Track your 60-day Python + DSA placement prep roadmap: daily sessions, streaks, calendar consistency, and analytics.",
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
        </StudyTrackerProvider>
      </body>
    </html>
  );
}
