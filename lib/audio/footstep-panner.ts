// 3D positional audio panner for teacher footstep footsteps
export function createTeacherPanner(audioCtx: AudioContext, corridorDistance: number) {
  const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
  const panValue = Math.min(Math.max((corridorDistance - 50) / 50, -1), 1);
  if (panner) panner.pan.value = panValue;
  return panner;
}
