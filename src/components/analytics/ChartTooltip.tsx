"use client";

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  unit?: string;
  payload?: Array<{ value: number | string; name: string; color?: string; payload?: Record<string, unknown> }>;
}

export function ChartTooltip({ active, label, payload, unit = "" }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="glass-panel-strong rounded-lg px-3 py-2 text-xs shadow-xl">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color ?? "#8b5cf6" }} />
          {p.name}: <span className="font-semibold text-foreground">{p.value}{unit}</span>
        </p>
      ))}
    </div>
  );
}
