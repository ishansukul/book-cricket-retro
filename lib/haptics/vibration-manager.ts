// Tactile mobile haptic feedback engine
export function triggerHaptic(type: 'four' | 'six' | 'out' | 'dot') {
  if (typeof window === 'undefined' || !navigator.vibrate) return;
  switch (type) {
    case 'four': navigator.vibrate([40, 60, 40]); break;
    case 'six': navigator.vibrate([60, 80, 80, 100]); break;
    case 'out': navigator.vibrate([150, 50, 200]); break;
    case 'dot': navigator.vibrate(15); break;
  }
}
