"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { ChartTooltip } from "@/components/analytics/ChartTooltip";

export function CompletionRateChart() {
  const { overallStats } = useTracker();

  const completed = overallStats?.totalCompleted ?? 0;
  const skipped = overallStats?.totalSkipped ?? 0;
  const hasData = completed + skipped > 0;

  const data = hasData
    ? [
        { name: "Completed", value: completed, color: "#22c55e" },
        { name: "Skipped", value: skipped, color: "#ef4444" },
      ]
    : [{ name: "No sessions logged yet", value: 1, color: "rgba(255,255,255,0.08)" }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Completion Rate</CardTitle>
        <CardDescription>Completed vs. skipped, all-time</CardDescription>
      </CardHeader>
      <CardContent className="relative h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={hasData ? 3 : 0} stroke="none">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            {hasData && <Tooltip content={<ChartTooltip />} />}
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-mono-num text-3xl font-bold tabular-nums">
            {overallStats?.completionRate ?? 0}%
          </span>
          <span className="text-xs text-muted-foreground">completion rate</span>
        </div>
      </CardContent>
    </Card>
  );
}
