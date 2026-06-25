import React, { useState } from 'react';
import { Search, Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'How do I register for the tournament?',
      a: 'Navigate to the "Register Now" page. Fill out your Team Name, Captain email/Discord/Riot details, and the Riot IDs for the other 4 active roster players. Once submitted, your registration goes into "Pending Review" until our referee verifies the eligibility guidelines.'
    },
    {
      q: 'Can we change players or substitute players after registering?',
      a: 'Roster changes can be requested via our support tickets or Discord up to 24 hours before the registration period ends (June 27th, 23:59 IST). Once registration locks, rosters are locked. However, you can register 1 substitute player during the initial registration form to cover emergency needs.'
    },
    {
      q: 'What happens if a player disconnects mid-match?',
      a: 'The team must immediately call a technical pause during the next buy phase. Each team has a maximum of 5 minutes technical pause allowance per map. If the player cannot reconnect within this limit, the team must play out the map 4v5 or forfeit.'
    },
    {
      q: 'Where are tournament lobbies and match links shared?',
      a: 'Official custom match lobbies will be created by designated tournament referees. The lobby name and password will be sent directly to your Captain via the private tournament channels on our official Discord Server 15 minutes before the scheduled match time.'
    },
    {
      q: 'Are coaches or managers allowed in the custom lobbies?',
      a: 'Yes, teams may have one registered coach in the designated spectator slot of the custom lobby. Coaches can only communicate with the players during tactical pauses or map breaks.'
    },
    {
      q: 'What servers are matches played on?',
      a: 'All matches default to Singapore or Mumbai servers. Referees will decide the server with the lowest average round-trip ping for both competing factions.'
    }
  ];

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs text-secondary uppercase tracking-[0.25em] font-bold block mb-2">
          HAVE QUESTIONS?
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      {/* Search Input */}
      <div className="w-full relative bg-[#0f1923] border-b border-white/10 focus-within:border-secondary transition-all mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40" size={16} />
        <input
          type="text"
          placeholder="SEARCH FAQS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 text-sm font-mono text-white bg-transparent outline-none uppercase"
        />
      </div>

      {/* FAQs Accordions list */}
      <div className="flex flex-col gap-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`panel-glass border transition-all duration-300 clip-chamfer-btn ${
                  isOpen 
                    ? 'border-secondary/40 bg-secondary/[0.02] shadow-[0_0_15px_rgba(0,241,254,0.05)]' 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                
                {/* Accordion Trigger */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={isOpen ? 'text-secondary' : 'text-on-surface/40'} size={18} />
                    <span className="font-display font-bold text-sm md:text-base text-white uppercase tracking-wide">
                      {faq.q}
                    </span>
                  </div>
                  <span className={`p-1 bg-white/5 rounded-none border border-white/10 ${isOpen ? 'text-secondary border-secondary/20' : 'text-white/60'}`}>
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5 font-sans text-xs md:text-sm text-on-surface/75 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed border-white/10">
            <span className="font-mono text-xs text-on-surface/40 uppercase">
              No matching FAQs found. Try searching another keyword.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
