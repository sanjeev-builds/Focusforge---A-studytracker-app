import type { AppState, DailyLog, DayColor, DayStats, StreakInfo, StudyBlock } from "./types";
import { addDaysToKey, diffInDays, isPastDay, toKey } from "./date-utils";

export function getDayStats(
  dateKey: string,
  log: DailyLog | undefined,
  timetable: StudyBlock[]
): DayStats {
  const total = timetable.length;
  let completed = 0;
  let skipped = 0;
  let inProgress = 0;
  let hoursCompleted = 0;

  if (log) {
    for (const block of timetable) {
      const entry = log.sessions[block.id];
      if (!entry) continue;
      if (entry.status === "completed") {
        completed += 1;
        hoursCompleted += entry.hours;
      } else if (entry.status === "skipped") {
        skipped += 1;
      } else if (entry.status === "in-progress") {
        inProgress += 1;
      }
    }
  }

  const pending = Math.max(total - completed - skipped - inProgress, 0);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { date: dateKey, total, completed, skipped, inProgress, pending, hoursCompleted, percent };
}

export function getDayColor(dateKey: string, todayKey: string, stats: DayStats): DayColor {
  const isPast = isPastDay(dateKey, todayKey);
  const isToday = dateKey === todayKey;

  if (stats.total > 0 && stats.completed === stats.total) return "completed";
  if (stats.completed > 0) return "partial";
  if (isPast) return "missed";
  if (isToday) return stats.total > 0 ? "partial" : "empty";
  return "future";
}

function isFullyCompletedDay(dateKey: string, state: AppState): boolean {
  const log = state.logs[dateKey];
  const stats = getDayStats(dateKey, log, state.timetable);
  return stats.total > 0 && stats.completed === stats.total;
}

export function calculateStreaks(state: AppState, todayKey: string): StreakInfo {
  const { startDate } = state.settings;
  const totalDays = diffInDays(startDate, todayKey) + 1;

  if (totalDays <= 0) return { current: 0, longest: 0 };

  let longest = 0;
  let run = 0;
  let cursor = startDate;

  for (let i = 0; i < totalDays; i++) {
    if (isFullyCompletedDay(cursor, state)) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
    cursor = addDaysToKey(cursor, 1);
  }

  // Current streak: walk backward from today (skip today itself if not yet complete).
  let current = 0;
  let d = todayKey;
  if (!isFullyCompletedDay(d, state)) {
    d = addDaysToKey(d, -1);
  }
  while (diffInDays(startDate, d) >= 0 && isFullyCompletedDay(d, state)) {
    current += 1;
    d = addDaysToKey(d, -1);
  }

  return { current, longest };
}

export function totalFullyCompletedDays(state: AppState, todayKey: string): number {
  const { startDate } = state.settings;
  const totalDays = diffInDays(startDate, todayKey) + 1;
  if (totalDays <= 0) return 0;
  let count = 0;
  let cursor = startDate;
  for (let i = 0; i < totalDays; i++) {
    if (isFullyCompletedDay(cursor, state)) count += 1;
    cursor = addDaysToKey(cursor, 1);
  }
  return count;
}

export interface DayHours {
  date: string;
  label: string;
  hours: number;
}

export function getLastNDaysHours(state: AppState, todayKey: string, n: number): DayHours[] {
  const out: DayHours[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const key = addDaysToKey(todayKey, -i);
    const log = state.logs[key];
    const stats = getDayStats(key, log, state.timetable);
    const d = new Date(key);
    out.push({
      date: key,
      label: d.toLocaleDateString(undefined, { weekday: "short" }),
      hours: Math.round(stats.hoursCompleted * 10) / 10,
    });
  }
  return out;
}

export function getMonthlyHours(state: AppState, year: number, month: number): DayHours[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const out: DayHours[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const key = toKey(new Date(year, month, day));
    const log = state.logs[key];
    const stats = getDayStats(key, log, state.timetable);
    out.push({ date: key, label: String(day), hours: Math.round(stats.hoursCompleted * 10) / 10 });
  }
  return out;
}

export interface SubjectBreakdownItem {
  subject: string;
  hours: number;
  sessions: number;
  color: string;
}

export function getSubjectBreakdown(state: AppState): SubjectBreakdownItem[] {
  const map = new Map<string, SubjectBreakdownItem>();
  const colorBySubject = new Map<string, string>();
  for (const b of state.timetable) colorBySubject.set(b.subject, b.color);

  for (const log of Object.values(state.logs)) {
    for (const entry of Object.values(log.sessions)) {
      if (entry.status !== "completed") continue;
      const existing = map.get(entry.subject);
      if (existing) {
        existing.hours += entry.hours;
        existing.sessions += 1;
      } else {
        map.set(entry.subject, {
          subject: entry.subject,
          hours: entry.hours,
          sessions: 1,
          color: colorBySubject.get(entry.subject) ?? "violet",
        });
      }
    }
  }

  return Array.from(map.values())
    .map((v) => ({ ...v, hours: Math.round(v.hours * 10) / 10 }))
    .sort((a, b) => b.hours - a.hours);
}

export interface OverallStats {
  totalHours: number;
  totalCompleted: number;
  totalSkipped: number;
  completionRate: number; // completed / (completed+skipped) over days with data
}

export function getOverallStats(state: AppState): OverallStats {
  let totalHours = 0;
  let totalCompleted = 0;
  let totalSkipped = 0;

  for (const log of Object.values(state.logs)) {
    for (const entry of Object.values(log.sessions)) {
      if (entry.status === "completed") {
        totalHours += entry.hours;
        totalCompleted += 1;
      } else if (entry.status === "skipped") {
        totalSkipped += 1;
      }
    }
  }

  const denom = totalCompleted + totalSkipped;
  const completionRate = denom > 0 ? Math.round((totalCompleted / denom) * 100) : 0;

  return {
    totalHours: Math.round(totalHours * 10) / 10,
    totalCompleted,
    totalSkipped,
    completionRate,
  };
}
