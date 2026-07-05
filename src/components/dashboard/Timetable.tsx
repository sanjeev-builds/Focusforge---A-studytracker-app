"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { BlockFormDialog } from "@/components/dashboard/BlockFormDialog";
import { useTracker } from "@/components/StudyTrackerProvider";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import type { StudyBlock } from "@/lib/types";

export function Timetable() {
  const { state, todayKey, getStatus, actions } = useTracker();
  const now = useCurrentTime();

  const [formOpen, setFormOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<StudyBlock | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (!state) return null;
  const timetable = state.timetable;

  function openAdd() {
    setEditingBlock(null);
    setFormOpen(true);
  }

  function openEdit(block: StudyBlock) {
    setEditingBlock(block);
    setFormOpen(true);
  }

  function handleSave(input: { subject: string; startTime: string; endTime: string }) {
    if (editingBlock) {
      actions.updateBlock(editingBlock.id, input);
    } else {
      actions.addBlock(input);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <ListChecks className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Today&apos;s Timetable</CardTitle>
            <CardDescription>Check off each session as you complete it</CardDescription>
          </div>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="h-4 w-4" /> Add block
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {timetable.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground">
            No study blocks yet. Add your first one to start tracking today.
          </div>
        )}
        <AnimatePresence initial={false}>
          {timetable.map((block) => (
            <SessionCard
              key={block.id}
              block={block}
              status={getStatus(todayKey, block.id)}
              now={now}
              isToday
              onToggleComplete={() => actions.toggleComplete(todayKey, block)}
              onMarkSkipped={() => actions.markSkipped(todayKey, block)}
              onMarkInProgress={() => actions.markInProgress(todayKey, block)}
              onEdit={() => openEdit(block)}
              onDelete={() => setDeleteId(block.id)}
            />
          ))}
        </AnimatePresence>
      </CardContent>

      <BlockFormDialog open={formOpen} onOpenChange={setFormOpen} block={editingBlock} onSave={handleSave} />

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this study block?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from your timetable going forward. Past history stays in your analytics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) actions.deleteBlock(deleteId);
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
