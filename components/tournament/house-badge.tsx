import React from 'react';

export function HouseCaptainBadge({ houseName }: { houseName: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-800 text-amber-950 text-xs font-bold rounded-full shadow-sm">
      ⭐ Captain: {houseName}
    </div>
  );
}
