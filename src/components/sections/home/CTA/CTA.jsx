import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CTA.css';

const CORNER_DECORATIONS = [
  { top: '1rem',  left:  '1rem',  rotate: 0   },
  { top: '1rem',  right: '1rem',  rotate: 90  },
  { bottom: '1rem', left: '1rem', rotate: 270 },
  { bottom: '1rem', right: '1rem', rotate: 180 },
];

export default function CTA({ indicators = [] }) {
  return (
    <section className="section-pad cta-section">
      <div className="container-xl">
        <div className="cta-box">

          {/* Background decorative elements */}
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="cta-glow-top" />
          <div className="cta-glow-bottom" />

          {/* Corner decorations */}
          {CORNER_DECORATIONS.map((pos, i) => (
            <div key={i} className="absolute opacity-15" style={pos}>
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <path d="M0 12 L0 0 L12 0" stroke="#E63946" strokeWidth="1.5" />
              </svg>
            </div>
          ))}

          <div className="cta-content">

            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="badge badge-accent"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
              Season 1 — Registration Open
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="cta-heading"
            >
              READY TO
              <br />
              <span className="text-gradient-accent">COMPETE?</span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="cta-sub"
            >
              Assemble your team, submit your roster, and fight for the title.
              No entry fee. Open to all college students across India.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/register" className="btn btn-primary flex items-center gap-2 px-10">
                Register Your Team
                <ArrowRight size={15} />
              </Link>
              <Link to="/rules" className="btn btn-outline px-8">
                View Rules
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 flex-wrap justify-center"
            >
              {indicators.map((item) => (
                <div key={item} className="cta-indicator">
                  <div className="cta-indicator-dot" />
                  <span className="cta-indicator-text">{item}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
