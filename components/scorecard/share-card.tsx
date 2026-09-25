// Shareable Retro Handwritten Scorecard Component

import React from 'react';
import { Share2, Trophy } from 'lucide-react';

interface ShareCardProps {
  playerName: string;
  totalScore: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  textbookName: string;
}

export const RetroShareCard: React.FC<ShareCardProps> = ({
  playerName,
  totalScore,
  ballsFaced,
  fours,
  sixes,
  textbookName
}) => {
  const strikeRate = ballsFaced > 0 ? ((totalScore / ballsFaced) * 100).toFixed(1) : "0.0";

  const handleShare = () => {
    const text = `🏏 Just scored ${totalScore} (${ballsFaced} balls, SR: ${strikeRate}) in Book Cricket Retro using ${textbookName}! Can you beat my high score? Play here: https://github.com/ishansukul/book-cricket-retro`;
    if (navigator.share) {
      navigator.share({ title: 'Book Cricket High Score', text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Scorecard copied to clipboard! Share on WhatsApp!");
    }
  };

  return (
    <div className="bg-[#FFFBEB] text-[#78350F] p-4 rounded-md border-2 border-dashed border-[#D97706] shadow-md font-mono text-sm max-w-sm mx-auto">
      <div className="text-center font-bold border-b border-[#D97706]/40 pb-2 mb-2 flex items-center justify-center space-x-1">
        <Trophy className="w-4 h-4 text-[#D97706]" />
        <span>OFFICIAL RECESS SCORECARD</span>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between"><span>Player:</span><span className="font-bold">{playerName || "Class X-B Legend"}</span></div>
        <div className="flex justify-between"><span>Textbook:</span><span>{textbookName}</span></div>
        <div className="flex justify-between"><span>Runs:</span><span className="font-bold text-base text-[#9A3412]">{totalScore}</span></div>
        <div className="flex justify-between"><span>Balls:</span><span>{ballsFaced} (SR: {strikeRate})</span></div>
        <div className="flex justify-between"><span>Boundaries:</span><span>4s: {fours} | 6s: {sixes}</span></div>
      </div>
      <button 
        onClick={handleShare}
        className="mt-3 w-full flex items-center justify-center space-x-1.5 bg-[#D97706] hover:bg-[#B45309] text-white py-1.5 px-3 rounded text-xs font-sans transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>Share Recess Scorecard</span>
      </button>
    </div>
  );
};
