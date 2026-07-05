"use client";

import { Minus, Plus, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTracker } from "@/components/StudyTrackerProvider";

export function DailyGoalCard() {
  const { state, todayStats, actions } = useTracker();
  if (!state) return null;

  const goal = state.settings.dailyGoalSessions;
  const completed = todayStats?.completed ?? 0;
  const percent = Math.min(100, Math.round((completed / Math.max(goal, 1)) * 100));
  const metGoal = completed >= goal;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <Target className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Daily Goal</CardTitle>
            <CardDescription>How many sessions you&apos;re aiming for each day</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <p className="font-display font-mono-num text-2xl font-bold tabular-nums">
            {completed}
            <span className="text-muted-foreground"> / {goal} sessions</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => actions.setDailyGoal(goal - 1)}
              aria-label="Decrease goal"
              className="flex h-8 w-8 items-center justify-center rounded-lg glass-panel text-muted-foreground hover:text-foreground"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => actions.setDailyGoal(goal + 1)}
              aria-label="Increase goal"
              className="flex h-8 w-8 items-center justify-center rounded-lg glass-panel text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <Progress value={percent} className="mt-4" />
        <p className="mt-2 text-xs text-muted-foreground">
          {metGoal ? "Goal reached for today. Great work." : `${goal - completed} more to hit today's goal.`}
        </p>
      </CardContent>
    </Card>
  );
}
