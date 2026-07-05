"use client";

import { motion } from "framer-motion";
import { Clock, Flame, Layers, Percent } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { cn } from "@/lib/utils";

export function AnalyticsSummaryCards() {
  const { overallStats, streaks, subjectBreakdown } = useTracker();
  const topSubject = subjectBreakdown[0]?.subject ?? "—";

  const stats = [
    {
      label: "Total Hours Logged",
      value: `${overallStats?.totalHours ?? 0}h`,
      icon: Clock,
      accent: "from-violet-500/20 to-violet-500/5 text-violet-400",
    },
    {
      label: "Completion Rate",
      value: `${overallStats?.completionRate ?? 0}%`,
      icon: Percent,
      accent: "from-blue-500/20 to-blue-500/5 text-blue-400",
    },
    {
      label: "Longest Streak",
      value: `${streaks.longest}d`,
      icon: Flame,
      accent: "from-orange-500/20 to-orange-500/5 text-orange-400",
    },
    {
      label: "Top Subject",
      value: topSubject,
      icon: Layers,
      accent: "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400",
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
          <Card className="p-4 sm:p-5">
            <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br", s.accent)}>
              <s.icon className="h-5 w-5" />
            </div>
            <p
              className={cn(
                "font-display font-mono-num font-bold tabular-nums",
                s.isText ? "truncate text-lg sm:text-xl" : "text-2xl sm:text-3xl"
              )}
            >
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
