import React, { useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { Award, ShieldAlert, ArrowUpRight, Target } from 'lucide-react';

export default function Leaderboard() {
  const { leaderboard } = useContext(TournamentContext);

  // Sort Leaderboard by Wins Descending, then RoundDiff Descending
  const sortedStandings = [...leaderboard].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.roundDiff - a.roundDiff;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-tertiary uppercase tracking-[0.25em] font-bold block mb-2">
          TOURNAMENT METRICS
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          STANDINGS & STATISTICS
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Standings Table (2 cols span) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="panel-glass border border-white/5 clip-chamfer-card overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
            <div className="p-5 border-b border-white/5">
              <h3 className="font-display font-black text-lg text-white uppercase flex items-center gap-2">
                <ShieldAlert className="text-secondary" size={18} />
                Team Standings
              </h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-on-surface/50 uppercase tracking-widest text-[10px]">
                    <th className="py-4 px-5">Rank</th>
                    <th className="py-4 px-2">Team</th>
                    <th className="py-4 px-2 text-center">W</th>
                    <th className="py-4 px-2 text-center">L</th>
                    <th className="py-4 px-2 text-center">RD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedStandings.map((team, idx) => {
                    const isTop1 = idx === 0;
                    return (
                      <tr 
                        key={team.id} 
                        className={`hover:bg-white/2.5 transition-colors duration-150 ${
                          isTop1 ? 'bg-secondary/[0.02]' : ''
                        }`}
                      >
                        <td className="py-4 px-5 font-bold">
                          {isTop1 ? (
                            <span className="text-secondary text-glow-cyan flex items-center gap-1">
                              #1
                            </span>
                          ) : (
                            `#${idx + 1}`
                          )}
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-display font-black text-white uppercase tracking-wide">
                            {team.name}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-center text-success font-bold font-mono">
                          {team.wins}
                        </td>
                        <td className="py-4 px-2 text-center text-primary font-mono">
                          {team.losses}
                        </td>
                        <td className={`py-4 px-2 text-center font-bold font-mono ${
                          team.roundDiff > 0 ? 'text-secondary' : 'text-primary'
                        }`}>
                          {team.roundDiff > 0 ? `+${team.roundDiff}` : team.roundDiff}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: MVP Stats */}
        <div className="flex flex-col gap-6">
          <div className="panel-glass border border-white/5 clip-chamfer-card relative h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-tertiary" />
            
            <div>
              <div className="p-5 border-b border-white/5">
                <h3 className="font-display font-black text-lg text-white uppercase flex items-center gap-2">
                  <Award className="text-tertiary" size={18} />
                  Player MVP Ratings
                </h3>
              </div>

              <div className="p-5 flex flex-col gap-4">
                {/* Loop MVPs */}
                {sortedStandings.map((team, idx) => (
                  <div 
                    key={team.id} 
                    className="flex items-center justify-between p-3 border border-white/5 bg-surface-container-low/40 clip-chamfer-btn hover:border-tertiary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-1.5 bg-white/5 clip-chamfer-btn font-mono font-bold text-center w-8 h-8 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-mono font-black text-white uppercase block group-hover:text-tertiary transition-colors">
                          {team.mvpName}
                        </span>
                        <span className="font-mono text-[9px] uppercase text-on-surface/40">
                          {team.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="font-mono text-xs text-white font-extrabold block">
                        {team.mvpScore} ACS
                      </span>
                      <span className="font-mono text-[8px] text-tertiary uppercase font-bold tracking-wider">
                        ACS RATING
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat Explainer */}
            <div className="p-5 border-t border-white/5 bg-white/[0.01] flex items-start gap-2.5">
              <Target className="text-on-surface/30 mt-0.5 flex-shrink-0" size={14} />
              <p className="font-mono text-[9px] text-on-surface/50 uppercase leading-relaxed">
                ACS refers to Average Combat Score. Stats are calculated live from game logs uploaded after referee verification.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
