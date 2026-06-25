import React from 'react';
import { Shield, Target, Award, Users } from 'lucide-react';

export default function About() {
  const formats = [
    { label: 'Brackets', val: '8-Team Single Elimination Tree' },
    { label: 'Map Pool', val: 'Haven, Sunset, Bind, Ascent, Abyss' },
    { label: 'Quarter/Semi Match Format', val: 'Best-of-Three (Bo3) Series' },
    { label: 'Grand Finals Format', val: 'Best-of-Five (Bo5) Series' },
    { label: 'Server Region', val: 'Asia Pacific (Singapore / Mumbai)' }
  ];

  const eligibility = [
    'Minimum player age of 16 years old by July 1, 2026.',
    'Riot Account must be in good standing (no active game bans).',
    'Minimum rank of Ascendant 1 during the current or preceding act.',
    'Teams must consist of exactly 5 starting players (substitute optional).',
    'Players must reside in the Asia-Pacific region to ensure latency guidelines.'
  ];

  const committee = [
    { name: 'Marcus "Viper" Vance', role: 'Head Referee & Tournament Director', avatar: '🛡️' },
    { name: 'Sarah "Sovereign" Chen', role: 'Technical Operations Lead', avatar: '💻' },
    { name: 'Devon "Apex" Taylor', role: 'Player Relations Coordinator', avatar: '💬' },
    { name: 'Elena "Oracle" Petrova', role: 'Social Media & Communications Manager', avatar: '📢' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-secondary uppercase tracking-[0.25em] font-bold block mb-2">
          COMPETITIVE OVERVIEW
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          ABOUT SPIKE SHOWDOWN
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Description & Format */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Event description */}
          <div className="panel-glass p-6 md:p-8 border border-white/5 clip-chamfer-card relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
            <h3 className="font-display font-black text-xl text-white uppercase flex items-center gap-2 mb-4">
              <Target className="text-secondary" size={20} />
              Event Description
            </h3>
            <p className="text-on-surface/80 text-sm md:text-base leading-relaxed">
              Spike Showdown is a premier tactical shooter tournament designed to showcase high-tier coordination, raw mechanical skill, and calculated utility usage. Our mission is to provide an elite, transparent, and lag-free arena where aspiring rosters can benchmark themselves against established professional squads.
            </p>
            <p className="text-on-surface/80 text-sm md:text-base leading-relaxed mt-4">
              All matches will be casted live with real-time stats integration, giving players maximum visibility and providing viewers with a broadcast-grade esports experience.
            </p>
          </div>

          {/* Tournament format */}
          <div className="panel-glass p-6 md:p-8 border border-white/5 clip-chamfer-card relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary" />
            <h3 className="font-display font-black text-xl text-white uppercase flex items-center gap-2 mb-6">
              <Shield className="text-primary" size={20} />
              Tournament Format
            </h3>
            
            <div className="flex flex-col gap-4 font-mono text-xs sm:text-sm">
              {formats.map((f, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-on-surface/50 uppercase tracking-widest font-bold">
                    {f.label}
                  </span>
                  <span className="text-white mt-1 sm:mt-0 font-bold uppercase text-left sm:text-right">
                    {f.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Eligibility */}
        <div className="flex flex-col gap-8">
          <div className="panel-glass p-6 md:p-8 border border-white/5 clip-chamfer-card relative h-full">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-tertiary" />
            <h3 className="font-display font-black text-xl text-white uppercase flex items-center gap-2 mb-6">
              <Award className="text-tertiary" size={20} />
              Roster Eligibility
            </h3>
            
            <ul className="flex flex-col gap-4">
              {eligibility.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-on-surface/85 leading-relaxed">
                  <span className="font-mono text-tertiary font-bold">{idx + 1}.</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Committee Section */}
      <section className="mt-16">
        <div className="text-center mb-10">
          <h3 className="font-display font-black text-2xl md:text-3xl text-white uppercase">
            ORGANIZING COMMITTEE
          </h3>
          <div className="w-8 h-[2px] bg-white/20 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {committee.map((c, idx) => (
            <div key={idx} className="panel-glass p-6 border border-white/5 text-center clip-chamfer-btn relative group hover:border-secondary/20 transition-all duration-300">
              <div className="text-4xl mb-4 bg-white/5 w-16 h-16 mx-auto rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                {c.avatar}
              </div>
              <h4 className="font-display font-black text-base text-white uppercase tracking-wide">
                {c.name}
              </h4>
              <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mt-1">
                {c.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
