import React from 'react';
import { User, Shield } from 'lucide-react';

export default function TeamCard({ team }) {
  return (
    <div className="panel-glass p-6 clip-chamfer-card border border-white/5 flex flex-col justify-between hover:border-secondary/30 hover:shadow-glow-cyan transition-all duration-300 relative group">
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 w-full h-[3px] ${
        team.status === 'Approved' ? 'bg-secondary' : 'bg-primary'
      }`} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl p-2 bg-white/5 border border-white/10 select-none flex items-center justify-center w-12 h-12">
              {team.logo}
            </span>
            <div>
              <h3 className="font-display font-black text-base md:text-lg uppercase text-white tracking-wide leading-tight">
                {team.name}
              </h3>
              <span className="font-mono text-[9px] tracking-widest text-on-surface/50 block uppercase mt-0.5">
                Joined: {team.registeredAt}
              </span>
            </div>
          </div>
          
          <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border ${
            team.status === 'Approved' 
              ? 'border-success/30 text-success bg-success/5 shadow-[0_0_10px_rgba(0,255,148,0.1)]' 
              : 'border-primary/30 text-primary bg-primary/5 animate-pulse'
          }`}>
            {team.status}
          </span>
        </div>

        {/* Roster list */}
        <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
          {/* Captain */}
          <div className="flex items-start gap-2">
            <Shield size={14} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-mono text-[9px] uppercase text-secondary block font-bold leading-none tracking-widest">
                Team Captain
              </span>
              <span className="text-xs font-semibold text-white block mt-1">
                {team.captain.name}
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant block mt-0.5">
                Riot ID: <span className="text-secondary">{team.captain.riotId}</span>
              </span>
              <span className="font-mono text-[9px] text-on-surface/55 block">
                Discord: {team.captain.discord}
              </span>
            </div>
          </div>

          {/* Players */}
          <div className="flex items-start gap-2 border-t border-white/5 pt-2.5">
            <User size={14} className="text-on-surface/60 mt-0.5 flex-shrink-0" />
            <div className="w-full">
              <span className="font-mono text-[9px] uppercase text-on-surface/60 block font-bold leading-none tracking-widest">
                Active Roster
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {team.players.map((player, idx) => (
                  <div key={idx} className="bg-surface-container/60 p-1.5 px-2 border border-white/5">
                    <span className="font-mono text-[9px] text-white/95 truncate block" title={player}>
                      {player}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
