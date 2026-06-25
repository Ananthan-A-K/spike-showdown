import React, { useState, useEffect, useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Gamepad2, 
  Sword, 
  Users, 
  Mail, 
  ChevronRight, 
  ShieldAlert, 
  FileText, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Home({ setCurrentPage }) {
  const { registrations } = useContext(TournamentContext);
  
  // Timer calculations
  const targetDate = new Date('2026-07-05T18:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  const carouselTeams = [
    { name: 'Team Velocity', logo: '⚡', color: 'text-secondary' },
    { name: 'Noxious Five', logo: '💀', color: 'text-primary' },
    { name: 'Revenant Esports', logo: '🟪', color: 'text-tertiary' },
    { name: 'Blaze Unit', logo: '🔥', color: 'text-warning' },
    { name: 'Inferno Squad', logo: '🟥', color: 'text-primary' },
    { name: 'Zero Hour', logo: '⏳', color: 'text-secondary' },
    { name: 'Crimson Crew', logo: '🐙', color: 'text-primary' },
    { name: 'Void Walkers', logo: '👁️', color: 'text-tertiary' }
  ];

  // For newsletter mock
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#020308] text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        
        {/* Left Side: Headings & CTA */}
        <div className="flex-1 text-left z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold mb-6">
            <Sword size={12} className="animate-pulse" />
            THE ULTIMATE VALORANT BATTLE
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter text-white uppercase leading-none select-none">
            READY. AIM.<br/>
            <span className="text-primary text-glow-red">DOMINATE.</span>
          </h1>

          <p className="mt-6 text-on-surface-variant text-sm md:text-base leading-relaxed font-sans">
            Join the most intense Valorant tournament, compete with the best teams, and prove your dominance on the battlefield.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleNav('registration')}
              className="bg-primary hover:bg-primary/90 text-white font-display font-black text-xs uppercase tracking-widest px-7 py-3.5 clip-chamfer-btn shadow-glow-red hover:scale-102 transition-all duration-200 cursor-pointer flex items-center gap-1 border border-primary/20"
            >
              Register Now
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => handleNav('rulebook')}
              className="border border-white/10 hover:border-secondary hover:text-secondary text-white font-display font-bold text-xs uppercase tracking-widest px-7 py-3.5 bg-black/30 hover:bg-secondary/5 transition-all duration-200 flex items-center gap-2 cursor-pointer clip-chamfer-btn"
            >
              <FileText size={14} />
              View Rules
            </button>
          </div>
        </div>

        {/* Right Side: Key Visual Character & Ticker */}
        <div className="flex-1 w-full flex flex-col items-center lg:items-end z-10 relative">
          
          {/* Valorant Glowing "V" Watermark */}
          <div className="absolute right-[-40px] top-[-30px] w-[350px] h-[350px] md:w-[450px] md:h-[450px] opacity-15 pointer-events-none select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-primary blur-[2px]">
              <path d="M35 15 L20 30 L55 85 L70 85 Z" />
              <path d="M65 15 L80 30 L60 65 L45 65 Z" />
            </svg>
          </div>

          {/* Floating Character Card */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-gradient-to-b from-primary/10 via-background/40 to-background border border-white/10 clip-chamfer-card overflow-hidden shadow-glow-red/20 group">
            <img 
              src="/hero_key_visual.png" 
              alt="Valorant Showdown Key Art" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020308] via-transparent to-transparent opacity-80" />
            
            {/* Neon border details */}
            <div className="absolute bottom-4 left-4 border-l border-primary pl-2 font-mono text-[9px] text-primary uppercase tracking-[0.2em] font-bold">
              DEFY THE LIMITS
            </div>
          </div>

          {/* Red Outlined Countdown Ticker overlay underneath */}
          <div className="mt-6 w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-between gap-1.5 font-mono text-center">
            {/* Days */}
            <div className="flex-1 bg-[#060813] border border-primary/30 p-2 relative">
              <span className="font-display font-black text-lg text-primary block leading-none">{formatNum(timeLeft.days)}</span>
              <span className="text-[7px] text-on-surface-variant block uppercase tracking-wider mt-1">Days</span>
            </div>
            
            {/* Hours */}
            <div className="flex-1 bg-[#060813] border border-white/10 p-2 relative">
              <span className="font-display font-black text-lg text-white block leading-none">{formatNum(timeLeft.hours)}</span>
              <span className="text-[7px] text-on-surface-variant block uppercase tracking-wider mt-1 font-bold">Hours</span>
            </div>

            {/* Mins */}
            <div className="flex-1 bg-[#060813] border border-white/10 p-2 relative">
              <span className="font-display font-black text-lg text-white block leading-none">{formatNum(timeLeft.minutes)}</span>
              <span className="text-[7px] text-on-surface-variant block uppercase tracking-wider mt-1 font-bold">Minutes</span>
            </div>

            {/* Secs */}
            <div className="flex-1 bg-[#060813] border border-primary/30 p-2 relative">
              <span className="font-display font-black text-lg text-primary block leading-none">{formatNum(timeLeft.seconds)}</span>
              <span className="text-[7px] text-on-surface-variant block uppercase tracking-wider mt-1">Seconds</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CYAN TELEMETRY STAT STRIP */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 mb-12">
        <div className="w-full bg-[#060813] border border-secondary/30 shadow-glow-cyan/15 py-5 px-6 flex flex-wrap items-center justify-around gap-6 text-center clip-chamfer-btn">
          
          {/* Teams count */}
          <div className="flex items-center gap-3">
            <Users className="text-secondary" size={24} />
            <div className="text-left font-mono">
              <span className="font-display font-black text-xl text-white block leading-none">32+</span>
              <span className="text-[9px] text-on-surface-variant uppercase tracking-widest block mt-0.5">TEAMS REGISTERED</span>
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-white/10" />

          {/* Players count */}
          <div className="flex items-center gap-3">
            <Gamepad2 className="text-secondary" size={24} />
            <div className="text-left font-mono">
              <span className="font-display font-black text-xl text-white block leading-none">160+</span>
              <span className="text-[9px] text-on-surface-variant uppercase tracking-widest block mt-0.5">ACTIVE PLAYERS</span>
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-white/10" />

          {/* Matches count */}
          <div className="flex items-center gap-3">
            <Sword className="text-secondary" size={24} />
            <div className="text-left font-mono">
              <span className="font-display font-black text-xl text-white block leading-none">48+</span>
              <span className="text-[9px] text-on-surface-variant uppercase tracking-widest block mt-0.5">MATCH SERIES</span>
            </div>
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-white/10" />

          {/* Prize pool */}
          <div className="flex items-center gap-3">
            <Trophy className="text-secondary" size={24} />
            <div className="text-left font-mono">
              <span className="font-display font-black text-xl text-white block leading-none">₹25,000</span>
              <span className="text-[9px] text-on-surface-variant uppercase tracking-widest block mt-0.5">TOTAL PRIZE POOL</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THREE COLUMN INFO BLOCKS GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: TOURNAMENT INFO */}
        <div className="bg-[#060813] border border-white/5 p-6 flex flex-col justify-between clip-chamfer-btn hover:border-secondary/20 transition-all duration-300 relative group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
          
          <div>
            <h3 className="font-display font-black text-sm text-white uppercase flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Tournament Info
            </h3>

            <div className="flex flex-col gap-4 font-mono text-xs">
              <div className="flex items-start gap-3">
                <Calendar size={14} className="text-primary mt-0.5" />
                <div>
                  <span className="text-on-surface-variant uppercase block font-bold text-[9px]">Date</span>
                  <span className="text-white block mt-0.5 uppercase">July 25 - 27, 2026</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-white/5 pt-3">
                <Gamepad2 size={14} className="text-primary mt-0.5" />
                <div>
                  <span className="text-on-surface-variant uppercase block font-bold text-[9px]">Mode</span>
                  <span className="text-white block mt-0.5 uppercase">5v5 | Single Elimination</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-white/5 pt-3">
                <Users size={14} className="text-primary mt-0.5" />
                <div>
                  <span className="text-on-surface-variant uppercase block font-bold text-[9px]">Platform</span>
                  <span className="text-white block mt-0.5 uppercase">PC (Riot Client)</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-white/5 pt-3">
                <Clock size={14} className="text-primary mt-0.5" />
                <div>
                  <span className="text-on-surface-variant uppercase block font-bold text-[9px]">Registration Ends</span>
                  <span className="text-white block mt-0.5 uppercase">July 22, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNav('schedule')}
            className="w-full mt-8 border border-white/10 hover:border-secondary hover:text-secondary text-white font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer text-center bg-black/20"
          >
            View Schedule
          </button>
        </div>

        {/* Card 2: UPCOMING MATCH */}
        <div className="bg-[#060813] border border-white/5 p-6 flex flex-col justify-between clip-chamfer-btn hover:border-secondary/20 transition-all duration-300 relative group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary" />
          
          <div>
            <h3 className="font-display font-black text-sm text-white uppercase flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Upcoming Match
            </h3>

            {/* Versus row */}
            <div className="flex items-center justify-around font-mono my-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl p-1 bg-white/5 border border-white/5 rounded-none mb-2">⚡</span>
                <span className="text-[10px] font-bold text-white uppercase max-w-[80px] truncate block leading-tight">Shadow Strikers</span>
              </div>
              
              <div className="text-xs font-display font-black text-primary border border-primary/20 bg-primary/5 px-2 py-1 leading-none uppercase">
                VS
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl p-1 bg-white/5 border border-white/5 rounded-none mb-2">🔥</span>
                <span className="text-[10px] font-bold text-white uppercase max-w-[80px] truncate block leading-tight">Nova Esports</span>
              </div>
            </div>

            {/* Match info details */}
            <div className="text-center font-mono text-xs border-t border-white/5 pt-4">
              <span className="text-secondary font-bold uppercase tracking-wider block">
                SEMIFINALS - MATCH 1
              </span>
              <span className="text-on-surface-variant text-[10px] block mt-1 uppercase">
                July 25, 2026 - 07:00 PM IST
              </span>
            </div>
          </div>

          <button
            onClick={() => handleNav('brackets')}
            className="w-full mt-8 border border-white/10 hover:border-secondary hover:text-secondary text-white font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer text-center bg-black/20"
          >
            View Brackets
          </button>
        </div>

        {/* Card 3: PRIZE POOL */}
        <div className="bg-[#060813] border border-white/5 p-6 flex flex-col justify-between clip-chamfer-btn hover:border-secondary/20 transition-all duration-300 relative group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
          
          <div>
            <h3 className="font-display font-black text-sm text-white uppercase flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Prize Pool
            </h3>

            {/* Trophy Image & stats */}
            <div className="relative aspect-video w-full border border-white/5 bg-black/25 overflow-hidden clip-chamfer-btn mb-4 flex items-center justify-center p-2">
              <img 
                src="/trophy_key_visual.png" 
                alt="Trophy Cup Showcase" 
                className="max-h-[90%] object-contain" 
              />
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="text-center font-mono">
              <span className="text-primary font-black text-xl block leading-none tracking-wide text-glow-red">
                ₹25,000
              </span>
              <span className="text-on-surface-variant text-[10px] block uppercase mt-1 tracking-widest font-bold">
                TOTAL PRIZE POOL
              </span>
            </div>
          </div>

          <button
            onClick={() => handleNav('about')}
            className="w-full mt-6 border border-white/10 hover:border-secondary hover:text-secondary text-white font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer text-center bg-black/20"
          >
            Prize Breakdown
          </button>
        </div>

      </section>

      {/* 4. REGISTERED TEAMS MARQUEE SLIDER */}
      <section className="w-full bg-[#05060c] border-t border-b border-white/5 py-12 mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-fast" />
            <h3 className="font-display font-black text-lg text-white uppercase tracking-wide">
              Registered Teams
            </h3>
          </div>
          
          <button 
            onClick={() => handleNav('teams')}
            className="font-mono text-[10px] text-secondary font-bold hover:underline cursor-pointer uppercase flex items-center gap-1"
          >
            View All Teams
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Marquee Carousel wrapper */}
        <div className="relative w-full flex overflow-x-hidden select-none py-2">
          {/* Gradient shadows left/right */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#020308] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#020308] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 items-center whitespace-nowrap animate-scroll-left">
            {/* Render items double for seamless scrolling loop */}
            {[...carouselTeams, ...carouselTeams].map((team, idx) => (
              <div 
                key={idx} 
                className="inline-flex items-center gap-3 bg-[#060813] border border-white/5 p-4 py-3 min-w-[200px] clip-chamfer-btn hover:border-secondary/20 transition-all cursor-pointer"
              >
                <span className="text-2xl p-1 bg-white/5 border border-white/5">{team.logo}</span>
                <span className="font-display font-black text-xs text-white uppercase tracking-wider">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT THE TOURNAMENT & HIGHLIGHTS */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        
        {/* About Details */}
        <div className="bg-[#060813] border border-white/5 p-8 flex flex-col justify-between clip-chamfer-card relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary" />
          
          <div>
            <h3 className="font-display font-black text-xl text-white uppercase mb-4">
              About the Tournament
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-sans mb-8">
              Valorant Showdown is here to bring the best teams together for an epic battle of strategy, skill, and teamwork. Do you have what it takes to be the last team standing?
            </p>

            {/* Roster visual inside */}
            <div className="relative aspect-video w-full border border-white/5 bg-black/25 overflow-hidden clip-chamfer-btn mb-4">
              <img 
                src="/roster_key_visual.png" 
                alt="Valorant Roster Lineup" 
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <button
            onClick={() => handleNav('about')}
            className="w-full mt-4 border border-white/10 hover:border-secondary hover:text-secondary text-white font-mono text-[10px] uppercase font-bold py-2.5 px-4 transition-colors cursor-pointer text-center bg-black/20"
          >
            Learn More
          </button>
        </div>

        {/* Highlights List */}
        <div className="bg-[#060813] border border-white/5 p-8 flex flex-col justify-between clip-chamfer-card relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-primary" />
          
          <div>
            <h3 className="font-display font-black text-xl text-white uppercase mb-6">
              Tournament Highlights
            </h3>

            <ul className="flex flex-col gap-5 font-mono text-xs sm:text-sm">
              {[
                { title: 'Professional Tournament Management', desc: 'Managed by veteran e-sports refs using automated matches tools.' },
                { title: 'Fair Play & Anti-Cheat', desc: 'Strict Riot Client integration checks and stream sniping locks.' },
                { title: 'Live Streaming & Commentary', desc: 'Casted by professional stream talent on Twitch & YouTube handles.' },
                { title: 'Exciting Prizes', desc: 'Total of ₹25,000 cash pool along with hardware hampers.' },
                { title: 'Certificates for All Participants', desc: 'Custom digital certificates available to claim in the gallery.' }
              ].map((h, idx) => (
                <li key={idx} className="flex gap-3 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wide leading-none mb-1">
                      {h.title}
                    </h4>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>

      {/* 6. NEWSLETTER SIGNUP BAR */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-2 mb-16">
        <div className="w-full border border-primary/30 bg-[#060813]/60 shadow-glow-red/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 clip-chamfer-btn relative">
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 border border-primary/20 text-primary clip-chamfer-btn hidden sm:block">
              <Mail size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-display font-black text-lg md:text-xl text-white uppercase">
                Join our Newsletter
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-sans mt-1">
                Get the latest updates, announcements, and tournament news straight to your inbox.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:max-w-md flex items-center gap-2 bg-[#020308] border border-white/10 px-2 py-1.5 focus-within:border-primary transition-colors">
            {subscribed ? (
              <span className="w-full text-center font-mono text-xs text-primary font-bold uppercase py-2">
                ✓ Thank you for subscribing!
              </span>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent border-0 px-3 py-1.5 text-xs font-mono text-white outline-none placeholder:text-white/30 uppercase"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-display font-black text-[10px] uppercase tracking-widest px-4 py-2 clip-chamfer-btn cursor-pointer transition-colors"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>

        </div>
      </section>

    </div>
  );
}
