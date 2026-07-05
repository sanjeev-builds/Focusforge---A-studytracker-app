"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { getMonthlyHours } from "@/lib/stats";
import { MONTH_NAMES } from "@/lib/date-utils";
import { ChartTooltip } from "@/components/analytics/ChartTooltip";

export function MonthlyHoursChart() {
  const { state } = useTracker();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const data = useMemo(() => (state ? getMonthlyHours(state, year, month) : []), [state, year, month]);

  function goPrev() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
  }
  function goNext() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Monthly Study Hours</CardTitle>
          <CardDescription>
            {MONTH_NAMES[month]} {year}
          </CardDescription>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 16, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="monthlyArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} interval={2} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} width={28} />
            <Tooltip cursor={{ stroke: "rgba(139,92,246,0.4)" }} content={<ChartTooltip unit="h" />} />
            <Area type="monotone" dataKey="hours" stroke="#a78bfa" strokeWidth={2} fill="url(#monthlyArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
