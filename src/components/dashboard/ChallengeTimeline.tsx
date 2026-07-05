"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTracker } from "@/components/StudyTrackerProvider";
import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";

const NODE_COLOR: Record<string, string> = {
  completed: "bg-success shadow-[0_0_10px_2px_rgba(34,197,94,0.55)]",
  partial: "bg-warning shadow-[0_0_10px_2px_rgba(245,158,11,0.5)]",
  missed: "bg-destructive/80",
  future: "bg-white/10",
  empty: "bg-white/10",
};

export function ChallengeTimeline() {
  const { challengeTimeline, dayNumber, challengeLength } = useTracker();
  const percent = Math.round((dayNumber / challengeLength) * 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>The Sprint Line</CardTitle>
            <CardDescription>Day {dayNumber} of {challengeLength} · {percent}% through the roadmap</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={percent} className="mb-6" />

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {challengeTimeline.map((d) => (
            <motion.div
              key={d.date}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: Math.min(d.dayNum * 0.006, 0.4) }}
              className="flex shrink-0 flex-col items-center gap-1.5"
              title={`Day ${d.dayNum}`}
            >
              <span
                className={cn(
                  "h-3 w-3 rounded-full transition-transform",
                  NODE_COLOR[d.color],
                  d.dayNum === dayNumber && "scale-[1.6] ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
              />
              {(d.dayNum === 1 || d.dayNum % 10 === 0 || d.dayNum === challengeLength) && (
                <span className="text-[10px] font-medium text-muted-foreground">{d.dayNum}</span>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
