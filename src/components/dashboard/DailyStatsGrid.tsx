"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { cn } from "@/lib/utils";

interface StatDef {
  label: string;
  value: string;
  icon: typeof Clock;
  accent: string;
}

export function DailyStatsGrid() {
  const { todayStats } = useTracker();

  const stats: StatDef[] = [
    {
      label: "Total Study Hours",
      value: `${(todayStats?.hoursCompleted ?? 0).toFixed(1)}h`,
      icon: Clock,
      accent: "from-violet-500/20 to-violet-500/5 text-violet-400",
    },
    {
      label: "Completed Sessions",
      value: `${todayStats?.completed ?? 0}`,
      icon: CheckCircle2,
      accent: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
    },
    {
      label: "Missed Sessions",
      value: `${todayStats?.skipped ?? 0}`,
      icon: XCircle,
      accent: "from-rose-500/20 to-rose-500/5 text-rose-400",
    },
    {
      label: "Completion Rate",
      value: `${todayStats?.percent ?? 0}%`,
      icon: Target,
      accent: "from-blue-500/20 to-blue-500/5 text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <Card className="p-4 sm:p-5">
            <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br", s.accent)}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="font-display font-mono-num text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
