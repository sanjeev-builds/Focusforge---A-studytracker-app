"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Shuffle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { MOTIVATIONAL_QUOTES } from "@/lib/constants";

export function MotivationCard() {
  const { dailyQuote } = useTracker();
  const [override, setOverride] = useState<string | null>(null);
  const quote = override ?? dailyQuote;

  function shuffle() {
    let next = quote;
    while (next === quote) {
      next = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    }
    setOverride(next);
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
      <CardContent className="relative flex items-start gap-4 p-5 sm:p-6">
        <Quote className="h-7 w-7 shrink-0 text-violet-400/70" />
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-display text-base font-medium leading-snug text-foreground/90 sm:text-lg"
            >
              &ldquo;{quote}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          onClick={shuffle}
          aria-label="Shuffle quote"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <Shuffle className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
