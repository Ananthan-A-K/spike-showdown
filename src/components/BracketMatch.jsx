import React from 'react';

export default function BracketMatch({ match, onFocusLive }) {
  const isCompleted = match.status === 'completed';
  const isLive = match.status === 'live';
  
  const getTeamClass = (teamId, winnerId) => {
    if (!teamId) return 'text-on-surface/35 italic';
    if (isCompleted) {
      return winnerId === teamId ? 'text-white font-black' : 'text-on-surface/40 line-through';
    }
    return 'text-white font-semibold';
  };

  return (
    <div className={`relative panel-glass p-3.5 border w-56 transition-all duration-300 clip-chamfer-btn ${
      isLive 
        ? 'border-primary/60 shadow-glow-red bg-primary/5' 
        : isCompleted 
        ? 'border-white/10 hover:border-secondary/20' 
        : 'border-white/5 hover:border-secondary/30'
    }`}>
      {/* Live Badge */}
      {isLive && (
        <span className="absolute top-[-9px] right-3 font-mono text-[8px] bg-primary text-white px-1.5 uppercase font-bold py-0.5 flex items-center gap-1 animate-pulse-fast">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          Live
        </span>
      )}
      
      <div className="flex flex-col gap-2 font-mono text-xs">
        {/* Team 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate max-w-[140px]">
            <span className={`truncate ${getTeamClass(match.team1Id, match.winnerId)}`}>
              {match.team1Name || 'TBD'}
            </span>
          </div>
          <span className={`px-1.5 py-0.5 text-center font-bold ${
            isCompleted && match.winnerId === match.team1Id 
              ? 'text-secondary text-glow-cyan' 
              : isLive
              ? 'text-primary'
              : 'text-on-surface/60'
          }`}>
            {match.team1Id ? match.score1 : '-'}
          </span>
        </div>
        
        {/* Divider */}
        <div className="h-[1px] bg-white/10 w-full" />

        {/* Team 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate max-w-[140px]">
            <span className={`truncate ${getTeamClass(match.team2Id, match.winnerId)}`}>
              {match.team2Name || 'TBD'}
            </span>
          </div>
          <span className={`px-1.5 py-0.5 text-center font-bold ${
            isCompleted && match.winnerId === match.team2Id 
              ? 'text-secondary text-glow-cyan' 
              : isLive
              ? 'text-primary'
              : 'text-on-surface/60'
          }`}>
            {match.team2Id ? match.score2 : '-'}
          </span>
        </div>
      </div>

      {/* Button to quickly view stream if match is Live */}
      {isLive && onFocusLive && (
        <button
          onClick={() => onFocusLive(match.id)}
          className="w-full mt-2 text-[9px] uppercase tracking-widest font-extrabold text-center border border-primary/30 text-primary py-1.5 bg-primary/5 hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
        >
          Watch Stream
        </button>
      )}
    </div>
  );
}
