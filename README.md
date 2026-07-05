# FocusForge — 60-Day Study Tracker

A glassmorphism-styled, dark-mode-first study tracker built for a 60-day Python + DSA
placement prep roadmap. Tracks daily session completion, streaks, monthly consistency,
and analytics — all persisted locally in the browser.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui-style components (Radix primitives)
- Framer Motion for animation
- Recharts for analytics charts
- localStorage for persistence (no backend)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To create a production build:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx          Root layout, providers, navbar
    page.tsx             Dashboard page
    analytics/page.tsx    Analytics page
    globals.css           Theme tokens + glassmorphism utilities
  components/
    ui/                   shadcn-style primitives (button, card, dialog, etc.)
    dashboard/             Dashboard widgets (timetable, progress ring, calendar, streaks…)
    analytics/             Chart widgets
    layout/                Navbar, loading screen
    StudyTrackerProvider.tsx  Shared app-state context
  hooks/
    useStudyTracker.ts     Core state + actions + derived stats
    useCurrentTime.ts      Live clock
  lib/
    types.ts, constants.ts, storage.ts, date-utils.ts, stats.ts, badges.ts, csv.ts
```

## Features

- Editable daily timetable (add / edit / delete blocks) with per-session status:
  pending, in progress, completed, skipped
- Animated daily progress ring + daily stats (hours, completed, missed, completion %)
- Daily goal tracking
- Current/longest streak tracking
- Monthly calendar with green/yellow/red day coloring
- 60-day progress bar + day-by-day timeline
- Achievement badges (first day, streak milestones, halfway point, challenge complete)
- Rotating motivational quotes
- Analytics page: weekly hours, monthly hours, completion rate, subject-wise breakdown
- CSV export of full session history
- Reset-challenge flow (clears logs/streak, restarts Day 1, keeps your timetable)
- Dark/light theme toggle (dark by default)
- Fully responsive, keyboard-accessible (Radix primitives), reduced-motion aware

All data lives under a single `study-tracker:v1` key in `localStorage` — clearing your
browser storage or using the in-app "Reset challenge" button is the only way to lose it.
