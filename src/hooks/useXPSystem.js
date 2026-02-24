import { useState, useCallback, useEffect, useRef } from "react";
import { XP_PER_LEVEL } from "../constants";

const MAX_LEVEL = 10;

function clampLevel(level) {
  return Math.max(1, Math.min(MAX_LEVEL, Number(level) || 1));
}

function getLevelFromXP(totalXP) {
  const safeXP = Math.max(0, Number(totalXP) || 0);
  let lvl = 1;
  while (lvl < MAX_LEVEL && safeXP >= (XP_PER_LEVEL[lvl] ?? Infinity)) {
    lvl += 1;
  }
  return lvl;
}

/**
 * useXPSystem
 * Manages player XP, level, and level-up notifications.
 *
 * Returns:
 *   xp          - current XP total
 *   level       - current level (1-10)
 *   addXP(pts)  - award XP and trigger level-up if threshold crossed
 *   xpPct()     - 0-100 progress % within current level
 *   xpToNext()  - XP remaining until next level
 *   levelUpData - { title, msg, emoji } when a level-up just occurred, null otherwise
 *   clearLevelUp() - dismiss the level-up overlay
 */
export function useXPSystem(initialXP = 1250, initialLevel = 8) {
  const [xp, setXP] = useState(Math.max(0, Number(initialXP) || 0));
  const [level, setLevel] = useState(clampLevel(initialLevel));
  const [levelUpData, setLevelUp] = useState(null);
  const prevLevelRef = useRef(clampLevel(initialLevel));
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    const nextXP = Math.max(0, Number(initialXP) || 0);
    const nextLevel = clampLevel(initialLevel || getLevelFromXP(nextXP));

    setXP(nextXP);
    setLevel(nextLevel);

    if (hasSyncedRef.current && nextLevel > prevLevelRef.current) {
      setLevelUp({
        title: "LEVEL UP!",
        msg: `You advanced to Level ${nextLevel}`,
        emoji: "🎉",
      });
    }

    prevLevelRef.current = nextLevel;
    hasSyncedRef.current = true;
  }, [initialXP, initialLevel]);

  const addXP = useCallback((pts) => {
    setXP((prev) => {
      const next = prev + pts;
      const nextLevel = getLevelFromXP(next);

      setLevel((currLevel) => {
        if (nextLevel > currLevel) {
          setLevelUp({
            title: "LEVEL UP!",
            msg: `You advanced to Level ${nextLevel}`,
            emoji: "🎉",
          });
        }
        prevLevelRef.current = nextLevel;
        return nextLevel;
      });

      return next;
    });
  }, []);

  const xpPct = () => {
    if (level >= MAX_LEVEL) return 100;
    const start = XP_PER_LEVEL[level - 1] ?? 0;
    const end = XP_PER_LEVEL[level] ?? start + 1000;
    return Math.min(100, Math.max(0, ((xp - start) / (end - start)) * 100));
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
