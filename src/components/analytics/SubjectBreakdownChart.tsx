"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { SUBJECT_COLOR_HEX } from "@/lib/constants";
import { ChartTooltip } from "@/components/analytics/ChartTooltip";

export function SubjectBreakdownChart() {
  const { subjectBreakdown } = useTracker();

  if (subjectBreakdown.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Breakdown</CardTitle>
          <CardDescription>Hours invested per subject, all-time</CardDescription>
        </CardHeader>
        <CardContent className="flex h-56 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <BookOpen className="h-6 w-6 opacity-50" />
          Complete a few sessions to see your subject breakdown here.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Breakdown</CardTitle>
        <CardDescription>Hours invested per subject, all-time</CardDescription>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={subjectBreakdown} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
            <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="subject"
              stroke="rgba(255,255,255,0.4)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} content={<ChartTooltip unit="h" />} />
            <Bar dataKey="hours" radius={[0, 6, 6, 0]} maxBarSize={22}>
              {subjectBreakdown.map((entry, i) => (
                <Cell key={i} fill={SUBJECT_COLOR_HEX[entry.color] ?? "#8b5cf6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
