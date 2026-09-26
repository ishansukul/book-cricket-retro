// Multi-touch thumb drag velocity tracking
export function computeRiffleMomentum(dragDistances: number[], timeDeltas: number[]): number {
  if (dragDistances.length < 2) return 0;
  const recentD = dragDistances.slice(-3);
  const recentT = timeDeltas.slice(-3);
  const totalD = recentD.reduce((a, b) => a + b, 0);
  const totalT = recentT.reduce((a, b) => a + b, 0) || 1;
  return Math.min(Math.max(totalD / totalT, 0.2), 3.5);
}
