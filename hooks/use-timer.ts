"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseTimerOptions {
  /** Total seconds for the countdown */
  duration: number;
  /** Called when timer reaches 0 */
  onExpire?: () => void;
  /** Auto-start on mount */
  autoStart?: boolean;
}

interface UseTimerReturn {
  /** Remaining seconds */
  secondsLeft: number;
  /** Progress from 1 (full) to 0 (expired) */
  progress: number;
  /** Whether the timer is currently running */
  isRunning: boolean;
  /** Start or resume the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Reset timer to initial duration */
  reset: (newDuration?: number) => void;
}

export function useTimer({
  duration,
  onExpire,
  autoStart = false,
}: UseTimerOptions): UseTimerReturn {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onExpireRef = useRef(onExpire);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep callback ref updated
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(
    (newDuration?: number) => {
      cleanup();
      setSecondsLeft(newDuration ?? duration);
      setIsRunning(false);
    },
    [duration, cleanup]
  );

  useEffect(() => {
    if (!isRunning) {
      cleanup();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          cleanup();
          setIsRunning(false);
          // Fire callback on next tick to avoid state update conflicts
          setTimeout(() => onExpireRef.current?.(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return cleanup;
  }, [isRunning, cleanup]);

  const progress = duration > 0 ? secondsLeft / duration : 0;

  return { secondsLeft, progress, isRunning, start, pause, reset };
}
