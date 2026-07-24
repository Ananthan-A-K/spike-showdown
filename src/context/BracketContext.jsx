import React, { createContext, useContext, useState, useEffect } from 'react';

const BracketContext = createContext();

const STORAGE_KEY = 'spike_bracket_state_v2';

// Initial default state for 19 Teams tournament with IPL Format Playoffs
const INITIAL_BRACKET_STATE = {
  round1: [
    { id: 1, team1: 'S7', team2: 'Xcentrix', score1: null, score2: null, winner: null, defaultLabel: 'WINNER A' },
    { id: 2, team1: 'DMR', team2: 'Warriors', score1: null, score2: null, winner: null, defaultLabel: 'WINNER B' },
    { id: 3, team1: 'JMP', team2: 'Rogue', score1: null, score2: null, winner: null, defaultLabel: 'WINNER C' },
    { id: 4, team1: 'TPA', team2: 'W Squad', score1: null, score2: null, winner: null, defaultLabel: 'WINNER D' },
    { id: 5, team1: 'Error', team2: 'El Cincoo', score1: null, score2: null, winner: null, defaultLabel: 'WINNER E' },
    { id: 6, team1: 'Defenders', team2: 'Kidiloski Ronin', score1: null, score2: null, winner: null, defaultLabel: 'WINNER F' },
    { id: 7, team1: 'Expandables', team2: 'Blaze', score1: null, score2: null, winner: null, defaultLabel: 'WINNER G' },
    { id: 8, team1: 'DMatrix', team2: 'Queen', score1: null, score2: null, winner: null, defaultLabel: 'WINNER H' },
    { id: 9, team1: '4DXB', team2: 'Legion', score1: null, score2: null, winner: null, defaultLabel: 'WINNER I' },
  ],
  round2: [
    { id: 10, team1: '4DX', team2Ref: 1, score1: null, score2: null, winner: null, defaultLabel: 'WINNER 1' },
    { id: 11, team1Ref: 2, team2Ref: 3, score1: null, score2: null, winner: null, defaultLabel: 'WINNER 2' },
    { id: 12, team1Ref: 4, team2Ref: 5, score1: null, score2: null, winner: null, defaultLabel: 'WINNER 3' },
    { id: 13, team1Ref: 6, team2Ref: 7, score1: null, score2: null, winner: null, defaultLabel: 'WINNER 4' },
    { id: 14, team1Ref: 8, team2Ref: 9, score1: null, score2: null, winner: null, defaultLabel: 'WINNER 5' },
  ],
  round3Fixtures: [
    { id: 1, team1Ref: 10, team2Ref: 11, score1: null, score2: null, winner: null },
    { id: 2, team1Ref: 12, team2Ref: 13, score1: null, score2: null, winner: null },
    { id: 3, team1Ref: 14, team2Ref: 10, score1: null, score2: null, winner: null },
    { id: 4, team1Ref: 11, team2Ref: 12, score1: null, score2: null, winner: null },
    { id: 5, team1Ref: 13, team2Ref: 14, score1: null, score2: null, winner: null },
  ],
  playoffs: {
    qualifier1: { score1: null, score2: null, winner: null, loser: null },
    eliminator: { score1: null, score2: null, winner: null, loser: null },
    qualifier2: { score1: null, score2: null, winner: null, loser: null },
    grandFinal: { score1: null, score2: null, winner: null, loser: null },
  },
};

// Demo sample data for quick testing
const DEMO_BRACKET_STATE = {
  round1: [
    { id: 1, team1: 'S7', team2: 'Xcentrix', score1: 2, score2: 0, winner: 'S7', defaultLabel: 'WINNER A' },
    { id: 2, team1: 'DMR', team2: 'Warriors', score1: 2, score2: 1, winner: 'DMR', defaultLabel: 'WINNER B' },
    { id: 3, team1: 'JMP', team2: 'Rogue', score1: 0, score2: 2, winner: 'Rogue', defaultLabel: 'WINNER C' },
    { id: 4, team1: 'TPA', team2: 'W Squad', score1: 2, score2: 0, winner: 'TPA', defaultLabel: 'WINNER D' },
    { id: 5, team1: 'Error', team2: 'El Cincoo', score1: 1, score2: 2, winner: 'El Cincoo', defaultLabel: 'WINNER E' },
    { id: 6, team1: 'Defenders', team2: 'Kidiloski Ronin', score1: 2, score2: 1, winner: 'Defenders', defaultLabel: 'WINNER F' },
    { id: 7, team1: 'Expandables', team2: 'Blaze', score1: 0, score2: 2, winner: 'Blaze', defaultLabel: 'WINNER G' },
    { id: 8, team1: 'DMatrix', team2: 'Queen', score1: 2, score2: 0, winner: 'DMatrix', defaultLabel: 'WINNER H' },
    { id: 9, team1: '4DXB', team2: 'Legion', score1: 1, score2: 2, winner: 'Legion', defaultLabel: 'WINNER I' },
  ],
  round2: [
    { id: 10, team1: '4DX', team2Ref: 1, score1: 2, score2: 1, winner: '4DX', defaultLabel: 'WINNER 1' },
    { id: 11, team1Ref: 2, team2Ref: 3, score1: 2, score2: 0, winner: 'DMR', defaultLabel: 'WINNER 2' },
    { id: 12, team1Ref: 4, team2Ref: 5, score1: 2, score2: 1, winner: 'TPA', defaultLabel: 'WINNER 3' },
    { id: 13, team1Ref: 6, team2Ref: 7, score1: 0, score2: 2, winner: 'Blaze', defaultLabel: 'WINNER 4' },
    { id: 14, team1Ref: 8, team2Ref: 9, score1: 2, score2: 1, winner: 'DMatrix', defaultLabel: 'WINNER 5' },
  ],
  round3Fixtures: [
    { id: 1, team1Ref: 10, team2Ref: 11, score1: 13, score2: 9, winner: '4DX' },
    { id: 2, team1Ref: 12, team2Ref: 13, score1: 13, score2: 11, winner: 'TPA' },
    { id: 3, team1Ref: 14, team2Ref: 10, score1: 13, score2: 10, winner: 'DMatrix' },
    { id: 4, team1Ref: 11, team2Ref: 12, score1: 13, score2: 8, winner: 'DMR' },
    { id: 5, team1Ref: 13, team2Ref: 14, score1: 11, score2: 13, winner: 'DMatrix' },
  ],
  playoffs: {
    qualifier1: { score1: 2, score2: 1, winner: 'DMatrix', loser: '4DX' },
    eliminator: { score1: 2, score2: 0, winner: 'TPA', loser: 'DMR' },
    qualifier2: { score1: 2, score2: 1, winner: '4DX', loser: 'TPA' },
    grandFinal: { score1: 2, score2: 1, winner: 'DMatrix', loser: '4DX' },
  },
};

export function BracketProvider({ children }) {
  const [bracketState, setBracketState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_BRACKET_STATE;
    } catch (e) {
      console.error('Failed to parse saved bracket state', e);
      return INITIAL_BRACKET_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bracketState));
    } catch (e) {
      console.error('Failed to save bracket state', e);
    }
  }, [bracketState]);

  // Helper: Get winner name of a Round 1 match by ID
  const getR1WinnerName = (matchId) => {
    const match = bracketState.round1.find((m) => m.id === matchId);
    return match?.winner || match?.defaultLabel || `WINNER ${matchId}`;
  };

  // Helper: Get team name in Round 2 match
  const getR2TeamName = (match, teamNum) => {
    if (teamNum === 1) {
      if (match.team1) return match.team1;
      return getR1WinnerName(match.team1Ref);
    } else {
      if (match.team2) return match.team2;
      return getR1WinnerName(match.team2Ref);
    }
  };

  // Helper: Get winner name of Round 2 match by ID
  const getR2WinnerName = (matchId) => {
    const match = bracketState.round2.find((m) => m.id === matchId);
    return match?.winner || match?.defaultLabel || `WINNER ${matchId - 9}`;
  };

  // Helper: Get Round 3 fixture team name
  const getR3TeamName = (fixture, teamNum) => {
    const r2Id = teamNum === 1 ? fixture.team1Ref : fixture.team2Ref;
    return getR2WinnerName(r2Id);
  };

  // Calculate Round 3 League Standings automatically
  const calculateStandings = () => {
    const teamsMap = {};
    [10, 11, 12, 13, 14].forEach((r2Id) => {
      const name = getR2WinnerName(r2Id);
      teamsMap[name] = { name, played: 0, wins: 0, losses: 0, roundDiff: 0, pts: 0, r2Id };
    });

    bracketState.round3Fixtures.forEach((f) => {
      if (f.winner) {
        const t1 = getR3TeamName(f, 1);
        const t2 = getR3TeamName(f, 2);

        if (!teamsMap[t1]) teamsMap[t1] = { name: t1, played: 0, wins: 0, losses: 0, roundDiff: 0, pts: 0 };
        if (!teamsMap[t2]) teamsMap[t2] = { name: t2, played: 0, wins: 0, losses: 0, roundDiff: 0, pts: 0 };

        teamsMap[t1].played += 1;
        teamsMap[t2].played += 1;

        const s1 = parseInt(f.score1) || 0;
        const s2 = parseInt(f.score2) || 0;

        teamsMap[t1].roundDiff += (s1 - s2);
        teamsMap[t2].roundDiff += (s2 - s1);

        if (f.winner === t1) {
          teamsMap[t1].wins += 1;
          teamsMap[t1].pts += 3;
          teamsMap[t2].losses += 1;
        } else if (f.winner === t2) {
          teamsMap[t2].wins += 1;
          teamsMap[t2].pts += 3;
          teamsMap[t1].losses += 1;
        }
      }
    });

    const sorted = Object.values(teamsMap).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.roundDiff - a.roundDiff;
    });

    return sorted;
  };

  const standings = calculateStandings();

  // IPL Format Playoff Seeding
  const seed1Name = standings[0]?.name || 'SEED #1';
  const seed2Name = standings[1]?.name || 'SEED #2';
  const seed3Name = standings[3] ? standings[2]?.name : 'SEED #3';
  const seed4Name = standings[3]?.name || 'SEED #4';

  // IPL Dynamic Match Teams
  // Qualifier 1: Seed #1 vs Seed #2
  const q1Winner = bracketState.playoffs.qualifier1?.winner || 'WINNER Q1';
  const q1Loser  = bracketState.playoffs.qualifier1?.loser  || 'LOSER Q1';

  // Eliminator: Seed #3 vs Seed #4
  const elimWinner = bracketState.playoffs.eliminator?.winner || 'WINNER ELIMINATOR';
  const elimLoser  = bracketState.playoffs.eliminator?.loser  || 'LOSER ELIMINATOR (4TH)';

  // Qualifier 2: Loser Q1 vs Winner Eliminator
  const q2Winner = bracketState.playoffs.qualifier2?.winner || 'WINNER Q2';
  const q2Loser  = bracketState.playoffs.qualifier2?.loser  || 'LOSER Q2 (3RD PLACE)';

  // Grand Final: Winner Q1 vs Winner Q2
  const championWinner = bracketState.playoffs.grandFinal?.winner || 'CHAMPION';
  const runnerUpName   = bracketState.playoffs.grandFinal?.loser  || 'RUNNER UP';

  // State Mutators
  const updateR1Match = (id, score1, score2, winner) => {
    setBracketState((prev) => ({
      ...prev,
      round1: prev.round1.map((m) => (m.id === id ? { ...m, score1, score2, winner } : m)),
    }));
  };

  const updateR2Match = (id, score1, score2, winner) => {
    setBracketState((prev) => ({
      ...prev,
      round2: prev.round2.map((m) => (m.id === id ? { ...m, score1, score2, winner } : m)),
    }));
  };

  const updateR3Fixture = (id, score1, score2, winner) => {
    setBracketState((prev) => ({
      ...prev,
      round3Fixtures: prev.round3Fixtures.map((f) => (f.id === id ? { ...f, score1, score2, winner } : f)),
    }));
  };

  const updatePlayoffMatch = (matchKey, score1, score2, winner, loser = null) => {
    setBracketState((prev) => ({
      ...prev,
      playoffs: {
        ...prev.playoffs,
        [matchKey]: { score1, score2, winner, loser },
      },
    }));
  };

  const resetBracket = () => {
    setBracketState(INITIAL_BRACKET_STATE);
  };

  const loadDemoData = () => {
    setBracketState(DEMO_BRACKET_STATE);
  };

  return (
    <BracketContext.Provider
      value={{
        bracketState,
        getR1WinnerName,
        getR2TeamName,
        getR2WinnerName,
        getR3TeamName,
        standings,
        seed1Name,
        seed2Name,
        seed3Name,
        seed4Name,
        q1Winner,
        q1Loser,
        elimWinner,
        elimLoser,
        q2Winner,
        q2Loser,
        championWinner,
        runnerUpName,
        updateR1Match,
        updateR2Match,
        updateR3Fixture,
        updatePlayoffMatch,
        resetBracket,
        loadDemoData,
      }}
    >
      {children}
    </BracketContext.Provider>
  );
}

export function useBracket() {
  const context = useContext(BracketContext);
  if (!context) {
    throw new Error('useBracket must be used within a BracketProvider');
  }
  return context;
}
