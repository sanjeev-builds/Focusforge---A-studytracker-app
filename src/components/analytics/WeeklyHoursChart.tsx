"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { ChartTooltip } from "@/components/analytics/ChartTooltip";

export function WeeklyHoursChart() {
  const { weeklyHours } = useTracker();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Hours</CardTitle>
        <CardDescription>Hours completed over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyHours} margin={{ top: 4, right: 16, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="weeklyBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.75} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} width={28} />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} content={<ChartTooltip unit="h" />} />
            <Bar dataKey="hours" fill="url(#weeklyBar)" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
