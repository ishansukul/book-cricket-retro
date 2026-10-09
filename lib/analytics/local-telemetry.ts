// Local anonymous gameplay metrics
export function recordFlipEvent(runScored: number, flipMs: number) {
  const stored = JSON.parse(localStorage.getItem('bcr_stats') || '{"runs":{}}');
  stored.runs[runScored] = (stored.runs[runScored] || 0) + 1;
  localStorage.setItem('bcr_stats', JSON.stringify(stored));
}
