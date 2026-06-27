import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Zap, Flag, MapPin } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition, containerVariants, itemVariants } from '../../animations/variants';
import './Schedule.css';

const SCHEDULE = [
  {
    date: 'July 1, 2025',
    time: '12:00 IST',
    event: 'Registration Opens',
    type: 'milestone',
    desc: 'Team registration portal goes live. Submit your roster now.',
  },
  {
    date: 'July 15, 2025',
    time: '23:59 IST',
    event: 'Registration Deadline',
    type: 'deadline',
    desc: 'Last date to register your team. No late entries accepted.',
  },
  {
    date: 'July 18, 2025',
    time: '18:00 IST',
    event: 'Team Draw & Seeding',
    type: 'milestone',
    desc: 'Official bracket draw and group seeding announcement on Discord.',
  },
  {
    date: 'July 20, 2025',
    time: '10:00 IST',
    event: 'Group Stage Begins',
    type: 'match',
    desc: 'Round-robin matches start. All teams play across 3 rounds.',
  },
  {
    date: 'August 5, 2025',
    time: '20:00 IST',
    event: 'Group Stage Ends',
    type: 'match',
    desc: 'Final group stage matches. Top 8 teams advance to playoffs.',
  },
  {
    date: 'August 10, 2025',
    time: '10:00 IST',
    event: 'Playoff Stage',
    type: 'match',
    desc: 'Single-elimination bracket begins. Quarter-finals day.',
  },
  {
    date: 'August 12, 2025',
    time: '14:00 IST',
    event: 'Semi-Finals',
    type: 'match',
    desc: 'Top 4 battle for a spot in the grand final.',
  },
  {
    date: 'August 15, 2025',
    time: '12:00 IST',
    event: 'Grand Final - LAN',
    type: 'final',
    desc: 'Best of 5. One team will be crowned SPIKE SHOWDOWN Season 1 Champions.',
  },
];

const TYPE_CONFIG = {
  milestone: { icon: Zap,      color: 'var(--color-blue)',    bg: 'rgba(79,124,172,0.1)',  classPrefix: 'milestone', label: 'Milestone' },
  deadline:  { icon: Flag,     color: 'var(--color-accent)',  bg: 'rgba(230,57,70,0.1)',   classPrefix: 'deadline',  label: 'Deadline' },
  match:     { icon: Calendar, color: 'var(--color-success)', bg: 'rgba(34,197,94,0.1)',   classPrefix: 'match',     label: 'Match Day' },
  final:     { icon: Clock,    color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.1)',  classPrefix: 'final',     label: 'Grand Final' },
};

const FILTERS = ['All', 'Milestone', 'Deadline', 'Match Day', 'Grand Final'];

export default function Schedule() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? SCHEDULE
    : SCHEDULE.filter(e => (TYPE_CONFIG[e.type]?.label || 'Milestone') === filter);

  return (
    <motion.div
      key="schedule"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Schedule"
        title="Tournament Timeline"
        subtitle="All key dates, match days, and milestones for SPIKE SHOWDOWN Season 1."
      />

      <section className="section-pad">
        <div className="container-xl">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3" style={{ marginBottom: '4rem' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? 'schedule-filter-btn-active' : 'schedule-filter-btn'}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative flex flex-col gap-0"
          >
            {/* Vertical track */}
            <div className="schedule-track-line" />

            {filtered.map((event, i) => {
              const cfg = TYPE_CONFIG[event.type] || TYPE_CONFIG.milestone;
              const Icon = cfg.icon;
              const isRight = i % 2 === 1;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`schedule-row ${isRight ? 'schedule-row-reverse' : ''}`}
                >
                  {/* Node */}
                  <div className="schedule-node">
                    <div className={`schedule-node-box node-${cfg.classPrefix}`}>
                      <Icon size={20} style={{ color: cfg.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="schedule-content">
                    <motion.div
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="schedule-page-card"
                    >
                      {/* Type badge */}
                      <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                        <span
                          className="font-mono text-[0.5rem] uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{ color: cfg.color, background: cfg.bg }}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#F5F7FA] leading-tight" style={{ marginBottom: '0.5rem' }}>
                        {event.event}
                      </h3>
                      <p className="text-[#7D8793] text-[0.8125rem] leading-relaxed font-sans" style={{ marginBottom: '1rem' }}>
                        {event.desc}
                      </p>

                      {/* Date & time */}
                      <div className="schedule-page-meta">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-[#7D8793]" />
                          <span className="font-mono text-[0.575rem] uppercase tracking-wider text-[#7D8793]">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} className="text-[#7D8793]" />
                          <span className="font-mono text-[0.575rem] uppercase tracking-wider text-[#7D8793]">{event.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <p className="text-[#7D8793] font-mono text-sm">No events match this filter.</p>
            </div>
          )}

          {/* Note */}
          <div className="flex items-start gap-3 bg-[#1F242C] border border-[#2D3440] rounded-xl p-5" style={{ marginTop: '4rem' }}>
            <MapPin size={16} className="text-[#4F7CAC] flex-shrink-0" style={{ marginTop: '0.125rem' }} />
            <p className="text-[#7D8793] text-sm font-sans leading-relaxed">
              All times are in <strong className="text-[#B6BEC8]">Indian Standard Time (IST)</strong>.
              Join our <a href="https://discord.gg" target="_blank" rel="noreferrer" className="text-[#4F7CAC] hover:text-[#F5F7FA] transition-colors" style={{ textDecoration: 'none' }}>Discord server</a> for
              real-time match notifications and schedule updates.
            </p>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
