"use client";

import { motion } from "framer-motion";
import { LineChart } from "lucide-react";
import { useTracker } from "@/components/StudyTrackerProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { AnalyticsSummaryCards } from "@/components/analytics/AnalyticsSummaryCards";
import { WeeklyHoursChart } from "@/components/analytics/WeeklyHoursChart";
import { MonthlyHoursChart } from "@/components/analytics/MonthlyHoursChart";
import { CompletionRateChart } from "@/components/analytics/CompletionRateChart";
import { SubjectBreakdownChart } from "@/components/analytics/SubjectBreakdownChart";

export default function AnalyticsPage() {
  const { hydrated } = useTracker();

  if (!hydrated) return <LoadingScreen />;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel flex items-center gap-3 rounded-2xl p-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cobalt-500 shadow-lg shadow-violet-500/25">
          <LineChart className="h-5 w-5 text-white" />
        </span>
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Analytics</h1>
          <p className="text-sm text-muted-foreground">A closer look at how your 60-day sprint is going</p>
        </div>
      </motion.div>

      <AnalyticsSummaryCards />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <WeeklyHoursChart />
        <MonthlyHoursChart />
      </div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <CompletionRateChart />
        <SubjectBreakdownChart />
      </div>
    </div>
  );
}
