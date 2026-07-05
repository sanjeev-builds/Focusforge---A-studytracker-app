import { STORAGE_KEY, defaultAppState } from "./constants";
import type { AppState } from "./types";

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultAppState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAppState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const fallback = defaultAppState();
    // Shallow-merge to stay resilient to older/partial shapes in storage.
    return {
      version: parsed.version ?? fallback.version,
      settings: { ...fallback.settings, ...(parsed.settings ?? {}) },
      timetable: parsed.timetable?.length ? parsed.timetable : fallback.timetable,
      logs: parsed.logs ?? {},
    };
  } catch {
    return defaultAppState();
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable (private browsing) — fail silently.
  }
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
