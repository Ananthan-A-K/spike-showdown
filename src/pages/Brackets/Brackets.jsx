import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { PageHeader } from '../About/About';
import { BRACKET_MATCHES } from '../../constants/data';
import { pageTransition, containerVariants, itemVariants } from '../../animations/variants';
import './Brackets.css';

function MatchCard({ match, isGrand }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={isGrand ? 'bracket-match-card-grand' : 'bracket-match-card'}
    >
      {isGrand && <div className="grand-final-gold-line" />}

      <div className="bracket-match-card-content">
        <div className="bracket-team-row">
          <span className="bracket-team-name">{match.team1}</span>
          {match.score1 !== null && (
            <span className={match.winner === match.team1 ? 'score-winner' : 'score-loser'}>
              {match.score1}
            </span>
          )}
        </div>
        <div className="vs-divider">
          <div className="vs-divider-line" />
          <span className="vs-divider-text">VS</span>
          <div className="vs-divider-line" />
        </div>
        <div className="bracket-team-row">
          <span className="bracket-team-name">{match.team2}</span>
          {match.score2 !== null && (
            <span className={match.winner === match.team2 ? 'score-winner' : 'score-loser'}>
              {match.score2}
            </span>
          )}
        </div>
      </div>

      {!match.score1 && (
        <div className="scheduled-status">
          <div className="flex items-center gap-1.5">
            <div className="scheduled-status-dot" />
            <span className="scheduled-status-text">Scheduled</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Brackets() {
  const qfMatches = BRACKET_MATCHES.filter(m => m.round === 'QF');
  const sfMatches = BRACKET_MATCHES.filter(m => m.round === 'SF');
  const gfMatch   = BRACKET_MATCHES.filter(m => m.round === 'GF');

  return (
    <motion.div
      key="brackets"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Brackets"
        title="Tournament Bracket"
        subtitle="Single elimination playoffs. Quarter-Finals → Semi-Finals → Grand Final."
      />

      <section className="section-pad">
        <div className="container-xl">

          {/* Status banner */}
          <div className="bracket-status-banner">
            <Lock size={16} className="text-[#7D8793]" />
            <p className="bracket-status-text">
              Bracket locks after group stage — August 10, 2025
            </p>
          </div>

          {/* Bracket view */}
          <div className="overflow-x-auto" style={{ paddingBottom: '2.5rem' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex items-start gap-12 min-w-[960px] justify-center"
              style={{ gap: '6rem' }}
            >
              {/* Quarter Finals */}
              <div className="flex flex-col gap-8 items-center">
                <div className="text-center">
                  <span className="bracket-round-badge">
                    Quarter-Finals
                  </span>
                </div>
                <div className="flex flex-col gap-8">
                  {qfMatches.map(match => (
                    <MatchCard key={match.id} match={match} isGrand={false} />
                  ))}
                </div>
              </div>

              {/* Connector lines + SF */}
              <div className="bracket-sf-container">
                <div className="flex flex-col gap-8 items-center">
                  <div className="text-center mb-0">
                    <span className="bracket-round-badge">
                      Semi-Finals
                    </span>
                  </div>
                  <div className="flex flex-col" style={{ gap: '7.5rem' }}>
                    {sfMatches.map(match => (
                      <MatchCard key={match.id} match={match} isGrand={false} />
                    ))}
                  </div>
                </div>

                {/* Grand Final */}
                <div className="bracket-gf-container">
                  <span className="bracket-round-badge-grand">
                    Grand Final
                  </span>
                  {gfMatch.map(match => (
                    <MatchCard key={match.id} match={match} isGrand={true} />
                  ))}
                  <div style={{ marginTop: '1.5rem' }} className="text-center">
                    <p className="font-mono text-[0.55rem] uppercase tracking-widest text-[#F59E0B] font-semibold">August 15, 2025</p>
                    <p className="font-mono text-[0.45rem] uppercase tracking-widest text-[#7D8793]" style={{ marginTop: '0.25rem' }}>LAN Finals</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Format info */}
          <div style={{ marginTop: '5rem' }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Quarter-Finals', format: 'Best of 3', teams: '8 Teams' },
              { label: 'Semi-Finals',    format: 'Best of 3', teams: '4 Teams' },
              { label: 'Grand Final',    format: 'Best of 5', teams: '2 Teams' },
            ].map(({ label, format, teams }) => (
              <div key={label} className="bracket-match-card-grand" style={{ padding: '2rem', width: 'auto' }}>
                <p className="info-card-label" style={{ marginBottom: '0.75rem' }}>{label}</p>
                <p className="font-display font-bold text-xl text-[#F5F7FA]" style={{ fontSize: '1.25rem' }}>{format}</p>
                <p className="font-mono text-[0.55rem] text-[#7D8793]" style={{ marginTop: '0.5rem' }}>{teams}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </motion.div>
  );
}
