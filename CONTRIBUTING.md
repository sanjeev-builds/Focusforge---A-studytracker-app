# Contributing to FocusForge

Thanks for your interest in contributing to FocusForge! Here's how you can help.

## 🚀 Getting Started

1. **Fork** this repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Focusforge---A-studytracker-app.git
   cd Focusforge---A-studytracker-app
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the dev server:**
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📋 How to Contribute

### Reporting Bugs
- Open an issue with the **Bug Report** template
- Include steps to reproduce, expected behavior, and screenshots if possible

### Suggesting Features
- Open an issue with the **Feature Request** template
- Describe the use case and how it would help students

### Submitting Pull Requests
1. Create a new branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Ensure the build passes: `npm run build`
4. Commit with a meaningful message: `git commit -m "feat: add your feature"`
5. Push and open a PR against `main`

## 🎨 Code Style

- **TypeScript** — all new code should be properly typed
- **Component structure** — follow the existing pattern in `src/components/`
- **Styling** — use Tailwind CSS utilities and the existing glassmorphism classes
- **State** — app state is managed via `useStudyTracker` hook with localStorage persistence

## 💡 Good First Issues

Look for issues tagged with `good-first-issue` for beginner-friendly tasks like:
- Adding new motivational quotes
- Creating new achievement badges
- Improving mobile responsiveness
- Adding accessibility improvements

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
