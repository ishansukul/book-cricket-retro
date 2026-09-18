// Retro Scorecard Ledger & LocalStorage Match Archive

export interface MatchRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  mode: 'single' | '1v1_pass_play';
  textbookTitle: string;
  textbookCode: string;
  finalScore: number;
  wickets: number;
  ballsFaced: number;
  strikeRate: number;
  highestShot: number;
  foursCount: number;
  sixesCount: number;
  resultBadge: string;
}

const STORAGE_KEY = 'book_cricket_match_history_v1';

export function saveMatchRecord(record: Omit<MatchRecord, 'id' | 'timestamp' | 'dateStr'>): MatchRecord {
  if (typeof window === 'undefined') return { ...record, id: 'temp', timestamp: Date.now(), dateStr: '' };

  const id = `match_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const fullRecord: MatchRecord = {
    ...record,
    id,
    timestamp: Date.now(),
    dateStr
  };

  try {
    const existing = getMatchHistory();
    const updated = [fullRecord, ...existing].slice(0, 50); // Keep last 50 matches
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to persist match record to localStorage", e);
  }

  return fullRecord;
}

export function getMatchHistory(): MatchRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getCareerStats() {
  const matches = getMatchHistory();
  if (matches.length === 0) {
    return { totalMatches: 0, totalRuns: 0, highestScore: 0, averageRuns: 0, totalSixes: 0 };
  }

  const totalRuns = matches.reduce((sum, m) => sum + m.finalScore, 0);
  const highestScore = Math.max(...matches.map(m => m.finalScore));
  const totalSixes = matches.reduce((sum, m) => sum + m.sixesCount, 0);
  const averageRuns = Math.round(totalRuns / matches.length);

  return {
    totalMatches: matches.length,
    totalRuns,
    highestScore,
    averageRuns,
    totalSixes
  };
}
