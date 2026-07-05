"use client";

import { useId } from "react";
import { motion } from "framer-motion";

interface ProgressRingProps {
  completed: number;
  total: number;
  percent: number;
  size?: number;
}

export function ProgressRing({ completed, total, percent, size = 200 }: ProgressRingProps) {
  const gradientId = useId();
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-white/10"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={`${completed}-${total}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-mono-num text-4xl font-bold tabular-nums"
        >
          {completed}
          <span className="text-lg text-muted-foreground">/{total}</span>
        </motion.span>
        <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Sessions done
        </span>
        <span className="mt-2 rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-gradient-aurora">
          {percent}%
        </span>
      </div>
    </div>
  );
}
