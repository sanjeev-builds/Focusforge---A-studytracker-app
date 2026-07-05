"use client";

import { Download, RotateCcw, Settings2 } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTracker } from "@/components/StudyTrackerProvider";
import { buildProgressCSV, downloadCSV } from "@/lib/csv";

export function DataControlsCard() {
  const { state, actions } = useTracker();

  function handleExport() {
    if (!state) return;
    const csv = buildProgressCSV(state);
    const filename = `study-tracker-progress-${state.settings.startDate}.csv`;
    downloadCSV(filename, csv);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-violet-300">
            <Settings2 className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>Data &amp; Challenge Controls</CardTitle>
            <CardDescription>Export your history or start a fresh sprint</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" onClick={handleExport} className="flex-1">
          <Download className="h-4 w-4" /> Export progress as CSV
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4" /> Reset challenge
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset your 60-day challenge?</AlertDialogTitle>
              <AlertDialogDescription>
                This clears all logged sessions and streaks and restarts Day 1 from today. Your timetable
                setup and daily goal are kept. This can&apos;t be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={actions.resetChallenge}>Reset challenge</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
