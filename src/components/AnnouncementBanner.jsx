import React, { useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { Megaphone } from 'lucide-react';

export default function AnnouncementBanner() {
  const { announcements } = useContext(TournamentContext);

  if (!announcements || announcements.length === 0) return null;

  const currentAnnouncement = announcements[0];

  const getColorClass = (type) => {
    switch (type) {
      case 'alert':
        return 'bg-primary text-white border-b border-primary/20 shadow-glow-red';
      case 'warning':
        return 'bg-warning text-black font-bold border-b border-warning/20';
      case 'info':
      default:
        return 'bg-surface-container text-secondary border-b border-secondary/20';
    }
  };

  return (
    <div className={`w-full py-2 px-4 flex items-center justify-center text-xs md:text-sm font-mono transition-all duration-300 ${getColorClass(currentAnnouncement.type)} overflow-hidden z-50`}>
      <div className="flex items-center gap-3 overflow-hidden max-w-7xl">
        <Megaphone size={16} className={`${currentAnnouncement.type === 'alert' ? 'animate-bounce' : 'animate-pulse'} flex-shrink-0`} />
        <div className="whitespace-nowrap overflow-hidden text-ellipsis uppercase tracking-wider font-semibold">
          {currentAnnouncement.text}
        </div>
        <span className="hidden sm:inline-block text-[10px] opacity-70 border border-current px-1.5 py-0.5 uppercase">
          {currentAnnouncement.date}
        </span>
      </div>
    </div>
  );
}
