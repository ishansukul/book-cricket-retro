// Authentic Indian Classroom Wooden Desk Graffiti Layer

import React from 'react';

export const DeskGraffitiOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 select-none">
      {/* FLAMES carving */}
      <div className="absolute top-4 left-6 rotate-[-6deg] text-[11px] font-mono text-amber-900/60 border border-amber-900/40 p-1 rounded">
        <span>F - L - A - M - E - S</span>
        <div className="text-[9px] text-amber-900/40 line-through">P + R = Friends</div>
      </div>

      {/* Natraj compass puncture marks */}
      <div className="absolute bottom-8 right-12 flex space-x-1">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-950/70 shadow-inner" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-950/70 shadow-inner" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-950/70 shadow-inner" />
      </div>

      {/* Legendary cricket score scratch */}
      <div className="absolute top-1/2 right-4 rotate-12 text-[10px] font-mono text-amber-900/50">
        <span>"MSD 183* vs SL"</span>
      </div>

      {/* Bench owner scratch */}
      <div className="absolute bottom-4 left-8 text-[9px] font-serif text-amber-900/40 italic">
        Section X-B Boys Bench #4
      </div>
    </div>
  );
};
