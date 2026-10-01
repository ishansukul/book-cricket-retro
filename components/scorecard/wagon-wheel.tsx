import React from 'react';

export function PencilWagonWheel({ scores }: { scores: number[] }) {
  const boundaries = scores.filter(s => s === 4 || s === 6).length;
  return (
    <div className="flex flex-col items-center p-3 font-mono text-xs text-amber-950">
      <div className="border border-dashed border-amber-900/40 p-2 rounded-full">
        🏏 Boundaries Hit: {boundaries} / {scores.length}
      </div>
    </div>
  );
}
