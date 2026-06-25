import React, { createContext, useState, useEffect } from 'react';

export const TournamentContext = createContext();

const DEFAULT_ANNOUNCEMENTS = [
  { id: '1', text: '🏆 SPIKE SHOWDOWN REGISTRATIONS ARE NOW OPEN! PRIZE POOL OF $10,000!', type: 'info', date: '2026-06-25' },
  { id: '2', text: '🚨 TEAM REGISTRATION CLOSES IN 2 DAYS! GET YOUR ROSTER SUBMITTED!', type: 'warning', date: '2026-06-24' },
  { id: '3', text: '🎮 LIVE STAGE MATCH: G2 vs HERETICS IS CURRENTLY ON AIR! WATCH NOW!', type: 'alert', date: '2026-06-25' }
];

const DEFAULT_TEAMS = [
  {
    id: 't1',
    name: 'Sentinels',
    logo: '🟥',
    captain: { name: 'Tyson "TenZ" Ngo', email: 'tenz@sentinels.gg', discord: 'TenZ#0001', riotId: 'TenZ#SEN' },
    players: ['Zellsis#SEN', 'Sacy#SEN', 'johnqt#SEN', 'Zekken#SEN'],
    status: 'Approved',
    registeredAt: '2026-06-20'
  },
  {
    id: 't2',
    name: 'Fnatic',
    logo: '🟧',
    captain: { name: 'Jake "Boaster" Howlett', email: 'boaster@fnatic.com', discord: 'Boaster#1234', riotId: 'Boaster#FNC' },
    players: ['Derke#FNC', 'Alfajer#FNC', 'Chronicle#FNC', 'Leo#FNC'],
    status: 'Approved',
    registeredAt: '2026-06-21'
  },
  {
    id: 't3',
    name: 'Paper Rex',
    logo: '🟪',
    captain: { name: 'Jason "f0rsakeN" Susanto', email: 'forsaken@prx.gg', discord: 'f0rsakeN#7777', riotId: 'f0rsakeN#PRX' },
    players: ['mindfreak#PRX', 'd4v41#PRX', 'something#PRX', 'Jinggg#PRX'],
    status: 'Approved',
    registeredAt: '2026-06-22'
  },
  {
    id: 't4',
    name: 'Evil Geniuses',
    logo: '🟦',
    captain: { name: 'Christine "Potter" Chi', email: 'potter@eg.gg', discord: 'Potter#9876', riotId: 'Potter#EG1' },
    players: ['Jawgemo#EG', 'Apoth#EG', 'Derrek#EG', 'supamen#EG'],
    status: 'Approved',
    registeredAt: '2026-06-22'
  },
  {
    id: 't5',
    name: 'Team Vitality',
    logo: '🟨',
    captain: { name: 'Jokūbas "ceNder" Labutis', email: 'cender@vitality.gg', discord: 'ceNder#8888', riotId: 'ceNder#VIT' },
    players: ['Sayf#VIT', 'Kicks#VIT', 'trexx#VIT', 'runneR#VIT'],
    status: 'Approved',
    registeredAt: '2026-06-23'
  },
  {
    id: 't6',
    name: 'FUT Esports',
    logo: '🟥',
    captain: { name: 'Furkan "MrFaliN" Yeğen', email: 'mrfalin@fut.gg', discord: 'MrFaliN#0909', riotId: 'MrFaliN#FUT' },
    players: ['qRaxs#FUT', 'yetujey#FUT', 'cNed#FUT', 'ATAKAPTAN#FUT'],
    status: 'Approved',
    registeredAt: '2026-06-23'
  },
  // Pending approvals
  {
    id: 't7',
    name: 'G2 Esports',
    logo: '⬜',
    captain: { name: 'Jacob "valyn" Batio', email: 'valyn@g2.gg', discord: 'valyn#0002', riotId: 'valyn#G2' },
    players: ['leaf#G2', 'JonahP#G2', 'trent#G2', 'icy#G2'],
    status: 'Pending',
    registeredAt: '2026-06-25'
  },
  {
    id: 't8',
    name: 'Team Heretics',
    logo: '🟩',
    captain: { name: 'Ričardas "Boo" Lukaševičius', email: 'boo@heretics.gg', discord: 'Boo#6666', riotId: 'Boo#TH' },
    players: ['benjyfishy#TH', 'RieNs#TH', 'Wo0t#TH', 'MiniBoo#TH'],
    status: 'Pending',
    registeredAt: '2026-06-25'
  }
];

// Bracket setup for 8 teams (Quarterfinals, Semifinals, Finals)
const DEFAULT_MATCHES = [
  // Round 1 (Quarterfinals)
  { id: 'q1', round: 1, team1Id: 't1', team2Id: 't6', team1Name: 'Sentinels', team2Name: 'FUT Esports', score1: 2, score2: 1, status: 'completed', winnerId: 't1', nextMatchId: 's1' },
  { id: 'q2', round: 1, team1Id: 't2', team2Id: 't5', team1Name: 'Fnatic', team2Name: 'Team Vitality', score1: 2, score2: 0, status: 'completed', winnerId: 't2', nextMatchId: 's1' },
  { id: 'q3', round: 1, team1Id: 't3', team2Id: 't4', team1Name: 'Paper Rex', team2Name: 'Evil Geniuses', score1: 2, score2: 1, status: 'completed', winnerId: 't3', nextMatchId: 's2' },
  { id: 'q4', round: 1, team1Id: 't7', team2Id: 't8', team1Name: 'G2 Esports', team2Name: 'Team Heretics', score1: 1, score2: 1, status: 'live', winnerId: null, nextMatchId: 's2' },
  // Round 2 (Semifinals)
  { id: 's1', round: 2, team1Id: 't1', team2Id: 't2', team1Name: 'Sentinels', team2Name: 'Fnatic', score1: 0, score2: 0, status: 'upcoming', winnerId: null, nextMatchId: 'f1' },
  { id: 's2', round: 2, team1Id: 't3', team2Id: null, team1Name: 'Paper Rex', team2Name: 'TBD', score1: 0, score2: 0, status: 'upcoming', winnerId: null, nextMatchId: 'f1' },
  // Round 3 (Grand Finals)
  { id: 'f1', round: 3, team1Id: null, team2Id: null, team1Name: 'TBD', team2Name: 'TBD', score1: 0, score2: 0, status: 'upcoming', winnerId: null, nextMatchId: null }
];

const DEFAULT_LIVE_MATCH = {
  matchId: 'q4',
  team1Name: 'G2 Esports',
  team2Name: 'Team Heretics',
  score1: 11,
  score2: 10,
  mapIndex: 3, // Decider Map
  currentMap: 'Haven',
  mapVetoes: [
    { map: 'Bind', pickedBy: 'G2', score: 'G2 13 - 8 TH' },
    { map: 'Sunset', pickedBy: 'TH', score: 'G2 9 - 13 TH' },
    { map: 'Haven', pickedBy: 'Decider', score: 'Live (11 - 10)' }
  ],
  streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder/Rickroll or standard Twitch embed
  status: 'live',
  roundHistory: ['W', 'L', 'W', 'W', 'L', 'L', 'W', 'L', 'W', 'W', 'L', 'W', 'W', 'L', 'L', 'W', 'W', 'L', 'W', 'W', 'L']
};

const DEFAULT_LEADERBOARD = [
  { id: 't1', name: 'Sentinels', wins: 4, losses: 1, roundDiff: +25, mvpName: 'Zekken', mvpScore: 285 },
  { id: 't2', name: 'Fnatic', wins: 3, losses: 1, roundDiff: +18, mvpName: 'Alfajer', mvpScore: 260 },
  { id: 't3', name: 'Paper Rex', wins: 3, losses: 2, roundDiff: +12, mvpName: 'something', mvpScore: 272 },
  { id: 't5', name: 'Team Vitality', wins: 1, losses: 2, roundDiff: -5, mvpName: 'Sayf', mvpScore: 245 },
  { id: 't6', name: 'FUT Esports', wins: 1, losses: 2, roundDiff: -8, mvpName: 'cNed', mvpScore: 230 },
  { id: 't4', name: 'Evil Geniuses', wins: 0, losses: 2, roundDiff: -15, mvpName: 'Jawgemo', mvpScore: 210 }
];

const DEFAULT_GALLERY = [
  { id: 'g1', title: 'Champions Trophy Spike Showdown 2026', type: 'winner', url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=800' },
  { id: 'g2', title: 'Grand Finals Hype Poster', type: 'poster', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800' },
  { id: 'g3', title: 'Paper Rex Jinggg Ace Moments', type: 'highlight', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800' },
  { id: 'g4', title: 'TenZ Clutch Round Screenshot', type: 'screenshot', url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80&w=800' },
  { id: 'g5', title: 'Fnatic Team Picture Berlin', type: 'winner', url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800' },
  { id: 'g6', title: 'Live Broadcast Production Setup', type: 'screenshot', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' }
];

export const TournamentProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('ss_registrations');
    return saved ? JSON.parse(saved) : DEFAULT_TEAMS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('ss_announcements');
    return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
  });

  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('ss_matches');
    return saved ? JSON.parse(saved) : DEFAULT_MATCHES;
  });

  const [liveMatch, setLiveMatch] = useState(() => {
    const saved = localStorage.getItem('ss_live_match');
    return saved ? JSON.parse(saved) : DEFAULT_LIVE_MATCH;
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('ss_leaderboard');
    return saved ? JSON.parse(saved) : DEFAULT_LEADERBOARD;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('ss_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [notifications, setNotifications] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ss_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('ss_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('ss_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('ss_live_match', JSON.stringify(liveMatch));
  }, [liveMatch]);

  useEffect(() => {
    localStorage.setItem('ss_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('ss_gallery', JSON.stringify(gallery));
  }, [gallery]);

  // Notifications Helpers
  const addNotification = (text, type = 'info') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Register Team
  const registerTeam = (teamData) => {
    const newTeam = {
      id: 't_' + Date.now(),
      name: teamData.teamName,
      logo: teamData.logo || '⬜',
      captain: {
        name: teamData.captainName,
        email: teamData.captainEmail,
        discord: teamData.captainDiscord,
        riotId: teamData.captainRiotId
      },
      players: [
        teamData.player2,
        teamData.player3,
        teamData.player4,
        teamData.player5
      ],
      status: 'Pending',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setRegistrations((prev) => [...prev, newTeam]);
    addNotification(`📋 Team "${teamData.teamName}" registered successfully! Awaiting admin approval.`, 'info');
    return true;
  };

  // Admin Actions
  const approveTeam = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === id) {
          addNotification(`✅ Team "${reg.name}" has been approved!`, 'success');
          // Add to bracket if there is an empty spot
          return { ...reg, status: 'Approved' };
        }
        return reg;
      })
    );

    // Auto update bracket team names if they match
    setMatches((prevMatches) => {
      return prevMatches.map((m) => {
        let updated = { ...m };
        if (m.team1Id === id) updated.team1Name = registrations.find(r => r.id === id).name;
        if (m.team2Id === id) updated.team2Name = registrations.find(r => r.id === id).name;
        return updated;
      });
    });
  };

  const rejectTeam = (id) => {
    setRegistrations((prev) => {
      const reg = prev.find(r => r.id === id);
      if (reg) {
        addNotification(`❌ Registration for "${reg.name}" rejected.`, 'warning');
      }
      return prev.filter((r) => r.id !== id);
    });
  };

  const addAnnouncement = (text, type = 'info') => {
    const newAnn = {
      id: Date.now().toString(),
      text,
      type,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    addNotification(`📢 New Announcement: "${text.substring(0, 30)}..."`, 'info');
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const updateMatchResult = (matchId, score1, score2, status, winnerId) => {
    setMatches((prev) =>
      prev.map((match) => {
        if (match.id === matchId) {
          const updated = { ...match, score1, score2, status, winnerId };
          
          // Propagate winner to next match if applicable
          if (status === 'completed' && match.nextMatchId && winnerId) {
            const winnerName = winnerId === match.team1Id ? match.team1Name : match.team2Name;
            
            // Update the next match's slots
            setTimeout(() => {
              setMatches((prevMatches) =>
                prevMatches.map((nextMatch) => {
                  if (nextMatch.id === match.nextMatchId) {
                    // Check if it should be team1 or team2
                    // For single elimination with 8 teams:
                    // q1 & q2 winner go to s1 (team1 & team2 respectively)
                    // q3 & q4 winner go to s2 (team1 & team2 respectively)
                    // s1 & s2 winner go to f1 (team1 & team2 respectively)
                    let slotUpdate = {};
                    if (match.id === 'q1' || match.id === 'q3' || match.id === 's1') {
                      slotUpdate = { team1Id: winnerId, team1Name: winnerName };
                    } else {
                      slotUpdate = { team2Id: winnerId, team2Name: winnerName };
                    }
                    return { ...nextMatch, ...slotUpdate };
                  }
                  return nextMatch;
                })
              );
            }, 50);
          }

          // If we are updating the active live match, also sync it to liveMatch state
          if (liveMatch.matchId === matchId) {
            setLiveMatch(prevLive => ({
              ...prevLive,
              score1,
              score2,
              status
            }));
          }

          addNotification(`🏆 Match ${match.team1Name} vs ${match.team2Name} score updated!`, 'success');
          return updated;
        }
        return match;
      })
    );
  };

  const setAsLiveMatch = (matchId) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    setLiveMatch({
      matchId: match.id,
      team1Name: match.team1Name,
      team2Name: match.team2Name,
      score1: match.score1,
      score2: match.score2,
      mapIndex: 1,
      currentMap: 'Haven',
      mapVetoes: [
        { map: 'Bind', pickedBy: match.team1Name, score: 'Completed' },
        { map: 'Sunset', pickedBy: match.team2Name, score: 'Completed' },
        { map: 'Haven', pickedBy: 'Decider', score: 'Live' }
      ],
      streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      status: 'live',
      roundHistory: ['W', 'L', 'W', 'W', 'L']
    });

    // Update match status to live
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status: 'live' } : m));
    addNotification(`📺 Live Stream focused on ${match.team1Name} vs ${match.team2Name}!`, 'info');
  };

  const updateLiveRound = (winningTeam) => {
    setLiveMatch(prev => {
      const isTeam1 = winningTeam === 1;
      const newScore1 = isTeam1 ? prev.score1 + 1 : prev.score1;
      const newScore2 = !isTeam1 ? prev.score2 + 1 : prev.score2;
      const newHistory = [...prev.roundHistory, isTeam1 ? 'W' : 'L'];

      // Also update matching bracket score in real time
      setMatches(prevMatches =>
        prevMatches.map(m =>
          m.id === prev.matchId
            ? { ...m, score1: newScore1, score2: newScore2 }
            : m
        )
      );

      return {
        ...prev,
        score1: newScore1,
        score2: newScore2,
        roundHistory: newHistory
      };
    });
  };

  const uploadPoster = (title, url, type = 'screenshot') => {
    const newItem = {
      id: 'g_' + Date.now(),
      title,
      type,
      url
    };
    setGallery(prev => [newItem, ...prev]);
    addNotification(`🖼️ Media file "${title}" uploaded to gallery!`, 'success');
  };

  return (
    <TournamentContext.Provider
      value={{
        registrations,
        announcements,
        matches,
        liveMatch,
        leaderboard,
        gallery,
        notifications,
        registerTeam,
        approveTeam,
        rejectTeam,
        addAnnouncement,
        deleteAnnouncement,
        updateMatchResult,
        setAsLiveMatch,
        updateLiveRound,
        uploadPoster,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};
