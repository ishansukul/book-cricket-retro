// Boundary streak multiplier calculator
export function calculateStreakBonus(currentStreak: number): number {
  if (currentStreak >= 4) return 2.5; // On fire!
  if (currentStreak >= 2) return 1.5;
  return 1.0;
}
