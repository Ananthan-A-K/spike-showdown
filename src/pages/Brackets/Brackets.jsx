import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Trophy, Crown, Star } from 'lucide-react';
import { PageHeader } from '../About/About';
import { pageTransition } from '../../animations/variants';
import './Brackets.css';

// Compact Match Card
function MatchCardCompact({ match }) {
  const isPlaceholder = (name) => !name || name.startsWith('Winner') || name === 'TBD';
  const t1Placeholder = isPlaceholder(match.team1);
  const t2Placeholder = isPlaceholder(match.team2);

  return (
    <div className="bracket-match-card-compact">
      {/* Team 1 */}
      <div className={`bracket-team-row-compact ${match.winner === match.team1 ? 'winner' : ''}`}>
        <span className={`bracket-team-name-compact ${t1Placeholder ? 'placeholder-text' : ''}`}>
          {match.team1}
        </span>
        {match.score1 !== null && (
          <span className="bracket-team-score-compact">{match.score1}</span>
        )}
      </div>
      
      <div className="bracket-card-divider" />
      
      {/* Team 2 */}
      <div className={`bracket-team-row-compact ${match.winner === match.team2 ? 'winner' : ''}`}>
        <span className={`bracket-team-name-compact ${t2Placeholder ? 'placeholder-text' : ''}`}>
          {match.team2}
        </span>
        {match.score2 !== null && (
          <span className="bracket-team-score-compact">{match.score2}</span>
        )}
      </div>
    </div>
  );
}

export default function Brackets() {
  const BRACKET_A_TEAMS = Array.from({ length: 12 }, (_, i) => `TEAM A${i + 1}`);
  const BRACKET_B_TEAMS = Array.from({ length: 12 }, (_, i) => `TEAM B${i + 1}`);

  const BRACKET_A_MATCHES = [
    { id: 'M1', team1: 'TEAM A1', team2: 'TEAM A2', score1: 2, score2: 0, winner: 'TEAM A1' },
    { id: 'M2', team1: 'TEAM A3', team2: 'TEAM A4', score1: 1, score2: 2, winner: 'TEAM A4' },
    { id: 'M3', team1: 'TEAM A5', team2: 'TEAM A6', score1: 2, score2: 1, winner: 'TEAM A5' },
    { id: 'M4', team1: 'TEAM A7', team2: 'TEAM A8', score1: 0, score2: 2, winner: 'TEAM A8' },
    { id: 'M5', team1: 'TEAM A9', team2: 'TEAM A10', score1: 2, score2: 0, winner: 'TEAM A9' },
    { id: 'M6', team1: 'TEAM A11', team2: 'TEAM A12', score1: 1, score2: 2, winner: 'TEAM A12' },
    { id: 'M7', team1: 'Winner M1', team2: 'Winner M2', score1: null, score2: null, winner: null },
    { id: 'M8', team1: 'Winner M3', team2: 'Winner M4', score1: null, score2: null, winner: null },
    { id: 'M9', team1: 'Winner M5', team2: 'Winner M6', score1: null, score2: null, winner: null },
  ];

  const BRACKET_B_MATCHES = [
    { id: 'M10', team1: 'TEAM B1', team2: 'TEAM B2', score1: 2, score2: 1, winner: 'TEAM B1' },
    { id: 'M11', team1: 'TEAM B3', team2: 'TEAM B4', score1: 2, score2: 0, winner: 'TEAM B3' },
    { id: 'M12', team1: 'TEAM B5', team2: 'TEAM B6', score1: 0, score2: 2, winner: 'TEAM B6' },
    { id: 'M13', team1: 'TEAM B7', team2: 'TEAM B8', score1: 2, score2: 1, winner: 'TEAM B7' },
    { id: 'M14', team1: 'TEAM B9', team2: 'TEAM B10', score1: 1, score2: 2, winner: 'TEAM B10' },
    { id: 'M15', team1: 'TEAM B11', team2: 'TEAM B12', score1: 2, score2: 0, winner: 'TEAM B11' },
    { id: 'M16', team1: 'Winner M10', team2: 'Winner M11', score1: null, score2: null, winner: null },
    { id: 'M17', team1: 'Winner M12', team2: 'Winner M13', score1: null, score2: null, winner: null },
    { id: 'M18', team1: 'Winner M14', team2: 'Winner M15', score1: null, score2: null, winner: null },
  ];

  return (
    <motion.div
      key="brackets"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <PageHeader
        eyebrow="Brackets"
        title="Official Playoff Bracket"
        subtitle="Single Elimination Brackets A & B leading to the ultimate Grand Final Showdown."
      />

      <section className="section-pad">
        <div className="container-xl">
          {/* Status banner */}
          <div className="bracket-status-banner">
            <Lock size={16} className="text-[#7D8793]" />
            <p className="bracket-status-text">
              Brackets are locked and live — July 2026
            </p>
          </div>

          {/* Tournament Layout */}
          <div className="brackets-overflow-wrapper">
            <div className="brackets-unified-grid">
              
              {/* === GF CONNECTOR SVG (Spans columns 1-6, rows 1-27) === */}
              <div className="gf-connector-wrapper" style={{ gridColumn: '1 / span 6', gridRow: '1 / span 27' }}>
                <svg className="gf-connector-svg" viewBox="0 0 1340 1200" width="1340" height="1200">
                  <defs>
                    <marker
                      id="arrow-gold"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="rgba(245, 158, 11, 0.7)" />
                    </marker>
                  </defs>
                  
                  {/* Line from Winner Box A right edge: (880, 310) -> (950, 310) -> (950, 600) */}
                  <path
                    d="M 880,310 L 950,310 L 950,600"
                    className="bracket-line gold-line"
                  />
                  {/* Line from Winner Box B right edge: (880, 930) -> (950, 930) -> (950, 600) */}
                  <path
                    d="M 880,930 L 950,930 L 950,600"
                    className="bracket-line gold-line"
                  />
                  {/* Horizontal line to Grand Final card left edge: (950, 600) -> (1020, 600) */}
                  <path
                    d="M 950,600 L 1020,600"
                    className="bracket-line gold-line"
                    markerEnd="url(#arrow-gold)"
                  />
                </svg>
              </div>

              {/* === BRACKET A HEADER === */}
              <div className="bracket-header red-theme" style={{ gridColumn: '1 / span 4', gridRow: '1' }}>
                <span className="bracket-badge">BRACKET A</span>
                <span className="bracket-teams-count">12 TEAMS</span>
              </div>

              {/* Bracket A SVG overlay (Spans columns 1-4, rows 2-13) */}
              <div className="bracket-svg-container" style={{ gridColumn: '1 / span 4', gridRow: '2 / span 12' }}>
                <svg className="bracket-svg-overlay" viewBox="0 0 880 540" width="880" height="540">
                  <defs>
                    <marker
                      id="arrow-red"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="rgba(230, 57, 70, 0.4)" />
                    </marker>
                  </defs>

                  {/* Connector 1: Teams to Column 2 (M1-M6) */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const y1 = i * 90 + 22.5;
                    const y2 = i * 90 + 67.5;
                    const ym = i * 90 + 45;
                    return (
                      <g key={`c1-${i}`}>
                        <path
                          d={`M 180,${y1} L 200,${y1} L 200,${y2} L 180,${y2}`}
                          className="bracket-line red-line"
                        />
                        <path
                          d={`M 200,${ym} L 220,${ym}`}
                          className="bracket-line red-line"
                          markerEnd="url(#arrow-red)"
                        />
                      </g>
                    );
                  })}

                  {/* Connector 2: Column 2 to Column 3 (M7-M9) */}
                  {Array.from({ length: 3 }).map((_, i) => {
                    const y1 = i * 180 + 45;
                    const y2 = i * 180 + 135;
                    const ym = i * 180 + 90;
                    return (
                      <g key={`c2-${i}`}>
                        <path
                          d={`M 430,${y1} L 450,${y1} L 450,${y2} L 430,${y2}`}
                          className="bracket-line red-line"
                        />
                        <path
                          d={`M 450,${ym} L 470,${ym}`}
                          className="bracket-line red-line"
                          markerEnd="url(#arrow-red)"
                        />
                      </g>
                    );
                  })}

                  {/* Connector 3: Column 3 to Winner Box A */}
                  <path
                    d="M 680,90 L 700,90 L 700,180"
                    className="bracket-line red-line"
                  />
                  <path
                    d="M 680,270 L 700,270 L 700,180"
                    className="bracket-line red-line"
                  />
                  <path
                    d="M 700,180 L 710,180 L 710,270"
                    className="bracket-line red-line"
                  />
                  <path
                    d="M 680,450 L 710,450 L 710,270"
                    className="bracket-line red-line"
                  />
                  <path
                    d="M 710,270 L 720,270"
                    className="bracket-line red-line"
                    markerEnd="url(#arrow-red)"
                  />
                </svg>
              </div>

              {/* Bracket A: Team Seeds (Col 1, Rows 2-13) */}
              {BRACKET_A_TEAMS.map((team, idx) => (
                <div
                  key={team}
                  className="team-seed-row"
                  style={{ gridColumn: '1', gridRow: `${idx + 2}` }}
                >
                  <span className="seed-number red-text">{idx + 1}</span>
                  <span className="team-name">{team}</span>
                </div>
              ))}

              {/* Bracket A: Matches M1-M6 (Col 2, Rows 2-13) */}
              {BRACKET_A_MATCHES.slice(0, 6).map((match, idx) => (
                <div
                  key={match.id}
                  className="match-cell"
                  style={{ gridColumn: '2', gridRow: `${idx * 2 + 2} / span 2` }}
                >
                  <div className="match-badge-wrapper red-theme">
                    <span className="match-id">{match.id}</span>
                  </div>
                  <div className="match-arrow">→</div>
                  <MatchCardCompact match={match} />
                </div>
              ))}

              {/* Bracket A: Matches M7-M9 (Col 3, Rows 2-13) */}
              {BRACKET_A_MATCHES.slice(6, 9).map((match, idx) => (
                <div
                  key={match.id}
                  className="match-cell"
                  style={{ gridColumn: '3', gridRow: `${idx * 4 + 2} / span 4` }}
                >
                  <div className="match-badge-wrapper red-theme">
                    <span className="match-id">{match.id}</span>
                  </div>
                  <div className="match-arrow">→</div>
                  <MatchCardCompact match={match} />
                </div>
              ))}

              {/* Bracket A: Winner Box A (Col 4, Rows 2-13) */}
              <div
                className="winner-cell"
                style={{ gridColumn: '4', gridRow: '2 / span 12' }}
              >
                <div className="winner-box red-theme">
                  <Trophy className="winner-trophy-icon" />
                  <div className="winner-text">WINNER</div>
                  <div className="winner-subtext">BRACKET A</div>
                </div>
              </div>

              {/* === MID SEPARATOR (Row 14) === */}
              <div
                className="brackets-divider-row"
                style={{ gridColumn: '1 / span 4', gridRow: '14' }}
              >
                <div className="brackets-divider-line-dashed" />
              </div>

              {/* === BRACKET B HEADER === */}
              <div className="bracket-header blue-theme" style={{ gridColumn: '1 / span 4', gridRow: '15' }}>
                <span className="bracket-badge">BRACKET B</span>
                <span className="bracket-teams-count">12 TEAMS</span>
              </div>

              {/* Bracket B SVG overlay (Spans columns 1-4, rows 16-27) */}
              <div className="bracket-svg-container" style={{ gridColumn: '1 / span 4', gridRow: '16 / span 12' }}>
                <svg className="bracket-svg-overlay" viewBox="0 0 880 540" width="880" height="540">
                  <defs>
                    <marker
                      id="arrow-blue"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="rgba(79, 124, 172, 0.4)" />
                    </marker>
                  </defs>

                  {/* Connector 1: Teams to Column 2 (M10-M15) */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const y1 = i * 90 + 22.5;
                    const y2 = i * 90 + 67.5;
                    const ym = i * 90 + 45;
                    return (
                      <g key={`c1-b-${i}`}>
                        <path
                          d={`M 180,${y1} L 200,${y1} L 200,${y2} L 180,${y2}`}
                          className="bracket-line blue-line"
                        />
                        <path
                          d={`M 200,${ym} L 220,${ym}`}
                          className="bracket-line blue-line"
                          markerEnd="url(#arrow-blue)"
                        />
                      </g>
                    );
                  })}

                  {/* Connector 2: Column 2 to Column 3 (M16-M18) */}
                  {Array.from({ length: 3 }).map((_, i) => {
                    const y1 = i * 180 + 45;
                    const y2 = i * 180 + 135;
                    const ym = i * 180 + 90;
                    return (
                      <g key={`c2-b-${i}`}>
                        <path
                          d={`M 430,${y1} L 450,${y1} L 450,${y2} L 430,${y2}`}
                          className="bracket-line blue-line"
                        />
                        <path
                          d={`M 450,${ym} L 470,${ym}`}
                          className="bracket-line blue-line"
                          markerEnd="url(#arrow-blue)"
                        />
                      </g>
                    );
                  })}

                  {/* Connector 3: Column 3 to Winner Box B */}
                  <path
                    d="M 680,90 L 700,90 L 700,180"
                    className="bracket-line blue-line"
                  />
                  <path
                    d="M 680,270 L 700,270 L 700,180"
                    className="bracket-line blue-line"
                  />
                  <path
                    d="M 700,180 L 710,180 L 710,270"
                    className="bracket-line blue-line"
                  />
                  <path
                    d="M 680,450 L 710,450 L 710,270"
                    className="bracket-line blue-line"
                  />
                  <path
                    d="M 710,270 L 720,270"
                    className="bracket-line blue-line"
                    markerEnd="url(#arrow-blue)"
                  />
                </svg>
              </div>

              {/* Bracket B: Team Seeds (Col 1, Rows 16-27) */}
              {BRACKET_B_TEAMS.map((team, idx) => (
                <div
                  key={team}
                  className="team-seed-row"
                  style={{ gridColumn: '1', gridRow: `${idx + 16}` }}
                >
                  <span className="seed-number blue-text">{idx + 1}</span>
                  <span className="team-name">{team}</span>
                </div>
              ))}

              {/* Bracket B: Matches M10-M15 (Col 2, Rows 16-27) */}
              {BRACKET_B_MATCHES.slice(0, 6).map((match, idx) => (
                <div
                  key={match.id}
                  className="match-cell"
                  style={{ gridColumn: '2', gridRow: `${idx * 2 + 16} / span 2` }}
                >
                  <div className="match-badge-wrapper blue-theme">
                    <span className="match-id">{match.id}</span>
                  </div>
                  <div className="match-arrow">→</div>
                  <MatchCardCompact match={match} />
                </div>
              ))}

              {/* Bracket B: Matches M16-M18 (Col 3, Rows 16-27) */}
              {BRACKET_B_MATCHES.slice(6, 9).map((match, idx) => (
                <div
                  key={match.id}
                  className="match-cell"
                  style={{ gridColumn: '3', gridRow: `${idx * 4 + 16} / span 4` }}
                >
                  <div className="match-badge-wrapper blue-theme">
                    <span className="match-id">{match.id}</span>
                  </div>
                  <div className="match-arrow">→</div>
                  <MatchCardCompact match={match} />
                </div>
              ))}

              {/* Bracket B: Winner Box B (Col 4, Rows 16-27) */}
              <div
                className="winner-cell"
                style={{ gridColumn: '4', gridRow: '16 / span 12' }}
              >
                <div className="winner-box blue-theme">
                  <Trophy className="winner-trophy-icon" />
                  <div className="winner-text">WINNER</div>
                  <div className="winner-subtext">BRACKET B</div>
                </div>
              </div>

              {/* === GRAND FINAL COLUMN (Col 6, Rows 1-27) === */}
              <div
                className="grand-final-cell"
                style={{ gridColumn: '6', gridRow: '1 / span 27' }}
              >
                <div className="grand-final-card">
                  <div className="gf-card-glow-overlay" />
                  
                  <div className="gf-header-title">GRAND FINAL</div>
                  
                  <div className="gf-trophy-wrapper">
                    <Trophy className="gf-trophy-icon" />
                  </div>

                  <div className="gf-competitors">
                    {/* Competitor A */}
                    <div className="gf-competitor red-theme">
                      <div className="gf-shield red-shield">A</div>
                      <div className="gf-competitor-details">
                        <span className="gf-competitor-label">WINNER</span>
                        <span className="gf-competitor-name">BRACKET A</span>
                      </div>
                    </div>

                    {/* VS divider */}
                    <div className="gf-vs-divider">
                      <div className="gf-divider-line" />
                      <span className="gf-vs-text">VS</span>
                      <div className="gf-divider-line" />
                    </div>

                    {/* Competitor B */}
                    <div className="gf-competitor blue-theme">
                      <div className="gf-shield blue-shield">B</div>
                      <div className="gf-competitor-details">
                        <span className="gf-competitor-label">WINNER</span>
                        <span className="gf-competitor-name">BRACKET B</span>
                      </div>
                    </div>
                  </div>

                  <div className="gf-format-text">BEST OF 1 / BO3</div>

                  <div className="gf-championship-divider">
                    <div className="gf-divider-line-gold" />
                    <Crown className="gf-crown-icon" />
                    <div className="gf-divider-line-gold" />
                  </div>

                  <div className="gf-champion-title">CHAMPION</div>
                  
                  <div className="gf-stars-row">
                    <Star size={12} className="star-gold fill-gold" />
                    <Star size={12} className="star-gold fill-gold" />
                    <Star size={12} className="star-gold fill-gold" />
                    <Star size={12} className="star-gold fill-gold" />
                    <Star size={12} className="star-gold fill-gold" />
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>
    </motion.div>
  );
}
