// State machine for 2-player bench cricket
export type MatchState = 'TOSS' | 'INNINGS_1' | 'INNINGS_BREAK' | 'INNINGS_2' | 'MATCH_OVER';

export function nextState(current: MatchState): MatchState {
  const flow: Record<MatchState, MatchState> = {
    TOSS: 'INNINGS_1',
    INNINGS_1: 'INNINGS_BREAK',
    INNINGS_BREAK: 'INNINGS_2',
    INNINGS_2: 'MATCH_OVER',
    MATCH_OVER: 'TOSS'
  };
  return flow[current];
}
