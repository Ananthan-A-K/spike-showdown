import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Zap, Flag, MapPin } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition, containerVariants, itemVariants } from '../../animations/variants';
import './Schedule.css';

const SCHEDULE = [
  {
    date: 'July 1, 2026',
    time: '6:00 PM IST',
    event: 'Tournament Teaser',
    type: 'milestone',
    desc: "The official announcement of SPIKE SHOWDOWN Season 1. Get ready for Kerala's competitive Valorant championship.",
  },
  {
    date: 'July 3, 2026',
    time: '6:00 PM IST',
    event: 'Registration Opens',
    type: 'milestone',
    desc: 'Team registration officially begins through the Google Form.',
  },
  {
    date: 'July 6, 2026',
    time: '6:00 PM IST',
    event: 'Tournament Details',
    type: 'milestone',
    desc: 'Tournament format, eligibility, registration fees, and event details are published.',
  },
  {
    date: 'July 9, 2026',
    time: '6:00 PM IST',
    event: 'Rulebook Release',
    type: 'milestone',
    desc: 'Official tournament rules and regulations become available for all participants.',
  },
  {
    date: 'July 12, 2026',
    time: '6:00 PM IST',
    event: 'Prize Reveal',
    type: 'milestone',
    desc: 'Prize pool, certificates, awards, and champion recognition are officially announced.',
  },
  {
    date: 'July 16, 2026',
    time: '6:00 PM IST',
    event: 'Registration Closing Soon',
    type: 'deadline',
    desc: 'Final reminder before registrations close. Complete your registration before the deadline.',
  },
  {
    date: 'July 19, 2026',
    time: '11:59 PM IST',
    event: 'Registration Closes',
    type: 'deadline',
    desc: 'Registration ends. Team verification and roster validation begin.',
  },
  {
    date: 'July 22, 2026',
    time: '6:00 PM IST',
    event: 'Team Reveal',
    type: 'milestone',
    desc: 'All verified teams participating in Spike Showdown Season 1 are officially announced.',
  },
  {
    date: 'July 24, 2026',
    time: '6:00 PM IST',
    event: 'Bracket Reveal',
    type: 'milestone',
    desc: 'Official Bracket A and Bracket B are published after verification.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Match Schedule Release',
    type: 'match',
    desc: 'Official match dates, timings, Discord check-in instructions, and lobby details are announced.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Round 1',
    type: 'match',
    desc: 'The first knockout round begins simultaneously in Bracket A and Bracket B.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Round 2',
    type: 'match',
    desc: 'Winning teams advance to the second knockout round.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Champions Stage',
    type: 'match',
    desc: 'The top three teams from each bracket compete in a Round Robin format to determine the finalists.',
  },
  {
    date: 'To Be Announced',
    time: 'TBA',
    event: 'Grand Final',
    type: 'final',
    desc: 'Bracket A Champion vs Bracket B Champion. One team will become the first SPIKE SHOWDOWN Season 1 Champion.',
  },
  {
    date: 'Immediately After Grand Final',
    time: '',
    event: 'Champions Announced',
    type: 'milestone',
    desc: 'Champion, Runner-up, MVP, and award winners are officially announced.',
  },
  {
    date: 'End of Tournament',
    time: '',
    event: 'Thank You',
    type: 'milestone',
    desc: 'Thank you to every participant, volunteer, organizer, and supporter for making Spike Showdown Season 1 a success.',
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
        subtitle="Follow the complete journey of SPIKE SHOWDOWN Season 1—from the first announcement to crowning the champions."
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
              All tournament matches will begin after the Valorant World Cup concludes. Final match dates and timings will be announced through the Spike Showdown website, Discord server, and IEEE SB SBCE Instagram page.
            </p>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
