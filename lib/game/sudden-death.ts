// Super-Over sudden death tiebreaker
export function evaluateSuperOverFlip(playerScore: number, opponentScore: number): string {
  if (playerScore === opponentScore) return 'TIE_CONTINUES';
  return playerScore > opponentScore ? 'PLAYER_WINS' : 'OPPONENT_WINS';
}
