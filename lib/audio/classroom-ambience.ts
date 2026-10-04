// Background classroom soundscape
export function startClassroomAmbience(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz Usha fan hum
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  return { osc, gain };
}
