"use client";

import { motion } from "framer-motion";
import { Award, Crown, Flame, MapPin, Sparkles, Trophy, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTracker } from "@/components/StudyTrackerProvider";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Flame,
  Trophy,
  MapPin,
  Crown,
};

export function AchievementBadges() {
  const { badges } = useTracker();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <Award className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones you unlock by staying consistent</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge, i) => {
            const Icon = ICONS[badge.icon] ?? Sparkles;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                title={badge.description}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all",
                  badge.unlocked
                    ? "border-violet-500/30 bg-gradient-to-b from-violet-500/15 to-blue-500/5"
                    : "border-white/5 bg-white/[0.02] opacity-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    badge.unlocked ? "bg-gradient-to-br from-violet-500 to-cobalt-500 text-white" : "bg-white/5 text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold leading-tight">{badge.title}</span>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
