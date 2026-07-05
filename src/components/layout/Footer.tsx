"use client";

import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-white/5 py-6">
      <div className="container flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {year} FocusForge. Built for the grind.
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Made with <Heart className="h-3 w-3 text-rose-400" fill="currentColor" /> by{" "}
          <a
            href="https://github.com/sanjeev-builds"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-violet-400 hover:text-violet-300 transition-colors"
          >
            Sanjeev
          </a>
        </p>
      </div>
    </footer>
  );
}
