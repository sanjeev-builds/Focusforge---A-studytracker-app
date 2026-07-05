"use client";

import { motion } from "framer-motion";
import { useTracker } from "@/components/StudyTrackerProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TodayFocusCard } from "@/components/dashboard/TodayFocusCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { DailyGoalCard } from "@/components/dashboard/DailyGoalCard";
import { DailyStatsGrid } from "@/components/dashboard/DailyStatsGrid";
import { ChallengeTimeline } from "@/components/dashboard/ChallengeTimeline";
import { Timetable } from "@/components/dashboard/Timetable";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { AchievementBadges } from "@/components/dashboard/AchievementBadges";
import { MotivationCard } from "@/components/dashboard/MotivationCard";
import { DataControlsCard } from "@/components/dashboard/DataControlsCard";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { hydrated } = useTracker();

  if (!hydrated) return <LoadingScreen />;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <DashboardHeader />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <TodayFocusCard />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
          <StreakCard />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
          <DailyGoalCard />
        </motion.div>
      </div>

      <DailyStatsGrid />

      <ChallengeTimeline />

      <Timetable />

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <CalendarView />
        <div className="flex flex-col gap-4 sm:gap-5">
          <MotivationCard />
          <DataControlsCard />
        </div>
      </div>

      <AchievementBadges />
    </div>
  );
}
