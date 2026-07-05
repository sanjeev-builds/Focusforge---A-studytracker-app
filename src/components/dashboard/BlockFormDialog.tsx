"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StudyBlock } from "@/lib/types";

interface BlockFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block?: StudyBlock | null;
  onSave: (input: { subject: string; startTime: string; endTime: string }) => void;
}

export function BlockFormDialog({ open, onOpenChange, block, onSave }: BlockFormDialogProps) {
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSubject(block?.subject ?? "");
      setStartTime(block?.startTime ?? "09:00");
      setEndTime(block?.endTime ?? "11:00");
      setError(null);
    }
  }, [open, block]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim()) {
      setError("Give this session a subject name.");
      return;
    }
    if (startTime >= endTime) {
      setError("End time must be after start time.");
      return;
    }
    onSave({ subject: subject.trim(), startTime, endTime });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{block ? "Edit study block" : "Add a study block"}</DialogTitle>
            <DialogDescription>
              {block ? "Update the time slot or subject for this block." : "Add a new slot to today's timetable."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g. Graph Algorithms"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                autoFocus
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="startTime">Start time</Label>
                <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endTime">End time</Label>
                <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{block ? "Save changes" : "Add block"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
