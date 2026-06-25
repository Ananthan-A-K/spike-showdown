import React, { useState, useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { MessageSquare, Camera, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { addNotification } = useContext(TournamentContext);
  const [ticket, setTicket] = useState({
    name: '',
    email: '',
    subject: 'roster_inquiry',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticket.name.trim() || !ticket.email.trim() || !ticket.message.trim()) {
      addNotification('⚠️ Please fill out all required ticket fields.', 'warning');
      return;
    }
    
    setSuccess(true);
    addNotification('🎟️ Support ticket created! Our team will reach out via email.', 'success');
    setTicket({ name: '', email: '', subject: 'roster_inquiry', message: '' });
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-primary uppercase tracking-[0.25em] font-bold block mb-2">
          ESTABLISH COMMUNICATIONS
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
          CONTACT & SUPPORT
        </h2>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Communications Channels */}
        <div className="flex flex-col gap-6">
          {/* Comm Cards */}
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
            
            <div>
              <h3 className="font-display font-black text-xl text-white uppercase mb-4">
                Official Channels
              </h3>
              <p className="text-sm text-on-surface/75 leading-relaxed font-sans mb-8">
                Join our community server or connect with the operations committee through social channels. Captions are required to monitor Discord updates.
              </p>

              <div className="flex flex-col gap-4 font-mono text-xs sm:text-sm">
                {/* Discord */}
                <a 
                  href="https://discord.gg/invite-mock" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.01] hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 group clip-chamfer-btn"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="text-secondary group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <span className="font-bold text-white block uppercase">Discord Server</span>
                      <span className="text-[10px] text-on-surface/40 uppercase block mt-0.5">Primary match announcements</span>
                    </div>
                  </div>
                  <span className="text-secondary font-bold group-hover:underline">JOIN SERVER →</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com/spike_showdown" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.01] hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 group clip-chamfer-btn"
                >
                  <div className="flex items-center gap-3">
                    <Camera className="text-secondary group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <span className="font-bold text-white block uppercase">Instagram Feed</span>
                      <span className="text-[10px] text-on-surface/40 uppercase block mt-0.5">Stories, screenshots & clips</span>
                    </div>
                  </div>
                  <span className="text-secondary font-bold group-hover:underline">FOLLOW FEED →</span>
                </a>


                {/* Email */}
                <a 
                  href="mailto:support@spikeshowdown.gg" 
                  className="flex items-center justify-between p-4 border border-white/5 bg-white/[0.01] hover:border-secondary/30 hover:bg-secondary/5 transition-all duration-300 group clip-chamfer-btn"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="text-secondary group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <span className="font-bold text-white block uppercase">Email Support Desk</span>
                      <span className="text-[10px] text-on-surface/40 uppercase block mt-0.5">Formal team & business inquiries</span>
                    </div>
                  </div>
                  <span className="text-secondary font-bold group-hover:underline">SEND EMAIL →</span>
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4">
              <span className="font-mono text-[9px] text-on-surface/45 uppercase block">
                AVERAGE EMAIL RESPONSE TIME: 4 HOURS
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Ticket Form */}
        <div className="flex flex-col gap-6">
          <div className="panel-glass p-6 border border-white/5 clip-chamfer-card relative h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary" />
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-black text-xl text-white uppercase mb-6">
                  Submit Support Ticket
                </h3>

                {success ? (
                  <div className="p-8 text-center bg-success/5 border border-success/20 clip-chamfer-btn animate-fade-in my-8">
                    <CheckCircle2 className="text-success mx-auto mb-3" size={36} />
                    <span className="font-display font-black text-base text-white block uppercase">
                      Ticket Transmitted
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant block mt-2 uppercase">
                      Reference hash code: TICKET-{Math.floor(1000 + Math.random() * 9000)}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={ticket.name}
                        onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                        placeholder="E.G. JOHN SMITH"
                        className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none uppercase"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={ticket.email}
                        onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
                        placeholder="YOU@EMAIL.COM"
                        className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none"
                      />
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                        Subject Topic
                      </label>
                      <select
                        value={ticket.subject}
                        onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                        className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none cursor-pointer"
                      >
                        <option value="roster_inquiry">Roster / Player Changes</option>
                        <option value="disconnection_dispute">Disconnection Dispute</option>
                        <option value="sponsorship">Sponsorships & Partnership</option>
                        <option value="technical">Platform Technical Bug</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                        Support Message *
                      </label>
                      <textarea
                        rows="3"
                        value={ticket.message}
                        onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                        placeholder="ENTER YOUR QUERY IN DETAIL..."
                        className="w-full bg-[#0F1923] border-b border-white/10 focus:border-secondary px-3 py-2 text-xs font-mono text-white outline-none uppercase resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/95 text-white font-display font-black text-xs uppercase tracking-widest py-3.5 mt-2 clip-chamfer-btn shadow-glow-red cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send size={12} />
                      Transmit Ticket
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
