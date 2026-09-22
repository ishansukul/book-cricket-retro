// Super Over Recess Cup Knockout Tournament Engine

export interface AICompetitor {
  id: string;
  name: string;
  archetype: string;
  targetRuns: number;
  avatarEmoji: string;
  taunt: string;
}

export const TOURNAMENT_OPPONENTS: AICompetitor[] = [
  {
    id: "bunty",
    name: "Bunty",
    archetype: "Last Bench Slogger",
    targetRuns: 18,
    avatarEmoji: "🧢",
    taunt: "Dekhte hain tu mere 18 runs cross kar pata hai ya nahi!"
  },
  {
    id: "rohan",
    name: "Rohan",
    archetype: "Front Bench Calculator",
    targetRuns: 28,
    avatarEmoji: "👓",
    taunt: "I calculated your average strike rate. You won't chase this."
  },
  {
    id: "kabir",
    name: "Kabir",
    archetype: "Sports Captain",
    targetRuns: 36,
    avatarEmoji: "🏏",
    taunt: "State level trials chal rahe hain, let's see your footwork."
  },
  {
    id: "sharma_sir",
    name: "Sharma Sir",
    archetype: "Maths Teacher (Final Boss)",
    targetRuns: 44,
    avatarEmoji: "👨‍🏫",
    taunt: "Homework ho gaya? Now chase 44 in 6 balls if you dare."
  }
];

export interface TournamentState {
  currentRound: number; // 0 to 3
  isWon: boolean;
  isKnockedOut: boolean;
}

export function getOpponentForRound(round: number): AICompetitor {
  return TOURNAMENT_OPPONENTS[Math.min(round, TOURNAMENT_OPPONENTS.length - 1)];
}
