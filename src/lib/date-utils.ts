export function toKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDaysToKey(key: string, days: number): string {
  const d = parseKey(key);
  d.setDate(d.getDate() + days);
  return toKey(d);
}

export function diffInDays(fromKey: string, toKeyStr: string): number {
  const a = parseKey(fromKey);
  const b = parseKey(toKeyStr);
  const ms = b.setHours(0, 0, 0, 0) - a.setHours(0, 0, 0, 0);
  return Math.round(ms / 86400000);
}

/** 1-indexed day number of the challenge, clamped to [1, challengeLength]. */
export function dayNumberFor(startKey: string, todayKey: string, challengeLength: number): number {
  const diff = diffInDays(startKey, todayKey) + 1;
  return Math.min(Math.max(diff, 1), challengeLength);
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDisplayTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function timeStrToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function durationHours(start: string, end: string): number {
  const mins = timeStrToMinutes(end) - timeStrToMinutes(start);
  return Math.max(mins, 0) / 60;
}

export function formatTimeRange(start: string, end: string): string {
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
  };
  return `${fmt(start)} - ${fmt(end)}`;
}

export function isNowWithinRange(start: string, end: string, now: Date): boolean {
  const nowMins = now.getHours() * 60 + now.getMinutes();
  return nowMins >= timeStrToMinutes(start) && nowMins <= timeStrToMinutes(end);
}

export function isPastDay(key: string, todayKey: string): boolean {
  return diffInDays(key, todayKey) > 0;
}

export function isFutureDay(key: string, todayKey: string): boolean {
  return diffInDays(key, todayKey) < 0;
}

/** Builds a 6x7 calendar matrix (Date | null) for the given month, Sunday-first. */
export function getMonthMatrix(year: number, month: number): (Date | null)[][] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
