import React from 'react';

export function InkBlotOverlay({ pageNumber }: { pageNumber: number }) {
  if (pageNumber % 7 !== 0) return null;
  return (
    <div className="pointer-events-none absolute bottom-4 right-6 opacity-35 mix-blend-multiply">
      <svg width="40" height="40" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="28" fill="#1c2d5a" filter="url(#blurFilter)" />
      </svg>
    </div>
  );
}
