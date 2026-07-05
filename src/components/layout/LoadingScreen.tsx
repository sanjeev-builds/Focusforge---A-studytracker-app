export function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-violet-500" />
        </div>
        <p className="font-mono-num text-sm text-muted-foreground">Loading your progress…</p>
      </div>
    </div>
  );
}
