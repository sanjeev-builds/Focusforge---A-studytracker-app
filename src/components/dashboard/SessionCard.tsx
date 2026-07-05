"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Hourglass, Pencil, Trash2, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatTimeRange, isNowWithinRange } from "@/lib/date-utils";
import type { SessionStatus, StudyBlock } from "@/lib/types";
import { SUBJECT_COLOR_HEX } from "@/lib/constants";

interface SessionCardProps {
  block: StudyBlock;
  status: SessionStatus;
  now: Date | null;
  isToday: boolean;
  onToggleComplete: () => void;
  onMarkSkipped: () => void;
  onMarkInProgress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const STATUS_META: Record<SessionStatus, { label: string; icon: typeof CheckCircle2; badgeVariant: "secondary" | "success" | "destructive" | "warning" }> = {
  pending: { label: "Pending", icon: Circle, badgeVariant: "secondary" },
  "in-progress": { label: "In Progress", icon: Hourglass, badgeVariant: "warning" },
  completed: { label: "Completed", icon: CheckCircle2, badgeVariant: "success" },
  skipped: { label: "Skipped", icon: XCircle, badgeVariant: "destructive" },
};

export function SessionCard({
  block,
  status,
  now,
  isToday,
  onToggleComplete,
  onMarkSkipped,
  onMarkInProgress,
  onEdit,
  onDelete,
}: SessionCardProps) {
  const meta = STATUS_META[status];
  const isLiveNow = isToday && !!now && isNowWithinRange(block.startTime, block.endTime, now) && status === "pending";
  const accentHex = SUBJECT_COLOR_HEX[block.color] ?? SUBJECT_COLOR_HEX.violet;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={cn(
        "glass-panel relative flex flex-col gap-4 overflow-hidden rounded-2xl p-4 transition-shadow sm:flex-row sm:items-center sm:justify-between sm:p-5",
        status === "completed" && "glow-border-success",
        status === "skipped" && "glow-border-destructive"
      )}
    >
      <span
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: accentHex }}
        aria-hidden
      />

      <div className="flex items-start gap-3 pl-2 sm:items-center">
        <Checkbox
          checked={status === "completed"}
          onCheckedChange={onToggleComplete}
          aria-label={`Mark ${block.subject} complete`}
          className="mt-0.5 sm:mt-0"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold sm:text-lg">{block.subject}</h3>
            {isLiveNow && (
              <span className="flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" /> Live now
              </span>
            )}
          </div>
          <p className="font-mono-num text-sm text-muted-foreground">{formatTimeRange(block.startTime, block.endTime)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pl-8 sm:justify-end sm:gap-3 sm:pl-0">
        <Badge variant={meta.badgeVariant} className="gap-1">
          <meta.icon className="h-3 w-3" />
          {meta.label}
        </Badge>

        <div className="flex items-center gap-1">
          <button
            onClick={onMarkInProgress}
            aria-label="Mark in progress"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-warning/15 hover:text-warning",
              status === "in-progress" && "bg-warning/15 text-warning"
            )}
          >
            <Hourglass className="h-4 w-4" />
          </button>
          <button
            onClick={onMarkSkipped}
            aria-label="Mark skipped"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive",
              status === "skipped" && "bg-destructive/15 text-destructive"
            )}
          >
            <XCircle className="h-4 w-4" />
          </button>
          <button
            onClick={onEdit}
            aria-label="Edit session"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete session"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
