import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { itemVariants } from '../../../animations/variants';
import './TeamCard.css';

const STATUS_STYLES = {
  Confirmed: { badge: 'badge-success', dot: 'bg-[#22C55E]' },
  Pending:   { badge: 'badge-neutral', dot: 'bg-[#7D8793]' },
  Default:   { badge: 'badge-neutral', dot: 'bg-[#7D8793]' },
};

const TEAM_INITIALS_COLORS = [
  '#E63946', '#4F7CAC', '#22C55E', '#F59E0B',
  '#8B5CF6', '#06B6D4', '#EC4899', '#14B8A6',
];

export default function TeamCard({ team, index = 0 }) {
  const statusStyle  = STATUS_STYLES[team.status] || STATUS_STYLES.Default;
  const accentColor  = team.color || TEAM_INITIALS_COLORS[index % TEAM_INITIALS_COLORS.length];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className="card-surface flex flex-col gap-6 relative overflow-hidden group h-full team-card"
    >
      {/* Top accent line */}
      <div
        className="team-card-accent-line"
        style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        {/* Team Avatar */}
        <div
          className="team-avatar"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
        >
          <span style={{ color: accentColor }}>{team.tag || team.name.slice(0, 2)}</span>
        </div>

        {/* Status badge */}
        <span className={`badge ${statusStyle.badge} flex-shrink-0 mt-1`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
          {team.status}
        </span>
      </div>

      {/* Team Info */}
      <div>
        <h3 className="team-title">
          {team.name}
        </h3>
        <p className="team-college">
          {team.college}
        </p>
      </div>

      {/* Captain */}
      <div className="team-captain-row">
        <Crown size={13} className="text-[#F59E0B]" />
        <span className="team-captain-name">{team.captain}</span>
      </div>

      {/* Players */}
      <div className="mt-auto">
        <p className="team-roster-title">
          Roster ({team.players.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {team.players.map((p, i) => (
            <span key={i} className="team-player-tag">
              {p.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
