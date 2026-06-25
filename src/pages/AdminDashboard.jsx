import React, { useState, useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { Shield, Check, X, Trophy, Radio, Megaphone, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const {
    registrations,
    announcements,
    matches,
    liveMatch,
    approveTeam,
    rejectTeam,
    addAnnouncement,
    deleteAnnouncement,
    updateMatchResult,
    setAsLiveMatch,
    updateLiveRound,
    uploadPoster
  } = useContext(TournamentContext);

  const [activeTab, setActiveTab] = useState('approvals');

  // Input States
  const [newAnn, setNewAnn] = useState('');
  const [newAnnType, setNewAnnType] = useState('info');

  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('screenshot');

  // Filter pending approvals
  const pendingTeams = registrations.filter((r) => r.status === 'Pending');

  // Publish Announcement
  const handleAnnounce = (e) => {
    e.preventDefault();
    if (!newAnn.trim()) return;
    addAnnouncement(newAnn, newAnnType);
    setNewAnn('');
  };

  // Upload Gallery Item
  const handleMediaUpload = (e) => {
    e.preventDefault();
    if (!mediaTitle.trim() || !mediaUrl.trim()) return;
    uploadPoster(mediaTitle, mediaUrl, mediaType);
    setMediaTitle('');
    setMediaUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-[0.25em] font-bold block mb-2">
          CONTROL CENTER
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          ADMIN DASHBOARD
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center border-b border-white/5 pb-4">
        {[
          { id: 'approvals', label: 'Roster Approvals', count: pendingTeams.length },
          { id: 'brackets', label: 'Match Scores & Brackets' },
          { id: 'broadcast', label: 'Stream & Match Telemetry' },
          { id: 'news', label: 'Banner & Announcements' },
          { id: 'gallery', label: 'Gallery Uploader' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-4 font-mono text-xs uppercase border cursor-pointer flex items-center gap-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-primary/10 font-bold shadow-[0_0_15px_rgba(255,70,85,0.15)]'
                : 'border-white/5 text-on-surface/65 hover:border-white/20 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className="bg-primary text-white font-sans font-bold px-1.5 py-0.5 text-[9px] rounded-full animate-pulse-fast">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Panels content */}
      <div className="min-h-[400px]">
        
        {/* TAB 1: ROSTER APPROVALS */}
        {activeTab === 'approvals' && (
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
            <h3 className="font-display font-black text-xl text-white uppercase mb-6 flex items-center gap-2">
              <Shield className="text-secondary" size={20} />
              Roster Approvals
            </h3>

            {pendingTeams.length > 0 ? (
              <div className="flex flex-col gap-4">
                {pendingTeams.map((team) => (
                  <div key={team.id} className="bg-surface-container-low/40 p-4 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 clip-chamfer-btn">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1 bg-white/5 border border-white/5 rounded-none">{team.logo}</span>
                        <h4 className="font-display font-black text-base text-white uppercase">{team.name}</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1.5 mt-3 font-mono text-[10px] sm:text-xs text-on-surface/60">
                        <div>
                          <span className="font-bold text-secondary">CAPTAIN:</span> {team.captain.name}
                        </div>
                        <div>
                          <span className="font-bold text-secondary">RIOT ID:</span> {team.captain.riotId}
                        </div>
                        <div>
                          <span className="font-bold text-secondary">DISCORD:</span> {team.captain.discord}
                        </div>
                        <div>
                          <span className="font-bold text-secondary">ROSTER:</span> {team.players.join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button
                        onClick={() => approveTeam(team.id)}
                        className="bg-success/15 border border-success/30 hover:bg-success hover:text-black p-2 px-3 text-xs font-mono font-bold uppercase text-success flex items-center gap-1.5 cursor-pointer clip-chamfer-btn"
                      >
                        <Check size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => rejectTeam(team.id)}
                        className="bg-primary/10 border border-primary/30 hover:bg-primary hover:text-white p-2 px-3 text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5 cursor-pointer clip-chamfer-btn"
                      >
                        <X size={14} />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10">
                <span className="font-mono text-xs text-on-surface/40 uppercase">
                  No pending registrations currently awaiting verification.
                </span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MATCH SCORES & BRACKETS */}
        {activeTab === 'brackets' && (
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary" />
            <h3 className="font-display font-black text-xl text-white uppercase mb-6 flex items-center gap-2">
              <Trophy className="text-primary" size={20} />
              Ref Match Editor & Scoreboards
            </h3>

            <div className="flex flex-col gap-6">
              {matches.map((match) => {
                const isUpcoming = match.status === 'upcoming';
                return (
                  <div key={match.id} className="bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-[10px] text-secondary font-bold uppercase border border-secondary/20 px-2 py-0.5">
                        MATCH {match.id.toUpperCase()} • ROUND {match.round}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <select
                          value={match.status}
                          onChange={(e) => updateMatchResult(match.id, match.score1, match.score2, e.target.value, match.winnerId)}
                          className="bg-[#0f1923] border border-white/10 text-xs font-mono text-white px-2 py-1 outline-none cursor-pointer"
                        >
                          <option value="upcoming">UPCOMING</option>
                          <option value="live">LIVE</option>
                          <option value="completed">COMPLETED</option>
                        </select>

                        {match.status !== 'completed' && (
                          <button
                            onClick={() => setAsLiveMatch(match.id)}
                            className="bg-primary/10 border border-primary/20 hover:bg-primary text-primary hover:text-white px-2.5 py-1 font-mono text-[10px] uppercase font-bold cursor-pointer"
                          >
                            Set Live Stream
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scores Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
                      {/* Team 1 */}
                      <div className="flex items-center justify-between gap-4 bg-black/20 p-3 border border-white/5">
                        <span className="font-mono text-xs text-white uppercase truncate">{match.team1Name || 'TBD'}</span>
                        <input
                          type="number"
                          value={match.score1}
                          disabled={!match.team1Id}
                          onChange={(e) => updateMatchResult(match.id, parseInt(e.target.value) || 0, match.score2, match.status, match.winnerId)}
                          className="w-12 bg-surface-container border-b border-white/10 text-center font-mono text-sm py-1 text-white outline-none focus:border-secondary disabled:opacity-30"
                        />
                      </div>

                      {/* Team 2 */}
                      <div className="flex items-center justify-between gap-4 bg-black/20 p-3 border border-white/5">
                        <span className="font-mono text-xs text-white uppercase truncate">{match.team2Name || 'TBD'}</span>
                        <input
                          type="number"
                          value={match.score2}
                          disabled={!match.team2Id}
                          onChange={(e) => updateMatchResult(match.id, match.score1, parseInt(e.target.value) || 0, match.status, match.winnerId)}
                          className="w-12 bg-surface-container border-b border-white/10 text-center font-mono text-sm py-1 text-white outline-none focus:border-secondary disabled:opacity-30"
                        />
                      </div>

                      {/* Winner Select */}
                      <div>
                        <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                          Select Winner (Required for Completed status)
                        </label>
                        <select
                          value={match.winnerId || ''}
                          disabled={isUpcoming}
                          onChange={(e) => updateMatchResult(match.id, match.score1, match.score2, match.status, e.target.value || null)}
                          className="w-full bg-[#0f1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none cursor-pointer disabled:opacity-30"
                        >
                          <option value="">Select Winner...</option>
                          {match.team1Id && <option value={match.team1Id}>{match.team1Name}</option>}
                          {match.team2Id && <option value={match.team2Id}>{match.team2Name}</option>}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: BROADCAST & MATCH TELEMETRY */}
        {activeTab === 'broadcast' && (
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-tertiary" />
            <h3 className="font-display font-black text-xl text-white uppercase mb-6 flex items-center gap-2">
              <Radio className="text-tertiary" size={20} />
              Stream Broadcast & Match Telemetry
            </h3>

            {liveMatch && liveMatch.status === 'live' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Round score adjuster */}
                <div className="bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-4">
                      Increment Round Winners (Real-time Overlay)
                    </h4>
                    
                    <div className="flex items-center justify-around font-mono text-center my-6">
                      <div>
                        <span className="font-display font-black text-sm text-white uppercase block">
                          {liveMatch.team1Name}
                        </span>
                        <button
                          onClick={() => updateLiveRound(1)}
                          className="mt-3 bg-secondary hover:bg-secondary/95 text-on-secondary px-4 py-2 text-xs uppercase font-bold clip-chamfer-btn cursor-pointer shadow-glow-cyan"
                        >
                          +1 Round ATK
                        </button>
                      </div>

                      <div className="font-display font-black text-3xl text-white">
                        {liveMatch.score1} : {liveMatch.score2}
                      </div>

                      <div>
                        <span className="font-display font-black text-sm text-white uppercase block">
                          {liveMatch.team2Name}
                        </span>
                        <button
                          onClick={() => updateLiveRound(2)}
                          className="mt-3 bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs uppercase font-bold clip-chamfer-btn cursor-pointer shadow-glow-red"
                        >
                          +1 Round DEF
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="font-mono text-[9px] text-on-surface/40 uppercase text-center border-t border-white/5 pt-4">
                    Pressing buttons simulates map round wins. Scores will update the Brackets and Live page instantly.
                  </p>
                </div>

                {/* Veto info preview */}
                <div className="bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn">
                  <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-4">
                    Live Match Details
                  </h4>
                  
                  <div className="flex flex-col gap-3 font-mono text-xs">
                    <div>
                      <span className="text-on-surface/50 uppercase block font-bold">Lobby Map decider</span>
                      <span className="text-white block mt-1">{liveMatch.currentMap} (HAVEN)</span>
                    </div>
                    <div>
                      <span className="text-on-surface/50 uppercase block font-bold">Vetoes List</span>
                      <ul className="list-disc pl-4 mt-1 flex flex-col gap-1 text-[11px] text-on-surface-variant">
                        {liveMatch.mapVetoes.map((v, i) => (
                          <li key={i}>{v.map} (Picked by: {v.pickedBy}) - {v.score}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10">
                <span className="font-mono text-xs text-on-surface/40 uppercase">
                  No match is currently set as "Live". Go to the "Match Scores & Brackets" tab and select "Live" status for a match.
                </span>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BANNER & ANNOUNCEMENTS */}
        {activeTab === 'news' && (
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-tertiary" />
            <h3 className="font-display font-black text-xl text-white uppercase mb-6 flex items-center gap-2">
              <Megaphone className="text-tertiary" size={20} />
              News Announcements & Ticker Banner
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Creator Form */}
              <div className="lg:col-span-1 bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn">
                <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-4">
                  Broadcast Alert Ticker
                </h4>
                
                <form onSubmit={handleAnnounce} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                      Banner Content
                    </label>
                    <input
                      type="text"
                      value={newAnn}
                      onChange={(e) => setNewAnn(e.target.value)}
                      placeholder="ENTER NEWS BANNER..."
                      className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2.5 text-xs font-mono text-white outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                      Banner Level / Type
                    </label>
                    <select
                      value={newAnnType}
                      onChange={(e) => setNewAnnType(e.target.value)}
                      className="w-full bg-[#0f1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none cursor-pointer"
                    >
                      <option value="info">INFO BLUE (STANDARD NEWS)</option>
                      <option value="warning">WARNING ORANGE (TIMINGS & LOCKS)</option>
                      <option value="alert">ALERT RED PULSE (LIVE BROADCAST)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-tertiary hover:bg-tertiary/90 text-white font-display font-black text-xs uppercase tracking-widest py-3 mt-2 clip-chamfer-btn cursor-pointer"
                  >
                    Broadcast Announcement
                  </button>
                </form>
              </div>

              {/* Feed lists */}
              <div className="lg:col-span-2 bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn">
                <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-4">
                  Current Announcement Marquees (Recent First)
                </h4>

                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                  {announcements.map((a) => (
                    <div key={a.id} className="flex items-center justify-between gap-3 p-3 border border-white/5 bg-black/25">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          a.type === 'alert' ? 'bg-primary' : a.type === 'warning' ? 'bg-warning' : 'bg-secondary'
                        }`} />
                        <span className="font-mono text-xs text-white uppercase leading-relaxed">{a.text}</span>
                      </div>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        className="text-on-surface-variant/40 hover:text-primary transition-colors cursor-pointer p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY UPLOADER */}
        {activeTab === 'gallery' && (
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
            <h3 className="font-display font-black text-xl text-white uppercase mb-6 flex items-center gap-2">
              <ImageIcon className="text-secondary" size={20} />
              Gallery Media & Certificates Uploader
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-1 bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn">
                <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-4">
                  Upload Media Asset
                </h4>
                
                <form onSubmit={handleMediaUpload} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                      Media Title
                    </label>
                    <input
                      type="text"
                      value={mediaTitle}
                      onChange={(e) => setMediaTitle(e.target.value)}
                      placeholder="E.G. CHAMPIONS MATCH PICTURE"
                      className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2.5 text-xs font-mono text-white outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                      Asset URL
                    </label>
                    <input
                      type="text"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      placeholder="HTTPS://IMAGES.UNSPLASH.COM/..."
                      className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2.5 text-xs font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1.5 font-bold">
                      Media Category
                    </label>
                    <select
                      value={mediaType}
                      onChange={(e) => setMediaType(e.target.value)}
                      className="w-full bg-[#0f1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none cursor-pointer"
                    >
                      <option value="screenshot">MATCH SCREENSHOT</option>
                      <option value="poster">PROMOTIONAL POSTER</option>
                      <option value="winner">WINNERS SPOTLIGHT</option>
                      <option value="highlight">MATCH HIGHLIGHTS</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-display font-black text-xs uppercase tracking-widest py-3 mt-2 clip-chamfer-btn cursor-pointer shadow-glow-cyan"
                  >
                    Upload Asset
                  </button>
                </form>
              </div>

              {/* Tips */}
              <div className="lg:col-span-2 bg-surface-container-low/40 p-5 border border-white/5 clip-chamfer-btn flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold mb-4">
                    Esports Media Operations Guidelines
                  </h4>
                  
                  <div className="font-sans text-xs text-on-surface/75 leading-relaxed flex flex-col gap-3">
                    <p>
                      1. **Image resolutions:** Preferred ratio is 16:9 widescreen to avoid thumbnail stretching in the grid masonry.
                    </p>
                    <p>
                      2. **Formats:** Direct hosting URLs (JPEG/PNG/WebP) are supported. If using Unsplash links, make sure they have valid image path configurations.
                    </p>
                    <p>
                      3. **Publishing schedule:** Post highlights immediately after map results, and winners spotlights immediately after the Grand Finals.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6">
                  <span className="font-mono text-[9px] text-on-surface/40 uppercase block">
                    uploaded assets are appended immediately in the public gallery.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
