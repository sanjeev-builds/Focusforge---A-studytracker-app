"use client";

import { motion } from "framer-motion";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { formatDisplayDate, formatDisplayTime } from "@/lib/date-utils";
import { useTracker } from "@/components/StudyTrackerProvider";

function getGreeting(hour: number) {
  if (hour < 5) return "Still up? Respect the grind.";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Night owl mode";
}

export function DashboardHeader() {
  const now = useCurrentTime();
  const { dayNumber, challengeLength } = useTracker();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {now ? getGreeting(now.getHours()) : "Welcome back"}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {now ? formatDisplayDate(now) : "Loading date…"}
          </h1>
          <p className="mt-2 font-mono-num text-sm text-muted-foreground">
            {now ? formatDisplayTime(now) : "--:--:--"}
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-violet-500/15 to-blue-500/10 px-5 py-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              60-Day Challenge
            </span>
            <span className="font-display text-3xl font-bold tabular-nums text-gradient-aurora">
              Day {dayNumber} <span className="text-muted-foreground text-lg font-medium">of {challengeLength}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
