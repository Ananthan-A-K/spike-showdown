import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  // Target: July 5, 2026, 18:00:00 UTC+5.5
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

  return (
    <div className="flex items-center gap-2 md:gap-4 font-mono text-center justify-center">
      {/* Days */}
      <div className="bg-surface-container-low border border-white/5 px-3 py-2 md:px-5 md:py-4 w-16 sm:w-20 md:w-24 relative overflow-hidden clip-chamfer-btn">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary" />
        <div className="font-display font-black text-xl sm:text-2xl md:text-4xl text-secondary text-glow-cyan">
          {formatNum(timeLeft.days)}
        </div>
        <div className="text-[8px] md:text-xs text-on-surface/55 uppercase tracking-widest mt-1.5 font-bold">
          Days
        </div>
      </div>

      <span className="text-primary font-black text-lg md:text-2xl animate-pulse">:</span>

      {/* Hours */}
      <div className="bg-surface-container-low border border-white/5 px-3 py-2 md:px-5 md:py-4 w-16 sm:w-20 md:w-24 relative overflow-hidden clip-chamfer-btn">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20" />
        <div className="font-display font-black text-xl sm:text-2xl md:text-4xl text-white">
          {formatNum(timeLeft.hours)}
        </div>
        <div className="text-[8px] md:text-xs text-on-surface/55 uppercase tracking-widest mt-1.5 font-bold">
          Hours
        </div>
      </div>

      <span className="text-primary font-black text-lg md:text-2xl animate-pulse">:</span>

      {/* Minutes */}
      <div className="bg-surface-container-low border border-white/5 px-3 py-2 md:px-5 md:py-4 w-16 sm:w-20 md:w-24 relative overflow-hidden clip-chamfer-btn">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20" />
        <div className="font-display font-black text-xl sm:text-2xl md:text-4xl text-white">
          {formatNum(timeLeft.minutes)}
        </div>
        <div className="text-[8px] md:text-xs text-on-surface/55 uppercase tracking-widest mt-1.5 font-bold">
          Minutes
        </div>
      </div>

      <span className="text-primary font-black text-lg md:text-2xl animate-pulse">:</span>

      {/* Seconds */}
      <div className="bg-surface-container-low border border-white/5 px-3 py-2 md:px-5 md:py-4 w-16 sm:w-20 md:w-24 relative overflow-hidden clip-chamfer-btn">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
        <div className="font-display font-black text-xl sm:text-2xl md:text-4xl text-primary text-glow-red">
          {formatNum(timeLeft.seconds)}
        </div>
        <div className="text-[8px] md:text-xs text-on-surface/55 uppercase tracking-widest mt-1.5 font-bold">
          Seconds
        </div>
      </div>
    </div>
  );
}
