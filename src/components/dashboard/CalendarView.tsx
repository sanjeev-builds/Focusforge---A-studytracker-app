"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { getDayColor, getDayStats } from "@/lib/stats";
import { getMonthMatrix, MONTH_NAMES, toKey, WEEKDAY_SHORT } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

const COLOR_CLASSES: Record<string, string> = {
  completed: "bg-success/80 text-success-foreground hover:bg-success",
  partial: "bg-warning/70 text-warning-foreground hover:bg-warning",
  missed: "bg-destructive/70 text-white hover:bg-destructive",
  future: "bg-white/[0.03] text-muted-foreground/50",
  empty: "bg-white/[0.03] text-muted-foreground/50",
};

export function CalendarView() {
  const { state, todayKey } = useTracker();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const weeks = useMemo(() => getMonthMatrix(year, month), [year, month]);

  function goPrev() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }
  function goNext() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }

  if (!state) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <CalendarDays className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>
              {MONTH_NAMES[month]} {year}
            </CardTitle>
            <CardDescription>Your consistency at a glance</CardDescription>
          </div>
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
      <CardContent>
        <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {WEEKDAY_SHORT.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {weeks.flat().map((date, i) => {
            if (!date) return <div key={i} className="aspect-square rounded-lg" />;
            const key = toKey(date);
            const stats = getDayStats(key, state.logs[key], state.timetable);
            const color = getDayColor(key, todayKey, stats);
            const isToday = key === todayKey;
            return (
              <div
                key={i}
                title={`${key}: ${stats.completed}/${stats.total} sessions`}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-lg text-xs font-semibold tabular-nums transition-colors",
                  COLOR_CLASSES[color],
                  isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <LegendDot className="bg-success" label="Completed" />
          <LegendDot className="bg-warning" label="Partial" />
          <LegendDot className="bg-destructive" label="Missed" />
          <LegendDot className="bg-white/10" label="No data" />
        </div>
      </CardContent>
    </Card>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-full", className)} />
      {label}
    </span>
  );
}
