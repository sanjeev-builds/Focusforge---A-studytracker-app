export type SessionStatus = "pending" | "in-progress" | "completed" | "skipped";

export type ThemeMode = "dark" | "light";

/** A recurring block in the daily timetable, e.g. 09:00-11:00 Python Fundamentals */
export interface StudyBlock {
  id: string;
  startTime: string; // "HH:mm" 24h
  endTime: string; // "HH:mm" 24h
  subject: string;
  order: number;
  color: string; // token key, see SUBJECT_COLORS
}

/** A snapshot of a single session's outcome for a specific calendar date. */
export interface SessionEntry {
  blockId: string;
  subject: string;
  hours: number;
  status: SessionStatus;
  updatedAt: string; // ISO timestamp of last change
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  sessions: Record<string, SessionEntry>; // keyed by blockId
}

export interface AppSettings {
  theme: ThemeMode;
  startDate: string; // YYYY-MM-DD — Day 1 of the challenge
  challengeLength: number; // default 60
  dailyGoalSessions: number; // sessions/day the user is aiming for
}

export interface AppState {
  version: number;
  settings: AppSettings;
  timetable: StudyBlock[];
  logs: Record<string, DailyLog>;
}

export interface DayStats {
  date: string;
  total: number;
  completed: number;
  skipped: number;
  inProgress: number;
  pending: number;
  hoursCompleted: number;
  percent: number; // 0-100
}

export type DayColor = "completed" | "partial" | "missed" | "future" | "empty";

export interface StreakInfo {
  current: number;
  longest: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
