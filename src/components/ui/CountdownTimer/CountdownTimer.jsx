import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../../hooks';
import './CountdownTimer.css';

function Digit({ value, label }) {
  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Background card */}
        <div className="countdown-card">
          {/* Subtle top line */}
          <div className="countdown-card-shine" />
          <motion.span
            key={padded}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{    y:  20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="countdown-digit countdown-digit-value"
          >
            {padded}
          </motion.span>
        </div>
      </div>
      <span className="countdown-label">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate = new Date('2026-07-25T20:00:00+05:30'), className = '' }) {
  const target   = targetDate;
  const timeLeft = useCountdown(target);

  if (timeLeft.total <= 0) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="inline-flex items-center gap-2 badge badge-accent text-sm px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
          Event is Live
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 md:gap-3 ${className}`}>
      <Digit value={timeLeft.days}    label="Days" />
      <span className="countdown-colon">:</span>
      <Digit value={timeLeft.hours}   label="Hours" />
      <span className="countdown-colon">:</span>
      <Digit value={timeLeft.minutes} label="Mins" />
      <span className="countdown-colon">:</span>
      <Digit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
