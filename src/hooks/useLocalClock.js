import { useEffect, useState } from "react";

/** Updates every second; `Date` uses the viewer's OS timezone. */
export default function useLocalClock(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
