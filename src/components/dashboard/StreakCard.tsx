"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { cn } from "@/lib/utils";

export function StreakCard() {
  const { streaks } = useTracker();
  const hasStreak = streaks.current > 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/10">
            {hasStreak && (
              <motion.span
                className="absolute inset-0 rounded-2xl bg-orange-500/30 blur-md"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <Flame className={cn("relative h-7 w-7", hasStreak ? "text-orange-400" : "text-muted-foreground")} />
          </div>
          <div>
            <p className="font-display font-mono-num text-2xl font-bold tabular-nums sm:text-3xl">
              {streaks.current} <span className="text-sm font-medium text-muted-foreground">days</span>
            </p>
            <p className="text-xs text-muted-foreground sm:text-sm">Current Streak</p>
          </div>
        </div>

        <div className="h-10 w-px bg-white/10" />

        <div className="text-right">
          <p className="font-display font-mono-num text-2xl font-bold tabular-nums sm:text-3xl">
            {streaks.longest} <span className="text-sm font-medium text-muted-foreground">days</span>
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">Longest Streak</p>
        </div>
      </CardContent>
    </Card>
  );
}
