// Keyboard Accessibility & Rapid Controls Hook

import { useEffect } from 'react';

interface KeyboardControlProps {
  onFlipPage: () => void;
  onResetMatch: () => void;
  onToggleSound?: () => void;
  disabled?: boolean;
}

export function useKeyboardControls({
  onFlipPage,
  onResetMatch,
  onToggleSound,
  disabled = false,
}: KeyboardControlProps) {
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        onFlipPage();
      } else if (e.key === 'r' || e.key === 'R') {
        onResetMatch();
      } else if (e.key === 'm' || e.key === 'M') {
        onToggleSound?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFlipPage, onResetMatch, onToggleSound, disabled]);
}
