export const LEVEL_THRESHOLDS = [0, 30, 100, 250, 500];

export function getLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getLevelProgress(xp: number): { current: number; needed: number; progress: number } {
  const level = getLevel(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  if (level >= LEVEL_THRESHOLDS.length) return { current: xp, needed: nextThreshold, progress: 1 };
  const progress = (xp - currentThreshold) / (nextThreshold - currentThreshold);
  return { current: xp, needed: nextThreshold, progress: Math.min(progress, 1) };
}

export function getLevelDiamonds(level: number): string {
  return Array.from({ length: 5 }, (_, i) => (i < level ? "\u25C6" : "\u25C7")).join("");
}
