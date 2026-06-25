import React, { useState, useContext } from 'react';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';
import { TournamentContext } from '../context/TournamentContext';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { liveMatch } = useContext(TournamentContext);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'teams', label: 'Teams' },
    { id: 'brackets', label: 'Brackets' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'rulebook', label: 'Rules' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full bg-[#05060c] border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            {/* Valorant Slash Icon */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-7 h-7 md:w-9 md:h-9 fill-primary group-hover:scale-105 transition-transform duration-300"
            >
              <path d="M35 15 L20 30 L55 85 L70 85 Z" />
              <path d="M65 15 L80 30 L60 65 L45 65 Z" />
            </svg>
            <div>
              <span className="font-display font-black text-base md:text-lg tracking-wider text-white block leading-none">
                VALORANT
              </span>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-primary block mt-0.5 font-bold">
                SHOWDOWN
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 font-display text-[11px] xl:text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer font-extrabold relative flex items-center gap-1.5 ${
                  currentPage === item.id 
                    ? 'text-primary' 
                    : 'text-on-surface-variant/80 hover:text-white'
                }`}
              >
                {item.id === 'live' && liveMatch && liveMatch.status === 'live' && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-[-16px] xl:bottom-[-24px] left-4 right-4 h-[2px] bg-primary shadow-glow-red" />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Admin Access */}
            <button
              onClick={() => handleNav('admin')}
              className={`p-2 border rounded-none cursor-pointer transition-all duration-300 flex items-center gap-1.5 font-mono text-[10px] uppercase ${
                currentPage === 'admin'
                  ? 'border-primary text-primary shadow-glow-red bg-primary/5'
                  : 'border-white/10 text-on-surface-variant/60 hover:text-white hover:border-white/30'
              }`}
            >
              <Shield size={12} />
              Ref Admin
            </button>

            {/* Solid Red CTA */}
            <button
              onClick={() => handleNav('registration')}
              className="bg-primary hover:bg-primary/90 text-white pl-5 pr-4 py-2.5 font-display font-black text-xs uppercase tracking-widest transition-all duration-200 clip-chamfer-btn hover:scale-102 cursor-pointer flex items-center gap-1 border border-primary/20"
            >
              Register Now
              <ChevronRight size={14} className="mt-[-1px]" />
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('admin')}
              className="border border-white/10 text-on-surface-variant/70 p-1.5 font-mono text-[9px] uppercase cursor-pointer"
            >
              Admin
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-on-surface hover:text-white p-1.5 cursor-pointer border border-white/5 bg-white/5"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-[#05060c]/98 backdrop-blur-[35px] flex flex-col p-6 lg:hidden animate-fade-in border-t border-white/5">
          <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto pt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`py-3 px-4 font-display text-base uppercase tracking-wider text-left transition-all duration-300 border-l-2 cursor-pointer ${
                  currentPage === item.id 
                    ? 'border-primary text-primary bg-primary/5 font-black' 
                    : 'border-transparent text-on-surface-variant hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 mt-auto flex flex-col gap-3">
            <button
              onClick={() => handleNav('admin')}
              className={`py-3 text-center border font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer ${
                currentPage === 'admin'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-white/10 text-on-surface-variant/80'
              }`}
            >
              <Shield size={14} />
              Admin Panel
            </button>

            <button
              onClick={() => handleNav('registration')}
              className="bg-primary hover:bg-primary/95 text-white py-3.5 text-center font-display font-black text-sm uppercase tracking-widest clip-chamfer-btn shadow-glow-red cursor-pointer flex items-center justify-center gap-1"
            >
              Register Now
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
