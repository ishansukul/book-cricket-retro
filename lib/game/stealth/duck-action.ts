// Quick-reaction bench ducking mechanics
export function handleDuckUnderDesk(teacherAlertLevel: number): { escaped: boolean; penaltyRuns: number } {
  if (teacherAlertLevel > 90) {
    return { escaped: false, penaltyRuns: 5 }; // Caught standing up
  }
  return { escaped: true, penaltyRuns: 0 };
}
