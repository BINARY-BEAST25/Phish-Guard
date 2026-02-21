import { useState, useCallback } from "react";
import { XP_PER_LEVEL } from "../constants";

const MAX_LEVEL = 10;

function levelFromXP(totalXP) {
  let resolvedLevel = 1;
  while (resolvedLevel < MAX_LEVEL && totalXP >= (XP_PER_LEVEL[resolvedLevel] ?? Infinity)) {
    resolvedLevel += 1;
  }
  return resolvedLevel;
}

/**
 * useXPSystem
 * Manages player XP, level, and level-up notifications.
 */
export function useXPSystem(initialXP = 1250, initialLevel = 8) {
  const [xp, setXP] = useState(initialXP);
  const [level, setLevel] = useState(initialLevel);
  const [levelUpData, setLevelUp] = useState(null);

  const addXP = useCallback((pts) => {
    setXP((prev) => {
      const next = Math.max(0, prev + pts);
      const computedLevel = levelFromXP(next);

      setLevel((prevLevel) => {
        if (computedLevel > prevLevel) {
          setLevelUp({
            title: "LEVEL UP!",
            msg: `You advanced to Level ${computedLevel}`,
            emoji: "!",
          });
        }
        return computedLevel;
      });

      return next;
    });
  }, []);

  const xpPct = () => {
    if (level >= MAX_LEVEL) return 100;
    const start = XP_PER_LEVEL[level - 1] ?? 0;
    const end = XP_PER_LEVEL[level] ?? start + 1000;
    const range = Math.max(1, end - start);
    const rawPct = ((xp - start) / range) * 100;
    return Math.min(100, Math.max(0, rawPct));
  };

  const xpToNext = () => {
    if (level >= MAX_LEVEL) return 0;
    const end = XP_PER_LEVEL[level] ?? xp + 1000;
    return Math.max(0, end - xp);
  };

  return {
    xp,
    level,
    addXP,
    xpPct,
    xpToNext,
    levelUpData,
    clearLevelUp: () => setLevelUp(null),
  };
}
