import React from 'react';

export function ScreenReaderScore({ lastScore, total }: { lastScore: number; total: number }) {
  return (
    <div className="sr-only" aria-live="polite">
      Scored {lastScore} runs. Total team score is now {total}.
    </div>
  );
}
