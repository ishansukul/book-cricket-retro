// Riffle vibration flutter during high-speed flips
export function emitRiffleTick() {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(8);
  }
}
