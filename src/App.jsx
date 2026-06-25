import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AnnouncementBanner from './components/AnnouncementBanner';
import LiveNotification from './components/LiveNotification';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Rulebook from './pages/Rulebook';
import Schedule from './pages/Schedule';
import Registration from './pages/Registration';
import Teams from './pages/Teams';
import Brackets from './pages/Brackets';
import Leaderboard from './pages/Leaderboard';
import Live from './pages/Live';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

import { MessageSquare, Camera, Share2, Play, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'rulebook':
        return <Rulebook />;
      case 'schedule':
        return <Schedule />;
      case 'registration':
        return <Registration setCurrentPage={setCurrentPage} />;
      case 'teams':
        return <Teams />;
      case 'brackets':
        return <Brackets setCurrentPage={setCurrentPage} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'live':
        return <Live />;
      case 'gallery':
        return <Gallery />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#020308] selection:bg-primary selection:text-white">
      {/* Background Glow Overlay */}
      <div className="cyber-bg-glow" />

      {/* Marquee Banner */}
      <AnnouncementBanner />

      {/* Navigation Header */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Space */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* FOOTER OVERHAUL - MATCHING REFERENCE DESIGN */}
      <footer className="w-full bg-[#05060c] border-t border-white/5 pt-16 pb-8 mt-20 relative z-10 font-sans text-xs md:text-sm text-on-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand Info & Socials */}
          <div className="lg:col-span-2 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 100 100" className="w-6 h-6 fill-primary">
                <path d="M35 15 L20 30 L55 85 L70 85 Z" />
                <path d="M65 15 L80 30 L60 65 L45 65 Z" />
              </svg>
              <div>
                <span className="font-display font-black text-white text-base tracking-wide leading-none block">
                  VALORANT
                </span>
                <span className="font-mono text-[9px] text-primary tracking-[0.2em] block font-bold leading-none mt-0.5">
                  SHOWDOWN
                </span>
              </div>
            </div>
            
            <p className="text-xs text-on-surface-variant/75 leading-relaxed max-w-xs">
              The ultimate Valorant tournament experience. Compete with the best, test your strategy, and win dominance on the battlefield.
            </p>
            
            {/* Social Icons row */}
            <div className="flex items-center gap-4 mt-2">
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-white transition-colors">
                <MessageSquare size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-white transition-colors">
                <Camera size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-white transition-colors">
                <Share2 size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-white transition-colors">
                <Play size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="text-left flex flex-col gap-3.5">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 font-mono text-[11px] uppercase">
              <button onClick={() => handleNav('home')} className="hover:text-white text-left cursor-pointer transition-colors">Home</button>
              <button onClick={() => handleNav('about')} className="hover:text-white text-left cursor-pointer transition-colors">About</button>
              <button onClick={() => handleNav('teams')} className="hover:text-white text-left cursor-pointer transition-colors">Teams</button>
              <button onClick={() => handleNav('brackets')} className="hover:text-white text-left cursor-pointer transition-colors">Brackets</button>
              <button onClick={() => handleNav('schedule')} className="hover:text-white text-left cursor-pointer transition-colors">Schedule</button>
            </div>
          </div>

          {/* Col 3: Rules & Info */}
          <div className="text-left flex flex-col gap-3.5">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              Rules & Info
            </h4>
            <div className="flex flex-col gap-2 font-mono text-[11px] uppercase">
              <button onClick={() => handleNav('rulebook')} className="hover:text-white text-left cursor-pointer transition-colors">Rulebook</button>
              <button onClick={() => handleNav('faq')} className="hover:text-white text-left cursor-pointer transition-colors">FAQ</button>
              <button onClick={() => handleNav('rulebook')} className="hover:text-white text-left cursor-pointer transition-colors">Code of Conduct</button>
              <span className="opacity-40">Privacy Policy</span>
              <span className="opacity-40">Terms & Conditions</span>
            </div>
          </div>

          {/* Col 4: Support & Stay Connected */}
          <div className="text-left flex flex-col gap-3.5">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              Support
            </h4>
            <div className="flex flex-col gap-2 font-mono text-[11px] uppercase">
              <button onClick={() => handleNav('contact')} className="hover:text-white text-left cursor-pointer transition-colors">Contact Us</button>
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord Support</a>
              <button onClick={() => handleNav('contact')} className="hover:text-white text-left cursor-pointer transition-colors">Report an Issue</button>
            </div>
          </div>

        </div>

        {/* Discord CTA Block Strip on the right */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-white/5 pt-8 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-[#0a0b12] border border-secondary/25 p-4 py-3.5 w-full max-w-sm justify-between clip-chamfer-btn hover:border-secondary transition-all">
            <div className="text-left font-mono">
              <span className="font-display font-black text-xs text-white block uppercase tracking-wide">Stay Connected</span>
              <span className="text-[9px] text-on-surface-variant block mt-0.5 uppercase">Join Discord for real-time updates</span>
            </div>
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noreferrer"
              className="bg-transparent border border-secondary hover:bg-secondary hover:text-black text-secondary px-3 py-1.5 font-display font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 clip-chamfer-btn transition-all"
            >
              Join Discord
              <ChevronRight size={10} />
            </a>
          </div>

          {/* Copyright Meta */}
          <div className="text-center sm:text-right font-mono text-[9px] text-on-surface-variant/45 uppercase tracking-widest leading-relaxed">
            <p>© 2026 VALORANT SHOWDOWN. ALL RIGHTS RESERVED.</p>
            <p className="mt-1">
              DESIGNED WITH <span className="text-primary font-bold">♥</span> FOR GAMERS
            </p>
          </div>
        </div>

      </footer>

      {/* Live Notification Toasts */}
      <LiveNotification />
    </div>
  );
}
