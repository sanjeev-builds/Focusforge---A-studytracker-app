"use client";

import { useEffect, useState } from "react";

/** Returns the current Date, re-rendering every second. Starts null on the server. */
export function useCurrentTime(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
