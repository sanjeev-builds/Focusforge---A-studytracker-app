"use client";

import { Sparkle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { useTracker } from "@/components/StudyTrackerProvider";

export function TodayFocusCard() {
  const { todayStats } = useTracker();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <Sparkle className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Today&apos;s Progress</CardTitle>
            <CardDescription>Sessions completed vs. scheduled</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-6">
        <ProgressRing
          completed={todayStats?.completed ?? 0}
          total={todayStats?.total ?? 0}
          percent={todayStats?.percent ?? 0}
        />
      </CardContent>
    </Card>
  );
}
