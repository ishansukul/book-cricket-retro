// Wood desk tension creak effect
export function playBenchCreak(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(140, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
}
