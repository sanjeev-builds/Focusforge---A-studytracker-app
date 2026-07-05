import type { AppState, StudyBlock } from "./types";

export const STORAGE_KEY = "study-tracker:v1";
export const CHALLENGE_LENGTH = 60;
export const APP_VERSION = 1;

/** Rotating accent tokens applied to timetable blocks / subject charts. */
export const SUBJECT_COLOR_TOKENS = [
  "violet",
  "blue",
  "fuchsia",
  "cyan",
  "amber",
  "rose",
] as const;

export const SUBJECT_COLOR_HEX: Record<string, string> = {
  violet: "#8b5cf6",
  blue: "#3b82f6",
  fuchsia: "#d946ef",
  cyan: "#22d3ee",
  amber: "#f59e0b",
  rose: "#fb7185",
};

export function defaultTimetable(): StudyBlock[] {
  return [
    {
      id: "block-python",
      startTime: "09:00",
      endTime: "11:00",
      subject: "Python Fundamentals",
      order: 0,
      color: "violet",
    },
    {
      id: "block-dsa",
      startTime: "11:30",
      endTime: "13:30",
      subject: "DSA Practice",
      order: 1,
      color: "blue",
    },
    {
      id: "block-leetcode",
      startTime: "15:00",
      endTime: "17:00",
      subject: "LeetCode",
      order: 2,
      color: "fuchsia",
    },
    {
      id: "block-revision",
      startTime: "18:00",
      endTime: "20:00",
      subject: "Revision",
      order: 3,
      color: "cyan",
    },
  ];
}

export function todayKeyLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function defaultAppState(): AppState {
  return {
    version: APP_VERSION,
    settings: {
      theme: "dark",
      startDate: todayKeyLocal(),
      challengeLength: CHALLENGE_LENGTH,
      dailyGoalSessions: 4,
    },
    timetable: defaultTimetable(),
    logs: {},
  };
}

export const MOTIVATIONAL_QUOTES: string[] = [
  "Consistency beats intensity.",
  "Small improvements every day compound into extraordinary results.",
  "Your future placement package is being built today.",
  "Discipline is choosing between what you want now and what you want most.",
  "The DSA sheet doesn't care how you feel. Show up anyway.",
  "Every skipped session is a line of code someone else is writing instead of you.",
  "60 days of focus can outrun 4 years of average effort.",
  "You don't need motivation. You need a streak you refuse to break.",
  "Interviewers remember problem solvers, not excuses.",
  "Today's Two Sum is tomorrow's system design confidence.",
  "Compounding works on skills the same way it works on money.",
  "Nobody is coming to grind LeetCode for you.",
  "A slow solve today is a fast solve in the interview room.",
  "Your competition is asleep. Your streak isn't.",
  "Log the session. Trust the process. Repeat.",
  "Hard choices, easy life. Easy choices, hard life.",
  "The best time to start was yesterday. The second best time is now.",
  "You are one solved problem closer to your dream company.",
  "Don't count the days. Make the days count.",
  "The pain of discipline is nothing compared to the pain of regret.",
  "Every expert was once a beginner who refused to quit.",
  "Your GitHub heatmap should be greener than your Netflix history.",
  "An hour of focused practice beats three hours of distracted scrolling.",
  "The offer letter won't write itself. Your code will.",
  "Show up today so tomorrow's you says thank you.",
];

export const BLOCK_COLOR_PALETTE = SUBJECT_COLOR_TOKENS;
