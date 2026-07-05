"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AppState, SessionStatus, StudyBlock, ThemeMode } from "@/lib/types";
import { loadState, saveState, clearState } from "@/lib/storage";
import {
  CHALLENGE_LENGTH,
  MOTIVATIONAL_QUOTES,
  SUBJECT_COLOR_TOKENS,
  todayKeyLocal,
} from "@/lib/constants";
import { addDaysToKey, dayNumberFor, durationHours } from "@/lib/date-utils";
import {
  calculateStreaks,
  getDayColor,
  getDayStats,
  getLastNDaysHours,
  getOverallStats,
  getSubjectBreakdown,
  totalFullyCompletedDays,
} from "@/lib/stats";
import { evaluateBadges } from "@/lib/badges";

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
}

export function useStudyTracker() {
  const [state, setState] = useState<AppState | null>(null);

  // Hydrate from localStorage on mount (client-only).
  useEffect(() => {
    setState(loadState());
  }, []);

  // Persist on every change, after hydration.
  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  // Reflect theme on the document root.
  const theme = state?.settings.theme;
  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const todayKey = todayKeyLocal();

  const setSessionStatus = useCallback(
    (dateKey: string, block: StudyBlock, status: SessionStatus) => {
      setState((prev) => {
        if (!prev) return prev;
        const existingLog = prev.logs[dateKey] ?? { date: dateKey, sessions: {} };
        const sessions = { ...existingLog.sessions };

        if (status === "pending") {
          delete sessions[block.id];
        } else {
          sessions[block.id] = {
            blockId: block.id,
            subject: block.subject,
            hours: durationHours(block.startTime, block.endTime),
            status,
            updatedAt: new Date().toISOString(),
          };
        }

        return {
          ...prev,
          logs: { ...prev.logs, [dateKey]: { date: dateKey, sessions } },
        };
      });
    },
    []
  );

  const getStatus = useCallback(
    (dateKey: string, blockId: string): SessionStatus => {
      return state?.logs[dateKey]?.sessions[blockId]?.status ?? "pending";
    },
    [state]
  );

  const toggleComplete = useCallback(
    (dateKey: string, block: StudyBlock) => {
      const current = getStatus(dateKey, block.id);
      setSessionStatus(dateKey, block, current === "completed" ? "pending" : "completed");
    },
    [getStatus, setSessionStatus]
  );

  const markSkipped = useCallback(
    (dateKey: string, block: StudyBlock) => {
      const current = getStatus(dateKey, block.id);
      setSessionStatus(dateKey, block, current === "skipped" ? "pending" : "skipped");
    },
    [getStatus, setSessionStatus]
  );

  const markInProgress = useCallback(
    (dateKey: string, block: StudyBlock) => {
      const current = getStatus(dateKey, block.id);
      setSessionStatus(dateKey, block, current === "in-progress" ? "pending" : "in-progress");
    },
    [getStatus, setSessionStatus]
  );

  const addBlock = useCallback((input: { startTime: string; endTime: string; subject: string }) => {
    setState((prev) => {
      if (!prev) return prev;
      const color = SUBJECT_COLOR_TOKENS[prev.timetable.length % SUBJECT_COLOR_TOKENS.length];
      const block: StudyBlock = {
        id: makeId("block"),
        startTime: input.startTime,
        endTime: input.endTime,
        subject: input.subject,
        order: prev.timetable.length,
        color,
      };
      return { ...prev, timetable: [...prev.timetable, block].sort((a, b) => a.startTime.localeCompare(b.startTime)) };
    });
  }, []);

  const updateBlock = useCallback((id: string, patch: Partial<Pick<StudyBlock, "startTime" | "endTime" | "subject">>) => {
    setState((prev) => {
      if (!prev) return prev;
      const timetable = prev.timetable
        .map((b) => (b.id === id ? { ...b, ...patch } : b))
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      return { ...prev, timetable };
    });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return { ...prev, timetable: prev.timetable.filter((b) => b.id !== id) };
    });
  }, []);

  const setDailyGoal = useCallback((n: number) => {
    setState((prev) => (prev ? { ...prev, settings: { ...prev.settings, dailyGoalSessions: Math.max(1, n) } } : prev));
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    setState((prev) => (prev ? { ...prev, settings: { ...prev.settings, theme } } : prev));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) =>
      prev ? { ...prev, settings: { ...prev.settings, theme: prev.settings.theme === "dark" ? "light" : "dark" } } : prev
    );
  }, []);

  const resetChallenge = useCallback(() => {
    setState((prev) =>
      prev
        ? {
            ...prev,
            logs: {},
            settings: { ...prev.settings, startDate: todayKeyLocal() },
          }
        : prev
    );
  }, []);

  const hardReset = useCallback(() => {
    clearState();
    setState(loadState());
  }, []);

  // ---------- Derived data ----------

  const dayNumber = useMemo(
    () => (state ? dayNumberFor(state.settings.startDate, todayKey, state.settings.challengeLength) : 1),
    [state, todayKey]
  );

  const todayStats = useMemo(
    () => (state ? getDayStats(todayKey, state.logs[todayKey], state.timetable) : null),
    [state, todayKey]
  );

  const streaks = useMemo(() => (state ? calculateStreaks(state, todayKey) : { current: 0, longest: 0 }), [state, todayKey]);

  const totalCompletedDays = useMemo(
    () => (state ? totalFullyCompletedDays(state, todayKey) : 0),
    [state, todayKey]
  );

  const weeklyHours = useMemo(() => (state ? getLastNDaysHours(state, todayKey, 7) : []), [state, todayKey]);

  const subjectBreakdown = useMemo(() => (state ? getSubjectBreakdown(state) : []), [state]);

  const overallStats = useMemo(() => (state ? getOverallStats(state) : null), [state]);

  const badges = useMemo(
    () =>
      state
        ? evaluateBadges({
            totalCompletedDays,
            currentStreak: streaks.current,
            longestStreak: streaks.longest,
            dayNumber,
            challengeLength: state.settings.challengeLength,
          })
        : [],
    [state, totalCompletedDays, streaks, dayNumber]
  );

  const challengeTimeline = useMemo(() => {
    if (!state) return [];
    const out: { dayNum: number; date: string; color: ReturnType<typeof getDayColor> }[] = [];
    for (let i = 0; i < state.settings.challengeLength; i++) {
      const date = addDaysToKey(state.settings.startDate, i);
      const stats = getDayStats(date, state.logs[date], state.timetable);
      out.push({ dayNum: i + 1, date, color: getDayColor(date, todayKey, stats) });
    }
    return out;
  }, [state, todayKey]);

  const dailyQuote = useMemo(() => {
    const idx = ((dayNumber - 1) % MOTIVATIONAL_QUOTES.length + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length;
    return MOTIVATIONAL_QUOTES[idx];
  }, [dayNumber]);

  return {
    state,
    hydrated: state !== null,
    todayKey,
    dayNumber,
    challengeLength: state?.settings.challengeLength ?? CHALLENGE_LENGTH,
    todayStats,
    streaks,
    totalCompletedDays,
    weeklyHours,
    subjectBreakdown,
    overallStats,
    badges,
    challengeTimeline,
    dailyQuote,
    getStatus,
    actions: {
      setSessionStatus,
      toggleComplete,
      markSkipped,
      markInProgress,
      addBlock,
      updateBlock,
      deleteBlock,
      setDailyGoal,
      setTheme,
      toggleTheme,
      resetChallenge,
      hardReset,
    },
  };
}

export type StudyTracker = ReturnType<typeof useStudyTracker>;
