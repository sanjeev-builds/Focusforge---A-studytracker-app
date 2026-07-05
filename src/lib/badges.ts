import type { Badge } from "./types";

export interface BadgeContext {
  totalCompletedDays: number;
  currentStreak: number;
  longestStreak: number;
  dayNumber: number;
  challengeLength: number;
}

interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  check: (ctx: BadgeContext) => boolean;
}

export const BADGE_DEFS: BadgeDef[] = [
  {
    id: "first-day",
    title: "First Day Completed",
    description: "Complete every session in a single day.",
    icon: "Sparkles",
    check: (ctx) => ctx.totalCompletedDays >= 1,
  },
  {
    id: "streak-7",
    title: "7 Day Streak",
    description: "Reach a 7-day streak of fully completed days.",
    icon: "Flame",
    check: (ctx) => ctx.longestStreak >= 7,
  },
  {
    id: "streak-14",
    title: "14 Day Streak",
    description: "Reach a 14-day streak of fully completed days.",
    icon: "Flame",
    check: (ctx) => ctx.longestStreak >= 14,
  },
  {
    id: "streak-30",
    title: "30 Day Streak",
    description: "Reach a 30-day streak of fully completed days.",
    icon: "Trophy",
    check: (ctx) => ctx.longestStreak >= 30,
  },
  {
    id: "halfway",
    title: "Halfway Hero",
    description: "Reach Day 30 of the 60-day challenge.",
    icon: "MapPin",
    check: (ctx) => ctx.dayNumber >= Math.ceil(ctx.challengeLength / 2),
  },
  {
    id: "challenge-complete",
    title: "60-Day Challenge Completed",
    description: "Fully complete 60 days of study.",
    icon: "Crown",
    check: (ctx) => ctx.totalCompletedDays >= ctx.challengeLength,
  },
];

export function evaluateBadges(ctx: BadgeContext): Badge[] {
  return BADGE_DEFS.map((def) => ({
    id: def.id,
    title: def.title,
    description: def.description,
    icon: def.icon,
    unlocked: def.check(ctx),
  }));
}
