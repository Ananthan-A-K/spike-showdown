import React, { useState } from 'react';
import { Search, Download, HelpCircle, AlertTriangle, UserCheck, Flame, PowerOff, ShieldAlert } from 'lucide-react';

export default function Rulebook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('all');

  const ruleSections = [
    {
      id: 'general',
      title: 'General Rules',
      icon: <HelpCircle className="text-secondary" size={20} />,
      accentColor: 'bg-secondary',
      rules: [
        { title: 'Spirit of the Game', desc: 'All participants must play in a spirit of sportsmanship, respect, and fair play. Abuse of referees, organizers, or fellow players will result in immediate disqualification.' },
        { title: 'Account Ownership', desc: 'Each player must use their own registered Riot Games account. Smurfing or account sharing is strictly prohibited and will trigger team disqualification.' },
        { title: 'Platform Requirements', desc: 'All games must be played on the current live patch version. PC is the only allowed platform.' }
      ]
    },
    {
      id: 'match',
      title: 'Match Rules',
      icon: <ShieldAlert className="text-primary" size={20} />,
      accentColor: 'bg-primary',
      rules: [
        { title: 'Map Veto Process', desc: 'For Bo3 matches: Team A bans, Team B bans, Team A picks Map 1 (Team B chooses side), Team B picks Map 2 (Team A chooses side), Decider map is determined from remaining pool.' },
        { title: 'Lobby Creation', desc: 'Lobbies will be created by the official tournament referee 15 minutes before the scheduled start time. Players must join within 10 minutes.' },
        { title: 'Tactical Pauses', desc: 'Each team is allowed two 60-second tactical pauses per map. Pauses must be called during the buy phase via the in-game voting interface.' }
      ]
    },
    {
      id: 'roster',
      title: 'Roster Rules',
      icon: <UserCheck className="text-tertiary" size={20} />,
      accentColor: 'bg-tertiary',
      rules: [
        { title: 'Roster Locks', desc: 'Rosters are locked 24 hours before the tournament registration deadline. No player substitutions can be made once matches have commenced.' },
        { title: 'Substitutes', desc: 'Teams may register up to one (1) substitute player who must also meet all eligibility requirements.' },
        { title: 'No Cross-Rostering', desc: 'A player cannot register or play for more than one team in this tournament.' }
      ]
    },
    {
      id: 'disconnection',
      title: 'Disconnection Policy',
      icon: <PowerOff className="text-warning" size={20} />,
      accentColor: 'bg-warning',
      rules: [
        { title: 'Technical Pauses', desc: 'In case of a player disconnection, the team must call a technical pause immediately during the next buy phase. Maximum tech pause is 5 minutes per team per map.' },
        { title: 'Re-Host Policy', desc: 'Lobbies will only be re-hosted if a disconnect occurs within the first 30 seconds of round 1 and no damage has been dealt by either team.' },
        { title: 'Match Continuance', desc: 'If a disconnected player cannot reconnect within the 5-minute technical pause allowance, the team must proceed 4v5 or forfeit.' }
      ]
    },
    {
      id: 'fairplay',
      title: 'Fair Play Policy',
      icon: <Flame className="text-success" size={20} />,
      accentColor: 'bg-success',
      rules: [
        { title: 'Cheating & Explores', desc: 'Any form of external hardware or software modification that provides an unfair advantage (aimbots, wallhacks, ESP) is banned. Visual exploits/glitch spots are prohibited.' },
        { title: 'Stream Sniping', desc: 'Watching official broadcasts or streams of opposition players during active matches is strictly illegal and will result in forfeits.' },
        { title: 'Collusion', desc: 'Intentionally losing rounds, throwing matches, or sharing match info with outside groups is banned and will result in lifetime bans.' }
      ]
    },
    {
      id: 'penalties',
      title: 'Penalties',
      icon: <AlertTriangle className="text-primary" size={20} />,
      accentColor: 'bg-primary',
      rules: [
        { title: 'Warning System', desc: 'Minor infractions (lobby delay, minor trash-talking) result in a warning. Two warnings on a team lead to a map forfeit.' },
        { title: 'Map Forfeits', desc: 'Major infractions (illegal pauses, roster violations) will result in a map loss (default score 0-13) for the offending team.' },
        { title: 'Tournament Disqualification', desc: 'Cheating, collusion, or severe toxicity results in immediate team disqualification, forfeiture of prizes, and blacklisting.' }
      ]
    }
  ];

  // Search filter
  const filteredSections = ruleSections.map(sec => {
    // If category active matches or is 'all'
    if (activeSection !== 'all' && sec.id !== activeSection) {
      return null;
    }
    
    const matchedRules = sec.rules.filter(
      rule =>
        rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedRules.length === 0) return null;

    return {
      ...sec,
      rules: matchedRules
    };
  }).filter(Boolean);

  // Mock download rulebook
  const handleDownloadRulebook = () => {
    let docText = `=========================================\n`;
    docText += `          SPIKE SHOWDOWN 2026          \n`;
    docText += `          OFFICIAL RULEBOOK            \n`;
    docText += `=========================================\n\n`;

    ruleSections.forEach(sec => {
      docText += `-----------------------------------------\n`;
      docText += `>> ${sec.title.toUpperCase()}\n`;
      docText += `-----------------------------------------\n`;
      sec.rules.forEach(r => {
        docText += `* ${r.title}\n  ${r.desc}\n\n`;
      });
      docText += `\n`;
    });

    const element = document.createElement("a");
    const file = new Blob([docText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "SpikeShowdown_Official_Rulebook.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-[0.25em] font-bold block mb-2">
          GOVERNING GUIDELINES
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          OFFICIAL RULEBOOK
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-8">
        {/* Search */}
        <div className="w-full md:max-w-md relative bg-[#0f1923] border-b border-white/10 focus-within:border-secondary transition-all">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" size={16} />
          <input
            type="text"
            placeholder="SEARCH RULES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm font-mono text-white bg-transparent outline-none uppercase"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleDownloadRulebook}
          className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-on-secondary px-6 py-3 font-display font-bold text-xs uppercase tracking-widest clip-chamfer-btn flex items-center justify-center gap-2 cursor-pointer shadow-glow-cyan"
        >
          <Download size={14} />
          Download Rulebook (TXT)
        </button>
      </div>

      {/* Tabs / Filter Badges */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
        <button
          onClick={() => setActiveSection('all')}
          className={`py-1.5 px-3 font-mono text-[10px] uppercase border cursor-pointer ${
            activeSection === 'all'
              ? 'border-secondary text-secondary bg-secondary/15 font-bold'
              : 'border-white/10 text-on-surface/65 hover:border-white/30'
          }`}
        >
          All Categories
        </button>
        {ruleSections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`py-1.5 px-3 font-mono text-[10px] uppercase border cursor-pointer ${
              activeSection === sec.id
                ? 'border-secondary text-secondary bg-secondary/15 font-bold'
                : 'border-white/10 text-on-surface/65 hover:border-white/30'
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Rule Sections List */}
      <div className="flex flex-col gap-8">
        {filteredSections.length > 0 ? (
          filteredSections.map(sec => (
            <div key={sec.id} className="panel-glass p-6 border border-white/5 relative clip-chamfer-card">
              {/* Colored Side Bar */}
              <div className={`absolute top-0 left-0 w-[4px] h-full ${sec.accentColor}`} />

              <h3 className="font-display font-black text-xl text-white uppercase flex items-center gap-2.5 mb-6 pl-2">
                {sec.icon}
                {sec.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
                {sec.rules.map((rule, idx) => (
                  <div key={idx} className="bg-surface-container-low/40 p-4 border border-white/5 clip-chamfer-btn">
                    <h4 className="font-mono text-xs text-white uppercase tracking-wider font-extrabold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {rule.title}
                    </h4>
                    <p className="mt-2 text-xs md:text-sm text-on-surface/75 leading-relaxed font-sans">
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-white/10">
            <span className="font-mono text-sm text-on-surface/40 uppercase">
              No matching rules found. Try searching another keyword.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
