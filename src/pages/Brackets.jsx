import React, { useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import BracketMatch from '../components/BracketMatch';
import { GitCommit, Trophy, Swords } from 'lucide-react';

export default function Brackets({ setCurrentPage }) {
  const { matches, setAsLiveMatch } = useContext(TournamentContext);

  // Group matches by round
  const qMatches = matches.filter((m) => m.round === 1);
  const sMatches = matches.filter((m) => m.round === 2);
  const fMatches = matches.filter((m) => m.round === 3);

  const handleFocusLive = (matchId) => {
    setAsLiveMatch(matchId);
    setCurrentPage('live');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWinner = () => {
    const finalMatch = fMatches[0];
    if (finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId) {
      return finalMatch.winnerId === finalMatch.team1Id ? finalMatch.team1Name : finalMatch.team2Name;
    }
    return null;
  };

  const winnerName = getWinner();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 overflow-x-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-primary uppercase tracking-[0.25em] font-bold block mb-2">
          ELIMINATION LADDER
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          TOURNAMENT BRACKETS
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Bracket Tree Layout */}
      <div className="min-w-[900px] flex items-center justify-center gap-12 py-10 relative select-none">
        
        {/* ROUND 1: QUARTERFINALS */}
        <div className="flex flex-col gap-10">
          <h4 className="font-mono text-[10px] tracking-widest text-secondary uppercase font-bold border-b border-white/5 pb-2 text-center">
            QUARTERFINALS (BO3)
          </h4>
          <div className="flex flex-col gap-8 justify-around h-[500px]">
            {qMatches.map((m) => (
              <div key={m.id} className="relative flex items-center">
                <BracketMatch match={m} onFocusLive={handleFocusLive} />
                
                {/* Visual connectors pointing to round 2 */}
                <div className="absolute right-[-48px] w-[48px] h-[2px] bg-white/10 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* ROUND 2: SEMIFINALS */}
        <div className="flex flex-col gap-10">
          <h4 className="font-mono text-[10px] tracking-widest text-white/55 uppercase font-bold border-b border-white/5 pb-2 text-center">
            SEMIFINALS (BO3)
          </h4>
          <div className="flex flex-col gap-16 justify-around h-[500px]">
            {sMatches.map((m, idx) => (
              <div key={m.id} className="relative flex items-center">
                {/* Connecting branch input lines */}
                <div className="absolute left-[-48px] w-[48px] flex flex-col justify-between h-[120px] border-r-2 border-white/10 pointer-events-none" style={{
                  top: idx === 0 ? '55px' : '-55px'
                }} />
                
                <BracketMatch match={m} onFocusLive={handleFocusLive} />
                
                {/* Visual connectors pointing to finals */}
                <div className="absolute right-[-48px] w-[48px] h-[2px] bg-white/10 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* ROUND 3: GRAND FINALS */}
        <div className="flex flex-col gap-10">
          <h4 className="font-mono text-[10px] tracking-widest text-primary uppercase font-bold border-b border-white/5 pb-2 text-center">
            GRAND FINALS (BO5)
          </h4>
          <div className="flex flex-col justify-center h-[500px] relative">
            
            {/* Input branch lines */}
            <div className="absolute left-[-48px] w-[48px] flex flex-col justify-between h-[220px] border-r-2 border-white/10 pointer-events-none" style={{
              top: '120px'
            }} />

            {fMatches.map((m) => (
              <div key={m.id} className="relative flex items-center">
                <BracketMatch match={m} onFocusLive={handleFocusLive} />
                
                {/* Connector to champion spotlight */}
                <div className="absolute right-[-48px] w-[48px] h-[2px] bg-primary/20 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* WINNER CHAMPION SPOTLIGHT */}
        <div className="flex flex-col gap-10">
          <h4 className="font-mono text-[10px] tracking-widest text-success uppercase font-bold border-b border-white/5 pb-2 text-center">
            CHAMPION
          </h4>
          <div className="flex flex-col justify-center h-[500px]">
            <div className={`panel-glass p-6 border text-center w-52 clip-chamfer-btn transition-all duration-500 relative ${
              winnerName 
                ? 'border-success bg-success/5 shadow-[0_0_20px_rgba(0,255,148,0.2)]'
                : 'border-white/5 opacity-40'
            }`}>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-success" />
              <Trophy size={40} className={`mx-auto mb-3 ${winnerName ? 'text-success animate-bounce' : 'text-on-surface/30'}`} />
              
              <h5 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                Spike Showdown Winner
              </h5>
              <div className="font-display font-black text-lg text-white uppercase mt-2.5 truncate">
                {winnerName || 'TBD'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Info notice */}
      <div className="mt-8 p-4 bg-[#0f1923] border border-white/5 max-w-xl mx-auto text-center clip-chamfer-btn flex items-center gap-3 justify-center">
        <Swords size={16} className="text-primary animate-pulse" />
        <span className="font-mono text-[10px] text-on-surface/60 uppercase">
          Winner advancement is synchronized automatically by match referee scores.
        </span>
      </div>

    </div>
  );
}
