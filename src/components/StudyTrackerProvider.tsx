"use client";

import React, { createContext, useContext } from "react";
import { useStudyTracker, type StudyTracker } from "@/hooks/useStudyTracker";

const StudyTrackerContext = createContext<StudyTracker | null>(null);

export function StudyTrackerProvider({ children }: { children: React.ReactNode }) {
  const tracker = useStudyTracker();
  return <StudyTrackerContext.Provider value={tracker}>{children}</StudyTrackerContext.Provider>;
}

export function useTracker(): StudyTracker {
  const ctx = useContext(StudyTrackerContext);
  if (!ctx) throw new Error("useTracker must be used within <StudyTrackerProvider>");
  return ctx;
}
