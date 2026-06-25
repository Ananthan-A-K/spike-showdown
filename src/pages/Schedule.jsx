import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Radio, Play } from 'lucide-react';

export default function Schedule() {
  const events = [
    {
      date: 'June 20 - June 28, 2026',
      time: 'LOCKED',
      title: 'Roster Registration Open',
      desc: 'All teams must submit captain details, Riot IDs, and Discord handles. Rosters are locked at midnight on the 28th.',
      status: 'completed',
      tag: 'COMPLETED'
    },
    {
      date: 'July 5, 2026',
      time: '17:00 IST',
      title: 'Team Check-in & Briefing',
      desc: 'All team captains must check-in on our Discord server. Referee verification and lobby details distribution will occur.',
      status: 'active',
      tag: 'ONGOING'
    },
    {
      date: 'July 5, 2026',
      time: '18:00 IST',
      title: 'Quarterfinals Matches (Bo3)',
      desc: 'All 8 teams compete in best-of-three matches. Lobbies A, B, C, and D running concurrently.',
      status: 'upcoming',
      tag: 'UPCOMING'
    },
    {
      date: 'July 6, 2026',
      time: '18:00 IST',
      title: 'Semifinals Matches (Bo3)',
      desc: 'Top 4 teams battle for a spot in the finals. Broadcast will follow matches sequentially.',
      status: 'upcoming',
      tag: 'UPCOMING'
    },
    {
      date: 'July 7, 2026',
      time: '19:00 IST',
      title: 'Grand Finals (Bo5) & MVP Award',
      desc: 'The ultimate best-of-five showdown to crown the Spike Showdown Champions, followed by the MVP announcement.',
      status: 'upcoming',
      tag: 'UPCOMING'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-secondary uppercase tracking-[0.25em] font-bold block mb-2">
          CHRONOLOGICAL PLAN
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          TOURNAMENT SCHEDULE
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Timeline wrapper */}
      <div className="relative border-l border-white/10 pl-6 ml-4 sm:ml-8 flex flex-col gap-10">
        
        {events.map((e, idx) => (
          <div key={idx} className="relative group">
            
            {/* Timeline Dot Indicator */}
            <span className={`absolute left-[-31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-none border ${
              e.status === 'completed'
                ? 'border-white/20 bg-[#0a141e] text-white/50'
                : e.status === 'active'
                ? 'border-primary bg-primary animate-pulse-fast text-white shadow-glow-red'
                : 'border-secondary bg-[#0a141e] text-secondary'
            }`}>
              {e.status === 'completed' && <CheckCircle size={10} />}
              {e.status === 'active' && <Radio size={10} />}
              {e.status === 'upcoming' && <Clock size={10} />}
            </span>

            {/* Event Panel */}
            <div className={`panel-glass p-5 md:p-6 border relative clip-chamfer-btn transition-all duration-300 ${
              e.status === 'active'
                ? 'border-primary/40 bg-primary/5 shadow-glow-red'
                : 'border-white/5 hover:border-secondary/25'
            }`}>
              
              {/* Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs">
                  <span className="flex items-center gap-1.5 text-secondary">
                    <Calendar size={12} />
                    {e.date}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="flex items-center gap-1.5 text-white">
                    <Clock size={12} />
                    {e.time}
                  </span>
                </div>
                
                <span className={`font-mono text-[9px] uppercase px-2 py-0.5 border ${
                  e.status === 'completed'
                    ? 'border-white/20 text-white/40'
                    : e.status === 'active'
                    ? 'border-primary/30 text-primary bg-primary/5'
                    : 'border-secondary/25 text-secondary bg-secondary/5'
                }`}>
                  {e.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display font-black text-lg md:text-xl text-white uppercase group-hover:text-secondary transition-colors leading-snug">
                {e.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-on-surface/75 font-sans leading-relaxed">
                {e.desc}
              </p>

              {/* Action for Active Match */}
              {e.status === 'active' && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  <span className="font-mono text-[10px] uppercase text-primary font-bold">
                    Check-in is currently broadcasted live on discord
                  </span>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
