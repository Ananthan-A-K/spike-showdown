import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import CountdownTimer from '../../../ui/CountdownTimer/CountdownTimer';
import { TOURNAMENT } from '../../../../constants/data';
import './Hero.css';

// Abstract tactical SVG artwork
function TacticalArtwork() {
  return (
    <div className="hero-artwork-container">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="hero-outer-ring"
      >
        <svg viewBox="0 0 520 520" fill="none" className="w-full h-full">
          <circle cx="260" cy="260" r="255" stroke="#E63946" strokeWidth="1" strokeDasharray="8 12" />
          <circle cx="260" cy="260" r="200" stroke="#4F7CAC" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </motion.div>

      {/* Inner counter-rotating */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="hero-inner-polygon"
      >
        <svg viewBox="0 0 380 380" fill="none" className="w-full h-full">
          <polygon points="190,10 370,105 370,275 190,370 10,275 10,105"
            stroke="#E63946" strokeWidth="0.75" strokeOpacity="0.4" />
          <polygon points="190,40 340,120 340,260 190,340 40,260 40,120"
            stroke="#4F7CAC" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
      </motion.div>

      {/* Central Spike crystal */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <svg viewBox="0 0 200 280" fill="none" className="hero-spike-crystal">
          {/* Spike body */}
          <defs>
            <linearGradient id="spikeGrad" x1="100" y1="0" x2="100" y2="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E63946" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#B82D38" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0F1115" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="spikeShine" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="faceLeft" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B82D38" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E63946" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="faceRight" x1="100" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E63946" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7a1a22" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Main crystal spike form */}
          <polygon points="100,0 140,80 100,260 60,80" fill="url(#faceLeft)" />
          <polygon points="100,0 160,90 100,260 140,80" fill="url(#faceRight)" />
          {/* Highlight face */}
          <polygon points="100,0 140,80 100,100 60,80" fill="url(#spikeShine)" />
          {/* Base facets */}
          <polygon points="60,80 100,260 40,180" fill="#B82D38" fillOpacity="0.3" />
          <polygon points="140,80 100,260 160,180" fill="#E63946" fillOpacity="0.2" />
          {/* Inner glow line */}
          <line x1="100" y1="0" x2="100" y2="260" stroke="#E63946" strokeWidth="0.75" strokeOpacity="0.6" />
          {/* Tip glow */}
          <circle cx="100" cy="4" r="3" fill="#E63946" fillOpacity="0.9" />
          <circle cx="100" cy="4" r="8" fill="#E63946" fillOpacity="0.15" />
        </svg>

        {/* Glow beneath spike */}
        <div className="hero-spike-glow" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="hero-particle"
          style={{
            left: `${20 + (i * 9.5)}%`,
            top:  `${15 + (i % 4) * 20}%`,
            opacity: 0.3 + (i % 3) * 0.15,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid corner decorations */}
      {[
        { top: '5%',  left: '5%',  rotate: 0 },
        { top: '5%',  right: '5%', rotate: 90 },
        { bottom: '5%', left: '5%', rotate: 270 },
        { bottom: '5%', right: '5%', rotate: 180 },
      ].map((pos, i) => (
        <div key={i} className="absolute opacity-20" style={pos}>
          <svg viewBox="0 0 24 24" fill="none" className="hero-corner-mark" style={{ transform: `rotate(${pos.rotate}deg)` }}>
            <path d="M0 12 L0 0 L12 0" stroke="#E63946" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* Ambient glow */}
      <div className="hero-artwork-ambient" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero-section">

      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Top gradient fade */}
      <div className="hero-top-fade" />
      <div className="hero-bottom-fade" />

      <div className="container-xl hero-shell">
        <div className="hero-container">

          {/* ── Left: Content ── */}
          <div className="hero-content">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="badge badge-accent">
                <span className="hero-live-dot animate-pulse" />
                Registration Open
              </span>
              <span className="badge badge-neutral">Season 1</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-headline">
                SPIKE
                <br />
                <span className="text-gradient-accent">SHOW</span>
                <span className="hero-headline-white">DOWN</span>
              </h1>
              <div className="hero-title-subrow">
                <div className="hero-line-accent" />
                <span className="hero-headline-sub">
                  The Premier Collegiate Valorant Championship
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hero-desc"
            >
              {TOURNAMENT.subtitle}. Compete with the best collegiate teams.
              Prove your dominance. Claim the prize.
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hero-countdown"
            >
              <p className="hero-countdown-label">
                Tournament Begins In
              </p>
              <CountdownTimer />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="hero-actions"
            >
              <Link to="/register" className="btn btn-primary flex items-center gap-2">
                Register Team
                <ArrowRight size={15} />
              </Link>
              <Link to="/about" className="btn btn-outline flex items-center">
                Learn More
              </Link>
            </motion.div>

            {/* Meta line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hero-meta"
            >
              {[
                { label: '16 Teams', sub: 'Maximum' },
                { label: '₹50K', sub: 'Prize Pool' },
                { label: 'Aug 2025', sub: 'Finals' },
              ].map(({ label, sub }) => (
                <div key={label} className="flex flex-col">
                  <span className="hero-meta-label">{label}</span>
                  <span className="hero-meta-sub">{sub}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Artwork ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-artwork-stage"
          >
            <TacticalArtwork />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="hero-scroll-indicator"
      >
        <span className="hero-scroll-text">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="hero-scroll-icon" />
        </motion.div>
      </motion.div>

    </section>
  );
}
