// P2P Match room coordination types
export interface PeerMatchRoom {
  roomId: string;
  hostName: string;
  currentInnings: 1 | 2;
  targetRuns: number;
}
