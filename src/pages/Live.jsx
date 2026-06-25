import React, { useState, useEffect, useContext, useRef } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { Radio, Eye, Send, Volume2, ShieldAlert } from 'lucide-react';

const SIMULATED_CHAT_MESSAGES = [
  { username: 'ViperMain', msg: 'G2 valyn is cooking so hard today!' },
  { username: 'TenzFan_1', msg: 'Is that Haven decider map? Hype!' },
  { username: 'CypherSetup', msg: 'benjyfishy Cypher trap setups are unmatched.' },
  { username: 'EsportsLover', msg: 'WHAT A CLUTCH BY MINIBOO OMG!' },
  { username: 'TacticalDrop', msg: 'Eco round win? Let\'s go Heretics!' },
  { username: 'SpikeDefuser', msg: '11-10 this score is way too close' },
  { username: 'W-Gaming', msg: 'Paper Rex watch party here!' },
  { username: 'OmenSmoke', msg: 'That flash was perfect' },
  { username: 'ValorantGuru', msg: 'G2 needs to hold A site' },
  { username: 'RiotSupporter', msg: 'This is the best match of the Showdown' }
];

export default function Live() {
  const { liveMatch, updateLiveRound } = useContext(TournamentContext);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, username: 'EsportsRef', msg: 'Welcome to Spike Showdown Live Chat!', isSystem: true },
    { id: 2, username: 'SEN_Fan', msg: 'TenZ is the GOAT!' }
  ]);
  const [userMsg, setUserMsg] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Simulate chat messages
  useEffect(() => {
    if (liveMatch.status !== 'live') return;

    const interval = setInterval(() => {
      const randomMsg = SIMULATED_CHAT_MESSAGES[Math.floor(Math.random() * SIMULATED_CHAT_MESSAGES.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          username: randomMsg.username,
          msg: randomMsg.msg,
          isSystem: false
        }
      ]);
    }, 2800);

    return () => clearInterval(interval);
  }, [liveMatch.status]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        username: 'Spectator_Me',
        msg: userMsg,
        isSystem: false,
        isUser: true
      }
    ]);
    setUserMsg('');
  };

  if (!liveMatch || liveMatch.status !== 'live') {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center">
        <ShieldAlert className="mx-auto text-primary mb-4 animate-bounce" size={48} />
        <h2 className="font-display font-black text-2xl md:text-3xl text-white uppercase">
          NO MATCHES CURRENTLY ON AIR
        </h2>
        <p className="mt-4 text-sm text-on-surface/65 font-sans leading-relaxed">
          The next broadcast starts when matches are scheduled. You can trigger a live match demo inside the **Admin Dashboard** by selecting a match as "Live"!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Live Badge */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <h2 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight flex items-center gap-2">
            ON AIR: SPIKE SHOWDOWN LIVE
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-on-surface/60 uppercase">
            <Eye size={14} className="text-secondary" />
            14,285 VIEWERS
          </span>
        </div>
      </div>

      {/* Broadcast Stream Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Stream Frame (3 columns span) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative aspect-video w-full bg-black border border-white/5 shadow-glow-cyan clip-chamfer-btn overflow-hidden">
            <iframe
              src={liveMatch.streamUrl}
              title="Spike Showdown Stream"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Telemetry Stats & Round History */}
          <div className="panel-glass p-5 border border-white/5 clip-chamfer-card relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Teams score */}
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-center">
                <div>
                  <span className="font-display font-black text-sm sm:text-base text-white uppercase block leading-none">
                    {liveMatch.team1Name}
                  </span>
                  <span className="text-[10px] text-on-surface/40 uppercase block mt-1">ATK</span>
                </div>

                <div className="flex items-center gap-2 bg-[#0f1923] px-4 py-2 border border-white/5 font-display font-black text-xl sm:text-2xl">
                  <span className="text-white">{liveMatch.score1}</span>
                  <span className="text-primary font-black animate-pulse">:</span>
                  <span className="text-white">{liveMatch.score2}</span>
                </div>

                <div>
                  <span className="font-display font-black text-sm sm:text-base text-white uppercase block leading-none">
                    {liveMatch.team2Name}
                  </span>
                  <span className="text-[10px] text-on-surface/40 uppercase block mt-1">DEF</span>
                </div>
              </div>

              {/* Decider Map info */}
              <div className="text-center sm:text-right font-mono text-xs">
                <span className="text-secondary font-bold uppercase tracking-wider block">
                  MAP {liveMatch.mapIndex}: {liveMatch.currentMap}
                </span>
                <span className="text-on-surface/50 text-[10px] uppercase block mt-0.5">
                  DECIDER MATCH POINT
                </span>
              </div>
            </div>

            {/* Round History ticker */}
            <div className="border-t border-white/5 pt-4 mt-4">
              <h5 className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest font-bold mb-2">
                Round History (Lobby Decider Map)
              </h5>
              <div className="flex flex-wrap gap-1">
                {liveMatch.roundHistory.map((outcome, idx) => (
                  <span 
                    key={idx}
                    className={`font-mono text-[9px] w-5 h-5 flex items-center justify-center border ${
                      outcome === 'W'
                        ? 'border-success/30 text-success bg-success/5'
                        : 'border-primary/30 text-primary bg-primary/5'
                    }`}
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Live Chat Panel (1 column span) */}
        <div className="panel-glass border border-white/5 clip-chamfer-card flex flex-col justify-between h-[450px] lg:h-auto">
          
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
            <h4 className="font-display font-black text-sm text-white uppercase flex items-center gap-2">
              <Volume2 size={14} className="text-secondary" />
              Live Chat
            </h4>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>

          {/* Chat Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-mono text-xs scrollbar-none">
            {chatMessages.map((chat) => (
              <div key={chat.id} className="leading-relaxed">
                {chat.isSystem ? (
                  <div className="text-[10px] text-secondary bg-secondary/5 border border-secondary/10 p-2 text-center select-none uppercase">
                    {chat.msg}
                  </div>
                ) : (
                  <div>
                    <span className={`font-bold uppercase tracking-wider ${
                      chat.isUser 
                        ? 'text-tertiary' 
                        : chat.username === 'Spectator_Me' 
                        ? 'text-tertiary'
                        : 'text-secondary'
                    }`}>
                      {chat.username}
                    </span>
                    <span className="text-white/40 mx-1.5">:</span>
                    <span className="text-on-surface/90 uppercase">{chat.msg}</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendChat} className="p-3 border-t border-white/5 bg-surface-container-low flex items-center gap-2">
            <input
              type="text"
              placeholder="SEND MESSAGE..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none uppercase"
            />
            <button
              type="submit"
              className="p-2 bg-primary hover:bg-primary/90 text-white clip-chamfer-btn cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>

        </div>

      </div>

      {/* Map Veto details grid */}
      <section className="mt-8">
        <h3 className="font-display font-black text-lg text-white uppercase mb-4">
          Map Veto Status
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {liveMatch.mapVetoes.map((veto, idx) => (
            <div key={idx} className="panel-glass p-4 border border-white/5 clip-chamfer-btn flex justify-between items-center relative">
              <div className="absolute top-0 left-0 h-full w-[2px] bg-secondary" />
              <div>
                <span className="font-mono text-[9px] text-on-surface/40 uppercase block">
                  PICK {idx + 1} ({veto.pickedBy})
                </span>
                <span className="font-display font-black text-sm sm:text-base text-white uppercase block mt-1">
                  {veto.map}
                </span>
              </div>
              <span className="font-mono text-xs text-secondary font-bold uppercase">
                {veto.score}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
