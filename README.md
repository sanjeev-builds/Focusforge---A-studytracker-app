# 🔥 FocusForge — 60-Day Study Tracker

> **A glassmorphism-styled, dark-mode-first study tracker built for serious placement prep.**  
> Track daily sessions, streaks, monthly consistency, and deep analytics — all persisted locally in the browser.

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

---

## 🎯 The Problem

Placement prep is a **60-day grind**. Most students start strong but burn out by week 2. They have no visibility into their consistency, can't tell which subjects they're neglecting, and lose motivation without tangible progress signals.

## 💡 The Solution

FocusForge turns placement prep into a **game you don't want to lose**. It combines streak tracking, calendar heatmaps, achievement badges, and deep analytics to create psychological accountability that keeps you studying every single day.

---

## ✨ Key Features

### 📋 Daily Timetable Management
- Pre-configured 4-session study blocks (Python, DSA, LeetCode, Revision)
- Add, edit, and delete custom study blocks with time slots
- Real-time **"LIVE NOW"** indicator for the current session
- Per-session status tracking: Pending → In Progress → Completed / Skipped

### 🔥 Streak & Progress Engine
- **Current streak** and **longest streak** tracking
- Animated radial progress ring showing daily completion
- 60-day sprint timeline with day-by-day color coding
- Adjustable daily session goal with progress bar

### 📊 Analytics Dashboard
- **Weekly study hours** — bar chart of last 7 days
- **Monthly study hours** — line chart with month-to-month navigation
- **Session completion rate** — donut chart (completed vs. skipped)
- **Subject-wise breakdown** — hours invested per subject
- **Summary cards** — total hours, completion %, longest streak, top subject

### 🏆 Gamification
- **Achievement badges**: First Day, 7-Day Streak, 14-Day Streak, 30-Day Streak, Halfway Hero, Challenge Complete
- **Motivational quotes**: Rotating daily quotes with shuffle functionality
- **Calendar heatmap**: Green/yellow/red day coloring for visual accountability

### 🛠 Data Controls
- **CSV Export** — download full session history as a spreadsheet
- **Reset Challenge** — clear logs and start a fresh 60-day sprint
- **Dark / Light theme** toggle with smooth transitions

---

## 🏗 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | Server components, file-based routing |
| **Language** | TypeScript | Type safety across the entire codebase |
| **Styling** | Tailwind CSS | Utility-first CSS with custom glassmorphism system |
| **UI Primitives** | Radix UI | Accessible, unstyled dialog, checkbox, tabs, etc. |
| **Animation** | Framer Motion | Smooth page transitions, fade-ups, AnimatePresence |
| **Charts** | Recharts | Responsive SVG charts for analytics |
| **Icons** | Lucide React | Consistent icon set |
| **Persistence** | localStorage | Zero-backend, client-only state management |
| **Fonts** | Space Grotesk + Inter + JetBrains Mono | Display, body, and monospace typography |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout, providers, navbar
│   ├── page.tsx                Dashboard page (main view)
│   ├── analytics/page.tsx      Analytics page with charts
│   └── globals.css             Theme tokens, glassmorphism, scrollbar
├── components/
│   ├── ui/                     Reusable primitives (button, card, dialog, etc.)
│   ├── dashboard/              Dashboard widgets (timetable, progress ring, calendar)
│   ├── analytics/              Chart components (weekly, monthly, completion, subject)
│   ├── layout/                 Navbar, loading screen
│   └── StudyTrackerProvider    Shared app-state context
├── hooks/
│   ├── useStudyTracker.ts      Core state machine + actions + derived stats
│   └── useCurrentTime.ts       Live clock hook
└── lib/
    ├── types.ts                TypeScript interfaces
    ├── constants.ts            Default timetable, quotes, colors
    ├── storage.ts              localStorage read/write/clear
    ├── date-utils.ts           Date formatting and calculations
    ├── stats.ts                Streak, day stats, subject breakdown
    ├── badges.ts               Achievement badge evaluation
    └── csv.ts                  CSV export builder
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sanjeev-builds/Focusforge---A-studytracker-app.git
cd Focusforge---A-studytracker-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment

This app is optimized for **Vercel** (zero-config for Next.js):

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Click Deploy — live in ~60 seconds

Also compatible with Netlify, AWS Amplify, or any Node.js hosting platform.

---

## 🧠 Design Philosophy

- **Don't Break the Chain** — Streak tracking leverages the Seinfeld strategy for consistency
- **Visual Accountability** — Calendar heatmaps create guilt for red days and pride for green ones
- **Decision Fatigue Reduction** — Pre-configured timetable removes "what should I study?" paralysis
- **Micro-rewards** — Badges and completion percentages provide dopamine hits at milestones
- **Zero Friction** — No sign-up, no backend, no API keys. Open and start tracking.

---

## 📊 Data & Privacy

All data is stored in your browser's `localStorage` under the key `study-tracker:v1`.

- ✅ Persists across page refreshes and browser restarts
- ✅ No data sent to any server — fully offline capable
- ❌ Does not sync across devices or browsers
- ❌ Lost if browser data is cleared

---

## 📄 License

MIT License — feel free to fork, modify, and use for your own prep journey.

---

<p align="center">
  <strong>Built with 🔥 by <a href="https://github.com/sanjeev-builds">Sanjeev</a></strong><br>
  <em>60 days of focus can outrun 4 years of average effort.</em>
</p>
