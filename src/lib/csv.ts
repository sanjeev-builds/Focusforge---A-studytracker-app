import type { AppState } from "./types";

export function buildProgressCSV(state: AppState): string {
  const rows: string[] = ["Date,Subject,Time Slot,Status,Hours"];

  const dates = Object.keys(state.logs).sort();
  for (const date of dates) {
    const log = state.logs[date];
    for (const block of state.timetable) {
      const entry = log.sessions[block.id];
      if (!entry) continue;
      const slot = `${block.startTime}-${block.endTime}`;
      rows.push(
        [date, csvSafe(entry.subject), slot, entry.status, entry.hours.toFixed(2)].join(",")
      );
    }
  }

  return rows.join("\n");
}

function csvSafe(value: string): string {
  if (value.includes(",") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
